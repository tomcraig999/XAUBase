"use client";

import { useState } from "react";
import { SPECIALIZATION_LABELS } from "@/lib/utils/constants";

const COUNTRIES = [
  "United States", "United Kingdom", "Canada", "Australia", "Germany",
  "Switzerland", "UAE", "Singapore", "Hong Kong", "India", "South Africa",
  "Cayman Islands", "Argentina", "Brazil", "New Zealand", "Thailand",
  "Other",
];

export default function SubmitDealerPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    city: "",
    website: "",
    phone: "",
    email: "",
    description: "",
    specializations: [] as string[],
    onlineSales: false,
  });

  const handleSpecToggle = (spec: string) => {
    setFormData((prev) => ({
      ...prev,
      specializations: prev.specializations.includes(spec)
        ? prev.specializations.filter((s) => s !== spec)
        : [...prev.specializations, spec],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // In production, this would POST to /api/submit
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitted(true);
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center sm:px-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-900/30 border border-green-700">
          <span className="text-green-400 text-2xl">&#10003;</span>
        </div>
        <h1 className="mt-6 text-2xl font-bold text-foreground">Dealer Submitted!</h1>
        <p className="mt-3 text-dark-400">
          Thank you for submitting <strong className="text-foreground">{formData.name}</strong>.
          Our team will review your submission and approve it shortly.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({
              name: "", country: "", city: "", website: "", phone: "",
              email: "", description: "", specializations: [], onlineSales: false,
            });
          }}
          className="mt-6 rounded-md bg-gold-600 px-4 py-2 text-sm font-medium text-white hover:bg-gold-500"
        >
          Submit Another Dealer
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-8 sm:px-6">
      <h1 className="font-display text-3xl font-bold text-foreground">Submit a Gold Dealer</h1>
      <p className="mt-2 text-dark-400">
        Know a gold dealer that should be listed? Submit their details and our team will review it.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label className="block text-sm font-medium text-dark-200">Dealer Name *</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1 w-full rounded-md border border-border bg-dark-800 px-3 py-2 text-sm text-foreground focus:border-gold-500 focus:outline-none"
            placeholder="e.g., Gold Exchange Corp"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-dark-200">Country *</label>
            <select
              required
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              className="mt-1 w-full rounded-md border border-border bg-dark-800 px-3 py-2 text-sm text-foreground focus:border-gold-500 focus:outline-none"
            >
              <option value="">Select country</option>
              {COUNTRIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-dark-200">City *</label>
            <input
              type="text"
              required
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="mt-1 w-full rounded-md border border-border bg-dark-800 px-3 py-2 text-sm text-foreground focus:border-gold-500 focus:outline-none"
              placeholder="e.g., New York"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-dark-200">Website</label>
          <input
            type="url"
            value={formData.website}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            className="mt-1 w-full rounded-md border border-border bg-dark-800 px-3 py-2 text-sm text-foreground focus:border-gold-500 focus:outline-none"
            placeholder="https://example.com"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-dark-200">Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="mt-1 w-full rounded-md border border-border bg-dark-800 px-3 py-2 text-sm text-foreground focus:border-gold-500 focus:outline-none"
              placeholder="+1-555-0100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark-200">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-1 w-full rounded-md border border-border bg-dark-800 px-3 py-2 text-sm text-foreground focus:border-gold-500 focus:outline-none"
              placeholder="info@example.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-dark-200">Description</label>
          <textarea
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="mt-1 w-full rounded-md border border-border bg-dark-800 px-3 py-2 text-sm text-foreground focus:border-gold-500 focus:outline-none"
            placeholder="Brief description of the dealer..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-dark-200 mb-2">Specializations</label>
          <div className="flex flex-wrap gap-2">
            {Object.entries(SPECIALIZATION_LABELS).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => handleSpecToggle(key)}
                className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                  formData.specializations.includes(key)
                    ? "border-gold-600 bg-gold-900/30 text-gold-400"
                    : "border-border text-dark-400 hover:border-dark-400"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.onlineSales}
            onChange={(e) => setFormData({ ...formData, onlineSales: e.target.checked })}
            className="h-4 w-4 rounded border-border bg-dark-800 text-gold-600 focus:ring-gold-500"
          />
          <span className="text-sm text-dark-200">This dealer offers online sales</span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-gold-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gold-500 disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Dealer for Review"}
        </button>
      </form>
    </div>
  );
}
