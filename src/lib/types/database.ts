export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type DealerStatus = "pending" | "approved" | "rejected";
export type RequestStatus = "pending" | "approved" | "rejected";
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
        Relationships: [];
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
        Relationships: [];
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
        Relationships: [];
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
          owner_id: string | null;
          requested_city: string | null;
          admin_note: string | null;
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
          owner_id?: string | null;
          requested_city?: string | null;
          admin_note?: string | null;
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
          owner_id?: string | null;
          requested_city?: string | null;
          admin_note?: string | null;
          rating_avg?: number;
          review_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
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
        Relationships: [];
      };
      dealer_claims: {
        Row: {
          id: string;
          dealer_id: string;
          user_id: string;
          user_email: string;
          message: string | null;
          status: RequestStatus;
          auto_verified: boolean;
          admin_note: string | null;
          reviewed_by: string | null;
          reviewed_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          dealer_id: string;
          user_id: string;
          user_email: string;
          message?: string | null;
          status?: RequestStatus;
          auto_verified?: boolean;
          admin_note?: string | null;
          reviewed_by?: string | null;
          reviewed_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          dealer_id?: string;
          user_id?: string;
          user_email?: string;
          message?: string | null;
          status?: RequestStatus;
          auto_verified?: boolean;
          admin_note?: string | null;
          reviewed_by?: string | null;
          reviewed_at?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      dealer_change_requests: {
        Row: {
          id: string;
          dealer_id: string;
          user_id: string;
          changes: Json;
          status: RequestStatus;
          admin_note: string | null;
          reviewed_by: string | null;
          reviewed_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          dealer_id: string;
          user_id: string;
          changes: Json;
          status?: RequestStatus;
          admin_note?: string | null;
          reviewed_by?: string | null;
          reviewed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          dealer_id?: string;
          user_id?: string;
          changes?: Json;
          status?: RequestStatus;
          admin_note?: string | null;
          reviewed_by?: string | null;
          reviewed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
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
        Relationships: [];
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
        Relationships: [];
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
        Relationships: [];
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
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: {
      is_admin: { Args: Record<string, never>; Returns: boolean };
      submit_dealer: { Args: { p: Json }; Returns: string };
      update_my_dealer: { Args: { p_dealer_id: string; p: Json }; Returns: "saved" | "pending_review" | "no_changes" };
      withdraw_my_change_request: { Args: { p_dealer_id: string }; Returns: undefined };
      claim_dealer: { Args: { p_dealer_id: string; p_message?: string | null }; Returns: "approved" | "pending" };
      admin_review_dealer: { Args: { p_dealer_id: string; p_approve: boolean; p_note?: string | null }; Returns: undefined };
      admin_review_claim: { Args: { p_claim_id: string; p_approve: boolean; p_note?: string | null }; Returns: undefined };
      admin_review_change: { Args: { p_request_id: string; p_approve: boolean; p_note?: string | null }; Returns: undefined };
      admin_user_emails: { Args: { p_ids: string[] }; Returns: { id: string; email: string }[] };
    };
    Enums: {
      dealer_status: DealerStatus;
      request_status: RequestStatus;
      stock_category: StockCategory;
    };
  };
}
