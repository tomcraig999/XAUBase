import type { Metadata } from "next";
import Link from "next/link";
import { Search, MapPin, Globe, Star, Filter } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { SPECIALIZATION_LABELS } from "@/lib/utils/constants";

export const metadata: Metadata = {
  title: "Gold Dealers Directory",
  description:
    "Browse the world's most comprehensive directory of gold dealers. Find trusted gold coin dealers, bullion dealers, and precious metals shops worldwide.",
};

// Comprehensive dealer data seeded in the page for now
const ALL_DEALERS = [
  // USA
  { name: "APMEX", slug: "apmex", country: "United States", countrySlug: "united-states", city: "Oklahoma City", specializations: ["bullion", "coins", "bars", "online"], online: true, rating: 4.8, reviews: 245 },
  { name: "JM Bullion", slug: "jm-bullion", country: "United States", countrySlug: "united-states", city: "Dallas", specializations: ["bullion", "bars", "coins", "online"], online: true, rating: 4.7, reviews: 198 },
  { name: "SD Bullion", slug: "sd-bullion", country: "United States", countrySlug: "united-states", city: "Ottawa Lake", specializations: ["bullion", "coins", "bars", "online"], online: true, rating: 4.6, reviews: 167 },
  { name: "Goldco", slug: "goldco", country: "United States", countrySlug: "united-states", city: "Los Angeles", specializations: ["ira", "bullion", "coins"], online: true, rating: 4.7, reviews: 312 },
  { name: "Money Metals Exchange", slug: "money-metals-exchange", country: "United States", countrySlug: "united-states", city: "Eagle", specializations: ["bullion", "coins", "online"], online: true, rating: 4.5, reviews: 134 },
  { name: "Kitco Metals", slug: "kitco-metals", country: "United States", countrySlug: "united-states", city: "Montreal", specializations: ["bullion", "coins", "storage", "online"], online: true, rating: 4.5, reviews: 203 },
  { name: "Augusta Precious Metals", slug: "augusta-precious-metals", country: "United States", countrySlug: "united-states", city: "Los Angeles", specializations: ["ira", "bullion"], online: true, rating: 4.8, reviews: 287 },
  { name: "Birch Gold Group", slug: "birch-gold-group", country: "United States", countrySlug: "united-states", city: "Burbank", specializations: ["ira", "bullion", "coins"], online: true, rating: 4.6, reviews: 156 },
  { name: "American Hartford Gold", slug: "american-hartford-gold", country: "United States", countrySlug: "united-states", city: "Los Angeles", specializations: ["ira", "bullion", "coins"], online: true, rating: 4.7, reviews: 189 },
  { name: "Bullion Trading LLC", slug: "bullion-trading-llc", country: "United States", countrySlug: "united-states", city: "New York", specializations: ["bullion", "coins", "bars"], online: true, rating: 4.4, reviews: 87 },
  // UK
  { name: "BullionByPost", slug: "bullionbypost", country: "United Kingdom", countrySlug: "united-kingdom", city: "Birmingham", specializations: ["bullion", "coins", "bars", "online"], online: true, rating: 4.7, reviews: 234 },
  { name: "BullionVault", slug: "bullionvault", country: "United Kingdom", countrySlug: "united-kingdom", city: "London", specializations: ["bullion", "storage", "online"], online: true, rating: 4.7, reviews: 189 },
  { name: "The Royal Mint", slug: "the-royal-mint", country: "United Kingdom", countrySlug: "united-kingdom", city: "Llantrisant", specializations: ["coins", "bars", "bullion", "online"], online: true, rating: 4.9, reviews: 456 },
  { name: "Baird & Co", slug: "baird-and-co", country: "United Kingdom", countrySlug: "united-kingdom", city: "London", specializations: ["bullion", "bars", "refining"], online: true, rating: 4.6, reviews: 78 },
  { name: "Sharps Pixley", slug: "sharps-pixley", country: "United Kingdom", countrySlug: "united-kingdom", city: "London", specializations: ["bullion", "bars", "coins", "storage"], online: true, rating: 4.5, reviews: 65 },
  { name: "Chards", slug: "chards", country: "United Kingdom", countrySlug: "united-kingdom", city: "Blackpool", specializations: ["coins", "bullion", "numismatics"], online: true, rating: 4.6, reviews: 112 },
  // Canada
  { name: "Kitco Metals", slug: "kitco-metals-canada", country: "Canada", countrySlug: "canada", city: "Montreal", specializations: ["bullion", "coins", "storage", "online"], online: true, rating: 4.5, reviews: 203 },
  { name: "Silver Gold Bull", slug: "silver-gold-bull", country: "Canada", countrySlug: "canada", city: "Calgary", specializations: ["bullion", "coins", "online"], online: true, rating: 4.6, reviews: 145 },
  { name: "Canadian PMX", slug: "canadian-pmx", country: "Canada", countrySlug: "canada", city: "Toronto", specializations: ["bullion", "coins"], online: true, rating: 4.4, reviews: 67 },
  { name: "TD Precious Metals", slug: "td-precious-metals", country: "Canada", countrySlug: "canada", city: "Toronto", specializations: ["bullion", "coins", "bars"], online: false, rating: 4.3, reviews: 45 },
  // Australia
  { name: "Perth Mint", slug: "perth-mint", country: "Australia", countrySlug: "australia", city: "Perth", specializations: ["bullion", "coins", "bars", "storage"], online: true, rating: 4.9, reviews: 312 },
  { name: "ABC Bullion", slug: "abc-bullion", country: "Australia", countrySlug: "australia", city: "Sydney", specializations: ["bullion", "bars", "refining"], online: true, rating: 4.7, reviews: 156 },
  { name: "Ainslie Bullion", slug: "ainslie-bullion", country: "Australia", countrySlug: "australia", city: "Brisbane", specializations: ["bullion", "coins", "bars", "online"], online: true, rating: 4.5, reviews: 89 },
  { name: "Guardian Gold", slug: "guardian-gold-au", country: "Australia", countrySlug: "australia", city: "Melbourne", specializations: ["bullion", "coins"], online: true, rating: 4.4, reviews: 56 },
  // Germany
  { name: "Degussa Goldhandel", slug: "degussa-goldhandel", country: "Germany", countrySlug: "germany", city: "Frankfurt", specializations: ["bullion", "coins", "bars", "refining"], online: true, rating: 4.6, reviews: 98 },
  { name: "Pro Aurum", slug: "pro-aurum", country: "Germany", countrySlug: "germany", city: "Munich", specializations: ["bullion", "coins", "bars"], online: true, rating: 4.7, reviews: 134 },
  { name: "Philoro", slug: "philoro-de", country: "Germany", countrySlug: "germany", city: "Frankfurt", specializations: ["bullion", "coins", "bars"], online: true, rating: 4.5, reviews: 76 },
  // Switzerland
  { name: "PAMP SA", slug: "pamp-sa", country: "Switzerland", countrySlug: "switzerland", city: "Castel San Pietro", specializations: ["bullion", "bars", "refining"], online: false, rating: 4.9, reviews: 201 },
  { name: "Valcambi", slug: "valcambi", country: "Switzerland", countrySlug: "switzerland", city: "Balerna", specializations: ["bullion", "bars", "refining"], online: false, rating: 4.8, reviews: 178 },
  { name: "GOLD AVENUE", slug: "gold-avenue", country: "Switzerland", countrySlug: "switzerland", city: "Geneva", specializations: ["bullion", "coins", "bars", "storage", "online"], online: true, rating: 4.7, reviews: 145 },
  { name: "Philoro Schweiz", slug: "philoro-ch", country: "Switzerland", countrySlug: "switzerland", city: "Zurich", specializations: ["bullion", "coins", "storage"], online: true, rating: 4.5, reviews: 67 },
  // UAE
  { name: "Dubai Gold Souk", slug: "dubai-gold-souk", country: "UAE", countrySlug: "uae", city: "Dubai", specializations: ["jewelry", "bullion", "coins"], online: false, rating: 4.6, reviews: 234 },
  { name: "Kaloti", slug: "kaloti", country: "UAE", countrySlug: "uae", city: "Dubai", specializations: ["bullion", "bars", "refining"], online: false, rating: 4.5, reviews: 67 },
  { name: "Emirates Gold", slug: "emirates-gold", country: "UAE", countrySlug: "uae", city: "Dubai", specializations: ["bullion", "bars", "refining"], online: true, rating: 4.4, reviews: 45 },
  // Singapore
  { name: "BullionStar", slug: "bullionstar", country: "Singapore", countrySlug: "singapore", city: "Singapore", specializations: ["bullion", "coins", "bars", "storage", "online"], online: true, rating: 4.8, reviews: 156 },
  { name: "GoldSilver Central", slug: "goldsilver-central", country: "Singapore", countrySlug: "singapore", city: "Singapore", specializations: ["bullion", "coins", "storage"], online: true, rating: 4.5, reviews: 67 },
  { name: "Silver Bullion", slug: "silver-bullion-sg", country: "Singapore", countrySlug: "singapore", city: "Singapore", specializations: ["bullion", "storage", "online"], online: true, rating: 4.6, reviews: 89 },
  // Hong Kong
  { name: "Chow Tai Fook", slug: "chow-tai-fook", country: "Hong Kong", countrySlug: "hong-kong", city: "Hong Kong", specializations: ["jewelry", "bullion", "coins"], online: true, rating: 4.7, reviews: 345 },
  { name: "Luk Fook", slug: "luk-fook", country: "Hong Kong", countrySlug: "hong-kong", city: "Hong Kong", specializations: ["jewelry", "bullion"], online: true, rating: 4.5, reviews: 198 },
  // India
  { name: "MMTC-PAMP", slug: "mmtc-pamp", country: "India", countrySlug: "india", city: "Multiple Cities", specializations: ["bullion", "coins", "bars"], online: true, rating: 4.6, reviews: 234 },
  { name: "Tanishq", slug: "tanishq", country: "India", countrySlug: "india", city: "Nationwide", specializations: ["jewelry", "coins"], online: true, rating: 4.7, reviews: 567 },
  { name: "Muthoot Gold Point", slug: "muthoot-gold-point", country: "India", countrySlug: "india", city: "Delhi", specializations: ["bullion", "coins"], online: true, rating: 4.4, reviews: 123 },
  // South Africa
  { name: "Rand Refinery", slug: "rand-refinery", country: "South Africa", countrySlug: "south-africa", city: "Johannesburg", specializations: ["bullion", "bars", "refining", "coins"], online: true, rating: 4.8, reviews: 167 },
  { name: "SA Bullion", slug: "sa-bullion", country: "South Africa", countrySlug: "south-africa", city: "Johannesburg", specializations: ["bullion", "coins"], online: true, rating: 4.5, reviews: 89 },
  { name: "The Scoin Shop", slug: "scoin-shop", country: "South Africa", countrySlug: "south-africa", city: "Johannesburg", specializations: ["coins", "numismatics", "bullion"], online: true, rating: 4.6, reviews: 112 },
];

