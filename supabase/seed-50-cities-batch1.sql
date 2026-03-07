-- Batch 1: Insert 40 new US cities (we already have 10)
-- Existing: Chicago, Dallas, Denver, Houston, Las Vegas, Los Angeles, Miami, New York, Phoenix, San Francisco

INSERT INTO cities (name, slug, country_id, state_province, lat, lng)
SELECT name, slug, (SELECT id FROM countries WHERE slug = 'united-states'), state_province, lat, lng
FROM (VALUES
  ('San Antonio', 'san-antonio', 'Texas', 29.4241, -98.4936),
  ('San Diego', 'san-diego', 'California', 32.7157, -117.1611),
  ('San Jose', 'san-jose', 'California', 37.3382, -121.8863),
  ('Austin', 'austin', 'Texas', 30.2672, -97.7431),
  ('Jacksonville', 'jacksonville', 'Florida', 30.3322, -81.6557),
  ('Fort Worth', 'fort-worth', 'Texas', 32.7555, -97.3308),
  ('Columbus', 'columbus', 'Ohio', 39.9612, -82.9988),
  ('Charlotte', 'charlotte', 'North Carolina', 35.2271, -80.8431),
  ('Indianapolis', 'indianapolis', 'Indiana', 39.7684, -86.1581),
  ('San Francisco', 'san-francisco', 'California', 37.7749, -122.4194),
  ('Seattle', 'seattle', 'Washington', 47.6062, -122.3321),
  ('Nashville', 'nashville', 'Tennessee', 36.1627, -86.7816),
  ('Washington', 'washington-dc', 'District of Columbia', 38.9072, -77.0369),
  ('Oklahoma City', 'oklahoma-city', 'Oklahoma', 35.4676, -97.5164),
  ('El Paso', 'el-paso', 'Texas', 31.7619, -106.4850),
  ('Boston', 'boston', 'Massachusetts', 42.3601, -71.0589),
  ('Portland', 'portland', 'Oregon', 45.5152, -122.6784),
  ('Memphis', 'memphis', 'Tennessee', 35.1495, -90.0490),
  ('Louisville', 'louisville', 'Kentucky', 38.2527, -85.7585),
  ('Baltimore', 'baltimore', 'Maryland', 39.2904, -76.6122),
  ('Milwaukee', 'milwaukee', 'Wisconsin', 43.0389, -87.9065),
  ('Albuquerque', 'albuquerque', 'New Mexico', 35.0844, -106.6504),
  ('Tucson', 'tucson', 'Arizona', 32.2226, -110.9747),
  ('Fresno', 'fresno', 'California', 36.7378, -119.7871),
  ('Sacramento', 'sacramento', 'California', 38.5816, -121.4944),
  ('Kansas City', 'kansas-city', 'Missouri', 39.0997, -94.5786),
  ('Atlanta', 'atlanta', 'Georgia', 33.7490, -84.3880),
  ('Omaha', 'omaha', 'Nebraska', 41.2565, -95.9345),
  ('Raleigh', 'raleigh', 'North Carolina', 35.7796, -78.6382),
  ('Minneapolis', 'minneapolis', 'Minnesota', 44.9778, -93.2650),
  ('Tampa', 'tampa', 'Florida', 27.9506, -82.4572),
  ('New Orleans', 'new-orleans', 'Louisiana', 29.9511, -90.0715),
  ('Cleveland', 'cleveland', 'Ohio', 41.4993, -81.6944),
  ('Honolulu', 'honolulu', 'Hawaii', 21.3069, -157.8583),
  ('Anaheim', 'anaheim', 'California', 33.8366, -117.9143),
  ('Pittsburgh', 'pittsburgh', 'Pennsylvania', 40.4406, -79.9959),
  ('Cincinnati', 'cincinnati', 'Ohio', 39.1031, -84.5120),
  ('St. Louis', 'st-louis', 'Missouri', 38.6270, -90.1994),
  ('Orlando', 'orlando', 'Florida', 28.5383, -81.3792),
  ('Detroit', 'detroit', 'Michigan', 42.3314, -83.0458),
  ('Philadelphia', 'philadelphia', 'Pennsylvania', 39.9526, -75.1652)
) AS v(name, slug, state_province, lat, lng)
ON CONFLICT (slug, country_id) DO NOTHING;
