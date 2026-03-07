import { createClient } from "./server";

// Dealer with joined city and country data
export interface DealerWithLocation {
  id: string;
  name: string;
  slug: string;
  website: string | null;
  phone: string | null;
  email: string | null;
  description: string | null;
  specializations: string[];
  online_sales: boolean;
  address_line: string | null;
  rating_avg: number;
  review_count: number;
  featured: boolean;
  city: { name: string; slug: string; state_province: string | null } | null;
  country: { name: string; slug: string } | null;
}

export interface CityWithCount {
  id: string;
  name: string;
  slug: string;
  state_province: string | null;
  dealer_count: number;
}

interface CountryRow {
  id: string;
  name: string;
}

interface CityRow {
  id: string;
  name: string;
  slug: string;
  state_province: string | null;
}

interface CountryInfo {
  name: string;
  slug: string;
  code: string;
}

const DEALER_SELECT = `
  id, name, slug, website, phone, email, description, specializations,
  online_sales, address_line, rating_avg, review_count, featured,
  city:cities(name, slug, state_province),
  country:countries(name, slug)
` as const;

// Get dealers for a specific city page
export async function getDealersByCity(
  countrySlug: string,
  citySlug: string
): Promise<{ dealers: DealerWithLocation[]; cityName: string; stateProv: string | null; countryName: string } | null> {
  const supabase = await createClient();
  if (!supabase) return null;

  const { data: countryData } = await supabase
    .from("countries")
    .select("id, name")
    .eq("slug", countrySlug)
    .single();

  const country = countryData as unknown as CountryRow | null;
  if (!country) return null;

  const { data: cityData } = await supabase
    .from("cities")
    .select("id, name, state_province")
    .eq("slug", citySlug)
    .eq("country_id", country.id)
    .single();

  const city = cityData as unknown as CityRow | null;
  if (!city) return null;

  const { data: dealers } = await supabase
    .from("dealers")
    .select(DEALER_SELECT)
    .eq("city_id", city.id)
    .eq("status", "approved")
    .order("featured", { ascending: false })
    .order("rating_avg", { ascending: false });

  return {
    dealers: (dealers as unknown as DealerWithLocation[]) || [],
    cityName: city.name,
    stateProv: city.state_province,
    countryName: country.name,
  };
}

// Get all dealers for a country, grouped by city
export async function getDealersByCountry(
  countrySlug: string
): Promise<{ dealers: DealerWithLocation[]; countryName: string; cities: CityWithCount[] } | null> {
  const supabase = await createClient();
  if (!supabase) return null;

  const { data: countryData } = await supabase
    .from("countries")
    .select("id, name")
    .eq("slug", countrySlug)
    .single();

  const country = countryData as unknown as CountryRow | null;
  if (!country) return null;

  const { data: dealersRaw } = await supabase
    .from("dealers")
    .select(DEALER_SELECT)
    .eq("country_id", country.id)
    .eq("status", "approved")
    .order("featured", { ascending: false })
    .order("rating_avg", { ascending: false });

  const { data: citiesRaw } = await supabase
    .from("cities")
    .select("id, name, slug, state_province")
    .eq("country_id", country.id)
    .order("name");

  const typedDealers = (dealersRaw as unknown as DealerWithLocation[]) || [];
  const typedCities = (citiesRaw as unknown as CityRow[]) || [];

  // Count dealers per city
  const cities: CityWithCount[] = typedCities
    .map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      state_province: c.state_province,
      dealer_count: typedDealers.filter((d) => d.city?.slug === c.slug).length,
    }))
    .filter((c) => c.dealer_count > 0);

  return {
    dealers: typedDealers,
    countryName: country.name,
    cities,
  };
}

// Get a single dealer by slug
export async function getDealerBySlug(slug: string): Promise<DealerWithLocation | null> {
  const supabase = await createClient();
  if (!supabase) return null;

  const { data } = await supabase
    .from("dealers")
    .select(DEALER_SELECT)
    .eq("slug", slug)
    .eq("status", "approved")
    .single();

  return (data as unknown as DealerWithLocation) || null;
}

