import type { Metadata } from "next";
import Link from "next/link";
import DealerForm from "@/components/dealers/DealerForm";
import { EMPTY_DEALER_FORM, getLocationOptions } from "@/lib/dealers/portal";

export const metadata: Metadata = {
  title: "Add Your Gold Dealership",
};

export default async function SubmitDealerPage() {
  const { countries, cities } = await getLocationOptions();

  return (
    <div className="mx-auto max-w-xl px-4 py-8 sm:px-6">
      <h1 className="font-display text-3xl font-bold text-foreground">Add your dealership</h1>
      <p className="mt-2 text-dark-400">
        List your business on XAUBase. Our team reviews new listings before they go live, and you can manage it
        from your{" "}
        <Link href="/dashboard" className="text-gold-500 hover:text-gold-400">
          dashboard
        </Link>{" "}
        afterwards.
      </p>
      <p className="mt-2 text-sm text-dark-400">
        Already listed? Find your business in the{" "}
        <Link href="/dealers" className="text-gold-500 hover:text-gold-400">
          directory
        </Link>{" "}
        and click <strong className="text-dark-200">Claim this listing</strong> instead.
      </p>

      <div className="mt-8">
        <DealerForm mode="create" initialValues={EMPTY_DEALER_FORM} countries={countries} cities={cities} />
      </div>
    </div>
  );
}
