import { motion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      </div>

      <div className="section-container relative z-10 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Photo placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="shrink-0"
          >
            <div className="w-48 h-48 lg:w-56 lg:h-56 rounded-full border-2 border-primary/30 bg-secondary flex items-center justify-center overflow-hidden"
              style={{ boxShadow: "var(--shadow-blue)" }}
            >
              <span className="text-muted-foreground text-sm font-mono text-center px-4">Upload Photo</span>
            </div>
          </motion.div>

          {/* Content */}
          <div className="text-center lg:text-left max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="font-mono text-primary text-sm tracking-widest uppercase mb-4"
            >
              Data & Performance Systems
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
            >
              Sobhe Mosaad
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-base md:text-lg text-muted-foreground font-medium mb-6"
            >
              Data Analyst · SQL Architect · Workforce & Systems Optimization Specialist
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-xl md:text-2xl font-semibold gradient-text mb-4"
            >
              I engineer data systems that transform operational complexity into structured, measurable performance.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-muted-foreground leading-relaxed mb-8"
            >
              With 5+ years of experience across workforce analytics, business performance modeling, automation engineering, and database architecture, I specialize in building scalable analytical systems that improve efficiency, forecast outcomes, and drive strategic decisions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <a
                href="#case-studies"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-primary-foreground transition-all duration-300 hover:brightness-110"
                style={{ background: "var(--gradient-blue)" }}
              >
                <ArrowDown className="w-4 h-4" />
                View Analytical Work
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold border border-border text-foreground bg-secondary hover:bg-muted transition-all duration-300"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
