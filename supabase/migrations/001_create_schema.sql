-- XAUBase Database Schema
-- Complete migration for all tables

-- 1. Countries
CREATE TABLE countries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  code CHAR(2) NOT NULL UNIQUE,
  region TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX idx_countries_slug ON countries(slug);
CREATE INDEX idx_countries_region ON countries(region);

-- 2. Cities
CREATE TABLE cities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  country_id UUID NOT NULL REFERENCES countries(id) ON DELETE CASCADE,
  state_province TEXT,
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(slug, country_id)
);
CREATE INDEX idx_cities_country ON cities(country_id);
CREATE INDEX idx_cities_slug ON cities(slug);

-- 3. Profiles (extends auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 4. Dealers
CREATE TYPE dealer_status AS ENUM ('pending', 'approved', 'rejected');

CREATE TABLE dealers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  city_id UUID REFERENCES cities(id),
  country_id UUID NOT NULL REFERENCES countries(id),
  website TEXT,
  phone TEXT,
  email TEXT,
  description TEXT,
  specializations TEXT[] DEFAULT '{}',
  online_sales BOOLEAN DEFAULT false,
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  logo_url TEXT,
  featured BOOLEAN DEFAULT false,
  status dealer_status DEFAULT 'pending',
  submitted_by UUID REFERENCES auth.users(id),
  address_line TEXT,
  rating_avg NUMERIC(2,1) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX idx_dealers_slug ON dealers(slug);
CREATE INDEX idx_dealers_country ON dealers(country_id);
CREATE INDEX idx_dealers_city ON dealers(city_id);
CREATE INDEX idx_dealers_status ON dealers(status);
CREATE INDEX idx_dealers_featured ON dealers(featured) WHERE featured = true;
CREATE INDEX idx_dealers_specializations ON dealers USING GIN(specializations);

-- 5. Dealer Reviews
CREATE TABLE dealer_reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  dealer_id UUID NOT NULL REFERENCES dealers(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  review_text TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(dealer_id, user_id)
);
CREATE INDEX idx_reviews_dealer ON dealer_reviews(dealer_id);

CREATE OR REPLACE FUNCTION update_dealer_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE dealers SET
    rating_avg = (SELECT AVG(rating) FROM dealer_reviews WHERE dealer_id = COALESCE(NEW.dealer_id, OLD.dealer_id)),
    review_count = (SELECT COUNT(*) FROM dealer_reviews WHERE dealer_id = COALESCE(NEW.dealer_id, OLD.dealer_id))
  WHERE id = COALESCE(NEW.dealer_id, OLD.dealer_id);
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_review_change
  AFTER INSERT OR UPDATE OR DELETE ON dealer_reviews
  FOR EACH ROW EXECUTE FUNCTION update_dealer_rating();

-- 6. Gold Stocks
CREATE TYPE stock_category AS ENUM (
  'senior_producer', 'mid_cap_producer', 'junior_producer',
  'streaming_royalty', 'australian_listed', 'etf', 'exploration'
);

CREATE TABLE gold_stocks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  ticker TEXT NOT NULL,
  exchange TEXT NOT NULL,
  finnhub_symbol TEXT NOT NULL,
  hq_country TEXT,
  category stock_category NOT NULL,
  annual_production_koz INTEGER,
  market_cap_usd BIGINT,
  description TEXT,
  website TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX idx_stocks_ticker ON gold_stocks(ticker);
CREATE INDEX idx_stocks_category ON gold_stocks(category);

-- 7. Gold Prices Cache
CREATE TABLE gold_prices_cache (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  symbol TEXT NOT NULL,
  currency TEXT NOT NULL,
  price NUMERIC(12,2) NOT NULL,
  open_price NUMERIC(12,2),
  high_price NUMERIC(12,2),
  low_price NUMERIC(12,2),
  change_24h NUMERIC(10,2),
  change_pct NUMERIC(6,3),
  price_gram_24k NUMERIC(10,2),
  price_gram_22k NUMERIC(10,2),
  timestamp TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(symbol, currency)
);

CREATE TABLE gold_prices_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  symbol TEXT NOT NULL DEFAULT 'XAU',
  currency TEXT NOT NULL DEFAULT 'USD',
  price NUMERIC(12,2) NOT NULL,
  date DATE NOT NULL,
  UNIQUE(symbol, currency, date)
);
CREATE INDEX idx_prices_history_date ON gold_prices_history(date DESC);

-- 8. News Articles
CREATE TABLE news_articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  source TEXT NOT NULL,
  url TEXT NOT NULL UNIQUE,
  image_url TEXT,
  published_at TIMESTAMPTZ NOT NULL,
  category TEXT DEFAULT 'general',
  summary TEXT,
  fetched_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX idx_news_published ON news_articles(published_at DESC);
CREATE INDEX idx_news_category ON news_articles(category);

-- 9. Row Level Security
ALTER TABLE countries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Countries are publicly readable" ON countries FOR SELECT USING (true);

ALTER TABLE cities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Cities are publicly readable" ON cities FOR SELECT USING (true);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Profiles are publicly readable" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

ALTER TABLE dealers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Approved dealers are publicly readable" ON dealers FOR SELECT USING (status = 'approved');
CREATE POLICY "Users can see own submissions" ON dealers FOR SELECT USING (submitted_by = auth.uid());
CREATE POLICY "Admins can see all dealers" ON dealers FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Authenticated users can insert dealers" ON dealers FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Admins can update dealers" ON dealers FOR UPDATE USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

ALTER TABLE dealer_reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Reviews are publicly readable" ON dealer_reviews FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert reviews" ON dealer_reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own reviews" ON dealer_reviews FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own reviews" ON dealer_reviews FOR DELETE USING (auth.uid() = user_id);

ALTER TABLE gold_stocks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Stocks are publicly readable" ON gold_stocks FOR SELECT USING (true);

ALTER TABLE gold_prices_cache ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Prices are publicly readable" ON gold_prices_cache FOR SELECT USING (true);

ALTER TABLE gold_prices_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Price history is publicly readable" ON gold_prices_history FOR SELECT USING (true);

ALTER TABLE news_articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "News is publicly readable" ON news_articles FOR SELECT USING (true);
