import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft, ShoppingCart, AlertTriangle, CheckCircle2, ChevronRight,
  Package, Zap, Users, FlaskConical, ArrowRightLeft, Settings,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import {
  problemsEncountered, procurementProcess, orderPipeline, erpCapabilities,
  promotionTest, changeManagement, erpImpactData, automationBreakdown,
} from "@/lib/erpData";

const CHART_COLORS = [
  "hsl(215, 90%, 58%)", "hsl(200, 85%, 45%)", "hsl(180, 70%, 45%)",
  "hsl(260, 60%, 55%)", "hsl(340, 65%, 55%)", "hsl(30, 80%, 55%)",
];

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

const ErpAnalysisPage = () => {
  const [activeTab, setActiveTab] = useState<"problems" | "procurement" | "promotions" | "change">("problems");

  const tabClass = (tab: string) =>
    `px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
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
            <ShoppingCart className="w-5 h-5 text-primary" />
            <span className="font-semibold text-sm">ERP & Business Analysis Case Study</span>
          </div>
        </div>
      </div>

      <div className="section-container py-12">
        {/* Title */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <p className="font-mono text-primary text-sm tracking-widest uppercase mb-2">Business Analysis</p>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">ERP System Upgrade & Operational Efficiency</h1>
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            A comprehensive business analysis case study covering ERP migration from legacy systems to modern cloud-based solutions,
            addressing procurement inefficiencies, promotion automation gaps, and change management strategy for multi-location retail expansion.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/20">
            <span className="text-xs font-mono text-primary">💼</span>
            <span className="text-xs text-muted-foreground">
              Developed as a business analyst assessment — demonstrating requirements gathering, gap analysis, and stakeholder management.
            </span>
          </div>
        </motion.div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap gap-2 mb-10">
          <button className={tabClass("problems")} onClick={() => setActiveTab("problems")}>
            <span className="flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> Problem Analysis</span>
          </button>
          <button className={tabClass("procurement")} onClick={() => setActiveTab("procurement")}>
            <span className="flex items-center gap-2"><Package className="w-4 h-4" /> Procurement Flow</span>
          </button>
          <button className={tabClass("promotions")} onClick={() => setActiveTab("promotions")}>
            <span className="flex items-center gap-2"><FlaskConical className="w-4 h-4" /> Promotions & Testing</span>
          </button>
          <button className={tabClass("change")} onClick={() => setActiveTab("change")}>
            <span className="flex items-center gap-2"><ArrowRightLeft className="w-4 h-4" /> Change Management</span>
          </button>
        </div>

        {/* ═══ PROBLEMS TAB ═══ */}
        {activeTab === "problems" && (
          <div className="space-y-12">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Procurement Issues */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="card-glow rounded-xl border border-border p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                    <Package className="w-5 h-5 text-destructive" />
                  </div>
                  <h3 className="font-bold text-foreground">Procurement Issues</h3>
                </div>
                <ul className="space-y-3">
                  {problemsEncountered.procurement.map((p, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                      <span className="leading-relaxed">{p}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Promotion Issues */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="card-glow rounded-xl border border-border p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-destructive" />
                  </div>
                  <h3 className="font-bold text-foreground">Promotion Management Problems</h3>
                </div>
                <ul className="space-y-3">
                  {problemsEncountered.promotions.map((p, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                      <span className="leading-relaxed">{p}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Impact Chart */}
            <div>
              <SectionTitle mono="Impact Analysis" title="Before vs After ERP Upgrade" />
              <div className="card-glow rounded-xl border border-border p-6">
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={erpImpactData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,14%,18%)" />
                    <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: "hsl(215,12%,55%)" }} unit="%" />
                    <YAxis type="category" dataKey="metric" tick={{ fontSize: 11, fill: "hsl(215,12%,55%)" }} width={140} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="before" name="Before (Legacy)" fill={CHART_COLORS[4]} radius={[0, 3, 3, 0]} opacity={0.7} />
                    <Bar dataKey="after" name="After (Upgraded)" fill={CHART_COLORS[0]} radius={[0, 3, 3, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* ═══ PROCUREMENT TAB ═══ */}
        {activeTab === "procurement" && (
          <div className="space-y-12">
            {/* Process Steps */}
            <div>
              <SectionTitle mono="End-to-End Flow" title="Optimized Procurement Process" />
              <div className="space-y-3">
                {procurementProcess.map((step, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                    className="card-glow rounded-xl border border-border p-5 flex gap-4">
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <span className="text-sm font-bold text-primary">{step.step}</span>
                      </div>
                      <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                        step.status === "automated" ? "bg-primary/10 text-primary" :
                        step.status === "hybrid" ? "bg-accent/10 text-accent" : "text-muted-foreground"
                      }`}>{step.status}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-foreground mb-1">{step.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
                    </div>
                    {i < procurementProcess.length - 1 && (
                      <ChevronRight className="w-4 h-4 text-muted-foreground/30 self-center ml-auto shrink-0" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Order Pipeline + Automation Breakdown */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <SectionTitle mono="Status Tracking" title="Order Pipeline Stages" />
                <div className="card-glow rounded-xl border border-border p-6">
                  <div className="space-y-4">
                    {orderPipeline.map((stage, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="flex flex-col items-center">
                          <div className="w-3 h-3 rounded-full bg-primary border-2 border-primary/30" />
                          {i < orderPipeline.length - 1 && <div className="w-0.5 h-8 bg-border" />}
                        </div>
                        <div className="-mt-0.5">
                          <h4 className="text-sm font-semibold text-foreground">{stage.stage}</h4>
                          <p className="text-xs text-muted-foreground">{stage.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <SectionTitle mono="Automation" title="Process Automation Breakdown" />
                <div className="card-glow rounded-xl border border-border p-6">
                  <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                      <Pie data={automationBreakdown} dataKey="value" nameKey="name" cx="50%" cy="50%"
                        outerRadius={95} innerRadius={45} label={({ name, value }) => `${name}: ${value}`}
                        labelLine={{ stroke: "hsl(215,12%,55%)" }}>
                        {automationBreakdown.map((_, i) => (
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
          </div>
        )}

        {/* ═══ PROMOTIONS TAB ═══ */}
        {activeTab === "promotions" && (
          <div className="space-y-12">
            {/* Capabilities */}
            <div>
              <SectionTitle mono="Gap Analysis" title="ERP Promotion Capabilities" />
              <div className="grid md:grid-cols-2 gap-6">
                {/* Supported */}
                <div className="card-glow rounded-xl border border-border p-6">
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" /> Native Capabilities
                  </h3>
                  <div className="space-y-3">
                    {erpCapabilities.native.map((c, i) => (
                      <div key={i} className="rounded-lg bg-secondary/30 p-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-foreground">{c.feature}</span>
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                            c.supported === true ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"
                          }`}>{c.supported === true ? "Supported" : "Partial"}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{c.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Limitations */}
                <div className="card-glow rounded-xl border border-border p-6">
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-destructive" /> Limitations Identified
                  </h3>
                  <div className="space-y-3">
                    {erpCapabilities.limitations.map((l, i) => (
                      <div key={i} className="rounded-lg bg-secondary/30 p-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-foreground">{l.feature}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-destructive/10 text-destructive">{l.gap}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{l.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Solution */}
            <div>
              <SectionTitle mono="Proposed Solution" title="Third-Party Retail Integration" />
              <div className="card-glow rounded-xl border border-border p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Settings className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">{erpCapabilities.solution.name}</h3>
                    <p className="text-xs text-muted-foreground">Marketplace-integrated extension for advanced promotions</p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-2">
                  {erpCapabilities.solution.benefits.map((b, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                      <span className="text-xs leading-relaxed">{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Test Cases */}
            <div>
              <SectionTitle mono="UAT Testing" title={`Promotion Test: ${promotionTest.scenario}`} />
              <div className="card-glow rounded-xl border border-border overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      {["Items Purchased", "Free Items", "Total Charged", "Description"].map(h => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-mono text-muted-foreground uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {promotionTest.testCases.map((tc, i) => (
                      <tr key={i} className={`border-b border-border/50 ${i % 2 === 0 ? "bg-secondary/20" : ""}`}>
                        <td className="px-4 py-3 font-mono font-semibold text-foreground">{tc.purchased}</td>
                        <td className="px-4 py-3 font-mono">
                          <span className={tc.freeItems > 0 ? "text-primary font-semibold" : "text-muted-foreground"}>{tc.freeItems}</span>
                        </td>
                        <td className="px-4 py-3 font-mono text-foreground">{tc.totalCharged}</td>
                        <td className="px-4 py-3 text-muted-foreground text-xs">{tc.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Stakeholders */}
            <div>
              <SectionTitle mono="Cross-Functional" title="Testing Stakeholders" />
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {promotionTest.stakeholders.map((s, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                    className="card-glow rounded-xl border border-border p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-primary" />
                      <h4 className="font-semibold text-sm text-foreground">{s.role}</h4>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{s.responsibility}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ═══ CHANGE MANAGEMENT TAB ═══ */}
        {activeTab === "change" && (
          <div className="space-y-12">
            <div>
              <SectionTitle mono="Transition Strategy" title="Change Management Approach" />
              <p className="text-sm text-muted-foreground mb-8 max-w-3xl leading-relaxed">
                A structured approach to ensure successful ERP transition with minimal disruption, maximum adoption, and alignment
                with organizational growth objectives across all departments.
              </p>
              <div className="space-y-4">
                {changeManagement.map((phase, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="card-glow rounded-xl border border-border p-6 flex gap-5">
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl shrink-0">
                        {phase.icon}
                      </div>
                      <span className="text-[10px] font-mono text-muted-foreground">Phase {i + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{phase.phase}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{phase.description}</p>
                    </div>
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

export default ErpAnalysisPage;
