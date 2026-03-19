import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Users, Target, TrendingUp, Globe, BarChart3, Clock, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, ComposedChart, Area,
} from "recharts";
import {
  DAY_DATES, DAYS_OF_WEEK, weeklyMetrics, countryData, recommendations,
  getAvgHourlyVolume, getDailyTotals, getHourlyComparison,
} from "@/lib/schedulingData";

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
          <span className="font-mono font-semibold">{typeof p.value === "number" ? p.value.toLocaleString() : p.value}{p.unit || ""}</span>
        </p>
      ))}
    </div>
  );
};

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

const SectionTitle = ({ mono, title }: { mono: string; title: string }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-6">
    <p className="font-mono text-primary text-xs tracking-widest uppercase mb-1">{mono}</p>
    <h2 className="text-xl md:text-2xl font-bold text-foreground">{title}</h2>
  </motion.div>
);

const SchedulingPage = () => {
  const [selectedDay, setSelectedDay] = useState("19-Aug");
  const [activeTab, setActiveTab] = useState<"scheduling" | "performance">("scheduling");

  const avgHourly = useMemo(() => getAvgHourlyVolume(), []);
  const dailyTotals = useMemo(() => getDailyTotals(), []);
  const hourlyComparison = useMemo(() => getHourlyComparison(selectedDay), [selectedDay]);

  const volumeDistribution = useMemo(() =>
    countryData.map(c => ({
      name: c.code,
      SSC: c.sscVolumePct,
      Outsourced: c.osVolumePct,
      Local: c.localVolumePct,
    })), []);

  const performanceRadar = useMemo(() =>
    countryData.map(c => ({
      country: c.code,
      "Service Level": c.serviceLevelPct,
      "Forecast Acc.": Math.min(c.forecastAccuracy, 100),
      Occupancy: c.overallOccupancy,
      "100 - Absent%": 100 - c.absenteeism,
    })), []);

  const slOccupancyScatter = useMemo(() =>
    countryData.map(c => ({
      name: c.code,
      occupancy: c.overallOccupancy,
      sl: c.serviceLevelPct,
      agents: c.totalAgents,
    })), []);

  const selectClass =
    "bg-secondary border border-border text-foreground rounded-lg px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-primary/50 focus:outline-none appearance-none cursor-pointer";

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
            <Calendar className="w-5 h-5 text-primary" />
            <span className="font-semibold text-sm">Scheduling & Performance Case Study</span>
          </div>
        </div>
      </div>

      <div className="section-container py-12">
        {/* Title */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <p className="font-mono text-primary text-sm tracking-widest uppercase mb-2">Workforce Analytics</p>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Regional Scheduling & Performance Analysis</h1>
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            A comprehensive workforce management case study analyzing ticket volume patterns, staffing optimization
            with Erlang-based service level modeling, and multi-country performance benchmarking across 6 European markets.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/20">
            <span className="text-xs font-mono text-primary">📊</span>
            <span className="text-xs text-muted-foreground">
              Developed as a workforce planning assessment — demonstrating scheduling optimization, capacity modeling, and cross-regional performance analysis.
            </span>
          </div>
        </motion.div>

        {/* Tab Switcher */}
        <div className="flex gap-2 mb-10">
          <button className={tabClass("scheduling")} onClick={() => setActiveTab("scheduling")}>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> Scheduling Optimization</span>
          </button>
          <button className={tabClass("performance")} onClick={() => setActiveTab("performance")}>
            <span className="flex items-center gap-2"><Globe className="w-4 h-4" /> Multi-Country Performance</span>
          </button>
        </div>

        {activeTab === "scheduling" ? (
          <div className="space-y-12">
            {/* Key Metrics */}
            <div>
              <SectionTitle mono="Overview" title="Weekly Key Metrics" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <MetricCard icon={BarChart3} label="Total Volume" value={weeklyMetrics.totalVolume.toLocaleString()} sub={`${weeklyMetrics.avgDailyVolume.toLocaleString()} avg/day`} />
                <MetricCard icon={Users} label="Net FTE Required" value={weeklyMetrics.netFTERequired.toString()} sub={`${weeklyMetrics.grossFTERequired} gross (w/ shrinkage)`} />
                <MetricCard icon={Target} label="Avg Service Level" value={`${weeklyMetrics.avgServiceLevel}%`} sub={`Target: ${weeklyMetrics.slaTarget}%`} />
                <MetricCard icon={TrendingUp} label="Avg Occupancy" value={`${weeklyMetrics.avgOccupancy}%`} sub={`Target: ${weeklyMetrics.occupancyTarget}%`} />
              </div>
            </div>

            {/* Avg Hourly Volume */}
            <div>
              <SectionTitle mono="Demand Pattern" title="Average Hourly Ticket Volume" />
              <div className="card-glow rounded-xl border border-border p-6">
                <ResponsiveContainer width="100%" height={320}>
                  <BarChart data={avgHourly}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,14%,18%)" />
                    <XAxis dataKey="hour" tick={{ fontSize: 11, fill: "hsl(215,12%,55%)" }} interval={1} />
                    <YAxis tick={{ fontSize: 11, fill: "hsl(215,12%,55%)" }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="volume" name="Avg Volume" fill="hsl(215,90%,58%)" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Daily Totals Comparison */}
            <div>
              <SectionTitle mono="Week View" title="Daily Volume vs Staffing Hours" />
              <div className="card-glow rounded-xl border border-border p-6">
                <ResponsiveContainer width="100%" height={320}>
                  <ComposedChart data={dailyTotals}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,14%,18%)" />
                    <XAxis dataKey="day" tick={{ fontSize: 12, fill: "hsl(215,12%,55%)" }} />
                    <YAxis yAxisId="vol" tick={{ fontSize: 11, fill: "hsl(215,12%,55%)" }} />
                    <YAxis yAxisId="staff" orientation="right" tick={{ fontSize: 11, fill: "hsl(215,12%,55%)" }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar yAxisId="vol" dataKey="volume" name="Total Volume" fill="hsl(215,90%,58%)" radius={[3, 3, 0, 0]} opacity={0.7} />
                    <Line yAxisId="staff" dataKey="currentStaff" name="Current Staff Hrs" stroke="hsl(340,65%,55%)" strokeWidth={2} dot={{ r: 4 }} />
                    <Line yAxisId="staff" dataKey="proposedStaff" name="Proposed Staff Hrs" stroke="hsl(180,70%,45%)" strokeWidth={2} dot={{ r: 4 }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Day Detail Selector */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
                <SectionTitle mono="Intraday Analysis" title="Hourly Schedule Comparison" />
                <select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)} className={selectClass}>
                  {DAY_DATES.map((d, i) => (
                    <option key={d} value={d}>{DAYS_OF_WEEK[i]} ({d})</option>
                  ))}
                </select>
              </div>

              {/* Volume vs Staff */}
              <div className="card-glow rounded-xl border border-border p-6 mb-6">
                <p className="text-xs font-mono text-primary tracking-widest uppercase mb-4">Volume & Staffing</p>
                <ResponsiveContainer width="100%" height={320}>
                  <ComposedChart data={hourlyComparison}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,14%,18%)" />
                    <XAxis dataKey="hour" tick={{ fontSize: 10, fill: "hsl(215,12%,55%)" }} interval={1} />
                    <YAxis tick={{ fontSize: 11, fill: "hsl(215,12%,55%)" }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Area dataKey="volume" name="Ticket Volume" fill="hsl(215,90%,58%)" fillOpacity={0.15} stroke="hsl(215,90%,58%)" strokeWidth={2} />
                    <Line dataKey="current" name="Current Schedule" stroke="hsl(340,65%,55%)" strokeWidth={2} dot={{ r: 3 }} />
                    <Line dataKey="proposed" name="Proposed Schedule" stroke="hsl(180,70%,45%)" strokeWidth={2} dot={{ r: 3 }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>

              {/* SL & Occupancy */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="card-glow rounded-xl border border-border p-6">
                  <p className="text-xs font-mono text-primary tracking-widest uppercase mb-4">Service Level %</p>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={hourlyComparison}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,14%,18%)" />
                      <XAxis dataKey="hour" tick={{ fontSize: 10, fill: "hsl(215,12%,55%)" }} interval={2} />
                      <YAxis domain={[60, 100]} tick={{ fontSize: 11, fill: "hsl(215,12%,55%)" }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Line dataKey="sl" name="Service Level" stroke="hsl(180,70%,45%)" strokeWidth={2} dot={{ r: 3 }} />
                      {/* SLA Target line */}
                      <Line dataKey={() => 80} name="SLA Target (80%)" stroke="hsl(340,65%,55%)" strokeDasharray="6 4" strokeWidth={1.5} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="card-glow rounded-xl border border-border p-6">
                  <p className="text-xs font-mono text-primary tracking-widest uppercase mb-4">Occupancy %</p>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={hourlyComparison}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,14%,18%)" />
                      <XAxis dataKey="hour" tick={{ fontSize: 10, fill: "hsl(215,12%,55%)" }} interval={2} />
                      <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "hsl(215,12%,55%)" }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Line dataKey="occupancy" name="Occupancy" stroke="hsl(260,60%,55%)" strokeWidth={2} dot={{ r: 3 }} />
                      <Line dataKey={() => 85} name="Target (85%)" stroke="hsl(30,80%,55%)" strokeDasharray="6 4" strokeWidth={1.5} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Key Parameters */}
            <div>
              <SectionTitle mono="Parameters" title="Model Configuration" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { l: "Senior AHT", v: `${weeklyMetrics.seniorAHT} min` },
                  { l: "New Agent AHT", v: `${weeklyMetrics.newAgentAHT} min` },
                  { l: "Shrinkage", v: `${weeklyMetrics.shrinkage}%` },
                  { l: "SLA Target", v: `${weeklyMetrics.slaTarget}% in ${weeklyMetrics.serviceTime}s` },
                ].map(p => (
                  <div key={p.l} className="rounded-xl border border-border bg-secondary/50 p-4">
                    <p className="text-xs text-muted-foreground mb-1">{p.l}</p>
                    <p className="font-mono font-semibold text-foreground">{p.v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* PERFORMANCE TAB */
          <div className="space-y-12">
            {/* Country Overview Table */}
            <div>
              <SectionTitle mono="6 European Markets" title="Country Performance Overview" />
              <div className="card-glow rounded-xl border border-border overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      {["Country", "Agents", "AHT", "Forecast Acc.", "SL %", "Occupancy", "Absent.", "OT Hrs"].map(h => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-mono text-muted-foreground uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {countryData.map((c, i) => (
                      <tr key={c.code} className={`border-b border-border/50 ${i % 2 === 0 ? "bg-secondary/20" : ""}`}>
                        <td className="px-4 py-3 font-semibold text-foreground">{c.country} <span className="text-muted-foreground font-mono text-xs">({c.code})</span></td>
                        <td className="px-4 py-3 font-mono">{c.totalAgents}</td>
                        <td className="px-4 py-3 font-mono">{c.avgHandleTime}m</td>
                        <td className="px-4 py-3 font-mono">
                          <span className={c.forecastAccuracy > 110 || c.forecastAccuracy < 90 ? "text-destructive" : "text-foreground"}>
                            {c.forecastAccuracy}%
                          </span>
                        </td>
                        <td className="px-4 py-3 font-mono">
                          <span className={c.serviceLevelPct < 80 ? "text-destructive" : "text-foreground"}>
                            {c.serviceLevelPct}%
                          </span>
                        </td>
                        <td className="px-4 py-3 font-mono">{c.overallOccupancy}%</td>
                        <td className="px-4 py-3 font-mono">
                          <span className={c.absenteeism >= 8 ? "text-destructive" : "text-foreground"}>
                            {c.absenteeism}%
                          </span>
                        </td>
                        <td className="px-4 py-3 font-mono">{c.avgOvertimeHours}h</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Volume Distribution */}
            <div>
              <SectionTitle mono="Workload Split" title="Volume Distribution by Location Type" />
              <div className="card-glow rounded-xl border border-border p-6">
                <ResponsiveContainer width="100%" height={320}>
                  <BarChart data={volumeDistribution} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,14%,18%)" />
                    <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: "hsl(215,12%,55%)" }} unit="%" />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fill: "hsl(215,12%,55%)" }} width={50} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="SSC" name="SSC" stackId="a" fill={CHART_COLORS[0]} />
                    <Bar dataKey="Outsourced" name="Outsourced" stackId="a" fill={CHART_COLORS[3]} />
                    <Bar dataKey="Local" name="Local Team" stackId="a" fill={CHART_COLORS[2]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* SL vs Occupancy */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <SectionTitle mono="Benchmarking" title="Service Level vs Occupancy" />
                <div className="card-glow rounded-xl border border-border p-6">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={slOccupancyScatter}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,14%,18%)" />
                      <XAxis dataKey="name" tick={{ fontSize: 12, fill: "hsl(215,12%,55%)" }} />
                      <YAxis domain={[50, 100]} tick={{ fontSize: 11, fill: "hsl(215,12%,55%)" }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar dataKey="sl" name="Service Level %" fill={CHART_COLORS[0]} radius={[3, 3, 0, 0]} />
                      <Bar dataKey="occupancy" name="Occupancy %" fill={CHART_COLORS[2]} radius={[3, 3, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div>
                <SectionTitle mono="Staffing Strain" title="Absenteeism & Overtime" />
                <div className="card-glow rounded-xl border border-border p-6">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={countryData.map(c => ({ name: c.code, Absenteeism: c.absenteeism, "Overtime Hrs": c.avgOvertimeHours }))}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,14%,18%)" />
                      <XAxis dataKey="name" tick={{ fontSize: 12, fill: "hsl(215,12%,55%)" }} />
                      <YAxis tick={{ fontSize: 11, fill: "hsl(215,12%,55%)" }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar dataKey="Absenteeism" name="Absenteeism %" fill={CHART_COLORS[4]} radius={[3, 3, 0, 0]} />
                      <Bar dataKey="Overtime Hrs" name="Avg OT Hours" fill={CHART_COLORS[5]} radius={[3, 3, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Forecast Accuracy */}
            <div>
              <SectionTitle mono="Forecasting" title="Forecast vs Actual Volume" />
              <div className="card-glow rounded-xl border border-border p-6">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={countryData.map(c => ({ name: c.code, Forecast: c.forecastVolume, Actual: c.actualVolume }))}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,14%,18%)" />
                    <XAxis dataKey="name" tick={{ fontSize: 12, fill: "hsl(215,12%,55%)" }} />
                    <YAxis tick={{ fontSize: 11, fill: "hsl(215,12%,55%)" }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="Forecast" name="Forecast Volume" fill={CHART_COLORS[0]} radius={[3, 3, 0, 0]} opacity={0.6} />
                    <Bar dataKey="Actual" name="Actual Volume" fill={CHART_COLORS[2]} radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Inefficiencies & Recommendations */}
            <div>
              <SectionTitle mono="Findings" title="Key Inefficiencies Identified" />
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                {[
                  { icon: AlertTriangle, title: "Volume Imbalance", desc: "SSC volume varies from 8% (SWE) to 85% (GRC), indicating underutilization in several markets." },
                  { icon: AlertTriangle, title: "Forecast Accuracy Gaps", desc: "DEU over-forecasts by 13%, SWE under-forecasts by 14% — causing staffing mismatches." },
                  { icon: AlertTriangle, title: "Occupancy Mismatch", desc: "GRC has 60% occupancy but SSC handles 85% volume — possible capacity or scheduling inefficiency." },
                ].map(f => (
                  <div key={f.title} className="card-glow rounded-xl border border-border p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center">
                        <f.icon className="w-4 h-4 text-destructive" />
                      </div>
                      <h4 className="font-semibold text-sm text-foreground">{f.title}</h4>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>

              <SectionTitle mono="Strategy" title="Proposed Recommendations" />
              <div className="space-y-3">
                {recommendations.map((r, i) => (
                  <div key={i} className="card-glow rounded-xl border border-border p-5 flex gap-4">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-foreground mb-1">{r.goal}</h4>
                      <p className="text-sm text-muted-foreground mb-1"><span className="text-foreground font-medium">Approach:</span> {r.approach}</p>
                      <p className="text-xs text-muted-foreground">{r.reasoning}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SchedulingPage;
