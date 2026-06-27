import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/homepage/Hero";
import { Features } from "@/components/homepage/Features";
import { HowItWorks } from "@/components/homepage/HowItWorks";
import { Testimonials } from "@/components/homepage/Testimonials";
import { CTASection } from "@/components/homepage/CTASection";
import { createInsforgeServer } from "@/lib/insforge-server";
import { redirect } from "next/navigation";

export default async function Home() {
  const insforge = await createInsforgeServer();
  const { data: { user } } = await insforge.auth.getCurrentUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-text-primary">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        <HowItWorks />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}