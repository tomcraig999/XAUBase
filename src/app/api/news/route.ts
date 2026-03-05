import { NextRequest, NextResponse } from "next/server";
import { getDemoNews } from "@/lib/api/rss";

export const revalidate = 1800;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");

  let news = getDemoNews();

  if (category && category !== "all") {
    news = news.filter((item) => item.category === category);
  }

  const start = (page - 1) * limit;
  const paged = news.slice(start, start + limit);

  return NextResponse.json({
    articles: paged,
    total: news.length,
    page,
    limit,
  });
}
