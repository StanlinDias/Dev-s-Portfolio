"use client";

import { useEffect } from "react";

// Next scrolls a new route's content into view, which lands it just under the
// sticky header. Case-study pages should open at the very top instead.
export default function ScrollToTop() {
  useEffect(() => {
    if (window.location.hash) return;
    const raf = requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "instant" }));
    return () => cancelAnimationFrame(raf);
  }, []);
  return null;
}
