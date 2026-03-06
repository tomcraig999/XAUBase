import type { Metadata } from "next";
import Link from "next/link";
import { Clock, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { formatTimeAgo } from "@/lib/utils/format";
import { fetchAllNews, getDemoNews } from "@/lib/api/rss";

export const metadata: Metadata = {
  title: "Gold News",
  description:
    "Latest gold market news, gold mining updates, and precious metals analysis. Stay informed with curated gold news from top sources.",
};

export const revalidate = 1800;

const CATEGORIES = [
  { value: "all", label: "All News" },
  { value: "market", label: "Market" },
  { value: "mining", label: "Mining" },
  { value: "investing", label: "Investing" },
];

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  // Fetch real news from RSS feeds, fall back to demo data
  let news = await fetchAllNews();
  if (news.length === 0) {
    news = getDemoNews();
  }

  // Sort by date (newest first)
  news.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold text-foreground">Gold News</h1>
      <p className="mt-2 text-dark-400">Latest news from the gold and precious metals market</p>

      {/* Category Tabs */}
      <div className="mt-6 flex gap-2">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.value}
            href={cat.value === "all" ? "/news" : `/news?category=${cat.value}`}
            className="rounded-full border border-border px-4 py-1.5 text-sm text-dark-300 transition-colors hover:border-gold-600 hover:text-gold-400 first:border-gold-600 first:bg-gold-900/30 first:text-gold-400"
          >
            {cat.label}
          </Link>
        ))}
      </div>

      {/* News List */}
      <div className="mt-8 space-y-4">
        {news.map((article, i) => (
          <article
            key={i}
            className="rounded-lg border border-border bg-card p-5 transition-colors hover:bg-card-hover"
          >
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Badge variant="gold">{article.category}</Badge>
                  <span className="text-xs text-dark-400">{article.source}</span>
                </div>
                <h2 className="mt-2 text-lg font-semibold leading-snug text-foreground">
                  {article.title}
                </h2>
                {article.summary && (
                  <p className="mt-2 text-sm leading-relaxed text-dark-400">
                    {article.summary}
                  </p>
                )}
                <div className="mt-3 flex items-center gap-4 text-xs text-dark-400">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatTimeAgo(article.published_at)}
                  </span>
                  {article.url !== "#" && (
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-gold-500 hover:text-gold-400"
                    >
                      Read More <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
