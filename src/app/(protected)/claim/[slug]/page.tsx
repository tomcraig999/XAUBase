import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import ClaimForm from "@/components/dealers/ClaimForm";
import { createClient, getUser } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Claim Listing",
  robots: { index: false },
};

interface Props {
  params: Promise<{ slug: string }>;
}

function hostOf(url: string | null): string {
  try {
    return url ? new URL(url).hostname.replace(/^www\./, "").toLowerCase() : "";
  } catch {
    return "";
  }
}

export default async function ClaimPage({ params }: Props) {
  const { slug } = await params;
  const user = await getUser();
  const supabase = await createClient();
  if (!user || !supabase) notFound();

  const { data: dealer } = await supabase
    .from("dealers")
    .select("id, name, slug, website, owner_id")
    .eq("slug", slug)
    .eq("status", "approved")
    .maybeSingle();
  if (!dealer) notFound();
  if (dealer.owner_id === user.id) redirect(`/dashboard/listings/${dealer.id}`);

  const { data: existingClaim } = await supabase
    .from("dealer_claims")
    .select("id")
    .eq("dealer_id", dealer.id)
    .eq("user_id", user.id)
    .eq("status", "pending")
    .maybeSingle();

  // Display hint only; claim_dealer() does the authoritative check.
  const siteHost = hostOf(dealer.website);
  const emailDomain = (user.email ?? "").split("@")[1]?.toLowerCase() ?? "";
  const likelyInstant =
    !!siteHost &&
    !!emailDomain &&
    (emailDomain === siteHost || emailDomain.endsWith(`.${siteHost}`) || siteHost.endsWith(`.${emailDomain}`));

  return (
    <div className="mx-auto max-w-xl px-4 py-8 sm:px-6">
      <Link
        href={`/dealer/${dealer.slug}`}
        className="mb-4 inline-flex items-center gap-1 text-sm text-dark-400 hover:text-gold-400"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to listing
      </Link>

      <h1 className="font-display text-3xl font-bold text-foreground">Claim {dealer.name}</h1>
      <p className="mt-2 text-dark-400">
        Claiming lets you update this listing&apos;s contact details, description, specializations and logo.
      </p>

      {dealer.owner_id ? (
        <div className="mt-8 rounded-lg border border-border bg-card p-6 text-sm text-dark-300">
          This listing is already managed by another account. If you believe that&apos;s wrong, please contact us.
        </div>
      ) : existingClaim ? (
        <div className="mt-8 rounded-lg border border-gold-700/50 bg-gold-900/20 p-6 text-sm text-gold-400">
          Your claim is awaiting review. You can follow its status from your{" "}
          <Link href="/dashboard" className="underline">
            dashboard
          </Link>
          .
        </div>
      ) : (
        <div className="mt-8 rounded-lg border border-border bg-card p-6">
          <div className="flex items-start gap-3">
            <ShieldCheck className={`mt-0.5 h-5 w-5 ${likelyInstant ? "text-green-400" : "text-dark-400"}`} />
            <div className="text-sm text-dark-300">
              {likelyInstant ? (
                <p>
                  Your email <strong className="text-foreground">{user.email}</strong> matches{" "}
                  <strong className="text-foreground">{siteHost}</strong>, so your claim will be verified instantly.
                </p>
              ) : (
                <p>
                  You&apos;re signed in as <strong className="text-foreground">{user.email}</strong>
                  {siteHost && (
                    <>
                      , which doesn&apos;t match <strong className="text-foreground">{siteHost}</strong>
                    </>
                  )}
                  . Our team will verify your claim manually. For instant verification, sign in with an email
                  address at your business&apos;s domain.
                </p>
              )}
            </div>
          </div>
          <div className="mt-6">
            <ClaimForm dealerId={dealer.id} askForDetails={!likelyInstant} />
          </div>
        </div>
      )}
    </div>
  );
}
