import Link from "next/link";

export const howToBuyGoldMeta = {
  title: "How to Buy Gold: Complete Beginner's Guide (2026)",
  description:
    "How to buy gold step by step — coins, bars, ETFs, IRAs and online dealers compared. Learn where to buy, what to avoid, how much to pay, storage options and tax rules. Updated for 2026 with current prices above $5,000/oz.",
};

function SchemaMarkup() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Buy Gold: Complete Beginner's Guide",
    description: howToBuyGoldMeta.description,
    author: {
      "@type": "Organization",
      name: "XAUBase",
      url: "https://www.xaubase.com",
    },
    publisher: {
      "@type": "Organization",
      name: "XAUBase",
      url: "https://www.xaubase.com",
      logo: {
        "@type": "ImageObject",
        url: "https://www.xaubase.com/logo.png",
      },
    },
    datePublished: "2025-06-15",
    dateModified: "2026-03-14",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://www.xaubase.com/investing/how-to-buy-gold",
    },
    keywords:
      "how to buy gold, buy gold online, gold coins, gold bars, gold ETF, gold IRA, gold dealer, buy physical gold, gold bullion, gold investment",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the best way to buy gold for beginners?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The best way for beginners to buy gold is to purchase 1 oz gold coins (such as the American Gold Eagle, Canadian Gold Maple Leaf or British Gold Britannia) from a reputable online dealer. Coins are easy to verify, highly liquid, widely recognised and available in affordable sizes. Start with a well-known dealer, compare premiums to the spot price, and choose insured shipping. Once comfortable, you can diversify into gold bars for lower premiums per ounce.",
        },
      },
      {
        "@type": "Question",
        name: "How much does it cost to buy gold?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The cost of gold depends on the spot price (currently above $5,000 per ounce in 2026) plus a dealer premium. Premiums vary by product: gold bars typically carry 1-5% over spot, 1 oz coins 3-7%, and fractional coins 7-15%. You do not need to buy a full ounce — fractional coins (1/10 oz, 1/4 oz, 1/2 oz) and small bars (1g, 5g, 10g) allow you to start with as little as $100-500. Additional costs may include shipping ($15-50), insurance, and sales tax depending on your state or country.",
        },
      },
      {
        "@type": "Question",
        name: "Where is the safest place to buy gold?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The safest places to buy gold are established online dealers with verifiable track records, industry memberships and transparent pricing. Look for dealers who are members of the Professional Numismatists Guild (PNG), Industry Council for Tangible Assets (ICTA) or the London Bullion Market Association (LBMA). Major reputable dealers include APMEX, JM Bullion, SD Bullion, BullionVault and The Royal Mint. Avoid eBay, social media sellers, and any dealer who pressures you with high-pressure sales tactics.",
        },
      },
      {
        "@type": "Question",
        name: "Should I buy gold coins or gold bars?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Gold coins are better for beginners and smaller purchases because they are easy to authenticate, highly liquid, and available in fractional sizes. Government-issued coins (Eagles, Maple Leafs, Britannias) carry legal tender status and are widely recognised globally. Gold bars are better for larger purchases ($10,000+) because they carry lower premiums per ounce — typically 1-3% vs 3-7% for coins. Many experienced investors hold both: coins for liquidity and flexibility, bars for cost-efficient bulk storage.",
        },
      },
      {
        "@type": "Question",
        name: "Is it better to buy gold online or from a local dealer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Online dealers typically offer lower premiums (1-5% lower than local shops) due to lower overhead costs, wider selection, and transparent pricing that allows easy comparison. Local dealers offer the advantage of no shipping wait, the ability to inspect products in person, and no shipping risk. For most buyers, online dealers provide better value. However, local dealers are useful for small purchases, selling gold quickly, or if you prefer face-to-face transactions.",
        },
      },
      {
        "@type": "Question",
        name: "Do I have to pay tax when I buy gold?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Tax on gold purchases varies significantly by jurisdiction. In the US, many states exempt gold and silver bullion from sales tax (including Texas, Florida, and New Hampshire), but some states still charge it. When you sell gold at a profit, you owe capital gains tax — physical gold is taxed as a collectible at up to 28% federally. In the UK, gold Sovereign and Britannia coins are exempt from both VAT and Capital Gains Tax. In the EU, investment gold is VAT-exempt under EU Directive 98/80/EC. Always check your local tax rules before buying.",
        },
      },
      {
        "@type": "Question",
        name: "How do I know if gold is real when buying?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Buy only from reputable dealers to minimise counterfeiting risk. Government-minted coins and LBMA-accredited bars from refiners like PAMP Suisse, Valcambi, and the Royal Canadian Mint include security features such as serial numbers, assay certificates, micro-engraving and tamper-evident packaging. You can verify gold at home using a precision scale (gold is very dense at 19.3 g/cm3), a neodymium magnet test (gold is not magnetic), or a Sigma Metalytics Precious Metal Verifier. For large purchases, consider independent assay testing.",
        },
      },
      {
        "@type": "Question",
        name: "How do I store gold after buying it?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You have three main storage options: home storage in a quality safe (bolted, fire-rated, insured separately on your homeowner's policy), a bank safe deposit box ($50-300/year but not FDIC-insured), or professional vault storage through companies like BullionVault, Brink's or Loomis (0.12-0.5% of value annually, fully insured). For holdings under $50,000, a home safe is practical. For larger holdings, professional allocated vault storage provides the best combination of security and insurance. Consider splitting storage across multiple locations for diversification.",
        },
      },
      {
        "@type": "Question",
        name: "What is the minimum amount of gold I can buy?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can buy gold in very small quantities. The smallest common options are 1 gram gold bars (around $60-80 at current prices), 1/10 oz gold coins like the American Gold Eagle (around $550-600), or fractional gold through platforms like BullionVault where you can buy as little as 1 gram. However, smaller sizes carry higher premiums as a percentage of the gold value. For the best value, aim to buy at least 1 oz at a time if your budget allows.",
        },
      },
      {
        "@type": "Question",
        name: "Is now a good time to buy gold in 2026?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Gold has reached new all-time highs above $5,000 per ounce in 2026, driven by central bank buying, persistent inflation, geopolitical instability and de-dollarisation trends. While the price is high historically, the fundamental drivers remain strong. Most advisors recommend dollar-cost averaging — buying a fixed amount regularly — rather than trying to time the market. If you have no gold exposure, starting a position makes sense regardless of the current price, as gold serves as portfolio insurance rather than a speculative trade.",
        },
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Buy Gold: Step-by-Step Guide",
    description:
      "A complete step-by-step guide to buying gold for the first time, from choosing a product to securing storage.",
    totalTime: "PT1H",
    estimatedCost: {
      "@type": "MonetaryAmount",
      currency: "USD",
      value: "500-5000",
    },
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Decide what type of gold to buy",
        text: "Choose between physical gold (coins, bars), paper gold (ETFs, funds), or a Gold IRA. Physical gold is best for long-term wealth preservation. ETFs are best for trading. Gold IRAs offer tax advantages for retirement savings.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Set your budget and allocation",
        text: "Most financial advisors recommend allocating 5-15% of your portfolio to gold. Determine how much you want to invest and whether you will buy all at once or dollar-cost average over time.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Choose a reputable dealer",
        text: "Select a dealer with industry memberships (PNG, ICTA, LBMA), verified reviews, transparent pricing, and a track record of at least 5 years. Compare premiums over spot price across multiple dealers.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Select your gold products",
        text: "For beginners, start with well-known government-issued coins (American Gold Eagle, Canadian Maple Leaf, British Britannia) or LBMA-accredited bars from PAMP Suisse, Valcambi, or the Royal Canadian Mint.",
      },
      {
        "@type": "HowToStep",
        position: 5,
        name: "Compare premiums and total costs",
        text: "Calculate the total cost including the gold spot price, dealer premium, shipping, insurance, and any applicable sales tax. Lower premiums generally mean better value. Larger purchases typically get lower premiums per ounce.",
      },
      {
        "@type": "HowToStep",
        position: 6,
        name: "Place your order and arrange payment",
        text: "Most online dealers accept bank wire, credit card (higher fees), check, and sometimes cryptocurrency. Bank wire typically gets the lowest price. Lock in the price at the time of order — most dealers hold the spot price for a limited window.",
      },
      {
        "@type": "HowToStep",
        position: 7,
        name: "Arrange secure storage",
        text: "Before your gold arrives, decide on storage: a quality home safe, bank safe deposit box, or professional vault storage. Ensure you have adequate insurance coverage for your holdings.",
      },
      {
        "@type": "HowToStep",
        position: 8,
        name: "Verify your gold upon delivery",
        text: "When your gold arrives, verify the weight using a precision scale, check for proper hallmarks and serial numbers, and confirm tamper-evident packaging is intact. Keep all receipts and certificates of authenticity for insurance and tax purposes.",
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.xaubase.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Investing Guides",
        item: "https://www.xaubase.com/investing",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "How to Buy Gold",
        item: "https://www.xaubase.com/investing/how-to-buy-gold",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}

