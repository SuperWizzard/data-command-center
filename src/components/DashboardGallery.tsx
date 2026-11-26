import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeading } from "./StorySections";
import d1 from "@/assets/dashboard-1.png";
import d2 from "@/assets/dashboard-2.png";
import d3 from "@/assets/dashboard-3.png";
import d4 from "@/assets/dashboard-4.png";
import d5 from "@/assets/dashboard-5.png";
import d6 from "@/assets/dashboard-6.png";
const dashboards = [
  { src: d1, alt: "Daily SLA & Offered Cases Dashboard" },
  { src: d2, alt: "SLA & Pending Cases Analysis" },
  { src: d3, alt: "Transferred Cases & Top Reasons" },
  { src: d4, alt: "NPS Scores & Survey Analysis" },
  { src: d5, alt: "Delivery Experience Analysis" },
  { src: d6, alt: "Customer Satisfaction & Follow-up Dashboard" },
];
export default function DashboardGallery() {
  const [current, setCurrent] = useState(0);
  return (
    <section id="gallery" className="story-section section-container">
      <SectionHeading
        number="06"
        label="Making data understandable"
        title="Dashboard Gallery"
      >
        Existing portfolio dashboards, preserved as examples of analytical
        presentation.
      </SectionHeading>
      <figure className="dashboard-figure">
        <img
          src={dashboards[current].src}
          alt={dashboards[current].alt}
          loading="lazy"
          width="1600"
          height="900"
        />
        <figcaption aria-live="polite">
          <span>
            {String(current + 1).padStart(2, "0")} / 06 —{" "}
            {dashboards[current].alt}
          </span>
          <div>
            <button
              aria-label="Previous dashboard"
              onClick={() => setCurrent((current + 5) % 6)}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              aria-label="Next dashboard"
              onClick={() => setCurrent((current + 1) % 6)}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </figcaption>
      </figure>
      <div className="gallery-selectors">
        {dashboards.map((d, i) => (
          <button
            key={d.alt}
            aria-pressed={current === i}
            onClick={() => setCurrent(i)}
            aria-label={`Show ${d.alt}`}
          >
            {String(i + 1).padStart(2, "0")}
          </button>
        ))}
      </div>
    </section>
  );
}
