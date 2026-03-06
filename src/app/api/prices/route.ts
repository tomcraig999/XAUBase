import { NextResponse } from "next/server";
import { getDemoGoldPrice, fetchGoldPrice, fetchFxRates, convertGoldPrice } from "@/lib/api/gold-price";
import { CURRENCIES } from "@/lib/utils/constants";

export const revalidate = 60;

export async function GET() {
  try {
    // Fetch real gold price in USD and FX rates in parallel
    const [usdPrice, fxRates] = await Promise.all([
      fetchGoldPrice(),
      fetchFxRates(),
    ]);

    const current = usdPrice || getDemoGoldPrice("USD");
    const isLive = !!usdPrice;

    // Convert gold price to all currencies using FX rates
    const currencies: Record<string, number> = {};
    for (const curr of CURRENCIES) {
      if (isLive) {
        currencies[curr.code] = convertGoldPrice(current, curr.code, fxRates);
      } else {
        currencies[curr.code] = getDemoGoldPrice(curr.code).price;
      }
    }

    // Generate price history (30 days) based on current real price
    const history = [];
    const basePrice = current.price;
    for (let i = 30; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      // Simulate realistic price movement from current price
      const trend = (30 - i) * (current.change_24h > 0 ? 1.5 : -1.5);
      const noise = (Math.sin(i * 0.7) * 30) + (Math.sin(i * 1.3) * 15);
      history.push({
        date: date.toISOString().split("T")[0],
        price: Math.round((basePrice - 80 + trend + noise) * 100) / 100,
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
      live: isLive,
    });
  } catch {
    // Return demo data on any error
    const demo = getDemoGoldPrice("USD");
    return NextResponse.json({
      current: demo,
      currencies: { USD: demo.price },
      history: [],
      live: false,
    });
  }
}
