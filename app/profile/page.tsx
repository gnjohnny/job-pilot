import { redirect } from "next/navigation";
import { createInsforgeServer } from "@/lib/insforge-server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default async function ProfilePage() {
  const insforge = await createInsforgeServer();
  const { data: { user }, error } = await insforge.auth.getCurrentUser();

  if (error || !user) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-text-primary">
      <Navbar />
      <main className="flex-grow max-w-7xl w-full mx-auto p-6 md:p-8 flex flex-col gap-6 justify-center items-center">
        <div className="bg-surface border border-border rounded-2xl p-8 max-w-md w-full text-center shadow-sm">
          <h1 className="font-sans text-xl font-semibold text-text-primary mb-2">Profile Page</h1>
          <p className="font-sans text-sm text-text-secondary mb-4">
            This page is currently under construction and will be implemented in Phase 2.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
