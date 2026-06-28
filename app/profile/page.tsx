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

  // Fetch the existing user profile record from the profiles table
  const { data: profile } = await insforge.database
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  return (
    <div className="flex flex-col min-h-screen bg-background text-text-primary">
      <Navbar />
      <main className="flex-grow max-w-7xl w-full mx-auto p-6 md:p-8 flex flex-col gap-6">
        <ProfileForm initialData={profile} email={user.email ?? ""} />
      </main>
      <Footer />
    </div>
  );
}

