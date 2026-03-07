import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getDealersByCountry } from "@/lib/supabase/queries";
import DealerCard from "@/components/dealers/DealerCard";
import { SITE_URL } from "@/lib/utils/constants";

interface Props {
  params: Promise<{ country: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country } = await params;
  const data = await getDealersByCountry(country);
  const countryName = data?.countryName || country.replace(/-/g, " ");

  return {
    title: `Gold Dealers in ${countryName} | XAUBase`,
    description: `Browse ${data?.dealers.length || ""} trusted gold dealers in ${countryName}. Find gold coin dealers, bullion dealers, and precious metals shops.`,
    alternates: {
      canonical: `${SITE_URL}/dealers/${country}`,
    },
  };
}

export const revalidate = 3600;

export default async function CountryDealersPage({ params }: Props) {
  const { country } = await params;
  const data = await getDealersByCountry(country);

  if (!data) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-foreground">Country Not Found</h1>
        <p className="mt-2 text-dark-400">
          We don&apos;t have dealers listed for this country yet.
        </p>
        <Link
          href="/dealers"
          className="mt-4 inline-block text-gold-500 hover:text-gold-400"
        >
          &larr; Back to Directory
        </Link>
      </div>
    );
  }

  const { dealers, countryName, cities } = data;

  // JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Gold Dealers", item: `${SITE_URL}/dealers` },
      { "@type": "ListItem", position: 3, name: countryName, item: `${SITE_URL}/dealers/${country}` },
    ],
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link
        href="/dealers"
        className="mb-4 inline-flex items-center gap-1 text-sm text-dark-400 hover:text-gold-400"
      >
        <ArrowLeft className="h-4 w-4" />
        All Dealers
      </Link>

      <h1 className="font-display text-3xl font-bold text-foreground">
        Gold Dealers in {countryName}
      </h1>
      <p className="mt-2 text-dark-400">
        {dealers.length} trusted gold dealers
      </p>

      {/* Browse by City */}
      {cities.length > 1 && (
        <div className="mt-6">
          <h2 className="text-sm font-semibold text-dark-300">Browse by City</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {cities.map((c) => (
              <Link
                key={c.slug}
                href={`/dealers/${country}/${c.slug}`}
                className="rounded-full border border-border px-3 py-1.5 text-sm text-dark-300 transition-colors hover:border-gold-600 hover:text-gold-400"
              >
                {c.name}{c.state_province ? `, ${c.state_province}` : ""}{" "}
                <span className="text-dark-500">({c.dealer_count})</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Dealer Grid */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {dealers.map((dealer) => (
          <DealerCard
            key={dealer.slug}
            name={dealer.name}
            slug={dealer.slug}
            cityName={dealer.city?.name}
            stateProv={dealer.city?.state_province}
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
