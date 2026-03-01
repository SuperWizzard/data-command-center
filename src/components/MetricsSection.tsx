import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const metrics = [
  { value: "5+", label: "Years in Data Analytics" },
  { value: "10+", label: "Forecast Models Built" },
  { value: "15+", label: "Automated Reporting Systems" },
  { value: "50+", label: "Large-Scale Datasets Optimized" },
];

const AnimatedValue = ({ value }: { value: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isInView) {
      const t = setTimeout(() => setShow(true), 200);
      return () => clearTimeout(t);
    }
  }, [isInView]);

  return (
    <span ref={ref} className="gradient-text text-5xl md:text-6xl font-bold font-mono metric-glow">
      {show ? value : "—"}
    </span>
  );
};

const MetricsSection = () => {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-mono text-primary text-sm tracking-widest uppercase mb-2">Impact</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Performance Metrics</h2>
          <div className="blue-line mb-12 max-w-xs" />
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="text-center"
            >
              <AnimatedValue value={m.value} />
              <p className="text-sm text-muted-foreground mt-3 leading-snug">{m.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricsSection;
