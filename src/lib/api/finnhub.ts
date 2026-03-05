export interface StockQuote {
  symbol: string;
  current: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  open: number;
  previousClose: number;
  timestamp: number;
}

const FINNHUB_BASE = "https://finnhub.io/api/v1";

async function finnhubFetch<T>(endpoint: string): Promise<T | null> {
  const apiKey = process.env.FINNHUB_API_KEY;
  if (!apiKey) return null;

  try {
    const res = await fetch(`${FINNHUB_BASE}${endpoint}&token=${apiKey}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function fetchStockQuote(symbol: string): Promise<StockQuote | null> {
  const data = await finnhubFetch<{
    c: number;
    d: number;
    dp: number;
    h: number;
    l: number;
    o: number;
    pc: number;
    t: number;
  }>(`/quote?symbol=${encodeURIComponent(symbol)}`);

  if (!data || data.c === 0) return null;

  return {
    symbol,
    current: data.c,
    change: data.d,
    changePercent: data.dp,
    high: data.h,
    low: data.l,
    open: data.o,
    previousClose: data.pc,
    timestamp: data.t,
  };
}

export async function fetchMultipleQuotes(
  symbols: string[]
): Promise<Map<string, StockQuote>> {
  const results = new Map<string, StockQuote>();

  // Fetch in batches with 50ms delay to respect rate limits (60/min)
  for (const symbol of symbols) {
    const quote = await fetchStockQuote(symbol);
    if (quote) {
      results.set(symbol, quote);
    }
    await new Promise((r) => setTimeout(r, 50));
  }

  return results;
}

// Demo data for when API key is not configured
export function getDemoStockQuote(symbol: string, name: string): StockQuote {
  const prices: Record<string, number> = {
    NEM: 45.82, GOLD: 19.34, AEM: 62.15, KGC: 7.45,
    GFI: 16.78, AU: 28.90, FNV: 142.50, WPM: 53.20,
    RGLD: 138.75, GDX: 35.40, GDXJ: 42.10, GLD: 245.80,
    IAU: 46.20, BTG: 4.15, AGI: 16.90, OR: 18.50,
  };
  const price = prices[symbol] || 25 + Math.random() * 50;
  const change = (Math.random() - 0.5) * 4;

  return {
    symbol,
    current: price,
    change,
    changePercent: (change / price) * 100,
    high: price + Math.abs(change),
    low: price - Math.abs(change),
    open: price - change / 2,
    previousClose: price - change,
    timestamp: Math.floor(Date.now() / 1000),
  };
}
