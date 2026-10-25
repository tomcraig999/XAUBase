import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Search } from "lucide-react";
import { SPECIALIZATION_LABELS } from "@/lib/utils/constants";
import {
  getAllDealers,
  getCountriesWithCounts,
  getSearchableCities,
} from "@/lib/supabase/queries";
import DealerCard from "@/components/dealers/DealerCard";

interface Props {
  searchParams: Promise<{ q?: string; country?: string; type?: string }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q, country, type } = await searchParams;
  const isSearch = Boolean(q?.trim() || country || type);
  return {
    title: "Gold Dealers Directory",
    description:
      "Browse the world's most comprehensive directory of gold dealers. Find trusted gold coin dealers, bullion dealers, and precious metals shops worldwide.",
    // Search result pages are thin duplicates of the directory; keep them out of Google
    ...(isSearch && { robots: { index: false, follow: true } }),
  };
}

export const revalidate = 3600;

// Lower-case and strip accents, so "zurich" matches "Zürich" and "sao paulo" matches "São Paulo"
function normalise(text: string | null | undefined): string {
  return (text ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export default async function DealersPage({ searchParams }: Props) {
  const params = await searchParams;
  const query = (params.q ?? "").trim().slice(0, 100);
  const countryFilter = params.country ?? "";
  const typeFilter = params.type ?? "";
  const isSearch = Boolean(query || countryFilter || typeFilter);

  const [allDealers, countries, cities] = await Promise.all([
    getAllDealers(),
    getCountriesWithCounts(),
    query ? getSearchableCities() : Promise.resolve([]),
  ]);

  // Every word of the query must appear in the dealer's name, city, region or country
  const terms = normalise(query).split(/\s+/).filter(Boolean);
  const dealers = allDealers.filter((d) => {
    if (countryFilter && d.country?.slug !== countryFilter) return false;
    if (typeFilter && !d.specializations.includes(typeFilter)) return false;
    if (terms.length === 0) return true;
    const haystack = normalise(
      [d.name, d.city?.name, d.city?.state_province, d.country?.name].join(" ")
    );
    return terms.every((t) => haystack.includes(t));
  });

  // City pages whose name matches, including cities served only by nearby or online dealers
  const matchingCities = terms.length
    ? cities
        .filter((c) => {
          if (countryFilter && c.countrySlug !== countryFilter) return false;
          const haystack = normalise([c.name, c.state_province, c.countryName].join(" "));
          return terms.every((t) => haystack.includes(t)) && terms.some((t) => normalise(c.name).includes(t));
        })
        .slice(0, 12)
    : [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">
          Gold Dealer Directory
        </h1>
        <p className="mt-2 text-dark-400">
          Browse {allDealers.length}+ trusted gold dealers worldwide
        </p>
      </div>

      {/* Search and Filters: a plain GET form, so it works without JavaScript */}
      <form action="/dealers" method="get" role="search" className="mb-6 flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-dark-400" />
          <input
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Search by dealer name, city, or country..."
            aria-label="Search gold dealers"
            className="w-full rounded-md border border-border bg-dark-800 py-2 pl-10 pr-4 text-sm text-foreground placeholder:text-dark-400 focus:border-gold-500 focus:outline-none"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <select
            name="country"
            defaultValue={countryFilter}
            aria-label="Filter by country"
            className="rounded-md border border-border bg-dark-800 px-3 py-2 text-sm text-foreground focus:border-gold-500 focus:outline-none"
          >
            <option value="">All Countries</option>
            {countries.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name} ({c.dealer_count})
              </option>
            ))}
          </select>
          <select
            name="type"
            defaultValue={typeFilter}
            aria-label="Filter by type"
            className="rounded-md border border-border bg-dark-800 px-3 py-2 text-sm text-foreground focus:border-gold-500 focus:outline-none"
          >
            <option value="">All Types</option>
            {Object.entries(SPECIALIZATION_LABELS).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="rounded-md bg-gold-500 px-4 py-2 text-sm font-semibold text-dark-900 transition-colors hover:bg-gold-400"
          >
            Search
          </button>
        </div>
      </form>

      {/* Search summary */}
      {isSearch && (
        <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-dark-300">
          <span>
            {dealers.length} dealer{dealers.length !== 1 ? "s" : ""}
            {query ? <> matching &ldquo;{query}&rdquo;</> : " found"}
          </span>
          <Link href="/dealers" className="text-gold-500 hover:text-gold-400">
            Clear search
          </Link>
        </div>
      )}

      {/* Matching city pages */}
      {matchingCities.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-dark-300">City pages</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {matchingCities.map((c) => (
              <Link
                key={`${c.countrySlug}/${c.slug}`}
                href={`/dealers/${c.countrySlug}/${c.slug}`}
                className="inline-flex items-center gap-1 rounded-full border border-gold-600/60 px-3 py-1.5 text-sm text-gold-400 transition-colors hover:border-gold-500 hover:bg-gold-900/30"
              >
                <MapPin className="h-3.5 w-3.5" />
                Gold dealers in {c.name}
                {c.state_province && c.state_province !== c.name ? `, ${c.state_province}` : ""}
                {`, ${c.countryName}`}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* No results */}
      {isSearch && dealers.length === 0 && (
        <div className="mb-8 rounded-lg border border-border bg-card p-6 text-center">
          <p className="font-semibold text-foreground">No dealers match your search.</p>
          <p className="mt-1 text-sm text-dark-400">
            {matchingCities.length > 0
              ? "See the city page above for the nearest dealers and online dealers that deliver there."
              : "Try a different spelling, a nearby city, or browse by country below."}
          </p>
        </div>
      )}

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
