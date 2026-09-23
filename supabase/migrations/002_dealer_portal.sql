-- XAUBase Dealer Portal
-- Lets dealers submit, claim and edit their own listings.
--
-- All writes to dealers go through the SECURITY DEFINER functions below;
-- direct INSERT/UPDATE/DELETE from the API is revoked. Rules:
--   * New submissions start 'pending' and are owned by the submitter.
--   * Claims auto-approve when the user's confirmed email domain matches the
--     listing's website domain; otherwise they wait for an admin.
--   * On an approved listing, contact fields (website, phone, email, address,
--     online_sales) change instantly; name, description, specializations,
--     city and logo go into a change request for admin review.
--
-- Also closes two existing holes:
--   * profiles: users could update their own `role` to 'admin'.
--   * dealers: any signed-in user could insert a row with any status/featured.

-- ---------------------------------------------------------------------------
-- 1. Lock down profile roles
-- ---------------------------------------------------------------------------
REVOKE UPDATE ON public.profiles FROM anon, authenticated;
GRANT UPDATE (username, full_name, avatar_url, updated_at) ON public.profiles TO authenticated;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = ''
AS $$
  SELECT EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin');
$$;

-- ---------------------------------------------------------------------------
-- 2. Dealer ownership columns + write lockdown
-- ---------------------------------------------------------------------------
ALTER TABLE public.dealers
  ADD COLUMN owner_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN requested_city TEXT,
  ADD COLUMN admin_note TEXT;
CREATE INDEX idx_dealers_owner ON public.dealers(owner_id);

DROP POLICY IF EXISTS "Authenticated users can insert dealers" ON public.dealers;
DROP POLICY IF EXISTS "Admins can update dealers" ON public.dealers;
REVOKE INSERT, UPDATE, DELETE ON public.dealers FROM anon, authenticated;

CREATE POLICY "Owners can see own dealers" ON public.dealers
  FOR SELECT USING (owner_id = auth.uid());

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER dealers_set_updated_at
  BEFORE UPDATE ON public.dealers
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ---------------------------------------------------------------------------
-- 3. Claims and change requests
-- ---------------------------------------------------------------------------
CREATE TYPE request_status AS ENUM ('pending', 'approved', 'rejected');

