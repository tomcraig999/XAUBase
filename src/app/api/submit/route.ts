import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import slugify from "slugify";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, country, city, website, phone, email, description, specializations, onlineSales } = body;

    if (!name || !country || !city) {
      return NextResponse.json({ error: "Name, country, and city are required" }, { status: 400 });
    }

    const slug = slugify(name, { lower: true, strict: true });

    // In production, insert into Supabase
    // const { data, error } = await supabase.from('dealers').insert({
    //   name, slug, country_id, city_id, website, phone, email,
    //   description, specializations, online_sales: onlineSales,
    //   status: 'pending', submitted_by: user.id,
    // }).select().single();

    return NextResponse.json({
      success: true,
      dealer: { name, slug, country, city, status: "pending" },
    });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
