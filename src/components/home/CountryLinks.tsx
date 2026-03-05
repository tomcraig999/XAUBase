import Link from "next/link";

const COUNTRIES = [
  { name: "United States", slug: "united-states", flag: "\uD83C\uDDFA\uD83C\uDDF8", count: 25 },
  { name: "United Kingdom", slug: "united-kingdom", flag: "\uD83C\uDDEC\uD83C\uDDE7", count: 10 },
  { name: "Canada", slug: "canada", flag: "\uD83C\uDDE8\uD83C\uDDE6", count: 10 },
  { name: "Australia", slug: "australia", flag: "\uD83C\uDDE6\uD83C\uDDFA", count: 8 },
  { name: "Germany", slug: "germany", flag: "\uD83C\uDDE9\uD83C\uDDEA", count: 6 },
  { name: "Switzerland", slug: "switzerland", flag: "\uD83C\uDDE8\uD83C\uDDED", count: 6 },
  { name: "UAE", slug: "uae", flag: "\uD83C\uDDE6\uD83C\uDDEA", count: 6 },
  { name: "Singapore", slug: "singapore", flag: "\uD83C\uDDF8\uD83C\uDDEC", count: 5 },
  { name: "Hong Kong", slug: "hong-kong", flag: "\uD83C\uDDED\uD83C\uDDF0", count: 5 },
  { name: "India", slug: "india", flag: "\uD83C\uDDEE\uD83C\uDDF3", count: 7 },
  { name: "South Africa", slug: "south-africa", flag: "\uD83C\uDDFF\uD83C\uDDE6", count: 5 },
];

export default function CountryLinks() {
  return (
    <section className="border-t border-border py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-bold text-foreground">
          Browse by Country
        </h2>
        <p className="mt-1 text-sm text-dark-400">
          Find gold dealers in your region
        </p>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {COUNTRIES.map((country) => (
            <Link
              key={country.slug}
              href={`/dealers/${country.slug}`}
              className="rounded-lg border border-border bg-card p-4 text-center transition-colors hover:border-gold-600/50 hover:bg-card-hover"
            >
              <span className="text-2xl">{country.flag}</span>
              <p className="mt-2 text-sm font-medium text-foreground">
                {country.name}
              </p>
              <p className="text-xs text-dark-400">{country.count} dealers</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
