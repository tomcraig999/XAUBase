"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown, User, LogOut } from "lucide-react";
import { NAV_LINKS, SITE_NAME } from "@/lib/utils/constants";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface HeaderProps {
  user?: { id: string; email?: string } | null;
}

export default function Header({ user }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-dark-900/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gold-500 font-bold text-dark-900 text-sm">
            Au
          </div>
          <span className="font-display text-xl font-bold text-gold-400">
            {SITE_NAME}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm text-dark-200 transition-colors hover:bg-dark-800 hover:text-gold-400"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-1 rounded-md px-3 py-2 text-sm text-dark-200 transition-colors hover:bg-dark-800"
              >
                <User className="h-4 w-4" />
                <ChevronDown className="h-3 w-3" />
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-1 w-48 rounded-md border border-border bg-dark-800 py-1 shadow-lg">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-dark-200 hover:bg-dark-700"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    href="/submit"
                    className="block px-4 py-2 text-sm text-dark-200 hover:bg-dark-700"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    Submit Dealer
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-dark-700"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="rounded-md bg-gold-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gold-500"
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="rounded-md p-2 text-dark-200 md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-dark-900 md:hidden">
          <nav className="flex flex-col px-4 py-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm text-dark-200 hover:bg-dark-800 hover:text-gold-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <hr className="my-2 border-border" />
            {user ? (
              <>
                <Link
                  href="/submit"
                  className="rounded-md px-3 py-2 text-sm text-dark-200 hover:bg-dark-800"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Submit Dealer
                </Link>
                <button
                  onClick={handleSignOut}
                  className="rounded-md px-3 py-2 text-left text-sm text-red-400 hover:bg-dark-800"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="rounded-md px-3 py-2 text-sm text-gold-400 hover:bg-dark-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
