"use client";

import { useReducedMotion, useScroll, useTransform, motion, useMotionValueEvent } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type StatCounterProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

export default function StatCounter({ value, prefix = "", suffix = "", label }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  // Server and first paint always show the real value, so it's present in
  // the rendered HTML for crawlers/link previews. Once mounted, sync to the
  // actual scroll-derived count (0 if not yet scrolled into range).
  const [display, setDisplay] = useState(value);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.4"],
  });

  const count = useTransform(scrollYProgress, [0, 1], [0, value]);

  useEffect(() => {
    if (reduceMotion) return;
    const frame = requestAnimationFrame(() => setDisplay(Math.round(count.get())));
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useMotionValueEvent(count, "change", (latest) => {
    if (!reduceMotion) setDisplay(Math.round(latest));
  });

  return (
    <div ref={ref} className="flex flex-col gap-1">
      <motion.p className="font-mono text-4xl md:text-6xl font-medium text-text tabular-nums">
        {prefix}
        {display}
        {suffix}
      </motion.p>
      <p className="text-sm md:text-base text-text-muted max-w-[20ch]">{label}</p>
    </div>
  );
}
