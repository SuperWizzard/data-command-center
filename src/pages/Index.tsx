import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExpertiseSection from "@/components/ExpertiseSection";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import TechStackSection from "@/components/TechStackSection";
import DashboardGallery from "@/components/DashboardGallery";
import CertificationsSection from "@/components/CertificationsSection";
import MetricsSection from "@/components/MetricsSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ExpertiseSection />
      <CaseStudiesSection />
      <DashboardGallery />
      <TechStackSection />
      <CertificationsSection />
      <MetricsSection />
      <FooterSection />
    </main>
  );
};

export default Index;
