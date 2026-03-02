import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";

const certs = [
  { title: "Data Analysis Nano Degree", org: "Udacity", url: "https://s3-us-west-2.amazonaws.com/udacity-printer/production/certificates/2a3ac4a9-f7cf-455f-a438-8520fedd4ba4.pdf" },
  { title: "Understanding Data Visualization", org: "DataCamp", url: "https://www.datacamp.com/statement-of-accomplishment/course/bae3db506d1df1cafaa39c0034af628f940bce01?raw=1" },
  { title: "Intermediate SQL", org: "DataCamp", url: "https://www.datacamp.com/statement-of-accomplishment/course/bf326c4747784867fc86f99a493f383fa273bd40?raw=1" },
  { title: "Introduction to Data Science in Python", org: "DataCamp", url: "https://www.datacamp.com/statement-of-accomplishment/course/d69e5002011e2121c3e990db9ac6404d657def96?raw=1" },
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
              <p className="text-sm text-muted-foreground mb-3">{cert.org}</p>
              <a
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                View Certificate
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
