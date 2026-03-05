import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Globe, Star, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { SPECIALIZATION_LABELS } from "@/lib/utils/constants";

// This will be replaced with Supabase data
const COUNTRY_DATA: Record<string, { name: string; dealers: Array<{ name: string; slug: string; city: string; specializations: string[]; online: boolean; rating: number; reviews: number }> }> = {
  "united-states": {
    name: "United States",
    dealers: [
      { name: "APMEX", slug: "apmex", city: "Oklahoma City", specializations: ["bullion", "coins", "bars", "online"], online: true, rating: 4.8, reviews: 245 },
      { name: "JM Bullion", slug: "jm-bullion", city: "Dallas", specializations: ["bullion", "bars", "coins", "online"], online: true, rating: 4.7, reviews: 198 },
      { name: "SD Bullion", slug: "sd-bullion", city: "Ottawa Lake", specializations: ["bullion", "coins", "bars", "online"], online: true, rating: 4.6, reviews: 167 },
      { name: "Goldco", slug: "goldco", city: "Los Angeles", specializations: ["ira", "bullion", "coins"], online: true, rating: 4.7, reviews: 312 },
      { name: "Money Metals Exchange", slug: "money-metals-exchange", city: "Eagle", specializations: ["bullion", "coins", "online"], online: true, rating: 4.5, reviews: 134 },
      { name: "Augusta Precious Metals", slug: "augusta-precious-metals", city: "Los Angeles", specializations: ["ira", "bullion"], online: true, rating: 4.8, reviews: 287 },
      { name: "Birch Gold Group", slug: "birch-gold-group", city: "Burbank", specializations: ["ira", "bullion", "coins"], online: true, rating: 4.6, reviews: 156 },
      { name: "American Hartford Gold", slug: "american-hartford-gold", city: "Los Angeles", specializations: ["ira", "bullion", "coins"], online: true, rating: 4.7, reviews: 189 },
      { name: "Bullion Trading LLC", slug: "bullion-trading-llc", city: "New York", specializations: ["bullion", "coins", "bars"], online: true, rating: 4.4, reviews: 87 },
      { name: "A-Mark Precious Metals", slug: "a-mark", city: "El Segundo", specializations: ["bullion", "refining"], online: false, rating: 4.3, reviews: 34 },
    ],
  },
  "united-kingdom": {
    name: "United Kingdom",
    dealers: [
      { name: "BullionByPost", slug: "bullionbypost", city: "Birmingham", specializations: ["bullion", "coins", "bars", "online"], online: true, rating: 4.7, reviews: 234 },
      { name: "BullionVault", slug: "bullionvault", city: "London", specializations: ["bullion", "storage", "online"], online: true, rating: 4.7, reviews: 189 },
      { name: "The Royal Mint", slug: "the-royal-mint", city: "Llantrisant", specializations: ["coins", "bars", "bullion", "online"], online: true, rating: 4.9, reviews: 456 },
      { name: "Baird & Co", slug: "baird-and-co", city: "London", specializations: ["bullion", "bars", "refining"], online: true, rating: 4.6, reviews: 78 },
      { name: "Sharps Pixley", slug: "sharps-pixley", city: "London", specializations: ["bullion", "bars", "coins", "storage"], online: true, rating: 4.5, reviews: 65 },
      { name: "Chards", slug: "chards", city: "Blackpool", specializations: ["coins", "bullion", "numismatics"], online: true, rating: 4.6, reviews: 112 },
    ],
  },
  "australia": {
    name: "Australia",
    dealers: [
      { name: "Perth Mint", slug: "perth-mint", city: "Perth", specializations: ["bullion", "coins", "bars", "storage"], online: true, rating: 4.9, reviews: 312 },
      { name: "ABC Bullion", slug: "abc-bullion", city: "Sydney", specializations: ["bullion", "bars", "refining"], online: true, rating: 4.7, reviews: 156 },
      { name: "Ainslie Bullion", slug: "ainslie-bullion", city: "Brisbane", specializations: ["bullion", "coins", "bars", "online"], online: true, rating: 4.5, reviews: 89 },
      { name: "Guardian Gold", slug: "guardian-gold-au", city: "Melbourne", specializations: ["bullion", "coins"], online: true, rating: 4.4, reviews: 56 },
    ],
  },
};

interface Props {
  params: Promise<{ country: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country } = await params;
  const data = COUNTRY_DATA[country];
  const countryName = data?.name || country.replace(/-/g, " ");

  return {
    title: `Gold Dealers in ${countryName}`,
    description: `Browse trusted gold dealers in ${countryName}. Find gold coin dealers, bullion dealers, and precious metals shops.`,
  };
}

export default async function CountryDealersPage({ params }: Props) {
  const { country } = await params;
  const data = COUNTRY_DATA[country];

  if (!data) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-foreground">Country Not Found</h1>
        <p className="mt-2 text-dark-400">We don&apos;t have dealers listed for this country yet.</p>
        <Link href="/dealers" className="mt-4 inline-block text-gold-500 hover:text-gold-400">
          ← Back to Directory
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/dealers" className="mb-4 inline-flex items-center gap-1 text-sm text-dark-400 hover:text-gold-400">
        <ArrowLeft className="h-4 w-4" />
        All Dealers
      </Link>

      <h1 className="font-display text-3xl font-bold text-foreground">
        Gold Dealers in {data.name}
      </h1>
      <p className="mt-2 text-dark-400">
        {data.dealers.length} trusted gold dealers
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.dealers.map((dealer) => (
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
                  {dealer.city}
                </div>
              </div>
              {dealer.online && <Globe className="h-4 w-4 text-gold-500" />}
            </div>
            <div className="mt-3 flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-gold-400 text-gold-400" />
              <span className="text-sm font-medium text-gold-400">{dealer.rating}</span>
              <span className="text-xs text-dark-400">({dealer.reviews})</span>
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
