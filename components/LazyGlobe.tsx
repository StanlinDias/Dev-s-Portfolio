"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";

const Globe = dynamic(() => import("@/components/Globe"), { ssr: false });

const QUERY = "(min-width: 1024px)";
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

// The globe is decorative and only shown on large screens, so phones never
// download or run it.
export default function LazyGlobe({ size }: { size: number }) {
  const isLarge = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false
  );
  return isLarge ? <Globe size={size} /> : null;
}
