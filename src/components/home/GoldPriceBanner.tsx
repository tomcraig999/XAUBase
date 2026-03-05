"use client";

import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { formatCurrency, formatPercent } from "@/lib/utils/format";

interface PriceData {
  price: number;
  change_24h: number;
  change_pct: number;
  price_gram_24k: number;
}

export default function GoldPriceBanner() {
  const [price, setPrice] = useState<PriceData | null>(null);

  useEffect(() => {
    async function fetchPrice() {
      try {
        const res = await fetch("/api/prices");
        if (res.ok) {
          const data = await res.json();
          setPrice(data.current);
        }
      } catch {
        // Use fallback
      }
    }
    fetchPrice();
    const interval = setInterval(fetchPrice, 60000);
    return () => clearInterval(interval);
  }, []);

  // Demo data fallback
  const data = price || {
    price: 2650.30,
    change_24h: 12.50,
    change_pct: 0.47,
    price_gram_24k: 85.22,
  };

  const isPositive = data.change_24h >= 0;

  return (
    <div className="border-b border-border bg-dark-900/50">
      <div className="mx-auto flex max-w-7xl items-center justify-between overflow-x-auto px-4 py-2 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-dark-400">XAU/USD</span>
            <span className="font-semibold text-gold-400">
              {formatCurrency(data.price)}
            </span>
            <span
              className={`flex items-center gap-0.5 ${
                isPositive ? "text-green-500" : "text-red-500"
              }`}
            >
              {isPositive ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {formatPercent(data.change_pct)}
            </span>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <span className="text-dark-400">Per Gram (24K)</span>
            <span className="text-dark-200">
              {formatCurrency(data.price_gram_24k)}
            </span>
          </div>
        </div>
        <a
          href="/prices"
          className="whitespace-nowrap text-xs text-gold-500 hover:text-gold-400"
        >
          Full Price Data →
        </a>
      </div>
    </div>
  );
}