// Get all approved dealers (for main directory page)
export async function getAllDealers(): Promise<DealerWithLocation[]> {
  const supabase = await createClient();
  if (!supabase) return [];

  const { data } = await supabase
    .from("dealers")
    .select(DEALER_SELECT)
    .eq("status", "approved")
    .order("featured", { ascending: false })
    .order("rating_avg", { ascending: false });

  return (data as unknown as DealerWithLocation[]) || [];
}

// Get featured dealers for homepage
export async function getFeaturedDealers(limit = 6): Promise<DealerWithLocation[]> {
  const supabase = await createClient();
  if (!supabase) return [];

  const { data } = await supabase
    .from("dealers")
    .select(DEALER_SELECT)
    .eq("status", "approved")
    .eq("featured", true)
    .order("rating_avg", { ascending: false })
    .limit(limit);

  // If not enough featured dealers, fill with top-rated
  if (!data || data.length < limit) {
    const { data: topRated } = await supabase
      .from("dealers")
      .select(DEALER_SELECT)
      .eq("status", "approved")
      .order("rating_avg", { ascending: false })
      .limit(limit);
    return (topRated as unknown as DealerWithLocation[]) || [];
  }

  return (data as unknown as DealerWithLocation[]) || [];
}

// Get all countries with dealer counts
export async function getCountriesWithCounts(): Promise<
  { name: string; slug: string; code: string; dealer_count: number }[]
> {
  const supabase = await createClient();
  if (!supabase) return [];

  const { data: countriesRaw } = await supabase
    .from("countries")
    .select("name, slug, code")
    .order("name");

  const countries = (countriesRaw as unknown as CountryInfo[]) || [];
  if (countries.length === 0) return [];

  // Get dealer counts per country
  const { data: dealersRaw } = await supabase
    .from("dealers")
    .select("country_id, country:countries(slug)")
    .eq("status", "approved");

  const dealers = (dealersRaw as unknown as { country: { slug: string } }[]) || [];

  const countMap: Record<string, number> = {};
  for (const d of dealers) {
    const slug = d.country?.slug;
    if (slug) countMap[slug] = (countMap[slug] || 0) + 1;
  }

  return countries
    .map((c) => ({ name: c.name, slug: c.slug, code: c.code, dealer_count: countMap[c.slug] || 0 }))
    .filter((c) => c.dealer_count > 0)
    .sort((a, b) => b.dealer_count - a.dealer_count);
}

// Get all city slugs for sitemap generation
export async function getAllCitySlugs(): Promise<
  { citySlug: string; countrySlug: string }[]
> {
  const supabase = await createClient();
  if (!supabase) return [];

  const { data: dealersRaw } = await supabase
    .from("dealers")
    .select("city:cities(slug, country_id), country:countries(slug)")
    .eq("status", "approved")
    .not("city_id", "is", null);

  const dealers = (dealersRaw as unknown as { city: { slug: string }; country: { slug: string } }[]) || [];

  const seen = new Set<string>();
  const result: { citySlug: string; countrySlug: string }[] = [];

  for (const d of dealers) {
    if (!d.city?.slug || !d.country?.slug) continue;
    const key = `${d.country.slug}/${d.city.slug}`;
    if (seen.has(key)) continue;
    seen.add(key);
    result.push({ citySlug: d.city.slug, countrySlug: d.country.slug });
  }

  return result;
}

// Get all dealer slugs for sitemap
export async function getAllDealerSlugs(): Promise<string[]> {
  const supabase = await createClient();
  if (!supabase) return [];

  const { data } = await supabase
    .from("dealers")
    .select("slug")
    .eq("status", "approved");

  return ((data as unknown as { slug: string }[]) || []).map((d) => d.slug);
}
