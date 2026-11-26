import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { capabilities } from "@/data/portfolio";
import { SectionHeading } from "./StorySections";
export default function TechStackSection() {
  return (
    <section id="tech" className="story-section section-container">
      <SectionHeading
        number="07"
        label="Tools with a purpose"
        title="Technology & Capabilities"
      >
        A toolkit shaped by operational needs, professional experience and
        independent projects.
      </SectionHeading>
      <div className="capability-list">
        {capabilities.map((c) => (
          <div key={c.title}>
            <div>
              <h3>{c.title}</h3>
              <p>{c.context}</p>
              <Link to={`/projects/${c.project}`}>
                See it in context <ArrowUpRight size={14} />
              </Link>
            </div>
            <ul>
              {c.items.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
