import { motion } from "framer-motion";

const techs = [
  "SQL", "Excel", "BigQuery", "Python", "Google Apps Script",
  "JavaScript", "APIs", "Tableau", "Salesforce", "Data Modeling",
  "Forecasting", "Workforce Management Systems",
];

const TechStackSection = () => {
  return (
    <section id="tech" className="py-24 bg-secondary/30">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-mono text-primary text-sm tracking-widest uppercase mb-2">Tools & Technologies</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Stack</h2>
          <div className="blue-line mb-12 max-w-xs" />
        </motion.div>

        <div className="flex flex-wrap gap-3 justify-center max-w-3xl mx-auto">
          {techs.map((tech, i) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              className="px-5 py-2.5 rounded-lg border border-border bg-card font-mono text-sm font-medium hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
            >
              {tech}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
