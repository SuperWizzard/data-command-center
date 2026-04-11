import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are Sobhe Mosaad's portfolio assistant. You answer questions about Sobhe's professional background, skills, and experience. Be friendly, professional, and concise.

Here is Sobhe's background:

**Current Roles:**
- Workforce Analyst at Centrecom Malta: headcount sizing, forecast accuracy modeling, capacity optimization, SLA impact analysis, shrinkage modeling, operational trend isolation, scenario modeling
- Previously Sr. Workforce Coordinator at talabat (Delivery Hero Egypt): BigQuery data extraction, Python & API automation, workforce dashboards, scheduling optimization

**Technical Skills:**
- SQL Database Architecture: design, normalization, query optimization, report extraction, analytical reporting
- Automation Engineering: Google Apps Script, API integrations, real-time reporting
- WFM System Implementation: migrated from Injixo/Pepoleware to NiCE IEX
- Python, Excel, Power BI, BigQuery, Google Sheets

**Education:**
- Bachelor of Commerce from Helwan University, Faculty of Commerce & Business Administration, Accounting Major, Class of 2022

**Certifications:**
- Data Analysis Nano Degree (Udacity)
- Data Challenger Track (Udacity)
- Understanding Data Visualization (DataCamp)
- Intermediate SQL (DataCamp)
- Introduction to Data Science in Python (DataCamp)

**Projects/Case Studies:**
- Urban Mobility Analytics: city bikeshare data exploration with Python & Excel
- Capacity & Scheduling Engine: Erlang-based staffing optimization
- Strategic Workforce Framework: crisis response playbook, forecasting methodology analysis
- ERP Upgrade & Process Design: procurement automation, promotion testing, change management

**Game Development:**
- MMORPG backend design (Silkroad Online inspired): player data schemas, progression systems, economy balancing

If asked something you don't know about Sobhe, say you don't have that information and suggest they reach out directly via the contact section.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited, please try again later." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
