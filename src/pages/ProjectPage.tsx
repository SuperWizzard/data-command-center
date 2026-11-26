import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { projects } from "@/data/portfolio";
import { disciplines } from "@/data/universe";
import type { CSSProperties } from "react";
import "@/components/universe.css";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import NotFound from "./NotFound";

export default function ProjectPage() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  if (!project) return <NotFound />;
  const sections = [
    ["The challenge", project.challenge],
    ["Why it mattered", project.importance],
    ["My approach", project.approach],
    ["What I built or improved", project.built],
    ["Outcomes or current objectives", project.outcome],
    ["Lessons learned", project.lessons],
  ];
  return (
    <>
      <Navbar />
      <main
        id="main-content"
        style={
          {
            "--tint": disciplines.find((d) => d.slug === slug)?.color,
          } as CSSProperties
        }
        className="case-page section-container"
      >
        <Link className="action-link" to="/#work">
          <ArrowLeft size={16} /> All work
        </Link>
        <p className="eyebrow">
          {project.type} / {project.status}
        </p>
        <h1>{project.title}</h1>
        <p className="case-summary">{project.summary}</p>
        <figure className="architecture-figure">
          <figcaption>
            Conceptual process diagram · not an application screenshot
          </figcaption>
          <ol>
            {project.flow.map((step, i) => (
              <li key={step}>
                <span>0{i + 1}</span>
                {step}
                {i < project.flow.length - 1 && (
                  <ArrowRight size={18} aria-hidden="true" />
                )}
              </li>
            ))}
          </ol>
        </figure>
        <div className="case-narrative">
          {sections.map(([title, content], i) => (
            <section key={title}>
              <span className="eyebrow">0{i + 1}</span>
              <div>
                <h2>{title}</h2>
                <p>{content}</p>
              </div>
            </section>
          ))}
          <section>
            <span className="eyebrow">07</span>
            <div>
              <h2>Technologies involved</h2>
              <ul className="project-tags">
                {project.tech.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </section>
          <section>
            <span className="eyebrow">08</span>
            <div>
              <h2>Current status</h2>
              <p>
                {project.status}. This case study uses public-safe information
                supplied for the portfolio.
              </p>
            </div>
          </section>
        </div>
        <Link to="/#work" className="action-primary">
          Explore more work <ArrowRight size={16} />
        </Link>
      </main>
      <FooterSection />
    </>
  );
}
