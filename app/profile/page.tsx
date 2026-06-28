import { redirect } from "next/navigation";
import { createInsforgeServer } from "@/lib/insforge-server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProfileForm } from "@/components/profile/ProfileForm";

export default async function ProfilePage() {
  const insforge = await createInsforgeServer();
  const { data: { user }, error } = await insforge.auth.getCurrentUser();

  if (error || !user) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-text-primary">
      <Navbar />
      <main className="flex-grow max-w-7xl w-full mx-auto p-6 md:p-8 flex flex-col gap-6">
        <ProfileForm />
      </main>
      <Footer />
    </div>
  );
}

