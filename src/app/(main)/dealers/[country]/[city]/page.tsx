import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getDealersByCity } from "@/lib/supabase/queries";
import DealerCard from "@/components/dealers/DealerCard";
import { SITE_URL } from "@/lib/utils/constants";

interface Props {
  params: Promise<{ country: string; city: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country, city } = await params;
  const data = await getDealersByCity(country, city);

  if (!data) {
    return { title: "City Not Found" };
  }

  const { cityName, stateProv, countryName, dealers } = data;
  const location = stateProv ? `${cityName}, ${stateProv}` : `${cityName}, ${countryName}`;

  return {
    title: `Gold Dealers in ${location} - Buy Gold & Silver | XAUBase`,
    description: `Find ${dealers.length} trusted gold dealers in ${location}. Compare local gold coin dealers, bullion shops, and precious metals dealers near you.`,
    alternates: {
      canonical: `${SITE_URL}/dealers/${country}/${city}`,
    },
  };
}

// Top cities for cross-linking by country
const TOP_US_CITIES = [
  { name: "New York", slug: "new-york" },
  { name: "Los Angeles", slug: "los-angeles" },
  { name: "Chicago", slug: "chicago" },
  { name: "Houston", slug: "houston" },
  { name: "Phoenix", slug: "phoenix" },
  { name: "Dallas", slug: "dallas" },
  { name: "San Antonio", slug: "san-antonio" },
  { name: "San Diego", slug: "san-diego" },
  { name: "Miami", slug: "miami" },
  { name: "Denver", slug: "denver" },
  { name: "Atlanta", slug: "atlanta" },
  { name: "Las Vegas", slug: "las-vegas" },
];

const TOP_UK_CITIES = [
  { name: "London", slug: "london" },
  { name: "Birmingham", slug: "birmingham" },
  { name: "Manchester", slug: "manchester" },
  { name: "Glasgow", slug: "glasgow" },
  { name: "Leeds", slug: "leeds" },
  { name: "Liverpool", slug: "liverpool" },
  { name: "Edinburgh", slug: "edinburgh" },
  { name: "Bristol", slug: "bristol" },
  { name: "Sheffield", slug: "sheffield" },
  { name: "Newcastle", slug: "newcastle" },
];

const TOP_CANADA_CITIES = [
  { name: "Toronto", slug: "toronto" },
  { name: "Montreal", slug: "montreal" },
  { name: "Vancouver", slug: "vancouver" },
  { name: "Calgary", slug: "calgary" },
  { name: "Edmonton", slug: "edmonton" },
  { name: "Ottawa", slug: "ottawa" },
  { name: "Winnipeg", slug: "winnipeg" },
  { name: "Quebec City", slug: "quebec-city" },
  { name: "Hamilton", slug: "hamilton" },
  { name: "Kitchener", slug: "kitchener" },
];

const TOP_AUSTRALIA_CITIES = [
  { name: "Sydney", slug: "sydney" },
  { name: "Melbourne", slug: "melbourne" },
  { name: "Brisbane", slug: "brisbane" },
  { name: "Perth", slug: "perth" },
  { name: "Adelaide", slug: "adelaide" },
  { name: "Gold Coast", slug: "gold-coast" },
  { name: "Canberra", slug: "canberra" },
  { name: "Newcastle", slug: "newcastle-au" },
  { name: "Hobart", slug: "hobart" },
  { name: "Darwin", slug: "darwin" },
];

const TOP_NEW_ZEALAND_CITIES = [
  { name: "Auckland", slug: "auckland" },
  { name: "Wellington", slug: "wellington" },
  { name: "Christchurch", slug: "christchurch" },
];

const TOP_SOUTH_AFRICA_CITIES = [
  { name: "Johannesburg", slug: "johannesburg" },
  { name: "Cape Town", slug: "cape-town" },
  { name: "Durban", slug: "durban" },
  { name: "Pretoria", slug: "pretoria" },
];

const TOP_ARGENTINA_CITIES = [
  { name: "Buenos Aires", slug: "buenos-aires" },
  { name: "Córdoba", slug: "cordoba" },
  { name: "Rosario", slug: "rosario" },
];

