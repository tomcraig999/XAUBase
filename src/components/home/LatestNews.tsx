import Link from "next/link";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { formatTimeAgo } from "@/lib/utils/format";
import { getDemoNews } from "@/lib/api/rss";

export default function LatestNews() {
  const news = getDemoNews().slice(0, 4);

  return (
    <section className="border-t border-border py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">
              Latest Gold News
            </h2>
            <p className="mt-1 text-sm text-dark-400">
              Stay updated with the gold market
            </p>
          </div>
          <Link
            href="/news"
            className="text-sm text-gold-500 hover:text-gold-400"
          >
            All News →
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {news.map((item, i) => (
            <article
              key={i}
              className="rounded-lg border border-border bg-card p-5 transition-colors hover:bg-card-hover"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <Badge variant="gold">{item.category}</Badge>
                  <h3 className="mt-2 font-semibold leading-snug text-foreground">
                    {item.title}
                  </h3>
                  {item.summary && (
                    <p className="mt-2 text-sm text-dark-400 line-clamp-2">
                      {item.summary}
                    </p>
                  )}
                  <div className="mt-3 flex items-center gap-3 text-xs text-dark-400">
                    <span>{item.source}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatTimeAgo(item.published_at)}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
