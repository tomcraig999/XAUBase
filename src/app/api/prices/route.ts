import { NextResponse } from "next/server";
import { getDemoGoldPrice, fetchGoldPrice } from "@/lib/api/gold-price";
import { CURRENCIES } from "@/lib/utils/constants";

export const revalidate = 60;

export async function GET() {
  try {
    // Try fetching real price for USD
    const usdPrice = await fetchGoldPrice("USD");
    const current = usdPrice || getDemoGoldPrice("USD");

    // Get prices in other currencies
    const currencies: Record<string, number> = {};
    for (const curr of CURRENCIES) {
      if (curr.code === "USD") {
        currencies[curr.code] = current.price;
        continue;
      }
      const data = getDemoGoldPrice(curr.code);
      currencies[curr.code] = data.price;
    }

    // Generate demo history (30 days)
    const history = [];
    const basePrice = current.price;
    for (let i = 30; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const variation = (Math.sin(i * 0.5) * 50) + (Math.random() - 0.5) * 30;
      history.push({
        date: date.toISOString().split("T")[0],
        price: Math.round((basePrice - 100 + variation + (30 - i) * 3) * 100) / 100,
      });
    }

    return NextResponse.json({
      current: {
        price: current.price,
        change_24h: current.change_24h,
        change_pct: current.change_pct,
        price_gram_24k: current.price_gram_24k,
        price_gram_22k: current.price_gram_22k,
        open_price: current.open_price,
        high_price: current.high_price,
        low_price: current.low_price,
        timestamp: current.timestamp,
      },
      currencies,
      history,
    });
  } catch {
    // Return demo data on any error
    const demo = getDemoGoldPrice("USD");
    return NextResponse.json({
      current: demo,
      currencies: { USD: demo.price },
      history: [],
    });
  }
}
