import Link from "next/link";
import { Search, TrendingUp, Building2, Newspaper } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-dark-900 to-background">
      {/* Subtle gold gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold-900/10 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            The World&apos;s Gold{" "}
            <span className="text-gold-400">Directory</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-dark-300">
            Find gold dealers worldwide, track live gold prices, monitor gold
            mining stocks, and stay updated with the latest gold market news.
          </p>

          {/* Search bar */}
          <div className="mx-auto mt-8 max-w-xl">
            <Link
              href="/dealers"
              className="flex items-center gap-3 rounded-lg border border-border bg-dark-800 px-4 py-3 text-dark-400 transition-colors hover:border-gold-600"
            >
              <Search className="h-5 w-5" />
              <span>Search gold dealers by name, city, or country...</span>
            </Link>
          </div>

          {/* Quick stats */}
          <div className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
            <Link
              href="/dealers"
              className="rounded-lg border border-border bg-card p-4 transition-colors hover:border-gold-600"
            >
              <Building2 className="mx-auto h-6 w-6 text-gold-500" />
              <p className="mt-2 text-2xl font-bold text-foreground">100+</p>
              <p className="text-xs text-dark-400">Gold Dealers</p>
            </Link>
            <Link
              href="/dealers"
              className="rounded-lg border border-border bg-card p-4 transition-colors hover:border-gold-600"
            >
              <svg
                className="mx-auto h-6 w-6 text-gold-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              <p className="mt-2 text-2xl font-bold text-foreground">11</p>
              <p className="text-xs text-dark-400">Countries</p>
            </Link>
            <Link
              href="/stocks"
              className="rounded-lg border border-border bg-card p-4 transition-colors hover:border-gold-600"
            >
              <TrendingUp className="mx-auto h-6 w-6 text-gold-500" />
              <p className="mt-2 text-2xl font-bold text-foreground">50+</p>
              <p className="text-xs text-dark-400">Gold Stocks</p>
            </Link>
            <Link
              href="/news"
              className="rounded-lg border border-border bg-card p-4 transition-colors hover:border-gold-600"
            >
              <Newspaper className="mx-auto h-6 w-6 text-gold-500" />
              <p className="mt-2 text-2xl font-bold text-foreground">24/7</p>
              <p className="text-xs text-dark-400">Gold News</p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
