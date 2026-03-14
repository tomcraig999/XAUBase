import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PhysicalVsPaperGold, { physicalVsPaperGoldMeta } from "./PhysicalVsPaperGold";
import WhyInvestInGold, { whyInvestInGoldMeta } from "./WhyInvestInGold";

const GUIDES: Record<string, { title: string; content: string; customComponent?: boolean }> = {
  "why-invest-in-gold": {
    title: whyInvestInGoldMeta.title,
    content: "",
    customComponent: true,
  },
  "how-to-buy-gold": {
    title: "How to Buy Gold",
    content: `Buying gold is straightforward once you understand the options available. This guide covers the main ways to purchase gold.

Gold coins are popular among collectors and investors. Common investment coins include the American Gold Eagle, Canadian Gold Maple Leaf, South African Krugerrand, and Austrian Gold Philharmonic. These coins carry a small premium over the spot gold price.

Gold bars (or ingots) are available from 1 gram to 400 ounces. Larger bars typically have lower premiums per ounce. LBMA-approved bars from refiners like PAMP Suisse, Valcambi, and the Royal Canadian Mint are the most widely traded.

When buying gold, always purchase from reputable dealers. Check our dealer directory for trusted sellers worldwide. Look for dealers who are members of industry organizations and have verifiable track records.

Compare premiums over spot price between dealers. Premiums vary based on product type, quantity, and market conditions. Online dealers often offer lower premiums than local shops due to lower overhead.

Consider storage before purchasing. Options include home storage in a safe, bank safe deposit boxes, or professional vault storage offered by many dealers.`,
  },
  "gold-ira": {
    title: "Gold IRA Guide",
    content: `A Gold IRA (Individual Retirement Account) allows you to hold physical gold and other precious metals in a tax-advantaged retirement account.

A Self-Directed IRA is required to hold physical gold. Unlike traditional IRAs managed by banks or brokerages, a self-directed IRA gives you control over alternative investments including precious metals.

IRS-approved gold must be at least 99.5% pure (0.995 fineness). Accepted coins include American Gold Eagles, American Gold Buffalos, Canadian Gold Maple Leafs, and Australian Gold Kangaroos. Gold bars must be produced by an approved refiner.

A custodian is required to manage your Gold IRA. The custodian handles paperwork, reporting, and ensures IRS compliance. They also arrange for an approved depository to store your metals.

You can fund a Gold IRA through a rollover from an existing 401(k), traditional IRA, or other qualified retirement plan. This is typically a tax-free transfer when done correctly.

Contribution limits for Gold IRAs follow standard IRA limits. Be aware of fees including setup fees, annual custodian fees, and storage fees which vary by provider.`,
  },
  "physical-vs-paper-gold": {
    title: physicalVsPaperGoldMeta.title,
    content: "", // rendered by dedicated component
    customComponent: true,
  },
  "gold-storage": {
    title: "Gold Storage Options",
    content: `Proper storage is essential when investing in physical gold. Here are the main options available.

Home storage gives you immediate access to your gold. Invest in a quality safe that is fire-rated and preferably bolted to the floor. Keep your holdings discreet and consider a home security system. Home storage may not be covered by standard homeowner's insurance.

Bank safe deposit boxes offer institutional security. Costs range from $50-300+ per year depending on box size. Note that contents are not insured by the bank or FDIC - you'll need separate insurance. Access is limited to bank hours.

Professional vault storage through companies like BullionVault, Loomis, and Brink's provides the highest security with full insurance. Many gold dealers offer allocated storage where your specific bars and coins are segregated. Costs typically range from 0.12% to 0.5% of value annually.

Allocated vs. Unallocated storage: Allocated storage means specific bars are assigned to you. Unallocated storage is cheaper but your gold is pooled with other investors' holdings - in theory, you could lose your gold if the storage company goes bankrupt.

Consider diversifying storage locations across different vaults and jurisdictions for maximum security.`,
  },
  "gold-etfs-explained": {
    title: "Gold ETFs Explained",
    content: `Gold ETFs (Exchange-Traded Funds) provide a convenient way to gain exposure to gold without handling physical metal.

SPDR Gold Shares (GLD) is the largest gold ETF with over $50 billion in assets. Each share represents approximately 1/10th of an ounce of gold. It tracks the London gold price and stores physical gold in HSBC vaults in London.

iShares Gold Trust (IAU) is similar to GLD but with a lower expense ratio (0.25% vs 0.40%). Each share represents approximately 1/100th of an ounce. Its lower share price makes it more accessible for smaller investors.

VanEck Gold Miners ETF (GDX) holds shares of major gold mining companies like Newmont, Barrick Gold, and Franco-Nevada. It provides leveraged exposure to gold prices through mining operations.

VanEck Junior Gold Miners ETF (GDXJ) focuses on smaller, earlier-stage gold mining companies. It offers higher potential returns but with greater volatility and risk.

Aberdeen Physical Gold Shares (SGOL) stores its gold in Swiss vaults rather than London, offering geographical diversification. It has a competitive expense ratio of 0.17%.

When choosing a gold ETF, consider the expense ratio, tracking accuracy, liquidity, and whether you prefer physical gold backing or mining company exposure.`,
  },
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = GUIDES[slug];
  if (!guide) return { title: "Guide Not Found" };

  if (slug === "physical-vs-paper-gold") {
    return {
      title: physicalVsPaperGoldMeta.title,
      description: physicalVsPaperGoldMeta.description,
      alternates: {
        canonical: "https://www.xaubase.com/investing/physical-vs-paper-gold",
      },
    };
  }

  if (slug === "why-invest-in-gold") {
    return {
      title: whyInvestInGoldMeta.title,
      description: whyInvestInGoldMeta.description,
      alternates: {
        canonical: "https://www.xaubase.com/investing/why-invest-in-gold",
      },
    };
  }

  return {
    title: guide.title,
    description: guide.content.slice(0, 160),
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = GUIDES[slug];

  if (!guide) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-foreground">Guide Not Found</h1>
        <Link href="/investing" className="mt-4 inline-block text-gold-500">← Back to Guides</Link>
      </div>
    );
  }

  const paragraphs = guide.content.split("\n\n");

  return (
    <div className={`mx-auto px-4 py-8 sm:px-6 lg:px-8 ${guide.customComponent ? "max-w-4xl" : "max-w-3xl"}`}>
      <Link href="/investing" className="mb-6 inline-flex items-center gap-1 text-sm text-dark-400 hover:text-gold-400">
        <ArrowLeft className="h-4 w-4" />
        All Guides
      </Link>

      <article>
        <h1 className="font-display text-3xl font-bold text-foreground">{guide.title}</h1>
        <div className="mt-8 space-y-4">
          {guide.customComponent && slug === "physical-vs-paper-gold" ? (
            <PhysicalVsPaperGold />
          ) : guide.customComponent && slug === "why-invest-in-gold" ? (
            <WhyInvestInGold />
          ) : (
            paragraphs.map((p, i) => (
              <p key={i} className="leading-relaxed text-dark-300">{p}</p>
            ))
          )}
        </div>
      </article>

      <div className="mt-12 rounded-lg border border-gold-700/50 bg-gold-900/20 p-6">
        <p className="text-sm text-dark-300">
          <strong className="text-gold-400">Disclaimer:</strong> This content is for educational purposes only and does not constitute financial advice. Always consult with a qualified financial advisor before making investment decisions.
        </p>
      </div>
    </div>
  );
}
