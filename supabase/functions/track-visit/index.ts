import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { page_path, referrer } = await req.json();

    // Get country from Cloudflare headers
    const country = req.headers.get("cf-ipcountry") || req.headers.get("x-country") || "Unknown";
    const city = req.headers.get("cf-ipcity") || "Unknown";

    // Parse user-agent
    const ua = req.headers.get("user-agent") || "";
    let device_type = "Desktop";
    if (/mobile|android|iphone/i.test(ua)) device_type = "Mobile";
    else if (/tablet|ipad/i.test(ua)) device_type = "Tablet";

    let browser = "Other";
    if (/chrome/i.test(ua) && !/edg/i.test(ua)) browser = "Chrome";
    else if (/firefox/i.test(ua)) browser = "Firefox";
    else if (/safari/i.test(ua) && !/chrome/i.test(ua)) browser = "Safari";
    else if (/edg/i.test(ua)) browser = "Edge";

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    await supabase.from("site_visits").insert({
      page_path: page_path || "/",
      country,
      city,
      device_type,
      browser,
      referrer: referrer || null,
    });

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("track-visit error:", e);
    return new Response(JSON.stringify({ ok: false }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
