import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import dash1 from "@/assets/dashboard-1.png";
import dash2 from "@/assets/dashboard-2.png";
import dash3 from "@/assets/dashboard-3.png";
import dash4 from "@/assets/dashboard-4.png";
import dash5 from "@/assets/dashboard-5.png";
import dash6 from "@/assets/dashboard-6.png";

const INTERVAL = 4000;

const dashboards = [
  { src: dash1, alt: "Daily SLA & Offered Cases Dashboard" },
  { src: dash2, alt: "SLA & Pending Cases Analysis" },
  { src: dash3, alt: "Transferred Cases & Top Reasons" },
  { src: dash4, alt: "NPS Scores & Survey Analysis" },
  { src: dash5, alt: "Delivery Experience Analysis" },
  { src: dash6, alt: "Customer Satisfaction & Follow-up Dashboard" },
];

const DashboardGallery = () => {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const startRef = useRef(Date.now());

  const goTo = useCallback((idx: number) => {
    setCurrent(idx);
    setProgress(0);
    startRef.current = Date.now();
  }, []);

  const next = useCallback(() => goTo((current + 1) % dashboards.length), [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + dashboards.length) % dashboards.length), [current, goTo]);

  useEffect(() => {
    startRef.current = Date.now();
    let raf: number;
    const tick = () => {
      const elapsed = Date.now() - startRef.current;
      const pct = Math.min(elapsed / INTERVAL, 1);
      setProgress(pct);
      if (pct >= 1) {
        setCurrent((c) => (c + 1) % dashboards.length);
        startRef.current = Date.now();
        setProgress(0);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [current]);

  return (
    <section id="gallery" className="py-24">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-mono text-primary text-sm tracking-widest uppercase mb-2">Portfolio</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Dashboard Gallery</h2>
          <div className="blue-line mb-12 max-w-xs" />
        </motion.div>

        <div className="relative max-w-5xl mx-auto group">
          {/* Timer bar */}
          <div className="h-1 w-full rounded-full bg-muted/30 mb-4 overflow-hidden">
            <div
              className="h-full rounded-full transition-none"
              style={{
                width: `${progress * 100}%`,
                background: "var(--gradient-blue)",
              }}
            />
          </div>

          {/* Image display */}
          <div className="relative overflow-hidden rounded-xl border border-border bg-card" style={{ boxShadow: "var(--shadow-card)" }}>
            <div className="relative aspect-[16/9]">
              {dashboards.map((d, i) => (
                <motion.img
                  key={i}
                  src={d.src}
                  alt={d.alt}
                  className="absolute inset-0 w-full h-full object-contain bg-black/50"
                  initial={false}
                  animate={{ opacity: i === current ? 1 : 0 }}
                  transition={{ duration: 0.6 }}
                />
              ))}
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 border border-border flex items-center justify-center text-foreground hover:bg-primary/20 hover:border-primary/50 transition-all opacity-0 group-hover:opacity-100"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 border border-border flex items-center justify-center text-foreground hover:bg-primary/20 hover:border-primary/50 transition-all opacity-0 group-hover:opacity-100"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Segment indicators */}
          <div className="flex gap-1.5 mt-4">
            {dashboards.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="relative flex-1 h-1.5 rounded-full bg-muted/20 overflow-hidden"
                aria-label={`Go to slide ${i + 1}`}
              >
                <div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    width: i < current ? "100%" : i === current ? `${progress * 100}%` : "0%",
                    background: i <= current ? "var(--gradient-blue)" : "transparent",
                    transition: i === current ? "none" : "width 0.3s",
                  }}
                />
              </button>
            ))}
          </div>

          {/* Caption */}
          <p className="text-center text-sm text-muted-foreground mt-3">{dashboards[current].alt}</p>
        </div>
      </div>
    </section>
  );
};

export default DashboardGallery;
