import { Forecast, Workflow } from "./VisualStories";
import { stories } from "@/data/visualStories";
import { databaseCases } from "@/data/database";
import dashboard from "@/assets/dashboard-1.png";
import sql from "@/assets/sql-logo.jpg";
import "@/pages/refinement.css";
import { useState, type CSSProperties } from "react";
import {
  ArrowUpRight,
  Orbit,
  Download,
  MessageCircle,
  Search,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  profile,
  projects,
  openPortfolioChat,
  capabilities,
} from "@/data/portfolio";
import { disciplines, entries } from "@/data/universe";
import portrait from "@/assets/profile-optimized.jpg";
import nice from "@/assets/nice-logo.png";
import "./universe.css";

export const tint = (color: string) => ({ "--tint": color }) as CSSProperties;
export function OrbitHero() {
  const [active, select] = useState(0);
  const d = disciplines[active];
  return (
    <section id="top" className="orbit-hero">
      <div className="orbit-wrap section-container">
        <div className="orbit-copy">
          <p className="signal">
            <i /> <strong>Sobhe Mosaad</strong> <b>/</b> Malta
          </p>
          <h1>
            Beyond
            <br />
            <em>Boundaries.</em>
          </h1>
          <p className="orbit-lead">
            Connecting people, intelligence and technology to build better
            systems.
          </p>
          <div className="orbit-actions">
            <a href="#work">
              Explore projects <ArrowUpRight />
            </a>
            <a href="#story">My story</a>
            <button
              onClick={() => openPortfolioChat()}
              aria-label="Ask the portfolio assistant"
            >
              <MessageCircle />
            </button>
          </div>
          <a className="orbit-resume" href={profile.resume} download>
            <Download size={15} /> Download résumé
          </a>
        </div>
        <div
          className="observatory"
          onPointerMove={(e) => {
            if (e.pointerType === "mouse") {
              const r = e.currentTarget.getBoundingClientRect();
              e.currentTarget.style.setProperty(
                "--light",
                (100 * (e.clientX - r.left)) / r.width + "%",
              );
            }
          }}
        >
          <div className="instrument">
            <span>DISCIPLINE EXPLORER</span>
            <Orbit size={16} />
          </div>
          <div className="orbital">
            <svg viewBox="0 0 400 400" aria-hidden="true">
              <defs>
                <pattern
                  id="stars"
                  width="27"
                  height="27"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="2" cy="2" r=".9" fill="#77adcb" />
                </pattern>
              </defs>
              <circle cx="200" cy="200" r="192" fill="url(#stars)" />
              {[74, 99, 144, 167, 185].map((r) => (
                <circle key={r} cx="200" cy="200" r={r} className="ring" />
              ))}
              {disciplines.map((x, i) => {
                const a = (i * Math.PI) / 4 - Math.PI / 2;
                return (
                  <line
                    key={x.short}
                    x1="200"
                    y1="200"
                    x2={200 + 144 * Math.cos(a)}
                    y2={200 + 144 * Math.sin(a)}
                    stroke={x.color}
                    opacity={active === i ? 0.9 : 0.28}
                  />
                );
              })}
            </svg>
            <img src={portrait} alt="Sobhe Mosaad" />
            {disciplines.map((x, i) => {
              const a = (i * Math.PI) / 4 - Math.PI / 2;
              return (
                <button
                  key={x.short}
                  title={x.name}
                  aria-label={x.name}
                  aria-pressed={active === i}
                  style={{
                    ...tint(x.color),
                    left: 50 + 36 * Math.cos(a) + "%",
                    top: 50 + 36 * Math.sin(a) + "%",
                  }}
                  onClick={() => select(i)}
                >
                  <x.icon />
                  <small>{x.short}</small>
                </button>
              );
            })}
          </div>
          <div className="readout" style={tint(d.color)} aria-live="polite">
            <d.icon />
            <div>
              <strong>{d.name}</strong>
              <p>{d.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export function ProjectUniverse() {
  const [q, Q] = useState(""),
    [group, G] = useState(""),
    [type, T] = useState(""),
    [status, S] = useState("");
  const [collection, chooseCollection] = useState(0);
  const [entry, chooseEntry] = useState("");
  const matches = (s: string) =>
    s.toLowerCase().includes(q.trim().toLowerCase());
  const flags = projects.filter(
    (p) =>
      matches([p.title, p.summary, ...p.tech].join(" ")) &&
      (!group || disciplines[+group].slug === p.slug) &&
      (!type || type === "Case study") &&
      (!status || status === p.status),
  );
  const labs = entries.filter(
    (e) =>
      matches(e.title + " " + e.tools) &&
      (!group || group === String(e.group)) &&
      (!type || type === "Lab entry") &&
      (!status || status === e.status),
  );
  const collectionNames = [
    "AI and knowledge systems",
    "Workforce intelligence",
    "Automation and integration",
    "Database and data engineering",
    "Backend systems engineering",
    "Infrastructure and reliability",
    "Application development",
    "Leadership and operational strategy",
  ];
  const activeGroup = group
    ? Number(group)
    : q && labs.length && !labs.some((e) => e.group === collection)
      ? labs[0].group
      : collection;
  const topics = labs.filter((e) => e.group === activeGroup);
  const topic = topics.find((e) => e.id === entry) ?? topics[0];
  const showDatabase =
    (!group || group === "3") &&
    (!type || type === "Case study") &&
    (!status || status === "Professional experience") &&
    matches(
      "Database engineering SQL Server PostgreSQL BigQuery " +
        databaseCases.map((c) => c.title).join(" "),
    );
  return (
    <section id="work" className="section-container universe-section">
      <p className="signal">
        <i /> Selected systems
      </p>
      <h2>Project Universe</h2>
      <div className="directory">
        <label>
          <Search size={17} />
          <input
            aria-label="Search projects and lab"
            placeholder="Search projects, tools and topics"
            value={q}
            onChange={(e) => Q(e.target.value)}
          />
        </label>
        <select
          aria-label="Discipline"
          value={group}
          onChange={(e) => G(e.target.value)}
        >
          <option value="">All disciplines</option>
          {disciplines.map((d, i) => (
            <option key={d.short} value={i}>
              {d.name}
            </option>
          ))}
        </select>
        <select
          aria-label="Project type"
          value={type}
          onChange={(e) => T(e.target.value)}
        >
          <option value="">All types</option>
          <option>Case study</option>
          <option>Lab entry</option>
        </select>
        <select
          aria-label="Project status"
          value={status}
          onChange={(e) => S(e.target.value)}
        >
          <option value="">All statuses</option>
          {Array.from(
            new Set(
              [
                ...projects,
                ...entries,
                { status: "Professional experience" },
              ].map((e) => e.status),
            ),
          ).map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>
      <div id="case-studies" className="showcase">
        {showDatabase && (
          <article className="showcase-row" style={tint("#34d399")}>
            <div className="showcase-copy">
              <small>Data engineering</small>
              <h3>Database engineering</h3>
              <p>
                Connect historical workforce records, trace unexpected results
                and protect database changes.
              </p>
              <Link to="/data-engineering">Explore SQL case studies ↗</Link>
            </div>
            <div className="showcase-media">
              <Workflow
                title="Synthetic workforce data lineage"
                steps={[
                  [
                    "Roster interval",
                    "The time and activity recorded for the employee.",
                  ],
                  [
                    "Effective assignment",
                    "Match the assignment valid on the roster date.",
                  ],
                  [
                    "Reporting output",
                    "Verify that each interval contributes only once.",
                  ],
                ]}
              />
            </div>
          </article>
        )}
        {flags.map((p) => {
          const d = disciplines.find((x) => x.slug === p.slug)!;
          return (
            <article
              className="showcase-row"
              key={p.slug}
              style={tint(d.color)}
            >
              <div className="showcase-copy">
                <small>{p.status}</small>
                <h3>{p.title}</h3>
                <p>{p.summary}</p>
                <p>{p.tech.slice(0, 3).join(" · ")}</p>
                <Link to={"/projects/" + p.slug}>Read case study ↗</Link>
              </div>
              <div className="showcase-media">
                {p.slug === "digital-ecosystem" ? (
                  <img
                    src={dashboard}
                    alt="Preview from the portfolio’s analytical dashboard gallery"
                    loading="lazy"
                  />
                ) : p.slug === "workforce-automation" ? (
                  <>
                    <Forecast />
                    <Workflow
                      title="Reporting workflow"
                      steps={stories[p.slug].slice(2)}
                    />
                  </>
                ) : (
                  <Workflow
                    title={
                      p.slug === "wfm-migration"
                        ? "Source to target"
                        : "Conceptual system preview"
                    }
                    steps={stories[p.slug].filter(
                      (_, i, a) =>
                        i === 0 ||
                        i === Math.floor(a.length / 2) ||
                        i === a.length - 1,
                    )}
                  />
                )}
              </div>
            </article>
          );
        })}
      </div>
      <div id="lab" className="lab">
        <h3>Engineering Lab</h3>
        <p>Explore the technical decisions behind the projects.</p>
        {!group && (
          <div className="collection-nav" aria-label="Engineering collections">
            {collectionNames.map((name, i) => (
              <button
                key={name}
                aria-pressed={i === activeGroup}
                onClick={() => {
                  chooseCollection(i);
                  chooseEntry("");
                }}
              >
                {name}
              </button>
            ))}
          </div>
        )}
        <article
          className="collection-feature"
          style={tint(disciplines[activeGroup].color)}
        >
          <h4>{collectionNames[activeGroup]}</h4>
          <p>{disciplines[activeGroup].description}</p>
          {activeGroup === 3 && (
            <>
              <img src={sql} width="60" alt="SQL Server" />
              <Link to="/data-engineering">
                Open the database engineering showcase ↗
              </Link>
            </>
          )}
          {topics.length > 0 && (
            <label>
              Technical example{" "}
              <select
                value={topic?.id}
                onChange={(e) => chooseEntry(e.target.value)}
              >
                {topics.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.title}
                  </option>
                ))}
              </select>
            </label>
          )}
          {topic ? (
            <div aria-live="polite">
              <Workflow
                key={topic.id}
                title={topic.title}
                steps={[
                  ["Problem", topic.problem],
                  ["Approach", topic.approach],
                  ["Tools", topic.tools],
                ]}
              />
              <Link to={"/projects/" + disciplines[activeGroup].slug}>
                Related case study ↗
              </Link>
            </div>
          ) : (
            activeGroup !== 3 && (
              <p>No published examples match this collection and filter.</p>
            )
          )}
        </article>
      </div>
      {!showDatabase && !flags.length && !labs.length && (
        <p role="status">
          No matches.{" "}
          <button
            onClick={() => {
              Q("");
              G("");
              T("");
              S("");
            }}
          >
            Clear filters
          </button>
        </p>
      )}
    </section>
  );
}
export function Ecosystem() {
  const tools = Array.from(
    new Set([
      ...capabilities.flatMap((c) => c.items),
      ...projects.flatMap((p) => p.tech),
    ]),
  );
  const [tool, select] = useState("NICE IEX");
  const related = projects.filter(
    (p) =>
      p.tech.includes(tool) ||
      capabilities.some((c) => c.project === p.slug && c.items.includes(tool)),
  );
  return (
    <section id="tech" className="section-container universe-section">
      <p className="signal">
        <i /> Tools in practice
      </p>
      <h2>Technology ecosystem</h2>
      <p>
        <Link to="/data-engineering">
          Explore database engineering and SQL case studies ↗
        </Link>
      </p>
      <div className="tech-console">
        <div>
          {tools.map((t) => (
            <button aria-pressed={t === tool} key={t} onClick={() => select(t)}>
              {t}
            </button>
          ))}
        </div>
        <aside aria-live="polite">
          {tool === "NICE IEX" && <img src={nice} alt="" width="60" />}
          <h3>{tool}</h3>
          {related.map((p) => (
            <p key={p.slug}>
              <Link to={"/projects/" + p.slug}>{p.title} ↗</Link>
              <br />
              {p.summary}
            </p>
          ))}
          {entries
            .filter((e) => e.tools.split(" · ").includes(tool))
            .slice(0, 4)
            .map((e) => (
              <small key={e.id}>
                {e.title} · {e.status}
                <br />
              </small>
            ))}
        </aside>
      </div>
    </section>
  );
}
