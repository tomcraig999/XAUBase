import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import DealerForm from "@/components/dealers/DealerForm";
import WithdrawChangesButton from "@/components/dealers/WithdrawChangesButton";
import { createClient, getUser } from "@/lib/supabase/server";
import { FIELD_LABELS, getLocationOptions, type DealerFormValues } from "@/lib/dealers/portal";
import type { Database } from "@/lib/types/database";

export const metadata: Metadata = {
  title: "Edit Listing",
};

const SAVED_MESSAGES: Record<string, string> = {
  saved: "Saved. Your changes are live.",
  pending_review:
    "Saved. Contact details are live now; the other changes will go live once our team approves them.",
  no_changes: "Nothing to save. No changes were made.",
};

type DealerRow = Database["public"]["Tables"]["dealers"]["Row"];

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ submitted?: string; saved?: string }>;
}

export default async function EditListingPage({ params, searchParams }: Props) {
  const [{ id }, { submitted, saved }] = await Promise.all([params, searchParams]);
  const user = await getUser();
  const supabase = await createClient();
  if (!user || !supabase) notFound();

  const { data: dealerRaw } = await supabase
    .from("dealers")
    .select("*")
    .eq("id", id)
    .eq("owner_id", user.id)
    .maybeSingle();
  const dealer = dealerRaw as DealerRow | null;
  if (!dealer) notFound();

  const [{ data: requestRaw }, locations] = await Promise.all([
    supabase
      .from("dealer_change_requests")
      .select("changes, created_at")
      .eq("dealer_id", id)
      .eq("status", "pending")
      .maybeSingle(),
    getLocationOptions(),
  ]);
  const pendingChanges = (requestRaw?.changes as Partial<DealerFormValues> | undefined) ?? null;

  const live: DealerFormValues = {
    name: dealer.name,
    country_id: dealer.country_id,
    city_id: dealer.city_id ?? "",
    requested_city: dealer.requested_city ?? "",
    website: dealer.website ?? "",
    phone: dealer.phone ?? "",
    email: dealer.email ?? "",
    address_line: dealer.address_line ?? "",
    description: dealer.description ?? "",
    specializations: dealer.specializations ?? [],
    online_sales: dealer.online_sales,
    logo_url: dealer.logo_url ?? "",
  };

  // Start from the proposed values so re-saving doesn't drop queued edits.
  const initialValues: DealerFormValues = { ...live };
  if (pendingChanges) {
    for (const [key, value] of Object.entries(pendingChanges)) {
      (initialValues as unknown as Record<string, unknown>)[key] = value ?? (key === "specializations" ? [] : "");
    }
    if (pendingChanges.requested_city) initialValues.city_id = "";
  }

  const cityName = (cityId: unknown) => locations.cities.find((c) => c.id === cityId)?.name ?? String(cityId ?? "—");

  return (
    <div className="mx-auto max-w-xl px-4 py-8 sm:px-6">
      <Link href="/dashboard" className="mb-4 inline-flex items-center gap-1 text-sm text-dark-400 hover:text-gold-400">
        <ArrowLeft className="h-4 w-4" />
        Your listings
      </Link>

      <div className="flex flex-wrap items-center gap-3">
        <h1 className="font-display text-3xl font-bold text-foreground">{dealer.name}</h1>
        {dealer.status === "approved" && <Badge variant="green">Live</Badge>}
        {dealer.status === "pending" && <Badge variant="gold">Awaiting review</Badge>}
        {dealer.status === "rejected" && <Badge variant="red">Not approved</Badge>}
      </div>
      {dealer.status === "approved" && (
        <Link href={`/dealer/${dealer.slug}`} className="mt-1 inline-block text-sm text-gold-500 hover:text-gold-400">
          View public listing →
        </Link>
      )}

      {submitted && (
        <div className="mt-6 rounded-md border border-green-800 bg-green-900/30 p-4 text-sm text-green-400">
          Thanks! Your listing has been submitted and will appear in the directory once our team approves it.
          You can keep editing it here and add a logo in the meantime.
        </div>
      )}
      {saved && SAVED_MESSAGES[saved] && (
        <div className="mt-6 rounded-md border border-green-800 bg-green-900/30 p-4 text-sm text-green-400">
          {SAVED_MESSAGES[saved]}
        </div>
      )}
      {dealer.status === "rejected" && (
        <div className="mt-6 rounded-md border border-red-800 bg-red-900/30 p-4 text-sm text-red-400">
          This listing wasn&apos;t approved{dealer.admin_note ? `: ${dealer.admin_note}` : "."} Saving changes
          resubmits it for review.
        </div>
      )}

      {pendingChanges && (
        <div className="mt-6 rounded-md border border-gold-700/50 bg-gold-900/20 p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-gold-400">Edits awaiting review</p>
              <ul className="mt-2 space-y-1 text-xs text-dark-300">
                {Object.entries(pendingChanges).map(([key, value]) => (
                  <li key={key}>
                    <span className="text-dark-400">{FIELD_LABELS[key] ?? key}:</span>{" "}
                    {key === "city_id"
                      ? cityName(value)
                      : Array.isArray(value)
                        ? value.join(", ")
                        : key === "logo_url"
                          ? value
                            ? "new logo"
                            : "remove logo"
                          : String(value ?? "(cleared)").slice(0, 120)}
                  </li>
                ))}
              </ul>
            </div>
            <WithdrawChangesButton dealerId={dealer.id} />
          </div>
        </div>
      )}

      <div className="mt-8">
        <DealerForm
          key={JSON.stringify(initialValues)}
          mode="edit"
          dealerId={dealer.id}
          status={dealer.status}
          initialValues={initialValues}
          countries={locations.countries}
          cities={locations.cities}
        />
      </div>
    </div>
  );
}
