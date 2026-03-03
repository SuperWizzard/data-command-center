import { motion } from "framer-motion";

const techs = [
  { name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg" },
  { name: "Excel", icon: "https://img.icons8.com/color/48/microsoft-excel-2019--v1.png" },
  { name: "BigQuery", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
  { name: "Google Apps Script", icon: "https://img.icons8.com/color/48/google-apps-script.png" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "APIs", icon: "https://img.icons8.com/fluency/48/api-settings.png" },
  { name: "Power BI", icon: "https://img.icons8.com/color/48/power-bi.png" },
  { name: "NiCE IEX", icon: "https://img.icons8.com/fluency/48/monitor.png" },
  { name: "Salesforce", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/salesforce/salesforce-original.svg" },
  { name: "Data Modeling", icon: "https://img.icons8.com/fluency/48/database.png" },
  { name: "Forecasting", icon: "https://img.icons8.com/fluency/48/combo-chart.png" },
  { name: "WFM Systems", icon: "https://img.icons8.com/fluency/48/overtime.png" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
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
              key={tech.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              className="flex items-center gap-2.5 px-5 py-2.5 rounded-lg border border-border bg-card font-mono text-sm font-medium hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
            >
              <img src={tech.icon} alt={tech.name} className="w-5 h-5 object-contain" />
              {tech.name}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
