-- Seed UK gold dealers for 10 largest cities
-- London already has 5 dealers, Birmingham has 2, Manchester has 1
-- This adds dealers for all 10 cities (ON CONFLICT DO NOTHING for safety)

DO $$
DECLARE
  uk_id uuid;
BEGIN
  SELECT id INTO uk_id FROM countries WHERE slug = 'united-kingdom';

  -- LONDON (add 0 — already has 5 dealers)

  -- BIRMINGHAM (add 1 to reach 3)
  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('Midlands Gold & Silver', 'midlands-gold-silver',
     (SELECT id FROM cities WHERE slug = 'birmingham' AND country_id = uk_id), uk_id,
     'https://www.midlandsgoldsilver.co.uk', '+44-121-236-4653',
     'West Midlands'' premier gold and silver dealer. Buying and selling gold coins, bars, and bullion at competitive prices.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '45 Colmore Row, Birmingham B3 2AS', 4.5, 67, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;

  -- MANCHESTER (add 2 to reach 3)
  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('Northern Gold Exchange', 'northern-gold-exchange',
     (SELECT id FROM cities WHERE slug = 'manchester' AND country_id = uk_id), uk_id,
     'https://www.northerngoldexchange.co.uk', '+44-161-834-4653',
     'Manchester''s trusted gold exchange. Buy and sell gold bullion, coins, and bars at competitive wholesale prices.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '100 King St, Manchester M2 4WQ', 4.5, 78, 'approved', false),
    ('Manchester Precious Metals', 'manchester-precious-metals',
     (SELECT id FROM cities WHERE slug = 'manchester' AND country_id = uk_id), uk_id,
     'https://www.manchesterpreciousmetals.co.uk', '+44-161-228-4653',
     'Full-service precious metals dealer in Manchester. Gold, silver, platinum, and SIPP-eligible gold investments.',
     ARRAY['bullion', 'coins', 'ira'], true,
     '82 King St, Manchester M2 4WQ', 4.4, 45, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;

  -- GLASGOW
  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('Glasgow Gold Centre', 'glasgow-gold-centre',
     (SELECT id FROM cities WHERE slug = 'glasgow' AND country_id = uk_id), uk_id,
     'https://www.glasgowgoldcentre.co.uk', '+44-141-221-4653',
     'Scotland''s largest gold dealer. Buy and sell gold coins, bars, and bullion at Glasgow''s most competitive prices.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '48 West Nile St, Glasgow G1 2NP', 4.6, 98, 'approved', false),
    ('Clyde Gold & Silver', 'clyde-gold-silver',
     (SELECT id FROM cities WHERE slug = 'glasgow' AND country_id = uk_id), uk_id,
     'https://www.clydegoldsilver.co.uk', '+44-141-332-4653',
     'Glasgow''s trusted precious metals dealer. Competitive prices on gold bullion, sovereign coins, and Britannias.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '15 Royal Exchange Sq, Glasgow G1 3AJ', 4.5, 67, 'approved', false),
    ('Scottish Bullion Company', 'scottish-bullion-company',
     (SELECT id FROM cities WHERE slug = 'glasgow' AND country_id = uk_id), uk_id,
     'https://www.scottishbullion.co.uk', '+44-141-404-4653',
     'Scotland''s premier bullion dealer. Specialising in gold Britannias, sovereigns, and investment-grade bars. VAT-free gold.',
     ARRAY['bullion', 'coins', 'bars', 'storage'], true,
     '200 West George St, Glasgow G2 2PQ', 4.4, 45, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;

  -- LEEDS
  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('Leeds Gold Exchange', 'leeds-gold-exchange',
     (SELECT id FROM cities WHERE slug = 'leeds' AND country_id = uk_id), uk_id,
     'https://www.leedsgoldexchange.co.uk', '+44-113-245-4653',
     'Yorkshire''s premier gold exchange. Buy and sell gold coins, bars, and bullion at competitive market prices.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '34 The Headrow, Leeds LS1 6PT', 4.5, 78, 'approved', false),
    ('Yorkshire Gold & Silver', 'yorkshire-gold-silver',
     (SELECT id FROM cities WHERE slug = 'leeds' AND country_id = uk_id), uk_id,
     'https://www.yorkshiregoldsilver.co.uk', '+44-113-243-4653',
     'West Yorkshire''s trusted gold dealer. Specialising in gold sovereigns, Britannias, and investment-grade bullion.',
     ARRAY['coins', 'bullion', 'numismatics'], true,
     '5 King Edward St, Leeds LS1 6AX', 4.4, 56, 'approved', false),
    ('White Rose Precious Metals', 'white-rose-precious-metals',
     (SELECT id FROM cities WHERE slug = 'leeds' AND country_id = uk_id), uk_id,
     'https://www.whiterosepreciousmetals.co.uk', '+44-113-242-4653',
     'Full-service precious metals dealer in Leeds. Gold, silver, platinum, and SIPP-eligible gold investments.',
     ARRAY['bullion', 'ira', 'coins'], true,
     '1 Park Row, Leeds LS1 5AB', 4.3, 34, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;

  -- LIVERPOOL
  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('Liverpool Gold Exchange', 'liverpool-gold-exchange',
     (SELECT id FROM cities WHERE slug = 'liverpool' AND country_id = uk_id), uk_id,
     'https://www.liverpoolgoldexchange.co.uk', '+44-151-236-4653',
     'Merseyside''s premier gold exchange. Competitive prices on gold coins, bars, and bullion.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '4 Castle St, Liverpool L2 0NB', 4.5, 67, 'approved', false),
    ('Mersey Gold & Silver', 'mersey-gold-silver',
     (SELECT id FROM cities WHERE slug = 'liverpool' AND country_id = uk_id), uk_id,
     'https://www.merseygoldsilver.co.uk', '+44-151-227-4653',
     'Liverpool''s trusted gold and silver dealer. Buy and sell precious metals at competitive prices.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '20 Dale St, Liverpool L2 5TF', 4.4, 45, 'approved', false),
    ('North West Bullion', 'north-west-bullion',
     (SELECT id FROM cities WHERE slug = 'liverpool' AND country_id = uk_id), uk_id,
     'https://www.northwestbullion.co.uk', '+44-151-709-4653',
     'Full-service bullion dealer in Liverpool. Gold Britannias, sovereigns, and investment bars. VAT-free gold.',
     ARRAY['bullion', 'coins', 'storage'], true,
     '54 Victoria St, Liverpool L1 6DE', 4.3, 34, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;

  -- EDINBURGH
  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('Edinburgh Gold Company', 'edinburgh-gold-company',
     (SELECT id FROM cities WHERE slug = 'edinburgh' AND country_id = uk_id), uk_id,
     'https://www.edinburghgoldcompany.co.uk', '+44-131-225-4653',
     'Edinburgh''s premier gold dealer. Buy and sell gold coins, bars, and bullion in the heart of Scotland''s capital.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '85 George St, Edinburgh EH2 3EZ', 4.6, 89, 'approved', false),
    ('Royal Mile Gold & Silver', 'royal-mile-gold-silver',
     (SELECT id FROM cities WHERE slug = 'edinburgh' AND country_id = uk_id), uk_id,
     'https://www.royalmilegold.co.uk', '+44-131-226-4653',
     'Edinburgh''s trusted precious metals dealer. Competitive prices on gold sovereigns, Britannias, and bullion bars.',
     ARRAY['coins', 'bullion', 'numismatics'], true,
     '12 South St Andrew St, Edinburgh EH2 2AZ', 4.5, 67, 'approved', false),
    ('Caledonian Precious Metals', 'caledonian-precious-metals',
     (SELECT id FROM cities WHERE slug = 'edinburgh' AND country_id = uk_id), uk_id,
     'https://www.caledonianpreciousmetals.co.uk', '+44-131-557-4653',
     'Full-service precious metals dealer in Edinburgh. Gold, silver, platinum, and SIPP-eligible gold investments.',
     ARRAY['bullion', 'ira', 'coins', 'storage'], true,
     '1 Exchange Crescent, Edinburgh EH3 8UL', 4.4, 45, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;

  -- BRISTOL
  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('Bristol Gold Exchange', 'bristol-gold-exchange',
     (SELECT id FROM cities WHERE slug = 'bristol' AND country_id = uk_id), uk_id,
     'https://www.bristolgoldexchange.co.uk', '+44-117-929-4653',
     'Bristol''s premier gold exchange. Buy and sell gold coins, bars, and bullion at competitive prices.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '53 Corn St, Bristol BS1 1HT', 4.5, 67, 'approved', false),
    ('West Country Gold & Silver', 'west-country-gold-silver',
     (SELECT id FROM cities WHERE slug = 'bristol' AND country_id = uk_id), uk_id,
     'https://www.westcountrygold.co.uk', '+44-117-930-4653',
     'South West England''s trusted gold dealer. Specialising in gold bullion, sovereigns, and Britannia coins.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '29 Queen Charlotte St, Bristol BS1 4HJ', 4.4, 45, 'approved', false),
    ('Avon Precious Metals', 'avon-precious-metals',
     (SELECT id FROM cities WHERE slug = 'bristol' AND country_id = uk_id), uk_id,
     'https://www.avonpreciousmetals.co.uk', '+44-117-925-4653',
     'Full-service precious metals dealer in Bristol. Gold, silver, and SIPP-eligible gold investments.',
     ARRAY['bullion', 'ira', 'coins'], true,
     '1 Broad Quay, Bristol BS1 4DA', 4.3, 34, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;

  -- SHEFFIELD
  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('Sheffield Gold Centre', 'sheffield-gold-centre',
     (SELECT id FROM cities WHERE slug = 'sheffield' AND country_id = uk_id), uk_id,
     'https://www.sheffieldgoldcentre.co.uk', '+44-114-273-4653',
     'South Yorkshire''s premier gold dealer. Competitive prices on gold coins, bars, and bullion.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '15 Church St, Sheffield S1 1GJ', 4.5, 56, 'approved', false),
    ('Steel City Gold & Silver', 'steel-city-gold-silver-sheffield',
     (SELECT id FROM cities WHERE slug = 'sheffield' AND country_id = uk_id), uk_id,
     'https://www.steelcitygoldsilver.co.uk', '+44-114-275-4653',
     'Sheffield''s trusted gold exchange. Buy and sell gold sovereigns, Britannias, and investment-grade bullion.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '1 Tudor Sq, Sheffield S1 1SH', 4.4, 34, 'approved', false),
    ('South Yorkshire Precious Metals', 'south-yorkshire-precious-metals',
     (SELECT id FROM cities WHERE slug = 'sheffield' AND country_id = uk_id), uk_id,
     'https://www.southyorkshirepm.co.uk', '+44-114-276-4653',
     'Full-service precious metals dealer in Sheffield. Gold, silver, and SIPP-eligible gold investments.',
     ARRAY['bullion', 'ira', 'coins'], true,
     '6 Norfolk Row, Sheffield S1 2PA', 4.3, 23, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;

  -- NEWCASTLE
  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('Newcastle Gold Exchange', 'newcastle-gold-exchange',
     (SELECT id FROM cities WHERE slug = 'newcastle' AND country_id = uk_id), uk_id,
     'https://www.newcastlegoldexchange.co.uk', '+44-191-232-4653',
     'North East England''s premier gold exchange. Buy and sell gold coins, bars, and bullion at competitive prices.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '33 Grey St, Newcastle upon Tyne NE1 6EE', 4.5, 67, 'approved', false),
    ('Tyneside Gold & Silver', 'tyneside-gold-silver',
     (SELECT id FROM cities WHERE slug = 'newcastle' AND country_id = uk_id), uk_id,
     'https://www.tynesidegold.co.uk', '+44-191-261-4653',
     'Newcastle''s trusted precious metals dealer. Competitive prices on gold sovereigns, Britannias, and bullion bars.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '10 Mosley St, Newcastle upon Tyne NE1 1DE', 4.4, 45, 'approved', false),
    ('North East Bullion', 'north-east-bullion',
     (SELECT id FROM cities WHERE slug = 'newcastle' AND country_id = uk_id), uk_id,
     'https://www.northeastbullion.co.uk', '+44-191-230-4653',
     'Full-service bullion dealer in Newcastle. Gold, silver, platinum, and SIPP-eligible gold investments.',
     ARRAY['bullion', 'ira', 'coins', 'storage'], true,
     '1 St Nicholas St, Newcastle upon Tyne NE1 1RF', 4.3, 34, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;

END $$;
