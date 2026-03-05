import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Shield, TrendingUp, Coins, Building2, Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Gold Investing Guide",
  description:
    "Learn everything about investing in gold. Guides on gold IRA, buying physical gold, gold ETFs, gold stocks, and more.",
};

const GUIDES = [
  {
    slug: "why-invest-in-gold",
    title: "Why Invest in Gold?",
    description: "Understanding gold as a store of value, inflation hedge, and portfolio diversifier.",
    icon: TrendingUp,
  },
  {
    slug: "how-to-buy-gold",
    title: "How to Buy Gold",
    description: "A complete guide to buying gold coins, bars, and bullion from trusted dealers.",
    icon: Coins,
  },
  {
    slug: "gold-ira",
    title: "Gold IRA Guide",
    description: "Everything you need to know about Self-Directed Gold IRAs and precious metals retirement accounts.",
    icon: Shield,
  },
  {
    slug: "physical-vs-paper-gold",
    title: "Physical Gold vs Paper Gold",
    description: "Compare physical bullion with gold ETFs, futures, and mining stocks.",
    icon: Scale,
  },
  {
    slug: "gold-storage",
    title: "Gold Storage Options",
    description: "Home storage, bank safe deposit boxes, and professional vault storage compared.",
    icon: Building2,
  },
  {
    slug: "gold-etfs-explained",
    title: "Gold ETFs Explained",
    description: "Understanding gold ETFs like GLD, IAU, and mining ETFs like GDX and GDXJ.",
    icon: BookOpen,
  },
];

export default function InvestingPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold text-foreground">Gold Investing Guides</h1>
      <p className="mt-2 text-dark-400">
        Everything you need to know about investing in gold and precious metals
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {GUIDES.map((guide) => {
          const Icon = guide.icon;
          return (
            <Link
              key={guide.slug}
              href={`/investing/${guide.slug}`}
              className="group rounded-lg border border-border bg-card p-6 transition-all hover:border-gold-600/50 hover:bg-card-hover"
            >
              <Icon className="h-8 w-8 text-gold-500" />
              <h2 className="mt-4 text-lg font-semibold text-foreground group-hover:text-gold-400">
                {guide.title}
              </h2>
              <p className="mt-2 text-sm text-dark-400">{guide.description}</p>
              <span className="mt-4 inline-block text-sm text-gold-500 group-hover:text-gold-400">
                Read Guide →
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