CREATE TABLE public.dealer_claims (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  dealer_id UUID NOT NULL REFERENCES public.dealers(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  user_email TEXT NOT NULL,
  message TEXT,
  status request_status NOT NULL DEFAULT 'pending',
  auto_verified BOOLEAN NOT NULL DEFAULT false,
  admin_note TEXT,
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX idx_dealer_claims_one_pending
  ON public.dealer_claims(dealer_id, user_id) WHERE status = 'pending';
CREATE INDEX idx_dealer_claims_status ON public.dealer_claims(status);
CREATE INDEX idx_dealer_claims_user ON public.dealer_claims(user_id);

CREATE TABLE public.dealer_change_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  dealer_id UUID NOT NULL REFERENCES public.dealers(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  changes JSONB NOT NULL,
  status request_status NOT NULL DEFAULT 'pending',
  admin_note TEXT,
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX idx_dealer_changes_one_pending
  ON public.dealer_change_requests(dealer_id) WHERE status = 'pending';
CREATE INDEX idx_dealer_changes_status ON public.dealer_change_requests(status);

CREATE TRIGGER dealer_change_requests_set_updated_at
  BEFORE UPDATE ON public.dealer_change_requests
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.dealer_claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dealer_change_requests ENABLE ROW LEVEL SECURITY;
REVOKE INSERT, UPDATE, DELETE ON public.dealer_claims FROM anon, authenticated;
REVOKE INSERT, UPDATE, DELETE ON public.dealer_change_requests FROM anon, authenticated;

CREATE POLICY "Users see own claims, admins see all" ON public.dealer_claims
  FOR SELECT USING (user_id = auth.uid() OR public.is_admin());
CREATE POLICY "Users see own change requests, admins see all" ON public.dealer_change_requests
  FOR SELECT USING (user_id = auth.uid() OR public.is_admin());

-- ---------------------------------------------------------------------------
-- 4. Internal helpers (not callable from the API)
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public._slugify(p_text TEXT)
RETURNS TEXT LANGUAGE sql IMMUTABLE SET search_path = ''
AS $$
  SELECT trim(BOTH '-' FROM regexp_replace(lower(coalesce(p_text, '')), '[^a-z0-9]+', '-', 'g'));
$$;

CREATE OR REPLACE FUNCTION public._unique_dealer_slug(p_name TEXT)
RETURNS TEXT LANGUAGE plpgsql SET search_path = ''
AS $$
DECLARE
  v_base TEXT := left(public._slugify(p_name), 80);
  v_slug TEXT;
  v_n INT := 1;
BEGIN
  IF v_base = '' THEN v_base := 'dealer'; END IF;
  v_slug := v_base;
  WHILE EXISTS (SELECT 1 FROM public.dealers WHERE slug = v_slug) LOOP
    v_n := v_n + 1;
    v_slug := v_base || '-' || v_n;
  END LOOP;
  RETURN v_slug;
END;
$$;

-- Returns the id of the city named p_name in the country, creating it if needed.
CREATE OR REPLACE FUNCTION public._find_or_create_city(p_country_id UUID, p_name TEXT)
RETURNS UUID LANGUAGE plpgsql SET search_path = ''
AS $$
DECLARE
  v_name TEXT := btrim(p_name);
  v_slug TEXT := public._slugify(p_name);
  v_id UUID;
BEGIN
  IF v_slug = '' THEN
    RAISE EXCEPTION 'City name is not valid';
  END IF;
  SELECT id INTO v_id FROM public.cities WHERE country_id = p_country_id AND slug = v_slug;
  IF v_id IS NULL THEN
    INSERT INTO public.cities (name, slug, country_id)
    VALUES (v_name, v_slug, p_country_id)
    RETURNING id INTO v_id;
  END IF;
  RETURN v_id;
END;
$$;

-- Validates every dealer field present in p and raises a readable error.
CREATE OR REPLACE FUNCTION public._validate_dealer_fields(p JSONB)
RETURNS VOID LANGUAGE plpgsql SET search_path = ''
AS $$
DECLARE
  v_allowed_specs TEXT[] := ARRAY['bullion','coins','bars','jewelry','ira','storage','refining','numismatics','online'];
  v_spec TEXT;
BEGIN
  IF p ? 'name' AND (p->>'name' IS NULL OR length(btrim(p->>'name')) < 2 OR length(p->>'name') > 120) THEN
    RAISE EXCEPTION 'Dealer name must be between 2 and 120 characters';
  END IF;
  IF p ? 'description' AND length(coalesce(p->>'description', '')) > 2000 THEN
    RAISE EXCEPTION 'Description must be 2000 characters or fewer';
  END IF;
  IF nullif(p->>'website', '') IS NOT NULL
     AND (p->>'website' !~* '^https?://[^\s/$.?#][^\s]*$' OR length(p->>'website') > 300) THEN
    RAISE EXCEPTION 'Website must be a valid URL starting with http:// or https://';
  END IF;
  IF nullif(p->>'email', '') IS NOT NULL
     AND (p->>'email' !~* '^[^\s@]+@[^\s@]+\.[^\s@]+$' OR length(p->>'email') > 254) THEN
    RAISE EXCEPTION 'Email address is not valid';
  END IF;
  IF length(coalesce(p->>'phone', '')) > 40 THEN
    RAISE EXCEPTION 'Phone number is too long';
  END IF;
  IF length(coalesce(p->>'address_line', '')) > 300 THEN
    RAISE EXCEPTION 'Address is too long';
  END IF;
  IF length(coalesce(p->>'requested_city', '')) > 100 THEN
    RAISE EXCEPTION 'City name is too long';
  END IF;
  IF p ? 'specializations' THEN
    IF jsonb_typeof(p->'specializations') <> 'array' THEN
      RAISE EXCEPTION 'Specializations must be a list';
    END IF;
    FOR v_spec IN SELECT jsonb_array_elements_text(p->'specializations') LOOP
      IF NOT v_spec = ANY (v_allowed_specs) THEN
        RAISE EXCEPTION 'Unknown specialization: %', v_spec;
      END IF;
    END LOOP;
  END IF;
  IF nullif(p->>'logo_url', '') IS NOT NULL
     AND p->>'logo_url' !~ '^https://[a-z0-9]+\.supabase\.co/storage/v1/object/public/dealer-logos/[0-9a-f-]{36}/[A-Za-z0-9._-]+$' THEN
    RAISE EXCEPTION 'Logo must be uploaded through the dealer dashboard';
  END IF;
END;
$$;

-- Converts a jsonb array of strings to text[] (NULL -> empty array).
CREATE OR REPLACE FUNCTION public._jsonb_text_array(p JSONB)
RETURNS TEXT[] LANGUAGE sql IMMUTABLE SET search_path = ''
AS $$
  SELECT coalesce(array_agg(DISTINCT x ORDER BY x), '{}')
  FROM jsonb_array_elements_text(coalesce(p, '[]'::jsonb)) AS x;
$$;

-- Writes the given fields of p onto the dealer. Only keys present in p are
-- touched. Resolves requested_city into a real city row.
CREATE OR REPLACE FUNCTION public._apply_dealer_fields(p_dealer_id UUID, p JSONB)
RETURNS VOID LANGUAGE plpgsql SET search_path = ''
AS $$
DECLARE
  v_country_id UUID;
  v_city_id UUID;
BEGIN
  PERFORM public._validate_dealer_fields(p);

  SELECT coalesce(nullif(p->>'country_id', '')::UUID, country_id) INTO v_country_id
  FROM public.dealers WHERE id = p_dealer_id;

  IF p ? 'country_id' AND NOT EXISTS (SELECT 1 FROM public.countries WHERE id = v_country_id) THEN
    RAISE EXCEPTION 'Unknown country';
  END IF;

  IF nullif(p->>'city_id', '') IS NOT NULL THEN
    v_city_id := (p->>'city_id')::UUID;
    IF NOT EXISTS (SELECT 1 FROM public.cities WHERE id = v_city_id AND country_id = v_country_id) THEN
      RAISE EXCEPTION 'City does not belong to the selected country';
    END IF;
  END IF;

  UPDATE public.dealers d SET
    name            = CASE WHEN p ? 'name' THEN btrim(p->>'name') ELSE d.name END,
    description     = CASE WHEN p ? 'description' THEN nullif(btrim(p->>'description'), '') ELSE d.description END,
    specializations = CASE WHEN p ? 'specializations' THEN public._jsonb_text_array(p->'specializations') ELSE d.specializations END,
    website         = CASE WHEN p ? 'website' THEN nullif(btrim(p->>'website'), '') ELSE d.website END,
    phone           = CASE WHEN p ? 'phone' THEN nullif(btrim(p->>'phone'), '') ELSE d.phone END,
    email           = CASE WHEN p ? 'email' THEN nullif(btrim(p->>'email'), '') ELSE d.email END,
    address_line    = CASE WHEN p ? 'address_line' THEN nullif(btrim(p->>'address_line'), '') ELSE d.address_line END,
    online_sales    = CASE WHEN p ? 'online_sales' THEN coalesce((p->>'online_sales')::BOOLEAN, false) ELSE d.online_sales END,
    logo_url        = CASE WHEN p ? 'logo_url' THEN nullif(p->>'logo_url', '') ELSE d.logo_url END,
    country_id      = v_country_id,
    city_id         = CASE
                        WHEN v_city_id IS NOT NULL THEN v_city_id
                        WHEN nullif(btrim(p->>'requested_city'), '') IS NOT NULL THEN NULL
                        WHEN p ? 'country_id' AND v_country_id IS DISTINCT FROM d.country_id THEN NULL
                        ELSE d.city_id
                      END,
    requested_city  = CASE
                        WHEN v_city_id IS NOT NULL THEN NULL
                        WHEN p ? 'requested_city' THEN nullif(btrim(p->>'requested_city'), '')
                        ELSE d.requested_city
                      END
  WHERE d.id = p_dealer_id;
END;
$$;

-- Loose domain match: equal, or one is a subdomain of the other.
CREATE OR REPLACE FUNCTION public._domains_match(p_email TEXT, p_website TEXT)
RETURNS BOOLEAN LANGUAGE plpgsql IMMUTABLE SET search_path = ''
AS $$
DECLARE
  v_free TEXT[] := ARRAY[
    'gmail.com','googlemail.com','outlook.com','hotmail.com','hotmail.co.uk','live.com','msn.com',
    'yahoo.com','yahoo.co.uk','ymail.com','icloud.com','me.com','mac.com','aol.com','proton.me',
    'protonmail.com','gmx.com','gmx.de','web.de','mail.com','zoho.com','yandex.com','qq.com','163.com'
  ];
  v_email_domain TEXT := lower(split_part(coalesce(p_email, ''), '@', 2));
  v_host TEXT := lower(substring(coalesce(p_website, '') FROM '^[a-zA-Z]+://([^/:?#]+)'));
BEGIN
  v_email_domain := regexp_replace(v_email_domain, '^www\.', '');
  v_host := regexp_replace(coalesce(v_host, ''), '^www\.', '');
  IF v_email_domain = '' OR v_host = '' OR position('.' IN v_host) = 0 OR v_email_domain = ANY (v_free) THEN
    RETURN false;
  END IF;
  RETURN v_email_domain = v_host
      OR v_email_domain LIKE '%.' || v_host
      OR v_host LIKE '%.' || v_email_domain;
END;
$$;

-- ---------------------------------------------------------------------------
-- 5. Dealer-facing RPCs
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.submit_dealer(p JSONB)
RETURNS UUID
LANGUAGE plpgsql SECURITY DEFINER SET search_path = ''
AS $$
DECLARE
  v_uid UUID := auth.uid();
  v_id UUID;
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'You must be signed in';
  END IF;
  IF (SELECT count(*) FROM public.dealers WHERE submitted_by = v_uid AND status = 'pending') >= 5 THEN
    RAISE EXCEPTION 'You already have 5 listings awaiting review. Please wait for those to be approved.';
  END IF;
  IF nullif(p->>'name', '') IS NULL OR nullif(p->>'country_id', '') IS NULL THEN
    RAISE EXCEPTION 'Dealer name and country are required';
  END IF;
  IF nullif(p->>'city_id', '') IS NULL AND nullif(btrim(p->>'requested_city'), '') IS NULL THEN
    RAISE EXCEPTION 'City is required';
  END IF;

  PERFORM public._validate_dealer_fields(p);

  INSERT INTO public.dealers (name, slug, country_id, status, submitted_by, owner_id)
  VALUES (btrim(p->>'name'), public._unique_dealer_slug(p->>'name'), (p->>'country_id')::UUID, 'pending', v_uid, v_uid)
  RETURNING id INTO v_id;

  PERFORM public._apply_dealer_fields(v_id, p);
  RETURN v_id;
END;
$$;

-- Returns 'saved' (all changes live), 'pending_review' (some changes queued)
-- or 'no_changes'.
CREATE OR REPLACE FUNCTION public.update_my_dealer(p_dealer_id UUID, p JSONB)
RETURNS TEXT
LANGUAGE plpgsql SECURITY DEFINER SET search_path = ''
AS $$
DECLARE
  v_uid UUID := auth.uid();
  v_dealer public.dealers;
  v_instant_keys TEXT[] := ARRAY['website','phone','email','address_line','online_sales'];
  v_reviewed_keys TEXT[] := ARRAY['name','description','specializations','city_id','requested_city','logo_url'];
  v_instant JSONB := '{}';
  v_reviewed JSONB := '{}';
  v_key TEXT;
  v_current JSONB;
  v_new JSONB;
BEGIN
  SELECT * INTO v_dealer FROM public.dealers WHERE id = p_dealer_id FOR UPDATE;
  IF v_dealer.id IS NULL OR v_dealer.owner_id IS DISTINCT FROM v_uid OR v_uid IS NULL THEN
    RAISE EXCEPTION 'Listing not found';
  END IF;

  PERFORM public._validate_dealer_fields(p);

  -- Not live yet: everything is editable, and a rejected listing is resubmitted.
  IF v_dealer.status <> 'approved' THEN
    PERFORM public._apply_dealer_fields(p_dealer_id, p);
    UPDATE public.dealers SET status = 'pending' WHERE id = p_dealer_id;
    RETURN 'saved';
  END IF;

  IF p ? 'country_id' AND (p->>'country_id')::UUID IS DISTINCT FROM v_dealer.country_id THEN
    RAISE EXCEPTION 'To move a live listing to another country, please contact us';
  END IF;

  v_current := to_jsonb(v_dealer);
  v_current := jsonb_set(v_current, '{specializations}',
    to_jsonb(public._jsonb_text_array(v_current->'specializations')));

  FOREACH v_key IN ARRAY v_instant_keys LOOP
    IF p ? v_key THEN
      v_new := CASE WHEN p->>v_key = '' THEN 'null'::jsonb ELSE p->v_key END;
      IF v_new IS DISTINCT FROM coalesce(v_current->v_key, 'null'::jsonb) THEN
        v_instant := v_instant || jsonb_build_object(v_key, v_new);
      END IF;
    END IF;
  END LOOP;

  FOREACH v_key IN ARRAY v_reviewed_keys LOOP
    IF p ? v_key THEN
      v_new := CASE
                 WHEN v_key = 'specializations' THEN to_jsonb(public._jsonb_text_array(p->v_key))
                 WHEN p->>v_key = '' THEN 'null'::jsonb
                 WHEN v_key IN ('name','description','requested_city') THEN to_jsonb(btrim(p->>v_key))
                 ELSE p->v_key
               END;
      IF v_new IS DISTINCT FROM coalesce(v_current->v_key, 'null'::jsonb) THEN
        v_reviewed := v_reviewed || jsonb_build_object(v_key, v_new);
      END IF;
    END IF;
  END LOOP;

  -- Picking an existing city supersedes a typed-in one and vice versa.
  IF v_reviewed ? 'city_id' AND v_reviewed->>'city_id' IS NOT NULL THEN
    v_reviewed := v_reviewed - 'requested_city';
  ELSIF v_reviewed ? 'requested_city' AND v_reviewed->>'requested_city' IS NULL THEN
    v_reviewed := v_reviewed - 'requested_city';
  END IF;
  IF v_reviewed ? 'city_id' AND v_reviewed->>'city_id' IS NULL AND NOT v_reviewed ? 'requested_city' THEN
    v_reviewed := v_reviewed - 'city_id';
  END IF;

  IF v_instant <> '{}' THEN
    PERFORM public._apply_dealer_fields(p_dealer_id, v_instant);
  END IF;

  IF v_reviewed <> '{}' THEN
    INSERT INTO public.dealer_change_requests (dealer_id, user_id, changes)
    VALUES (p_dealer_id, v_uid, v_reviewed)
    ON CONFLICT (dealer_id) WHERE status = 'pending'
    DO UPDATE SET changes = EXCLUDED.changes, user_id = EXCLUDED.user_id;
    RETURN 'pending_review';
  END IF;

  RETURN CASE WHEN v_instant <> '{}' THEN 'saved' ELSE 'no_changes' END;
END;
$$;

CREATE OR REPLACE FUNCTION public.withdraw_my_change_request(p_dealer_id UUID)
RETURNS VOID
LANGUAGE plpgsql SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  DELETE FROM public.dealer_change_requests
  WHERE dealer_id = p_dealer_id AND user_id = auth.uid() AND status = 'pending';
END;
$$;

-- Returns 'approved' (verified by email domain) or 'pending' (admin review).
CREATE OR REPLACE FUNCTION public.claim_dealer(p_dealer_id UUID, p_message TEXT DEFAULT NULL)
RETURNS TEXT
LANGUAGE plpgsql SECURITY DEFINER SET search_path = ''
AS $$
DECLARE
  v_uid UUID := auth.uid();
  v_email TEXT;
  v_dealer public.dealers;
BEGIN
  SELECT email INTO v_email FROM auth.users
  WHERE id = v_uid AND email_confirmed_at IS NOT NULL;
  IF v_email IS NULL THEN
    RAISE EXCEPTION 'Please confirm your email address before claiming a listing';
  END IF;

  SELECT * INTO v_dealer FROM public.dealers WHERE id = p_dealer_id AND status = 'approved' FOR UPDATE;
  IF v_dealer.id IS NULL THEN
    RAISE EXCEPTION 'Listing not found';
  END IF;
  IF v_dealer.owner_id = v_uid THEN
    RETURN 'approved';
  END IF;
  IF v_dealer.owner_id IS NOT NULL THEN
    RAISE EXCEPTION 'This listing has already been claimed. If you believe this is wrong, please contact us.';
  END IF;
  IF EXISTS (SELECT 1 FROM public.dealer_claims WHERE dealer_id = p_dealer_id AND user_id = v_uid AND status = 'pending') THEN
    RETURN 'pending';
  END IF;
  IF (SELECT count(*) FROM public.dealer_claims WHERE user_id = v_uid AND status = 'pending') >= 10 THEN
    RAISE EXCEPTION 'You have too many claims awaiting review';
  END IF;
  IF length(coalesce(p_message, '')) > 1000 THEN
    RAISE EXCEPTION 'Message must be 1000 characters or fewer';
  END IF;

  IF public._domains_match(v_email, v_dealer.website) THEN
    UPDATE public.dealers SET owner_id = v_uid WHERE id = p_dealer_id;
    INSERT INTO public.dealer_claims (dealer_id, user_id, user_email, message, status, auto_verified, reviewed_at)
    VALUES (p_dealer_id, v_uid, v_email, nullif(btrim(p_message), ''), 'approved', true, now());
    RETURN 'approved';
  END IF;

  INSERT INTO public.dealer_claims (dealer_id, user_id, user_email, message)
  VALUES (p_dealer_id, v_uid, v_email, nullif(btrim(p_message), ''));
  RETURN 'pending';
END;
$$;

-- ---------------------------------------------------------------------------
-- 6. Admin RPCs
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.admin_review_dealer(p_dealer_id UUID, p_approve BOOLEAN, p_note TEXT DEFAULT NULL)
RETURNS VOID
LANGUAGE plpgsql SECURITY DEFINER SET search_path = ''
AS $$
DECLARE
  v_dealer public.dealers;
BEGIN
  IF NOT public.is_admin() THEN RAISE EXCEPTION 'Not authorized'; END IF;

  SELECT * INTO v_dealer FROM public.dealers WHERE id = p_dealer_id FOR UPDATE;
  IF v_dealer.id IS NULL THEN RAISE EXCEPTION 'Listing not found'; END IF;

  IF p_approve THEN
    IF v_dealer.city_id IS NULL AND v_dealer.requested_city IS NOT NULL THEN
      UPDATE public.dealers
      SET city_id = public._find_or_create_city(v_dealer.country_id, v_dealer.requested_city),
          requested_city = NULL
      WHERE id = p_dealer_id;
    END IF;
    UPDATE public.dealers SET status = 'approved', admin_note = nullif(btrim(p_note), '') WHERE id = p_dealer_id;
  ELSE
    UPDATE public.dealers SET status = 'rejected', admin_note = nullif(btrim(p_note), '') WHERE id = p_dealer_id;
  END IF;
END;
$$;

CREATE OR REPLACE FUNCTION public.admin_review_claim(p_claim_id UUID, p_approve BOOLEAN, p_note TEXT DEFAULT NULL)
RETURNS VOID
LANGUAGE plpgsql SECURITY DEFINER SET search_path = ''
AS $$
DECLARE
  v_claim public.dealer_claims;
BEGIN
  IF NOT public.is_admin() THEN RAISE EXCEPTION 'Not authorized'; END IF;

  SELECT * INTO v_claim FROM public.dealer_claims WHERE id = p_claim_id AND status = 'pending' FOR UPDATE;
  IF v_claim.id IS NULL THEN RAISE EXCEPTION 'Claim not found or already reviewed'; END IF;

  UPDATE public.dealer_claims
  SET status = CASE WHEN p_approve THEN 'approved' ELSE 'rejected' END::public.request_status,
      admin_note = nullif(btrim(p_note), ''), reviewed_by = auth.uid(), reviewed_at = now()
  WHERE id = p_claim_id;

  IF p_approve THEN
    UPDATE public.dealers SET owner_id = v_claim.user_id WHERE id = v_claim.dealer_id;
    UPDATE public.dealer_claims
    SET status = 'rejected', admin_note = 'Listing was claimed by another user',
        reviewed_by = auth.uid(), reviewed_at = now()
    WHERE dealer_id = v_claim.dealer_id AND status = 'pending' AND id <> p_claim_id;
  END IF;
END;
$$;

CREATE OR REPLACE FUNCTION public.admin_review_change(p_request_id UUID, p_approve BOOLEAN, p_note TEXT DEFAULT NULL)
RETURNS VOID
LANGUAGE plpgsql SECURITY DEFINER SET search_path = ''
AS $$
DECLARE
  v_req public.dealer_change_requests;
  v_country_id UUID;
  v_changes JSONB;
BEGIN
  IF NOT public.is_admin() THEN RAISE EXCEPTION 'Not authorized'; END IF;

  SELECT * INTO v_req FROM public.dealer_change_requests WHERE id = p_request_id AND status = 'pending' FOR UPDATE;
  IF v_req.id IS NULL THEN RAISE EXCEPTION 'Change request not found or already reviewed'; END IF;

  IF p_approve THEN
    v_changes := v_req.changes;
    IF nullif(v_changes->>'requested_city', '') IS NOT NULL THEN
      SELECT country_id INTO v_country_id FROM public.dealers WHERE id = v_req.dealer_id;
      v_changes := (v_changes - 'requested_city')
        || jsonb_build_object('city_id', public._find_or_create_city(v_country_id, v_changes->>'requested_city'));
    END IF;
    PERFORM public._apply_dealer_fields(v_req.dealer_id, v_changes);
  END IF;

  UPDATE public.dealer_change_requests
  SET status = CASE WHEN p_approve THEN 'approved' ELSE 'rejected' END::public.request_status,
      admin_note = nullif(btrim(p_note), ''), reviewed_by = auth.uid(), reviewed_at = now()
  WHERE id = p_request_id;
END;
$$;

-- Admins need submitter emails, which live in auth.users.
CREATE OR REPLACE FUNCTION public.admin_user_emails(p_ids UUID[])
RETURNS TABLE (id UUID, email TEXT)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  IF NOT public.is_admin() THEN RAISE EXCEPTION 'Not authorized'; END IF;
  RETURN QUERY SELECT u.id, u.email::TEXT FROM auth.users u WHERE u.id = ANY (p_ids);
END;
$$;

-- ---------------------------------------------------------------------------
-- 7. Function permissions
-- ---------------------------------------------------------------------------
REVOKE EXECUTE ON FUNCTION
  public._slugify(TEXT),
  public._unique_dealer_slug(TEXT),
  public._find_or_create_city(UUID, TEXT),
  public._validate_dealer_fields(JSONB),
  public._jsonb_text_array(JSONB),
  public._apply_dealer_fields(UUID, JSONB),
  public._domains_match(TEXT, TEXT),
  public.set_updated_at()
FROM PUBLIC, anon, authenticated;

REVOKE EXECUTE ON FUNCTION
  public.submit_dealer(JSONB),
  public.update_my_dealer(UUID, JSONB),
  public.withdraw_my_change_request(UUID),
  public.claim_dealer(UUID, TEXT),
  public.admin_review_dealer(UUID, BOOLEAN, TEXT),
  public.admin_review_claim(UUID, BOOLEAN, TEXT),
  public.admin_review_change(UUID, BOOLEAN, TEXT),
  public.admin_user_emails(UUID[])
FROM PUBLIC, anon;

GRANT EXECUTE ON FUNCTION
  public.submit_dealer(JSONB),
  public.update_my_dealer(UUID, JSONB),
  public.withdraw_my_change_request(UUID),
  public.claim_dealer(UUID, TEXT),
  public.admin_review_dealer(UUID, BOOLEAN, TEXT),
  public.admin_review_claim(UUID, BOOLEAN, TEXT),
  public.admin_review_change(UUID, BOOLEAN, TEXT),
  public.admin_user_emails(UUID[])
TO authenticated;

-- ---------------------------------------------------------------------------
-- 8. Logo storage
-- ---------------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('dealer-logos', 'dealer-logos', true, 1048576, ARRAY['image/png', 'image/jpeg', 'image/webp'])
ON CONFLICT (id) DO NOTHING;

CREATE OR REPLACE FUNCTION public.can_manage_dealer_folder(p_folder TEXT)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = ''
AS $$
  SELECT public.is_admin() OR EXISTS (
    SELECT 1 FROM public.dealers WHERE id::TEXT = p_folder AND owner_id = auth.uid()
  );
$$;

CREATE POLICY "Dealer owners can upload logos" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'dealer-logos' AND public.can_manage_dealer_folder((storage.foldername(name))[1]));

CREATE POLICY "Dealer owners can delete logos" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'dealer-logos' AND public.can_manage_dealer_folder((storage.foldername(name))[1]));
