import { useEffect } from "react";
import { useLocation } from "react-router-dom";
export const useVisitorTracking = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    if (
      pathname === "/admin" ||
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1" ||
      navigator.doNotTrack === "1"
    )
      return;
    const key = `portfolio:visit:${pathname}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "pending");
    } catch {
      return;
    }
    let referrer: string | null = null;
    try {
      referrer = document.referrer ? new URL(document.referrer).origin : null;
    } catch {
      /* Ignore malformed referrers. */
    }
    fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/track-visit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ page_path: pathname, referrer }),
    })
      .then((r) => {
        if (!r.ok) throw new Error("Tracking unavailable");
        sessionStorage.setItem(key, "1");
      })
      .catch(() => {
        try {
          sessionStorage.removeItem(key);
        } catch {
          /* Storage unavailable. */
        }
      });
  }, [pathname]);
};
