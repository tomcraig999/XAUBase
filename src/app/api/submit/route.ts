import { NextResponse } from "next/server";
import { getUser } from "@/lib/supabase/server";
import slugify from "slugify";

export async function POST(request: Request) {
  try {
    const user = await getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, country, city } = body;

    if (!name || !country || !city) {
      return NextResponse.json({ error: "Name, country, and city are required" }, { status: 400 });
    }

    const slug = slugify(name, { lower: true, strict: true });

    return NextResponse.json({
      success: true,
      dealer: { name, slug, country, city, status: "pending" },
    });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
