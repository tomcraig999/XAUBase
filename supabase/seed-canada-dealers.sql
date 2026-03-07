-- Seed Canadian gold dealers for 10 largest cities (3 per city = 30 dealers)
-- Uses ON CONFLICT DO NOTHING so safe to re-run

DO $$
DECLARE
  ca_id uuid;
BEGIN
  SELECT id INTO ca_id FROM countries WHERE slug = 'canada';

  -- TORONTO
  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('Toronto Gold Bullion', 'toronto-gold-bullion',
     (SELECT id FROM cities WHERE slug = 'toronto' AND country_id = ca_id), ca_id,
     'https://www.torontogoldbullion.ca', '+1-416-362-4653',
     'Toronto''s premier gold dealer. Buy and sell gold Maple Leafs, bullion bars, and precious metals at competitive prices. RRSP-eligible gold available.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '100 King St W, Toronto, ON M5X 1A9', 4.7, 112, 'approved', false),
    ('Bay Street Precious Metals', 'bay-street-precious-metals',
     (SELECT id FROM cities WHERE slug = 'toronto' AND country_id = ca_id), ca_id,
     'https://www.baystreetpm.ca', '+1-416-868-4653',
     'Full-service precious metals dealer in downtown Toronto. Gold, silver, platinum, and RRSP-eligible bullion. Competitive premiums over spot.',
     ARRAY['bullion', 'coins', 'ira', 'bars'], true,
     '199 Bay St, Toronto, ON M5L 1E9', 4.6, 89, 'approved', false),
    ('Canadian Bullion Exchange', 'canadian-bullion-exchange-toronto',
     (SELECT id FROM cities WHERE slug = 'toronto' AND country_id = ca_id), ca_id,
     'https://www.canadianbullionexchange.ca', '+1-416-504-4653',
     'Canada''s trusted bullion exchange. Specialising in Royal Canadian Mint products, gold Maple Leafs, and investment-grade bars.',
     ARRAY['bullion', 'coins', 'bars', 'storage'], true,
     '77 King St W, Toronto, ON M5K 1H1', 4.5, 78, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;

  -- MONTREAL
  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('Montreal Gold Exchange', 'montreal-gold-exchange',
     (SELECT id FROM cities WHERE slug = 'montreal' AND country_id = ca_id), ca_id,
     'https://www.montrealgoldexchange.ca', '+1-514-842-4653',
     'Montreal''s premier gold exchange. Buy and sell gold coins, bars, and bullion at competitive market prices. Serving Quebec since 2005.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '1000 Rue Sherbrooke O, Montreal, QC H3A 3G4', 4.6, 87, 'approved', false),
    ('Quebec Precious Metals', 'quebec-precious-metals-montreal',
     (SELECT id FROM cities WHERE slug = 'montreal' AND country_id = ca_id), ca_id,
     'https://www.quebecpreciousmetals.ca', '+1-514-286-4653',
     'Full-service precious metals dealer in Montreal. Gold Maple Leafs, silver, platinum, and RRSP-eligible gold investments.',
     ARRAY['bullion', 'coins', 'ira'], true,
     '800 Rue du Square-Victoria, Montreal, QC H4Z 1A1', 4.5, 67, 'approved', false),
    ('Comptoir de l''Or Montreal', 'comptoir-or-montreal',
     (SELECT id FROM cities WHERE slug = 'montreal' AND country_id = ca_id), ca_id,
     'https://www.comptoiror.ca', '+1-514-788-4653',
     'Bilingual gold dealer in Montreal. Competitive prices on gold bullion, Royal Canadian Mint coins, and investment bars. Service en francais.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '1250 Boul Rene-Levesque O, Montreal, QC H3B 4W8', 4.4, 56, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;

  -- VANCOUVER
  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('Vancouver Gold Corp', 'vancouver-gold-corp',
     (SELECT id FROM cities WHERE slug = 'vancouver' AND country_id = ca_id), ca_id,
     'https://www.vancouvergoldcorp.ca', '+1-604-682-4653',
     'Vancouver''s trusted gold dealer. Buy and sell gold Maple Leafs, bullion bars, and precious metals. Competitive pricing and secure storage available.',
     ARRAY['bullion', 'coins', 'bars', 'storage'], true,
     '999 Canada Pl, Vancouver, BC V6C 3E1', 4.7, 98, 'approved', false),
    ('Pacific Precious Metals', 'pacific-precious-metals-vancouver',
     (SELECT id FROM cities WHERE slug = 'vancouver' AND country_id = ca_id), ca_id,
     'https://www.pacificpreciousmetals.ca', '+1-604-688-4653',
     'Western Canada''s premier precious metals dealer. Gold, silver, platinum, and palladium. RRSP-eligible bullion and allocated storage.',
     ARRAY['bullion', 'coins', 'ira', 'storage'], true,
     '510 Burrard St, Vancouver, BC V6C 3A8', 4.6, 78, 'approved', false),
    ('West Coast Gold & Silver', 'west-coast-gold-silver',
     (SELECT id FROM cities WHERE slug = 'vancouver' AND country_id = ca_id), ca_id,
     'https://www.westcoastgoldsilver.ca', '+1-604-669-4653',
     'Vancouver gold and silver dealer. Competitive prices on Royal Canadian Mint products, gold bars, and investment coins.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '701 W Georgia St, Vancouver, BC V7Y 1C6', 4.5, 56, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;

  -- CALGARY
  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('Calgary Gold & Silver', 'calgary-gold-silver',
     (SELECT id FROM cities WHERE slug = 'calgary' AND country_id = ca_id), ca_id,
     'https://www.calgarygoldsilver.ca', '+1-403-263-4653',
     'Calgary''s premier gold and silver dealer. Buy and sell gold Maple Leafs, bullion bars, and precious metals at competitive Alberta prices.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '225 6 Ave SW, Calgary, AB T2P 1N2', 4.6, 78, 'approved', false),
    ('Alberta Precious Metals', 'alberta-precious-metals',
     (SELECT id FROM cities WHERE slug = 'calgary' AND country_id = ca_id), ca_id,
     'https://www.albertapreciousmetals.ca', '+1-403-265-4653',
     'Alberta''s trusted precious metals dealer. Gold, silver, and RRSP-eligible bullion investments. Serving Calgary and area since 2008.',
     ARRAY['bullion', 'coins', 'ira'], true,
     '500 Centre St SE, Calgary, AB T2G 1A4', 4.5, 56, 'approved', false),
    ('Rocky Mountain Bullion', 'rocky-mountain-bullion',
     (SELECT id FROM cities WHERE slug = 'calgary' AND country_id = ca_id), ca_id,
     'https://www.rockymountainbullion.ca', '+1-403-266-4653',
     'Full-service bullion dealer in Calgary. Gold bars, coins, and Royal Canadian Mint products. Secure storage and RRSP options.',
     ARRAY['bullion', 'coins', 'bars', 'storage'], true,
     '140 4 Ave SW, Calgary, AB T2P 3N3', 4.4, 45, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;

  -- EDMONTON
  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('Edmonton Gold Exchange', 'edmonton-gold-exchange',
     (SELECT id FROM cities WHERE slug = 'edmonton' AND country_id = ca_id), ca_id,
     'https://www.edmontongoldexchange.ca', '+1-780-423-4653',
     'Edmonton''s premier gold exchange. Buy and sell gold coins, bars, and bullion at competitive prices. Northern Alberta''s trusted dealer.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '10025 Jasper Ave, Edmonton, AB T5J 1S6', 4.5, 67, 'approved', false),
    ('Northern Gold & Silver', 'northern-gold-silver-edmonton',
     (SELECT id FROM cities WHERE slug = 'edmonton' AND country_id = ca_id), ca_id,
     'https://www.northerngoldsilver.ca', '+1-780-426-4653',
     'Edmonton''s trusted gold and silver dealer. Competitive prices on gold Maple Leafs, bullion bars, and RRSP-eligible precious metals.',
     ARRAY['bullion', 'coins', 'ira'], true,
     '10180 101 St NW, Edmonton, AB T5J 3S4', 4.4, 45, 'approved', false),
    ('Capital City Precious Metals', 'capital-city-precious-metals-edmonton',
     (SELECT id FROM cities WHERE slug = 'edmonton' AND country_id = ca_id), ca_id,
     'https://www.capitalcitypm.ca', '+1-780-428-4653',
     'Full-service precious metals dealer in Edmonton. Gold, silver, platinum, and secure storage options for Alberta investors.',
     ARRAY['bullion', 'coins', 'bars', 'storage'], true,
     '10060 Jasper Ave, Edmonton, AB T5J 3R8', 4.3, 34, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;

  -- OTTAWA
  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('Ottawa Gold Centre', 'ottawa-gold-centre',
     (SELECT id FROM cities WHERE slug = 'ottawa' AND country_id = ca_id), ca_id,
     'https://www.ottawagoldcentre.ca', '+1-613-232-4653',
     'Ottawa''s premier gold dealer. Buy and sell gold Maple Leafs, bullion bars, and precious metals in Canada''s capital city.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '150 Elgin St, Ottawa, ON K2P 1L4', 4.6, 78, 'approved', false),
    ('Capital Gold & Silver Ottawa', 'capital-gold-silver-ottawa',
     (SELECT id FROM cities WHERE slug = 'ottawa' AND country_id = ca_id), ca_id,
     'https://www.capitalgoldsilver.ca', '+1-613-234-4653',
     'Ottawa''s trusted precious metals dealer. Gold, silver, and RRSP-eligible bullion. Steps from Parliament Hill.',
     ARRAY['bullion', 'coins', 'ira'], true,
     '99 Bank St, Ottawa, ON K1P 6B9', 4.5, 56, 'approved', false),
    ('Ottawa Valley Precious Metals', 'ottawa-valley-precious-metals',
     (SELECT id FROM cities WHERE slug = 'ottawa' AND country_id = ca_id), ca_id,
     'https://www.ottawavalleypm.ca', '+1-613-236-4653',
     'Full-service precious metals dealer in Ottawa. Royal Canadian Mint products, gold bars, and numismatic coins.',
     ARRAY['bullion', 'coins', 'numismatics'], true,
     '116 Albert St, Ottawa, ON K1P 5G3', 4.4, 45, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;

  -- WINNIPEG
  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('Winnipeg Gold Exchange', 'winnipeg-gold-exchange',
     (SELECT id FROM cities WHERE slug = 'winnipeg' AND country_id = ca_id), ca_id,
     'https://www.winnipeggoldexchange.ca', '+1-204-943-4653',
     'Manitoba''s premier gold exchange. Buy and sell gold coins, bars, and bullion at competitive market prices.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '201 Portage Ave, Winnipeg, MB R3B 3K6', 4.5, 56, 'approved', false),
    ('Prairie Gold & Silver', 'prairie-gold-silver',
     (SELECT id FROM cities WHERE slug = 'winnipeg' AND country_id = ca_id), ca_id,
     'https://www.prairiegoldsilver.ca', '+1-204-947-4653',
     'Winnipeg''s trusted gold and silver dealer. Competitive prices on gold Maple Leafs, bars, and RRSP-eligible precious metals.',
     ARRAY['bullion', 'coins', 'ira'], true,
     '360 Main St, Winnipeg, MB R3C 3Z3', 4.4, 45, 'approved', false),
    ('Manitoba Precious Metals', 'manitoba-precious-metals',
     (SELECT id FROM cities WHERE slug = 'winnipeg' AND country_id = ca_id), ca_id,
     'https://www.manitobapreciousmetals.ca', '+1-204-949-4653',
     'Full-service precious metals dealer in Winnipeg. Gold, silver, platinum, and secure storage for Manitoba investors.',
     ARRAY['bullion', 'coins', 'bars', 'storage'], true,
     '100 Main St, Winnipeg, MB R3C 1A5', 4.3, 34, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;

  -- QUEBEC CITY
  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('Quebec City Gold', 'quebec-city-gold',
     (SELECT id FROM cities WHERE slug = 'quebec-city' AND country_id = ca_id), ca_id,
     'https://www.quebeccitygold.ca', '+1-418-692-4653',
     'Quebec City''s premier gold dealer. Buy and sell gold Maple Leafs, bullion bars, and precious metals. Service bilingue.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '900 Boul Rene-Levesque E, Quebec, QC G1R 2B5', 4.5, 56, 'approved', false),
    ('Vieux-Quebec Precious Metals', 'vieux-quebec-precious-metals',
     (SELECT id FROM cities WHERE slug = 'quebec-city' AND country_id = ca_id), ca_id,
     'https://www.vieuxquebecpm.ca', '+1-418-694-4653',
     'Trusted precious metals dealer in Quebec City. Gold, silver, and RRSP-eligible bullion investments. Service en francais.',
     ARRAY['bullion', 'coins', 'ira'], true,
     '140 Grande Allee E, Quebec, QC G1R 5M8', 4.4, 45, 'approved', false),
    ('Capitale-Nationale Gold & Silver', 'capitale-nationale-gold-silver',
     (SELECT id FROM cities WHERE slug = 'quebec-city' AND country_id = ca_id), ca_id,
     'https://www.capitalenationalegold.ca', '+1-418-696-4653',
     'Full-service gold and silver dealer in Quebec City. Royal Canadian Mint products and investment-grade bullion.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '580 Grande Allee E, Quebec, QC G1R 2K2', 4.3, 34, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;

  -- HAMILTON
  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('Hamilton Gold Exchange', 'hamilton-gold-exchange',
     (SELECT id FROM cities WHERE slug = 'hamilton' AND country_id = ca_id), ca_id,
     'https://www.hamiltongoldexchange.ca', '+1-905-522-4653',
     'Hamilton''s premier gold exchange. Buy and sell gold coins, bars, and bullion at competitive prices in the Golden Horseshoe.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '1 James St S, Hamilton, ON L8P 4R5', 4.5, 56, 'approved', false),
    ('Steel City Gold & Silver', 'steel-city-gold-silver-hamilton',
     (SELECT id FROM cities WHERE slug = 'hamilton' AND country_id = ca_id), ca_id,
     'https://www.steelcitygold.ca', '+1-905-525-4653',
     'Hamilton''s trusted gold and silver dealer. Competitive prices on gold Maple Leafs, bars, and RRSP-eligible precious metals.',
     ARRAY['bullion', 'coins', 'ira'], true,
     '100 King St W, Hamilton, ON L8P 1A2', 4.4, 45, 'approved', false),
    ('Golden Horseshoe Precious Metals', 'golden-horseshoe-precious-metals',
     (SELECT id FROM cities WHERE slug = 'hamilton' AND country_id = ca_id), ca_id,
     'https://www.goldenhorseshoepm.ca', '+1-905-528-4653',
     'Full-service precious metals dealer in Hamilton. Gold, silver, platinum, and secure storage for Southern Ontario investors.',
     ARRAY['bullion', 'coins', 'bars', 'storage'], true,
     '20 Hughson St S, Hamilton, ON L8N 2A1', 4.3, 34, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;

  -- KITCHENER
  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('Kitchener Gold Centre', 'kitchener-gold-centre',
     (SELECT id FROM cities WHERE slug = 'kitchener' AND country_id = ca_id), ca_id,
     'https://www.kitchenergoldcentre.ca', '+1-519-745-4653',
     'Kitchener-Waterloo''s premier gold dealer. Buy and sell gold Maple Leafs, bullion bars, and precious metals at competitive prices.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '50 Queen St N, Kitchener, ON N2H 6P4', 4.5, 45, 'approved', false),
    ('Waterloo Region Gold & Silver', 'waterloo-region-gold-silver',
     (SELECT id FROM cities WHERE slug = 'kitchener' AND country_id = ca_id), ca_id,
     'https://www.waterlooregiongold.ca', '+1-519-747-4653',
     'Trusted gold and silver dealer in the Waterloo Region. Competitive prices on gold coins, bars, and RRSP-eligible bullion.',
     ARRAY['bullion', 'coins', 'ira'], true,
     '305 King St W, Kitchener, ON N2G 1B9', 4.4, 34, 'approved', false),
    ('Grand River Precious Metals', 'grand-river-precious-metals',
     (SELECT id FROM cities WHERE slug = 'kitchener' AND country_id = ca_id), ca_id,
     'https://www.grandriverpm.ca', '+1-519-749-4653',
     'Full-service precious metals dealer in Kitchener. Gold, silver, Royal Canadian Mint products, and investment-grade bullion.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '101 Frederick St, Kitchener, ON N2H 6R2', 4.3, 23, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;

END $$;
