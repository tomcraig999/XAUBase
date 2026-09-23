"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

type Target = "dealer" | "claim" | "change";

// Each button gets its own action so a missing submitter value can never
// turn into a rejection. The RPCs check is_admin() themselves.
export async function approveItem(formData: FormData) {
  await reviewItem(formData, true);
}

export async function rejectItem(formData: FormData) {
  await reviewItem(formData, false);
}

async function reviewItem(formData: FormData, approve: boolean) {
  const target = formData.get("target") as Target;
  const id = String(formData.get("id") ?? "");
  const note = String(formData.get("note") ?? "") || null;

  if (!id || !["dealer", "claim", "change"].includes(target)) throw new Error("Invalid review request");
  const supabase = await createClient();
  if (!supabase) throw new Error("Service unavailable");

  const { error } =
    target === "dealer"
      ? await supabase.rpc("admin_review_dealer", { p_dealer_id: id, p_approve: approve, p_note: note })
      : target === "claim"
        ? await supabase.rpc("admin_review_claim", { p_claim_id: id, p_approve: approve, p_note: note })
        : await supabase.rpc("admin_review_change", { p_request_id: id, p_approve: approve, p_note: note });

  if (error) throw new Error(error.message);

  revalidatePath("/admin", "layout");
  revalidatePath("/dealers", "layout");
  revalidatePath("/dealer/[slug]", "page");
  revalidatePath("/");
}
