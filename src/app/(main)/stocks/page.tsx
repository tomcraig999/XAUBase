import type { Metadata } from "next";
import Link from "next/link";
import { TrendingUp, TrendingDown } from "lucide-react";
import { formatCurrency, formatPercent } from "@/lib/utils/format";
import { fetchStockQuote, getDemoStockQuote } from "@/lib/api/finnhub";
import { STOCK_CATEGORIES } from "@/lib/utils/constants";

export const metadata: Metadata = {
  title: "Gold Mining Stocks",
  description:
    "Track gold mining stocks, streaming companies, and gold ETFs. View prices, changes, and key data for all major gold stocks.",
};

export const revalidate = 300;

const INDICES_DATA = [
  { symbol: "^XAU", name: "Philadelphia Gold & Silver Index", exchange: "PHLX", description: "Tracks 30 gold and silver mining companies" },
  { symbol: "^HUI", name: "NYSE Arca Gold BUGS Index", exchange: "NYSE", description: "Tracks major gold producers that don't hedge beyond 1.5 years" },
];

const STOCKS_DATA = [
  // Senior Producers
  { symbol: "NEM", name: "Newmont Corporation", exchange: "NYSE", category: "senior_producer", production: "6,000 koz" },
  { symbol: "GOLD", name: "Barrick Gold", exchange: "NYSE", category: "senior_producer", production: "4,000 koz" },
  { symbol: "AEM", name: "Agnico Eagle Mines", exchange: "NYSE", category: "senior_producer", production: "3,500 koz" },
  { symbol: "KGC", name: "Kinross Gold", exchange: "NYSE", category: "senior_producer", production: "2,000 koz" },
  { symbol: "GFI", name: "Gold Fields", exchange: "NYSE", category: "senior_producer", production: "2,300 koz" },
  { symbol: "AU", name: "AngloGold Ashanti", exchange: "NYSE", category: "senior_producer", production: "3,000 koz" },
  { symbol: "HMY", name: "Harmony Gold", exchange: "NYSE", category: "senior_producer", production: "1,400 koz" },
  // Mid-Cap
  { symbol: "BTG", name: "B2Gold Corp", exchange: "NYSE", category: "mid_cap_producer", production: "1,000 koz" },
  { symbol: "AGI", name: "Alamos Gold", exchange: "NYSE", category: "mid_cap_producer", production: "500 koz" },
  { symbol: "EGO", name: "Eldorado Gold", exchange: "NYSE", category: "mid_cap_producer", production: "450 koz" },
  { symbol: "CDE", name: "Coeur Mining", exchange: "NYSE", category: "mid_cap_producer", production: "350 koz" },
  { symbol: "IAG", name: "IAMGOLD", exchange: "NYSE", category: "mid_cap_producer", production: "600 koz" },
  { symbol: "EQX", name: "Equinox Gold", exchange: "NYSE", category: "mid_cap_producer", production: "600 koz" },
  { symbol: "BVN", name: "Buenaventura Mining", exchange: "NYSE", category: "mid_cap_producer", production: "300 koz" },
  // Streaming & Royalty
  { symbol: "FNV", name: "Franco-Nevada", exchange: "NYSE", category: "streaming_royalty", production: "N/A" },
  { symbol: "WPM", name: "Wheaton Precious Metals", exchange: "NYSE", category: "streaming_royalty", production: "N/A" },
  { symbol: "RGLD", name: "Royal Gold", exchange: "NASDAQ", category: "streaming_royalty", production: "N/A" },
  { symbol: "OR", name: "Osisko Gold Royalties", exchange: "NYSE", category: "streaming_royalty", production: "N/A" },
  { symbol: "SAND", name: "Sandstorm Gold", exchange: "NYSE", category: "streaming_royalty", production: "N/A" },
  // ETFs
  { symbol: "GLD", name: "SPDR Gold Shares", exchange: "NYSE", category: "etf", production: "N/A" },
  { symbol: "IAU", name: "iShares Gold Trust", exchange: "NYSE", category: "etf", production: "N/A" },
  { symbol: "GDX", name: "VanEck Gold Miners ETF", exchange: "NYSE", category: "etf", production: "N/A" },
  { symbol: "GDXJ", name: "VanEck Jr Gold Miners", exchange: "NYSE", category: "etf", production: "N/A" },
  { symbol: "SGOL", name: "Aberdeen Physical Gold", exchange: "NYSE", category: "etf", production: "N/A" },
];

async function getIndexQuotes() {
  const hasFinnhub = !!process.env.FINNHUB_API_KEY;
  const result = [];

  for (let i = 0; i < INDICES_DATA.length; i++) {
    const index = INDICES_DATA[i];
    let quote = null;

    if (hasFinnhub) {
      quote = await fetchStockQuote(index.symbol);
      if (i < INDICES_DATA.length - 1) {
        await new Promise((r) => setTimeout(r, 100));
      }
    }

    result.push({
      ...index,
      quote: quote || getDemoStockQuote(index.symbol, index.name),
    });
  }

  return result;
}

