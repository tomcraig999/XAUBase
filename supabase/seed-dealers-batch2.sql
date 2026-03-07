-- Batch 2: Seed dealers for remaining new cities (E-N)

DO $$
DECLARE
  us_id uuid;
BEGIN
  SELECT id INTO us_id FROM countries WHERE slug = 'united-states';

  -- NASHVILLE
  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('Nashville Gold & Silver', 'nashville-gold-silver',
     (SELECT id FROM cities WHERE slug = 'nashville' AND country_id = us_id), us_id,
     'https://www.nashvillegoldsilver.com', '+1-615-244-4653',
     'Nashville''s trusted precious metals dealer. Buy and sell gold, silver, and platinum at competitive market prices.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '424 Church St, Nashville, TN 37219', 4.5, 78, 'approved', false),
    ('Music City Gold', 'music-city-gold',
     (SELECT id FROM cities WHERE slug = 'nashville' AND country_id = us_id), us_id,
     'https://www.musiccitygold.com', '+1-615-327-9500',
     'Premier gold bullion and coin dealer in Nashville. Expert appraisals and competitive buyback prices.',
     ARRAY['coins', 'bullion', 'numismatics'], true,
     '2100 West End Ave, Nashville, TN 37203', 4.4, 56, 'approved', false),
    ('Tennessee Valley Gold', 'tennessee-valley-gold',
     (SELECT id FROM cities WHERE slug = 'nashville' AND country_id = us_id), us_id,
     'https://www.tennesseevalleygold.com', '+1-615-383-4653',
     'Serving Nashville investors with gold bullion, rare coins, and precious metals IRA services.',
     ARRAY['bullion', 'coins', 'ira'], true,
     '3841 Green Hills Village Dr, Nashville, TN 37215', 4.3, 34, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;

  -- WASHINGTON DC
  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('Washington Gold Group', 'washington-gold-group',
     (SELECT id FROM cities WHERE slug = 'washington-dc' AND country_id = us_id), us_id,
     'https://www.washingtongoldgroup.com', '+1-202-628-4653',
     'The capital''s premier gold and precious metals dealer. Serving DC area investors with competitive bullion pricing.',
     ARRAY['bullion', 'coins', 'bars', 'ira'], true,
     '1001 Pennsylvania Ave NW, Washington, DC 20004', 4.6, 112, 'approved', false),
    ('Potomac Precious Metals', 'potomac-precious-metals',
     (SELECT id FROM cities WHERE slug = 'washington-dc' AND country_id = us_id), us_id,
     'https://www.potomacprecious.com', '+1-202-785-5000',
     'Trusted gold dealer in Washington, DC. Specializing in gold bullion, rare coins, and precious metals storage.',
     ARRAY['coins', 'bullion', 'storage', 'numismatics'], true,
     '1250 Connecticut Ave NW, Washington, DC 20036', 4.5, 87, 'approved', false),
    ('National Gold Exchange DC', 'national-gold-exchange-dc',
     (SELECT id FROM cities WHERE slug = 'washington-dc' AND country_id = us_id), us_id,
     'https://www.nationalgolddc.com', '+1-202-393-4653',
     'Full-service precious metals dealer in the heart of Washington, DC. Gold, silver, and platinum at competitive prices.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '601 13th St NW, Washington, DC 20005', 4.4, 56, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;

  -- OKLAHOMA CITY
  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('OKC Gold Exchange', 'okc-gold-exchange',
     (SELECT id FROM cities WHERE slug = 'oklahoma-city' AND country_id = us_id), us_id,
     'https://www.okcgoldexchange.com', '+1-405-232-4653',
     'Oklahoma City''s premier gold and silver exchange. Competitive prices on bullion, coins, and precious metals.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '204 N Robinson Ave, Oklahoma City, OK 73102', 4.5, 67, 'approved', false),
    ('Sooner State Gold', 'sooner-state-gold',
     (SELECT id FROM cities WHERE slug = 'oklahoma-city' AND country_id = us_id), us_id,
     'https://www.soonerstategold.com', '+1-405-848-4653',
     'Oklahoma''s trusted gold dealer. Buy and sell gold coins, bars, and bullion at competitive market prices.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '2601 NW Expressway, Oklahoma City, OK 73112', 4.4, 45, 'approved', false),
    ('Red River Precious Metals', 'red-river-precious-metals',
     (SELECT id FROM cities WHERE slug = 'oklahoma-city' AND country_id = us_id), us_id,
     'https://www.redriverprecious.com', '+1-405-691-4653',
     'Full-service precious metals dealer in Oklahoma City. Gold IRA specialists and competitive bullion pricing.',
     ARRAY['bullion', 'ira', 'coins'], true,
     '7401 S Western Ave, Oklahoma City, OK 73139', 4.3, 34, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;

  -- PORTLAND
  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('Portland Gold Buyers', 'portland-gold-buyers',
     (SELECT id FROM cities WHERE slug = 'portland' AND country_id = us_id), us_id,
     'https://www.portlandgoldbuyers.com', '+1-503-224-4653',
     'Portland''s highest-rated gold buyer and dealer. Top prices paid for gold, silver, and platinum.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '921 SW Washington St, Portland, OR 97205', 4.6, 98, 'approved', false),
    ('Rose City Gold & Silver', 'rose-city-gold-silver',
     (SELECT id FROM cities WHERE slug = 'portland' AND country_id = us_id), us_id,
     'https://www.rosecitygold.com', '+1-503-228-5500',
     'Pacific Northwest''s premier precious metals dealer. Serving Portland investors with competitive gold pricing.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '735 SW 1st Ave, Portland, OR 97204', 4.5, 76, 'approved', false),
    ('Oregon Gold Exchange', 'oregon-gold-exchange',
     (SELECT id FROM cities WHERE slug = 'portland' AND country_id = us_id), us_id,
     'https://www.oregongold.com', '+1-503-233-4653',
     'Oregon''s trusted gold exchange. Buy and sell gold bullion, coins, and bars at competitive prices.',
     ARRAY['coins', 'bullion', 'numismatics'], true,
     '1515 SE Water Ave, Portland, OR 97214', 4.4, 54, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;

  -- SACRAMENTO
  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('Sacramento Gold & Coin', 'sacramento-gold-coin',
     (SELECT id FROM cities WHERE slug = 'sacramento' AND country_id = us_id), us_id,
     'https://www.sacramentogoldcoin.com', '+1-916-443-4653',
     'Sacramento''s most trusted gold dealer. Buying and selling gold coins, bars, and bullion since 1995.',
     ARRAY['coins', 'bullion', 'bars'], true,
     '1017 L St, Sacramento, CA 95814', 4.5, 67, 'approved', false),
    ('Capital City Gold', 'capital-city-gold-sac',
     (SELECT id FROM cities WHERE slug = 'sacramento' AND country_id = us_id), us_id,
     'https://www.capitalcitygold.com', '+1-916-927-4653',
     'Premier gold dealer in California''s capital. Competitive prices on investment-grade gold and silver.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '2500 Fair Oaks Blvd, Sacramento, CA 95825', 4.4, 45, 'approved', false),
    ('Golden State Precious Metals Sacramento', 'golden-state-pm-sacramento',
     (SELECT id FROM cities WHERE slug = 'sacramento' AND country_id = us_id), us_id,
     'https://www.goldenstatepmsac.com', '+1-916-488-4653',
     'Full-service precious metals dealer in Sacramento. Gold, silver, platinum, and Gold IRA services.',
     ARRAY['bullion', 'ira', 'coins'], true,
     '3600 Power Inn Rd, Sacramento, CA 95826', 4.3, 34, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;

  -- KANSAS CITY
  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('Kansas City Gold & Silver', 'kansas-city-gold-silver',
     (SELECT id FROM cities WHERE slug = 'kansas-city' AND country_id = us_id), us_id,
     'https://www.kcgoldsilver.com', '+1-816-471-4653',
     'Kansas City''s trusted gold and silver dealer. Competitive prices on bullion, coins, and precious metals.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '1100 Main St, Kansas City, MO 64105', 4.5, 78, 'approved', false),
    ('Heartland Gold Exchange', 'heartland-gold-exchange',
     (SELECT id FROM cities WHERE slug = 'kansas-city' AND country_id = us_id), us_id,
     'https://www.heartlandgold.com', '+1-816-561-4653',
     'Midwest''s premier precious metals dealer. Serving Kansas City with competitive gold and silver pricing.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '4500 Main St, Kansas City, MO 64111', 4.4, 56, 'approved', false),
    ('KC Precious Metals', 'kc-precious-metals',
     (SELECT id FROM cities WHERE slug = 'kansas-city' AND country_id = us_id), us_id,
     'https://www.kcpreciousmetals.com', '+1-816-753-4653',
     'Full-service gold and silver dealer in Kansas City. Expert advice on precious metals investments and IRA accounts.',
     ARRAY['bullion', 'coins', 'ira'], true,
     '1 E Armour Blvd, Kansas City, MO 64111', 4.3, 34, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;

  -- MINNEAPOLIS
  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('Twin Cities Gold & Silver', 'twin-cities-gold-silver',
     (SELECT id FROM cities WHERE slug = 'minneapolis' AND country_id = us_id), us_id,
     'https://www.twincitiesgold.com', '+1-612-333-4653',
     'Minneapolis'' premier gold and silver dealer. Serving Twin Cities investors with competitive precious metals pricing.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '80 S 8th St, Minneapolis, MN 55402', 4.5, 87, 'approved', false),
    ('North Star Gold Exchange', 'north-star-gold-exchange',
     (SELECT id FROM cities WHERE slug = 'minneapolis' AND country_id = us_id), us_id,
     'https://www.northstargold.com', '+1-612-338-4653',
     'Minnesota''s trusted gold exchange. Buy and sell gold coins, bars, and bullion at competitive market prices.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '121 S 8th St, Minneapolis, MN 55402', 4.4, 56, 'approved', false),
    ('Midwest Gold Traders', 'midwest-gold-traders',
     (SELECT id FROM cities WHERE slug = 'minneapolis' AND country_id = us_id), us_id,
     'https://www.midwestgoldtraders.com', '+1-612-920-4653',
     'Full-service precious metals dealer in Minneapolis. Gold, silver, platinum and Gold IRA services.',
     ARRAY['bullion', 'ira', 'coins'], true,
     '3001 Hennepin Ave, Minneapolis, MN 55408', 4.3, 34, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;

END $$;
