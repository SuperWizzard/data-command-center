import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft, Shield, Brain, Settings, AlertTriangle, CheckCircle2,
  ChevronRight, Users, Target, TrendingUp, BarChart3, Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import {
  crisisResponse, escalationMatrix, forecastMethods,
  resourceAllocationGoals, impactMetrics,
} from "@/lib/workforceData";

const CHART_COLORS = [
  "hsl(215, 90%, 58%)", "hsl(200, 85%, 45%)", "hsl(180, 70%, 45%)",
  "hsl(260, 60%, 55%)", "hsl(340, 65%, 55%)", "hsl(30, 80%, 55%)",
];

const IMPACT_COLORS: Record<string, string> = {
  Low: "hsl(180, 70%, 45%)",
  Medium: "hsl(30, 80%, 55%)",
  High: "hsl(340, 65%, 55%)",
  Critical: "hsl(0, 84%, 60%)",
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 text-xs shadow-xl">
      <p className="font-semibold text-foreground mb-1">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.color }} className="flex justify-between gap-4">
          <span>{p.name}:</span>
          <span className="font-mono font-semibold">{p.value}{p.unit || ""}</span>
        </p>
      ))}
    </div>
  );
};

const SectionTitle = ({ mono, title }: { mono: string; title: string }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-6">
    <p className="font-mono text-primary text-xs tracking-widest uppercase mb-1">{mono}</p>
    <h2 className="text-xl md:text-2xl font-bold text-foreground">{title}</h2>
  </motion.div>
);

const MetricCard = ({ icon: Icon, label, value, sub }: { icon: any; label: string; value: string; sub?: string }) => (
  <div className="card-glow rounded-xl border border-border p-5 flex flex-col">
    <div className="flex items-center gap-2 mb-2">
      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
    <span className="text-2xl font-bold font-mono text-foreground">{value}</span>
    {sub && <span className="text-xs text-muted-foreground mt-1">{sub}</span>}
  </div>
);