const TOP_THAILAND_CITIES = [
  { name: "Bangkok", slug: "bangkok" },
  { name: "Chiang Mai", slug: "chiang-mai" },
];

const TOP_BRAZIL_CITIES = [
  { name: "São Paulo", slug: "sao-paulo" },
  { name: "Rio de Janeiro", slug: "rio-de-janeiro" },
  { name: "Brasília", slug: "brasilia" },
];

// European countries with 2 cities each
const EUROPE_CITIES: Record<string, { label: string; cities: { name: string; slug: string }[] }> = {
  ireland: { label: "Irish", cities: [{ name: "Dublin", slug: "dublin" }, { name: "Cork", slug: "cork" }] },
  france: { label: "French", cities: [{ name: "Paris", slug: "paris" }, { name: "Marseille", slug: "marseille" }] },
  germany: { label: "German", cities: [{ name: "Berlin", slug: "berlin" }, { name: "Munich", slug: "munich" }] },
  austria: { label: "Austrian", cities: [{ name: "Vienna", slug: "vienna" }, { name: "Graz", slug: "graz" }] },
  spain: { label: "Spanish", cities: [{ name: "Madrid", slug: "madrid" }, { name: "Barcelona", slug: "barcelona" }] },
  portugal: { label: "Portuguese", cities: [{ name: "Lisbon", slug: "lisbon" }, { name: "Porto", slug: "porto" }] },
  switzerland: { label: "Swiss", cities: [{ name: "Zurich", slug: "zurich" }, { name: "Geneva", slug: "geneva" }] },
  italy: { label: "Italian", cities: [{ name: "Rome", slug: "rome" }, { name: "Milan", slug: "milan" }] },
  belgium: { label: "Belgian", cities: [{ name: "Brussels", slug: "brussels" }, { name: "Antwerp", slug: "antwerp" }] },
};