async function getStockQuotes() {
  const hasFinnhub = !!process.env.FINNHUB_API_KEY;
  const result = [];

  for (let i = 0; i < STOCKS_DATA.length; i++) {
    const stock = STOCKS_DATA[i];
    let quote = null;

    if (hasFinnhub) {
      quote = await fetchStockQuote(stock.symbol);
      // Rate limit: 60 calls/min on Finnhub free tier
      if (i < STOCKS_DATA.length - 1) {
        await new Promise((r) => setTimeout(r, 100));
      }
    }

    result.push({
      ...stock,
      quote: quote || getDemoStockQuote(stock.symbol, stock.name),
    });
  }

  return result;
}

export default async function StocksPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const [indices, stocks] = await Promise.all([getIndexQuotes(), getStockQuotes()]);

  // Group by category
  const grouped = STOCK_CATEGORIES.map((cat) => ({
    ...cat,
    stocks: stocks.filter((s) => s.category === cat.value),
  })).filter((g) => g.stocks.length > 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold text-foreground">Gold Mining Stocks</h1>
      <p className="mt-2 text-dark-400">
        Track gold mining companies, streaming/royalty companies, and gold ETFs
      </p>

      {/* Gold Indices */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gold-400">Gold Indices</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {indices.map((index) => {
            const positive = index.quote.change >= 0;
            return (
              <div
                key={index.symbol}
                className="rounded-lg border border-border bg-card p-5"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="rounded bg-dark-700 px-2 py-0.5 text-xs font-mono text-gold-400">
                      {index.symbol.replace("^", "")}
                    </span>
                    <span className="ml-2 text-xs text-dark-400">{index.exchange}</span>
                    <h3 className="mt-2 font-semibold text-foreground">{index.name}</h3>
                    <p className="mt-1 text-xs text-dark-400">{index.description}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-end justify-between">
                  <span className="text-2xl font-bold text-foreground">
                    {formatCurrency(index.quote.current).replace("$", "")}
                  </span>
                  <div className={`flex items-center gap-2 ${positive ? "text-green-500" : "text-red-500"}`}>
                    {positive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    <span className="font-medium">
                      {positive ? "+" : ""}{formatCurrency(index.quote.change).replace("$", "")}
                    </span>
                    <span className="text-sm">
                      ({formatPercent(index.quote.changePercent)})
                    </span>
                  </div>
                </div>
                <div className="mt-3 flex gap-4 text-xs text-dark-400">
                  <span>High: {formatCurrency(index.quote.high).replace("$", "")}</span>
                  <span>Low: {formatCurrency(index.quote.low).replace("$", "")}</span>
                  <span>Open: {formatCurrency(index.quote.open).replace("$", "")}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {grouped.map((group) => (
        <div key={group.value} className="mt-8">
          <h2 className="text-xl font-semibold text-gold-400">{group.label}</h2>
          <div className="mt-4 overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-dark-800">
                  <th className="px-4 py-3 text-left font-medium text-dark-400">Company</th>
                  <th className="px-4 py-3 text-left font-medium text-dark-400">Ticker</th>
                  <th className="px-4 py-3 text-right font-medium text-dark-400">Price</th>
                  <th className="px-4 py-3 text-right font-medium text-dark-400">Change</th>
                  <th className="px-4 py-3 text-right font-medium text-dark-400">% Change</th>
                  <th className="hidden px-4 py-3 text-right font-medium text-dark-400 sm:table-cell">High</th>
                  <th className="hidden px-4 py-3 text-right font-medium text-dark-400 sm:table-cell">Low</th>
                  {group.value !== "etf" && group.value !== "streaming_royalty" && (
                    <th className="hidden px-4 py-3 text-right font-medium text-dark-400 md:table-cell">Production</th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {group.stocks.map((stock) => {
                  const positive = stock.quote.change >= 0;
                  return (
                    <tr key={stock.symbol} className="hover:bg-dark-800/50">
                      <td className="px-4 py-3 font-medium text-foreground">{stock.name}</td>
                      <td className="px-4 py-3">
                        <span className="rounded bg-dark-700 px-2 py-0.5 text-xs font-mono text-gold-400">
                          {stock.symbol}
                        </span>
                        <span className="ml-1 text-xs text-dark-400">{stock.exchange}</span>
                      </td>
                      <td className="px-4 py-3 text-right font-medium text-foreground">
                        {formatCurrency(stock.quote.current)}
                      </td>
                      <td className={`px-4 py-3 text-right ${positive ? "text-green-500" : "text-red-500"}`}>
                        <span className="flex items-center justify-end gap-1">
                          {positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                          {positive ? "+" : ""}{formatCurrency(stock.quote.change).replace("$", "")}
                        </span>
                      </td>
                      <td className={`px-4 py-3 text-right ${positive ? "text-green-500" : "text-red-500"}`}>
                        {formatPercent(stock.quote.changePercent)}
                      </td>
                      <td className="hidden px-4 py-3 text-right text-dark-300 sm:table-cell">
                        {formatCurrency(stock.quote.high)}
                      </td>
                      <td className="hidden px-4 py-3 text-right text-dark-300 sm:table-cell">
                        {formatCurrency(stock.quote.low)}
                      </td>
                      {group.value !== "etf" && group.value !== "streaming_royalty" && (
                        <td className="hidden px-4 py-3 text-right text-dark-400 md:table-cell">
                          {stock.production}
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      <p className="mt-8 text-center text-xs text-dark-400">
        Stock prices may be delayed. Data provided for informational purposes only. Not financial advice.
      </p>
    </div>
  );
}
