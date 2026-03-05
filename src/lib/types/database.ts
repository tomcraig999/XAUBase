export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type DealerStatus = "pending" | "approved" | "rejected";
export type StockCategory =
  | "senior_producer"
  | "mid_cap_producer"
  | "junior_producer"
  | "streaming_royalty"
  | "australian_listed"
  | "etf"
  | "exploration";

export interface Database {
  public: {
    Tables: {
      countries: {
        Row: {
          id: string;
          name: string;
          slug: string;
          code: string;
          region: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          code: string;
          region: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          code?: string;
          region?: string;
          created_at?: string;
        };
      };
      cities: {
        Row: {
          id: string;
          name: string;
          slug: string;
          country_id: string;
          state_province: string | null;
          lat: number | null;
          lng: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          country_id: string;
          state_province?: string | null;
          lat?: number | null;
          lng?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          country_id?: string;
          state_province?: string | null;
          lat?: number | null;
          lng?: number | null;
          created_at?: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          username: string | null;
          full_name: string | null;
          avatar_url: string | null;
          role: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          username?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          username?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      dealers: {
        Row: {
          id: string;
          name: string;
          slug: string;
          city_id: string | null;
          country_id: string;
          website: string | null;
          phone: string | null;
          email: string | null;
          description: string | null;
          specializations: string[];
          online_sales: boolean;
          lat: number | null;
          lng: number | null;
          logo_url: string | null;
          featured: boolean;
          status: DealerStatus;
          submitted_by: string | null;
          address_line: string | null;
          rating_avg: number;
          review_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          city_id?: string | null;
          country_id: string;
          website?: string | null;
          phone?: string | null;
          email?: string | null;
          description?: string | null;
          specializations?: string[];
          online_sales?: boolean;
          lat?: number | null;
          lng?: number | null;
          logo_url?: string | null;
          featured?: boolean;
          status?: DealerStatus;
          submitted_by?: string | null;
          address_line?: string | null;
          rating_avg?: number;
          review_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          city_id?: string | null;
          country_id?: string;
          website?: string | null;
          phone?: string | null;
          email?: string | null;
          description?: string | null;
          specializations?: string[];
          online_sales?: boolean;
          lat?: number | null;
          lng?: number | null;
          logo_url?: string | null;
          featured?: boolean;
          status?: DealerStatus;
          submitted_by?: string | null;
          address_line?: string | null;
          rating_avg?: number;
          review_count?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      dealer_reviews: {
        Row: {
          id: string;
          dealer_id: string;
          user_id: string;
          rating: number;
          review_text: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          dealer_id: string;
          user_id: string;
          rating: number;
          review_text?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          dealer_id?: string;
          user_id?: string;
          rating?: number;
          review_text?: string | null;
          created_at?: string;
        };
      };
      gold_stocks: {
        Row: {
          id: string;
          company_name: string;
          ticker: string;
          exchange: string;
          finnhub_symbol: string;
          hq_country: string | null;
          category: StockCategory;
          annual_production_koz: number | null;
          market_cap_usd: number | null;
          description: string | null;
          website: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          company_name: string;
          ticker: string;
          exchange: string;
          finnhub_symbol: string;
          hq_country?: string | null;
          category: StockCategory;
          annual_production_koz?: number | null;
          market_cap_usd?: number | null;
          description?: string | null;
          website?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          company_name?: string;
          ticker?: string;
          exchange?: string;
          finnhub_symbol?: string;
          hq_country?: string | null;
          category?: StockCategory;
          annual_production_koz?: number | null;
          market_cap_usd?: number | null;
          description?: string | null;
          website?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      gold_prices_cache: {
        Row: {
          id: string;
          symbol: string;
          currency: string;
          price: number;
          open_price: number | null;
          high_price: number | null;
          low_price: number | null;
          change_24h: number | null;
          change_pct: number | null;
          price_gram_24k: number | null;
          price_gram_22k: number | null;
          timestamp: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          symbol: string;
          currency: string;
          price: number;
          open_price?: number | null;
          high_price?: number | null;
          low_price?: number | null;
          change_24h?: number | null;
          change_pct?: number | null;
          price_gram_24k?: number | null;
          price_gram_22k?: number | null;
          timestamp: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          symbol?: string;
          currency?: string;
          price?: number;
          open_price?: number | null;
          high_price?: number | null;
          low_price?: number | null;
          change_24h?: number | null;
          change_pct?: number | null;
          price_gram_24k?: number | null;
          price_gram_22k?: number | null;
          timestamp?: string;
          created_at?: string;
        };
      };
      gold_prices_history: {
        Row: {
          id: string;
          symbol: string;
          currency: string;
          price: number;
          date: string;
        };
        Insert: {
          id?: string;
          symbol?: string;
          currency?: string;
          price: number;
          date: string;
        };
        Update: {
          id?: string;
          symbol?: string;
          currency?: string;
          price?: number;
          date?: string;
        };
      };
      news_articles: {
        Row: {
          id: string;
          title: string;
          source: string;
          url: string;
          image_url: string | null;
          published_at: string;
          category: string;
          summary: string | null;
          fetched_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          source: string;
          url: string;
          image_url?: string | null;
          published_at: string;
          category?: string;
          summary?: string | null;
          fetched_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          source?: string;
          url?: string;
          image_url?: string | null;
          published_at?: string;
          category?: string;
          summary?: string | null;
          fetched_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      dealer_status: DealerStatus;
      stock_category: StockCategory;
    };
  };
}
