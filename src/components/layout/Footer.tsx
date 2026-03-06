import Link from "next/link";
import Logo from "@/components/ui/Logo";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-dark-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-sm font-semibold text-gold-400">Directory</h3>
            <ul className="mt-3 space-y-2">
              <li><Link href="/dealers" className="text-sm text-dark-300 hover:text-gold-400">All Dealers</Link></li>
              <li><Link href="/dealers/united-states" className="text-sm text-dark-300 hover:text-gold-400">USA Dealers</Link></li>
              <li><Link href="/dealers/united-kingdom" className="text-sm text-dark-300 hover:text-gold-400">UK Dealers</Link></li>
              <li><Link href="/dealers/canada" className="text-sm text-dark-300 hover:text-gold-400">Canada Dealers</Link></li>
              <li><Link href="/dealers/australia" className="text-sm text-dark-300 hover:text-gold-400">Australia Dealers</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gold-400">Market Data</h3>
            <ul className="mt-3 space-y-2">
              <li><Link href="/prices" className="text-sm text-dark-300 hover:text-gold-400">Gold Prices</Link></li>
              <li><Link href="/stocks" className="text-sm text-dark-300 hover:text-gold-400">Gold Stocks</Link></li>
              <li><Link href="/news" className="text-sm text-dark-300 hover:text-gold-400">Gold News</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gold-400">Resources</h3>
            <ul className="mt-3 space-y-2">
              <li><Link href="/investing" className="text-sm text-dark-300 hover:text-gold-400">Investing Guide</Link></li>
              <li><Link href="/investing/gold-ira" className="text-sm text-dark-300 hover:text-gold-400">Gold IRA</Link></li>
              <li><Link href="/investing/how-to-buy-gold" className="text-sm text-dark-300 hover:text-gold-400">How to Buy Gold</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gold-400">Company</h3>
            <ul className="mt-3 space-y-2">
              <li><Link href="/submit" className="text-sm text-dark-300 hover:text-gold-400">Submit a Dealer</Link></li>
              <li><Link href="/login" className="text-sm text-dark-300 hover:text-gold-400">Sign In</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-border pt-6 flex flex-col items-center gap-4">
          <Logo size="sm" linkTo="/" />
          <p className="text-center text-xs text-dark-400">
            &copy; {new Date().getFullYear()} XAUBase. All rights reserved.
            Gold prices are delayed and provided for informational purposes only. Not financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
