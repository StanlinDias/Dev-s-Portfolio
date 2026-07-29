"use client";

import { useReducedMotion, useScroll, useTransform, motion, useMotionValueEvent } from "framer-motion";
import { useMemo, useRef, useState } from "react";

type TrajectoryPoint = {
  role: string;
  period: string;
  teamSize: number;
};

type TrajectoryChartProps = {
  points: TrajectoryPoint[];
};

const WIDTH = 600;
const HEIGHT = 280;
const PAD_X = 40;
const PAD_Y = 30;

export default function TrajectoryChart({ points }: TrajectoryChartProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(reduceMotion ? points.length - 1 : 0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.4"],
  });

  const maxTeam = Math.max(...points.map((p) => p.teamSize));

  const coords = useMemo(
    () =>
      points.map((p, i) => {
        const x = PAD_X + (i / (points.length - 1)) * (WIDTH - PAD_X * 2);
        const y = HEIGHT - PAD_Y - (p.teamSize / maxTeam) * (HEIGHT - PAD_Y * 2);
        return { x, y };
      }),
    [points, maxTeam]
  );

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
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full h-auto">
        <path
          d={pathD}
          fill="none"
          stroke="var(--border)"
          strokeWidth="2"
        />
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
            {points[i].period.split(" – ")[0]}
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
        <span className="text-accent">{activePoint.teamSize}</span> — {activePoint.role}
      </motion.div>
    </div>
  );
}
