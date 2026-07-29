"use client";

import { useReducedMotion, useScroll, useTransform, motion, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";

type StatDialProps = {
  value: number;
  max: number;
  unit: string;
  label: string;
  sub?: string;
};

const RADIUS = 80;
const CX = 100;
const CY = 100;
const ARC_LENGTH = Math.PI * RADIUS; // half circumference

export default function StatDial({ value, max, unit, label, sub }: StatDialProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const ratio = Math.min(Math.max(value / max, 0), 1);
  const [display, setDisplay] = useState(reduceMotion ? value : 0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.4"],
  });

  const progress = useTransform(scrollYProgress, [0, 1], [0, ratio]);
  const dashoffset = useTransform(progress, (p) => ARC_LENGTH * (1 - p));
  const rotation = useTransform(progress, (p) => -90 + p * 180);
  const count = useTransform(progress, (p) => Math.round(p * max));

  useMotionValueEvent(count, "change", (latest) => {
    if (!reduceMotion) setDisplay(latest);
  });

  return (
    <div ref={ref} className="flex flex-col items-center gap-2">
      <svg viewBox="0 0 200 110" className="w-full max-w-[220px]">
        <path
          d={`M ${CX - RADIUS} ${CY} A ${RADIUS} ${RADIUS} 0 0 1 ${CX + RADIUS} ${CY}`}
          fill="none"
          stroke="var(--border)"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <motion.path
          d={`M ${CX - RADIUS} ${CY} A ${RADIUS} ${RADIUS} 0 0 1 ${CX + RADIUS} ${CY}`}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={ARC_LENGTH}
          style={{ strokeDashoffset: reduceMotion ? ARC_LENGTH * (1 - ratio) : dashoffset }}
        />
        <motion.line
          x1={CX}
          y1={CY}
          x2={CX}
          y2={CY - RADIUS + 14}
          stroke="var(--text)"
          strokeWidth="3"
          strokeLinecap="round"
          style={{
            originX: `${CX}px`,
            originY: `${CY}px`,
            rotate: reduceMotion ? -90 + ratio * 180 : rotation,
          }}
        />
        <circle cx={CX} cy={CY} r="5" fill="var(--text)" />
      </svg>
      <p className="font-mono text-3xl md:text-4xl font-medium text-text tabular-nums -mt-4">
        {display}
        {unit}
      </p>
      <p className="text-sm md:text-base text-text-muted max-w-[24ch] text-center">{label}</p>
      {sub && <p className="text-xs text-text-muted">{sub}</p>}
    </div>
  );
}
