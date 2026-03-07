-- Seed 10 largest UK cities (7 new + 3 existing)
-- Uses ON CONFLICT DO NOTHING so safe to re-run

DO $$
DECLARE
  uk_id uuid;
BEGIN
  SELECT id INTO uk_id FROM countries WHERE slug = 'united-kingdom';

  INSERT INTO cities (name, slug, country_id, state_province, lat, lng)
  VALUES
    ('London', 'london', uk_id, 'Greater London', 51.5074, -0.1278),
    ('Birmingham', 'birmingham', uk_id, 'West Midlands', 52.4862, -1.8904),
    ('Manchester', 'manchester', uk_id, 'Greater Manchester', 53.4808, -2.2426),
    ('Glasgow', 'glasgow', uk_id, 'Scotland', 55.8642, -4.2518),
    ('Leeds', 'leeds', uk_id, 'West Yorkshire', 53.8008, -1.5491),
    ('Liverpool', 'liverpool', uk_id, 'Merseyside', 53.4084, -2.9916),
    ('Edinburgh', 'edinburgh', uk_id, 'Scotland', 55.9533, -3.1883),
    ('Bristol', 'bristol', uk_id, 'Somerset', 51.4545, -2.5879),
    ('Sheffield', 'sheffield', uk_id, 'South Yorkshire', 53.3811, -1.4701),
    ('Newcastle', 'newcastle', uk_id, 'Tyne and Wear', 54.9783, -1.6178)
  ON CONFLICT (slug, country_id) DO NOTHING;

END $$;
