import Link from "next/link";
import { getCountriesWithCounts } from "@/lib/supabase/queries";

// Flag emoji from an ISO 3166 alpha-2 code (e.g. "GB" -> regional indicators G + B)
function countryFlag(code: string): string {
  const cc = code.trim().toUpperCase();
  if (!/^[A-Z]{2}$/.test(cc)) return "\uD83C\uDF0D";
  return String.fromCodePoint(...Array.from(cc).map((c) => 0x1f1e6 + c.charCodeAt(0) - 65));
}

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
                {countryFlag(country.code)}
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
