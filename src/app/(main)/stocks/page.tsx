import type { Metadata } from "next";
import Link from "next/link";
import { TrendingUp, TrendingDown } from "lucide-react";
import { formatCurrency, formatPercent } from "@/lib/utils/format";
import { getDemoStockQuote } from "@/lib/api/finnhub";
import { STOCK_CATEGORIES } from "@/lib/utils/constants";

export const metadata: Metadata = {
  title: "Gold Mining Stocks",
  description:
    "Track gold mining stocks, streaming companies, and gold ETFs. View prices, changes, and key data for all major gold stocks.",
};

export const revalidate = 300;

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

export default function StocksPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const stocks = STOCKS_DATA.map((stock) => ({
    ...stock,
    quote: getDemoStockQuote(stock.symbol, stock.name),
  }));

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
