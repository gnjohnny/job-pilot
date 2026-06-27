"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { insforge } from "@/lib/insforge-client";
import { Loader2, Globe, GitBranch } from "lucide-react";
import { signInWithOAuthAction } from "@/actions/auth";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleOAuthLogin = async (provider: "google" | "github") => {
    setIsLoading(provider);
    setError(null);
    try {
      // Find search param 'next' to pass to callback, so callback page knows where to redirect
      const params = new URLSearchParams(window.location.search);
      const nextPath = params.get("next") || "/dashboard";
      
      const redirectUrl = `${window.location.origin}/callback?next=${encodeURIComponent(nextPath)}`;

      const { data, error: oauthError } = await signInWithOAuthAction(provider, redirectUrl);

      if (oauthError) {
        throw new Error(oauthError.message);
      }

      if (data?.url) {
        window.location.assign(data.url);
      }
    } catch (err: any) {
      console.error(`${provider} login failed:`, err);
      setError(err?.message || "Something went wrong. Please try again.");
      setIsLoading(null);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-text-primary">
      {/* Navbar Minimalist */}
      <header className="w-full h-16 bg-surface border-b border-border px-6 flex items-center justify-between">
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
        <Link
          href="/"
          className="font-sans text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
        >
          Back to home
        </Link>
      </header>

      {/* Main Login Card Area */}
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-surface border border-border rounded-2xl p-8 shadow-sm flex flex-col">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-sans text-2xl font-semibold text-text-primary tracking-tight">
              Welcome to JobPilot
            </h1>
            <p className="font-sans text-sm text-text-secondary mt-2">
              Sign in to manage your profile and automate your job search.
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg text-error text-sm font-medium">
              {error}
            </div>
          )}

          {/* Social Sign-in Buttons */}
          <div className="flex flex-col gap-4">
            {/* Google */}
            <button
              onClick={() => handleOAuthLogin("google")}
              disabled={isLoading !== null}
              className="w-full font-sans text-sm font-medium px-4 py-3 bg-surface border border-border text-text-primary rounded-lg transition-all hover:bg-surface-secondary shadow-sm flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading === "google" ? (
                <Loader2 className="w-5 h-5 animate-spin text-text-secondary" />
              ) : (
                <Globe className="w-5 h-5 text-accent" />
              )}
              Continue with Google
            </button>

            {/* GitHub */}
            <button
              onClick={() => handleOAuthLogin("github")}
              disabled={isLoading !== null}
              className="w-full font-sans text-sm font-medium px-4 py-3 bg-surface border border-border text-text-primary rounded-lg transition-all hover:bg-surface-secondary shadow-sm flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading === "github" ? (
                <Loader2 className="w-5 h-5 animate-spin text-text-secondary" />
              ) : (
                <GitBranch className="w-5 h-5 text-text-primary" />
              )}
              Continue with GitHub
            </button>
          </div>

          {/* Footer Terms */}
          <p className="font-sans text-xs text-text-secondary text-center mt-8 leading-5">
            By signing in, you agree to our{" "}
            <Link href="/terms" className="text-accent hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-accent hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </main>

      {/* Footer Minimalist */}
      <footer className="w-full bg-surface border-t border-border px-6 py-4 flex justify-between items-center text-xs text-text-secondary">
        <p>&copy; {new Date().getFullYear()} JobPilot. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:text-text-primary transition-colors">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-text-primary transition-colors">
            Terms
          </Link>
        </div>
      </footer>
    </div>
  );
}
