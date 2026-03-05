import Parser from "rss-parser";

export interface NewsItem {
  title: string;
  source: string;
  url: string;
  image_url: string | null;
  published_at: string;
  category: string;
  summary: string | null;
}

const parser = new Parser({
  customFields: {
    item: [["media:content", "media", { keepArray: false }]],
  },
});

const RSS_FEEDS = [
  {
    url: "https://news.google.com/rss/search?q=gold+price+XAU&hl=en-US&gl=US&ceid=US:en",
    source: "Google News",
    category: "market",
  },
  {
    url: "https://news.google.com/rss/search?q=gold+mining+stocks&hl=en-US&gl=US&ceid=US:en",
    source: "Google News",
    category: "mining",
  },
  {
    url: "https://news.google.com/rss/search?q=gold+investing+precious+metals&hl=en-US&gl=US&ceid=US:en",
    source: "Google News",
    category: "investing",
  },
];

export async function fetchAllNews(): Promise<NewsItem[]> {
  const allItems: NewsItem[] = [];

  for (const feed of RSS_FEEDS) {
    try {
      const parsed = await parser.parseURL(feed.url);
      for (const item of parsed.items.slice(0, 15)) {
        if (!item.title || !item.link) continue;
        allItems.push({
          title: item.title,
          source: item.creator || feed.source,
          url: item.link,
          image_url:
            (item as unknown as Record<string, { $?: { url?: string } }>).media?.$?.url || null,
          published_at: item.isoDate || new Date().toISOString(),
          category: feed.category,
          summary: item.contentSnippet?.slice(0, 200) || null,
        });
      }
    } catch {
      // Skip failed feeds silently
    }
  }

  // Deduplicate by URL
  const seen = new Set<string>();
  return allItems.filter((item) => {
    if (seen.has(item.url)) return false;
    seen.add(item.url);
    return true;
  });
}

// Demo news for when RSS is unavailable
export function getDemoNews(): NewsItem[] {
  return [
    {
      title: "Gold Prices Surge Past $2,650 as Inflation Fears Mount",
      source: "Reuters",
      url: "#",
      image_url: null,
      published_at: new Date().toISOString(),
      category: "market",
      summary: "Gold prices climbed to new heights as investors seek safe-haven assets amid growing inflation concerns.",
    },
    {
      title: "Central Banks Continue Record Gold Purchases in 2026",
      source: "World Gold Council",
      url: "#",
      image_url: null,
      published_at: new Date(Date.now() - 3600000).toISOString(),
      category: "market",
      summary: "Central banks worldwide have purchased over 1,000 tonnes of gold in the first quarter, setting a new record.",
    },
    {
      title: "Newmont Reports Strong Q4 Earnings, Raises Dividend",
      source: "Mining Weekly",
      url: "#",
      image_url: null,
      published_at: new Date(Date.now() - 7200000).toISOString(),
      category: "mining",
      summary: "Newmont Corporation reported fourth-quarter earnings that exceeded analyst expectations.",
    },
    {
      title: "Gold IRA Demand Hits All-Time High Among Retail Investors",
      source: "Financial Times",
      url: "#",
      image_url: null,
      published_at: new Date(Date.now() - 14400000).toISOString(),
      category: "investing",
      summary: "Retail investors are increasingly turning to Gold IRAs as a hedge against market volatility.",
    },
    {
      title: "Barrick Gold Announces New Discovery in Nevada",
      source: "Kitco News",
      url: "#",
      image_url: null,
      published_at: new Date(Date.now() - 28800000).toISOString(),
      category: "mining",
      summary: "Barrick Gold has announced a significant new gold discovery at its Nevada operations.",
    },
    {
      title: "Dubai Gold Souk Sees Record Tourist Activity",
      source: "Gulf News",
      url: "#",
      image_url: null,
      published_at: new Date(Date.now() - 43200000).toISOString(),
      category: "market",
      summary: "Dubai's famous Gold Souk has reported record visitor numbers driven by favorable gold prices.",
    },
  ];
}
