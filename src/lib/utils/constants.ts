export const SITE_NAME = "XAUBase";
export const SITE_DESCRIPTION =
  "The comprehensive directory for gold dealers, gold prices, gold stocks, gold news, and gold investing resources worldwide.";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://xaubase.com";

export const CURRENCIES = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "\u20AC" },
  { code: "GBP", name: "British Pound", symbol: "\u00A3" },
  { code: "CAD", name: "Canadian Dollar", symbol: "CA$" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "CHF", name: "Swiss Franc", symbol: "CHF" },
  { code: "JPY", name: "Japanese Yen", symbol: "\u00A5" },
  { code: "INR", name: "Indian Rupee", symbol: "\u20B9" },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$" },
  { code: "AED", name: "UAE Dirham", symbol: "AED" },
  { code: "ZAR", name: "South African Rand", symbol: "R" },
] as const;

export const SPECIALIZATIONS = [
  "bullion",
  "coins",
  "bars",
  "jewelry",
  "ira",
  "storage",
  "refining",
  "numismatics",
  "online",
] as const;

export const SPECIALIZATION_LABELS: Record<string, string> = {
  bullion: "Bullion",
  coins: "Coins",
  bars: "Bars",
  jewelry: "Jewelry",
  ira: "Gold IRA",
  storage: "Storage/Vaulting",
  refining: "Refining",
  numismatics: "Numismatics",
  online: "Online Sales",
};

export const STOCK_CATEGORIES = [
  { value: "senior_producer", label: "Senior Producers" },
  { value: "mid_cap_producer", label: "Mid-Cap Producers" },
  { value: "streaming_royalty", label: "Streaming & Royalty" },
  { value: "australian_listed", label: "Australian Listed" },
  { value: "etf", label: "ETFs" },
  { value: "junior_producer", label: "Junior Producers" },
  { value: "exploration", label: "Exploration" },
] as const;

export const REGIONS = [
  "North America",
  "Europe",
  "Asia-Pacific",
  "Middle East",
  "Africa",
  "South America",
] as const;

export const NAV_LINKS = [
  { href: "/dealers", label: "Gold Dealers" },
  { href: "/prices", label: "Gold Prices" },
  { href: "/stocks", label: "Gold Stocks" },
  { href: "/news", label: "Gold News" },
  { href: "/investing", label: "Investing" },
] as const;