export default function DealersPage({
  searchParams,
}: {
  searchParams: Promise<{ country?: string; q?: string; spec?: string }>;
}) {
  // For now, show all dealers (will connect to Supabase later)
  const dealers = ALL_DEALERS;

  const countries = [...new Set(dealers.map((d) => d.country))].sort();

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
              <option key={c} value={c}>
                {c}
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
        {countries.map((country) => {
          const countrySlug = dealers.find((d) => d.country === country)?.countrySlug;
          return (
            <Link
              key={country}
              href={`/dealers/${countrySlug}`}
              className="rounded-full border border-border px-3 py-1 text-xs text-dark-300 hover:border-gold-600 hover:text-gold-400"
            >
              {country}
            </Link>
          );
        })}
      </div>

      {/* Dealer Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {dealers.map((dealer) => (
          <Link
            key={dealer.slug}
            href={`/dealer/${dealer.slug}`}
            className="group rounded-lg border border-border bg-card p-5 transition-all hover:border-gold-600/50 hover:bg-card-hover"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-foreground group-hover:text-gold-400">
                  {dealer.name}
                </h3>
                <div className="mt-1 flex items-center gap-1 text-xs text-dark-400">
                  <MapPin className="h-3 w-3" />
                  {dealer.city}, {dealer.country}
                </div>
              </div>
              {dealer.online && (
                <Globe className="h-4 w-4 text-gold-500" />
              )}
            </div>

            <div className="mt-3 flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-gold-400 text-gold-400" />
              <span className="text-sm font-medium text-gold-400">
                {dealer.rating}
              </span>
              <span className="text-xs text-dark-400">
                ({dealer.reviews} reviews)
              </span>
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {dealer.specializations.slice(0, 4).map((spec) => (
                <Badge key={spec} variant="gold">
                  {SPECIALIZATION_LABELS[spec] || spec}
                </Badge>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
