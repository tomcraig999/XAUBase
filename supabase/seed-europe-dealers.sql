-- Seed 3 gold dealers per European city = 54 dealers across 9 countries
-- Uses ON CONFLICT DO NOTHING so safe to re-run

-- IRELAND – Dublin
DO $$
DECLARE cty_id uuid; ctry_id uuid;
BEGIN
  SELECT ci.id, ci.country_id INTO cty_id, ctry_id
    FROM cities ci JOIN countries co ON ci.country_id = co.id
   WHERE ci.slug = 'dublin' AND co.slug = 'ireland';

  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured) VALUES
    ('Dublin Gold Company', 'dublin-gold-company', cty_id, ctry_id,
     'https://www.dublingoldcompany.ie', '+353-1-555-0101',
     'Leading gold dealer in Dublin offering investment-grade gold bars, coins, and secure storage. Specialists in Gold Sovereigns and Britannia coins.',
     ARRAY['Gold Coins','Gold Bars','Secure Storage','Sovereigns'], true,
     '14 Grafton Street, Dublin 2', 4.7, 142, 'approved', false),

    ('Merrion Gold', 'merrion-gold', cty_id, ctry_id,
     'https://www.merriongold.ie', '+353-1-555-0102',
     'Established precious metals dealer on Merrion Row. Buy and sell gold, silver, and platinum. Competitive premiums over spot price.',
     ARRAY['Gold Bars','Silver','Platinum','Buy & Sell'], true,
     '8 Merrion Row, Dublin 2', 4.8, 198, 'approved', true),

    ('Celtic Gold Exchange', 'celtic-gold-exchange', cty_id, ctry_id,
     'https://www.celticgoldexchange.ie', '+353-1-555-0103',
     'Family-owned gold dealer in Dublin city centre. Specialising in Irish gold coins, bullion bars, and numismatic pieces.',
     ARRAY['Gold Coins','Numismatics','Bullion Bars','Irish Gold'], true,
     '22 Dame Street, Dublin 2', 4.5, 87, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;
END $$;

-- IRELAND – Cork
DO $$
DECLARE cty_id uuid; ctry_id uuid;
BEGIN
  SELECT ci.id, ci.country_id INTO cty_id, ctry_id
    FROM cities ci JOIN countries co ON ci.country_id = co.id
   WHERE ci.slug = 'cork' AND co.slug = 'ireland';

  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured) VALUES
    ('Cork Bullion Centre', 'cork-bullion-centre', cty_id, ctry_id,
     'https://www.corkbullion.ie', '+353-21-555-0201',
     'Cork''s premier bullion dealer. Investment gold bars from 1g to 1kg, gold coins, and silver bullion at competitive prices.',
     ARRAY['Gold Bars','Silver Bullion','Investment Gold'], true,
     '45 Patrick Street, Cork', 4.6, 95, 'approved', false),

    ('Rebel Gold & Silver', 'rebel-gold-silver', cty_id, ctry_id,
     'https://www.rebelgoldsilver.ie', '+353-21-555-0202',
     'Buy and sell gold and silver in Cork city. Specialists in Krugerrands, Maple Leafs, and gold Sovereigns.',
     ARRAY['Gold Coins','Krugerrands','Maple Leafs','Buy & Sell'], true,
     '12 Oliver Plunkett Street, Cork', 4.4, 63, 'approved', false),

    ('Munster Precious Metals', 'munster-precious-metals', cty_id, ctry_id,
     'https://www.munsterpreciousmetals.ie', '+353-21-555-0203',
     'Trusted precious metals dealer serving Munster. Gold bars, coins, and allocated storage solutions for investors.',
     ARRAY['Gold Bars','Allocated Storage','Precious Metals'], true,
     '7 Grand Parade, Cork', 4.5, 71, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;
END $$;

-- FRANCE – Paris
DO $$
DECLARE cty_id uuid; ctry_id uuid;
BEGIN
  SELECT ci.id, ci.country_id INTO cty_id, ctry_id
    FROM cities ci JOIN countries co ON ci.country_id = co.id
   WHERE ci.slug = 'paris' AND co.slug = 'france';

  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured) VALUES
    ('Or en Cash Paris', 'or-en-cash-paris', cty_id, ctry_id,
     'https://www.orencash.fr', '+33-1-55-50-0101',
     'Achat et vente d''or à Paris. Gold bars, Napoléon coins, and investment-grade bullion. One of France''s leading gold dealers.',
     ARRAY['Gold Bars','Napoléon Coins','Bullion','Buy & Sell'], true,
     '25 Rue Vivienne, 75002 Paris', 4.6, 234, 'approved', true),

    ('Comptoir National de l''Or', 'comptoir-national-or-paris', cty_id, ctry_id,
     'https://www.comptoirnationaldelorgold.fr', '+33-1-55-50-0102',
     'National gold counter with flagship Paris location. Buy gold coins, bars, and silver. Expert numismatic valuations.',
     ARRAY['Gold Coins','Gold Bars','Numismatics','Silver'], true,
     '8 Rue de la Bourse, 75002 Paris', 4.7, 312, 'approved', true),

    ('Paris Gold Investissement', 'paris-gold-investissement', cty_id, ctry_id,
     'https://www.parisgoldinvest.fr', '+33-1-55-50-0103',
     'Investment-focused gold dealer in central Paris. Specialising in LBMA-approved bars, allocated storage, and portfolio diversification.',
     ARRAY['LBMA Bars','Allocated Storage','Investment Gold'], true,
     '14 Avenue de l''Opéra, 75001 Paris', 4.5, 167, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;
END $$;

-- FRANCE – Marseille
DO $$
DECLARE cty_id uuid; ctry_id uuid;
BEGIN
  SELECT ci.id, ci.country_id INTO cty_id, ctry_id
    FROM cities ci JOIN countries co ON ci.country_id = co.id
   WHERE ci.slug = 'marseille' AND co.slug = 'france';

  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured) VALUES
    ('Marseille Or Achat', 'marseille-or-achat', cty_id, ctry_id,
     'https://www.marseilleor.fr', '+33-4-55-50-0201',
     'Gold buying and selling in Marseille. Napoléon coins, gold bars, and scrap gold purchased at competitive rates.',
     ARRAY['Gold Coins','Napoléon Coins','Scrap Gold','Buy & Sell'], true,
     '30 La Canebière, 13001 Marseille', 4.4, 89, 'approved', false),

    ('Provence Métaux Précieux', 'provence-metaux-precieux', cty_id, ctry_id,
     'https://www.provencemetauxprecieux.fr', '+33-4-55-50-0202',
     'Precious metals dealer serving Provence. Investment gold bars, silver coins, and expert valuations for estates.',
     ARRAY['Gold Bars','Silver Coins','Estate Valuations'], true,
     '15 Rue Paradis, 13006 Marseille', 4.5, 76, 'approved', false),

    ('Sud Or Investissement', 'sud-or-investissement', cty_id, ctry_id,
     'https://www.sudorinvest.fr', '+33-4-55-50-0203',
     'South of France gold investment specialists. LBMA-approved bars, allocated storage, and portfolio advisory services.',
     ARRAY['LBMA Bars','Allocated Storage','Advisory'], true,
     '42 Rue de Rome, 13006 Marseille', 4.3, 54, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;
END $$;

-- GERMANY – Berlin
DO $$
DECLARE cty_id uuid; ctry_id uuid;
BEGIN
  SELECT ci.id, ci.country_id INTO cty_id, ctry_id
    FROM cities ci JOIN countries co ON ci.country_id = co.id
   WHERE ci.slug = 'berlin' AND co.slug = 'germany';

  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured) VALUES
    ('Berliner Goldhandel', 'berliner-goldhandel', cty_id, ctry_id,
     'https://www.berlinergoldhandel.de', '+49-30-555-0101',
     'Berlin''s trusted gold dealer since 2005. Investment gold bars, coins, and silver. Tax-free gold purchases in Germany.',
     ARRAY['Gold Bars','Gold Coins','Silver','Tax-Free Gold'], true,
     'Friedrichstraße 95, 10117 Berlin', 4.7, 203, 'approved', true),

    ('Gold & Silber Berlin', 'gold-silber-berlin', cty_id, ctry_id,
     'https://www.goldsilber-berlin.de', '+49-30-555-0102',
     'Buy and sell gold and silver in Berlin. Specialists in Krugerrands, Vienna Philharmonics, and LBMA-approved bars.',
     ARRAY['Krugerrands','Vienna Philharmonics','LBMA Bars','Buy & Sell'], true,
     'Kurfürstendamm 21, 10719 Berlin', 4.6, 178, 'approved', false),

    ('Deutsche Edelmetall Kontor Berlin', 'deutsche-edelmetall-berlin', cty_id, ctry_id,
     'https://www.deutscheedelmetall-berlin.de', '+49-30-555-0103',
     'Premium German precious metals dealer. Gold bars from 1g to 1kg, numismatic coins, and secure vault storage in Berlin.',
     ARRAY['Gold Bars','Numismatics','Vault Storage','Premium'], true,
     'Unter den Linden 40, 10117 Berlin', 4.8, 156, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;
END $$;

-- GERMANY – Munich
DO $$
DECLARE cty_id uuid; ctry_id uuid;
BEGIN
  SELECT ci.id, ci.country_id INTO cty_id, ctry_id
    FROM cities ci JOIN countries co ON ci.country_id = co.id
   WHERE ci.slug = 'munich' AND co.slug = 'germany';

  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured) VALUES
    ('Münchner Goldhaus', 'muenchner-goldhaus', cty_id, ctry_id,
     'https://www.muenchnergoldhaus.de', '+49-89-555-0201',
     'Munich''s premier gold house. Investment-grade gold and silver, competitive premiums, and expert advice for German investors.',
     ARRAY['Gold Bars','Silver','Investment Grade','Advisory'], true,
     'Maximilianstraße 12, 80539 München', 4.7, 189, 'approved', true),

    ('Bayern Gold', 'bayern-gold', cty_id, ctry_id,
     'https://www.bayerngold.de', '+49-89-555-0202',
     'Bavarian gold dealer offering tax-free investment gold. Specialising in gold bars, Maple Leafs, and Vienna Philharmonics.',
     ARRAY['Tax-Free Gold','Maple Leafs','Vienna Philharmonics'], true,
     'Kaufingerstraße 28, 80331 München', 4.5, 134, 'approved', false),

    ('Süddeutsche Edelmetalle', 'sueddeutsche-edelmetalle', cty_id, ctry_id,
     'https://www.sueddeutsche-edelmetalle.de', '+49-89-555-0203',
     'South German precious metals specialist. Gold bars, coins, platinum, and palladium. Secure storage and buyback services.',
     ARRAY['Gold Bars','Platinum','Palladium','Buyback'], true,
     'Leopoldstraße 56, 80802 München', 4.6, 112, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;
END $$;

-- AUSTRIA – Vienna
DO $$
DECLARE cty_id uuid; ctry_id uuid;
BEGIN
  SELECT ci.id, ci.country_id INTO cty_id, ctry_id
    FROM cities ci JOIN countries co ON ci.country_id = co.id
   WHERE ci.slug = 'vienna' AND co.slug = 'austria';

  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured) VALUES
    ('Wiener Goldhandel', 'wiener-goldhandel', cty_id, ctry_id,
     'https://www.wienergoldhandel.at', '+43-1-555-0101',
     'Vienna''s leading gold dealer. Home of the Vienna Philharmonic coin. Investment gold, silver, and platinum at competitive prices.',
     ARRAY['Vienna Philharmonics','Gold Bars','Silver','Platinum'], true,
     'Kärntner Straße 30, 1010 Wien', 4.8, 267, 'approved', true),

    ('Schoeller Münzhandel Wien', 'schoeller-muenzhandel-wien', cty_id, ctry_id,
     'https://www.schoellermuenz.at', '+43-1-555-0102',
     'Historic Viennese coin dealer. Specialists in Austrian gold coins, Philharmonics, Ducats, and numismatic rarities.',
     ARRAY['Austrian Coins','Philharmonics','Ducats','Numismatics'], true,
     'Wollzeile 15, 1010 Wien', 4.7, 198, 'approved', false),

    ('Österreichische Edelmetalle', 'oesterreichische-edelmetalle', cty_id, ctry_id,
     'https://www.oesterreichische-edelmetalle.at', '+43-1-555-0103',
     'Austrian precious metals dealer offering LBMA gold bars, Philharmonic coins, and allocated vault storage in Vienna.',
     ARRAY['LBMA Bars','Allocated Storage','Philharmonics'], true,
     'Graben 17, 1010 Wien', 4.6, 145, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;
END $$;

-- AUSTRIA – Graz
DO $$
DECLARE cty_id uuid; ctry_id uuid;
BEGIN
  SELECT ci.id, ci.country_id INTO cty_id, ctry_id
    FROM cities ci JOIN countries co ON ci.country_id = co.id
   WHERE ci.slug = 'graz' AND co.slug = 'austria';

  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured) VALUES
    ('Grazer Goldkontor', 'grazer-goldkontor', cty_id, ctry_id,
     'https://www.grazergoldkontor.at', '+43-316-555-0201',
     'Graz''s trusted gold dealer. Investment gold bars and coins, Vienna Philharmonics, and silver bullion.',
     ARRAY['Gold Bars','Vienna Philharmonics','Silver Bullion'], true,
     'Herrengasse 10, 8010 Graz', 4.5, 82, 'approved', false),

    ('Steiermark Edelmetall', 'steiermark-edelmetall', cty_id, ctry_id,
     'https://www.steiermarkedelmetall.at', '+43-316-555-0202',
     'Styrian precious metals dealer. Specialising in gold investment, tax-free bullion, and secure storage.',
     ARRAY['Gold Investment','Tax-Free Bullion','Secure Storage'], true,
     'Joanneumring 5, 8010 Graz', 4.4, 67, 'approved', false),

    ('Gold Center Graz', 'gold-center-graz', cty_id, ctry_id,
     'https://www.goldcentergraz.at', '+43-316-555-0203',
     'Central Graz gold dealer offering competitive prices on gold bars, coins, and precious metals. Buy and sell services.',
     ARRAY['Gold Bars','Gold Coins','Buy & Sell'], true,
     'Hauptplatz 3, 8010 Graz', 4.3, 54, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;
END $$;

-- SPAIN – Madrid
DO $$
DECLARE cty_id uuid; ctry_id uuid;
BEGIN
  SELECT ci.id, ci.country_id INTO cty_id, ctry_id
    FROM cities ci JOIN countries co ON ci.country_id = co.id
   WHERE ci.slug = 'madrid' AND co.slug = 'spain';

  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured) VALUES
    ('Oro Direct Madrid', 'oro-direct-madrid', cty_id, ctry_id,
     'https://www.orodirect.es', '+34-91-555-0101',
     'Madrid''s leading gold dealer. Buy and sell investment gold, silver, and platinum. Competitive prices on gold bars and coins.',
     ARRAY['Gold Bars','Gold Coins','Silver','Platinum'], true,
     'Calle de Alcalá 50, 28014 Madrid', 4.6, 187, 'approved', true),

    ('Inversión en Oro Madrid', 'inversion-oro-madrid', cty_id, ctry_id,
     'https://www.inversionenoro.es', '+34-91-555-0102',
     'Gold investment specialists in Madrid. LBMA bars, Spanish gold coins, and allocated storage. Tax-exempt investment gold in Spain.',
     ARRAY['LBMA Bars','Spanish Coins','Allocated Storage','Tax-Exempt'], true,
     'Gran Vía 32, 28013 Madrid', 4.7, 156, 'approved', false),

    ('Metales Preciosos Capital', 'metales-preciosos-capital', cty_id, ctry_id,
     'https://www.metalespreciososcapital.es', '+34-91-555-0103',
     'Precious metals dealer in central Madrid. Gold bars from 1g to 1kg, Krugerrands, Maple Leafs, and estate jewellery buying.',
     ARRAY['Gold Bars','Krugerrands','Maple Leafs','Estate Buying'], true,
     'Paseo de la Castellana 89, 28046 Madrid', 4.5, 123, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;
END $$;

-- SPAIN – Barcelona
DO $$
DECLARE cty_id uuid; ctry_id uuid;
BEGIN
  SELECT ci.id, ci.country_id INTO cty_id, ctry_id
    FROM cities ci JOIN countries co ON ci.country_id = co.id
   WHERE ci.slug = 'barcelona' AND co.slug = 'spain';

  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured) VALUES
    ('Barcelona Gold Exchange', 'barcelona-gold-exchange', cty_id, ctry_id,
     'https://www.barcelonagoldexchange.es', '+34-93-555-0201',
     'Barcelona''s premier gold exchange. Buy and sell gold coins, bars, and silver. Competitive premiums on investment-grade bullion.',
     ARRAY['Gold Coins','Gold Bars','Silver','Buy & Sell'], true,
     'Passeig de Gràcia 55, 08007 Barcelona', 4.6, 145, 'approved', false),

    ('Oro Catalán', 'oro-catalan', cty_id, ctry_id,
     'https://www.orocatalan.es', '+34-93-555-0202',
     'Catalan gold dealer offering tax-exempt investment gold. Gold bars, Philharmonics, and Krugerrands at low premiums.',
     ARRAY['Tax-Exempt Gold','Philharmonics','Krugerrands'], true,
     'Carrer de Pau Claris 100, 08009 Barcelona', 4.5, 98, 'approved', false),

    ('Mediterranean Precious Metals', 'mediterranean-precious-metals', cty_id, ctry_id,
     'https://www.medpreciousmetals.es', '+34-93-555-0203',
     'Precious metals dealer in Barcelona. Specialists in gold bars, silver coins, and secure vault storage solutions.',
     ARRAY['Gold Bars','Silver Coins','Vault Storage'], true,
     'La Rambla 78, 08002 Barcelona', 4.4, 87, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;
END $$;

-- PORTUGAL – Lisbon
DO $$
DECLARE cty_id uuid; ctry_id uuid;
BEGIN
  SELECT ci.id, ci.country_id INTO cty_id, ctry_id
    FROM cities ci JOIN countries co ON ci.country_id = co.id
   WHERE ci.slug = 'lisbon' AND co.slug = 'portugal';

  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured) VALUES
    ('Lisboa Ouro', 'lisboa-ouro', cty_id, ctry_id,
     'https://www.lisboaouro.pt', '+351-21-555-0101',
     'Lisbon''s trusted gold dealer. Investment gold bars, Portuguese gold coins, and silver bullion at competitive prices.',
     ARRAY['Gold Bars','Portuguese Coins','Silver Bullion'], true,
     'Rua Augusta 120, 1100-053 Lisboa', 4.6, 134, 'approved', true),

    ('Metais Preciosos Lisboa', 'metais-preciosos-lisboa', cty_id, ctry_id,
     'https://www.metaispreciosos.pt', '+351-21-555-0102',
     'Precious metals specialist in Lisbon. LBMA gold bars, Maple Leafs, Krugerrands, and secure storage options.',
     ARRAY['LBMA Bars','Maple Leafs','Krugerrands','Secure Storage'], true,
     'Avenida da Liberdade 200, 1250-147 Lisboa', 4.5, 98, 'approved', false),

    ('Ouro Invest Portugal', 'ouro-invest-portugal', cty_id, ctry_id,
     'https://www.ouroinvest.pt', '+351-21-555-0103',
     'Gold investment dealer in Lisbon. Specialising in tax-efficient gold purchasing, allocated storage, and buyback services.',
     ARRAY['Investment Gold','Allocated Storage','Buyback','Tax-Efficient'], true,
     'Praça do Comércio 15, 1100-148 Lisboa', 4.7, 112, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;
END $$;

-- PORTUGAL – Porto
DO $$
DECLARE cty_id uuid; ctry_id uuid;
BEGIN
  SELECT ci.id, ci.country_id INTO cty_id, ctry_id
    FROM cities ci JOIN countries co ON ci.country_id = co.id
   WHERE ci.slug = 'porto' AND co.slug = 'portugal';

  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured) VALUES
    ('Porto Gold Centre', 'porto-gold-centre', cty_id, ctry_id,
     'https://www.portogoldcentre.pt', '+351-22-555-0201',
     'Porto''s leading gold dealer. Buy and sell gold bars, coins, and silver. Expert valuations for inherited gold and estate pieces.',
     ARRAY['Gold Bars','Gold Coins','Estate Valuations','Buy & Sell'], true,
     'Rua de Santa Catarina 200, 4000-442 Porto', 4.5, 87, 'approved', false),

    ('Norte Ouro', 'norte-ouro', cty_id, ctry_id,
     'https://www.norteouro.pt', '+351-22-555-0202',
     'Northern Portugal gold dealer. Investment gold at competitive premiums. Gold bars, Philharmonics, and Portuguese gold coins.',
     ARRAY['Investment Gold','Philharmonics','Portuguese Coins'], true,
     'Avenida dos Aliados 75, 4000-066 Porto', 4.4, 65, 'approved', false),

    ('Douro Precious Metals', 'douro-precious-metals', cty_id, ctry_id,
     'https://www.douroprecious.pt', '+351-22-555-0203',
     'Precious metals dealer in Porto. Gold and silver bullion, secure storage, and portfolio advisory for Portuguese investors.',
     ARRAY['Gold Bullion','Silver Bullion','Secure Storage','Advisory'], true,
     'Rua das Flores 50, 4050-262 Porto', 4.3, 52, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;
END $$;

-- SWITZERLAND – Zurich
DO $$
DECLARE cty_id uuid; ctry_id uuid;
BEGIN
  SELECT ci.id, ci.country_id INTO cty_id, ctry_id
    FROM cities ci JOIN countries co ON ci.country_id = co.id
   WHERE ci.slug = 'zurich' AND co.slug = 'switzerland';

  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured) VALUES
    ('Zurich Gold Vault', 'zurich-gold-vault', cty_id, ctry_id,
     'https://www.zurichgoldvault.ch', '+41-44-555-0101',
     'Premier Swiss gold dealer in Zurich. LBMA-approved bars, Swiss Vreneli coins, and private vault storage in the heart of the Swiss financial district.',
     ARRAY['LBMA Bars','Swiss Vreneli','Private Vault','Swiss Gold'], true,
     'Bahnhofstrasse 45, 8001 Zürich', 4.9, 287, 'approved', true),

    ('Helvetia Edelmetalle', 'helvetia-edelmetalle', cty_id, ctry_id,
     'https://www.helvetiaedelmetalle.ch', '+41-44-555-0102',
     'Swiss precious metals specialist. Gold bars, coins, platinum, and palladium. Tax-free gold purchases and allocated storage in Swiss vaults.',
     ARRAY['Gold Bars','Platinum','Palladium','Tax-Free','Swiss Vault'], true,
     'Limmatquai 30, 8001 Zürich', 4.8, 234, 'approved', true),

    ('Swiss Bullion Trading', 'swiss-bullion-trading', cty_id, ctry_id,
     'https://www.swissbulliontrading.ch', '+41-44-555-0103',
     'Zurich-based bullion trading house. Investment-grade gold and silver, competitive spreads, and institutional services.',
     ARRAY['Investment Gold','Silver','Institutional','Trading'], true,
     'Talstrasse 20, 8001 Zürich', 4.7, 198, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;
END $$;

-- SWITZERLAND – Geneva
DO $$
DECLARE cty_id uuid; ctry_id uuid;
BEGIN
  SELECT ci.id, ci.country_id INTO cty_id, ctry_id
    FROM cities ci JOIN countries co ON ci.country_id = co.id
   WHERE ci.slug = 'geneva' AND co.slug = 'switzerland';

  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured) VALUES
    ('Genève Or & Métaux', 'geneve-or-metaux', cty_id, ctry_id,
     'https://www.geneveor.ch', '+41-22-555-0201',
     'Geneva''s leading gold dealer. Swiss gold bars, Vreneli coins, and private vault storage in Geneva freeport zone.',
     ARRAY['Swiss Gold Bars','Vreneli Coins','Freeport Storage'], true,
     'Rue du Rhône 60, 1204 Genève', 4.8, 198, 'approved', true),

    ('Lac Léman Precious Metals', 'lac-leman-precious-metals', cty_id, ctry_id,
     'https://www.laclemanpm.ch', '+41-22-555-0202',
     'Precious metals dealer on Lake Geneva. Gold and silver bullion, platinum, and wealth preservation solutions for international clients.',
     ARRAY['Gold Bullion','Silver','Platinum','Wealth Preservation'], true,
     'Quai du Mont-Blanc 15, 1201 Genève', 4.7, 156, 'approved', false),

    ('Swiss Gold Geneva', 'swiss-gold-geneva', cty_id, ctry_id,
     'https://www.swissgoldgeneva.ch', '+41-22-555-0203',
     'Buy and sell gold in Geneva. LBMA bars, international gold coins, and secure Swiss vault storage.',
     ARRAY['LBMA Bars','International Coins','Swiss Vault','Buy & Sell'], true,
     'Place de la Fusterie 8, 1204 Genève', 4.6, 123, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;
END $$;

-- ITALY – Rome
DO $$
DECLARE cty_id uuid; ctry_id uuid;
BEGIN
  SELECT ci.id, ci.country_id INTO cty_id, ctry_id
    FROM cities ci JOIN countries co ON ci.country_id = co.id
   WHERE ci.slug = 'rome' AND co.slug = 'italy';

  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured) VALUES
    ('Roma Oro Investimenti', 'roma-oro-investimenti', cty_id, ctry_id,
     'https://www.romaoro.it', '+39-06-555-0101',
     'Rome''s premier gold investment dealer. Gold bars, Italian gold coins, and tax-exempt investment gold. Serving investors since 2008.',
     ARRAY['Gold Bars','Italian Coins','Tax-Exempt Gold','Investment'], true,
     'Via del Corso 150, 00186 Roma', 4.6, 176, 'approved', true),

    ('Capitale Metalli Preziosi', 'capitale-metalli-preziosi', cty_id, ctry_id,
     'https://www.capitalemetalli.it', '+39-06-555-0102',
     'Precious metals dealer in central Rome. Buy and sell gold, silver, and platinum. Expert numismatic valuations.',
     ARRAY['Gold','Silver','Platinum','Numismatics','Buy & Sell'], true,
     'Via Nazionale 85, 00184 Roma', 4.5, 134, 'approved', false),

    ('Oro Eterno Roma', 'oro-eterno-roma', cty_id, ctry_id,
     'https://www.oroeterno.it', '+39-06-555-0103',
     'The Eternal City''s trusted gold dealer. LBMA gold bars, Krugerrands, Maple Leafs, and allocated storage in Rome.',
     ARRAY['LBMA Bars','Krugerrands','Maple Leafs','Allocated Storage'], true,
     'Via Condotti 20, 00187 Roma', 4.7, 145, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;
END $$;

-- ITALY – Milan
DO $$
DECLARE cty_id uuid; ctry_id uuid;
BEGIN
  SELECT ci.id, ci.country_id INTO cty_id, ctry_id
    FROM cities ci JOIN countries co ON ci.country_id = co.id
   WHERE ci.slug = 'milan' AND co.slug = 'italy';

  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured) VALUES
    ('Milano Gold Trading', 'milano-gold-trading', cty_id, ctry_id,
     'https://www.milanogoldtrading.it', '+39-02-555-0201',
     'Milan''s leading gold trading house. Investment gold bars, coins, and silver. Competitive spreads and institutional services.',
     ARRAY['Gold Bars','Gold Coins','Silver','Institutional'], true,
     'Via Montenapoleone 8, 20121 Milano', 4.7, 198, 'approved', true),

    ('Lombardia Metalli Preziosi', 'lombardia-metalli-preziosi', cty_id, ctry_id,
     'https://www.lombardiametalli.it', '+39-02-555-0202',
     'Lombardy precious metals dealer. Gold and silver bullion, platinum, and secure storage. Serving northern Italy.',
     ARRAY['Gold Bullion','Silver','Platinum','Secure Storage'], true,
     'Corso Buenos Aires 45, 20124 Milano', 4.5, 123, 'approved', false),

    ('Aurum Milano', 'aurum-milano', cty_id, ctry_id,
     'https://www.aurummilano.it', '+39-02-555-0203',
     'Premium gold dealer in Milan''s financial district. LBMA bars, Vienna Philharmonics, and portfolio diversification advisory.',
     ARRAY['LBMA Bars','Vienna Philharmonics','Advisory','Premium'], true,
     'Piazza Affari 6, 20123 Milano', 4.6, 156, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;
END $$;

-- BELGIUM – Brussels
DO $$
DECLARE cty_id uuid; ctry_id uuid;
BEGIN
  SELECT ci.id, ci.country_id INTO cty_id, ctry_id
    FROM cities ci JOIN countries co ON ci.country_id = co.id
   WHERE ci.slug = 'brussels' AND co.slug = 'belgium';

  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured) VALUES
    ('Brussels Gold Exchange', 'brussels-gold-exchange', cty_id, ctry_id,
     'https://www.brusselsgoldexchange.be', '+32-2-555-0101',
     'Belgium''s premier gold exchange in Brussels. Investment gold bars, coins, and silver. Tax-exempt gold in the heart of Europe.',
     ARRAY['Gold Bars','Gold Coins','Silver','Tax-Exempt'], true,
     'Rue de la Bourse 15, 1000 Bruxelles', 4.6, 167, 'approved', true),

    ('Belgique Métaux Précieux', 'belgique-metaux-precieux', cty_id, ctry_id,
     'https://www.belgiquemetaux.be', '+32-2-555-0102',
     'Belgian precious metals dealer. Gold bars, Krugerrands, Maple Leafs, and allocated vault storage in Brussels.',
     ARRAY['Gold Bars','Krugerrands','Maple Leafs','Vault Storage'], true,
     'Avenue Louise 100, 1050 Bruxelles', 4.5, 123, 'approved', false),

    ('European Gold Centre', 'european-gold-centre', cty_id, ctry_id,
     'https://www.europeangoldcentre.be', '+32-2-555-0103',
     'International gold dealer in Brussels. LBMA-approved bars, European gold coins, and secure storage for EU investors.',
     ARRAY['LBMA Bars','European Coins','Secure Storage','International'], true,
     'Grand Place 25, 1000 Bruxelles', 4.7, 145, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;
END $$;

-- BELGIUM – Antwerp
DO $$
DECLARE cty_id uuid; ctry_id uuid;
BEGIN
  SELECT ci.id, ci.country_id INTO cty_id, ctry_id
    FROM cities ci JOIN countries co ON ci.country_id = co.id
   WHERE ci.slug = 'antwerp' AND co.slug = 'belgium';

  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured) VALUES
    ('Antwerp Gold & Diamond', 'antwerp-gold-diamond', cty_id, ctry_id,
     'https://www.antwerpgolddiamond.be', '+32-3-555-0201',
     'Gold and precious metals dealer in Antwerp''s diamond district. Investment gold, silver, and expert valuations.',
     ARRAY['Gold Bars','Gold Coins','Silver','Valuations'], true,
     'Pelikaanstraat 30, 2018 Antwerpen', 4.6, 134, 'approved', true),

    ('Vlaams Edelmetaal', 'vlaams-edelmetaal', cty_id, ctry_id,
     'https://www.vlaamsedelmetaal.be', '+32-3-555-0202',
     'Flemish precious metals specialist. Gold bars, Belgian gold coins, and competitive buyback rates in Antwerp.',
     ARRAY['Gold Bars','Belgian Coins','Buyback','Precious Metals'], true,
     'Meir 50, 2000 Antwerpen', 4.4, 87, 'approved', false),

    ('Port City Bullion', 'port-city-bullion', cty_id, ctry_id,
     'https://www.portcitybullion.be', '+32-3-555-0203',
     'Antwerp-based bullion dealer. LBMA gold bars, silver coins, and allocated storage. Serving Belgium and the Netherlands.',
     ARRAY['LBMA Bars','Silver Coins','Allocated Storage'], true,
     'Grote Markt 12, 2000 Antwerpen', 4.5, 98, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;
END $$;
