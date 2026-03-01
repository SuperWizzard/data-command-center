import { motion } from "framer-motion";
import { Award } from "lucide-react";

const certs = [
  { title: "Udacity Data Analysis Nano Degree", org: "Udacity" },
  { title: "Analytics Certificate", org: "Upload your certificates" },
];

const CertificationsSection = () => {
  return (
    <section id="certifications" className="py-24">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-mono text-primary text-sm tracking-widest uppercase mb-2">Credentials</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Certifications</h2>
          <div className="blue-line mb-12 max-w-xs" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl">
          {certs.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="card-glow rounded-xl border border-border p-6 flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 rounded-xl border border-border bg-secondary/50 flex items-center justify-center mb-4">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">{cert.title}</h3>
              <p className="text-sm text-muted-foreground">{cert.org}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
