import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GoldPriceBanner from "@/components/home/GoldPriceBanner";
import HeroSection from "@/components/home/HeroSection";
import FeaturedDealers from "@/components/home/FeaturedDealers";
import LatestNews from "@/components/home/LatestNews";
import CountryLinks from "@/components/home/CountryLinks";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 300;

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex min-h-screen flex-col">
      <Header user={user ? { id: user.id, email: user.email } : null} />
      <GoldPriceBanner />
      <main className="flex-1">
        <HeroSection />
        <FeaturedDealers />
        <CountryLinks />
        <LatestNews />
      </main>
      <Footer />
    </div>
  );
}
