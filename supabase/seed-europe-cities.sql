-- Seed 9 European countries (if not exist) + 2 largest cities each = 18 cities
-- Uses ON CONFLICT DO NOTHING so safe to re-run

-- Ensure countries exist
INSERT INTO countries (name, slug, code, region) VALUES
  ('Ireland', 'ireland', 'IE', 'europe'),
  ('France', 'france', 'FR', 'europe'),
  ('Germany', 'germany', 'DE', 'europe'),
  ('Austria', 'austria', 'AT', 'europe'),
  ('Spain', 'spain', 'ES', 'europe'),
  ('Portugal', 'portugal', 'PT', 'europe'),
  ('Switzerland', 'switzerland', 'CH', 'europe'),
  ('Italy', 'italy', 'IT', 'europe'),
  ('Belgium', 'belgium', 'BE', 'europe')
ON CONFLICT (slug) DO NOTHING;

-- IRELAND
DO $$
DECLARE cid uuid;
BEGIN
  SELECT id INTO cid FROM countries WHERE slug = 'ireland';
  INSERT INTO cities (name, slug, country_id, state_province, lat, lng) VALUES
    ('Dublin', 'dublin', cid, 'Leinster', 53.3498, -6.2603),
    ('Cork', 'cork', cid, 'Munster', 51.8985, -8.4756)
  ON CONFLICT (slug, country_id) DO NOTHING;
END $$;

-- FRANCE
DO $$
DECLARE cid uuid;
BEGIN
  SELECT id INTO cid FROM countries WHERE slug = 'france';
  INSERT INTO cities (name, slug, country_id, state_province, lat, lng) VALUES
    ('Paris', 'paris', cid, 'Ile-de-France', 48.8566, 2.3522),
    ('Marseille', 'marseille', cid, 'Provence-Alpes-Cote d''Azur', 43.2965, 5.3698)
  ON CONFLICT (slug, country_id) DO NOTHING;
END $$;

-- GERMANY
DO $$
DECLARE cid uuid;
BEGIN
  SELECT id INTO cid FROM countries WHERE slug = 'germany';
  INSERT INTO cities (name, slug, country_id, state_province, lat, lng) VALUES
    ('Berlin', 'berlin', cid, 'Berlin', 52.5200, 13.4050),
    ('Munich', 'munich', cid, 'Bavaria', 48.1351, 11.5820)
  ON CONFLICT (slug, country_id) DO NOTHING;
END $$;

-- AUSTRIA
DO $$
DECLARE cid uuid;
BEGIN
  SELECT id INTO cid FROM countries WHERE slug = 'austria';
  INSERT INTO cities (name, slug, country_id, state_province, lat, lng) VALUES
    ('Vienna', 'vienna', cid, 'Vienna', 48.2082, 16.3738),
    ('Graz', 'graz', cid, 'Styria', 47.0707, 15.4395)
  ON CONFLICT (slug, country_id) DO NOTHING;
END $$;

-- SPAIN
DO $$
DECLARE cid uuid;
BEGIN
  SELECT id INTO cid FROM countries WHERE slug = 'spain';
  INSERT INTO cities (name, slug, country_id, state_province, lat, lng) VALUES
    ('Madrid', 'madrid', cid, 'Community of Madrid', 40.4168, -3.7038),
    ('Barcelona', 'barcelona', cid, 'Catalonia', 41.3874, 2.1686)
  ON CONFLICT (slug, country_id) DO NOTHING;
END $$;

-- PORTUGAL
DO $$
DECLARE cid uuid;
BEGIN
  SELECT id INTO cid FROM countries WHERE slug = 'portugal';
  INSERT INTO cities (name, slug, country_id, state_province, lat, lng) VALUES
    ('Lisbon', 'lisbon', cid, 'Lisbon District', 38.7223, -9.1393),
    ('Porto', 'porto', cid, 'Porto District', 41.1579, -8.6291)
  ON CONFLICT (slug, country_id) DO NOTHING;
END $$;

-- SWITZERLAND
DO $$
DECLARE cid uuid;
BEGIN
  SELECT id INTO cid FROM countries WHERE slug = 'switzerland';
  INSERT INTO cities (name, slug, country_id, state_province, lat, lng) VALUES
    ('Zurich', 'zurich', cid, 'Canton of Zurich', 47.3769, 8.5417),
    ('Geneva', 'geneva', cid, 'Canton of Geneva', 46.2044, 6.1432)
  ON CONFLICT (slug, country_id) DO NOTHING;
END $$;

-- ITALY
DO $$
DECLARE cid uuid;
BEGIN
  SELECT id INTO cid FROM countries WHERE slug = 'italy';
  INSERT INTO cities (name, slug, country_id, state_province, lat, lng) VALUES
    ('Rome', 'rome', cid, 'Lazio', 41.9028, 12.4964),
    ('Milan', 'milan', cid, 'Lombardy', 45.4642, 9.1900)
  ON CONFLICT (slug, country_id) DO NOTHING;
END $$;

-- BELGIUM
DO $$
DECLARE cid uuid;
BEGIN
  SELECT id INTO cid FROM countries WHERE slug = 'belgium';
  INSERT INTO cities (name, slug, country_id, state_province, lat, lng) VALUES
    ('Brussels', 'brussels', cid, 'Brussels-Capital Region', 50.8503, 4.3517),
    ('Antwerp', 'antwerp', cid, 'Flanders', 51.2194, 4.4025)
  ON CONFLICT (slug, country_id) DO NOTHING;
END $$;
