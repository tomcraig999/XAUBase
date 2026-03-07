-- Seed Canada country (if not exists) + 10 largest Canadian cities
-- Uses ON CONFLICT DO NOTHING so safe to re-run

-- Ensure Canada country exists
INSERT INTO countries (name, slug, code, region)
VALUES ('Canada', 'canada', 'CA', 'north-america')
ON CONFLICT (slug) DO NOTHING;

DO $$
DECLARE
  ca_id uuid;
BEGIN
  SELECT id INTO ca_id FROM countries WHERE slug = 'canada';

  INSERT INTO cities (name, slug, country_id, state_province, lat, lng)
  VALUES
    ('Toronto', 'toronto', ca_id, 'Ontario', 43.6532, -79.3832),
    ('Montreal', 'montreal', ca_id, 'Quebec', 45.5017, -73.5673),
    ('Vancouver', 'vancouver', ca_id, 'British Columbia', 49.2827, -123.1207),
    ('Calgary', 'calgary', ca_id, 'Alberta', 51.0447, -114.0719),
    ('Edmonton', 'edmonton', ca_id, 'Alberta', 53.5461, -113.4938),
    ('Ottawa', 'ottawa', ca_id, 'Ontario', 45.4215, -75.6972),
    ('Winnipeg', 'winnipeg', ca_id, 'Manitoba', 49.8951, -97.1384),
    ('Quebec City', 'quebec-city', ca_id, 'Quebec', 46.8139, -71.2080),
    ('Hamilton', 'hamilton', ca_id, 'Ontario', 43.2557, -79.8711),
    ('Kitchener', 'kitchener', ca_id, 'Ontario', 43.4516, -80.4925)
  ON CONFLICT (slug, country_id) DO NOTHING;

END $$;
