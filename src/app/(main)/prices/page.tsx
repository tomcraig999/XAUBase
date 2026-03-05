import type { Metadata } from "next";
import { TrendingUp, TrendingDown } from "lucide-react";
import { formatCurrency, formatPercent, formatNumber } from "@/lib/utils/format";
import { getDemoGoldPrice } from "@/lib/api/gold-price";
import { CURRENCIES } from "@/lib/utils/constants";
import PriceChartWrapper from "@/components/prices/PriceChartWrapper";

export const metadata: Metadata = {
  title: "Gold Prices - Live XAU/USD",
  description:
    "Track live gold prices in USD, EUR, GBP, and 10+ currencies. View gold price charts, per-gram prices, and historical data.",
};

export const revalidate = 60;

export default function PricesPage() {
  const usd = getDemoGoldPrice("USD");
  const isPositive = usd.change_24h >= 0;

  // Generate multi-currency data
  const currencyPrices = CURRENCIES.map((curr) => {
    const data = getDemoGoldPrice(curr.code);
    return {
      ...curr,
      price: data.price,
      change: data.change_24h,
      changePct: data.change_pct,
    };
  });

  // Generate demo history
  const history = [];
  for (let i = 90; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const variation = Math.sin(i * 0.3) * 80 + Math.random() * 40;
    history.push({
      date: date.toISOString().split("T")[0],
      price: Math.round((usd.price - 200 + variation + (90 - i) * 2) * 100) / 100,
    });
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold text-foreground">Gold Prices</h1>
      <p className="mt-2 text-dark-400">Live gold spot price and historical data</p>

      {/* Main Price Card */}
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-6 lg:col-span-1">
          <p className="text-sm text-dark-400">Gold Spot Price (XAU/USD)</p>
          <p className="mt-2 font-display text-4xl font-bold text-gold-400">
            {formatCurrency(usd.price)}
          </p>
          <div className={`mt-2 flex items-center gap-2 ${isPositive ? "text-green-500" : "text-red-500"}`}>
            {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
            <span className="font-medium">
              {isPositive ? "+" : ""}{formatCurrency(usd.change_24h)} ({formatPercent(usd.change_pct)})
            </span>
          </div>

          <div className="mt-6 space-y-3 border-t border-border pt-4">
            <div className="flex justify-between text-sm">
              <span className="text-dark-400">Open</span>
              <span className="text-foreground">{formatCurrency(usd.open_price)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-dark-400">High</span>
              <span className="text-foreground">{formatCurrency(usd.high_price)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-dark-400">Low</span>
              <span className="text-foreground">{formatCurrency(usd.low_price)}</span>
            </div>
          </div>

          <div className="mt-6 space-y-3 border-t border-border pt-4">
            <h3 className="text-sm font-semibold text-foreground">Price Per Gram</h3>
            <div className="flex justify-between text-sm">
              <span className="text-dark-400">24K Gold</span>
              <span className="text-foreground">{formatCurrency(usd.price_gram_24k)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-dark-400">22K Gold</span>
              <span className="text-foreground">{formatCurrency(usd.price_gram_22k)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-dark-400">18K Gold</span>
              <span className="text-foreground">{formatCurrency(usd.price_gram_24k * (18 / 24))}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-dark-400">14K Gold</span>
              <span className="text-foreground">{formatCurrency(usd.price_gram_24k * (14 / 24))}</span>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="rounded-lg border border-border bg-card p-6 lg:col-span-2">
          <PriceChartWrapper data={history} />
        </div>
      </div>

      {/* Multi-Currency Table */}
      <div className="mt-8 rounded-lg border border-border bg-card p-6">
        <h2 className="text-lg font-semibold text-foreground">Gold Price in Multiple Currencies</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="pb-3 text-dark-400 font-medium">Currency</th>
                <th className="pb-3 text-right text-dark-400 font-medium">Price/oz</th>
                <th className="pb-3 text-right text-dark-400 font-medium">Price/gram</th>
                <th className="pb-3 text-right text-dark-400 font-medium">24h Change</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {currencyPrices.map((curr) => (
                <tr key={curr.code} className="hover:bg-dark-800/50">
                  <td className="py-3">
                    <span className="font-medium text-foreground">{curr.code}</span>
                    <span className="ml-2 text-dark-400">{curr.name}</span>
                  </td>
                  <td className="py-3 text-right font-medium text-foreground">
                    {curr.symbol}{formatNumber(curr.price)}
                  </td>
                  <td className="py-3 text-right text-dark-300">
                    {curr.symbol}{formatNumber(curr.price / 31.1035)}
                  </td>
                  <td className={`py-3 text-right ${curr.changePct >= 0 ? "text-green-500" : "text-red-500"}`}>
                    {formatPercent(curr.changePct)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