const WorkforcePage = () => {
  const [activeTab, setActiveTab] = useState<"crisis" | "forecasting" | "allocation">("crisis");
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  const forecastChartData = forecastMethods.map(m => ({
    name: m.name.length > 12 ? m.name.substring(0, 12) + "…" : m.name,
    fullName: m.name,
    Accuracy: m.accuracy,
    Complexity: m.complexity,
  }));

  const forecastRadarData = forecastMethods.map(m => ({
    method: m.name.split(" ")[0],
    accuracy: m.accuracy,
    complexity: m.complexity,
  }));

  const categoryDistribution = [
    { name: "Qualitative", value: forecastMethods.filter(m => m.category === "Qualitative").length },
    { name: "Quantitative", value: forecastMethods.filter(m => m.category === "Quantitative").length },
  ];

  const impactComparison = [
    { metric: "Scheduling Eff.", Before: impactMetrics.before.schedulingEfficiency, After: impactMetrics.after.schedulingEfficiency },
    { metric: "Resource Util.", Before: impactMetrics.before.resourceUtilization, After: impactMetrics.after.resourceUtilization },
    { metric: "Team Satisfaction", Before: impactMetrics.before.teamSatisfaction, After: impactMetrics.after.teamSatisfaction },
    { metric: "On-Time Delivery", Before: impactMetrics.before.deliveryOnTime, After: impactMetrics.after.deliveryOnTime },
    { metric: "Skills Match", Before: impactMetrics.before.skillsMatchRate, After: impactMetrics.after.skillsMatchRate },
  ];

  const impactRadar = [
    { metric: "Efficiency", before: impactMetrics.before.schedulingEfficiency, after: impactMetrics.after.schedulingEfficiency },
    { metric: "Utilization", before: impactMetrics.before.resourceUtilization, after: impactMetrics.after.resourceUtilization },
    { metric: "Satisfaction", before: impactMetrics.before.teamSatisfaction, after: impactMetrics.after.teamSatisfaction },
    { metric: "On-Time", before: impactMetrics.before.deliveryOnTime, after: impactMetrics.after.deliveryOnTime },
    { metric: "Skills Match", before: impactMetrics.before.skillsMatchRate, after: impactMetrics.after.skillsMatchRate },
  ];

  const tabClass = (tab: string) =>
    `px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
      activeTab === tab
        ? "bg-primary text-primary-foreground shadow-lg"
        : "bg-secondary text-muted-foreground hover:text-foreground"
    }`;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-50">
        <div className="section-container flex items-center gap-4 h-16">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Portfolio</span>
          </Link>
          <div className="h-5 w-px bg-border" />
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <span className="font-semibold text-sm">Senior Workforce Case Study</span>
          </div>
        </div>
      </div>

      <div className="section-container py-12">
        {/* Title */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <p className="font-mono text-primary text-sm tracking-widest uppercase mb-2">Workforce Strategy</p>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Senior Workforce Management Framework</h1>
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            A multi-dimensional workforce management case study covering crisis response using the STAR technique,
            forecasting methodology selection, BPO contingency escalation, and advanced resource allocation system design.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/20">
            <span className="text-xs font-mono text-primary">🎯</span>
            <span className="text-xs text-muted-foreground">
              Developed as a senior workforce management assessment — demonstrating strategic planning, crisis management, and operational optimization.
            </span>
          </div>
        </motion.div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap gap-2 mb-10">
          <button className={tabClass("crisis")} onClick={() => setActiveTab("crisis")}>
            <span className="flex items-center gap-2"><Shield className="w-4 h-4" /> Crisis Response & BPO</span>
          </button>
          <button className={tabClass("forecasting")} onClick={() => setActiveTab("forecasting")}>
            <span className="flex items-center gap-2"><Brain className="w-4 h-4" /> Forecasting Methods</span>
          </button>
          <button className={tabClass("allocation")} onClick={() => setActiveTab("allocation")}>
            <span className="flex items-center gap-2"><Settings className="w-4 h-4" /> Resource Allocation</span>
          </button>
        </div>

        {/* ═══════════ CRISIS RESPONSE TAB ═══════════ */}
        {activeTab === "crisis" && (
          <div className="space-y-12">
            {/* STAR Overview */}
            <div>
              <SectionTitle mono="STAR Technique" title="Crisis Response Framework" />
              <p className="text-sm text-muted-foreground mb-6 max-w-3xl leading-relaxed">
                The STAR Technique provides a structured format to present Situation, Task, Action, and Result —
                enabling clear communication of the thought process, actions taken, and outcomes achieved.
              </p>

              {/* Situation */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="card-glow rounded-xl border border-border p-6 mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center font-bold text-primary text-sm">S</div>
                  <h3 className="font-bold text-foreground">Situation</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{crisisResponse.situation}</p>
              </motion.div>

              {/* Task */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="card-glow rounded-xl border border-border p-6 mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center font-bold text-primary text-sm">T</div>
                  <h3 className="font-bold text-foreground">Task</h3>
                </div>
                <ul className="space-y-2">
                  {crisisResponse.tasks.map(t => (
                    <li key={t} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      <span className="leading-relaxed">{t}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Actions — expandable steps */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="card-glow rounded-xl border border-border p-6 mb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center font-bold text-primary text-sm">A</div>
                  <h3 className="font-bold text-foreground">Action — 5-Step Response Plan</h3>
                </div>
                <div className="space-y-2">
                  {crisisResponse.actions.map((a, i) => (
                    <div key={i} className="rounded-lg border border-border/50 bg-secondary/30 overflow-hidden">
                      <button
                        onClick={() => setExpandedStep(expandedStep === i ? null : i)}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-secondary/50 transition-colors"
                      >
                        <span className="w-6 h-6 rounded-md bg-primary/20 flex items-center justify-center text-xs font-bold text-primary shrink-0">{i + 1}</span>
                        <span className="text-sm font-medium text-foreground flex-1">{a.step}</span>
                        <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${expandedStep === i ? "rotate-90" : ""}`} />
                      </button>
                      {expandedStep === i && (
                        <div className="px-4 pb-3 pl-13">
                          <p className="text-sm text-muted-foreground leading-relaxed ml-9">{a.detail}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Results */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="card-glow rounded-xl border border-border p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center font-bold text-primary text-sm">R</div>
                  <h3 className="font-bold text-foreground">Results</h3>
                </div>
                <ul className="space-y-2">
                  {crisisResponse.results.map(r => (
                    <li key={r} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span className="leading-relaxed">{r}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* BPO Escalation Matrix */}
            <div>
              <SectionTitle mono="Contingency Planning" title="BPO Escalation Matrix" />
              <p className="text-sm text-muted-foreground mb-6 max-w-3xl leading-relaxed">
                When a BPO partner fails to apply updated schedules, a structured escalation framework ensures
                business continuity with proportional response based on impact severity.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {escalationMatrix.map((e) => (
                  <motion.div key={e.level} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="card-glow rounded-xl border border-border p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm"
                          style={{ backgroundColor: IMPACT_COLORS[e.impact] + "20", color: IMPACT_COLORS[e.impact] }}>
                          L{e.level}
                        </div>
                        <h4 className="font-semibold text-foreground text-sm">{e.label}</h4>
                      </div>
                      <span className="text-xs font-mono px-2 py-1 rounded-md"
                        style={{ backgroundColor: IMPACT_COLORS[e.impact] + "20", color: IMPACT_COLORS[e.impact] }}>
                        {e.impact}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3 italic">{e.condition}</p>
                    <ul className="space-y-1.5">
                      {e.actions.map(a => (
                        <li key={a} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <ChevronRight className="w-3 h-3 text-primary mt-0.5 shrink-0" />
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ═══════════ FORECASTING TAB ═══════════ */}
        {activeTab === "forecasting" && (
          <div className="space-y-12">
            <div>
              <SectionTitle mono="Methodology" title="Forecasting Methods Framework" />
              <p className="text-sm text-muted-foreground mb-6 max-w-3xl leading-relaxed">
                The choice of forecasting method depends on data availability, the nature of the variable being forecasted,
                accuracy requirements, and available expertise. A hybrid approach is often used to enhance accuracy.
              </p>
            </div>

            {/* Accuracy vs Complexity Chart */}
            <div>
              <SectionTitle mono="Comparison" title="Accuracy vs Complexity" />
              <div className="card-glow rounded-xl border border-border p-6">
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={forecastChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,14%,18%)" />
                    <XAxis dataKey="name" tick={{ fontSize: 10, fill: "hsl(215,12%,55%)" }} angle={-20} textAnchor="end" height={60} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "hsl(215,12%,55%)" }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="Accuracy" name="Accuracy Score" fill={CHART_COLORS[0]} radius={[3, 3, 0, 0]} />
                    <Bar dataKey="Complexity" name="Complexity Score" fill={CHART_COLORS[4]} radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Radar + Pie */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <SectionTitle mono="Multi-Dimensional" title="Method Radar Analysis" />
                <div className="card-glow rounded-xl border border-border p-6">
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={forecastRadarData}>
                      <PolarGrid stroke="hsl(220,14%,18%)" />
                      <PolarAngleAxis dataKey="method" tick={{ fontSize: 10, fill: "hsl(215,12%,55%)" }} />
                      <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 9, fill: "hsl(215,12%,55%)" }} />
                      <Radar name="Accuracy" dataKey="accuracy" stroke={CHART_COLORS[0]} fill={CHART_COLORS[0]} fillOpacity={0.3} />
                      <Radar name="Complexity" dataKey="complexity" stroke={CHART_COLORS[4]} fill={CHART_COLORS[4]} fillOpacity={0.2} />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div>
                <SectionTitle mono="Distribution" title="Qualitative vs Quantitative" />
                <div className="card-glow rounded-xl border border-border p-6">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie data={categoryDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%"
                        outerRadius={100} innerRadius={50} label={({ name, value }) => `${name}: ${value}`}>
                        {categoryDistribution.map((_, i) => (
                          <Cell key={i} fill={CHART_COLORS[i]} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Method Cards */}
            <div>
              <SectionTitle mono="Detail View" title="Individual Method Profiles" />
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {forecastMethods.map((m, i) => (
                  <motion.div key={m.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                    className="card-glow rounded-xl border border-border p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-primary/10 text-primary">{m.category}</span>
                      <span className="text-xs font-mono text-muted-foreground">Data: {m.dataRequirement}</span>
                    </div>
                    <h4 className="font-semibold text-sm text-foreground mb-2">{m.name}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-3">{m.description}</p>
                    <div className="flex gap-4 text-xs">
                      <div>
                        <span className="text-muted-foreground">Accuracy: </span>
                        <span className="font-mono font-semibold text-foreground">{m.accuracy}%</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Complexity: </span>
                        <span className="font-mono font-semibold text-foreground">{m.complexity}%</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ═══════════ RESOURCE ALLOCATION TAB ═══════════ */}
        {activeTab === "allocation" && (
          <div className="space-y-12">
            {/* Objective & Vision */}
            <div>
              <SectionTitle mono="Strategic Goal" title="Advanced Resource Allocation System" />
              <div className="grid md:grid-cols-2 gap-6">
                <div className="card-glow rounded-xl border border-border p-6">
                  <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Target className="w-4 h-4 text-primary" /> Vision
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{resourceAllocationGoals.vision}</p>
                </div>
                <div className="card-glow rounded-xl border border-border p-6">
                  <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" /> Mission
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{resourceAllocationGoals.mission}</p>
                </div>
              </div>
            </div>

            {/* Impact Metrics */}
            <div>
              <SectionTitle mono="Impact Analysis" title="Before vs After Implementation" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <MetricCard icon={BarChart3} label="Scheduling Efficiency" value={`+${impactMetrics.after.schedulingEfficiency - impactMetrics.before.schedulingEfficiency}%`} sub={`${impactMetrics.before.schedulingEfficiency}% → ${impactMetrics.after.schedulingEfficiency}%`} />
                <MetricCard icon={Users} label="Resource Utilization" value={`+${impactMetrics.after.resourceUtilization - impactMetrics.before.resourceUtilization}%`} sub={`${impactMetrics.before.resourceUtilization}% → ${impactMetrics.after.resourceUtilization}%`} />
                <MetricCard icon={TrendingUp} label="On-Time Delivery" value={`+${impactMetrics.after.deliveryOnTime - impactMetrics.before.deliveryOnTime}%`} sub={`${impactMetrics.before.deliveryOnTime}% → ${impactMetrics.after.deliveryOnTime}%`} />
                <MetricCard icon={Target} label="Overtime Reduced" value={`-${impactMetrics.before.overtimeHours - impactMetrics.after.overtimeHours}h`} sub={`${impactMetrics.before.overtimeHours}h → ${impactMetrics.after.overtimeHours}h avg/week`} />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="card-glow rounded-xl border border-border p-6">
                  <p className="text-xs font-mono text-primary tracking-widest uppercase mb-4">Bar Comparison</p>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={impactComparison}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,14%,18%)" />
                      <XAxis dataKey="metric" tick={{ fontSize: 10, fill: "hsl(215,12%,55%)" }} />
                      <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "hsl(215,12%,55%)" }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar dataKey="Before" name="Before" fill={CHART_COLORS[4]} radius={[3, 3, 0, 0]} opacity={0.7} />
                      <Bar dataKey="After" name="After" fill={CHART_COLORS[0]} radius={[3, 3, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="card-glow rounded-xl border border-border p-6">
                  <p className="text-xs font-mono text-primary tracking-widest uppercase mb-4">Radar Overlay</p>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={impactRadar}>
                      <PolarGrid stroke="hsl(220,14%,18%)" />
                      <PolarAngleAxis dataKey="metric" tick={{ fontSize: 10, fill: "hsl(215,12%,55%)" }} />
                      <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 9, fill: "hsl(215,12%,55%)" }} />
                      <Radar name="Before" dataKey="before" stroke={CHART_COLORS[4]} fill={CHART_COLORS[4]} fillOpacity={0.2} />
                      <Radar name="After" dataKey="after" stroke={CHART_COLORS[0]} fill={CHART_COLORS[0]} fillOpacity={0.3} />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Approach Steps */}
            <div>
              <SectionTitle mono="Implementation" title="Approach & Methodology" />
              <div className="space-y-3">
                {resourceAllocationGoals.approach.map((a, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="card-glow rounded-xl border border-border p-5 flex gap-4">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-sm font-bold text-primary">{i + 1}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Goal Basis */}
            <div>
              <SectionTitle mono="Basis for Selection" title="Why This Goal?" />
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {resourceAllocationGoals.basisForSelection.map((b, i) => (
                  <div key={i} className="card-glow rounded-xl border border-border p-5">
                    <h4 className="font-semibold text-sm text-foreground mb-2 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      {b.factor}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{b.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategic Goals */}
            <div>
              <SectionTitle mono="Outcomes" title="Strategic Goals" />
              <div className="grid md:grid-cols-3 gap-4">
                {resourceAllocationGoals.goals.map((g, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="card-glow rounded-xl border border-border p-6">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                      <Zap className="w-5 h-5 text-primary" />
                    </div>
                    <h4 className="font-semibold text-sm text-foreground mb-2">{g.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{g.detail}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkforcePage;
