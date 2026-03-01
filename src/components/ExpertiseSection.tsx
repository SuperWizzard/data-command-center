import { motion } from "framer-motion";
import { BarChart3, BrainCircuit, Database, FileSpreadsheet, Layers, LineChart, Settings, TrendingUp, Users } from "lucide-react";

const expertise = [
  { icon: Users, title: "Workforce Analytics & Capacity Modeling", desc: "Designing staffing simulations and capacity models that align headcount with demand forecasts and SLA targets." },
  { icon: Database, title: "Advanced SQL & Database Architecture", desc: "Architecting normalized schemas, writing optimized queries, and building performant database systems at scale." },
  { icon: TrendingUp, title: "Forecasting & Predictive Modeling", desc: "Building forecast frameworks that identify trends, isolate anomalies, and improve planning accuracy." },
  { icon: FileSpreadsheet, title: "Excel Modeling & Scenario Simulation", desc: "Creating dynamic financial and operational models with scenario analysis and sensitivity testing." },
  { icon: Layers, title: "BigQuery & Data Warehousing", desc: "Extracting, transforming, and structuring large-scale datasets for analytical consumption and reporting." },
  { icon: Settings, title: "Automation & Workflow Engineering", desc: "Building API-driven pipelines and automated reporting systems that eliminate manual processes." },
  { icon: BarChart3, title: "Performance KPI Framework Design", desc: "Defining, structuring, and monitoring KPIs that translate operational data into strategic decisions." },
  { icon: BrainCircuit, title: "Behavioral & Trend Analysis", desc: "Structuring data to track behavioral patterns, engagement metrics, and operational trends over time." },
  { icon: LineChart, title: "Data Visualization & Executive Reporting", desc: "Designing clear, impactful dashboards and reports that communicate insights to stakeholders." },
];

const ExpertiseSection = () => {
  return (
    <section id="expertise" className="py-24 bg-secondary/30">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-mono text-primary text-sm tracking-widest uppercase mb-2">Capabilities</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Core Expertise</h2>
          <div className="blue-line mb-12 max-w-xs" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {expertise.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="card-glow rounded-xl border border-border p-6 group"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;
