"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { withdrawChangeRequest } from "@/app/(protected)/dashboard/actions";

export default function WithdrawChangesButton({ dealerId }: { dealerId: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() =>
        startTransition(async () => {
          await withdrawChangeRequest(dealerId);
          router.refresh();
        })
      }
      className="shrink-0 text-xs text-dark-400 hover:text-red-400 disabled:opacity-50"
    >
      {pending ? "Withdrawing..." : "Withdraw"}
    </button>
  );
}
