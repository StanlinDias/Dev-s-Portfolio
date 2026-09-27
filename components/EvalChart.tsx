"use client";

import { useReducedMotion, useScroll, useTransform, motion, useMotionValueEvent } from "framer-motion";
import { useMemo, useRef, useState } from "react";

type EvalPoint = {
  iteration: string;
  score: number;
};

type EvalChartProps = {
  points: EvalPoint[];
  baseline: number;
  baselineLabel?: string;
  max?: number;
  /** When true, labels the chart as an illustrative example rather than real eval data. */
  illustrative?: boolean;
};

const WIDTH = 600;
const HEIGHT = 280;
const PAD_X = 40;
const PAD_Y = 30;

export default function EvalChart({
  points,
  baseline,
  baselineLabel = "baseline",
  max = 100,
  illustrative = false,
}: EvalChartProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(reduceMotion ? points.length - 1 : 0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.4"],
  });

  const coords = useMemo(
    () =>
      points.map((p, i) => {
        const x = PAD_X + (i / (points.length - 1)) * (WIDTH - PAD_X * 2);
        const y = HEIGHT - PAD_Y - (p.score / max) * (HEIGHT - PAD_Y * 2);
        return { x, y };
      }),
    [points, max]
  );

  const baselineY = HEIGHT - PAD_Y - (baseline / max) * (HEIGHT - PAD_Y * 2);

  const pathD = coords.map((c, i) => `${i === 0 ? "M" : "L"} ${c.x} ${c.y}`).join(" ");

  const totalLength = useMemo(() => {
    let len = 0;
    for (let i = 1; i < coords.length; i++) {
      len += Math.hypot(coords[i].x - coords[i - 1].x, coords[i].y - coords[i - 1].y);
    }
    return len;
  }, [coords]);

  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const dashoffset = useTransform(progress, (p) => totalLength * (1 - p));

  useMotionValueEvent(progress, "change", (p) => {
    if (reduceMotion) return;
    const idx = Math.min(points.length - 1, Math.floor(p * (points.length - 1) + 0.001));
    setActiveIndex(idx);
  });

  const activePoint = points[activeIndex];
  const activeCoord = coords[activeIndex];

  return (
    <div ref={ref} className="relative w-full">
      {illustrative && (
        <p className="font-mono text-[10px] uppercase tracking-wider text-text-muted mb-2">
          illustrative example, not measured data
        </p>
      )}
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full h-auto">
        <line
          x1={PAD_X}
          y1={baselineY}
          x2={WIDTH - PAD_X}
          y2={baselineY}
          stroke="var(--text-muted)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <text
          x={WIDTH - PAD_X}
          y={baselineY - 6}
          textAnchor="end"
          className="fill-current text-text-muted"
          fontSize="9"
          fontFamily="var(--font-mono)"
        >
          {baselineLabel}
        </text>

        <path d={pathD} fill="none" stroke="var(--border)" strokeWidth="2" />
        <motion.path
          d={pathD}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={totalLength}
          style={{ strokeDashoffset: reduceMotion ? 0 : dashoffset }}
        />
        {coords.map((c, i) => (
          <circle
            key={i}
            cx={c.x}
            cy={c.y}
            r={i === activeIndex ? 6 : 4}
            fill={i <= activeIndex ? "var(--accent)" : "var(--border)"}
          />
        ))}
        {coords.map((c, i) => (
          <text
            key={`label-${i}`}
            x={c.x}
            y={HEIGHT - 6}
            textAnchor="middle"
            className="fill-current text-text-muted"
            fontSize="9"
            fontFamily="var(--font-mono)"
          >
            {points[i].iteration}
          </text>
        ))}
      </svg>

      <motion.div
        className="absolute px-3 py-1.5 border border-accent bg-bg font-mono text-xs uppercase tracking-wider"
        style={{
          left: `${(activeCoord.x / WIDTH) * 100}%`,
          top: `${(activeCoord.y / HEIGHT) * 100}%`,
          transform: "translate(-50%, -140%)",
        }}
      >
        <span className="text-accent">{activePoint.score}</span> · {activePoint.iteration}
      </motion.div>
    </div>
  );
}
