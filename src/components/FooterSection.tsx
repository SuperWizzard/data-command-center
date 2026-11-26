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
          <p className="eyebrow mb-4">11 / Let’s connect</p>
          <h2 className="contact-heading">What could we build next?</h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10">
            People, operations and technology are connected. Let’s talk about
            the challenges you are working on, the systems you want to improve
            and what could come next.
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

          <p className="text-xs text-muted-foreground mb-8">
            Visit information and AI conversations are stored to understand
            portfolio engagement. Please do not share confidential information.{" "}
            <a className="underline" href="mailto:sobhemosaad@gmail.com">
              Contact me about privacy
            </a>
            .
          </p>
          <div className="blue-line mb-6" />
          <p className="text-xs text-muted-foreground font-mono">
            © 2026 Sobhe Mosaad — Workforce · Data · Technology · Leadership
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterSection;
