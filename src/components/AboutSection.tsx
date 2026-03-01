import { motion } from "framer-motion";
import { Briefcase, Cpu, Database, Gamepad2 } from "lucide-react";

const experiences = [
  {
    icon: Briefcase,
    title: "Workforce Analyst — Centrecom Malta",
    items: [
      "Headcount sizing & staffing simulations",
      "Forecast accuracy modeling",
      "Capacity optimization",
      "SLA performance impact analysis",
      "Shrinkage modeling & resource allocation",
      "Operational trend isolation",
      "Scenario modeling for workforce planning",
    ],
  },
  {
    icon: Briefcase,
    title: "Sr. Workforce Coordinator — talabat",
    items: [
      "BigQuery data extraction & analysis",
      "Python & API automation pipelines",
      "Workforce performance dashboards",
      "Automation reducing manual workload",
      "Scheduling system optimization",
    ],
  },
  {
    icon: Cpu,
    title: "Automation Engineering",
    items: [
      "Google Apps Script development",
      "API integrations & middleware",
      "Real-time reporting systems",
    ],
  },
  {
    icon: Database,
    title: "SQL Database Architecture",
    items: [
      "Database design & normalization",
      "Query optimization & performance tuning",
      "Structured data modeling",
    ],
  },
  {
    icon: Gamepad2,
    title: "Game Development — MMORPG (Silkroad-Inspired)",
    items: [
      "Player data schema design",
      "Progression systems structuring",
      "Behavioral data tracking",
      "Game economy logic & balancing",
    ],
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
};

const AboutSection = () => {
  return (
    <section id="about" className="py-24">
      <div className="section-container">
        <motion.div {...fadeInUp} transition={{ duration: 0.5 }}>
          <p className="font-mono text-primary text-sm tracking-widest uppercase mb-2">Analytical Identity</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <div className="blue-line mb-12 max-w-xs" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.title}
              {...fadeInUp}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-glow rounded-xl border border-border p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <exp.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-sm leading-tight">{exp.title}</h3>
              </div>
              <ul className="space-y-2">
                {exp.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
