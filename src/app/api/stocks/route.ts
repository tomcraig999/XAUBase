import { NextRequest, NextResponse } from "next/server";
import { getDemoStockQuote } from "@/lib/api/finnhub";

export const revalidate = 300;

// Full list of gold stocks with demo data
const GOLD_STOCKS = [
  // Senior Producers
  { symbol: "NEM", name: "Newmont Corporation", exchange: "NYSE", category: "senior_producer", production: 6000 },
  { symbol: "GOLD", name: "Barrick Gold", exchange: "NYSE", category: "senior_producer", production: 4000 },
  { symbol: "AEM", name: "Agnico Eagle Mines", exchange: "NYSE", category: "senior_producer", production: 3500 },
  { symbol: "KGC", name: "Kinross Gold", exchange: "NYSE", category: "senior_producer", production: 2000 },
  { symbol: "GFI", name: "Gold Fields", exchange: "NYSE", category: "senior_producer", production: 2300 },
  { symbol: "AU", name: "AngloGold Ashanti", exchange: "NYSE", category: "senior_producer", production: 3000 },
  { symbol: "HMY", name: "Harmony Gold", exchange: "NYSE", category: "senior_producer", production: 1400 },
  // Mid-Cap Producers
  { symbol: "BTG", name: "B2Gold Corp", exchange: "NYSE", category: "mid_cap_producer", production: 1000 },
  { symbol: "AGI", name: "Alamos Gold", exchange: "NYSE", category: "mid_cap_producer", production: 500 },
  { symbol: "EGO", name: "Eldorado Gold", exchange: "NYSE", category: "mid_cap_producer", production: 450 },
  { symbol: "CDE", name: "Coeur Mining", exchange: "NYSE", category: "mid_cap_producer", production: 350 },
  { symbol: "IAG", name: "IAMGOLD", exchange: "NYSE", category: "mid_cap_producer", production: 600 },
  { symbol: "EQX", name: "Equinox Gold", exchange: "NYSE", category: "mid_cap_producer", production: 600 },
  { symbol: "BVN", name: "Buenaventura Mining", exchange: "NYSE", category: "mid_cap_producer", production: 300 },
  { symbol: "SSRM", name: "SSR Mining", exchange: "NASDAQ", category: "mid_cap_producer", production: 400 },
  // Streaming & Royalty
  { symbol: "FNV", name: "Franco-Nevada", exchange: "NYSE", category: "streaming_royalty", production: 0 },
  { symbol: "WPM", name: "Wheaton Precious Metals", exchange: "NYSE", category: "streaming_royalty", production: 0 },
  { symbol: "RGLD", name: "Royal Gold", exchange: "NASDAQ", category: "streaming_royalty", production: 0 },
  { symbol: "OR", name: "Osisko Gold Royalties", exchange: "NYSE", category: "streaming_royalty", production: 0 },
  { symbol: "SAND", name: "Sandstorm Gold", exchange: "NYSE", category: "streaming_royalty", production: 0 },
  // ETFs
  { symbol: "GLD", name: "SPDR Gold Shares", exchange: "NYSE", category: "etf", production: 0 },
  { symbol: "IAU", name: "iShares Gold Trust", exchange: "NYSE", category: "etf", production: 0 },
  { symbol: "GDX", name: "VanEck Gold Miners ETF", exchange: "NYSE", category: "etf", production: 0 },
  { symbol: "GDXJ", name: "VanEck Junior Gold Miners ETF", exchange: "NYSE", category: "etf", production: 0 },
  { symbol: "SGOL", name: "Aberdeen Physical Gold", exchange: "NYSE", category: "etf", production: 0 },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  let stocks = GOLD_STOCKS;
  if (category) {
    stocks = stocks.filter((s) => s.category === category);
  }

  const result = stocks.map((stock) => {
    const quote = getDemoStockQuote(stock.symbol, stock.name);
    return {
      ...stock,
      price: quote.current,
      change: quote.change,
      changePercent: quote.changePercent,
      high: quote.high,
      low: quote.low,
    };
  });

  return NextResponse.json({ stocks: result });
}
