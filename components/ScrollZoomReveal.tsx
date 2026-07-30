"use client";

import { useReducedMotion, useScroll, useTransform, motion } from "framer-motion";
import { useRef, type ReactNode } from "react";

type ScrollZoomRevealProps = {
  from: ReactNode;
  to: ReactNode;
  cascadeLines?: string[];
  className?: string;
  fromZoomScale?: number;
  fadeFloor?: number;
};

function CascadeLine({
  line,
  start,
  end,
  scrollYProgress,
}: {
  line: string;
  start: number;
  end: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const color = useTransform(
    scrollYProgress,
    [start, (start + end) / 2, end],
    ["var(--text)", "var(--accent)", "var(--accent-hover)"]
  );
  const opacity = useTransform(scrollYProgress, [start, start + 0.05], [0, 1]);

  return (
    <motion.p className="font-mono text-sm uppercase tracking-wider" style={{ color, opacity }}>
      {line}
    </motion.p>
  );
}

function ReticleFrame({ progress }: { progress: ReturnType<typeof useTransform<number, number>> }) {
  const scale = useTransform(progress, [0, 0.5, 1], [1, 0.9, 1]);
  const opacity = useTransform(progress, [0, 0.15, 0.85, 1], [0, 1, 1, 1]);
  const size = 44;

  return (
    <motion.div
      className="pointer-events-none absolute inset-4 md:inset-8"
      style={{ scale, opacity }}
    >
      {[
        "top-0 left-0 border-t-[3px] border-l-[3px]",
        "top-0 right-0 border-t-[3px] border-r-[3px]",
        "bottom-0 left-0 border-b-[3px] border-l-[3px]",
        "bottom-0 right-0 border-b-[3px] border-r-[3px]",
      ].map((pos) => (
        <span
          key={pos}
          className={`absolute ${pos} border-accent`}
          style={{ width: size, height: size, filter: "drop-shadow(0 0 6px var(--accent))" }}
        />
      ))}
    </motion.div>
  );
}

export default function ScrollZoomReveal({
  from,
  to,
  cascadeLines,
  className = "",
  fromZoomScale = 1.4,
  fadeFloor = 0,
}: ScrollZoomRevealProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const fromScale = useTransform(scrollYProgress, [0.3, 0.5], [1, fromZoomScale]);
  const fromOpacity = useTransform(scrollYProgress, [0.3, 0.5], [1, fadeFloor]);
  const toScale = useTransform(scrollYProgress, [0.5, 0.7], [0.85, 1]);
  const toOpacity = useTransform(scrollYProgress, [0.5, 0.65], [0, 1]);

  if (reduceMotion) {
    return (
      <div className={`relative py-20 flex items-center justify-center ${className}`}>
        {to}
      </div>
    );
  }

  return (
    <div ref={sectionRef} className={`relative min-h-[150vh] ${className}`}>
      <div className="sticky top-16 h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ scale: fromScale, opacity: fromOpacity }}
        >
          {from}
        </motion.div>

        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ scale: toScale, opacity: toOpacity }}
        >
          {to}
        </motion.div>

        <ReticleFrame progress={scrollYProgress} />

        {cascadeLines && (
          <div className="absolute bottom-16 left-6 md:left-10 flex flex-col gap-1">
            {cascadeLines.map((line, i) => {
              const start = 0.55 + (i / cascadeLines.length) * 0.3;
              const end = start + 0.1;
              return (
                <CascadeLine
                  key={line}
                  line={line}
                  start={start}
                  end={end}
                  scrollYProgress={scrollYProgress}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
