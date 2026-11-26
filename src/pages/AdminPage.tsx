import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import {
  Globe,
  Users,
  Monitor,
  TrendingUp,
  ArrowLeft,
  LogOut,
} from "lucide-react";
import { Link } from "react-router-dom";

type VisitRow = {
  id: string;
  page_path: string;
  country: string | null;
  city: string | null;
  device_type: string | null;
  browser: string | null;
  referrer: string | null;
  created_at: string;
};

const AdminPage = () => {
  const [visits, setVisits] = useState<VisitRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [dataError, setDataError] = useState("");
  const [allVisitCount, setAllVisitCount] = useState(0);
  const [conversationCount, setConversationCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setAuthed(true);
        fetchVisits();
      } else {
        setLoading(false);
      }
    });
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) {
          setAuthed(false);
          setVisits([]);
          setConversationCount(0);
          setMessageCount(0);
          setAllVisitCount(0);
        }
      },
    );
    return () => listener.subscription.unsubscribe();
  }, []);

  const fetchVisits = async () => {
    setLoading(true);
    setDataError("");
    const [recent, total, conversations, messages] = await Promise.all([
      supabase
        .from("site_visits")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(500),
      supabase.from("site_visits").select("id", { count: "exact", head: true }),
      supabase
        .from("chat_conversations")
        .select("id", { count: "exact", head: true }),
      supabase
        .from("chat_messages")
        .select("id", { count: "exact", head: true }),
    ]);
    if ([recent, total, conversations, messages].some((result) => result.error))
      setDataError(
        "Some analytics could not be loaded. Check database permissions before interpreting these counts.",
      );
    setVisits((recent.data as VisitRow[]) || []);
    setAllVisitCount(total.count ?? 0);
    setConversationCount(conversations.count ?? 0);
    setMessageCount(messages.count ?? 0);
    setLoading(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setAuthError(error.message);
    } else {
      setAuthed(true);
      fetchVisits();
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setAuthed(false);
    setVisits([]);
  };

  // Compute stats
  const totalVisits = visits.length;
  const countryCounts = visits.reduce<Record<string, number>>((acc, v) => {
    const c = v.country || "Unknown";
    acc[c] = (acc[c] || 0) + 1;
    return acc;
  }, {});
  const topCountries = Object.entries(countryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
  const deviceCounts = visits.reduce<Record<string, number>>((acc, v) => {
    const d = v.device_type || "Unknown";
    acc[d] = (acc[d] || 0) + 1;
    return acc;
  }, {});
  const browserCounts = visits.reduce<Record<string, number>>((acc, v) => {
    const b = v.browser || "Unknown";
    acc[b] = (acc[b] || 0) + 1;
    return acc;
  }, {});
  const uniqueCountries = Object.keys(countryCounts).length;

  // Today's visits
  const today = new Date().toISOString().slice(0, 10);
  const todayVisits = visits.filter(
    (v) => v.created_at.slice(0, 10) === today,
  ).length;

  if (!authed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <div className="card-glow rounded-2xl border border-border p-8">
            <h1 className="text-2xl font-bold text-center mb-1">
              Admin Access
            </h1>
            <p className="text-sm text-muted-foreground text-center mb-6">
              Sign in to view analytics
            </p>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                aria-label="Admin email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-sm outline-none focus:ring-2 focus:ring-primary/50"
                required
              />
              <input
                aria-label="Admin password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-muted border border-border text-sm outline-none focus:ring-2 focus:ring-primary/50"
                required
              />
              {authError && <p className="text-sm text-red-400">{authError}</p>}
              <button
                type="submit"
                className="w-full py-3 rounded-lg text-sm font-semibold text-primary-foreground"
                style={{ background: "var(--gradient-blue)" }}
              >
                Sign In
              </button>
            </form>
            <Link
              to="/"
              className="block text-center text-xs text-muted-foreground mt-4 hover:text-foreground"
            >
              ← Back to portfolio
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </Link>
            <h1 className="text-2xl font-bold">Visitor Analytics</h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        </div>

        <p className="text-xs text-muted-foreground mb-4">
          Breakdowns use the latest 500 visits. Page visits are not unique
          visitors. Earlier homepage-only tracking cannot be reconstructed.
        </p>
        {dataError && (
          <p role="alert" className="text-sm text-red-300 mb-4">
            {dataError}
          </p>
        )}
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div className="border border-border p-5">
            <p className="text-sm text-muted-foreground">
              Stored conversations (all time)
            </p>
            <strong className="text-2xl">{conversationCount}</strong>
          </div>
          <div className="border border-border p-5">
            <p className="text-sm text-muted-foreground">
              Stored messages (all time)
            </p>
            <strong className="text-2xl">{messageCount}</strong>
          </div>
        </div>
        {loading ? (
          <p className="text-muted-foreground">Loading analytics...</p>
        ) : (
          <>
            {/* Stat cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                {
                  icon: Users,
                  label: "All-time page visits",
                  value: allVisitCount,
                  color: "text-blue-400",
                },
                {
                  icon: TrendingUp,
                  label: "Today (sample, UTC)",
                  value: todayVisits,
                  color: "text-green-400",
                },
                {
                  icon: Globe,
                  label: "Countries (sample)",
                  value: uniqueCountries,
                  color: "text-purple-400",
                },
                {
                  icon: Monitor,
                  label: "Desktop % (sample)",
                  value: `${totalVisits ? Math.round(((deviceCounts["Desktop"] || 0) / totalVisits) * 100) : 0}%`,
                  color: "text-orange-400",
                },
              ].map((s) => (
                <div
                  key={s.label}
                  className="card-glow rounded-xl border border-border p-5"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <s.icon className={`w-4 h-4 ${s.color}`} />
                    <span className="text-xs text-muted-foreground">
                      {s.label}
                    </span>
                  </div>
                  <p className="text-2xl font-bold">{s.value}</p>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-6 mb-8">
              {/* Top countries */}
              <div className="card-glow rounded-xl border border-border p-5">
                <h3 className="font-semibold text-sm mb-4">Top Countries</h3>
                <div className="space-y-3">
                  {topCountries.map(([country, count]) => (
                    <div
                      key={country}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm text-muted-foreground">
                        {country}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-1.5 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${(count / topCountries[0][1]) * 100}%`,
                              background: "var(--gradient-blue)",
                            }}
                          />
                        </div>
                        <span className="text-xs font-mono w-8 text-right">
                          {count}
                        </span>
                      </div>
                    </div>
                  ))}
                  {topCountries.length === 0 && (
                    <p className="text-sm text-muted-foreground">No data yet</p>
                  )}
                </div>
              </div>

              {/* Devices */}
              <div className="card-glow rounded-xl border border-border p-5">
                <h3 className="font-semibold text-sm mb-4">Devices</h3>
                <div className="space-y-3">
                  {Object.entries(deviceCounts).map(([device, count]) => (
                    <div
                      key={device}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm text-muted-foreground">
                        {device}
                      </span>
                      <span className="text-sm font-mono">{count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Browsers */}
              <div className="card-glow rounded-xl border border-border p-5">
                <h3 className="font-semibold text-sm mb-4">Browsers</h3>
                <div className="space-y-3">
                  {Object.entries(browserCounts)
                    .sort((a, b) => b[1] - a[1])
                    .map(([browser, count]) => (
                      <div
                        key={browser}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm text-muted-foreground">
                          {browser}
                        </span>
                        <span className="text-sm font-mono">{count}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {["Pages and project engagement", "Daily visits (UTC)"].map(
                (title, index) => (
                  <div
                    key={title}
                    className="border border-border rounded-xl p-5"
                  >
                    <h2 className="text-sm font-semibold mb-4">{title}</h2>
                    {Object.entries(
                      visits.reduce<Record<string, number>>((acc, v) => {
                        const key =
                          index === 0 ? v.page_path : v.created_at.slice(0, 10);
                        acc[key] = (acc[key] || 0) + 1;
                        return acc;
                      }, {}),
                    )
                      .sort((a, b) => b[1] - a[1])
                      .slice(0, 14)
                      .map(([label, count]) => (
                        <div
                          key={label}
                          className="flex justify-between gap-4 text-xs text-muted-foreground py-2"
                        >
                          <span>{label}</span>
                          <span>{count}</span>
                        </div>
                      ))}
                  </div>
                ),
              )}
            </div>
            {/* Recent visits table */}
            <div className="card-glow rounded-xl border border-border p-5">
              <h3 className="font-semibold text-sm mb-4">Recent Visits</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-muted-foreground">
                      <th className="text-left py-2 pr-4">Time</th>
                      <th className="text-left py-2 pr-4">Page</th>
                      <th className="text-left py-2 pr-4">Country</th>
                      <th className="text-left py-2 pr-4">Device</th>
                      <th className="text-left py-2 pr-4">Browser</th>
                      <th className="text-left py-2">Referrer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visits.slice(0, 50).map((v) => (
                      <tr key={v.id} className="border-b border-border/50">
                        <td className="py-2 pr-4 text-muted-foreground whitespace-nowrap">
                          {new Date(v.created_at).toLocaleString()}
                        </td>
                        <td className="py-2 pr-4 font-mono text-xs">
                          {v.page_path}
                        </td>
                        <td className="py-2 pr-4">{v.country || "—"}</td>
                        <td className="py-2 pr-4">{v.device_type || "—"}</td>
                        <td className="py-2 pr-4">{v.browser || "—"}</td>
                        <td className="py-2 text-xs text-muted-foreground truncate max-w-[200px]">
                          {v.referrer || "Direct"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {visits.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    No visits recorded yet
                  </p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
