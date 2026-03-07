import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";
import { SPECIALIZATION_LABELS } from "@/lib/utils/constants";
import { getAllDealers, getCountriesWithCounts } from "@/lib/supabase/queries";
import DealerCard from "@/components/dealers/DealerCard";

export const metadata: Metadata = {
  title: "Gold Dealers Directory",
  description:
    "Browse the world's most comprehensive directory of gold dealers. Find trusted gold coin dealers, bullion dealers, and precious metals shops worldwide.",
};

export const revalidate = 3600;

export default async function DealersPage() {
  const [dealers, countries] = await Promise.all([
    getAllDealers(),
    getCountriesWithCounts(),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">
          Gold Dealer Directory
        </h1>
        <p className="mt-2 text-dark-400">
          Browse {dealers.length}+ trusted gold dealers worldwide
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-dark-400" />
          <input
            type="text"
            placeholder="Search dealers by name..."
            className="w-full rounded-md border border-border bg-dark-800 py-2 pl-10 pr-4 text-sm text-foreground placeholder:text-dark-400 focus:border-gold-500 focus:outline-none"
          />
        </div>
        <div className="flex gap-2">
          <select className="rounded-md border border-border bg-dark-800 px-3 py-2 text-sm text-foreground focus:border-gold-500 focus:outline-none">
            <option value="">All Countries</option>
            {countries.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name} ({c.dealer_count})
              </option>
            ))}
          </select>
          <select className="rounded-md border border-border bg-dark-800 px-3 py-2 text-sm text-foreground focus:border-gold-500 focus:outline-none">
            <option value="">All Types</option>
            {Object.entries(SPECIALIZATION_LABELS).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Country quick links */}
      <div className="mb-6 flex flex-wrap gap-2">
        <Link
          href="/dealers"
          className="rounded-full border border-gold-600 bg-gold-900/30 px-3 py-1 text-xs font-medium text-gold-400"
        >
          All
        </Link>
        {countries.map((c) => (
          <Link
            key={c.slug}
            href={`/dealers/${c.slug}`}
            className="rounded-full border border-border px-3 py-1 text-xs text-dark-300 hover:border-gold-600 hover:text-gold-400"
          >
            {c.name}
          </Link>
        ))}
      </div>

      {/* Dealer Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {dealers.map((dealer) => (
          <DealerCard
            key={dealer.slug}
            name={dealer.name}
            slug={dealer.slug}
            cityName={dealer.city?.name}
            stateProv={dealer.city?.state_province}
            countryName={dealer.country?.name}
            specializations={dealer.specializations}
            onlineSales={dealer.online_sales}
            ratingAvg={dealer.rating_avg}
            reviewCount={dealer.review_count}
          />
        ))}
      </div>
    </div>
  );
}
