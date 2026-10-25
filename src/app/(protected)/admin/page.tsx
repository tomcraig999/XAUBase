import type { Metadata } from "next";
import Link from "next/link";
import { Building2, Clock, KeyRound, FilePen } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

export default async function AdminPage() {
  const supabase = await createClient();
  if (!supabase) return null;

  const count = { count: "exact" as const, head: true };
  const [live, pendingDealers, pendingClaims, pendingChanges, owned] = await Promise.all([
    supabase.from("dealers").select("id", count).eq("status", "approved"),
    supabase.from("dealers").select("id", count).eq("status", "pending"),
    supabase.from("dealer_claims").select("id", count).eq("status", "pending"),
    supabase.from("dealer_change_requests").select("id", count).eq("status", "pending"),
    supabase.from("dealers").select("id", count).eq("status", "approved").not("owner_id", "is", null),
  ]);

  const stats = [
    { label: "Live dealers", value: live.count ?? 0, sub: `${owned.count ?? 0} managed by owners`, icon: Building2, href: "/dealers" },
    { label: "New listings to review", value: pendingDealers.count ?? 0, icon: Clock, href: "/admin/dealers#submissions" },
    { label: "Claims to review", value: pendingClaims.count ?? 0, icon: KeyRound, href: "/admin/dealers#claims" },
    { label: "Edits to review", value: pendingChanges.count ?? 0, icon: FilePen, href: "/admin/dealers#changes" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold text-foreground">Admin Dashboard</h1>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="rounded-lg border border-border bg-card p-6 transition-colors hover:bg-card-hover"
            >
              <Icon className="h-6 w-6 text-gold-500" />
              <p className="mt-3 text-3xl font-bold text-foreground">{stat.value}</p>
              <p className="mt-1 text-sm text-dark-400">{stat.label}</p>
              {stat.sub && <p className="mt-1 text-xs text-dark-500">{stat.sub}</p>}
            </Link>
          );
        })}
      </div>

      <div className="mt-8 rounded-lg border border-border bg-card p-6">
        <h2 className="text-lg font-semibold text-foreground">Quick Actions</h2>
        <div className="mt-4 space-y-2">
          <Link
            href="/admin/dealers"
            className="block rounded-md border border-border p-3 text-sm text-dark-200 hover:bg-dark-800"
          >
            Open the review queue →
          </Link>
        </div>
      </div>
    </div>
  );
}
