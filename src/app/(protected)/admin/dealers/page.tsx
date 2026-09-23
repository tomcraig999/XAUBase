import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BadgeCheck } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import ReviewActions from "@/components/admin/ReviewActions";
import { createClient } from "@/lib/supabase/server";
import { FIELD_LABELS } from "@/lib/dealers/portal";
import { SPECIALIZATION_LABELS } from "@/lib/utils/constants";
import type { Json } from "@/lib/types/database";

export const metadata: Metadata = {
  title: "Review Queue - Admin",
};

interface Submission {
  id: string;
  name: string;
  website: string | null;
  phone: string | null;
  email: string | null;
  address_line: string | null;
  description: string | null;
  specializations: string[];
  requested_city: string | null;
  submitted_by: string | null;
  created_at: string;
  city: { name: string } | null;
  country: { name: string } | null;
}

interface Claim {
  id: string;
  user_email: string;
  message: string | null;
  created_at: string;
  dealer: { name: string; slug: string; website: string | null } | null;
}

interface ChangeRequest {
  id: string;
  user_id: string;
  changes: Json;
  created_at: string;
  dealer: {
    name: string;
    slug: string;
    description: string | null;
    specializations: string[];
    logo_url: string | null;
    city: { name: string } | null;
  } | null;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function hostOf(url: string | null) {
  try {
    return url ? new URL(url).hostname.replace(/^www\./, "") : "";
  } catch {
    return "";
  }
}

function formatValue(key: string, value: unknown, cityNames: Map<string, string>) {
  if (value === null || value === undefined || value === "") return <em className="text-dark-500">empty</em>;
  if (key === "city_id") return cityNames.get(String(value)) ?? String(value);
  if (key === "specializations" && Array.isArray(value))
    return value.map((s) => SPECIALIZATION_LABELS[s] ?? s).join(", ");
  if (key === "logo_url")
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={String(value)} alt="" className="h-12 w-12 rounded border border-border bg-white object-contain p-0.5" />;
  return String(value);
}

function Section({ id, title, count, children }: { id: string; title: string; count: number; children: React.ReactNode }) {
  return (
    <section id={id} className="mt-10 scroll-mt-20">
      <h2 className="flex items-center gap-2 text-xl font-semibold text-foreground">
        {title}
        <Badge variant={count ? "gold" : "default"}>{count}</Badge>
      </h2>
      <div className="mt-4 space-y-4">
        {count === 0 ? <p className="text-sm text-dark-400">Nothing to review.</p> : children}
      </div>
    </section>
  );
}

export default async function AdminDealersPage() {
  const supabase = await createClient();
  if (!supabase) return null;

  const [{ data: subsRaw }, { data: claimsRaw }, { data: changesRaw }] = await Promise.all([
    supabase
      .from("dealers")
      .select(
        "id, name, website, phone, email, address_line, description, specializations, requested_city, submitted_by, created_at, city:cities(name), country:countries(name)"
      )
      .eq("status", "pending")
      .order("created_at"),
    supabase
      .from("dealer_claims")
      .select("id, user_email, message, created_at, dealer:dealers(name, slug, website)")
      .eq("status", "pending")
      .order("created_at"),
    supabase
      .from("dealer_change_requests")
      .select(
        "id, user_id, changes, created_at, dealer:dealers(name, slug, description, specializations, logo_url, city:cities(name))"
      )
      .eq("status", "pending")
      .order("created_at"),
  ]);

  const submissions = (subsRaw as unknown as Submission[]) ?? [];
  const claims = (claimsRaw as unknown as Claim[]) ?? [];
  const changes = (changesRaw as unknown as ChangeRequest[]) ?? [];

  const userIds = [
    ...new Set([...submissions.map((s) => s.submitted_by), ...changes.map((c) => c.user_id)].filter(Boolean)),
  ] as string[];
  const cityIds = changes
    .map((c) => (c.changes as Record<string, unknown>)?.city_id)
    .filter((v): v is string => typeof v === "string");

  const [{ data: emailsRaw }, { data: citiesRaw }] = await Promise.all([
    userIds.length ? supabase.rpc("admin_user_emails", { p_ids: userIds }) : Promise.resolve({ data: [] }),
    cityIds.length ? supabase.from("cities").select("id, name").in("id", cityIds) : Promise.resolve({ data: [] }),
  ]);
  const emails = new Map((emailsRaw ?? []).map((r) => [r.id, r.email]));
  const cityNames = new Map(((citiesRaw as { id: string; name: string }[] | null) ?? []).map((c) => [c.id, c.name]));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/admin" className="mb-4 inline-flex items-center gap-1 text-sm text-dark-400 hover:text-gold-400">
        <ArrowLeft className="h-4 w-4" />
        Admin Dashboard
      </Link>

      <h1 className="font-display text-3xl font-bold text-foreground">Review Queue</h1>
      <p className="mt-2 text-dark-400">New listings, ownership claims and edits to live listings.</p>

      <Section id="submissions" title="New listings" count={submissions.length}>
        {submissions.map((d) => {
          const submitter = d.submitted_by ? emails.get(d.submitted_by) : undefined;
          const site = hostOf(d.website);
          const domainMatch = !!submitter && !!site && submitter.toLowerCase().endsWith(`@${site.toLowerCase()}`);
          return (
            <div key={d.id} className="rounded-lg border border-border bg-card p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
                <div className="min-w-0 space-y-1 text-sm">
                  <h3 className="text-base font-semibold text-foreground">{d.name}</h3>
                  <p className="text-dark-400">
                    {d.city?.name ?? (
                      <>
                        {d.requested_city} <Badge>new city</Badge>
                      </>
                    )}
                    , {d.country?.name}
                  </p>
                  {d.website && (
                    <a href={d.website} target="_blank" rel="noopener noreferrer" className="block text-gold-500">
                      {d.website}
                    </a>
                  )}
                  <p className="text-dark-400">
                    {[d.address_line, d.phone, d.email].filter(Boolean).join(" · ")}
                  </p>
                  {d.description && <p className="max-w-2xl whitespace-pre-line text-dark-300">{d.description}</p>}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {d.specializations.map((s) => (
                      <Badge key={s} variant="gold">
                        {SPECIALIZATION_LABELS[s] ?? s}
                      </Badge>
                    ))}
                  </div>
                  <p className="pt-1 text-xs text-dark-400">
                    Submitted by {submitter ?? "unknown"} on {formatDate(d.created_at)}
                    {domainMatch && (
                      <span className="ml-2 inline-flex items-center gap-1 text-green-400">
                        <BadgeCheck className="h-3.5 w-3.5" />
                        email matches website
                      </span>
                    )}
                  </p>
                </div>
                <ReviewActions target="dealer" id={d.id} />
              </div>
            </div>
          );
        })}
      </Section>

      <Section id="claims" title="Ownership claims" count={claims.length}>
        {claims.map((c) => (
          <div key={c.id} className="rounded-lg border border-border bg-card p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
              <div className="min-w-0 space-y-1 text-sm">
                <h3 className="text-base font-semibold text-foreground">
                  <Link href={`/dealer/${c.dealer?.slug}`} className="hover:text-gold-400">
                    {c.dealer?.name}
                  </Link>
                </h3>
                <p className="text-dark-400">
                  Claimed by <strong className="text-dark-200">{c.user_email}</strong> on {formatDate(c.created_at)}
                </p>
                {c.dealer?.website && <p className="text-dark-400">Listing website: {hostOf(c.dealer.website)}</p>}
                {c.message && (
                  <blockquote className="mt-2 max-w-2xl border-l-2 border-border pl-3 text-dark-300">
                    {c.message}
                  </blockquote>
                )}
              </div>
              <ReviewActions target="claim" id={c.id} />
            </div>
          </div>
        ))}
      </Section>

      <Section id="changes" title="Edits to live listings" count={changes.length}>
        {changes.map((c) => {
          const proposed = (c.changes ?? {}) as Record<string, unknown>;
          const current: Record<string, unknown> = {
            name: c.dealer?.name,
            description: c.dealer?.description,
            specializations: c.dealer?.specializations,
            logo_url: c.dealer?.logo_url,
            city_id: c.dealer?.city?.name,
            requested_city: c.dealer?.city?.name,
          };
          return (
            <div key={c.id} className="rounded-lg border border-border bg-card p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
                <div className="min-w-0 flex-1 text-sm">
                  <h3 className="text-base font-semibold text-foreground">
                    <Link href={`/dealer/${c.dealer?.slug}`} className="hover:text-gold-400">
                      {c.dealer?.name}
                    </Link>
                  </h3>
                  <p className="text-xs text-dark-400">
                    By {emails.get(c.user_id) ?? "owner"} on {formatDate(c.created_at)}
                  </p>
                  <table className="mt-3 w-full max-w-3xl text-left text-xs">
                    <thead className="text-dark-400">
                      <tr>
                        <th className="w-28 py-1 font-medium">Field</th>
                        <th className="py-1 font-medium">Current</th>
                        <th className="py-1 font-medium">Proposed</th>
                      </tr>
                    </thead>
                    <tbody className="align-top text-dark-200">
                      {Object.entries(proposed).map(([key, value]) => (
                        <tr key={key} className="border-t border-border">
                          <td className="py-2 pr-3 text-dark-400">{FIELD_LABELS[key] ?? key}</td>
                          <td className="whitespace-pre-line py-2 pr-3 text-dark-400">
                            {key === "city_id" || key === "requested_city"
                              ? String(current[key] ?? "")
                              : formatValue(key, current[key], cityNames)}
                          </td>
                          <td className="whitespace-pre-line py-2">
                            {key === "requested_city" ? (
                              <>
                                {String(value)} <Badge>new city</Badge>
                              </>
                            ) : (
                              formatValue(key, value, cityNames)
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <ReviewActions target="change" id={c.id} />
              </div>
            </div>
          );
        })}
      </Section>
    </div>
  );
}
