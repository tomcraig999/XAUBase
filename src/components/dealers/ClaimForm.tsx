"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { claimDealer } from "@/app/(protected)/dashboard/actions";

export default function ClaimForm({ dealerId, askForDetails }: { dealerId: string; askForDetails: boolean }) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [outcome, setOutcome] = useState<"approved" | "pending" | null>(null);
  const [pending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    startTransition(async () => {
      const result = await claimDealer(dealerId, message);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      if (result.data.outcome === "approved") {
        router.push(`/dashboard/listings/${dealerId}`);
        return;
      }
      setOutcome(result.data.outcome);
    });
  };

  if (outcome === "pending") {
    return (
      <div className="rounded-md border border-green-800 bg-green-900/30 p-4 text-sm text-green-400">
        Claim submitted. We&apos;ll review it shortly. You can follow its status from your{" "}
        <Link href="/dashboard" className="underline">
          dashboard
        </Link>
        .
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-md border border-red-800 bg-red-900/30 p-3 text-sm text-red-400">{error}</div>
      )}
      {askForDetails && (
        <div>
          <label className="block text-sm font-medium text-dark-200">How are you connected to this business?</label>
          <textarea
            rows={4}
            maxLength={1000}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-1 w-full rounded-md border border-border bg-dark-800 px-3 py-2 text-sm text-foreground placeholder:text-dark-400 focus:border-gold-500 focus:outline-none"
            placeholder="e.g., I'm the owner. You can reach me on the business phone number listed to confirm."
          />
        </div>
      )}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-md bg-gold-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gold-500 disabled:opacity-50"
      >
        {pending ? "Submitting..." : "Claim this listing"}
      </button>
    </form>
  );
}
