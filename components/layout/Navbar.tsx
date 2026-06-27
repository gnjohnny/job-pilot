"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { insforge } from "@/lib/insforge-client";
import { signOutAction } from "@/actions/auth";
import { User, LogOut, LayoutDashboard, UserCircle } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Helper to determine if a link is active
  const isActive = (path: string) => pathname === path;

  useEffect(() => {
    let active = true;
    const fetchUser = async () => {
      try {
        const { data, error } = await insforge.auth.getCurrentUser();
        console.log("Navbar fetchUser response:", { data, error });
        if (active && data?.user) {
          setUser(data.user);
        }
      } catch (err) {
        console.error("Failed to fetch user in Navbar:", err);
      }
    };
    fetchUser();
    return () => {
      active = false;
    };
  }, [pathname]); // Re-run user fetch on path changes to ensure up-to-date state

  const handleSignOut = async () => {
    try {
      setDropdownOpen(false);
      setUser(null);
      await signOutAction();
    } catch (err) {
      console.error("Sign out failed:", err);
    }
  };

  const userInitial = user?.email ? user.email[0].toUpperCase() : "U";

  return (
    <header className="sticky top-0 z-50 w-full h-16 bg-surface border-b border-border px-6 flex items-center justify-between">
      {/* Logo */}
      <Link href="/" className="flex items-center">
        <Image
          src="/logo.png"
          alt="JobPilot Logo"
          width={106}
          height={36}
          className="object-contain"
          priority
        />
      </Link>

      {/* Navigation Links - Hidden when not authenticated or on mobile */}
      {user && (
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/dashboard"
            className={`font-sans text-sm font-medium leading-5 transition-colors ${
              isActive("/dashboard")
                ? "text-accent"
                : "text-text-dark hover:text-text-primary"
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/find-jobs"
            className={`font-sans text-sm font-medium leading-5 transition-colors ${
              isActive("/find-jobs")
                ? "text-accent"
                : "text-text-dark hover:text-text-primary"
            }`}
          >
            Find Jobs
          </Link>
          <Link
            href="/profile"
            className={`font-sans text-sm font-medium leading-5 transition-colors ${
              isActive("/profile")
                ? "text-accent"
                : "text-text-dark hover:text-text-primary"
            }`}
          >
            Profile
          </Link>
        </nav>
      )}

      {/* Auth State Button / Dropdown */}
      <div className="relative">
        {user ? (
          <>
            {/* Avatar Button */}
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 text-accent font-sans font-semibold text-sm hover:bg-accent/20 border border-accent/20 transition-all cursor-pointer focus:outline-none"
            >
              {userInitial}
            </button>

            {/* Click-outside backdrop */}
            {dropdownOpen && (
              <div
                className="fixed inset-0 z-30 cursor-default"
                onClick={() => setDropdownOpen(false)}
              />
            )}

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-surface border border-border rounded-xl shadow-lg py-2 z-40 animate-in fade-in-50 slide-in-from-top-1 duration-100">
                {/* User Info Header */}
                <div className="px-4 py-2 border-b border-border">
                  <p className="font-sans text-xs text-text-secondary font-medium uppercase tracking-wider">
                    Signed in as
                  </p>
                  <p className="font-sans text-sm font-semibold text-text-primary truncate mt-0.5">
                    {user.email}
                  </p>
                </div>

                {/* Dropdown Actions */}
                <div className="py-1">
                  <Link
                    href="/dashboard"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 font-sans text-sm text-text-dark hover:text-text-primary hover:bg-surface-secondary transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4 text-text-secondary" />
                    Dashboard
                  </Link>
                  <Link
                    href="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 font-sans text-sm text-text-dark hover:text-text-primary hover:bg-surface-secondary transition-colors"
                  >
                    <UserCircle className="w-4 h-4 text-text-secondary" />
                    My Profile
                  </Link>
                </div>

                <div className="border-t border-border pt-1">
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2 px-4 py-2 font-sans text-sm text-error hover:bg-error/5 transition-colors text-left cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <Link
            href="/login"
            className="font-sans text-sm font-medium px-4 py-2 bg-text-primary hover:bg-text-darkest text-white rounded-md transition-colors shadow-sm inline-flex items-center justify-center"
          >
            Get started for free
          </Link>
        )}
      </div>
    </header>
  );
}
