"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Upload, X } from "lucide-react";
import { SPECIALIZATION_LABELS } from "@/lib/utils/constants";
import { createClient } from "@/lib/supabase/client";
import { submitDealer, updateDealer } from "@/app/(protected)/dashboard/actions";
import type { CityOption, CountryOption, DealerFormValues } from "@/lib/dealers/portal";
import type { DealerStatus } from "@/lib/types/database";

const OTHER_CITY = "__other";
const LOGO_TYPES = ["image/png", "image/jpeg", "image/webp"];
const LOGO_MAX_BYTES = 1024 * 1024;

const inputClass =
  "mt-1 w-full rounded-md border border-border bg-dark-800 px-3 py-2 text-sm text-foreground placeholder:text-dark-400 focus:border-gold-500 focus:outline-none disabled:opacity-60";

interface DealerFormProps {
  mode: "create" | "edit";
  dealerId?: string;
  status?: DealerStatus;
  initialValues: DealerFormValues;
  countries: CountryOption[];
  cities: CityOption[];
}

function ReviewTag({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <span className="ml-2 rounded bg-dark-700 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-dark-300">
      Reviewed
    </span>
  );
}

export default function DealerForm({ mode, dealerId, status, initialValues, countries, cities }: DealerFormProps) {
  const router = useRouter();
  const [values, setValues] = useState<DealerFormValues>(initialValues);
  const [cityChoice, setCityChoice] = useState(
    initialValues.city_id || (initialValues.requested_city ? OTHER_CITY : "")
  );
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [pending, startTransition] = useTransition();

  const isLive = mode === "edit" && status === "approved";
  const countryCities = useMemo(
    () => cities.filter((c) => c.country_id === values.country_id),
    [cities, values.country_id]
  );

  const set = <K extends keyof DealerFormValues>(key: K, value: DealerFormValues[K]) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const toggleSpec = (spec: string) =>
    set(
      "specializations",
      values.specializations.includes(spec)
        ? values.specializations.filter((s) => s !== spec)
        : [...values.specializations, spec]
    );

  const handleCityChoice = (choice: string) => {
    setCityChoice(choice);
    setValues((prev) => ({
      ...prev,
      city_id: choice === OTHER_CITY ? "" : choice,
      requested_city: choice === OTHER_CITY ? prev.requested_city : "",
    }));
  };

  const handleLogo = async (file: File | undefined) => {
    if (!file || !dealerId) return;
    setError("");
    if (!LOGO_TYPES.includes(file.type)) {
      setError("Logo must be a PNG, JPG or WebP image");
      return;
    }
    if (file.size > LOGO_MAX_BYTES) {
      setError("Logo must be 1 MB or smaller");
      return;
    }

    setUploading(true);
    const supabase = createClient();
    const ext = file.type.split("/")[1].replace("jpeg", "jpg");
    const path = `${dealerId}/${Date.now()}.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from("dealer-logos")
      .upload(path, file, { contentType: file.type, cacheControl: "31536000" });
    setUploading(false);

    if (uploadError) {
      setError(`Logo upload failed: ${uploadError.message}`);
      return;
    }
    set("logo_url", supabase.storage.from("dealer-logos").getPublicUrl(path).data.publicUrl);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!values.city_id && !values.requested_city.trim()) {
      setError("Please choose a city, or pick \"My city isn't listed\" and type it in");
      return;
    }

    startTransition(async () => {
      if (mode === "create") {
        const result = await submitDealer(values);
        if (!result.ok) {
          setError(result.error);
          return;
        }
        router.push(`/dashboard/listings/${result.data.id}?submitted=1`);
        return;
      }

      const result = await updateDealer(dealerId!, values);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      router.replace(`/dashboard/listings/${dealerId}?saved=${result.data.outcome}`);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="rounded-md border border-red-800 bg-red-900/30 p-3 text-sm text-red-400">{error}</div>
      )}

      {isLive && (
        <p className="rounded-md border border-border bg-dark-800 p-3 text-xs text-dark-300">
          Contact details update immediately. Fields marked <strong>Reviewed</strong> are checked by our team before
          they go live — your current listing stays up in the meantime.
        </p>
      )}

      <div>
        <label className="block text-sm font-medium text-dark-200">
          Business name *<ReviewTag show={isLive} />
        </label>
        <input
          type="text"
          required
          maxLength={120}
          value={values.name}
          onChange={(e) => set("name", e.target.value)}
          className={inputClass}
          placeholder="e.g., Gold Exchange Corp"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-dark-200">Country *</label>
          <select
            required
            disabled={isLive}
            value={values.country_id}
            onChange={(e) => {
              set("country_id", e.target.value);
              handleCityChoice("");
            }}
            className={inputClass}
          >
            <option value="">Select country</option>
            {countries.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          {isLive && <p className="mt-1 text-xs text-dark-400">Contact us to move a listing to another country.</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-dark-200">
            City *<ReviewTag show={isLive} />
          </label>
          <select
            required
            disabled={!values.country_id}
            value={cityChoice}
            onChange={(e) => handleCityChoice(e.target.value)}
            className={inputClass}
          >
            <option value="">Select city</option>
            {countryCities.map((c) => (
              <option key={c.id} value={c.id}>
                {c.state_province ? `${c.name}, ${c.state_province}` : c.name}
              </option>
            ))}
            <option value={OTHER_CITY}>My city isn&apos;t listed</option>
          </select>
          {cityChoice === OTHER_CITY && (
            <input
              type="text"
              required
              maxLength={100}
              value={values.requested_city}
              onChange={(e) => set("requested_city", e.target.value)}
              className={inputClass}
              placeholder="City name"
            />
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-dark-200">Street address</label>
        <input
          type="text"
          maxLength={300}
          value={values.address_line}
          onChange={(e) => set("address_line", e.target.value)}
          className={inputClass}
          placeholder="123 Main St, Suite 4"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-dark-200">Website</label>
        <input
          type="url"
          maxLength={300}
          value={values.website}
          onChange={(e) => set("website", e.target.value)}
          className={inputClass}
          placeholder="https://example.com"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-dark-200">Phone</label>
          <input
            type="tel"
            maxLength={40}
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
            className={inputClass}
            placeholder="+1-555-0100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-dark-200">Public email</label>
          <input
            type="email"
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            className={inputClass}
            placeholder="info@example.com"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-dark-200">
          Description<ReviewTag show={isLive} />
        </label>
        <textarea
          rows={5}
          maxLength={2000}
          value={values.description}
          onChange={(e) => set("description", e.target.value)}
          className={inputClass}
          placeholder="What you sell, how long you've been trading, what makes you different..."
        />
        <p className="mt-1 text-right text-xs text-dark-400">{values.description.length}/2000</p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-dark-200">
          Specializations<ReviewTag show={isLive} />
        </label>
        <div className="flex flex-wrap gap-2">
          {Object.entries(SPECIALIZATION_LABELS).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => toggleSpec(key)}
              className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                values.specializations.includes(key)
                  ? "border-gold-600 bg-gold-900/30 text-gold-400"
                  : "border-border text-dark-400 hover:border-dark-400"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <label className="flex cursor-pointer items-center gap-2">
        <input
          type="checkbox"
          checked={values.online_sales}
          onChange={(e) => set("online_sales", e.target.checked)}
          className="h-4 w-4 rounded border-border bg-dark-800 text-gold-600 focus:ring-gold-500"
        />
        <span className="text-sm text-dark-200">We sell online</span>
      </label>

      {mode === "edit" && (
        <div>
          <label className="mb-2 block text-sm font-medium text-dark-200">
            Logo<ReviewTag show={isLive} />
          </label>
          <div className="flex items-center gap-4">
            {values.logo_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={values.logo_url}
                alt="Logo preview"
                className="h-16 w-16 rounded-md border border-border bg-white object-contain p-1"
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-md border border-dashed border-border text-xs text-dark-400">
                None
              </div>
            )}
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-border bg-dark-800 px-3 py-1.5 text-sm text-dark-200 hover:bg-dark-700">
              <Upload className="h-4 w-4" />
              {uploading ? "Uploading..." : "Upload"}
              <input
                type="file"
                accept={LOGO_TYPES.join(",")}
                className="hidden"
                disabled={uploading}
                onChange={(e) => handleLogo(e.target.files?.[0])}
              />
            </label>
            {values.logo_url && (
              <button
                type="button"
                onClick={() => set("logo_url", "")}
                className="inline-flex items-center gap-1 text-sm text-dark-400 hover:text-red-400"
              >
                <X className="h-4 w-4" />
                Remove
              </button>
            )}
          </div>
          <p className="mt-1 text-xs text-dark-400">PNG, JPG or WebP, up to 1 MB. Square works best. Click Save changes to apply.</p>
        </div>
      )}

      <button
        type="submit"
        disabled={pending || uploading}
        className="w-full rounded-md bg-gold-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gold-500 disabled:opacity-50"
      >
        {pending ? "Saving..." : mode === "create" ? "Submit listing for review" : "Save changes"}
      </button>
    </form>
  );
}
