import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/types/database";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabaseAdmin =
  url && key && url !== "https://your-project.supabase.co"
    ? createClient<Database>(url, key)
    : null;
