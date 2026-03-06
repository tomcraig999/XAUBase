import { NextRequest, NextResponse } from "next/server";
import { fetchAllNews, getDemoNews } from "@/lib/api/rss";

export const revalidate = 1800;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");

  // Try real RSS feeds first, fall back to demo data
  let news = await fetchAllNews();
  if (news.length === 0) {
    news = getDemoNews();
  }

  if (category && category !== "all") {
    news = news.filter((item) => item.category === category);
  }

  // Sort by published date (newest first)
  news.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());

  const start = (page - 1) * limit;
  const paged = news.slice(start, start + limit);

  return NextResponse.json({
    articles: paged,
    total: news.length,
    page,
    limit,
  });
}
