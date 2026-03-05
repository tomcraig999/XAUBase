import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/utils/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily" as const, priority: 1 },
    { url: `${baseUrl}/dealers`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.9 },
    { url: `${baseUrl}/prices`, lastModified: new Date(), changeFrequency: "hourly" as const, priority: 0.9 },
    { url: `${baseUrl}/stocks`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.8 },
    { url: `${baseUrl}/news`, lastModified: new Date(), changeFrequency: "hourly" as const, priority: 0.8 },
    { url: `${baseUrl}/investing`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.7 },
  ];

  const countries = [
    "united-states", "united-kingdom", "canada", "australia",
    "germany", "switzerland", "uae", "singapore",
    "hong-kong", "india", "south-africa",
  ];

  const countryPages = countries.map((slug) => ({
    url: `${baseUrl}/dealers/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const guides = [
    "why-invest-in-gold", "how-to-buy-gold", "gold-ira",
    "physical-vs-paper-gold", "gold-storage", "gold-etfs-explained",
  ];

  const guidePages = guides.map((slug) => ({
    url: `${baseUrl}/investing/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...countryPages, ...guidePages];
}
