import Link from "next/link";
import { Globe, MapPin, Star } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { SPECIALIZATION_LABELS } from "@/lib/utils/constants";

interface Dealer {
  name: string;
  slug: string;
  country_name: string;
  city_name: string | null;
  specializations: string[];
  online_sales: boolean;
  rating_avg: number;
  review_count: number;
  website: string | null;
}

// Demo dealers for initial display
const DEMO_DEALERS: Dealer[] = [
  {
    name: "APMEX",
    slug: "apmex",
    country_name: "United States",
    city_name: "Oklahoma City",
    specializations: ["bullion", "coins", "bars", "online"],
    online_sales: true,
    rating_avg: 4.8,
    review_count: 245,
    website: "https://apmex.com",
  },
  {
    name: "BullionVault",
    slug: "bullionvault",
    country_name: "United Kingdom",
    city_name: "London",
    specializations: ["bullion", "storage", "online"],
    online_sales: true,
    rating_avg: 4.7,
    review_count: 189,
    website: "https://bullionvault.com",
  },
  {
    name: "Perth Mint",
    slug: "perth-mint",
    country_name: "Australia",
    city_name: "Perth",
    specializations: ["bullion", "coins", "bars", "storage"],
    online_sales: true,
    rating_avg: 4.9,
    review_count: 312,
    website: "https://perthmint.com",
  },
  {
    name: "BullionStar",
    slug: "bullionstar",
    country_name: "Singapore",
    city_name: "Singapore",
    specializations: ["bullion", "coins", "bars", "storage", "online"],
    online_sales: true,
    rating_avg: 4.8,
    review_count: 156,
    website: "https://bullionstar.com",
  },
  {
    name: "Degussa Goldhandel",
    slug: "degussa-goldhandel",
    country_name: "Germany",
    city_name: "Frankfurt",
    specializations: ["bullion", "coins", "bars", "refining"],
    online_sales: true,
    rating_avg: 4.6,
    review_count: 98,
    website: "https://degussa-goldhandel.de",
  },
  {
    name: "Kitco Metals",
    slug: "kitco-metals",
    country_name: "Canada",
    city_name: "Montreal",
    specializations: ["bullion", "coins", "bars", "storage", "online"],
    online_sales: true,
    rating_avg: 4.5,
    review_count: 203,
    website: "https://kitco.com",
  },
];

export default function FeaturedDealers() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">
              Featured Gold Dealers
            </h2>
            <p className="mt-1 text-sm text-dark-400">
              Trusted gold dealers from around the world
            </p>
          </div>
          <Link
            href="/dealers"
            className="text-sm text-gold-500 hover:text-gold-400"
          >
            View All →
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DEMO_DEALERS.map((dealer) => (
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
                    {dealer.city_name}, {dealer.country_name}
                  </div>
                </div>
                {dealer.online_sales && (
                  <Globe className="h-4 w-4 text-gold-500" />
                )}
              </div>

              <div className="mt-3 flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-gold-400 text-gold-400" />
                <span className="text-sm font-medium text-gold-400">
                  {dealer.rating_avg}
                </span>
                <span className="text-xs text-dark-400">
                  ({dealer.review_count} reviews)
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
    </section>
  );
}
