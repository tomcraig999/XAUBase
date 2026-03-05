import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Globe, MapPin, Phone, Mail, Star, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { SPECIALIZATION_LABELS } from "@/lib/utils/constants";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { createClient } from "@/lib/supabase/server";

// Demo dealer data
const DEALERS: Record<string, {
  name: string;
  country: string;
  countrySlug: string;
  city: string;
  description: string;
  website: string;
  phone: string;
  email: string;
  specializations: string[];
  online: boolean;
  rating: number;
  reviews: number;
  address: string;
}> = {
  "apmex": {
    name: "APMEX",
    country: "United States",
    countrySlug: "united-states",
    city: "Oklahoma City",
    description: "APMEX (American Precious Metals Exchange) is one of the largest online precious metals retailers in the United States. Founded in 2000, they offer a wide selection of gold, silver, platinum, and palladium products including coins, bars, and rounds from mints worldwide. They are an authorized purchaser of the US Mint and Royal Canadian Mint.",
    website: "https://apmex.com",
    phone: "+1-800-375-9006",
    email: "support@apmex.com",
    specializations: ["bullion", "coins", "bars", "numismatics", "ira", "online"],
    online: true,
    rating: 4.8,
    reviews: 245,
    address: "226 Dean A. McGee Ave, Oklahoma City, OK 73102, USA",
  },
  "bullionvault": {
    name: "BullionVault",
    country: "United Kingdom",
    countrySlug: "united-kingdom",
    city: "London",
    description: "BullionVault is the world's largest online investment gold service, with over $4 billion of gold, silver, platinum, and palladium securely stored for over 100,000 users. They offer peer-to-peer trading and professional-grade vault storage in London, Zurich, New York, Toronto, and Singapore.",
    website: "https://bullionvault.com",
    phone: "+44-20-8600-0130",
    email: "support@bullionvault.com",
    specializations: ["bullion", "storage", "online"],
    online: true,
    rating: 4.7,
    reviews: 189,
    address: "Landmark House, Blacks Road, London W6 9DT, UK",
  },
  "perth-mint": {
    name: "Perth Mint",
    country: "Australia",
    countrySlug: "australia",
    city: "Perth",
    description: "The Perth Mint is the official bullion mint of Australia and one of the oldest mints in the world, operating since 1899. Government-owned by the State of Western Australia, it produces a wide range of bullion coins and bars, including the iconic Australian Kangaroo and Lunar series. The Perth Mint also offers allocated and unallocated storage programs.",
    website: "https://perthmint.com",
    phone: "+61-8-9421-7222",
    email: "info@perthmint.com",
    specializations: ["bullion", "coins", "bars", "storage", "refining"],
    online: true,
    rating: 4.9,
    reviews: 312,
    address: "310 Hay Street, East Perth WA 6004, Australia",
  },
  "bullionstar": {
    name: "BullionStar",
    country: "Singapore",
    countrySlug: "singapore",
    city: "Singapore",
    description: "BullionStar is Singapore's premier precious metals dealer, having facilitated over $2 billion in transactions. They operate a showroom and vault in central Singapore, offering gold, silver, and platinum products with transparent pricing and allocated storage options. Singapore exempts investment-grade precious metals from GST.",
    website: "https://bullionstar.com",
    phone: "+65-6100-3040",
    email: "support@bullionstar.com",
    specializations: ["bullion", "coins", "bars", "storage", "online"],
    online: true,
    rating: 4.8,
    reviews: 156,
    address: "45 New Bridge Road, Singapore 059398",
  },
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const dealer = DEALERS[slug];
  if (!dealer) return { title: "Dealer Not Found" };

  return {
    title: `${dealer.name} - Gold Dealer in ${dealer.city}, ${dealer.country}`,
    description: dealer.description.slice(0, 160),
  };
}

export default async function DealerPage({ params }: Props) {
  const { slug } = await params;
  const dealer = DEALERS[slug];
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!dealer) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header user={user ? { id: user.id, email: user.email } : null} />
        <main className="flex-1">
          <div className="mx-auto max-w-7xl px-4 py-16 text-center">
            <h1 className="text-2xl font-bold text-foreground">Dealer Not Found</h1>
            <Link href="/dealers" className="mt-4 inline-block text-gold-500">← Back to Directory</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header user={user ? { id: user.id, email: user.email } : null} />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <Link
            href={`/dealers/${dealer.countrySlug}`}
            className="mb-6 inline-flex items-center gap-1 text-sm text-dark-400 hover:text-gold-400"
          >
            <ArrowLeft className="h-4 w-4" />
            {dealer.country} Dealers
          </Link>

          {/* Dealer Header */}
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h1 className="font-display text-3xl font-bold text-foreground">
                  {dealer.name}
                </h1>
                <div className="mt-2 flex items-center gap-4 text-sm text-dark-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {dealer.city}, {dealer.country}
                  </span>
                  {dealer.online && (
                    <span className="flex items-center gap-1 text-gold-500">
                      <Globe className="h-4 w-4" />
                      Online Sales
                    </span>
                  )}
                </div>
                <div className="mt-2 flex items-center gap-1">
                  <Star className="h-4 w-4 fill-gold-400 text-gold-400" />
                  <span className="font-medium text-gold-400">{dealer.rating}</span>
                  <span className="text-dark-400">({dealer.reviews} reviews)</span>
                </div>
              </div>
              {dealer.website && (
                <a
                  href={dealer.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-gold-600 px-4 py-2 text-sm font-medium text-white hover:bg-gold-500"
                >
                  Visit Website
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {dealer.specializations.map((spec) => (
                <Badge key={spec} variant="gold">
                  {SPECIALIZATION_LABELS[spec] || spec}
                </Badge>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="mt-6 rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground">About</h2>
            <p className="mt-3 leading-relaxed text-dark-300">{dealer.description}</p>
          </div>

          {/* Contact Info */}
          <div className="mt-6 rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground">Contact Information</h2>
            <div className="mt-4 space-y-3">
              {dealer.address && (
                <div className="flex items-start gap-3 text-sm">
                  <MapPin className="mt-0.5 h-4 w-4 text-dark-400" />
                  <span className="text-dark-300">{dealer.address}</span>
                </div>
              )}
              {dealer.phone && (
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-dark-400" />
                  <a href={`tel:${dealer.phone}`} className="text-gold-400 hover:text-gold-300">
                    {dealer.phone}
                  </a>
                </div>
              )}
              {dealer.email && (
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-dark-400" />
                  <a href={`mailto:${dealer.email}`} className="text-gold-400 hover:text-gold-300">
                    {dealer.email}
                  </a>
                </div>
              )}
              {dealer.website && (
                <div className="flex items-center gap-3 text-sm">
                  <Globe className="h-4 w-4 text-dark-400" />
                  <a href={dealer.website} target="_blank" rel="noopener noreferrer" className="text-gold-400 hover:text-gold-300">
                    {dealer.website}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Reviews placeholder */}
          <div className="mt-6 rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground">Reviews</h2>
            <p className="mt-3 text-sm text-dark-400">
              {user
                ? "Be the first to leave a review for this dealer."
                : "Sign in to leave a review."}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