export default async function CityDealersPage({ params }: Props) {
  const { country, city } = await params;
  const data = await getDealersByCity(country, city);

  if (!data || data.dealers.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-foreground">City Not Found</h1>
        <p className="mt-2 text-dark-400">
          We don&apos;t have dealers listed for this city yet.
        </p>
        <Link
          href={`/dealers/${country}`}
          className="mt-4 inline-block text-gold-500 hover:text-gold-400"
        >
          &larr; Back to Country Directory
        </Link>
      </div>
    );
  }

  const { dealers, cityName, stateProv, countryName } = data;
  const location = stateProv ? `${cityName}, ${stateProv}` : cityName;
  const fullLocation = stateProv
    ? `${cityName}, ${stateProv}, ${countryName}`
    : `${cityName}, ${countryName}`;

  // FAQ data for structured data and display
  const faqs = [
    {
      q: `Where can I buy gold in ${cityName}?`,
      a: `There are ${dealers.length} trusted gold dealers in ${location}. You can buy gold coins, gold bars, and bullion from local dealers listed on XAUBase. Many dealers also offer online purchasing with delivery to ${cityName}.`,
    },
    {
      q: `What types of gold can I buy in ${cityName}?`,
      a: `Gold dealers in ${location} typically sell gold bullion bars, gold coins (such as American Eagles, Canadian Maple Leafs, and Krugerrands), gold rounds, and some offer numismatic or collectible coins. Many also sell silver, platinum, and palladium.`,
    },
    {
      q: `How do I choose a gold dealer in ${cityName}?`,
      a: `Look for dealers with strong customer reviews, transparent pricing, and established reputations. Check if they are members of industry associations. Compare premiums over spot price and consider factors like buyback policies, payment methods, and whether they offer secure storage.`,
    },
    {
      q: `Do gold dealers in ${cityName} buy gold?`,
      a: `Yes, most gold dealers in ${location} buy gold as well as sell it. They typically purchase gold coins, bars, jewelry, and scrap gold. Prices are based on the current spot price of gold, and dealers offer varying buyback rates. Contact individual dealers for their current buy prices.`,
    },
  ];

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      // BreadcrumbList
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Gold Dealers",
            item: `${SITE_URL}/dealers`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: countryName,
            item: `${SITE_URL}/dealers/${country}`,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: location,
            item: `${SITE_URL}/dealers/${country}/${city}`,
          },
        ],
      },
      // CollectionPage
      {
        "@type": "CollectionPage",
        name: `Gold Dealers in ${location}`,
        description: `Find ${dealers.length} trusted gold dealers in ${fullLocation}`,
        url: `${SITE_URL}/dealers/${country}/${city}`,
        numberOfItems: dealers.length,
      },
      // LocalBusiness for each dealer
      ...dealers.map((d) => ({
        "@type": "LocalBusiness",
        "@id": `${SITE_URL}/dealer/${d.slug}`,
        name: d.name,
        ...(d.address_line && { address: d.address_line }),
        ...(d.phone && { telephone: d.phone }),
        ...(d.website && { url: d.website }),
        ...(d.rating_avg > 0 && {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: d.rating_avg,
            reviewCount: d.review_count,
          },
        }),
      })),
      // FAQPage
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.a,
          },
        })),
      },
    ],
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-dark-400">
        <Link href="/" className="hover:text-gold-400">Home</Link>
        <span>/</span>
        <Link href="/dealers" className="hover:text-gold-400">Gold Dealers</Link>
        <span>/</span>
        <Link href={`/dealers/${country}`} className="hover:text-gold-400">
          {countryName}
        </Link>
        <span>/</span>
        <span className="text-foreground">{location}</span>
      </nav>

      {/* Back link */}
      <Link
        href={`/dealers/${country}`}
        className="mb-4 inline-flex items-center gap-1 text-sm text-dark-400 hover:text-gold-400"
      >
        <ArrowLeft className="h-4 w-4" />
        {countryName} Dealers
      </Link>

      {/* H1 */}
      <h1 className="font-display text-3xl font-bold text-foreground">
        Gold Dealers in {location}
      </h1>
      <p className="mt-2 text-dark-400">
        Find trusted gold dealers, coin shops, and bullion dealers in{" "}
        {fullLocation}. Compare prices, read reviews, and buy gold with
        confidence.
      </p>

      {/* Dealer count badge */}
      <div className="mt-4">
        <span className="inline-flex items-center rounded-full border border-gold-600 bg-gold-900/30 px-3 py-1 text-sm font-medium text-gold-400">
          {dealers.length} Gold Dealer{dealers.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Dealer Grid */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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

      {/* FAQ Section */}
      <div className="mt-12">
        <h2 className="font-display text-2xl font-bold text-foreground">
          Frequently Asked Questions
        </h2>
        <div className="mt-6 space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-lg border border-border bg-card p-5">
              <h3 className="font-semibold text-foreground">{faq.q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-dark-300">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Browse Other Cities */}
      {country === "united-states" && (
        <div className="mt-12">
          <h2 className="font-display text-xl font-bold text-foreground">
            Browse Gold Dealers in Other Cities
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {TOP_US_CITIES.filter((c) => c.slug !== city).map((c) => (
              <Link
                key={c.slug}
                href={`/dealers/united-states/${c.slug}`}
                className="rounded-full border border-border px-3 py-1.5 text-sm text-dark-300 transition-colors hover:border-gold-600 hover:text-gold-400"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      )}
      {country === "united-kingdom" && (
        <div className="mt-12">
          <h2 className="font-display text-xl font-bold text-foreground">
            Browse Gold Dealers in Other UK Cities
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {TOP_UK_CITIES.filter((c) => c.slug !== city).map((c) => (
              <Link
                key={c.slug}
                href={`/dealers/united-kingdom/${c.slug}`}
                className="rounded-full border border-border px-3 py-1.5 text-sm text-dark-300 transition-colors hover:border-gold-600 hover:text-gold-400"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      )}
      {country === "canada" && (
        <div className="mt-12">
          <h2 className="font-display text-xl font-bold text-foreground">
            Browse Gold Dealers in Other Canadian Cities
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {TOP_CANADA_CITIES.filter((c) => c.slug !== city).map((c) => (
              <Link
                key={c.slug}
                href={`/dealers/canada/${c.slug}`}
                className="rounded-full border border-border px-3 py-1.5 text-sm text-dark-300 transition-colors hover:border-gold-600 hover:text-gold-400"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      )}
      {country === "australia" && (
        <div className="mt-12">
          <h2 className="font-display text-xl font-bold text-foreground">
            Browse Gold Dealers in Other Australian Cities
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {TOP_AUSTRALIA_CITIES.filter((c) => c.slug !== city).map((c) => (
              <Link
                key={c.slug}
                href={`/dealers/australia/${c.slug}`}
                className="rounded-full border border-border px-3 py-1.5 text-sm text-dark-300 transition-colors hover:border-gold-600 hover:text-gold-400"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      )}
      {country === "new-zealand" && (
        <div className="mt-12">
          <h2 className="font-display text-xl font-bold text-foreground">
            Browse Gold Dealers in Other New Zealand Cities
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {TOP_NEW_ZEALAND_CITIES.filter((c) => c.slug !== city).map((c) => (
              <Link
                key={c.slug}
                href={`/dealers/new-zealand/${c.slug}`}
                className="rounded-full border border-border px-3 py-1.5 text-sm text-dark-300 transition-colors hover:border-gold-600 hover:text-gold-400"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      )}
      {country === "south-africa" && (
        <div className="mt-12">
          <h2 className="font-display text-xl font-bold text-foreground">
            Browse Gold Dealers in Other South African Cities
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {TOP_SOUTH_AFRICA_CITIES.filter((c) => c.slug !== city).map((c) => (
              <Link
                key={c.slug}
                href={`/dealers/south-africa/${c.slug}`}
                className="rounded-full border border-border px-3 py-1.5 text-sm text-dark-300 transition-colors hover:border-gold-600 hover:text-gold-400"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      )}
      {country === "argentina" && (
        <div className="mt-12">
          <h2 className="font-display text-xl font-bold text-foreground">
            Browse Gold Dealers in Other Argentine Cities
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {TOP_ARGENTINA_CITIES.filter((c) => c.slug !== city).map((c) => (
              <Link
                key={c.slug}
                href={`/dealers/argentina/${c.slug}`}
                className="rounded-full border border-border px-3 py-1.5 text-sm text-dark-300 transition-colors hover:border-gold-600 hover:text-gold-400"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      )}
      {country === "brazil" && (
        <div className="mt-12">
          <h2 className="font-display text-xl font-bold text-foreground">
            Browse Gold Dealers in Other Brazilian Cities
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {TOP_BRAZIL_CITIES.filter((c) => c.slug !== city).map((c) => (
              <Link
                key={c.slug}
                href={`/dealers/brazil/${c.slug}`}
                className="rounded-full border border-border px-3 py-1.5 text-sm text-dark-300 transition-colors hover:border-gold-600 hover:text-gold-400"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      )}
      {country === "thailand" && (
        <div className="mt-12">
          <h2 className="font-display text-xl font-bold text-foreground">
            Browse Gold Dealers in Other Thai Cities
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {TOP_THAILAND_CITIES.filter((c) => c.slug !== city).map((c) => (
              <Link
                key={c.slug}
                href={`/dealers/thailand/${c.slug}`}
                className="rounded-full border border-border px-3 py-1.5 text-sm text-dark-300 transition-colors hover:border-gold-600 hover:text-gold-400"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      )}
      {EUROPE_CITIES[country] && (
        <div className="mt-12">
          <h2 className="font-display text-xl font-bold text-foreground">
            Browse Gold Dealers in Other {EUROPE_CITIES[country].label} Cities
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {EUROPE_CITIES[country].cities.filter((c) => c.slug !== city).map((c) => (
              <Link
                key={c.slug}
                href={`/dealers/${country}/${c.slug}`}
                className="rounded-full border border-border px-3 py-1.5 text-sm text-dark-300 transition-colors hover:border-gold-600 hover:text-gold-400"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
