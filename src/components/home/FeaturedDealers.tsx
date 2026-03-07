import Link from "next/link";
import { getFeaturedDealers } from "@/lib/supabase/queries";
import DealerCard from "@/components/dealers/DealerCard";

export default async function FeaturedDealers() {
  const dealers = await getFeaturedDealers(6);

  if (dealers.length === 0) return null;

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">
              Featured Gold Dealers
            </h2>
            <p className="mt-1 text-sm text-dark-400">
              Trusted gold dealers from around the world
            </p>
          </div>
          <Link
            href="/dealers"
            className="text-sm text-gold-500 hover:text-gold-400"
          >
            View All →
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {dealers.map((dealer) => (
            <DealerCard
              key={dealer.slug}
              name={dealer.name}
              slug={dealer.slug}
              cityName={dealer.city?.name}
              countryName={dealer.country?.name}
              specializations={dealer.specializations}
              onlineSales={dealer.online_sales}
              ratingAvg={dealer.rating_avg}
              reviewCount={dealer.review_count}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
