import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { StorySection } from "@/components/sections/StorySection";
import { AnalyticsSection } from "@/components/sections/AnalyticsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white min-h-screen font-sans transition-colors duration-300">
      {/* Priesvitná hlavička s GitHub odkazom */}
      <Header />

      {/* 1. Úvodná hero sekcia */}
      <HeroSection />

      {/* 2. Scrollytelling - Hlavný príbeh (Senzor -> Auto) */}
      <StorySection />

      {/* 3. Náhľad analytickej aplikácie */}
      <AnalyticsSection />

      {/* 4. FAQ */}
      <FAQSection />

      {/* 5. Záver a hľadanie partnerov */}
      <CTASection />

      {/* Pätička */}
      <Footer />
    </main>
  );
}
