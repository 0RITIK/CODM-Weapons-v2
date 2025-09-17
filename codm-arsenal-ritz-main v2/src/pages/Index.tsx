import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { WeaponSection } from "@/components/WeaponSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <WeaponSection />
      <Footer />
    </div>
  );
};

export default Index;