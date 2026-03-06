export interface GoldPriceData {
  price: number;
  currency: string;
  change_24h: number;
  change_pct: number;
  price_gram_24k: number;
  price_gram_22k: number;
  open_price: number;
  high_price: number;
  low_price: number;
  timestamp: string;
}

// Primary: gold-api.com (free, no key required, returns USD price)
async function fetchFromGoldApiCom(): Promise<GoldPriceData | null> {
  try {
    const res = await fetch(
      "https://api.gold-api.com/price/XAU",
      { next: { revalidate: 300 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const price = data.price || 0;
    if (price === 0) return null;
    return {
      price,
      currency: "USD",
      change_24h: 0,
      change_pct: 0,
      price_gram_24k: price / 31.1035,
      price_gram_22k: (price / 31.1035) * (22 / 24),
      open_price: price,
      high_price: price,
      low_price: price,
      timestamp: data.updatedAt || new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

// Secondary: goldapi.io (requires API key, 100 req/month free)
async function fetchFromGoldApiIo(): Promise<GoldPriceData | null> {
  const apiKey = process.env.GOLDAPI_IO_API_KEY;
  if (!apiKey) return null;

  try {
    const res = await fetch(
      "https://www.goldapi.io/api/XAU/USD",
      {
        headers: { "x-access-token": apiKey },
        next: { revalidate: 300 },
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return {
      price: data.price,
      currency: "USD",
      change_24h: data.ch || 0,
      change_pct: data.chp || 0,
      price_gram_24k: data.price_gram_24k || data.price / 31.1035,
      price_gram_22k: data.price_gram_22k || (data.price / 31.1035) * (22 / 24),
      open_price: data.open_price || data.price,
      high_price: data.high_price || data.price,
      low_price: data.low_price || data.price,
      timestamp: new Date(data.timestamp * 1000).toISOString(),
    };
  } catch {
    return null;
  }
}

// Fetch gold price in USD from available APIs
export async function fetchGoldPrice(): Promise<GoldPriceData | null> {
  // Try free API first (no key required), then paid fallback
  const goldApiCom = await fetchFromGoldApiCom();
  if (goldApiCom) return goldApiCom;

  const goldApiIo = await fetchFromGoldApiIo();
  if (goldApiIo) return goldApiIo;

  return null;
}

// Fetch FX rates from free API for multi-currency conversion
export async function fetchFxRates(): Promise<Record<string, number> | null> {
  try {
    const res = await fetch(
      "https://open.er-api.com/v6/latest/USD",
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    if (data.result !== "success") return null;
    return data.rates as Record<string, number>;
  } catch {
    return null;
  }
}

// Fallback FX rates if API is unavailable
const FALLBACK_FX_RATES: Record<string, number> = {
  USD: 1, EUR: 0.917, GBP: 0.789, CAD: 1.36, AUD: 1.53,
  CHF: 0.877, JPY: 149.5, INR: 83.1, SGD: 1.34, AED: 3.67, ZAR: 18.5,
};

// Convert USD gold price to another currency
export function convertGoldPrice(
  usdPrice: GoldPriceData,
  currency: string,
  fxRates: Record<string, number> | null
): number {
  if (currency === "USD") return usdPrice.price;
  const rate = fxRates?.[currency] || FALLBACK_FX_RATES[currency] || 1;
  return Math.round(usdPrice.price * rate * 100) / 100;
}

// Generate demo data when APIs are not configured
export function getDemoGoldPrice(currency = "USD"): GoldPriceData {
  const basePrice = 2650.30;
  const rate = FALLBACK_FX_RATES[currency] || 1;
  const price = basePrice * rate;

  return {
    price,
    currency,
    change_24h: 12.50 * rate,
    change_pct: 0.47,
    price_gram_24k: price / 31.1035,
    price_gram_22k: (price / 31.1035) * (22 / 24),
    open_price: (basePrice - 5) * rate,
    high_price: (basePrice + 15) * rate,
    low_price: (basePrice - 20) * rate,
    timestamp: new Date().toISOString(),
  };
}
