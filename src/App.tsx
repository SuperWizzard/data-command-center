import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { lazy, Suspense, useEffect } from "react";
import { useLocation } from "react-router-dom";
const DataEngineering = lazy(() => import("./pages/DataEngineering"));
const ProjectPage = lazy(() => import("./pages/ProjectPage"));
import { useVisitorTracking } from "./hooks/useVisitorTracking";
import { projects } from "./data/portfolio";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
const BikesharePage = lazy(() => import("./pages/BikesharePage"));
const SchedulingPage = lazy(() => import("./pages/SchedulingPage"));
const WorkforcePage = lazy(() => import("./pages/WorkforcePage"));
const ErpAnalysisPage = lazy(() => import("./pages/ErpAnalysisPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
import ChatBot from "./components/ChatBot";

const queryClient = new QueryClient();

function RouteEffects() {
  const { pathname, hash } = useLocation();
  useVisitorTracking();
  useEffect(() => {
    const title = pathname.startsWith("/projects/")
      ? projects.find((p) => pathname.endsWith(p.slug))?.title
      : (
          {
            "/bikeshare": "Urban Mobility Analytics",
            "/scheduling": "Capacity & Scheduling Engine",
            "/workforce": "Strategic Workforce Framework",
            "/erp-analysis": "ERP Upgrade & Process Design",
            "/admin": "Private Administration",
          } as Record<string, string>
        )[pathname];
    document
      .querySelector('link[rel="canonical"]')
      ?.setAttribute(
        "href",
        `https://sobhemosaad.com${pathname === "/admin" ? "/" : pathname}`,
      );
    document.title = title
      ? `${title} | Sobhe Mosaad`
      : "Sobhe Mosaad | Beyond Boundaries";
    const robots = document.querySelector('meta[name="robots"]');
    robots?.setAttribute(
      "content",
      pathname === "/admin" ? "noindex, nofollow" : "index, follow",
    );
    if (hash)
      requestAnimationFrame(() =>
        document.getElementById(hash.slice(1))?.scrollIntoView(),
      );
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}
const App = () => (
  <MotionConfig reducedMotion="user">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <RouteEffects />
          <Suspense
            fallback={
              <p role="status" className="section-container py-24">
                Loading page...
              </p>
            }
          >
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/bikeshare" element={<BikesharePage />} />
              <Route path="/scheduling" element={<SchedulingPage />} />
              <Route path="/workforce" element={<WorkforcePage />} />
              <Route path="/erp-analysis" element={<ErpAnalysisPage />} />
              <Route path="/data-engineering" element={<DataEngineering />} />
              <Route path="/projects/:slug" element={<ProjectPage />} />
              <Route path="/admin" element={<AdminPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <ChatBot />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </MotionConfig>
);

export default App;
