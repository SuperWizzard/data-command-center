import { useEffect } from "react";

const TRACK_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/track-visit`;

export const useVisitorTracking = () => {
  useEffect(() => {
    // Only track once per session
    const tracked = sessionStorage.getItem("visit_tracked");
    if (tracked) return;

    fetch(TRACK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({
        page_path: window.location.pathname,
        referrer: document.referrer || null,
      }),
    }).catch(() => {});

    sessionStorage.setItem("visit_tracked", "1");
  }, []);
};
