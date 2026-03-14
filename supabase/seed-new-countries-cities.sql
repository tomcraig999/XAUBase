-- Seed countries and cities for: Cayman Islands, Argentina, Brazil, New Zealand, South Africa, Singapore, Hong Kong, Thailand
-- Run this BEFORE the dealers seed

-- ============================================================
-- COUNTRIES
-- ============================================================
INSERT INTO countries (name, slug, code, region)
VALUES
  ('Cayman Islands', 'cayman-islands', 'KY', 'americas'),
  ('Argentina', 'argentina', 'AR', 'americas'),
  ('Brazil', 'brazil', 'BR', 'americas'),
  ('New Zealand', 'new-zealand', 'NZ', 'asia-pacific'),
  ('South Africa', 'south-africa', 'ZA', 'africa'),
  ('Singapore', 'singapore', 'SG', 'asia-pacific'),
  ('Hong Kong', 'hong-kong', 'HK', 'asia-pacific'),
  ('Thailand', 'thailand', 'TH', 'asia-pacific')
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- CITIES — Cayman Islands
-- ============================================================
DO $$
DECLARE ky_id UUID;
BEGIN
  SELECT id INTO ky_id FROM countries WHERE slug = 'cayman-islands';
  INSERT INTO cities (name, slug, country_id, state_province, lat, lng) VALUES
    ('George Town', 'george-town', ky_id, 'Grand Cayman', 19.2869, -81.3674)
  ON CONFLICT (slug, country_id) DO NOTHING;
END $$;

-- ============================================================
-- CITIES — Argentina
-- ============================================================
DO $$
DECLARE ar_id UUID;
BEGIN
  SELECT id INTO ar_id FROM countries WHERE slug = 'argentina';
  INSERT INTO cities (name, slug, country_id, state_province, lat, lng) VALUES
    ('Buenos Aires', 'buenos-aires', ar_id, 'Buenos Aires', -34.6037, -58.3816),
    ('Córdoba', 'cordoba', ar_id, 'Córdoba', -31.4201, -64.1888),
    ('Rosario', 'rosario', ar_id, 'Santa Fe', -32.9468, -60.6393)
  ON CONFLICT (slug, country_id) DO NOTHING;
END $$;

-- ============================================================
-- CITIES — Brazil
-- ============================================================
DO $$
DECLARE br_id UUID;
BEGIN
  SELECT id INTO br_id FROM countries WHERE slug = 'brazil';
  INSERT INTO cities (name, slug, country_id, state_province, lat, lng) VALUES
    ('São Paulo', 'sao-paulo', br_id, 'São Paulo', -23.5505, -46.6333),
    ('Rio de Janeiro', 'rio-de-janeiro', br_id, 'Rio de Janeiro', -22.9068, -43.1729),
    ('Brasília', 'brasilia', br_id, 'Distrito Federal', -15.7975, -47.8919)
  ON CONFLICT (slug, country_id) DO NOTHING;
END $$;

-- ============================================================
-- CITIES — New Zealand
-- ============================================================
DO $$
DECLARE nz_id UUID;
BEGIN
  SELECT id INTO nz_id FROM countries WHERE slug = 'new-zealand';
  INSERT INTO cities (name, slug, country_id, state_province, lat, lng) VALUES
    ('Auckland', 'auckland', nz_id, 'Auckland', -36.8485, 174.7633),
    ('Wellington', 'wellington', nz_id, 'Wellington', -41.2865, 174.7762),
    ('Christchurch', 'christchurch', nz_id, 'Canterbury', -43.5321, 172.6362)
  ON CONFLICT (slug, country_id) DO NOTHING;
END $$;

-- ============================================================
-- CITIES — South Africa
-- ============================================================
DO $$
DECLARE za_id UUID;
BEGIN
  SELECT id INTO za_id FROM countries WHERE slug = 'south-africa';
  INSERT INTO cities (name, slug, country_id, state_province, lat, lng) VALUES
    ('Johannesburg', 'johannesburg', za_id, 'Gauteng', -26.2041, 28.0473),
    ('Cape Town', 'cape-town', za_id, 'Western Cape', -33.9249, 18.4241),
    ('Durban', 'durban', za_id, 'KwaZulu-Natal', -29.8587, 31.0218),
    ('Pretoria', 'pretoria', za_id, 'Gauteng', -25.7479, 28.2293)
  ON CONFLICT (slug, country_id) DO NOTHING;
END $$;

-- ============================================================
-- CITIES — Singapore (city-state, single city)
-- ============================================================
DO $$
DECLARE sg_id UUID;
BEGIN
  SELECT id INTO sg_id FROM countries WHERE slug = 'singapore';
  INSERT INTO cities (name, slug, country_id, state_province, lat, lng) VALUES
    ('Singapore', 'singapore', sg_id, 'Singapore', 1.3521, 103.8198)
  ON CONFLICT (slug, country_id) DO NOTHING;
END $$;

-- ============================================================
-- CITIES — Hong Kong (special administrative region, single city)
-- ============================================================
DO $$
DECLARE hk_id UUID;
BEGIN
  SELECT id INTO hk_id FROM countries WHERE slug = 'hong-kong';
  INSERT INTO cities (name, slug, country_id, state_province, lat, lng) VALUES
    ('Hong Kong', 'hong-kong', hk_id, 'Hong Kong', 22.3193, 114.1694)
  ON CONFLICT (slug, country_id) DO NOTHING;
END $$;

-- ============================================================
-- CITIES — Thailand
-- ============================================================
DO $$
DECLARE th_id UUID;
BEGIN
  SELECT id INTO th_id FROM countries WHERE slug = 'thailand';
  INSERT INTO cities (name, slug, country_id, state_province, lat, lng) VALUES
    ('Bangkok', 'bangkok', th_id, 'Bangkok', 13.7563, 100.5018),
    ('Chiang Mai', 'chiang-mai', th_id, 'Chiang Mai', 18.7883, 98.9853)
  ON CONFLICT (slug, country_id) DO NOTHING;
END $$;
