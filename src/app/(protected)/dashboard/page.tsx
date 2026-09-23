import type { Metadata } from "next";
import Link from "next/link";
import { Plus, Pencil, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { createClient, getUser } from "@/lib/supabase/server";
import type { DealerStatus, RequestStatus } from "@/lib/types/database";

export const metadata: Metadata = {
  title: "Dealer Dashboard",
};

interface OwnedDealer {
  id: string;
  name: string;
  slug: string;
  status: DealerStatus;
  admin_note: string | null;
  updated_at: string;
  requested_city: string | null;
  city: { name: string } | null;
  country: { name: string } | null;
  dealer_change_requests: { status: RequestStatus }[];
}

interface ClaimRow {
  id: string;
  status: RequestStatus;
  admin_note: string | null;
  created_at: string;
  dealer: { name: string; slug: string } | null;
}

const STATUS_BADGE: Record<DealerStatus, { label: string; variant: "green" | "gold" | "red" }> = {
  approved: { label: "Live", variant: "green" },
  pending: { label: "Awaiting review", variant: "gold" },
  rejected: { label: "Not approved", variant: "red" },
};

export default async function DashboardPage() {
  const user = await getUser();
  const supabase = await createClient();
  if (!user || !supabase) return null;

  const [{ data: dealersRaw }, { data: claimsRaw }] = await Promise.all([
    supabase
      .from("dealers")
      .select(
        "id, name, slug, status, admin_note, updated_at, requested_city, city:cities(name), country:countries(name), dealer_change_requests(status)"
      )
      .eq("owner_id", user.id)
      .order("name"),
    supabase
      .from("dealer_claims")
      .select("id, status, admin_note, created_at, dealer:dealers(name, slug)")
      .eq("user_id", user.id)
      .neq("status", "approved")
      .order("created_at", { ascending: false }),
  ]);

  const dealers = (dealersRaw as unknown as OwnedDealer[]) ?? [];
  const claims = (claimsRaw as unknown as ClaimRow[]) ?? [];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Your listings</h1>
          <p className="mt-1 text-sm text-dark-400">Signed in as {user.email}</p>
        </div>
        <Link
          href="/submit"
          className="inline-flex items-center gap-2 rounded-md bg-gold-600 px-4 py-2 text-sm font-medium text-white hover:bg-gold-500"
        >
          <Plus className="h-4 w-4" />
          Add a listing
        </Link>
      </div>

      {dealers.length === 0 ? (
        <div className="mt-8 rounded-lg border border-border bg-card p-8 text-center">
          <h2 className="text-lg font-semibold text-foreground">You don&apos;t manage any listings yet</h2>
          <p className="mt-2 text-sm text-dark-400">
            If your business is already in the{" "}
            <Link href="/dealers" className="text-gold-500 hover:text-gold-400">
              directory
            </Link>
            , open its page and click <strong className="text-dark-200">Claim this listing</strong>. Otherwise,{" "}
            <Link href="/submit" className="text-gold-500 hover:text-gold-400">
              add it here
            </Link>
            .
          </p>
        </div>
      ) : (
        <div className="mt-8 space-y-3">
          {dealers.map((d) => {
            const badge = STATUS_BADGE[d.status];
            const hasPendingChanges = d.dealer_change_requests.some((r) => r.status === "pending");
            const location = [d.city?.name ?? d.requested_city, d.country?.name].filter(Boolean).join(", ");
            return (
              <div key={d.id} className="rounded-lg border border-border bg-card p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-semibold text-foreground">{d.name}</h2>
                      <Badge variant={badge.variant}>{badge.label}</Badge>
                      {hasPendingChanges && <Badge>Edits awaiting review</Badge>}
                    </div>
                    <p className="mt-1 text-sm text-dark-400">{location}</p>
                    {d.status === "rejected" && d.admin_note && (
                      <p className="mt-2 text-sm text-red-400">Reviewer note: {d.admin_note}</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {d.status === "approved" && (
                      <Link
                        href={`/dealer/${d.slug}`}
                        className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-sm text-dark-200 hover:bg-dark-800"
                      >
                        <ExternalLink className="h-4 w-4" />
                        View
                      </Link>
                    )}
                    <Link
                      href={`/dashboard/listings/${d.id}`}
                      className="inline-flex items-center gap-1 rounded-md bg-dark-700 px-3 py-1.5 text-sm text-foreground hover:bg-dark-600"
                    >
                      <Pencil className="h-4 w-4" />
                      Edit
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {claims.length > 0 && (
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-foreground">Your claims</h2>
          <div className="mt-3 space-y-2">
            {claims.map((c) => (
              <div key={c.id} className="flex items-center justify-between rounded-md border border-border bg-card p-4">
                <div>
                  <p className="text-sm text-foreground">{c.dealer?.name}</p>
                  {c.admin_note && <p className="mt-1 text-xs text-dark-400">{c.admin_note}</p>}
                </div>
                <Badge variant={c.status === "pending" ? "gold" : "red"}>
                  {c.status === "pending" ? "Awaiting review" : "Not approved"}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
