import { FloatingHeader } from "@/components/landing/floating-header";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/feature-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { FAQSection } from "@/components/landing/faq-section";
import { Footer } from "@/components/landing/footer-section";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { redirect } from "next/navigation";
import { getToken } from "@convex-dev/better-auth/nextjs";
import { createAuth } from "@/convex/auth";

export default async function Home() {
  const token = await getToken(createAuth);
  const isAuthenticated = await fetchQuery(
    api.auth.isAuthenticated,
    {},
    { token },
  );

  if (isAuthenticated) {
    redirect("/create");
  }
  return <Content />;
}

function Content() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100">
      <FloatingHeader />

      <main className="relative overflow-hidden">
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
        <FAQSection />

        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-green-200 rounded-full opacity-20"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-blue-200 rounded-full opacity-20"></div>
          <div className="absolute top-1/2 left-5 w-16 h-16 bg-yellow-200 rounded-full opacity-20"></div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
