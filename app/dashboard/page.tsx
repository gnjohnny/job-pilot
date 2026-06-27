import Link from "next/link";
import { redirect } from "next/navigation";
import { createInsforgeServer } from "@/lib/insforge-server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { signOutAction } from "@/actions/auth";
import { User, ShieldAlert, LogOut, ArrowRight } from "lucide-react";

export default async function DashboardPage() {
  const insforge = await createInsforgeServer();
  const { data: { user }, error } = await insforge.auth.getCurrentUser();

  if (error || !user) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-text-primary">
      <Navbar />

      <main className="flex-grow max-w-7xl w-full mx-auto p-6 md:p-8 flex flex-col gap-6">
        {/* Welcome Section */}
        <div className="bg-surface border border-border rounded-2xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-accent/10 text-accent rounded-xl">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-sans text-xl md:text-2xl font-semibold text-text-primary">
                Welcome back, {user.profile?.name || user.email}
              </h1>
              <p className="font-sans text-sm text-text-secondary mt-1">
                You are securely signed in as {user.email} (ID: {user.id})
              </p>
            </div>
          </div>

          <form action={signOutAction}>
            <button
              type="submit"
              className="font-sans text-sm font-medium px-4 py-2 bg-surface border border-border text-text-primary rounded-lg hover:bg-surface-secondary shadow-sm inline-flex items-center gap-2 cursor-pointer transition-colors"
            >
              <LogOut className="w-4 h-4 text-text-secondary" />
              Sign Out
            </button>
          </form>
        </div>

        {/* Temporary Auth Verification Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Quick Links Card */}
          <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm flex flex-col">
            <h2 className="font-sans text-base font-semibold text-text-primary mb-4">
              Quick Navigation
            </h2>
            <div className="flex flex-col gap-3">
              <Link
                href="/profile"
                className="font-sans text-sm font-medium p-4 bg-surface-secondary hover:bg-surface-tertiary border border-border rounded-xl flex items-center justify-between transition-colors group"
              >
                <span>Edit Profile & Resume</span>
                <ArrowRight className="w-4 h-4 text-text-secondary transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/find-jobs"
                className="font-sans text-sm font-medium p-4 bg-surface-secondary hover:bg-surface-tertiary border border-border rounded-xl flex items-center justify-between transition-colors group"
              >
                <span>Find Jobs & Research Companies</span>
                <ArrowRight className="w-4 h-4 text-text-secondary transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Database & Profile Completion Status Card */}
          <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm flex flex-col">
            <h2 className="font-sans text-base font-semibold text-text-primary mb-4 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-warning" />
              Profile Status
            </h2>
            <p className="font-sans text-sm text-text-secondary mb-4 leading-5">
              To start finding jobs, you need to complete your professional profile. You can either fill out the form manually or upload an existing resume PDF to extract details.
            </p>
            <div className="mt-auto">
              <Link
                href="/profile"
                className="font-sans text-sm font-medium px-4 py-2.5 bg-accent hover:bg-accent-dark text-white rounded-lg transition-colors inline-flex items-center gap-2 shadow-sm"
              >
                Go to Profile
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
