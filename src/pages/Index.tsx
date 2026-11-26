import Navbar from "@/components/Navbar";
import {
  StoryHero,
  StoryTimeline,
  LeadershipSection,
  ThinkingSection,
  BuiltSection,
  DemonstrationsSection,
  CurrentlyBuilding,
  ExploreAI,
} from "@/components/StorySections";
import TechStackSection from "@/components/TechStackSection";
import DashboardGallery from "@/components/DashboardGallery";
import CertificationsSection from "@/components/CertificationsSection";
import FooterSection from "@/components/FooterSection";
export default function Index() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <StoryHero />
        <StoryTimeline />
        <LeadershipSection />
        <ThinkingSection />
        <BuiltSection />
        <DemonstrationsSection />
        <DashboardGallery />
        <TechStackSection />
        <CurrentlyBuilding />
        <CertificationsSection />
        <ExploreAI />
      </main>
      <FooterSection />
    </>
  );
}
