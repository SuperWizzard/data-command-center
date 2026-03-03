import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const metrics = [
  { value: 5, suffix: "+", label: "Years in Data Analytics" },
  { value: 5, suffix: "+", label: "Forecast Models Built" },
  { value: 15, suffix: "+", label: "Automated Reporting Systems" },
  { value: 50, suffix: "+", label: "Large-Scale Datasets Optimized" },
  { value: 10, suffix: "+", label: "Scheduling Models Designed" },
];

const AnimatedValue = ({ value, suffix }: { value: number; suffix: string }) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 1800;
    const steps = 72;
    const stepDuration = duration / steps;
    let step = 0;

    const timer = window.setInterval(() => {
      step += 1;
      const progress = Math.min(step / steps, 1);
      setDisplayValue(Math.round(value * progress));

      if (progress >= 1) {
        window.clearInterval(timer);
      }
    }, stepDuration);

    return () => window.clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="gradient-text text-5xl md:text-6xl font-bold font-mono metric-glow">
      {displayValue}
      {suffix}
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
              <AnimatedValue value={m.value} suffix={m.suffix} />
              <p className="text-sm text-muted-foreground mt-3 leading-snug">{m.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricsSection;
