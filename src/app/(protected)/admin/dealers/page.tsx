import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Check, X } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Manage Dealers - Admin",
};

// Demo pending submissions
const PENDING_DEALERS = [
  {
    id: "1",
    name: "Gold Exchange Corp",
    country: "United States",
    city: "Chicago",
    website: "https://goldexchangecorp.com",
    specializations: ["bullion", "coins"],
    submittedBy: "user@example.com",
    submittedAt: "2026-03-04",
    status: "pending" as const,
  },
  {
    id: "2",
    name: "Melbourne Gold Traders",
    country: "Australia",
    city: "Melbourne",
    website: "https://melbournegoldtraders.com.au",
    specializations: ["bullion", "bars", "storage"],
    submittedBy: "another@example.com",
    submittedAt: "2026-03-03",
    status: "pending" as const,
  },
  {
    id: "3",
    name: "Zurich Precious Metals AG",
    country: "Switzerland",
    city: "Zurich",
    website: "https://zurichpm.ch",
    specializations: ["bullion", "storage", "refining"],
    submittedBy: "swiss@example.com",
    submittedAt: "2026-03-02",
    status: "pending" as const,
  },
];

export default function AdminDealersPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/admin"
        className="mb-4 inline-flex items-center gap-1 text-sm text-dark-400 hover:text-gold-400"
      >
        <ArrowLeft className="h-4 w-4" />
        Admin Dashboard
      </Link>

      <h1 className="font-display text-3xl font-bold text-foreground">
        Manage Dealer Submissions
      </h1>
      <p className="mt-2 text-dark-400">
        Review and approve or reject dealer submissions
      </p>

      <div className="mt-8 space-y-4">
        {PENDING_DEALERS.map((dealer) => (
          <div
            key={dealer.id}
            className="rounded-lg border border-border bg-card p-5"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-semibold text-foreground">{dealer.name}</h3>
                <p className="mt-1 text-sm text-dark-400">
                  {dealer.city}, {dealer.country}
                </p>
                {dealer.website && (
                  <p className="mt-1 text-xs text-gold-500">{dealer.website}</p>
                )}
                <div className="mt-2 flex flex-wrap gap-1">
                  {dealer.specializations.map((s) => (
                    <Badge key={s} variant="gold">{s}</Badge>
                  ))}
                </div>
                <p className="mt-2 text-xs text-dark-400">
                  Submitted by {dealer.submittedBy} on {dealer.submittedAt}
                </p>
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-1 rounded-md bg-green-700 px-3 py-1.5 text-sm text-white hover:bg-green-600">
                  <Check className="h-4 w-4" />
                  Approve
                </button>
                <button className="flex items-center gap-1 rounded-md bg-red-700 px-3 py-1.5 text-sm text-white hover:bg-red-600">
                  <X className="h-4 w-4" />
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
