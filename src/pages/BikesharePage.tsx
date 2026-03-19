import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Clock, MapPin, Timer, Users, BarChart3, Bike } from "lucide-react";
import { Link } from "react-router-dom";
import {
  CITIES, MONTHS, DAYS,
  getFilteredData, computeTimeStats, computeStationStats,
  computeDurationStats, computeUserStats, formatDuration,
  type City,
} from "@/lib/bikeshareData";

const StatCard = ({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="card-glow rounded-xl border border-border p-6"
  >
    <div className="flex items-center gap-3 mb-4">
      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <h3 className="font-semibold text-foreground">{title}</h3>
    </div>
    <div className="space-y-3">{children}</div>
  </motion.div>
);

const StatRow = ({ label, value }: { label: string; value: string | number }) => (
  <div className="flex justify-between items-baseline gap-4">
    <span className="text-sm text-muted-foreground">{label}</span>
    <span className="text-sm font-mono font-semibold text-foreground text-right">{value}</span>
  </div>
);

const HourBar = ({ hour, count, max }: { hour: number; count: number; max: number }) => (
  <div className="flex items-end gap-1" title={`${hour}:00 — ${count} trips`}>
    <div
      className="w-full rounded-t-sm bg-primary/70 transition-all duration-300 min-h-[2px]"
      style={{ height: `${Math.max((count / max) * 100, 4)}%` }}
    />
  </div>
);

const BikesharePage = () => {
  const [city, setCity] = useState<City>("chicago");
  const [month, setMonth] = useState("all");
  const [day, setDay] = useState("all");
  const [showRaw, setShowRaw] = useState(false);

  const data = useMemo(() => getFilteredData(city, month, day), [city, month, day]);
  const timeStats = useMemo(() => computeTimeStats(data), [data]);
  const stationStats = useMemo(() => computeStationStats(data), [data]);
  const durationStats = useMemo(() => computeDurationStats(data), [data]);
  const userStats = useMemo(() => computeUserStats(data), [data]);

  const maxHourCount = timeStats
    ? Math.max(...timeStats.hourDistribution.map((d) => d.count))
    : 0;

  const selectClass =
    "bg-secondary border border-border text-foreground rounded-lg px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-primary/50 focus:outline-none appearance-none cursor-pointer";

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
            <Bike className="w-5 h-5 text-primary" />
            <span className="font-semibold text-sm">US Bikeshare Explorer</span>
          </div>
        </div>
      </div>

      <div className="section-container py-12">
        {/* Title */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <p className="font-mono text-primary text-sm tracking-widest uppercase mb-2">Interactive Case Study</p>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">US Bikeshare Data Analysis</h1>
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            Explore bikeshare usage patterns across Chicago, New York City, and Washington.
            Filter by month and day of week to uncover trends in travel times, popular stations,
            trip durations, and user demographics — originally built in Python, now interactive in the browser.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card-glow rounded-xl border border-border p-6 mb-8"
        >
          <p className="text-xs font-mono text-primary tracking-widest uppercase mb-4">Filters</p>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">City</label>
              <select className={selectClass} value={city} onChange={(e) => setCity(e.target.value as City)}>
                {CITIES.map((c) => (
                  <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Month</label>
              <select className={selectClass} value={month} onChange={(e) => setMonth(e.target.value)}>
                {MONTHS.map((m) => (
                  <option key={m} value={m}>{m.charAt(0).toUpperCase() + m.slice(1)}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Day of Week</label>
              <select className={selectClass} value={day} onChange={(e) => setDay(e.target.value)}>
                {DAYS.map((d) => (
                  <option key={d} value={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</option>
                ))}
              </select>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Showing <span className="font-mono font-semibold text-foreground">{data.length.toLocaleString()}</span> trips
          </p>
        </motion.div>

        {data.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            No trips match the selected filters. Try adjusting your selection.
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Time Stats */}
              {timeStats && (
                <StatCard icon={Clock} title="Popular Travel Times">
                  <StatRow label="Most Common Month" value={timeStats.popularMonth} />
                  <StatRow label="Most Common Day" value={timeStats.popularDay} />
                  <StatRow label="Most Common Start Hour" value={`${timeStats.popularHour}:00`} />

                  {/* Hour distribution chart */}
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground mb-2">Hourly Trip Distribution</p>
                    <div className="flex gap-[2px] h-20 items-end">
                      {Array.from({ length: 24 }, (_, h) => {
                        const entry = timeStats.hourDistribution.find((d) => d.hour === h);
                        return <HourBar key={h} hour={h} count={entry?.count || 0} max={maxHourCount} />;
                      })}
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-[10px] text-muted-foreground">0h</span>
                      <span className="text-[10px] text-muted-foreground">12h</span>
                      <span className="text-[10px] text-muted-foreground">23h</span>
                    </div>
                  </div>
                </StatCard>
              )}

              {/* Station Stats */}
              {stationStats && (
                <StatCard icon={MapPin} title="Popular Stations">
                  <StatRow label="Top Start Station" value={stationStats.popularStartStation} />
                  <StatRow label="Top End Station" value={stationStats.popularEndStation} />
                  <div className="pt-2 border-t border-border mt-2">
                    <p className="text-xs text-muted-foreground mb-1">Most Common Trip</p>
                    <p className="text-sm font-mono text-foreground">{stationStats.popularTrip}</p>
                    <p className="text-xs text-muted-foreground">{stationStats.popularTripCount} trips</p>
                  </div>
                </StatCard>
              )}

              {/* Duration Stats */}
              {durationStats && (
                <StatCard icon={Timer} title="Trip Duration">
                  <StatRow label="Total Travel Time" value={formatDuration(durationStats.totalDuration)} />
                  <StatRow label="Average Duration" value={formatDuration(durationStats.meanDuration)} />
                  <StatRow label="Median Duration" value={formatDuration(durationStats.medianDuration)} />
                  <StatRow label="Shortest Trip" value={formatDuration(durationStats.minDuration)} />
                  <StatRow label="Longest Trip" value={formatDuration(durationStats.maxDuration)} />
                </StatCard>
              )}

              {/* User Stats */}
              {userStats && (
                <StatCard icon={Users} title="User Demographics">
                  <StatRow label="Subscribers" value={`${userStats.subscribers} (${Math.round((userStats.subscribers / data.length) * 100)}%)`} />
                  <StatRow label="Customers" value={`${userStats.customers} (${Math.round((userStats.customers / data.length) * 100)}%)`} />

                  {userStats.hasGender && (
                    <>
                      <div className="pt-2 border-t border-border mt-1" />
                      <StatRow label="Male" value={userStats.males} />
                      <StatRow label="Female" value={userStats.females} />
                      <div className="pt-2 border-t border-border mt-1" />
                      <StatRow label="Earliest Birth Year" value={userStats.earliestBirthYear ?? "N/A"} />
                      <StatRow label="Most Recent Birth Year" value={userStats.latestBirthYear ?? "N/A"} />
                      <StatRow label="Average Birth Year" value={userStats.avgBirthYear ?? "N/A"} />
                    </>
                  )}

                  {!userStats.hasGender && (
                    <p className="text-xs text-muted-foreground italic">Gender & birth year data not available for Washington.</p>
                  )}
                </StatCard>
              )}
            </div>

            {/* Raw Data Toggle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="card-glow rounded-xl border border-border p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <BarChart3 className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="font-semibold">Raw Trip Data</h3>
                </div>
                <button
                  onClick={() => setShowRaw(!showRaw)}
                  className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  {showRaw ? "Hide" : "Show first 20 rows"}
                </button>
              </div>

              <AnimatePresence>
                {showRaw && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs font-mono">
                        <thead>
                          <tr className="text-left text-muted-foreground border-b border-border">
                            <th className="py-2 pr-4">Start Time</th>
                            <th className="py-2 pr-4">End Time</th>
                            <th className="py-2 pr-4">Duration</th>
                            <th className="py-2 pr-4">Start Station</th>
                            <th className="py-2 pr-4">End Station</th>
                            <th className="py-2 pr-4">User Type</th>
                            {city !== "washington" && <th className="py-2 pr-4">Gender</th>}
                          </tr>
                        </thead>
                        <tbody>
                          {data.slice(0, 20).map((t, i) => (
                            <tr key={i} className="border-b border-border/50 text-foreground/80">
                              <td className="py-1.5 pr-4 whitespace-nowrap">{t.startTime.toLocaleString()}</td>
                              <td className="py-1.5 pr-4 whitespace-nowrap">{t.endTime.toLocaleString()}</td>
                              <td className="py-1.5 pr-4">{formatDuration(t.duration)}</td>
                              <td className="py-1.5 pr-4">{t.startStation}</td>
                              <td className="py-1.5 pr-4">{t.endStation}</td>
                              <td className="py-1.5 pr-4">{t.userType}</td>
                              {city !== "washington" && <td className="py-1.5 pr-4">{t.gender}</td>}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </>
        )}

        {/* Footer note */}
        <p className="text-xs text-muted-foreground text-center mt-12">
          Originally developed as a Python CLI tool — recreated here as an interactive browser experience.
        </p>
      </div>
    </div>
  );
};

export default BikesharePage;
