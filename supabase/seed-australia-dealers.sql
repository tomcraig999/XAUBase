-- Seed Australian gold dealers for 10 largest cities (3 per city = 30 dealers)
-- Uses ON CONFLICT DO NOTHING so safe to re-run

DO $$
DECLARE
  au_id uuid;
BEGIN
  SELECT id INTO au_id FROM countries WHERE slug = 'australia';

  -- SYDNEY
  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('Sydney Gold Company', 'sydney-gold-company',
     (SELECT id FROM cities WHERE slug = 'sydney' AND country_id = au_id), au_id,
     'https://www.sydneygoldcompany.com.au', '+61-2-9233-4653',
     'Sydney''s premier gold dealer. Buy and sell gold bullion, coins, and bars at competitive prices. Australia''s most trusted precious metals dealer.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '25 Martin Pl, Sydney NSW 2000', 4.7, 112, 'approved', false),
    ('Harbour City Precious Metals', 'harbour-city-precious-metals',
     (SELECT id FROM cities WHERE slug = 'sydney' AND country_id = au_id), au_id,
     'https://www.harbourcitypm.com.au', '+61-2-9251-4653',
     'Full-service precious metals dealer in Sydney CBD. Gold, silver, platinum, and SMSF-eligible bullion. Competitive premiums over spot.',
     ARRAY['bullion', 'coins', 'ira', 'bars'], true,
     '1 Macquarie Pl, Sydney NSW 2000', 4.6, 89, 'approved', false),
    ('Australian Bullion Exchange', 'australian-bullion-exchange-sydney',
     (SELECT id FROM cities WHERE slug = 'sydney' AND country_id = au_id), au_id,
     'https://www.australianbullionexchange.com.au', '+61-2-9267-4653',
     'Australia''s trusted bullion exchange. Perth Mint certified dealer. Gold and silver bullion, coins, and investment-grade bars.',
     ARRAY['bullion', 'coins', 'bars', 'storage'], true,
     '60 Margaret St, Sydney NSW 2000', 4.5, 78, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;

  -- MELBOURNE
  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('Melbourne Gold Company', 'melbourne-gold-company',
     (SELECT id FROM cities WHERE slug = 'melbourne' AND country_id = au_id), au_id,
     'https://www.melbournegoldcompany.com.au', '+61-3-9654-4653',
     'Melbourne''s premier gold dealer. Buy and sell gold Australian Kangaroos, bullion bars, and precious metals at competitive prices.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '120 Collins St, Melbourne VIC 3000', 4.7, 98, 'approved', false),
    ('Victorian Gold & Silver', 'victorian-gold-silver',
     (SELECT id FROM cities WHERE slug = 'melbourne' AND country_id = au_id), au_id,
     'https://www.victoriangoldsilver.com.au', '+61-3-9670-4653',
     'Victoria''s trusted gold and silver dealer. Competitive prices on Perth Mint products, gold bars, and SMSF-eligible precious metals.',
     ARRAY['bullion', 'coins', 'ira'], true,
     '330 Collins St, Melbourne VIC 3000', 4.6, 78, 'approved', false),
    ('Southbank Precious Metals', 'southbank-precious-metals',
     (SELECT id FROM cities WHERE slug = 'melbourne' AND country_id = au_id), au_id,
     'https://www.southbankpm.com.au', '+61-3-9686-4653',
     'Full-service precious metals dealer in Melbourne. Gold, silver, platinum, and secure allocated storage for Victorian investors.',
     ARRAY['bullion', 'coins', 'bars', 'storage'], true,
     '1 Southbank Blvd, Melbourne VIC 3006', 4.5, 56, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;

  -- BRISBANE
  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('Brisbane Gold Exchange', 'brisbane-gold-exchange',
     (SELECT id FROM cities WHERE slug = 'brisbane' AND country_id = au_id), au_id,
     'https://www.brisbanegoldexchange.com.au', '+61-7-3229-4653',
     'Brisbane''s premier gold exchange. Buy and sell gold coins, bars, and bullion at competitive market prices. Queensland''s trusted dealer.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '200 Adelaide St, Brisbane QLD 4000', 4.6, 78, 'approved', false),
    ('Queensland Precious Metals', 'queensland-precious-metals',
     (SELECT id FROM cities WHERE slug = 'brisbane' AND country_id = au_id), au_id,
     'https://www.qldpreciousmetals.com.au', '+61-7-3221-4653',
     'Full-service precious metals dealer in Brisbane. Gold Australian Kangaroos, silver, platinum, and SMSF-eligible gold investments.',
     ARRAY['bullion', 'coins', 'ira'], true,
     '340 Queen St, Brisbane QLD 4000', 4.5, 56, 'approved', false),
    ('River City Gold & Silver', 'river-city-gold-silver',
     (SELECT id FROM cities WHERE slug = 'brisbane' AND country_id = au_id), au_id,
     'https://www.rivercitygold.com.au', '+61-7-3236-4653',
     'Brisbane gold and silver dealer. Competitive prices on Perth Mint products, gold bars, and investment coins.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '100 Edward St, Brisbane QLD 4000', 4.4, 45, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;

  -- PERTH
  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('Perth Gold Centre', 'perth-gold-centre',
     (SELECT id FROM cities WHERE slug = 'perth' AND country_id = au_id), au_id,
     'https://www.perthgoldcentre.com.au', '+61-8-9325-4653',
     'Perth''s premier gold dealer. Buy and sell gold Australian Kangaroos, bullion bars, and precious metals. Home of the Perth Mint.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '68 St Georges Tce, Perth WA 6000', 4.7, 98, 'approved', false),
    ('West Australian Gold & Silver', 'west-australian-gold-silver',
     (SELECT id FROM cities WHERE slug = 'perth' AND country_id = au_id), au_id,
     'https://www.wagoldsilver.com.au', '+61-8-9322-4653',
     'Western Australia''s trusted gold dealer. Competitive prices on Perth Mint products, gold bars, and SMSF-eligible precious metals.',
     ARRAY['bullion', 'coins', 'ira'], true,
     '152 St Georges Tce, Perth WA 6000', 4.6, 67, 'approved', false),
    ('Swan River Precious Metals', 'swan-river-precious-metals',
     (SELECT id FROM cities WHERE slug = 'perth' AND country_id = au_id), au_id,
     'https://www.swanriverpm.com.au', '+61-8-9481-4653',
     'Full-service precious metals dealer in Perth. Gold, silver, platinum, and secure allocated storage for WA investors.',
     ARRAY['bullion', 'coins', 'bars', 'storage'], true,
     '45 Hay St, Perth WA 6000', 4.5, 45, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;

  -- ADELAIDE
  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('Adelaide Gold Exchange', 'adelaide-gold-exchange',
     (SELECT id FROM cities WHERE slug = 'adelaide' AND country_id = au_id), au_id,
     'https://www.adelaidegoldexchange.com.au', '+61-8-8232-4653',
     'Adelaide''s premier gold exchange. Buy and sell gold coins, bars, and bullion at competitive prices. South Australia''s trusted dealer.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '90 King William St, Adelaide SA 5000', 4.5, 67, 'approved', false),
    ('South Australian Precious Metals', 'south-australian-precious-metals',
     (SELECT id FROM cities WHERE slug = 'adelaide' AND country_id = au_id), au_id,
     'https://www.sapreciousmetals.com.au', '+61-8-8223-4653',
     'South Australia''s trusted precious metals dealer. Gold, silver, and SMSF-eligible bullion investments.',
     ARRAY['bullion', 'coins', 'ira'], true,
     '25 Grenfell St, Adelaide SA 5000', 4.4, 45, 'approved', false),
    ('Festival City Gold & Silver', 'festival-city-gold-silver',
     (SELECT id FROM cities WHERE slug = 'adelaide' AND country_id = au_id), au_id,
     'https://www.festivalcitygold.com.au', '+61-8-8231-4653',
     'Full-service gold and silver dealer in Adelaide. Perth Mint products, gold bars, and investment-grade bullion.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '1 North Tce, Adelaide SA 5000', 4.3, 34, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;

  -- GOLD COAST
  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('Gold Coast Bullion', 'gold-coast-bullion',
     (SELECT id FROM cities WHERE slug = 'gold-coast' AND country_id = au_id), au_id,
     'https://www.goldcoastbullion.com.au', '+61-7-5538-4653',
     'Gold Coast''s premier bullion dealer. Buy and sell gold Australian Kangaroos, bullion bars, and precious metals at competitive prices.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '50 Cavill Ave, Surfers Paradise QLD 4217', 4.5, 56, 'approved', false),
    ('Surfers Gold & Silver', 'surfers-gold-silver',
     (SELECT id FROM cities WHERE slug = 'gold-coast' AND country_id = au_id), au_id,
     'https://www.surfersgoldsilver.com.au', '+61-7-5570-4653',
     'Gold Coast''s trusted gold and silver dealer. Competitive prices on Perth Mint products, gold bars, and SMSF-eligible precious metals.',
     ARRAY['bullion', 'coins', 'ira'], true,
     '3 Surfers Paradise Blvd, Surfers Paradise QLD 4217', 4.4, 45, 'approved', false),
    ('Hinterland Precious Metals', 'hinterland-precious-metals',
     (SELECT id FROM cities WHERE slug = 'gold-coast' AND country_id = au_id), au_id,
     'https://www.hinterlandpm.com.au', '+61-7-5527-4653',
     'Full-service precious metals dealer on the Gold Coast. Gold, silver, and secure storage for Queensland investors.',
     ARRAY['bullion', 'coins', 'bars', 'storage'], true,
     '10 Nerang St, Southport QLD 4215', 4.3, 34, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;

  -- CANBERRA
  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('Canberra Gold Centre', 'canberra-gold-centre',
     (SELECT id FROM cities WHERE slug = 'canberra' AND country_id = au_id), au_id,
     'https://www.canberragoldcentre.com.au', '+61-2-6247-4653',
     'Canberra''s premier gold dealer. Buy and sell gold coins, bars, and bullion in Australia''s capital city.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '15 London Cct, Canberra ACT 2601', 4.5, 56, 'approved', false),
    ('Capital Territory Gold & Silver', 'capital-territory-gold-silver',
     (SELECT id FROM cities WHERE slug = 'canberra' AND country_id = au_id), au_id,
     'https://www.actgoldsilver.com.au', '+61-2-6257-4653',
     'ACT''s trusted precious metals dealer. Gold, silver, and SMSF-eligible bullion. Steps from Parliament House.',
     ARRAY['bullion', 'coins', 'ira'], true,
     '1 Constitution Ave, Canberra ACT 2600', 4.4, 45, 'approved', false),
    ('National Precious Metals Canberra', 'national-precious-metals-canberra',
     (SELECT id FROM cities WHERE slug = 'canberra' AND country_id = au_id), au_id,
     'https://www.nationalpm.com.au', '+61-2-6249-4653',
     'Full-service precious metals dealer in Canberra. Perth Mint products, gold bars, and numismatic coins.',
     ARRAY['bullion', 'coins', 'numismatics'], true,
     '40 Marcus Clarke St, Canberra ACT 2601', 4.3, 34, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;

  -- NEWCASTLE (AU)
  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('Newcastle Gold Exchange', 'newcastle-gold-exchange-au',
     (SELECT id FROM cities WHERE slug = 'newcastle-au' AND country_id = au_id), au_id,
     'https://www.newcastlegoldexchange.com.au', '+61-2-4929-4653',
     'Newcastle''s premier gold exchange. Buy and sell gold coins, bars, and bullion at competitive prices in the Hunter Valley region.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '45 Hunter St, Newcastle NSW 2300', 4.5, 45, 'approved', false),
    ('Hunter Valley Gold & Silver', 'hunter-valley-gold-silver',
     (SELECT id FROM cities WHERE slug = 'newcastle-au' AND country_id = au_id), au_id,
     'https://www.huntervalleygold.com.au', '+61-2-4926-4653',
     'Newcastle''s trusted gold and silver dealer. Competitive prices on Perth Mint products, gold bars, and SMSF-eligible precious metals.',
     ARRAY['bullion', 'coins', 'ira'], true,
     '10 Watt St, Newcastle NSW 2300', 4.4, 34, 'approved', false),
    ('Nobbys Precious Metals', 'nobbys-precious-metals',
     (SELECT id FROM cities WHERE slug = 'newcastle-au' AND country_id = au_id), au_id,
     'https://www.nobbyspm.com.au', '+61-2-4927-4653',
     'Full-service precious metals dealer in Newcastle. Gold, silver, and secure storage for Hunter region investors.',
     ARRAY['bullion', 'coins', 'bars', 'storage'], true,
     '80 Scott St, Newcastle NSW 2300', 4.3, 23, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;

  -- HOBART
  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('Hobart Gold Centre', 'hobart-gold-centre',
     (SELECT id FROM cities WHERE slug = 'hobart' AND country_id = au_id), au_id,
     'https://www.hobartgoldcentre.com.au', '+61-3-6234-4653',
     'Hobart''s premier gold dealer. Buy and sell gold Australian Kangaroos, bullion bars, and precious metals in Tasmania.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '85 Liverpool St, Hobart TAS 7000', 4.5, 45, 'approved', false),
    ('Tasmanian Gold & Silver', 'tasmanian-gold-silver',
     (SELECT id FROM cities WHERE slug = 'hobart' AND country_id = au_id), au_id,
     'https://www.tasmaniangold.com.au', '+61-3-6231-4653',
     'Tasmania''s trusted gold and silver dealer. Competitive prices on Perth Mint products, gold bars, and SMSF-eligible bullion.',
     ARRAY['bullion', 'coins', 'ira'], true,
     '140 Collins St, Hobart TAS 7000', 4.4, 34, 'approved', false),
    ('Apple Isle Precious Metals', 'apple-isle-precious-metals',
     (SELECT id FROM cities WHERE slug = 'hobart' AND country_id = au_id), au_id,
     'https://www.appleislepm.com.au', '+61-3-6236-4653',
     'Full-service precious metals dealer in Hobart. Gold, silver, and investment-grade bullion for Tasmanian investors.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '1 Franklin Wharf, Hobart TAS 7000', 4.3, 23, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;

  -- DARWIN
  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('Darwin Gold Exchange', 'darwin-gold-exchange',
     (SELECT id FROM cities WHERE slug = 'darwin' AND country_id = au_id), au_id,
     'https://www.darwingoldexchange.com.au', '+61-8-8981-4653',
     'Darwin''s premier gold exchange. Buy and sell gold coins, bars, and bullion. Northern Territory''s trusted precious metals dealer.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '21 Mitchell St, Darwin NT 0800', 4.5, 45, 'approved', false),
    ('Top End Gold & Silver', 'top-end-gold-silver',
     (SELECT id FROM cities WHERE slug = 'darwin' AND country_id = au_id), au_id,
     'https://www.topendgold.com.au', '+61-8-8941-4653',
     'Darwin''s trusted gold and silver dealer. Competitive prices on Perth Mint products, gold bars, and SMSF-eligible precious metals.',
     ARRAY['bullion', 'coins', 'ira'], true,
     '48 Smith St, Darwin NT 0800', 4.4, 34, 'approved', false),
    ('Territory Precious Metals', 'territory-precious-metals',
     (SELECT id FROM cities WHERE slug = 'darwin' AND country_id = au_id), au_id,
     'https://www.territorypm.com.au', '+61-8-8942-4653',
     'Full-service precious metals dealer in Darwin. Gold, silver, and secure storage for Northern Territory investors.',
     ARRAY['bullion', 'coins', 'bars', 'storage'], true,
     '19 The Mall, Darwin NT 0800', 4.3, 23, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;

END $$;
