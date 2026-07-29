"use client";

import { useReducedMotion, useScroll, useTransform, motion, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";

type StatCounterProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

export default function StatCounter({ value, prefix = "", suffix = "", label }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(reduceMotion ? value : 0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.4"],
  });

  const count = useTransform(scrollYProgress, [0, 1], [0, value]);

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
