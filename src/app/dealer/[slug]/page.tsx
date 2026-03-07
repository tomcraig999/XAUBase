import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Globe, MapPin, Phone, Mail, Star, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { SPECIALIZATION_LABELS, SITE_URL } from "@/lib/utils/constants";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getUser } from "@/lib/supabase/server";
import { getDealerBySlug } from "@/lib/supabase/queries";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const dealer = await getDealerBySlug(slug);
  if (!dealer) return { title: "Dealer Not Found" };

  const cityName = dealer.city?.name || "";
  const countryName = dealer.country?.name || "";
  const location = [cityName, countryName].filter(Boolean).join(", ");

  return {
    title: `${dealer.name} - Gold Dealer in ${location}`,
    description: dealer.description?.slice(0, 160) || `${dealer.name} is a trusted gold dealer in ${location}. Buy gold coins, bullion bars, and precious metals.`,
    alternates: {
      canonical: `${SITE_URL}/dealer/${slug}`,
    },
  };
}

export const revalidate = 3600;

export default async function DealerPage({ params }: Props) {
  const { slug } = await params;
  const [dealer, user] = await Promise.all([
    getDealerBySlug(slug),
    getUser(),
  ]);

  if (!dealer) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header user={user ? { id: user.id, email: user.email } : null} />
        <main className="flex-1">
          <div className="mx-auto max-w-7xl px-4 py-16 text-center">
            <h1 className="text-2xl font-bold text-foreground">Dealer Not Found</h1>
            <Link href="/dealers" className="mt-4 inline-block text-gold-500">&larr; Back to Directory</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const cityName = dealer.city?.name || "";
  const stateProv = dealer.city?.state_province || "";
  const countryName = dealer.country?.name || "";
  const countrySlug = dealer.country?.slug || "";
  const location = [cityName, stateProv, countryName].filter(Boolean).join(", ");

  // JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Gold Dealers", item: `${SITE_URL}/dealers` },
          ...(countrySlug ? [{ "@type": "ListItem", position: 3, name: countryName, item: `${SITE_URL}/dealers/${countrySlug}` }] : []),
          { "@type": "ListItem", position: countrySlug ? 4 : 3, name: dealer.name, item: `${SITE_URL}/dealer/${slug}` },
        ],
      },
      {
        "@type": "LocalBusiness",
        name: dealer.name,
        ...(dealer.description && { description: dealer.description }),
        ...(dealer.address_line && { address: dealer.address_line }),
        ...(dealer.phone && { telephone: dealer.phone }),
        ...(dealer.website && { url: dealer.website }),
        ...(dealer.rating_avg > 0 && {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: dealer.rating_avg,
            reviewCount: dealer.review_count,
          },
        }),
      },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header user={user ? { id: user.id, email: user.email } : null} />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />

          <Link
            href={countrySlug ? `/dealers/${countrySlug}` : "/dealers"}
            className="mb-6 inline-flex items-center gap-1 text-sm text-dark-400 hover:text-gold-400"
          >
            <ArrowLeft className="h-4 w-4" />
            {countryName ? `${countryName} Dealers` : "All Dealers"}
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
                    {location}
                  </span>
                  {dealer.online_sales && (
                    <span className="flex items-center gap-1 text-gold-500">
                      <Globe className="h-4 w-4" />
                      Online Sales
                    </span>
                  )}
                </div>
                <div className="mt-2 flex items-center gap-1">
                  <Star className="h-4 w-4 fill-gold-400 text-gold-400" />
                  <span className="font-medium text-gold-400">{dealer.rating_avg}</span>
                  <span className="text-dark-400">({dealer.review_count} reviews)</span>
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
          {dealer.description && (
            <div className="mt-6 rounded-lg border border-border bg-card p-6">
              <h2 className="text-lg font-semibold text-foreground">About</h2>
              <p className="mt-3 leading-relaxed text-dark-300">{dealer.description}</p>
            </div>
          )}

          {/* Contact Info */}
          <div className="mt-6 rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground">Contact Information</h2>
            <div className="mt-4 space-y-3">
              {dealer.address_line && (
                <div className="flex items-start gap-3 text-sm">
                  <MapPin className="mt-0.5 h-4 w-4 text-dark-400" />
                  <span className="text-dark-300">{dealer.address_line}</span>
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
