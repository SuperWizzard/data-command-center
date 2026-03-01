import { motion } from "framer-motion";
import { Activity, BarChart3, Cpu, Gamepad2 } from "lucide-react";

const studies = [
  {
    icon: Activity,
    label: "Case Study 01",
    title: "Workforce Capacity Optimization Model",
    points: [
      "Designed multi-scenario staffing simulations aligned with demand patterns",
      "Modeled forecast vs actual performance gaps to quantify planning drift",
      "Reduced operational inefficiencies through data-driven headcount planning",
      "Analyzed SLA impact & operational risk across multiple service lines",
    ],
  },
  {
    icon: BarChart3,
    label: "Case Study 02",
    title: "Forecast Accuracy & Trend Isolation",
    points: [
      "Built weekly forecasting frameworks with rolling accuracy metrics",
      "Identified performance anomalies through statistical trend isolation",
      "Improved forecast accuracy & reduced resource misallocation",
    ],
  },
  {
    icon: Cpu,
    label: "Case Study 03",
    title: "Automated Data Pipeline Engineering",
    points: [
      "Built API-driven reporting systems with automated data refresh",
      "Reduced manual processes by engineering scalable data workflows",
      "Created real-time dashboards for cross-functional stakeholders",
    ],
  },
  {
    icon: Gamepad2,
    label: "Case Study 04",
    title: "Game System Data Architecture",
    points: [
      "Designed SQL database structures for an MMORPG ecosystem",
      "Structured player progression, inventory & transactional data schemas",
      "Built backend logic for player engagement tracking & economy balancing",
    ],
  },
];

const CaseStudiesSection = () => {
  return (
    <section id="case-studies" className="py-24">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-mono text-primary text-sm tracking-widest uppercase mb-2">Analytical Work</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Structured Case Studies</h2>
          <div className="blue-line mb-12 max-w-xs" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {studies.map((study, i) => (
            <motion.div
              key={study.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-glow rounded-xl border border-border p-8"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <study.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="font-mono text-xs text-primary tracking-widest uppercase">{study.label}</span>
              </div>
              <h3 className="text-xl font-bold mb-5">{study.title}</h3>
              <ul className="space-y-3">
                {study.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    <span className="leading-relaxed">{pt}</span>
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

export default CaseStudiesSection;
