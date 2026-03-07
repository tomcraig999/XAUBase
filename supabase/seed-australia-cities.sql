-- Seed Australia country (if not exists) + 10 largest Australian cities
-- Uses ON CONFLICT DO NOTHING so safe to re-run

-- Ensure Australia country exists
INSERT INTO countries (name, slug, code, region)
VALUES ('Australia', 'australia', 'AU', 'oceania')
ON CONFLICT (slug) DO NOTHING;

DO $$
DECLARE
  au_id uuid;
BEGIN
  SELECT id INTO au_id FROM countries WHERE slug = 'australia';

  INSERT INTO cities (name, slug, country_id, state_province, lat, lng)
  VALUES
    ('Sydney', 'sydney', au_id, 'New South Wales', -33.8688, 151.2093),
    ('Melbourne', 'melbourne', au_id, 'Victoria', -37.8136, 144.9631),
    ('Brisbane', 'brisbane', au_id, 'Queensland', -27.4698, 153.0251),
    ('Perth', 'perth', au_id, 'Western Australia', -31.9505, 115.8605),
    ('Adelaide', 'adelaide', au_id, 'South Australia', -34.9285, 138.6007),
    ('Gold Coast', 'gold-coast', au_id, 'Queensland', -28.0167, 153.4000),
    ('Canberra', 'canberra', au_id, 'Australian Capital Territory', -35.2809, 149.1300),
    ('Newcastle', 'newcastle-au', au_id, 'New South Wales', -32.9283, 151.7817),
    ('Hobart', 'hobart', au_id, 'Tasmania', -42.8821, 147.3272),
    ('Darwin', 'darwin', au_id, 'Northern Territory', -12.4634, 130.8456)
  ON CONFLICT (slug, country_id) DO NOTHING;

END $$;
