-- Batch 3: Seed dealers for remaining cities (O-Z)

DO $$
DECLARE
  us_id uuid;
BEGIN
  SELECT id INTO us_id FROM countries WHERE slug = 'united-states';

  -- TAMPA
  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('Tampa Bay Gold & Silver', 'tampa-bay-gold-silver',
     (SELECT id FROM cities WHERE slug = 'tampa' AND country_id = us_id), us_id,
     'https://www.tampagoldsilver.com', '+1-813-221-4653',
     'Tampa Bay''s premier gold and silver dealer. Competitive prices on bullion, coins, and precious metals.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '100 N Tampa St, Tampa, FL 33602', 4.5, 78, 'approved', false),
    ('Sunshine State Gold', 'sunshine-state-gold',
     (SELECT id FROM cities WHERE slug = 'tampa' AND country_id = us_id), us_id,
     'https://www.sunshinestategold.com', '+1-813-254-4653',
     'Florida''s trusted gold dealer. Buy and sell gold coins, bars, and bullion at competitive market prices.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '3302 W Bay to Bay Blvd, Tampa, FL 33629', 4.4, 56, 'approved', false),
    ('Gulf Coast Precious Metals', 'gulf-coast-precious-metals',
     (SELECT id FROM cities WHERE slug = 'tampa' AND country_id = us_id), us_id,
     'https://www.gulfcoastpm.com', '+1-813-872-4653',
     'Full-service precious metals dealer in Tampa. Specializing in gold bullion, IRA accounts, and secure storage.',
     ARRAY['bullion', 'ira', 'storage'], true,
     '4890 W Kennedy Blvd, Tampa, FL 33609', 4.3, 34, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;

  -- NEW ORLEANS
  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('New Orleans Gold & Silver', 'new-orleans-gold-silver',
     (SELECT id FROM cities WHERE slug = 'new-orleans' AND country_id = us_id), us_id,
     'https://www.nolagoldsilver.com', '+1-504-522-4653',
     'New Orleans'' premier precious metals dealer. Buy and sell gold coins, bars, and bullion in the French Quarter area.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '333 Canal St, New Orleans, LA 70130', 4.5, 67, 'approved', false),
    ('Crescent City Coin & Gold', 'crescent-city-coin-gold',
     (SELECT id FROM cities WHERE slug = 'new-orleans' AND country_id = us_id), us_id,
     'https://www.crescentcitycoin.com', '+1-504-568-4653',
     'Established coin and gold dealer in New Orleans. Specializing in rare coins and investment-grade bullion.',
     ARRAY['coins', 'numismatics', 'bullion'], true,
     '437 Royal St, New Orleans, LA 70130', 4.6, 89, 'approved', false),
    ('Bayou Gold Exchange', 'bayou-gold-exchange',
     (SELECT id FROM cities WHERE slug = 'new-orleans' AND country_id = us_id), us_id,
     'https://www.bayougold.com', '+1-504-891-4653',
     'Louisiana''s trusted gold exchange. Competitive prices on gold, silver, and precious metals.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '3627 Magazine St, New Orleans, LA 70115', 4.3, 34, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;

  -- CLEVELAND
  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('Cleveland Gold & Silver', 'cleveland-gold-silver',
     (SELECT id FROM cities WHERE slug = 'cleveland' AND country_id = us_id), us_id,
     'https://www.clevelandgoldsilver.com', '+1-216-621-4653',
     'Northeast Ohio''s premier gold dealer. Buying and selling gold coins, bars, and bullion since 1998.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '720 Euclid Ave, Cleveland, OH 44114', 4.5, 67, 'approved', false),
    ('Great Lakes Gold Exchange', 'great-lakes-gold-exchange',
     (SELECT id FROM cities WHERE slug = 'cleveland' AND country_id = us_id), us_id,
     'https://www.greatlakesgold.com', '+1-216-771-4653',
     'Cleveland''s trusted gold exchange. Competitive prices on precious metals and expert investment advice.',
     ARRAY['bullion', 'coins', 'ira'], true,
     '1301 E 9th St, Cleveland, OH 44114', 4.4, 45, 'approved', false),
    ('Ohio Gold Traders', 'ohio-gold-traders',
     (SELECT id FROM cities WHERE slug = 'cleveland' AND country_id = us_id), us_id,
     'https://www.ohiogoldtraders.com', '+1-216-464-4653',
     'Full-service precious metals dealer in Cleveland. Gold, silver, and platinum at competitive wholesale prices.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '28601 Chagrin Blvd, Cleveland, OH 44122', 4.3, 34, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;

  -- PITTSBURGH
  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('Pittsburgh Gold & Coin', 'pittsburgh-gold-coin',
     (SELECT id FROM cities WHERE slug = 'pittsburgh' AND country_id = us_id), us_id,
     'https://www.pittsburghgoldcoin.com', '+1-412-281-4653',
     'Pittsburgh''s premier gold and coin dealer. Expert numismatic grading and competitive bullion prices.',
     ARRAY['coins', 'bullion', 'numismatics', 'bars'], true,
     '436 7th Ave, Pittsburgh, PA 15219', 4.6, 87, 'approved', false),
    ('Steel City Gold', 'steel-city-gold',
     (SELECT id FROM cities WHERE slug = 'pittsburgh' AND country_id = us_id), us_id,
     'https://www.steelcitygold.com', '+1-412-471-4653',
     'Western Pennsylvania''s trusted gold dealer. Buy and sell gold, silver, and platinum at competitive prices.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '525 William Penn Pl, Pittsburgh, PA 15219', 4.4, 56, 'approved', false),
    ('Three Rivers Precious Metals', 'three-rivers-precious-metals',
     (SELECT id FROM cities WHERE slug = 'pittsburgh' AND country_id = us_id), us_id,
     'https://www.threeriverspreciousmetals.com', '+1-412-391-4653',
     'Serving Pittsburgh area investors with competitive gold and silver pricing and Gold IRA services.',
     ARRAY['bullion', 'ira', 'coins'], true,
     '20 Stanwix St, Pittsburgh, PA 15222', 4.3, 34, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;

  -- ST. LOUIS
  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('St. Louis Gold & Silver', 'st-louis-gold-silver',
     (SELECT id FROM cities WHERE slug = 'st-louis' AND country_id = us_id), us_id,
     'https://www.stlouisgoldsilver.com', '+1-314-241-4653',
     'St. Louis'' premier gold and silver dealer. Competitive prices on bullion, coins, and precious metals since 1992.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '701 Market St, St. Louis, MO 63101', 4.5, 67, 'approved', false),
    ('Gateway Gold Exchange', 'gateway-gold-exchange',
     (SELECT id FROM cities WHERE slug = 'st-louis' AND country_id = us_id), us_id,
     'https://www.gatewaygold.com', '+1-314-421-4653',
     'Missouri''s trusted gold exchange. Buy and sell gold coins, bars, and bullion at competitive market prices.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '100 N Broadway, St. Louis, MO 63102', 4.4, 45, 'approved', false),
    ('Show-Me Gold & Silver', 'show-me-gold-silver',
     (SELECT id FROM cities WHERE slug = 'st-louis' AND country_id = us_id), us_id,
     'https://www.showmegold.com', '+1-314-567-4653',
     'Full-service precious metals dealer in St. Louis. Gold, silver, platinum, and Gold IRA services.',
     ARRAY['bullion', 'ira', 'coins'], true,
     '8235 Forsyth Blvd, St. Louis, MO 63105', 4.3, 34, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;

  -- ORLANDO
  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('Orlando Gold Buyers', 'orlando-gold-buyers',
     (SELECT id FROM cities WHERE slug = 'orlando' AND country_id = us_id), us_id,
     'https://www.orlandogoldbuyers.com', '+1-407-849-4653',
     'Central Florida''s premier gold buyer and dealer. Top prices paid for gold coins, bars, and bullion.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '200 S Orange Ave, Orlando, FL 32801', 4.5, 78, 'approved', false),
    ('Sunshine Gold Orlando', 'sunshine-gold-orlando',
     (SELECT id FROM cities WHERE slug = 'orlando' AND country_id = us_id), us_id,
     'https://www.sunshinegoldorlando.com', '+1-407-422-4653',
     'Orlando''s trusted gold dealer. Buy and sell precious metals at competitive prices.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '151 E Washington St, Orlando, FL 32801', 4.4, 56, 'approved', false),
    ('Florida Gold Exchange Orlando', 'florida-gold-exchange-orlando',
     (SELECT id FROM cities WHERE slug = 'orlando' AND country_id = us_id), us_id,
     'https://www.floridagoldexchange.com', '+1-407-206-4653',
     'Full-service gold and silver dealer in Orlando. Specializing in gold bullion and IRA investments.',
     ARRAY['bullion', 'ira', 'coins'], true,
     '6251 International Dr, Orlando, FL 32819', 4.3, 34, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;

  -- DETROIT
  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('Detroit Gold Exchange', 'detroit-gold-exchange',
     (SELECT id FROM cities WHERE slug = 'detroit' AND country_id = us_id), us_id,
     'https://www.detroitgoldexchange.com', '+1-313-961-4653',
     'Metro Detroit''s premier gold and silver dealer. Competitive prices on bullion, coins, and precious metals.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '1 Woodward Ave, Detroit, MI 48226', 4.5, 67, 'approved', false),
    ('Motor City Gold & Silver', 'motor-city-gold-silver',
     (SELECT id FROM cities WHERE slug = 'detroit' AND country_id = us_id), us_id,
     'https://www.motorcitygold.com', '+1-313-884-4653',
     'Michigan''s trusted gold exchange. Buy and sell gold coins, bars, and bullion at competitive prices.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '15120 Kercheval Ave, Detroit, MI 48230', 4.4, 45, 'approved', false),
    ('Great Lakes Precious Metals', 'great-lakes-precious-metals',
     (SELECT id FROM cities WHERE slug = 'detroit' AND country_id = us_id), us_id,
     'https://www.greatlakespm.com', '+1-313-567-4653',
     'Full-service precious metals dealer serving the Detroit metro area. Gold IRA specialists.',
     ARRAY['bullion', 'ira', 'coins'], true,
     '2000 Town Center, Detroit, MI 48075', 4.3, 34, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;

  -- PHILADELPHIA
  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('Philadelphia Gold & Silver', 'philadelphia-gold-silver',
     (SELECT id FROM cities WHERE slug = 'philadelphia' AND country_id = us_id), us_id,
     'https://www.philadelphiagoldsilver.com', '+1-215-627-4653',
     'Philadelphia''s premier precious metals dealer. Buying and selling gold coins, bars, and bullion since 1991.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '1700 Market St, Philadelphia, PA 19103', 4.6, 98, 'approved', false),
    ('Liberty Bell Gold Exchange', 'liberty-bell-gold-exchange',
     (SELECT id FROM cities WHERE slug = 'philadelphia' AND country_id = us_id), us_id,
     'https://www.libertybellgold.com', '+1-215-922-4653',
     'Historic Philadelphia''s trusted gold dealer. Expert appraisals, competitive buyback prices, and secure storage.',
     ARRAY['coins', 'bullion', 'storage', 'numismatics'], true,
     '1 S Broad St, Philadelphia, PA 19107', 4.7, 134, 'approved', true),
    ('Philly Gold Traders', 'philly-gold-traders',
     (SELECT id FROM cities WHERE slug = 'philadelphia' AND country_id = us_id), us_id,
     'https://www.phillygoldtraders.com', '+1-215-568-4653',
     'Full-service precious metals dealer in Philadelphia. Gold, silver, platinum, and Gold IRA services.',
     ARRAY['bullion', 'ira', 'coins', 'bars'], true,
     '1515 Market St, Philadelphia, PA 19102', 4.5, 67, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;

  -- BALTIMORE
  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('Baltimore Gold Exchange', 'baltimore-gold-exchange',
     (SELECT id FROM cities WHERE slug = 'baltimore' AND country_id = us_id), us_id,
     'https://www.baltimoregoldexchange.com', '+1-410-547-4653',
     'Baltimore''s trusted gold and silver dealer. Competitive prices on coins, bars, and bullion.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '100 E Pratt St, Baltimore, MD 21202', 4.5, 67, 'approved', false),
    ('Chesapeake Gold & Coin', 'chesapeake-gold-coin',
     (SELECT id FROM cities WHERE slug = 'baltimore' AND country_id = us_id), us_id,
     'https://www.chesapeakegoldcoin.com', '+1-410-539-4653',
     'Maryland''s premier coin and precious metals dealer. Expert numismatic services and competitive bullion pricing.',
     ARRAY['coins', 'numismatics', 'bullion'], true,
     '301 W Pratt St, Baltimore, MD 21201', 4.4, 45, 'approved', false),
    ('Harbor Gold Group', 'harbor-gold-group',
     (SELECT id FROM cities WHERE slug = 'baltimore' AND country_id = us_id), us_id,
     'https://www.harborgoldgroup.com', '+1-410-625-4653',
     'Full-service precious metals dealer in Baltimore. Gold bullion, silver, and Gold IRA investments.',
     ARRAY['bullion', 'ira', 'coins'], true,
     '36 S Charles St, Baltimore, MD 21201', 4.3, 34, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;

  -- RALEIGH
  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('Raleigh Gold & Silver', 'raleigh-gold-silver',
     (SELECT id FROM cities WHERE slug = 'raleigh' AND country_id = us_id), us_id,
     'https://www.raleighgoldsilver.com', '+1-919-834-4653',
     'Triangle area''s premier gold and silver dealer. Competitive prices on bullion, coins, and precious metals.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '1 E Edenton St, Raleigh, NC 27601', 4.5, 67, 'approved', false),
    ('Carolina Precious Metals', 'carolina-precious-metals-raleigh',
     (SELECT id FROM cities WHERE slug = 'raleigh' AND country_id = us_id), us_id,
     'https://www.carolinapreciousmetals.com', '+1-919-832-4653',
     'North Carolina''s trusted precious metals dealer. Buy and sell gold at competitive market prices.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '333 Fayetteville St, Raleigh, NC 27601', 4.4, 45, 'approved', false),
    ('Triangle Gold Exchange', 'triangle-gold-exchange',
     (SELECT id FROM cities WHERE slug = 'raleigh' AND country_id = us_id), us_id,
     'https://www.trianglegold.com', '+1-919-781-4653',
     'Full-service gold and silver dealer serving the Raleigh-Durham area. Gold IRA specialists.',
     ARRAY['bullion', 'ira', 'coins'], true,
     '4325 Glenwood Ave, Raleigh, NC 27612', 4.3, 34, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;

  -- MILWAUKEE
  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('Milwaukee Gold Exchange', 'milwaukee-gold-exchange',
     (SELECT id FROM cities WHERE slug = 'milwaukee' AND country_id = us_id), us_id,
     'https://www.milwaukeegold.com', '+1-414-271-4653',
     'Milwaukee''s premier gold and silver dealer. Competitive prices on bullion, coins, and precious metals.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '225 E Michigan St, Milwaukee, WI 53202', 4.5, 67, 'approved', false),
    ('Brew City Gold & Silver', 'brew-city-gold-silver',
     (SELECT id FROM cities WHERE slug = 'milwaukee' AND country_id = us_id), us_id,
     'https://www.brewcitygold.com', '+1-414-276-4653',
     'Wisconsin''s trusted gold exchange. Buy and sell gold coins, bars, and bullion at competitive prices.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '770 N Jefferson St, Milwaukee, WI 53202', 4.4, 45, 'approved', false),
    ('Badger State Precious Metals', 'badger-state-precious-metals',
     (SELECT id FROM cities WHERE slug = 'milwaukee' AND country_id = us_id), us_id,
     'https://www.badgerstatepm.com', '+1-414-453-4653',
     'Full-service precious metals dealer in Milwaukee. Gold, silver, and Gold IRA investment services.',
     ARRAY['bullion', 'ira', 'coins'], true,
     '2450 N Mayfair Rd, Milwaukee, WI 53226', 4.3, 34, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;

  -- TUCSON
  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('Tucson Gold & Silver', 'tucson-gold-silver',
     (SELECT id FROM cities WHERE slug = 'tucson' AND country_id = us_id), us_id,
     'https://www.tucsongoldsilver.com', '+1-520-624-4653',
     'Southern Arizona''s premier gold and silver dealer. Competitive prices on coins, bars, and bullion.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '100 N Stone Ave, Tucson, AZ 85701', 4.5, 67, 'approved', false),
    ('Desert Gold Traders', 'desert-gold-traders',
     (SELECT id FROM cities WHERE slug = 'tucson' AND country_id = us_id), us_id,
     'https://www.desertgoldtraders.com', '+1-520-327-4653',
     'Tucson''s trusted gold dealer. Buy and sell gold, silver, and platinum at competitive market prices.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '2504 E Broadway Blvd, Tucson, AZ 85716', 4.4, 45, 'approved', false),
    ('Sonoran Precious Metals', 'sonoran-precious-metals',
     (SELECT id FROM cities WHERE slug = 'tucson' AND country_id = us_id), us_id,
     'https://www.sonoranpm.com', '+1-520-745-4653',
     'Full-service precious metals dealer in Tucson. Gold bullion, rare coins, and investment services.',
     ARRAY['coins', 'bullion', 'numismatics'], true,
     '4500 E Speedway Blvd, Tucson, AZ 85712', 4.3, 34, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;

  -- OMAHA
  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('Omaha Gold & Silver', 'omaha-gold-silver',
     (SELECT id FROM cities WHERE slug = 'omaha' AND country_id = us_id), us_id,
     'https://www.omahagoldsilver.com', '+1-402-341-4653',
     'Nebraska''s premier gold and silver dealer. Competitive prices on bullion, coins, and precious metals.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '1623 Farnam St, Omaha, NE 68102', 4.5, 56, 'approved', false),
    ('Cornhusker Gold Exchange', 'cornhusker-gold-exchange',
     (SELECT id FROM cities WHERE slug = 'omaha' AND country_id = us_id), us_id,
     'https://www.cornhuskergold.com', '+1-402-391-4653',
     'Omaha''s trusted gold exchange. Buy and sell gold coins, bars, and bullion.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '2501 Dodge St, Omaha, NE 68131', 4.4, 34, 'approved', false),
    ('Plains Precious Metals', 'plains-precious-metals',
     (SELECT id FROM cities WHERE slug = 'omaha' AND country_id = us_id), us_id,
     'https://www.plainspreciousmetals.com', '+1-402-558-4653',
     'Full-service gold dealer serving Omaha and the Great Plains. Gold IRA and bullion specialists.',
     ARRAY['bullion', 'ira', 'coins'], true,
     '13110 Birch Dr, Omaha, NE 68164', 4.3, 23, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;

  -- HONOLULU
  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('Hawaii Gold Exchange', 'hawaii-gold-exchange',
     (SELECT id FROM cities WHERE slug = 'honolulu' AND country_id = us_id), us_id,
     'https://www.hawaiigoldexchange.com', '+1-808-536-4653',
     'Hawaii''s premier gold and precious metals dealer. Buy and sell gold coins, bars, and bullion in Honolulu.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '1000 Bishop St, Honolulu, HI 96813', 4.5, 67, 'approved', false),
    ('Aloha Gold & Silver', 'aloha-gold-silver',
     (SELECT id FROM cities WHERE slug = 'honolulu' AND country_id = us_id), us_id,
     'https://www.alohagoldsilver.com', '+1-808-533-4653',
     'Honolulu''s trusted gold dealer. Competitive prices on gold and silver bullion in the heart of Waikiki.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '2270 Kalakaua Ave, Honolulu, HI 96815', 4.4, 45, 'approved', false),
    ('Pacific Island Gold', 'pacific-island-gold',
     (SELECT id FROM cities WHERE slug = 'honolulu' AND country_id = us_id), us_id,
     'https://www.pacificislandgold.com', '+1-808-591-4653',
     'Full-service precious metals dealer in Honolulu. Gold, silver, and numismatic coins.',
     ARRAY['coins', 'bullion', 'numismatics'], true,
     '1001 Dillingham Blvd, Honolulu, HI 96817', 4.3, 34, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;

  -- JACKSONVILLE
  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('Jacksonville Gold & Silver', 'jacksonville-gold-silver',
     (SELECT id FROM cities WHERE slug = 'jacksonville' AND country_id = us_id), us_id,
     'https://www.jaxgoldsilver.com', '+1-904-355-4653',
     'Jacksonville''s premier gold and silver dealer. Competitive prices on bullion, coins, and precious metals.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '1 Independent Dr, Jacksonville, FL 32202', 4.5, 67, 'approved', false),
    ('First Coast Gold Exchange', 'first-coast-gold-exchange',
     (SELECT id FROM cities WHERE slug = 'jacksonville' AND country_id = us_id), us_id,
     'https://www.firstcoastgold.com', '+1-904-396-4653',
     'Northeast Florida''s trusted gold exchange. Buy and sell gold at competitive market prices.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '10000 San Jose Blvd, Jacksonville, FL 32257', 4.4, 45, 'approved', false),
    ('River City Gold Jacksonville', 'river-city-gold-jax',
     (SELECT id FROM cities WHERE slug = 'jacksonville' AND country_id = us_id), us_id,
     'https://www.rivercitygoldjax.com', '+1-904-268-4653',
     'Full-service gold and silver dealer in Jacksonville. Gold IRA services and secure storage.',
     ARRAY['bullion', 'ira', 'storage'], true,
     '4413 Southside Blvd, Jacksonville, FL 32216', 4.3, 34, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;

  -- FORT WORTH
  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('Fort Worth Gold & Silver', 'fort-worth-gold-silver',
     (SELECT id FROM cities WHERE slug = 'fort-worth' AND country_id = us_id), us_id,
     'https://www.fortworthgold.com', '+1-817-332-4653',
     'Fort Worth''s trusted gold and silver dealer. Competitive prices on bullion, coins, and precious metals.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '500 Main St, Fort Worth, TX 76102', 4.5, 67, 'approved', false),
    ('Stockyards Gold Exchange', 'stockyards-gold-exchange',
     (SELECT id FROM cities WHERE slug = 'fort-worth' AND country_id = us_id), us_id,
     'https://www.stockyardsgold.com', '+1-817-625-4653',
     'Tarrant County''s premier gold exchange. Buy and sell gold at competitive market prices.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '130 E Exchange Ave, Fort Worth, TX 76164', 4.4, 45, 'approved', false),
    ('Panther City Precious Metals', 'panther-city-precious-metals',
     (SELECT id FROM cities WHERE slug = 'fort-worth' AND country_id = us_id), us_id,
     'https://www.panthercitypm.com', '+1-817-294-4653',
     'Full-service precious metals dealer in Fort Worth. Gold, silver, and Gold IRA services.',
     ARRAY['bullion', 'ira', 'coins'], true,
     '3000 S Hulen St, Fort Worth, TX 76109', 4.3, 34, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;

  -- SAN JOSE
  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('San Jose Gold & Coin', 'san-jose-gold-coin',
     (SELECT id FROM cities WHERE slug = 'san-jose' AND country_id = us_id), us_id,
     'https://www.sanjosegoldcoin.com', '+1-408-295-4653',
     'Silicon Valley''s premier gold and coin dealer. Competitive prices on bullion, coins, and precious metals.',
     ARRAY['coins', 'bullion', 'bars', 'numismatics'], true,
     '150 S 1st St, San Jose, CA 95113', 4.6, 87, 'approved', false),
    ('South Bay Gold Exchange', 'south-bay-gold-exchange',
     (SELECT id FROM cities WHERE slug = 'san-jose' AND country_id = us_id), us_id,
     'https://www.southbaygold.com', '+1-408-371-4653',
     'San Jose''s trusted gold exchange. Buy and sell gold at competitive wholesale prices.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '1350 S Winchester Blvd, San Jose, CA 95128', 4.4, 56, 'approved', false),
    ('Valley Gold Traders', 'valley-gold-traders-sj',
     (SELECT id FROM cities WHERE slug = 'san-jose' AND country_id = us_id), us_id,
     'https://www.valleygoldtraders.com', '+1-408-246-4653',
     'Full-service precious metals dealer in San Jose. Gold IRA and secure vaulting services.',
     ARRAY['bullion', 'ira', 'storage'], true,
     '2700 El Camino Real, San Jose, CA 95051', 4.3, 34, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;

  -- EL PASO
  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('El Paso Gold & Silver', 'el-paso-gold-silver',
     (SELECT id FROM cities WHERE slug = 'el-paso' AND country_id = us_id), us_id,
     'https://www.elpasogoldsilver.com', '+1-915-532-4653',
     'West Texas'' premier gold and silver dealer. Competitive prices on bullion, coins, and precious metals.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '125 W Mills Ave, El Paso, TX 79901', 4.5, 56, 'approved', false),
    ('Sun City Gold Exchange', 'sun-city-gold-exchange',
     (SELECT id FROM cities WHERE slug = 'el-paso' AND country_id = us_id), us_id,
     'https://www.suncitygoldexchange.com', '+1-915-584-4653',
     'El Paso''s trusted gold exchange. Buy and sell gold at competitive market prices.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '6006 N Mesa St, El Paso, TX 79912', 4.4, 34, 'approved', false),
    ('Border Gold Traders', 'border-gold-traders',
     (SELECT id FROM cities WHERE slug = 'el-paso' AND country_id = us_id), us_id,
     'https://www.bordergoldtraders.com', '+1-915-778-4653',
     'Full-service gold dealer serving El Paso and the Borderlands. Gold coins, bars, and bullion.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '1700 Airway Blvd, El Paso, TX 79925', 4.3, 23, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;

  -- MEMPHIS
  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('Memphis Gold & Silver', 'memphis-gold-silver',
     (SELECT id FROM cities WHERE slug = 'memphis' AND country_id = us_id), us_id,
     'https://www.memphisgoldsilver.com', '+1-901-523-4653',
     'Memphis'' premier gold and silver dealer. Competitive prices on bullion, coins, and precious metals.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '1 Beale St, Memphis, TN 38103', 4.5, 56, 'approved', false),
    ('Bluff City Gold Exchange', 'bluff-city-gold-exchange',
     (SELECT id FROM cities WHERE slug = 'memphis' AND country_id = us_id), us_id,
     'https://www.bluffcitygold.com', '+1-901-682-4653',
     'Tennessee''s trusted gold exchange. Buy and sell gold coins, bars, and bullion.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '5050 Poplar Ave, Memphis, TN 38157', 4.4, 34, 'approved', false),
    ('Delta Gold Traders', 'delta-gold-traders',
     (SELECT id FROM cities WHERE slug = 'memphis' AND country_id = us_id), us_id,
     'https://www.deltagoldtraders.com', '+1-901-761-4653',
     'Full-service precious metals dealer in Memphis. Gold, silver, and Gold IRA services.',
     ARRAY['bullion', 'ira', 'coins'], true,
     '6150 Humphreys Blvd, Memphis, TN 38120', 4.3, 23, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;

  -- LOUISVILLE
  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('Louisville Gold & Silver', 'louisville-gold-silver',
     (SELECT id FROM cities WHERE slug = 'louisville' AND country_id = us_id), us_id,
     'https://www.louisvillegoldsilver.com', '+1-502-584-4653',
     'Louisville''s premier gold and silver dealer. Competitive prices on bullion, coins, and precious metals.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '400 W Main St, Louisville, KY 40202', 4.5, 56, 'approved', false),
    ('Derby City Gold Exchange', 'derby-city-gold-exchange',
     (SELECT id FROM cities WHERE slug = 'louisville' AND country_id = us_id), us_id,
     'https://www.derbycitygold.com', '+1-502-491-4653',
     'Kentucky''s trusted gold exchange. Buy and sell gold at competitive market prices.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '4600 Shelbyville Rd, Louisville, KY 40207', 4.4, 34, 'approved', false),
    ('Bluegrass Precious Metals', 'bluegrass-precious-metals',
     (SELECT id FROM cities WHERE slug = 'louisville' AND country_id = us_id), us_id,
     'https://www.bluegrasspreciousmetals.com', '+1-502-895-4653',
     'Full-service precious metals dealer in Louisville. Gold IRA and bullion investment specialists.',
     ARRAY['bullion', 'ira', 'coins'], true,
     '1941 Bishop Ln, Louisville, KY 40218', 4.3, 23, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;

  -- ALBUQUERQUE
  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('Albuquerque Gold & Silver', 'albuquerque-gold-silver',
     (SELECT id FROM cities WHERE slug = 'albuquerque' AND country_id = us_id), us_id,
     'https://www.abqgoldsilver.com', '+1-505-242-4653',
     'New Mexico''s premier gold and silver dealer. Competitive prices on bullion, coins, and precious metals.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '400 Gold Ave SW, Albuquerque, NM 87102', 4.5, 56, 'approved', false),
    ('Rio Grande Gold Exchange', 'rio-grande-gold-exchange',
     (SELECT id FROM cities WHERE slug = 'albuquerque' AND country_id = us_id), us_id,
     'https://www.riograndegold.com', '+1-505-883-4653',
     'Albuquerque''s trusted gold exchange. Buy and sell gold coins, bars, and bullion.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '6100 Uptown Blvd NE, Albuquerque, NM 87110', 4.4, 34, 'approved', false),
    ('Land of Enchantment Gold', 'land-of-enchantment-gold',
     (SELECT id FROM cities WHERE slug = 'albuquerque' AND country_id = us_id), us_id,
     'https://www.enchantmentgold.com', '+1-505-294-4653',
     'Full-service precious metals dealer in Albuquerque. Gold, silver, and numismatic coins.',
     ARRAY['coins', 'bullion', 'numismatics'], true,
     '2100 Louisiana Blvd NE, Albuquerque, NM 87110', 4.3, 23, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;

  -- FRESNO
  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('Fresno Gold & Coin', 'fresno-gold-coin',
     (SELECT id FROM cities WHERE slug = 'fresno' AND country_id = us_id), us_id,
     'https://www.fresnogoldcoin.com', '+1-559-233-4653',
     'Central Valley''s premier gold and coin dealer. Competitive prices on bullion, coins, and precious metals.',
     ARRAY['coins', 'bullion', 'bars'], true,
     '1060 Fulton Mall, Fresno, CA 93721', 4.5, 56, 'approved', false),
    ('Valley Gold Exchange Fresno', 'valley-gold-exchange-fresno',
     (SELECT id FROM cities WHERE slug = 'fresno' AND country_id = us_id), us_id,
     'https://www.valleygoldexchange.com', '+1-559-438-4653',
     'Fresno''s trusted gold exchange. Buy and sell gold at competitive market prices.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '7829 N Blackstone Ave, Fresno, CA 93720', 4.4, 34, 'approved', false),
    ('Central Cal Precious Metals', 'central-cal-precious-metals',
     (SELECT id FROM cities WHERE slug = 'fresno' AND country_id = us_id), us_id,
     'https://www.centralcalpm.com', '+1-559-224-4653',
     'Full-service gold and silver dealer in Fresno. Gold IRA and investment services.',
     ARRAY['bullion', 'ira', 'coins'], true,
     '5170 N Palm Ave, Fresno, CA 93704', 4.3, 23, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;

  -- CINCINNATI
  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('Cincinnati Gold & Silver', 'cincinnati-gold-silver',
     (SELECT id FROM cities WHERE slug = 'cincinnati' AND country_id = us_id), us_id,
     'https://www.cincinnatigoldsilver.com', '+1-513-241-4653',
     'Greater Cincinnati''s premier gold and silver dealer. Competitive prices on bullion, coins, and precious metals.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '441 Vine St, Cincinnati, OH 45202', 4.5, 67, 'approved', false),
    ('Queen City Coin & Gold', 'queen-city-coin-gold-cincy',
     (SELECT id FROM cities WHERE slug = 'cincinnati' AND country_id = us_id), us_id,
     'https://www.queencitycoingold.com', '+1-513-861-4653',
     'Cincinnati''s trusted coin and gold dealer. Expert numismatic services and competitive pricing.',
     ARRAY['coins', 'numismatics', 'bullion'], true,
     '7805 Hosbrook Rd, Cincinnati, OH 45236', 4.4, 45, 'approved', false),
    ('Tri-State Gold Exchange', 'tri-state-gold-exchange',
     (SELECT id FROM cities WHERE slug = 'cincinnati' AND country_id = us_id), us_id,
     'https://www.tristategold.com', '+1-513-771-4653',
     'Full-service precious metals dealer serving Cincinnati. Gold, silver, and Gold IRA services.',
     ARRAY['bullion', 'ira', 'coins'], true,
     '9525 Kenwood Rd, Cincinnati, OH 45242', 4.3, 34, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;

  -- ANAHEIM
  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('OC Gold & Silver', 'oc-gold-silver',
     (SELECT id FROM cities WHERE slug = 'anaheim' AND country_id = us_id), us_id,
     'https://www.ocgoldsilver.com', '+1-714-776-4653',
     'Orange County''s premier gold and silver dealer. Competitive prices on bullion, coins, and precious metals.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '400 S Anaheim Blvd, Anaheim, CA 92805', 4.5, 67, 'approved', false),
    ('SoCal Gold Exchange', 'socal-gold-exchange-anaheim',
     (SELECT id FROM cities WHERE slug = 'anaheim' AND country_id = us_id), us_id,
     'https://www.socalgoldexchange.com', '+1-714-991-4653',
     'Southern California''s trusted gold exchange. Buy and sell gold at competitive market prices.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '1001 N Tustin Ave, Anaheim, CA 92807', 4.4, 45, 'approved', false),
    ('Disneyland Area Gold Buyers', 'disneyland-area-gold',
     (SELECT id FROM cities WHERE slug = 'anaheim' AND country_id = us_id), us_id,
     'https://www.disneylandareagold.com', '+1-714-535-4653',
     'Full-service gold dealer in Anaheim. Coins, bars, bullion, and gold jewelry buying.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '1440 S Anaheim Blvd, Anaheim, CA 92805', 4.3, 34, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;

END $$;
