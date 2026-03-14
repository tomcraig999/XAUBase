-- Seed dealers for: Cayman Islands, Argentina, Brazil, New Zealand, South Africa
-- Run AFTER seed-new-countries-cities.sql

-- ============================================================
-- CAYMAN ISLANDS DEALERS
-- ============================================================
DO $$
DECLARE ky_id UUID;
BEGIN
  SELECT id INTO ky_id FROM countries WHERE slug = 'cayman-islands';

  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('Strategic Wealth Preservation', 'strategic-wealth-preservation',
     (SELECT id FROM cities WHERE slug = 'george-town' AND country_id = ky_id), ky_id,
     'https://swpcayman.com/', '+1-888-445-1977',
     'Fully-integrated precious metals dealer and Class III UL-rated vaulting facility in Grand Cayman. LBMA affiliate member. Sells gold, silver, platinum and palladium from major mints including US Mint, Royal Canadian Mint and PAMP Suisse. Offers 100% segregated, allocated storage.',
     ARRAY['bullion', 'coins', 'bars', 'storage'], true,
     '663 Linford Pierson Hwy, George Town, Grand Cayman', 4.6, 89, 'approved', true),

    ('Byzantium Ltd', 'byzantium-cayman',
     (SELECT id FROM cities WHERE slug = 'george-town' AND country_id = ky_id), ky_id,
     'http://byzantium.ky/', '+1-345-947-7000',
     'First private vaulting, bullion storage, precious metals brokerage and refinery in the Caribbean. Operational since 2013. Features a Class 3 bullion vault with 450+ safety deposit boxes and an analytic lab with assaying services. 24-hour vault access available.',
     ARRAY['bullion', 'storage', 'refining'], false,
     'George Town, Grand Cayman', 4.4, 45, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;
END $$;

-- ============================================================
-- ARGENTINA DEALERS
-- ============================================================
DO $$
DECLARE ar_id UUID;
BEGIN
  SELECT id INTO ar_id FROM countries WHERE slug = 'argentina';

  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('Cipriano Joyas', 'cipriano-joyas',
     (SELECT id FROM cities WHERE slug = 'buenos-aires' AND country_id = ar_id), ar_id,
     'https://ciprianojoyas.com.ar/', '+54-11-4813-0738',
     'Over 20 years in business in Buenos Aires. Buys and sells gold in all forms including ingots with and without certificates, jewelry and luxury watches. Professional appraisal with immediate payment. Located in Recoleta and Patio Bullrich mall.',
     ARRAY['bullion', 'coins', 'bars'], true,
     'Arenales 1276, Recoleta, Buenos Aires', 4.5, 156, 'approved', true),

    ('Stark Joyas', 'stark-joyas',
     (SELECT id FROM cities WHERE slug = 'buenos-aires' AND country_id = ar_id), ar_id,
     'https://starkjoyas.com.ar/', '+54-11-4315-1400',
     'Sells Swiss fine gold bars in 10g, 50g and 100g sizes as well as national fine gold bars. Buys and sells gold up to 24K, diamonds and luxury watches. Located on prestigious Avenida Alvear with private security and parking.',
     ARRAY['bullion', 'bars'], true,
     'Avenida Alvear 1551, Recoleta, Buenos Aires', 4.7, 198, 'approved', false),

    ('Esmeralda Oro', 'esmeralda-oro',
     (SELECT id FROM cities WHERE slug = 'buenos-aires' AND country_id = ar_id), ar_id,
     'https://www.esmeraldaoro.com/', '+54-11-4328-1836',
     'Buys gold in all forms including coins, jewelry and bars in 14K, 18K and 24K. Also appraises art and antiques. Open Monday to Friday 10:00-18:30 in downtown Buenos Aires.',
     ARRAY['coins', 'bars'], false,
     'Esmeralda 661, C.A.B.A., Buenos Aires', 4.3, 87, 'approved', false),

    ('Leiva Joyas', 'leiva-joyas',
     (SELECT id FROM cities WHERE slug = 'buenos-aires' AND country_id = ar_id), ar_id,
     'https://leivajoyas.com.ar/', '+54-9-11-2248-1615',
     'Founded 1973, one of Argentina''s most prestigious jewelry and gold companies. Sells gold ingots in 1g, 5g, 10g, 20g and 50g sizes. Conducts periodic appraisal events in Cordoba. Buys all types of gold and luxury watches. Nationwide service.',
     ARRAY['bullion', 'bars', 'coins'], true,
     'Av. Corrientes 2827, Balvanera, Buenos Aires', 4.6, 312, 'approved', true),

    ('Gallardo Montali', 'gallardo-montali',
     (SELECT id FROM cities WHERE slug = 'cordoba' AND country_id = ar_id), ar_id,
     'https://gallardomontali.com.ar/', '+54-3548-154088',
     '20+ years experience buying and selling gold in Cordoba province. Sells ingots in 5g, 10g, 50g, 100g, 250g, 500g and 1kg sizes. Professional appraisers with free online quotation system.',
     ARRAY['bullion', 'bars'], true,
     'Av. Eden 444 Pb L15, La Falda, Cordoba', 4.4, 76, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;
END $$;

-- ============================================================
-- BRAZIL DEALERS
-- ============================================================
DO $$
DECLARE br_id UUID;
BEGIN
  SELECT id INTO br_id FROM countries WHERE slug = 'brazil';

  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('Parmetal DTVM', 'parmetal-dtvm',
     (SELECT id FROM cities WHERE slug = 'sao-paulo' AND country_id = br_id), br_id,
     'https://www.parmetal.com.br/', '+55-11-0800-709-1033',
     'Founded 1968. Accredited by Central Bank of Brazil and CVM. Specializes in gold as a financial asset (Ouro Ativo Financeiro). Produces 99.99% pure gold bars with assay certificates. Also offers currency exchange services.',
     ARRAY['bullion', 'bars'], true,
     'Alameda Rio Negro 500, Alphaville, Barueri, SP 06454-000', 4.5, 234, 'approved', true),

    ('Ourominas', 'ourominas',
     (SELECT id FROM cities WHERE slug = 'sao-paulo' AND country_id = br_id), br_id,
     'https://www.ourominas.com/', '+55-11-2050-1646',
     'Financial institution authorized by Brazil''s Central Bank. Buys and sells gold bars for investment, export and industrial use. 80+ stores across Brazil. Available via mobile app.',
     ARRAY['bullion', 'bars', 'online'], true,
     'Av. Cidade Jardim 400, Conj. 173-176, Jardim Paulistano, SP 01454-901', 4.3, 456, 'approved', true),

    ('Gold Tech Joias', 'gold-tech-joias',
     (SELECT id FROM cities WHERE slug = 'rio-de-janeiro' AND country_id = br_id), br_id,
     'https://goldtechjoias.com/', '+55-21-3228-6070',
     '15+ years experience in Rio de Janeiro. Specializes in evaluation and purchase of gold, jewelry, coins, precious stones and gold bars. Free appraisals. Two locations in Tijuca and Ipanema with full security.',
     ARRAY['coins', 'bars'], false,
     'Rua Conde de Bonfim 344, Loja 211, Tijuca, Rio de Janeiro', 4.4, 167, 'approved', false),

    ('Gold Rio', 'gold-rio',
     (SELECT id FROM cities WHERE slug = 'rio-de-janeiro' AND country_id = br_id), br_id,
     'https://goldrio.com.br/', NULL,
     'One of the main gold dealers in Rio de Janeiro. Buys gold jewelry and items across Zona Sul, Zona Norte, Barra da Tijuca and Itanhanga. Discreet, secure evaluation environment.',
     ARRAY['coins', 'bars'], false,
     'Rio de Janeiro, RJ', 4.2, 98, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;
END $$;

-- ============================================================
-- NEW ZEALAND DEALERS
-- ============================================================
DO $$
DECLARE nz_id UUID;
BEGIN
  SELECT id INTO nz_id FROM countries WHERE slug = 'new-zealand';

  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('MyGold', 'mygold-nz',
     (SELECT id FROM cities WHERE slug = 'auckland' AND country_id = nz_id), nz_id,
     'https://www.mygold.co.nz/', '+64-800-465-369',
     'Leading independent, family-owned precious metals merchant. New Zealand''s highest-reviewed gold merchants. Sources bullion from prestigious mints worldwide including PAMP Suisse and Royal Mint.',
     ARRAY['bullion', 'coins', 'bars'], true,
     'Unit 7, Mezzanine Level, 147-149 Victoria Street West, Auckland 1010', 4.9, 287, 'approved', true),

    ('New Zealand Gold Merchants', 'nz-gold-merchants',
     (SELECT id FROM cities WHERE slug = 'auckland' AND country_id = nz_id), nz_id,
     'https://gogold.co.nz/', '+64-9-634-0529',
     'New Zealand''s largest gold and silver dealer, operating since 1975. Over 45 years in business. Buys, sells and refines precious metals. Live pricing and nationwide delivery. Also operates a precious metals refinery.',
     ARRAY['bullion', 'coins', 'bars', 'refining'], true,
     '273 Neilson St, Onehunga, Auckland', 4.7, 345, 'approved', true),

    ('Commonwealth Vault Auckland', 'commonwealth-vault-auckland',
     (SELECT id FROM cities WHERE slug = 'auckland' AND country_id = nz_id), nz_id,
     'https://commonwealthvault.co.nz/', '+64-800-222-883',
     'Sells gold and silver bullion with secure safe deposit vault storage. Heritage building location in central Auckland. Also operates a Christchurch branch.',
     ARRAY['bullion', 'bars', 'storage'], true,
     '6 Albert Street, Cnr Customs and Albert Streets, Auckland', 4.6, 134, 'approved', false),

    ('NZ Vault', 'nz-vault',
     (SELECT id FROM cities WHERE slug = 'wellington' AND country_id = nz_id), nz_id,
     'https://www.nzvault.co.nz/', '+64-4-915-1168',
     'Privately owned bullion dealer and vault in Wellington, independent of the banking sector. Buys and sells gold and silver bullion with secure storage facilities.',
     ARRAY['bullion', 'bars', 'storage'], true,
     'Willis Street, Wellington', 4.5, 98, 'approved', false),

    ('BuyBullion NZ', 'buybullion-nz',
     (SELECT id FROM cities WHERE slug = 'wellington' AND country_id = nz_id), nz_id,
     'https://buybullion.nz/', NULL,
     'Family-owned New Zealand business since 2000. Sells gold, silver, platinum and palladium coins, bars and rounds. Nationwide coverage with face-to-face meetings available in Wellington, Upper Hutt and 8 other NZ cities.',
     ARRAY['bullion', 'coins', 'bars'], true,
     'Wellington (face-to-face meetings available)', 4.6, 112, 'approved', false),

    ('Commonwealth Vault Christchurch', 'commonwealth-vault-christchurch',
     (SELECT id FROM cities WHERE slug = 'christchurch' AND country_id = nz_id), nz_id,
     'https://commonwealthvault.co.nz/', '+64-3-377-9987',
     'Sells gold and silver bullion with secure vault storage. Christchurch branch of the Auckland-based dealer.',
     ARRAY['bullion', 'bars', 'storage'], true,
     '152 Oxford Terrace, Christchurch Central', 4.5, 67, 'approved', false),

    ('Best Bullion', 'best-bullion-nz',
     (SELECT id FROM cities WHERE slug = 'christchurch' AND country_id = nz_id), nz_id,
     'https://bestbullion.co.nz/', NULL,
     'Christchurch''s highest 5-star rated bullion provider. Gold, silver, platinum and palladium. Live pricing, secure delivery and expert investment support. Appointment-based.',
     ARRAY['bullion', 'coins', 'bars'], true,
     'Christchurch', 4.9, 56, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;
END $$;

-- ============================================================
-- SOUTH AFRICA DEALERS
-- ============================================================
DO $$
DECLARE za_id UUID;
BEGIN
  SELECT id INTO za_id FROM countries WHERE slug = 'south-africa';

  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    -- Johannesburg
    ('The Scoin Shop Sandton', 'scoin-shop-sandton',
     (SELECT id FROM cities WHERE slug = 'johannesburg' AND country_id = za_id), za_id,
     'https://scoinshop.com/', '+27-11-784-8551',
     'Established 1972. Largest gold coin distributor in South Africa with 25+ retail shops nationwide. Authorized dealer of Rand Refinery and SA Mint. Specializes in Krugerrands, rare coins and numismatics. Free safe custody and free shipping on selected products.',
     ARRAY['coins', 'bullion', 'numismatics'], true,
     'Shop BC24, Level 5, Sandton City Mall, 129 Rivonia Road, Sandton', 4.7, 534, 'approved', true),

    ('IBV Gold Rosebank', 'ibv-gold-rosebank',
     (SELECT id FROM cities WHERE slug = 'johannesburg' AND country_id = za_id), za_id,
     'https://ibvgold.co.za/', '+27-10-157-3020',
     'Buys and sells premium gold and silver bullion. Also offers private vault and safe deposit box services through IBV International Vaults. Multiple locations across South Africa and London.',
     ARRAY['bullion', 'bars', 'storage'], true,
     '191 Jan Smuts Avenue, Rosebank Corner, Parktown North, Johannesburg 2193', 4.5, 187, 'approved', false),

    ('Gold Reef City Mint', 'gold-reef-city-mint',
     (SELECT id FROM cities WHERE slug = 'johannesburg' AND country_id = za_id), za_id,
     'https://www.grcmint.co.za/', '+27-11-873-5090',
     'Established 1986. Registered dealer with SA Mint and Rand Refinery. Founder member of the South African Association of Numismatic Dealers. One of two privately owned mints in SA that have minted legal tender coins.',
     ARRAY['coins', 'bullion', 'numismatics'], true,
     'Unit 7A, Knightsgate Industrial Park, Refinery Road, Germiston 2058', 4.6, 234, 'approved', false),

    ('Mr K Fourways', 'mr-k-fourways',
     (SELECT id FROM cities WHERE slug = 'johannesburg' AND country_id = za_id), za_id,
     'https://mrk.co.za/', '+27-861-111-860',
     'Premier Krugerrand dealer. Trades in gold and silver bullion including Krugerrands and bars. Also buys recycled gold, platinum, silver and palladium. Multiple locations nationwide.',
     ARRAY['bullion', 'coins', 'bars'], true,
     'Shop NG17, Fourways Mall, 11 Ruby Close, Witkoppen, Sandton 2068', 4.4, 312, 'approved', false),

    ('ISA Gold', 'isa-gold',
     (SELECT id FROM cities WHERE slug = 'johannesburg' AND country_id = za_id), za_id,
     'https://www.isagold.com/', '+27-11-784-4071',
     'South Africa''s leading online Krugerrand trading platform. Official Rand Refinery Dealer. 16+ years in gold trading. No trading, storage or insurance fees. Offers 1oz, 1/2oz, 1/4oz and 1/10oz Krugerrands.',
     ARRAY['bullion', 'coins', 'online'], true,
     '1st Floor, Craddock Square Offices, 169 Oxford Road, Rosebank 2196', 4.7, 267, 'approved', true),

    -- Cape Town
    ('SA Bullion', 'sa-bullion',
     (SELECT id FROM cities WHERE slug = 'cape-town' AND country_id = za_id), za_id,
     'https://sabullion.co.za/', '+27-21-447-3240',
     'Premium gold, silver and platinum products. International custody in London, Dubai, Zurich and South Africa. Rated 4.9/5. Operates under SA financial regulations.',
     ARRAY['bullion', 'bars', 'storage'], true,
     '1st Floor, Brickfield Canvas, 35 Brickfield Road, Woodstock, Cape Town 7925', 4.9, 345, 'approved', true),

    ('City Coins', 'city-coins-capetown',
     (SELECT id FROM cities WHERE slug = 'cape-town' AND country_id = za_id), za_id,
     'https://www.citycoins.com/', '+27-21-425-2639',
     'Cape Town''s most established coin dealer since 1967, the year the first Krugerrand was minted. Authorized dealer of Rand Refinery and SA Mint. Family-run by the Jaffe family. By appointment only.',
     ARRAY['coins', 'numismatics', 'bullion'], false,
     'Tulbagh Centre, 9 Hans Strijdom Ave, Central, Cape Town 8001', 4.8, 178, 'approved', false),

    ('Mr K Tyger Valley', 'mr-k-tyger-valley',
     (SELECT id FROM cities WHERE slug = 'cape-town' AND country_id = za_id), za_id,
     'https://mrk.co.za/', '+27-21-023-0605',
     'Part of the Mr K national chain. Krugerrands, bullion bars and recycled precious metals. Multiple Cape Town locations including Somerset West, Durbanville and Rondebosch.',
     ARRAY['bullion', 'coins', 'bars'], true,
     'Shop BL145, Tyger Valley Shopping Centre, Bellville Park, Cape Town', 4.3, 145, 'approved', false),

    -- Durban
    ('IBV Gold Durban', 'ibv-gold-durban',
     (SELECT id FROM cities WHERE slug = 'durban' AND country_id = za_id), za_id,
     'https://ibvgold.co.za/', '+27-31-880-2119',
     'Buys and sells premium gold and silver bullion in Durban. Also has an Umhlanga Ridge location and Gateway Theatre of Shopping branch. Part of the IBV International Vaults network.',
     ARRAY['bullion', 'bars', 'storage'], true,
     '135 Musgrave Road, Durban 4001', 4.5, 98, 'approved', false),

    ('Mr K Gateway', 'mr-k-gateway',
     (SELECT id FROM cities WHERE slug = 'durban' AND country_id = za_id), za_id,
     'https://mrk.co.za/', '+27-31-880-2274',
     'Part of the Mr K national chain. Krugerrands, gold and silver bullion, recycled precious metals and custom jewelry. Located in Gateway Theatre of Shopping.',
     ARRAY['bullion', 'coins', 'bars'], true,
     'Shop F308, Gateway Theatre of Shopping, 1 Palm Boulevard, Umhlanga Ridge 4021', 4.4, 112, 'approved', false),

    ('The Scoin Shop Pavilion', 'scoin-shop-pavilion',
     (SELECT id FROM cities WHERE slug = 'durban' AND country_id = za_id), za_id,
     'https://scoinshop.com/', '+27-31-265-5884',
     'Part of The Scoin Shop national chain with 25+ stores. Full range of Krugerrands, proof coins, ZAR coins and numismatics. Authorized dealer of Rand Refinery and SA Mint.',
     ARRAY['coins', 'bullion', 'numismatics'], true,
     'Shop 229, The Pavilion Shopping Centre, Durban', 4.6, 167, 'approved', false),

    -- Pretoria
    ('The Scoin Shop Menlyn', 'scoin-shop-menlyn',
     (SELECT id FROM cities WHERE slug = 'pretoria' AND country_id = za_id), za_id,
     'https://scoinshop.com/', NULL,
     'Part of The Scoin Shop chain. Full range of Krugerrands, gold coins and numismatics. Located in Menlyn Park Shopping Centre.',
     ARRAY['coins', 'bullion', 'numismatics'], true,
     'Cavendish Court, Ground Floor, Menlyn Park Shopping Centre, Pretoria', 4.5, 134, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;
END $$;

-- ============================================================
-- SINGAPORE DEALERS
-- ============================================================
DO $$
DECLARE sg_id UUID;
BEGIN
  SELECT id INTO sg_id FROM countries WHERE slug = 'singapore';

  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('BullionStar', 'bullionstar-singapore',
     (SELECT id FROM cities WHERE slug = 'singapore' AND country_id = sg_id), sg_id,
     'https://www.bullionstar.com/', '+65-6284-4653',
     'Singapore''s largest precious metals dealer with over $2 billion in orders fulfilled. Sells gold, silver and platinum bars and coins from major mints including PAMP, Heraeus and Perth Mint. Walk-in retail shop opposite Clarke Quay MRT. GST-exempt on investment-grade bullion.',
     ARRAY['bullion', 'coins', 'bars', 'storage'], true,
     '45 New Bridge Road, Singapore 059398', 4.8, 567, 'approved', true),

    ('Indigo Precious Metals', 'indigo-precious-metals',
     (SELECT id FROM cities WHERE slug = 'singapore' AND country_id = sg_id), sg_id,
     'https://www.indigopreciousmetals.com/', '+65-6223-0185',
     'Trusted Singapore bullion dealer offering 24-carat investment-grade gold bars. Provides fully insured worldwide delivery and secure tax-free vaulting at Le Freeport Singapore via Malca-Amit. Professional, confidential service.',
     ARRAY['bullion', 'bars', 'storage'], true,
     '7 Bukit Pasoh Road, Singapore 089821', 4.7, 234, 'approved', false),

    ('Silver Bullion', 'silver-bullion-singapore',
     (SELECT id FROM cities WHERE slug = 'singapore' AND country_id = sg_id), sg_id,
     'https://www.silverbullion.com.sg/', '+65-6100-3040',
     'Specializes in physical gold, silver and platinum storage as private property in Singapore. Operates The Reserve vault facility at Changi. Offers independent testing, authentication, collateralization and full liquidity for stored bullion.',
     ARRAY['bullion', 'bars', 'storage'], true,
     '9 Raffles Boulevard, #01-108, Millenia Walk, Singapore 039596', 4.7, 345, 'approved', true),

    ('LPM Singapore', 'lpm-singapore',
     (SELECT id FROM cities WHERE slug = 'singapore' AND country_id = sg_id), sg_id,
     'https://www.lpm.sg/', '+65-6348-5477',
     'Singapore branch of LPM Group (Hong Kong), one of Asia''s largest precious metals dealers. Offers gold bars from 1g to 1kg and coins from Royal Canadian Mint, US Mint, Perth Mint and Royal British Mint.',
     ARRAY['bullion', 'coins', 'bars'], true,
     '11 Keppel Road, #01-02/03, ABI Plaza, Singapore 089057', 4.6, 189, 'approved', false),

    ('J. Rotbart & Co. Singapore', 'j-rotbart-singapore',
     (SELECT id FROM cities WHERE slug = 'singapore' AND country_id = sg_id), sg_id,
     'https://jrotbart.com/', '+65-6980-2968',
     'Boutique bullion firm serving high-net-worth clients. Provides gold and silver trading, secure storage across 16 global locations, logistics, financing against bullion collateral and authentication services. Member of SBMA.',
     ARRAY['bullion', 'bars', 'storage'], true,
     'Six Battery Road, Level 3, Room 369, Singapore', 4.8, 123, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;
END $$;

-- ============================================================
-- HONG KONG DEALERS
-- ============================================================
DO $$
DECLARE hk_id UUID;
BEGIN
  SELECT id INTO hk_id FROM countries WHERE slug = 'hong-kong';

  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('J. Rotbart & Co.', 'j-rotbart-hk',
     (SELECT id FROM cities WHERE slug = 'hong-kong' AND country_id = hk_id), hk_id,
     'https://jrotbart.com/', '+852-2104-9233',
     'Hong Kong-headquartered boutique precious metals broker with 14+ years experience and over $3 billion in transaction volume. Specializes in buy/sell, secure storage, logistics, financing and authentication for high-net-worth clients and institutions.',
     ARRAY['bullion', 'bars', 'storage'], true,
     'Suite 1503, 15/F, Champion Building, 287-291 Des Voeux Road Central', 4.8, 234, 'approved', true),

    ('Kitco Asia', 'kitco-asia',
     (SELECT id FROM cities WHERE slug = 'hong-kong' AND country_id = hk_id), hk_id,
     'https://kitcoasia.com/', '+852-2827-7800',
     'Hong Kong office of international precious metals giant Kitco (Montreal-based). Authorized dealer for major government mints. Sells gold, silver, platinum, palladium and rhodium bars and coins.',
     ARRAY['bullion', 'coins', 'bars'], true,
     'Unit 1405, 14/F, West Tower, Shun Tak Centre, 168-200 Connaught Road Central, Sheung Wan', 4.7, 345, 'approved', true),

    ('LPM Group', 'lpm-hong-kong',
     (SELECT id FROM cities WHERE slug = 'hong-kong' AND country_id = hk_id), hk_id,
     'https://www.lpm.hk/', '+852-3568-6834',
     'One of Asia''s largest precious metals dealers, headquartered in Central Hong Kong. Operates a consumer showroom and 24/7 online trading platform. Products range from coins and gold bullion to certified numismatic issues.',
     ARRAY['bullion', 'coins', 'bars', 'numismatics'], true,
     '2/F, 33 Des Voeux Road Central, Central', 4.6, 456, 'approved', false),

    ('Chow Sang Sang', 'chow-sang-sang',
     (SELECT id FROM cities WHERE slug = 'hong-kong' AND country_id = hk_id), hk_id,
     'https://goldbar.chowsangsang.com/en', '+852-2730-2305',
     'Heritage Hong Kong jeweller with 90+ years experience. Offers 999.9 purity gold bars and bullion with no labour charge. Online gold bar purchase platform with free local shipping on orders above HK$17,000.',
     ARRAY['bullion', 'bars'], true,
     '229 Nathan Road, Kowloon', 4.7, 567, 'approved', false),

    ('Chow Tai Fook', 'chow-tai-fook',
     (SELECT id FROM cities WHERE slug = 'hong-kong' AND country_id = hk_id), hk_id,
     'https://www.chowtaifook.com/en-hk/eshop/jewellery/gold-coin-gold-bar', '+852-2526-8649',
     'Founded in 1929, one of the world''s largest jewellery retailers and a leading gold dealer in Greater China. Offers 999.9 pure gold bars, bullion and gold coins. Hundreds of retail locations across Hong Kong. Listed on HKEX.',
     ARRAY['bullion', 'bars', 'coins'], true,
     '38/F, New World Tower, 16-18 Queen''s Road Central, Central', 4.8, 890, 'approved', true)
  ON CONFLICT (slug) DO NOTHING;
END $$;

-- ============================================================
-- THAILAND DEALERS
-- ============================================================
DO $$
DECLARE th_id UUID;
BEGIN
  SELECT id INTO th_id FROM countries WHERE slug = 'thailand';

  INSERT INTO dealers (name, slug, city_id, country_id, website, phone, description, specializations, online_sales, address_line, rating_avg, review_count, status, featured)
  VALUES
    ('Hua Seng Heng', 'hua-seng-heng',
     (SELECT id FROM cities WHERE slug = 'bangkok' AND country_id = th_id), th_id,
     'https://www.huasengheng.com/', '+66-2-225-0202',
     'Thailand''s most trusted gold dealer since 1952 with 70+ years of experience. Operates a gold refinery and is a gold bar manufacturer. Headquartered on Yaowarat Road in Bangkok''s Chinatown. Offers online trading of 99.99% gold bars.',
     ARRAY['bullion', 'bars', 'refining'], true,
     '255-257 Hua Seng Heng Building 2, 1st Floor, Yaowarat Road, Samphanthawong, Bangkok 10100', 4.7, 678, 'approved', true),

    ('MTS Gold', 'mts-gold-bangkok',
     (SELECT id FROM cities WHERE slug = 'bangkok' AND country_id = th_id), th_id,
     'https://www.mtsgold.co.th/', '+66-2-770-7777',
     'One of Thailand''s largest gold importers and exporters, operating 60+ years. Imports 99.99% LBMA-certified gold bars from Swiss refineries (Metalor, PAMP, Argor-Heraeus, Valcambi), Perth Mint and Rand Refinery. Online gold trading platform.',
     ARRAY['bullion', 'bars', 'online'], true,
     '40, 42, 44 Sapsin Road, Wang Burapha Phirom, Pranakorn, Bangkok 10200', 4.6, 456, 'approved', true),

    ('YLG Bullion International', 'ylg-bullion',
     (SELECT id FROM cities WHERE slug = 'bangkok' AND country_id = th_id), th_id,
     'https://www.ylgbullion.co.th/', '+66-2-677-5298',
     'Established in 2003, YLG is Thailand''s leading gold bar importer and exporter. Also operates YLG Bullion and Futures for gold futures trading. Full-service gold dealer offering physical bullion and online trading.',
     ARRAY['bullion', 'bars', 'online'], true,
     '653/14 Narathiwat Ratchanakharin Road, Thung Maha Maek, Sathon, Bangkok 10120', 4.5, 345, 'approved', false),

    ('Ausiris', 'ausiris-bangkok',
     (SELECT id FROM cities WHERE slug = 'bangkok' AND country_id = th_id), th_id,
     'https://www.ausiris.co.th/', '+66-2-613-0888',
     'Gold trading and consultancy company that manufactures and distributes gold bars and coins. Winner of the World Branding Award (Brand of the Year) for 4 consecutive years. Flagship store accessible via BTS Sala Daeng / MRT Silom stations.',
     ARRAY['bullion', 'bars', 'coins'], true,
     'Silom Complex, 4th Floor, 191 Si Lom Road, Bang Rak, Bangkok 10500', 4.6, 289, 'approved', false),

    ('MTS Gold Chiang Mai', 'mts-gold-chiang-mai',
     (SELECT id FROM cities WHERE slug = 'chiang-mai' AND country_id = th_id), th_id,
     'https://www.mtsgold.co.th/', '+66-53-232-703',
     'Chiang Mai branch of MTS Gold Group, operated under the Inseethong name. Part of Thailand''s largest full-service gold and precious metals group. Sells and buys gold bullion at Gold Traders Association rates.',
     ARRAY['bullion', 'bars'], false,
     '367/58 Witchayanon Road, Changmoi Sub-District, Mueang Chiang Mai 50300', 4.4, 134, 'approved', false),

    ('The Silver Connection', 'silver-connection-chiang-mai',
     (SELECT id FROM cities WHERE slug = 'chiang-mai' AND country_id = th_id), th_id,
     'https://thesilverconnection.com/', NULL,
     'Chiang Mai-based precious metals dealer specializing in silver and gold. Offers competitive real-time pricing with fully insured delivery. Operates a Sigma Metalytics testing machine for authentication. Parent company provides secure storage facilities.',
     ARRAY['bullion', 'coins', 'bars'], true,
     'Nimmanahaemin Road Soi 15, T. Suthep, A. Mueang, Chiang Mai 50200', 4.5, 87, 'approved', false)
  ON CONFLICT (slug) DO NOTHING;
END $$;
