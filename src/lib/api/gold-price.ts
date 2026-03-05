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

// Primary: gold-api.com (free, no auth, no rate limits)
async function fetchFromGoldApi(currency: string): Promise<GoldPriceData | null> {
  try {
    const res = await fetch(
      `https://www.goldapi.io/api/XAU/${currency}`,
      {
        headers: {
          "x-access-token": process.env.GOLDAPI_IO_API_KEY || "",
        },
        next: { revalidate: 300 },
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return {
      price: data.price,
      currency: data.currency,
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

// Fallback: fetch from a free metals API
async function fetchFromMetalsApi(currency: string): Promise<GoldPriceData | null> {
  try {
    const res = await fetch(
      `https://api.gold-api.com/price/XAU${currency}`,
      { next: { revalidate: 300 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const price = data.price || 0;
    return {
      price,
      currency,
      change_24h: data.ch || 0,
      change_pct: data.chp || 0,
      price_gram_24k: price / 31.1035,
      price_gram_22k: (price / 31.1035) * (22 / 24),
      open_price: data.open || price,
      high_price: data.high || price,
      low_price: data.low || price,
      timestamp: new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

export async function fetchGoldPrice(currency = "USD"): Promise<GoldPriceData | null> {
  // Try primary API first
  const data = await fetchFromGoldApi(currency);
  if (data) return data;

  // Fallback
  return fetchFromMetalsApi(currency);
}

// Generate demo data when APIs are not configured
export function getDemoGoldPrice(currency = "USD"): GoldPriceData {
  const basePrice = 2650.30;
  const rates: Record<string, number> = {
    USD: 1, EUR: 0.917, GBP: 0.789, CAD: 1.36, AUD: 1.53,
    CHF: 0.877, JPY: 149.5, INR: 83.1, SGD: 1.34, AED: 3.67, ZAR: 18.5,
  };
  const rate = rates[currency] || 1;
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
