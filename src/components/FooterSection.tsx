import { motion } from "framer-motion";
import { Download, Linkedin, Mail } from "lucide-react";

const FooterSection = () => {
  return (
    <footer id="contact" className="py-24 border-t border-border">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <p className="font-mono text-primary text-sm tracking-widest uppercase mb-4">Let's Connect</p>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10">
            My expertise lies at the intersection of workforce analytics, systems architecture, and performance optimization. I design data frameworks that make operations scalable, measurable, and strategically aligned.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a
              href="https://www.linkedin.com/in/sobhe-mosaad/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-border bg-card hover:border-primary/50 transition-all duration-300 text-sm font-medium"
            >
              <Linkedin className="w-4 h-4 text-primary" />
              LinkedIn
            </a>
            <a
              href="mailto:sobhemosaad@gmail.com"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-border bg-card hover:border-primary/50 transition-all duration-300 text-sm font-medium"
            >
              <Mail className="w-4 h-4 text-primary" />
              Email
            </a>
            <a
              href="/Sobhe_Mosaad_Resume.pdf"
              download
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg font-medium text-primary-foreground transition-all duration-300 hover:brightness-110 text-sm"
              style={{ background: "var(--gradient-blue)" }}
            >
              <Download className="w-4 h-4" />
              Download Resume
            </a>
          </div>

          <div className="blue-line mb-6" />
          <p className="text-xs text-muted-foreground font-mono">
            © 2026 Sobhe Mosaad — Data & Performance Systems
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterSection;