export default function HowToBuyGold() {
  const prose = "leading-relaxed text-dark-300";
  const h2 = "text-2xl font-bold text-foreground mt-12 mb-4 scroll-mt-20";
  const h3 = "text-xl font-semibold text-foreground mt-8 mb-3";
  const tableHead = "px-4 py-3 text-left text-sm font-semibold text-gold-400";
  const tableCell = "px-4 py-3 text-sm text-dark-300";
  const tableRow = "border-b border-dark-700";

  return (
    <>
      <SchemaMarkup />

      {/* Table of Contents */}
      <nav className="mb-10 rounded-lg border border-dark-700 bg-dark-900/50 p-6">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-gold-400">
          Table of Contents
        </p>
        <ol className="space-y-2 text-sm">
          {[
            ["ways-to-buy-gold", "7 Ways to Buy Gold"],
            ["coins-vs-bars", "Gold Coins vs Gold Bars"],
            ["where-to-buy", "Where to Buy Gold (Online vs Local)"],
            ["how-to-choose-dealer", "How to Choose a Reputable Dealer"],
            ["premiums-costs", "Understanding Premiums & Total Costs"],
            ["step-by-step", "Step-by-Step: Your First Gold Purchase"],
            ["how-much", "How Much Gold Should You Buy?"],
            ["storage", "Gold Storage Options Compared"],
            ["verify-authenticity", "How to Verify Gold Is Real"],
            ["tax-rules", "Tax Rules When Buying & Selling Gold"],
            ["mistakes", "9 Mistakes to Avoid When Buying Gold"],
            ["faq", "Frequently Asked Questions"],
          ].map(([id, label], i) => (
            <li key={id}>
              <a href={`#${id}`} className="text-dark-300 transition-colors hover:text-gold-400">
                {i + 1}. {label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* Introduction */}
      <p className={prose}>
        Gold has been the ultimate store of value for over 5,000 years. With the price surpassing{" "}
        <strong className="text-foreground">$5,000 per ounce in 2026</strong>, interest in buying
        gold has never been higher &mdash; yet many first-time buyers feel overwhelmed by the
        options, jargon and potential pitfalls.
      </p>
      <p className={`${prose} mt-4`}>
        This guide cuts through the noise. Whether you want to buy your first gold coin, build a
        position through an ETF, or set up a tax-advantaged Gold IRA, you&apos;ll find everything
        you need here: what to buy, where to buy it, how much to pay, how to store it, and the
        costly mistakes to avoid.
      </p>

      {/* Section 1: 7 Ways to Buy Gold */}
      <h2 id="ways-to-buy-gold" className={h2}>1. 7 Ways to Buy Gold</h2>

      <p className={prose}>
        There is no single &ldquo;best&rdquo; way to buy gold &mdash; the right choice depends on
        your goals, budget and experience level. Here are the seven main options:
      </p>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full border-collapse border border-dark-700 text-left">
          <thead className="bg-dark-800">
            <tr>
              <th className={tableHead}>Method</th>
              <th className={tableHead}>Best For</th>
              <th className={tableHead}>Min. Investment</th>
              <th className={tableHead}>Premium</th>
              <th className={tableHead}>Counterparty Risk</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Gold Coins", "Beginners, collectors", "$250+ (1/10 oz)", "3-7%", "None (physical)"],
              ["Gold Bars", "Larger purchases", "$500+ (10g bar)", "1-5%", "None (physical)"],
              ["Gold ETFs (GLD, IAU)", "Active traders", "$50+ (1 share)", "0.17-0.40%/yr", "Fund issuer"],
              ["Gold Mining Stocks", "Growth-oriented", "$10+ (1 share)", "Market price", "Company risk"],
              ["Gold IRA", "Retirement savings", "$5,000+ typical", "3-7% + fees", "Custodian"],
              ["Digital / Fractional Gold", "Micro-investing", "$1+", "0.5-2%", "Platform"],
              ["Gold Futures & Options", "Experienced traders", "$5,000+ margin", "Spread", "Exchange / broker"],
            ].map(([method, best, min, premium, risk]) => (
              <tr key={method} className={tableRow}>
                <td className={`${tableCell} font-medium text-foreground`}>{method}</td>
                <td className={tableCell}>{best}</td>
                <td className={tableCell}>{min}</td>
                <td className={tableCell}>{premium}</td>
                <td className={tableCell}>{risk}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className={h3}>Physical Gold (Coins & Bars)</h3>
      <p className={prose}>
        Physical gold means you own actual metal you can hold in your hand. It has{" "}
        <strong className="text-foreground">zero counterparty risk</strong> &mdash; its value
        depends on no bank, company or government. This makes it the preferred choice for
        long-term wealth preservation and crisis protection. The trade-off is higher premiums,
        storage costs and lower liquidity compared to paper alternatives.
      </p>

      <h3 className={h3}>Gold ETFs & Funds</h3>
      <p className={prose}>
        Exchange-traded funds like SPDR Gold Shares (GLD) and iShares Gold Trust (IAU) let you
        gain gold price exposure through your brokerage account. They are liquid, easy to trade
        and carry low annual fees (0.17-0.40%). However, you do not own the underlying metal and
        cannot take delivery. For a detailed comparison, see our{" "}
        <Link href="/investing/physical-vs-paper-gold" className="text-gold-400 hover:underline">
          Physical vs Paper Gold guide
        </Link>.
      </p>

      <h3 className={h3}>Gold IRAs</h3>
      <p className={prose}>
        A Gold IRA lets you hold IRS-approved physical gold in a tax-advantaged retirement account.
        You get the benefits of physical ownership with the tax benefits of an IRA. The downsides
        are higher fees (custodian, storage, setup) and less liquidity. See our complete{" "}
        <Link href="/investing/gold-ira" className="text-gold-400 hover:underline">
          Gold IRA Guide
        </Link>{" "}
        for details.
      </p>

      <h3 className={h3}>Digital & Fractional Gold</h3>
      <p className={prose}>
        Platforms like BullionVault, Goldmoney and some banking apps let you buy fractional
        ownership of gold stored in professional vaults. You can start with as little as $1-10.
        This is convenient for dollar-cost averaging but you depend on the platform&apos;s
        solvency and you typically cannot take physical delivery of very small amounts.
      </p>

      {/* Section 2: Coins vs Bars */}
      <h2 id="coins-vs-bars" className={h2}>2. Gold Coins vs Gold Bars</h2>

      <p className={prose}>
        This is the most common decision for physical gold buyers. Both are excellent &mdash; but
        they serve different purposes.
      </p>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full border-collapse border border-dark-700 text-left">
          <thead className="bg-dark-800">
            <tr>
              <th className={tableHead}>Factor</th>
              <th className={tableHead}>Gold Coins</th>
              <th className={tableHead}>Gold Bars</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Premium over spot", "3-7% (1 oz), 7-15% (fractional)", "1-3% (1 oz+), <1% (kilo/400 oz)"],
              ["Liquidity", "Very high &mdash; recognised worldwide", "High for LBMA bars, lower for generic"],
              ["Authentication", "Easy &mdash; govt security features", "Requires assay cert or verification"],
              ["Sizes available", "1/10 oz, 1/4 oz, 1/2 oz, 1 oz", "1g, 5g, 10g, 1 oz, 100g, 1 kg, 400 oz"],
              ["Divisibility", "Excellent &mdash; sell individual coins", "Must sell entire bar"],
              ["Tax benefits", "Some coins are CGT-free (UK)", "No special exemptions typically"],
              ["Collectible value", "Some coins appreciate beyond gold value", "Strictly bullion value only"],
              ["Best for", "Beginners, smaller buyers, liquidity", "Bulk purchases, lowest cost per ounce"],
            ].map(([factor, coins, bars]) => (
              <tr key={factor} className={tableRow}>
                <td className={`${tableCell} font-medium text-foreground`}>{factor}</td>
                <td className={tableCell} dangerouslySetInnerHTML={{ __html: coins }} />
                <td className={tableCell} dangerouslySetInnerHTML={{ __html: bars }} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className={h3}>Most Popular Gold Coins</h3>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {[
          {
            name: "American Gold Eagle",
            purity: "91.67% (22K)",
            origin: "US Mint",
            note: "Most traded coin in the US. IRA-eligible. Contains 1 oz of pure gold despite being 22K (total weight is higher).",
          },
          {
            name: "Canadian Gold Maple Leaf",
            purity: "99.99% (24K)",
            origin: "Royal Canadian Mint",
            note: "Purest major gold coin. Advanced security features including micro-engraving and DNA anti-counterfeiting.",
          },
          {
            name: "British Gold Britannia",
            purity: "99.99% (24K)",
            origin: "The Royal Mint",
            note: "CGT-free in the UK. VAT-free as investment gold. One of the most tax-efficient gold investments.",
          },
          {
            name: "Austrian Gold Philharmonic",
            purity: "99.99% (24K)",
            origin: "Austrian Mint",
            note: "Europe's best-selling gold coin. Denominated in euros. Widely available and recognised globally.",
          },
          {
            name: "South African Krugerrand",
            purity: "91.67% (22K)",
            origin: "SA Mint",
            note: "The original modern gold bullion coin (since 1967). No face value but legal tender in South Africa. Often lower premiums.",
          },
          {
            name: "Australian Gold Kangaroo",
            purity: "99.99% (24K)",
            origin: "Perth Mint",
            note: "New design each year, making older vintages collectible. IRA-eligible. Highly liquid in Asia-Pacific markets.",
          },
        ].map((coin) => (
          <div
            key={coin.name}
            className="rounded-lg border border-dark-700 bg-dark-900/50 p-4"
          >
            <h4 className="font-semibold text-foreground">{coin.name}</h4>
            <p className="mt-1 text-xs text-gold-400">
              {coin.purity} &bull; {coin.origin}
            </p>
            <p className="mt-2 text-sm text-dark-300">{coin.note}</p>
          </div>
        ))}
      </div>

      <h3 className={h3}>Most Popular Gold Bars</h3>
      <p className={prose}>
        For bars, stick with <strong className="text-foreground">LBMA-accredited refiners</strong>.
        The most trusted names are PAMP Suisse (known for the Lady Fortuna design), Valcambi,
        the Royal Canadian Mint, Argor-Heraeus, Metalor and Heraeus. LBMA accreditation means the
        refiner meets strict quality standards and the bars are accepted worldwide. Generic or
        unbranded bars carry lower premiums but are harder to resell.
      </p>

      {/* Section 3: Where to Buy */}
      <h2 id="where-to-buy" className={h2}>3. Where to Buy Gold (Online vs Local)</h2>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full border-collapse border border-dark-700 text-left">
          <thead className="bg-dark-800">
            <tr>
              <th className={tableHead}>Channel</th>
              <th className={tableHead}>Pros</th>
              <th className={tableHead}>Cons</th>
              <th className={tableHead}>Typical Premium</th>
            </tr>
          </thead>
          <tbody>
            {[
              [
                "Online Dealers",
                "Lowest premiums, widest selection, easy comparison, transparent pricing",
                "Shipping wait (3-10 days), can't inspect before buying",
                "2-5% over spot",
              ],
              [
                "Local Coin Shops",
                "Immediate possession, inspect before buying, build a relationship, no shipping risk",
                "Higher premiums, limited inventory, less transparency",
                "5-10% over spot",
              ],
              [
                "Government Mints (Direct)",
                "Guaranteed authentic, collectible/proof editions",
                "Highest premiums, limited to that country's products",
                "5-15% over spot",
              ],
              [
                "Banks",
                "Trusted institution, some offer allocated storage",
                "Very limited selection, high premiums, not available at all banks",
                "8-15% over spot",
              ],
              [
                "Peer-to-Peer / Auctions",
                "Potentially below-market prices",
                "High counterfeit risk, no guarantees, no recourse",
                "Variable",
              ],
            ].map(([channel, pros, cons, premium]) => (
              <tr key={channel} className={tableRow}>
                <td className={`${tableCell} font-medium text-foreground whitespace-nowrap`}>{channel}</td>
                <td className={tableCell}>{pros}</td>
                <td className={tableCell}>{cons}</td>
                <td className={`${tableCell} whitespace-nowrap`}>{premium}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className={`${prose} mt-6`}>
        <strong className="text-foreground">Our recommendation:</strong> For most buyers, online
        dealers offer the best combination of low premiums, wide selection and convenience. Browse
        our{" "}
        <Link href="/dealers" className="text-gold-400 hover:underline">
          worldwide gold dealer directory
        </Link>{" "}
        to find trusted dealers in your area.
      </p>

      {/* Section 4: How to Choose a Dealer */}
      <h2 id="how-to-choose-dealer" className={h2}>4. How to Choose a Reputable Dealer</h2>

      <p className={prose}>
        The gold dealer you choose matters more than the specific product you buy. A bad dealer can
        overcharge you, sell counterfeit products, or disappear with your money. Here is a
        checklist for vetting any dealer:
      </p>

      <div className="mt-6 space-y-3">
        {[
          {
            title: "Industry Memberships",
            detail: "Look for membership in the Professional Numismatists Guild (PNG), Industry Council for Tangible Assets (ICTA), American Numismatic Association (ANA), or LBMA. These require background checks, adherence to a code of ethics and arbitration for disputes.",
          },
          {
            title: "Track Record",
            detail: "Choose dealers with at least 5-10 years in business. Check their Better Business Bureau (BBB) rating, Trustpilot reviews, and Google reviews. Be wary of dealers with only recent, overwhelmingly positive reviews (these may be manufactured).",
          },
          {
            title: "Transparent Pricing",
            detail: "Reputable dealers show the spot price and their premium separately. If a dealer only shows a total price without referencing spot, it is harder to compare value. Use our live gold price page as a reference.",
          },
          {
            title: "Buyback Policy",
            detail: "Good dealers will buy back what they sell, typically at 1-2% below spot. A dealer who will not buy back their own products is a red flag.",
          },
          {
            title: "Secure Shipping & Insurance",
            detail: "The dealer should ship via insured, tracked carriers. Products should arrive in tamper-evident packaging. Most reputable dealers include insurance in their shipping fee.",
          },
          {
            title: "No High-Pressure Sales",
            detail: "Any dealer who uses urgency tactics ('prices are going up tomorrow!'), pushes overpriced numismatic coins on investment buyers, or calls you repeatedly after an inquiry should be avoided.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-lg border border-dark-700 bg-dark-900/50 p-4"
          >
            <h4 className="font-semibold text-foreground">{item.title}</h4>
            <p className="mt-1 text-sm text-dark-300">{item.detail}</p>
          </div>
        ))}
      </div>

      {/* Section 5: Premiums & Costs */}
      <h2 id="premiums-costs" className={h2}>5. Understanding Premiums & Total Costs</h2>

      <p className={prose}>
        The price you pay for gold is always more than the &ldquo;spot price&rdquo; quoted on
        financial sites. Understanding the full cost breakdown prevents overpaying.
      </p>

      <h3 className={h3}>What Is the Spot Price?</h3>
      <p className={prose}>
        The spot price is the current market price for one troy ounce of gold, set by futures
        markets (primarily COMEX) and the LBMA Gold Price. You can track it in real time on our{" "}
        <Link href="/prices" className="text-gold-400 hover:underline">
          live gold prices page
        </Link>. The spot price is a wholesale benchmark &mdash; no dealer sells at exactly spot.
      </p>

      <h3 className={h3}>What Is a Premium?</h3>
      <p className={prose}>
        The premium is the amount above spot price that you pay. It covers the dealer&apos;s costs
        (manufacturing, refining, distribution, profit). Premiums are expressed as a percentage or
        dollar amount over spot.
      </p>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full border-collapse border border-dark-700 text-left">
          <thead className="bg-dark-800">
            <tr>
              <th className={tableHead}>Product</th>
              <th className={tableHead}>Typical Premium</th>
              <th className={tableHead}>Example Cost (at $5,000 spot)</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["1 oz Gold Bar (LBMA)", "1-3%", "$5,050 - $5,150"],
              ["1 oz Gold Eagle / Maple Leaf", "3-7%", "$5,150 - $5,350"],
              ["1/2 oz Gold Coin", "5-8%", "$2,625 - $2,700 (for 1/2 oz)"],
              ["1/4 oz Gold Coin", "7-12%", "$1,338 - $1,400 (for 1/4 oz)"],
              ["1/10 oz Gold Coin", "10-18%", "$550 - $590 (for 1/10 oz)"],
              ["1 gram Gold Bar", "15-30%", "$75 - $85"],
              ["1 kg Gold Bar", "0.5-2%", "$161,000 - $163,500"],
            ].map(([product, premium, example]) => (
              <tr key={product} className={tableRow}>
                <td className={`${tableCell} font-medium text-foreground`}>{product}</td>
                <td className={tableCell}>{premium}</td>
                <td className={tableCell}>{example}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className={h3}>Total Cost Checklist</h3>
      <p className={prose}>
        Before completing any purchase, add up all costs:
      </p>
      <ul className="mt-3 space-y-2 text-dark-300">
        {[
          "Gold spot price + dealer premium = product price",
          "Shipping & insurance (typically $15-50 per order, often free above $2,000-$3,000)",
          "Sales tax (varies by state/country — many US states exempt bullion)",
          "Payment method fee (credit card adds 2-4%, bank wire is usually free or $10-30)",
          "Storage costs if using a vault or safe deposit box",
        ].map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" />
            <span className="text-sm">{item}</span>
          </li>
        ))}
      </ul>

      {/* Section 6: Step by Step */}
      <h2 id="step-by-step" className={h2}>6. Step-by-Step: Your First Gold Purchase</h2>

      <div className="mt-6 space-y-6">
        {[
          {
            step: 1,
            title: "Define Your Goal",
            detail: "Are you buying gold for long-term wealth preservation, portfolio diversification, retirement (IRA), or speculation? Your goal determines the best product and method. Long-term holders should buy physical. Active traders should use ETFs. Retirement savers should consider a Gold IRA.",
          },
          {
            step: 2,
            title: "Set Your Budget",
            detail: "Decide how much to invest. Most advisors recommend starting with 5-10% of your investment portfolio. You do not need to buy a full ounce — fractional coins and small bars make gold accessible at almost any budget. A 1/10 oz American Gold Eagle costs around $550-600.",
          },
          {
            step: 3,
            title: "Choose Your Products",
            detail: "For your first purchase, stick with well-known products: 1 oz American Gold Eagles, Canadian Maple Leafs, or PAMP Suisse bars. These are the most liquid, widely recognised and easiest to resell. Avoid rare/numismatic coins — they carry huge premiums and require specialist knowledge.",
          },
          {
            step: 4,
            title: "Compare Dealers & Premiums",
            detail: "Check at least 3 dealers. Compare the total cost (spot + premium + shipping + tax) for the same product. A difference of 2-3% might seem small, but on a $5,000 purchase that's $100-150. Use our dealer directory to find reputable options.",
          },
          {
            step: 5,
            title: "Place Your Order",
            detail: "Pay by bank wire for the lowest price (saves 2-4% vs credit card). Most dealers lock in the spot price for 24-48 hours after you place the order. You typically have 3-5 business days to send payment by wire. The dealer ships once payment clears.",
          },
          {
            step: 6,
            title: "Arrange Storage",
            detail: "Have your storage ready before your gold arrives. A bolted, fire-rated home safe works for smaller holdings. For larger amounts, set up a professional vault account with allocated storage. Get insurance coverage in place.",
          },
          {
            step: 7,
            title: "Verify & Document",
            detail: "When your gold arrives, verify weight, appearance and packaging integrity. Photograph each item with serial numbers visible. Store receipts, certificates and a detailed inventory list in a separate location from the gold itself — you'll need these for insurance claims and tax reporting.",
          },
          {
            step: 8,
            title: "Set Up Ongoing Purchases",
            detail: "Consider dollar-cost averaging — buying a fixed dollar amount each month or quarter. This removes the stress of timing the market and builds your position steadily. Many online dealers offer automatic purchase programs.",
          },
        ].map((item) => (
          <div key={item.step} className="flex gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold-500/20 text-sm font-bold text-gold-400">
              {item.step}
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{item.title}</h3>
              <p className="mt-1 text-sm text-dark-300">{item.detail}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Section 7: How Much */}
      <h2 id="how-much" className={h2}>7. How Much Gold Should You Buy?</h2>

      <p className={prose}>
        There is no one-size-fits-all answer, but decades of portfolio research and financial
        advisor consensus point to clear guidelines:
      </p>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full border-collapse border border-dark-700 text-left">
          <thead className="bg-dark-800">
            <tr>
              <th className={tableHead}>Investor Profile</th>
              <th className={tableHead}>Recommended Allocation</th>
              <th className={tableHead}>Rationale</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Conservative / Retiree", "10-15%", "Higher allocation for capital preservation and inflation protection"],
              ["Balanced / Moderate", "5-10%", "Standard diversification and insurance against tail risks"],
              ["Aggressive / Growth", "3-5%", "Small hedge while prioritising growth assets"],
              ["Very concerned about economic risk", "15-25%", "Maximum insurance — covers hyperinflation, currency collapse scenarios"],
              ["First-time buyer", "Start with 5%", "Begin with a meaningful but not overwhelming position"],
            ].map(([profile, allocation, rationale]) => (
              <tr key={profile} className={tableRow}>
                <td className={`${tableCell} font-medium text-foreground`}>{profile}</td>
                <td className={`${tableCell} text-gold-400 font-semibold`}>{allocation}</td>
                <td className={tableCell}>{rationale}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className={`${prose} mt-6`}>
        For more detail on optimal allocation by age and life stage, see our{" "}
        <Link href="/investing/why-invest-in-gold" className="text-gold-400 hover:underline">
          Why Invest in Gold guide
        </Link>.
      </p>

      {/* Section 8: Storage */}
      <h2 id="storage" className={h2}>8. Gold Storage Options Compared</h2>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full border-collapse border border-dark-700 text-left">
          <thead className="bg-dark-800">
            <tr>
              <th className={tableHead}>Option</th>
              <th className={tableHead}>Cost</th>
              <th className={tableHead}>Security</th>
              <th className={tableHead}>Insurance</th>
              <th className={tableHead}>Access</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Home Safe", "$200 - $2,000+ (one-time)", "Moderate (depends on safe quality)", "Add to homeowner's policy or buy separate rider", "24/7 immediate"],
              ["Bank Safe Deposit Box", "$50 - $300/year", "High (bank vault)", "NOT covered by bank or FDIC — need separate policy", "Bank hours only"],
              ["Professional Vault (Allocated)", "0.12% - 0.5% of value/year", "Very high (Brink's, Loomis, etc.)", "Fully insured — included in fee", "By appointment / request"],
              ["Dealer Storage Program", "0.5% - 1% of value/year", "High (third-party vault)", "Usually included", "Sell-back or delivery request"],
            ].map(([option, cost, security, insurance, access]) => (
              <tr key={option} className={tableRow}>
                <td className={`${tableCell} font-medium text-foreground whitespace-nowrap`}>{option}</td>
                <td className={tableCell}>{cost}</td>
                <td className={tableCell}>{security}</td>
                <td className={tableCell}>{insurance}</td>
                <td className={tableCell}>{access}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className={`${prose} mt-6`}>
        <strong className="text-foreground">Key rule:</strong> Always use{" "}
        <strong className="text-foreground">allocated</strong> (segregated) storage, never
        unallocated. With allocated storage, specific bars or coins are assigned to you. With
        unallocated storage, your gold is pooled with others&apos; holdings &mdash; if the storage
        company goes bankrupt, you become an unsecured creditor. For a deeper dive, read our{" "}
        <Link href="/investing/gold-storage" className="text-gold-400 hover:underline">
          Gold Storage Options guide
        </Link>.
      </p>

      {/* Section 9: Verify Authenticity */}
      <h2 id="verify-authenticity" className={h2}>9. How to Verify Gold Is Real</h2>

      <p className={prose}>
        Counterfeiting is a real risk, especially when buying from unfamiliar sources. Here are
        the most reliable ways to verify your gold:
      </p>

      <div className="mt-6 space-y-3">
        {[
          {
            method: "Buy from reputable sources",
            reliability: "Best protection",
            detail: "The single most effective counterfeit prevention. Government mints and LBMA-accredited refiners include advanced security features. Trusted dealers verify their supply chain.",
          },
          {
            method: "Precision weight test",
            reliability: "Very reliable",
            detail: "Gold is extremely dense (19.3 g/cm³). A counterfeit coin or bar that matches the dimensions of genuine gold will weigh differently. Use a precision scale accurate to 0.01g. A genuine 1 oz American Gold Eagle weighs 33.93g.",
          },
          {
            method: "Dimensions / caliper test",
            reliability: "Very reliable",
            detail: "Measure diameter and thickness with calipers. Because gold is so dense, it is essentially impossible to match both the correct weight AND correct dimensions with a cheaper base metal.",
          },
          {
            method: "Neodymium magnet test",
            reliability: "Good (rules out ferrous fakes)",
            detail: "Gold is not magnetic. If a coin or bar is attracted to a strong neodymium magnet, it contains iron or nickel and is fake. Note: some fakes use non-magnetic metals, so passing the magnet test alone is not sufficient.",
          },
          {
            method: "Sigma Metalytics Verifier",
            reliability: "Excellent",
            detail: "An electronic device that measures the electrical resistivity of the metal. It can verify gold through plastic packaging without opening it. Used by most professional dealers. Costs $500-1,000 for the home version.",
          },
          {
            method: "Specific gravity test",
            reliability: "Very reliable",
            detail: "Weigh the item in air, then weigh it submerged in water. Calculate the specific gravity. Pure gold has a specific gravity of 19.3. Tungsten (the most convincing fake material) has 19.25 but differs in other measurable properties.",
          },
          {
            method: "Professional assay",
            reliability: "Definitive",
            detail: "For very large purchases, send a sample to an independent assayer. This is destructive (removes a small amount of metal) but provides definitive proof of purity. Costs $50-100.",
          },
        ].map((item) => (
          <div
            key={item.method}
            className="rounded-lg border border-dark-700 bg-dark-900/50 p-4"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-foreground">{item.method}</h4>
              <span className="text-xs text-gold-400">{item.reliability}</span>
            </div>
            <p className="mt-1 text-sm text-dark-300">{item.detail}</p>
          </div>
        ))}
      </div>

      {/* Section 10: Tax Rules */}
      <h2 id="tax-rules" className={h2}>10. Tax Rules When Buying & Selling Gold</h2>

      <p className={prose}>
        Tax treatment of gold varies significantly by country and even by product type. Getting
        this wrong can be costly. Here are the key rules for major jurisdictions:
      </p>

      <h3 className={h3}>United States</h3>
      <ul className="mt-3 space-y-2 text-dark-300">
        {[
          "Sales tax: Varies by state. Many states (TX, FL, NH, and 30+ others) exempt gold bullion. Some states exempt purchases above a threshold (e.g., Louisiana exempts purchases over $1,000)",
          "Capital gains: Physical gold and gold ETFs (GLD, IAU) are taxed as collectibles — maximum 28% federal rate for long-term gains (held over 1 year). Short-term gains are taxed as ordinary income",
          "Reporting: Dealers must file IRS Form 1099-B for certain sales (e.g., 25+ oz of gold bars, 25+ Maple Leafs, Krugerrands, or Mexican Onzas in a single transaction). Coins like American Eagles are not reportable in any quantity",
          "Gold IRA: Tax-deferred (traditional IRA) or tax-free (Roth IRA) growth. Early withdrawal (before 59½) incurs a 10% penalty plus income tax",
        ].map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" />
            <span className="text-sm">{item}</span>
          </li>
        ))}
      </ul>

      <h3 className={h3}>United Kingdom</h3>
      <ul className="mt-3 space-y-2 text-dark-300">
        {[
          "VAT: Investment gold (coins and bars meeting purity standards) is VAT-free under UK law (inherited from EU Directive 98/80/EC)",
          "Capital Gains Tax: UK Gold Sovereign and Britannia coins are CGT-FREE because they are legal tender. This is a major advantage. Gold bars and other coins are subject to CGT at 10% (basic rate) or 20% (higher rate) above the annual allowance",
          "Income tax: Does not apply to gold ownership unless you are trading as a business",
        ].map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" />
            <span className="text-sm">{item}</span>
          </li>
        ))}
      </ul>

      <h3 className={h3}>European Union</h3>
      <ul className="mt-3 space-y-2 text-dark-300">
        {[
          "VAT: Investment gold is VAT-exempt across the EU under Directive 98/80/EC. This applies to bars of 99.5%+ purity and coins of 90%+ purity that are (or were) legal tender",
          "Capital gains: Germany exempts gold held for 1+ year from capital gains tax entirely. France charges 36.2% on gains or offers a flat 11.5% tax on total sale value. Each EU country has different rules — check locally",
          "Wealth tax: Some EU countries (Spain, France for real estate only) may include gold holdings in net wealth calculations",
        ].map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" />
            <span className="text-sm">{item}</span>
          </li>
        ))}
      </ul>

      <h3 className={h3}>Canada</h3>
      <ul className="mt-3 space-y-2 text-dark-300">
        {[
          "GST/HST: Investment gold (bars 99.5%+ purity, coins 99.9%+ purity) is exempt from GST/HST",
          "Capital gains: 50% of the gain is included in taxable income (the 'inclusion rate'). You only pay tax on half of your profit at your marginal tax rate",
          "RRSP/TFSA: Physical gold cannot be held directly in an RRSP or TFSA, but gold ETFs like iShares Gold Bullion ETF (CGL) can be",
        ].map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" />
            <span className="text-sm">{item}</span>
          </li>
        ))}
      </ul>

      <h3 className={h3}>Australia</h3>
      <ul className="mt-3 space-y-2 text-dark-300">
        {[
          "GST: Investment gold (99.5%+ purity for bars, listed coins) is GST-free under the GST Act",
          "Capital gains: Subject to CGT. Held over 12 months? You get a 50% CGT discount. Gains are added to your taxable income at your marginal rate",
          "Super fund: Self-managed super funds (SMSFs) can hold physical gold if it meets specific requirements (99.5% purity, stored with an approved third party)",
        ].map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" />
            <span className="text-sm">{item}</span>
          </li>
        ))}
      </ul>

      {/* Section 11: 9 Mistakes */}
      <h2 id="mistakes" className={h2}>11. 9 Mistakes to Avoid When Buying Gold</h2>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          {
            num: 1,
            title: "Paying Excessive Premiums",
            detail: "If you're paying more than 5-7% over spot for standard 1 oz coins or 3% for bars, you're overpaying. Compare at least 3 dealers. High-pressure phone salesmen often charge 15-30% premiums on 'exclusive' coins.",
          },
          {
            num: 2,
            title: "Buying Numismatic Coins as Investments",
            detail: "Rare/collectible coins carry premiums of 30-300%+ over their gold content. Unless you're an expert numismatist, stick with bullion products where value tracks the gold price.",
          },
          {
            num: 3,
            title: "Buying from Unverified Sources",
            detail: "eBay, Facebook Marketplace and Craigslist are rife with counterfeits. Even a 'good deal' is worthless if it's fake. Use established, vetted dealers only.",
          },
          {
            num: 4,
            title: "Ignoring Storage & Insurance",
            detail: "Buying gold without a storage plan is like buying a car without a garage. Unsecured gold at home is a burglary target. Uninsured gold is an unrecoverable loss.",
          },
          {
            num: 5,
            title: "Not Comparing Total Costs",
            detail: "A dealer with a low premium but high shipping and credit card fees may cost more than a dealer with a slightly higher premium but free shipping and wire discount.",
          },
          {
            num: 6,
            title: "Telling Everyone You Own Gold",
            detail: "Discretion is essential. Do not share details of your gold holdings on social media or casually in conversation. This makes you a target for theft.",
          },
          {
            num: 7,
            title: "Going All-In at Once",
            detail: "Don't invest your entire gold budget in a single purchase. Dollar-cost averaging over several months reduces the risk of buying at a temporary peak.",
          },
          {
            num: 8,
            title: "Overlooking Tax Implications",
            detail: "Know the tax rules BEFORE you buy. In the UK, choosing Britannias over generic bars saves you 20% CGT. In Germany, holding for 1 year means zero tax. Ignorance of these rules costs real money.",
          },
          {
            num: 9,
            title: "Not Keeping Records",
            detail: "Save every receipt, invoice, certificate of authenticity and shipping confirmation. You need these for insurance claims, tax reporting and proving provenance when you sell. Digital backups in cloud storage are essential.",
          },
        ].map((item) => (
          <div
            key={item.num}
            className="rounded-lg border border-dark-700 bg-dark-900/50 p-4"
          >
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500/20 text-xs font-bold text-red-400">
                {item.num}
              </span>
              <h4 className="font-semibold text-foreground">{item.title}</h4>
            </div>
            <p className="mt-2 text-sm text-dark-300">{item.detail}</p>
          </div>
        ))}
      </div>

      {/* Section 12: FAQ */}
      <h2 id="faq" className={h2}>12. Frequently Asked Questions</h2>

      <div className="mt-6 space-y-3">
        {[
          {
            q: "What is the best way to buy gold for beginners?",
            a: "Start with 1 oz government-issued coins (American Gold Eagle, Canadian Maple Leaf, British Britannia) from a reputable online dealer. These are easy to verify, highly liquid and widely recognised. Compare premiums across at least 3 dealers and pay by bank wire for the best price.",
          },
          {
            q: "How much does it cost to buy gold?",
            a: "Gold costs the spot price (currently above $5,000/oz in 2026) plus a dealer premium. 1 oz coins carry premiums of 3-7%, bars 1-3%. You can start with fractional coins (1/10 oz, ~$550) or small bars (1g, ~$75). Factor in shipping ($15-50) and any applicable sales tax.",
          },
          {
            q: "Should I buy gold coins or gold bars?",
            a: "Coins are better for beginners and smaller purchases (easier to verify, more liquid, available in fractional sizes). Bars are better for larger purchases ($10,000+) due to lower premiums per ounce. Most experienced investors hold both.",
          },
          {
            q: "Is it better to buy gold online or from a local dealer?",
            a: "Online dealers generally offer better value — premiums are 1-5% lower than local shops due to lower overhead. Local dealers are useful for immediate possession and inspecting products in person. For most buyers, online is the better choice.",
          },
          {
            q: "Where is the safest place to buy gold?",
            a: "Established online dealers with industry memberships (PNG, ICTA, LBMA), verified reviews and transparent pricing. Browse our dealer directory for vetted options worldwide. Avoid eBay, social media sellers and anyone using high-pressure tactics.",
          },
          {
            q: "Do I have to pay tax when I buy gold?",
            a: "Sales/VAT tax varies by jurisdiction. Investment gold is VAT-free in the UK and EU. Many US states exempt bullion from sales tax. When you SELL gold at a profit, you owe capital gains tax — rates range from 0% (Germany, held 1+ year) to 28% (US collectibles rate). UK Sovereign and Britannia coins are completely CGT-free.",
          },
          {
            q: "How do I know if gold is real?",
            a: "Buy only from reputable dealers to minimise risk. Verify using a precision scale (check weight), calipers (check dimensions), neodymium magnet test (gold is not magnetic), or a Sigma Metalytics Verifier ($500-1,000). Government-minted coins have security features that are very difficult to counterfeit.",
          },
          {
            q: "How should I store my gold?",
            a: "Options: home safe ($200-2,000, bolt it down, add insurance), bank safe deposit box ($50-300/year, not FDIC insured), or professional vault storage (0.12-0.5%/year, fully insured). For larger holdings ($50,000+), professional allocated vault storage is the safest option.",
          },
          {
            q: "What is the minimum amount of gold I can buy?",
            a: "You can buy as little as 1 gram (~$75) or 1/10 oz (~$550). Digital platforms like BullionVault allow purchases of $1+. However, smaller sizes carry higher percentage premiums. For best value, buy at least 1 oz at a time if your budget allows.",
          },
          {
            q: "Is now a good time to buy gold in 2026?",
            a: "Gold is above $5,000/oz — a record high — driven by central bank buying, inflation, geopolitical risk and de-dollarisation. While the price is historically high, the fundamentals remain strong. Most advisors recommend dollar-cost averaging rather than timing the market. If you have no gold exposure, starting a position is more important than waiting for a dip.",
          },
        ].map((item) => (
          <details
            key={item.q}
            className="group rounded-lg border border-dark-700 bg-dark-900/50"
          >
            <summary className="cursor-pointer px-4 py-3 font-medium text-foreground transition-colors hover:text-gold-400">
              {item.q}
            </summary>
            <p className="px-4 pb-4 text-sm leading-relaxed text-dark-300">{item.a}</p>
          </details>
        ))}
      </div>
    </>
  );
}
