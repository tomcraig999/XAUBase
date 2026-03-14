import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/utils/constants";
import { getAllCitySlugs, getAllDealerSlugs } from "@/lib/supabase/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_URL;

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/dealers`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/prices`, lastModified: new Date(), changeFrequency: "hourly", priority: 0.9 },
    { url: `${baseUrl}/stocks`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/news`, lastModified: new Date(), changeFrequency: "hourly", priority: 0.8 },
    { url: `${baseUrl}/investing`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
  ];

  // Country pages
  const countries = [
    "united-states", "united-kingdom", "canada", "australia",
    "ireland", "france", "germany", "austria", "spain",
    "portugal", "switzerland", "italy", "belgium",
    "uae", "singapore", "hong-kong", "india", "south-africa",
    "cayman-islands", "argentina", "brazil", "new-zealand", "thailand",
  ];

  const countryPages: MetadataRoute.Sitemap = countries.map((slug) => ({
    url: `${baseUrl}/dealers/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // City pages from Supabase
  const citySlugs = await getAllCitySlugs();
  const cityPages: MetadataRoute.Sitemap = citySlugs.map(({ countrySlug, citySlug }) => ({
    url: `${baseUrl}/dealers/${countrySlug}/${citySlug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Dealer detail pages from Supabase
  const dealerSlugs = await getAllDealerSlugs();
  const dealerPages: MetadataRoute.Sitemap = dealerSlugs.map((slug) => ({
    url: `${baseUrl}/dealer/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  // Guide pages
  const guides = [
    "why-invest-in-gold", "how-to-buy-gold", "gold-ira",
    "physical-vs-paper-gold", "gold-storage", "gold-etfs-explained",
  ];

  const guidePages: MetadataRoute.Sitemap = guides.map((slug) => ({
    url: `${baseUrl}/investing/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...countryPages, ...cityPages, ...dealerPages, ...guidePages];
}
