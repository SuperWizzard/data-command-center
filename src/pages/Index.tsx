import Navbar from "@/components/Navbar";
import {
  StoryTimeline,
  LeadershipSection,
  ThinkingSection,
  DemonstrationsSection,
  CurrentlyBuilding,
  ExploreAI,
} from "@/components/StorySections";
import { OrbitHero, ProjectUniverse, Ecosystem } from "@/components/Universe";
import DashboardGallery from "@/components/DashboardGallery";
import CertificationsSection from "@/components/CertificationsSection";
import FooterSection from "@/components/FooterSection";
export default function Index() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <OrbitHero />
        <ProjectUniverse />
        <StoryTimeline />
        <LeadershipSection />
        <ThinkingSection />

        <DemonstrationsSection />
        <DashboardGallery />
        <Ecosystem />
        <CurrentlyBuilding />
        <CertificationsSection />
        <ExploreAI />
      </main>
      <FooterSection />
    </>
  );
}
