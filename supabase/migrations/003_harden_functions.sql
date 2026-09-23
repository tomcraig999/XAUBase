-- Tidy-ups flagged by the Supabase security advisor after 002.

-- Trigger functions from 001 were callable as RPCs and had a mutable search_path.
-- (EXECUTE is only checked when a trigger is created, so revoking doesn't stop them firing.)
ALTER FUNCTION public.handle_new_user() SET search_path = public;
ALTER FUNCTION public.update_dealer_rating() SET search_path = public;
REVOKE EXECUTE ON FUNCTION public.handle_new_user(), public.update_dealer_rating() FROM PUBLIC, anon, authenticated;

-- Only signed-in users need these.
REVOKE EXECUTE ON FUNCTION public.is_admin(), public.can_manage_dealer_folder(TEXT) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_admin(), public.can_manage_dealer_folder(TEXT) TO authenticated;
