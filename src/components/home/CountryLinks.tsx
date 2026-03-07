import Link from "next/link";
import { getCountriesWithCounts } from "@/lib/supabase/queries";

const COUNTRY_FLAGS: Record<string, string> = {
  US: "\uD83C\uDDFA\uD83C\uDDF8",
  GB: "\uD83C\uDDEC\uD83C\uDDE7",
  CA: "\uD83C\uDDE8\uD83C\uDDE6",
  AU: "\uD83C\uDDE6\uD83C\uDDFA",
  DE: "\uD83C\uDDE9\uD83C\uDDEA",
  CH: "\uD83C\uDDE8\uD83C\uDDED",
  AE: "\uD83C\uDDE6\uD83C\uDDEA",
  SG: "\uD83C\uDDF8\uD83C\uDDEC",
  HK: "\uD83C\uDDED\uD83C\uDDF0",
  IN: "\uD83C\uDDEE\uD83C\uDDF3",
  ZA: "\uD83C\uDDFF\uD83C\uDDE6",
};

export default async function CountryLinks() {
  const countries = await getCountriesWithCounts();

  if (countries.length === 0) return null;

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
          {countries.map((country) => (
            <Link
              key={country.slug}
              href={`/dealers/${country.slug}`}
              className="rounded-lg border border-border bg-card p-4 text-center transition-colors hover:border-gold-600/50 hover:bg-card-hover"
            >
              <span className="text-2xl">
                {COUNTRY_FLAGS[country.code] || "\uD83C\uDF0D"}
              </span>
              <p className="mt-2 text-sm font-medium text-foreground">
                {country.name}
              </p>
              <p className="text-xs text-dark-400">
                {country.dealer_count} dealer{country.dealer_count !== 1 ? "s" : ""}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
