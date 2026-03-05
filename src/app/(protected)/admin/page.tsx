import type { Metadata } from "next";
import Link from "next/link";
import { Building2, Users, Star, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

export default function AdminPage() {
  // Demo stats
  const stats = [
    { label: "Total Dealers", value: "103", icon: Building2, href: "/admin/dealers" },
    { label: "Pending Review", value: "5", icon: Clock, href: "/admin/dealers" },
    { label: "Total Reviews", value: "2,847", icon: Star, href: "#" },
    { label: "Total Users", value: "1,234", icon: Users, href: "#" },
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
            Review pending dealer submissions →
          </Link>
        </div>
      </div>
    </div>
  );
}
