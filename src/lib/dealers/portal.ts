import { createClient } from "@/lib/supabase/server";

// Mirrors the field split enforced by update_my_dealer() in
// supabase/migrations/002_dealer_portal.sql.
export const INSTANT_FIELDS = ["website", "phone", "email", "address_line", "online_sales"] as const;
export const REVIEWED_FIELDS = ["name", "description", "specializations", "city_id", "requested_city", "logo_url"] as const;

export const FIELD_LABELS: Record<string, string> = {
  name: "Business name",
  description: "Description",
  specializations: "Specializations",
  city_id: "City",
  requested_city: "City (new)",
  logo_url: "Logo",
  website: "Website",
  phone: "Phone",
  email: "Email",
  address_line: "Address",
  online_sales: "Online sales",
};

export interface DealerFormValues {
  name: string;
  country_id: string;
  city_id: string;
  requested_city: string;
  website: string;
  phone: string;
  email: string;
  address_line: string;
  description: string;
  specializations: string[];
  online_sales: boolean;
  logo_url: string;
}

export const EMPTY_DEALER_FORM: DealerFormValues = {
  name: "",
  country_id: "",
  city_id: "",
  requested_city: "",
  website: "",
  phone: "",
  email: "",
  address_line: "",
  description: "",
  specializations: [],
  online_sales: false,
  logo_url: "",
};

export interface CountryOption {
  id: string;
  name: string;
}

export interface CityOption {
  id: string;
  name: string;
  country_id: string;
  state_province: string | null;
}

export type ActionResult<T = undefined> =
  | ({ ok: true } & (T extends undefined ? object : { data: T }))
  | { ok: false; error: string };

export async function getLocationOptions(): Promise<{ countries: CountryOption[]; cities: CityOption[] }> {
  const supabase = await createClient();
  if (!supabase) return { countries: [], cities: [] };

  const [{ data: countries }, { data: cities }] = await Promise.all([
    supabase.from("countries").select("id, name").order("name"),
    supabase.from("cities").select("id, name, country_id, state_province").order("name"),
  ]);

  return {
    countries: (countries as CountryOption[] | null) ?? [],
    cities: (cities as CityOption[] | null) ?? [],
  };
}

export async function isCurrentUserAdmin(): Promise<boolean> {
  const supabase = await createClient();
  if (!supabase) return false;
  const { data } = await supabase.rpc("is_admin");
  return data === true;
}
