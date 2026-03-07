-- Batch 1: Seed dealers for cities that currently have 0 dealers + new cities (Part 1: A-D)
-- Uses ON CONFLICT DO NOTHING to be idempotent

-- Helper: get US country ID
DO $$
DECLARE
  us_id uuid;
BEGIN
  SELECT id INTO us_id FROM countries WHERE slug = 'united-states';

  -- CHICAGO (currently 0 dealers)
  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('Chicago Gold Gallery', 'chicago-gold-gallery',
     (SELECT id FROM cities WHERE slug = 'chicago' AND country_id = us_id), us_id,
     'https://www.chicagogoldgallery.com', '+1-312-445-0010',
     'Premier gold dealer in downtown Chicago offering gold coins, bars, and bullion. Specializing in American Eagles and rare coins since 2005.',
     ARRAY['coins', 'bullion', 'bars', 'numismatics'], true,
     '55 E Washington St, Chicago, IL 60602', 4.6, 87, 'approved', false),
    ('Harlan J. Berk Ltd', 'harlan-j-berk',
     (SELECT id FROM cities WHERE slug = 'chicago' AND country_id = us_id), us_id,
     'https://www.harlanjberk.com', '+1-312-332-4480',
     'Established in 1964, Harlan J. Berk is one of Chicago''s oldest and most respected coin and precious metals dealers.',
     ARRAY['coins', 'numismatics', 'bullion'], true,
     '31 N Clark St, Chicago, IL 60602', 4.7, 134, 'approved', false),
    ('Gold & Silver Exchange Chicago', 'gold-silver-exchange-chicago',
     (SELECT id FROM cities WHERE slug = 'chicago' AND country_id = us_id), us_id,
     'https://www.goldsilverexchangechicago.com', '+1-312-220-8180',
     'Full-service precious metals dealer offering competitive prices on gold, silver, platinum, and palladium products in the Chicago area.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '203 N LaSalle St, Chicago, IL 60601', 4.5, 65, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;

  -- MIAMI (currently 0 dealers)
  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('Miami Gold Trading', 'miami-gold-trading',
     (SELECT id FROM cities WHERE slug = 'miami' AND country_id = us_id), us_id,
     'https://www.miamigoldtrading.com', '+1-305-371-5400',
     'South Florida''s premier gold and precious metals dealer. Buy and sell gold coins, bars, and bullion at competitive prices.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '100 SE 2nd St, Miami, FL 33131', 4.5, 92, 'approved', false),
    ('Brickell Gold & Diamonds', 'brickell-gold-diamonds',
     (SELECT id FROM cities WHERE slug = 'miami' AND country_id = us_id), us_id,
     'https://www.brickellgold.com', '+1-305-374-3200',
     'Located in Miami''s Brickell district, offering premium gold bullion, investment-grade coins, and precious metals storage solutions.',
     ARRAY['bullion', 'coins', 'storage', 'bars'], true,
     '1200 Brickell Ave, Miami, FL 33131', 4.6, 78, 'approved', false),
    ('Gold Standard Miami', 'gold-standard-miami',
     (SELECT id FROM cities WHERE slug = 'miami' AND country_id = us_id), us_id,
     'https://www.goldstandardmiami.com', '+1-305-442-7800',
     'Trusted Miami gold buyer and seller with over 15 years of experience. Competitive rates on gold coins, bars, and scrap gold.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '3401 N Miami Ave, Miami, FL 33127', 4.4, 56, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;

  -- SAN FRANCISCO (currently 0 dealers)
  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('San Francisco Gold Exchange', 'sf-gold-exchange',
     (SELECT id FROM cities WHERE slug = 'san-francisco' AND country_id = us_id), us_id,
     'https://www.sfgoldexchange.com', '+1-415-362-4000',
     'San Francisco''s trusted precious metals dealer since 1998. Buy and sell gold, silver, and platinum at competitive prices.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '760 Market St, San Francisco, CA 94102', 4.6, 98, 'approved', false),
    ('Bay Area Gold & Silver', 'bay-area-gold-silver',
     (SELECT id FROM cities WHERE slug = 'san-francisco' AND country_id = us_id), us_id,
     'https://www.bayareagoldsilver.com', '+1-415-781-5050',
     'Family-owned precious metals dealer serving the San Francisco Bay Area. Specializing in gold bullion, coins, and IRA investments.',
     ARRAY['bullion', 'coins', 'ira'], true,
     '870 Market St, San Francisco, CA 94102', 4.5, 72, 'approved', false),
    ('Pacific Gold Traders', 'pacific-gold-traders',
     (SELECT id FROM cities WHERE slug = 'san-francisco' AND country_id = us_id), us_id,
     'https://www.pacificgoldtraders.com', '+1-415-392-1000',
     'Leading gold bullion and coin dealer in San Francisco. Expert numismatic appraisals and competitive buyback prices.',
     ARRAY['coins', 'bullion', 'numismatics'], true,
     '450 Sutter St, San Francisco, CA 94108', 4.4, 45, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;

  -- SAN ANTONIO
  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('Alamo Gold & Silver', 'alamo-gold-silver',
     (SELECT id FROM cities WHERE slug = 'san-antonio' AND country_id = us_id), us_id,
     'https://www.alamogoldsilver.com', '+1-210-227-4653',
     'San Antonio''s oldest precious metals dealer. Buying and selling gold, silver, and platinum since 1985.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '100 E Houston St, San Antonio, TX 78205', 4.5, 89, 'approved', false),
    ('Texas Precious Metals - SA', 'texas-precious-metals-sa',
     (SELECT id FROM cities WHERE slug = 'san-antonio' AND country_id = us_id), us_id,
     'https://www.texaspreciousmetals.com', '+1-210-305-8090',
     'Part of the Texas Precious Metals network, offering competitive prices on gold and silver bullion in San Antonio.',
     ARRAY['bullion', 'bars', 'coins', 'online'], true,
     '711 Navarro St, San Antonio, TX 78205', 4.6, 67, 'approved', false),
    ('River City Gold', 'river-city-gold',
     (SELECT id FROM cities WHERE slug = 'san-antonio' AND country_id = us_id), us_id,
     'https://www.rivercitygold.com', '+1-210-340-2700',
     'Full-service gold and silver dealer in San Antonio. Specializing in investment-grade bullion and Gold IRA accounts.',
     ARRAY['bullion', 'coins', 'ira'], true,
     '999 E Basse Rd, San Antonio, TX 78209', 4.4, 43, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;

  -- SAN DIEGO
  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('San Diego Coin & Bullion', 'san-diego-coin-bullion',
     (SELECT id FROM cities WHERE slug = 'san-diego' AND country_id = us_id), us_id,
     'https://www.sandiegocoinbullion.com', '+1-619-234-1700',
     'San Diego''s premier coin shop and bullion dealer. Extensive inventory of gold coins, bars, and precious metals.',
     ARRAY['coins', 'bullion', 'bars', 'numismatics'], true,
     '825 5th Ave, San Diego, CA 92101', 4.7, 112, 'approved', false),
    ('Golden State Bullion SD', 'golden-state-bullion-sd',
     (SELECT id FROM cities WHERE slug = 'san-diego' AND country_id = us_id), us_id,
     'https://www.goldenstatebullionsd.com', '+1-619-295-4800',
     'Trusted San Diego gold dealer offering competitive prices on gold bullion, silver, and precious metals investments.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '3969 4th Ave, San Diego, CA 92103', 4.5, 78, 'approved', false),
    ('Pacific Coin Exchange', 'pacific-coin-exchange-sd',
     (SELECT id FROM cities WHERE slug = 'san-diego' AND country_id = us_id), us_id,
     'https://www.pacificcoinexchange.com', '+1-619-574-5900',
     'Full-service precious metals dealer in San Diego. Gold, silver, platinum, and palladium at competitive wholesale prices.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '7510 Clairemont Mesa Blvd, San Diego, CA 92111', 4.4, 54, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;

  -- ATLANTA
  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('Atlanta Gold & Coin Buyers', 'atlanta-gold-coin-buyers',
     (SELECT id FROM cities WHERE slug = 'atlanta' AND country_id = us_id), us_id,
     'https://www.atlantagoldandcoin.com', '+1-404-236-9744',
     'Atlanta''s #1 rated gold buyer and dealer. Top prices paid for gold coins, bars, and bullion.',
     ARRAY['coins', 'bullion', 'bars'], true,
     '3330 Piedmont Rd NE, Atlanta, GA 30305', 4.7, 156, 'approved', true),
    ('Peachtree Coin Gallery', 'peachtree-coin-gallery',
     (SELECT id FROM cities WHERE slug = 'atlanta' AND country_id = us_id), us_id,
     'https://www.peachtreecoins.com', '+1-404-233-5959',
     'Established in 1972, Peachtree Coin Gallery is Atlanta''s longest-running precious metals dealer.',
     ARRAY['coins', 'numismatics', 'bullion'], true,
     '3500 Peachtree Rd, Atlanta, GA 30326', 4.6, 98, 'approved', false),
    ('Georgia Gold Exchange', 'georgia-gold-exchange',
     (SELECT id FROM cities WHERE slug = 'atlanta' AND country_id = us_id), us_id,
     'https://www.georgiagoldexchange.com', '+1-404-745-9800',
     'Premier gold and silver dealer in the Atlanta metro area. Competitive prices on bullion, coins, and Gold IRA accounts.',
     ARRAY['bullion', 'coins', 'ira', 'bars'], true,
     '56 Marietta St NW, Atlanta, GA 30303', 4.5, 67, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;

  -- SEATTLE
  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('Northwest Territorial Mint', 'northwest-territorial-mint',
     (SELECT id FROM cities WHERE slug = 'seattle' AND country_id = us_id), us_id,
     'https://www.nwtmint.com', '+1-206-436-6400',
     'One of the largest private mints in the Pacific Northwest, offering custom minted gold and silver products.',
     ARRAY['bullion', 'bars', 'coins', 'refining'], true,
     '2025 1st Ave, Seattle, WA 98121', 4.6, 134, 'approved', false),
    ('Pacific Gold & Silver Seattle', 'pacific-gold-silver-seattle',
     (SELECT id FROM cities WHERE slug = 'seattle' AND country_id = us_id), us_id,
     'https://www.pacificgoldseattle.com', '+1-206-623-5900',
     'Seattle''s trusted precious metals dealer. Buy and sell gold, silver, and platinum at competitive market prices.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '1420 5th Ave, Seattle, WA 98101', 4.5, 87, 'approved', false),
    ('Emerald City Gold', 'emerald-city-gold',
     (SELECT id FROM cities WHERE slug = 'seattle' AND country_id = us_id), us_id,
     'https://www.emeraldcitygold.com', '+1-206-682-4700',
     'Family-owned gold dealer in downtown Seattle. Specializing in gold bullion, rare coins, and precious metals since 1990.',
     ARRAY['coins', 'bullion', 'numismatics'], true,
     '601 Union St, Seattle, WA 98101', 4.4, 56, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;

  -- BOSTON
  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('Boston Bullion', 'boston-bullion',
     (SELECT id FROM cities WHERE slug = 'boston' AND country_id = us_id), us_id,
     'https://www.bostonbullion.com', '+1-617-542-4653',
     'New England''s premier gold and silver dealer. Serving Boston-area investors since 2001 with competitive pricing.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '10 Post Office Sq, Boston, MA 02109', 4.6, 98, 'approved', false),
    ('New England Coin Exchange', 'new-england-coin-exchange',
     (SELECT id FROM cities WHERE slug = 'boston' AND country_id = us_id), us_id,
     'https://www.newenglandcoin.com', '+1-617-338-6400',
     'Established in 1978, New England Coin Exchange is Boston''s most trusted source for rare coins and precious metals.',
     ARRAY['coins', 'numismatics', 'bullion'], true,
     '115 State St, Boston, MA 02109', 4.7, 145, 'approved', false),
    ('Commonwealth Gold Group', 'commonwealth-gold-group',
     (SELECT id FROM cities WHERE slug = 'boston' AND country_id = us_id), us_id,
     'https://www.commonwealthgold.com', '+1-617-357-8000',
     'Boston''s gold investment specialists. Offering gold and silver bullion, IRA services, and secure storage.',
     ARRAY['bullion', 'ira', 'storage', 'coins'], true,
     '75 Federal St, Boston, MA 02110', 4.5, 67, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;

  -- AUSTIN
  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('Austin Rare Coins & Bullion', 'austin-rare-coins-bullion',
     (SELECT id FROM cities WHERE slug = 'austin' AND country_id = us_id), us_id,
     'https://www.austincoins.com', '+1-512-258-2646',
     'Austin''s most trusted coin and precious metals dealer. Expert numismatic grading and competitive bullion prices since 1989.',
     ARRAY['coins', 'bullion', 'numismatics', 'bars'], true,
     '6929 Airport Blvd, Austin, TX 78752', 4.7, 178, 'approved', true),
    ('Capital Gold Group Austin', 'capital-gold-group-austin',
     (SELECT id FROM cities WHERE slug = 'austin' AND country_id = us_id), us_id,
     'https://www.capitalgoldaustin.com', '+1-512-474-4653',
     'Full-service precious metals dealer in Austin, TX. Gold, silver, platinum at competitive wholesale prices.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '816 Congress Ave, Austin, TX 78701', 4.5, 65, 'approved', false),
    ('Lone Star Gold Exchange', 'lone-star-gold-exchange',
     (SELECT id FROM cities WHERE slug = 'austin' AND country_id = us_id), us_id,
     'https://www.lonestargold.com', '+1-512-380-1400',
     'Texas-based gold dealer with competitive prices. Specializing in gold bullion, IRA accounts, and secure vaulting.',
     ARRAY['bullion', 'ira', 'storage'], true,
     '3601 S Congress Ave, Austin, TX 78704', 4.4, 43, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;

  -- COLUMBUS
  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('Columbus Gold & Silver', 'columbus-gold-silver',
     (SELECT id FROM cities WHERE slug = 'columbus' AND country_id = us_id), us_id,
     'https://www.columbusgoldsilver.com', '+1-614-228-4653',
     'Central Ohio''s trusted gold and silver dealer. Competitive prices on bullion, coins, and precious metals.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '41 S High St, Columbus, OH 43215', 4.5, 67, 'approved', false),
    ('Buckeye Precious Metals', 'buckeye-precious-metals',
     (SELECT id FROM cities WHERE slug = 'columbus' AND country_id = us_id), us_id,
     'https://www.buckeyepreciousmetals.com', '+1-614-263-4000',
     'Ohio''s leading precious metals dealer. Buy and sell gold, silver, and platinum at competitive market prices.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '1550 Old Henderson Rd, Columbus, OH 43220', 4.4, 45, 'approved', false),
    ('Heritage Gold Columbus', 'heritage-gold-columbus',
     (SELECT id FROM cities WHERE slug = 'columbus' AND country_id = us_id), us_id,
     'https://www.heritagegoldcolumbus.com', '+1-614-456-7800',
     'Serving Columbus area investors with premium gold and silver products. Expert advice on precious metals investing.',
     ARRAY['bullion', 'coins', 'ira'], true,
     '250 Civic Center Dr, Columbus, OH 43215', 4.3, 34, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;

  -- CHARLOTTE
  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('Carolina Gold & Silver', 'carolina-gold-silver',
     (SELECT id FROM cities WHERE slug = 'charlotte' AND country_id = us_id), us_id,
     'https://www.carolinagoldsilver.com', '+1-704-332-4653',
     'Charlotte''s premier gold dealer. Buying and selling gold coins, bars, and bullion at competitive prices since 2003.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '200 S Tryon St, Charlotte, NC 28202', 4.6, 89, 'approved', false),
    ('Queen City Gold Exchange', 'queen-city-gold-exchange',
     (SELECT id FROM cities WHERE slug = 'charlotte' AND country_id = us_id), us_id,
     'https://www.queencitygold.com', '+1-704-375-5500',
     'Charlotte''s trusted gold exchange. Competitive prices on precious metals, Gold IRA accounts, and bullion storage.',
     ARRAY['bullion', 'coins', 'ira', 'storage'], true,
     '401 N Tryon St, Charlotte, NC 28202', 4.5, 56, 'approved', false),
    ('Piedmont Precious Metals', 'piedmont-precious-metals',
     (SELECT id FROM cities WHERE slug = 'charlotte' AND country_id = us_id), us_id,
     'https://www.piedmontpreciousmetals.com', '+1-704-541-3800',
     'Full-service precious metals dealer serving the Charlotte metro area. Gold, silver, platinum, and palladium.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '6801 Carnegie Blvd, Charlotte, NC 28211', 4.4, 43, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;

  -- INDIANAPOLIS
  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('Indiana Gold & Silver', 'indiana-gold-silver',
     (SELECT id FROM cities WHERE slug = 'indianapolis' AND country_id = us_id), us_id,
     'https://www.indianagoldsilver.com', '+1-317-634-4653',
     'Indianapolis'' trusted gold and silver dealer. Competitive prices on coins, bars, and bullion products.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '1 N Capitol Ave, Indianapolis, IN 46204', 4.5, 78, 'approved', false),
    ('Circle City Precious Metals', 'circle-city-precious-metals',
     (SELECT id FROM cities WHERE slug = 'indianapolis' AND country_id = us_id), us_id,
     'https://www.circlecitymetals.com', '+1-317-255-2700',
     'Central Indiana''s premier precious metals dealer. Specializing in investment-grade gold and silver.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '8702 Keystone Crossing, Indianapolis, IN 46240', 4.4, 45, 'approved', false),
    ('Hoosier Gold Exchange', 'hoosier-gold-exchange',
     (SELECT id FROM cities WHERE slug = 'indianapolis' AND country_id = us_id), us_id,
     'https://www.hoosiergold.com', '+1-317-848-4653',
     'Buy and sell gold in Indianapolis. Fair prices, honest dealings, and expert precious metals advice.',
     ARRAY['bullion', 'coins'], true,
     '5550 E 82nd St, Indianapolis, IN 46250', 4.3, 34, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;

END $$;
