"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { ActionResult, DealerFormValues } from "@/lib/dealers/portal";
import type { Json } from "@/lib/types/database";

function toPayload(values: DealerFormValues): Json {
  return {
    name: values.name,
    country_id: values.country_id,
    city_id: values.city_id,
    requested_city: values.city_id ? "" : values.requested_city,
    website: values.website,
    phone: values.phone,
    email: values.email,
    address_line: values.address_line,
    description: values.description,
    specializations: values.specializations,
    online_sales: values.online_sales,
    logo_url: values.logo_url,
  };
}

async function revalidateDealer(dealerId: string) {
  const supabase = await createClient();
  const { data } = await supabase!.from("dealers").select("slug").eq("id", dealerId).single();
  if (data?.slug) revalidatePath(`/dealer/${data.slug}`);
  revalidatePath("/dealers", "layout");
  revalidatePath("/");
  revalidatePath("/dashboard", "layout");
}

export async function submitDealer(values: DealerFormValues): Promise<ActionResult<{ id: string }>> {
  const supabase = await createClient();
  if (!supabase) return { ok: false, error: "Service unavailable" };

  const { data, error } = await supabase.rpc("submit_dealer", { p: toPayload(values) });
  if (error) return { ok: false, error: error.message };

  revalidatePath("/dashboard", "layout");
  return { ok: true, data: { id: data } };
}

export async function updateDealer(
  dealerId: string,
  values: DealerFormValues
): Promise<ActionResult<{ outcome: "saved" | "pending_review" | "no_changes" }>> {
  const supabase = await createClient();
  if (!supabase) return { ok: false, error: "Service unavailable" };

  const { data, error } = await supabase.rpc("update_my_dealer", {
    p_dealer_id: dealerId,
    p: toPayload(values),
  });
  if (error) return { ok: false, error: error.message };

  await revalidateDealer(dealerId);
  return { ok: true, data: { outcome: data } };
}

export async function withdrawChangeRequest(dealerId: string): Promise<ActionResult> {
  const supabase = await createClient();
  if (!supabase) return { ok: false, error: "Service unavailable" };

  const { error } = await supabase.rpc("withdraw_my_change_request", { p_dealer_id: dealerId });
  if (error) return { ok: false, error: error.message };

  revalidatePath("/dashboard", "layout");
  return { ok: true };
}

export async function claimDealer(
  dealerId: string,
  message: string
): Promise<ActionResult<{ outcome: "approved" | "pending" }>> {
  const supabase = await createClient();
  if (!supabase) return { ok: false, error: "Service unavailable" };

  const { data, error } = await supabase.rpc("claim_dealer", {
    p_dealer_id: dealerId,
    p_message: message || null,
  });
  if (error) return { ok: false, error: error.message };

  await revalidateDealer(dealerId);
  return { ok: true, data: { outcome: data } };
}
