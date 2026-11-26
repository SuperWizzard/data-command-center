import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Download,
  MessageSquare,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  chapters,
  currentWork,
  demonstrations,
  methodology,
  openPortfolioChat,
  profile,
  projects,
  starterQuestions,
} from "@/data/portfolio";
import university from "@/assets/helwan-logo.jpg";
import delivery from "@/assets/delivery-hero-logo.png";
import centrecom from "@/assets/centrecom-logo.png";
import portrait from "@/assets/profile-optimized.jpg";

export function SectionHeading({
  number,
  label,
  title,
  children,
}: {
  number: string;
  label: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="section-heading">
      <p className="eyebrow">
        <span>{number}</span> / {label}
      </p>
      <h2>{title}</h2>
      {children && <p className="section-intro">{children}</p>}
    </header>
  );
}
export function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
export function StoryHero() {
  return (
    <section id="top" className="story-hero section-container">
      <div className="hero-copy">
        <p className="eyebrow">
          Sobhe Mosaad <span className="eyebrow-rule" /> Based in Malta
        </p>
        <h1>
          I turn complexity
          <br />
          into <em>solutions.</em>
        </h1>
        <p className="hero-identity">{profile.identity}</p>
        <p className="hero-intro">{profile.intro}</p>
        <div className="hero-actions">
          <a className="action-primary" href="#story">
            Discover My Story <ArrowDown size={16} />
          </a>
          <a className="action-link" href="#work">
            Explore My Work <ArrowUpRight size={16} />
          </a>
        </div>
        <a className="resume-link" href={profile.resume} download>
          <Download size={14} /> Download Resume
        </a>
      </div>
      <div className="hero-portrait">
        <div className="portrait-index" aria-hidden="true">
          01 — THE PERSON BEHIND THE WORK
        </div>
        <img
          src={portrait}
          alt="Sobhe Mosaad"
          width="560"
          height="680"
          fetchPriority="high"
        />
        <div className="portrait-caption">
          <span>People. Data. Systems.</span>
          <span>Connected by curiosity.</span>
        </div>
      </div>
      <div className="hero-bottom">
        <span>
          From numbers to people.
          <br />
          From people to systems. From systems to innovation.
        </span>
        <a href="#story" aria-label="Scroll to the story">
          <ArrowDown size={22} />
        </a>
      </div>
    </section>
  );
}
export function StoryTimeline() {
  const [active, setActive] = useState(0);
  return (
    <section id="story" className="story-section section-container">
      <SectionHeading
        number="01"
        label="The journey"
        title="The Story Behind the Work"
      >
        A journey shaped by numbers, people and the question: what could work
        better?
      </SectionHeading>
      <div className="timeline-layout">
        <div className="chapter-list" aria-label="Choose a chapter">
          {chapters.map((c, i) => (
            <button
              key={c.title}
              aria-pressed={active === i}
              aria-controls="chapter-content"
              className={active === i ? "active" : ""}
              onClick={() => setActive(i)}
            >
              <span>0{i + 1}</span>
              <span>{c.title}</span>
              <ArrowUpRight size={16} />
            </button>
          ))}
        </div>
        <div
          id="chapter-content"
          className="chapter-content"
          aria-live="polite"
        >
          <span className="chapter-number" aria-hidden="true">
            0{active + 1}
          </span>
          <div className="journey-route">
            <span>Egypt</span>
            <i />
            <span>Malta</span>
            {active < 4 && (
              <img
                src={[university, delivery, centrecom, centrecom][active]}
                alt={
                  [
                    "Helwan University",
                    "Delivery Hero",
                    "Centrecom",
                    "Centrecom",
                  ][active]
                }
              />
            )}
          </div>
          <p className="eyebrow">{chapters[active].place}</p>
          <h3>{chapters[active].title}</h3>
          <p>{chapters[active].text}</p>
          <div className="chapter-focus">{chapters[active].focus}</div>
          <div className="chapter-paging">
            <button
              onClick={() => setActive(active - 1)}
              disabled={active === 0}
            >
              Previous chapter
            </button>
            <button
              onClick={() => setActive(active + 1)}
              disabled={active === chapters.length - 1}
            >
              Next chapter <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
export function LeadershipSection() {
  return (
    <section id="leadership" className="story-section leadership-band">
      <div className="section-container">
        <SectionHeading
          number="02"
          label="People first"
          title="Leadership Beyond the Numbers"
        />
        <div className="leadership-layout">
          <Reveal>
            <blockquote>
              “Creating clarity.
              <br />
              Enabling people.
              <br />
              <em>Encouraging ownership.</em>”
            </blockquote>
            <p className="muted-copy">{profile.philosophy}</p>
          </Reveal>
          <div>
            <div
              className="team-diagram"
              aria-label="Workforce Coordinator leads 4 Workforce Planners and 13 Real-Time Management team members"
            >
              <div className="coordinator">
                Workforce Coordinator<span>Sobhe Mosaad</span>
              </div>
              <div className="team-branches">
                <div>
                  <strong>4</strong>
                  <span>Workforce Planners</span>
                </div>
                <div>
                  <strong>13</strong>
                  <span>Real-Time Management</span>
                </div>
              </div>
            </div>
            <ul className="leadership-principles">
              <li>Connect operational needs with analytical solutions.</li>
              <li>Support professional development and team ownership.</li>
              <li>Design recruitment assessments and evaluate candidates.</li>
              <li>Improve communication between WFM and Operations.</li>
              <li>
                Identify risks early and encourage continuous improvement.
              </li>
              <li>Use technology to support people.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
export function ThinkingSection() {
  const [active, setActive] = useState(0);
  return (
    <section id="thinking" className="story-section section-container">
      <SectionHeading
        number="03"
        label="The approach"
        title="There is always a better way."
      >
        When I encounter repetitive work, I explore automation. When I encounter
        complexity, I look for structure. When I encounter limitations, I look
        for opportunities to build something better.
      </SectionHeading>
      <div className="process-steps" aria-label="Problem-solving steps">
        {methodology.map(([name], i) => (
          <button
            key={name}
            onClick={() => setActive(i)}
            aria-pressed={active === i}
            aria-controls="process-detail"
            className={active === i ? "active" : ""}
          >
            <span>0{i + 1}</span>
            {name}
            <ArrowRight size={16} />
          </button>
        ))}
      </div>
      <div id="process-detail" className="process-detail" aria-live="polite">
        <span>{methodology[active][0]}</span>
        <p>{methodology[active][1]}</p>
      </div>
    </section>
  );
}
export function BuiltSection() {
  const [filter, setFilter] = useState("All work");
  const filters = ["All work", "Professional", "Independent", "Ongoing"];
  const visible = projects.filter(
    (p) =>
      filter === "All work" ||
      (filter === "Professional"
        ? p.type.startsWith("Professional")
        : filter === "Ongoing"
          ? p.status === "In development"
          : !p.type.startsWith("Professional") &&
            p.status !== "In development"),
  );
  return (
    <section id="work" className="story-section section-container">
      <SectionHeading
        number="04"
        label="Selected work"
        title="Things I've Built"
      >
        Different contexts. One instinct: understand the problem, then build
        something useful.
      </SectionHeading>
      <div className="work-filters" aria-label="Filter projects">
        {filters.map((f) => (
          <button
            key={f}
            aria-pressed={f === filter}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="project-editorial-list">
        {visible.map((p) => (
          <Reveal key={p.slug}>
            <Link to={`/projects/${p.slug}`} className="project-editorial">
              <span className="project-index">0{projects.indexOf(p) + 1}</span>
              <div>
                <p className="eyebrow">{p.type}</p>
                <h3>{p.title}</h3>
                <p>{p.summary}</p>
                <div className="project-tags">
                  {p.tech.slice(0, 4).map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
              <div className="project-end">
                <span className="status-label">{p.status}</span>
                <ArrowUpRight size={28} />
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
      <div id="case-studies" className="featured-studies">
        <p className="eyebrow">A closer look / Featured case studies</p>
        <div>
          {[projects[0], projects[2]].map((p) => (
            <Link key={p.slug} to={`/projects/${p.slug}`}>
              <span>{p.type}</span>
              <h3>{p.title}</h3>
              <p>{p.challenge}</p>
              <b>
                Read the case study <ArrowUpRight size={16} />
              </b>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
export function DemonstrationsSection() {
  return (
    <section id="live-projects" className="story-section demonstrations-band">
      <div className="section-container">
        <SectionHeading
          number="05"
          label="Explore the detail"
          title="Interactive Analytical Projects"
        >
          Analytical demonstrations preserved from the original portfolio.
          Explore the models and source-based analysis.
        </SectionHeading>
        <div className="demo-grid">
          {demonstrations.map((p, i) => (
            <Link to={p.path} key={p.path}>
              <span className="eyebrow">
                Analytical demonstration / 0{i + 1}
              </span>
              <h3>{p.title}</h3>
              <p>{p.detail}</p>
              <span className="demo-tools">{p.tools}</span>
              <ArrowUpRight size={22} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
export function CurrentlyBuilding() {
  return (
    <section id="currently" className="story-section section-container">
      <SectionHeading
        number="08"
        label="The next chapter"
        title="Currently Building"
      >
        An evolving set of interests and ongoing work, guided by curiosity and
        practical problems.
      </SectionHeading>
      <div className="current-list">
        {currentWork.map((c) => (
          <div key={c.title}>
            <h3>{c.title}</h3>
            <p>{c.detail}</p>
            {c.project ? (
              <Link
                aria-label={`Explore ${c.title}`}
                to={`/projects/${c.project}`}
              >
                <ArrowUpRight size={20} />
              </Link>
            ) : (
              <a aria-label="Explore operational leadership" href="#leadership">
                <ArrowUpRight size={20} />
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
export function ExploreAI() {
  return (
    <section id="explore-ai" className="story-section ai-band">
      <div className="section-container ai-layout">
        <div>
          <p className="eyebrow">10 / A different way to explore</p>
          <h2>
            Explore My
            <br />
            <em>Story with AI</em>
          </h2>
          <p className="muted-copy">
            Ask about my journey, leadership or the systems I build. Follow your
            curiosity.
          </p>
          <button
            className="action-primary"
            onClick={() => openPortfolioChat()}
          >
            Start a conversation <MessageSquare size={16} />
          </button>
          <p className="ai-note">
            AI can make mistakes. The portfolio pages contain the latest
            reviewed information. Conversations are stored; please avoid sharing
            personal or confidential information.
          </p>
        </div>
        <div className="question-list">
          {starterQuestions.map((q) => (
            <button key={q} onClick={() => openPortfolioChat(q)}>
              {q}
              <ArrowUpRight size={16} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
