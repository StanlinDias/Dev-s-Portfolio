"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type Role = {
  company: string;
  role: string;
  period: string;
  current?: boolean;
  oneLiner: string;
  bullets: string[];
};

type JourneyTimelineProps = {
  items: Role[];
};

export default function JourneyTimeline({ items }: JourneyTimelineProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ordered = [...items].reverse();

  return (
    <div className="overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0 md:overflow-visible">
      <div className="relative flex md:grid md:grid-cols-4 gap-10 md:gap-6 min-w-[900px] md:min-w-0 pt-2">
        <div className="absolute left-0 right-0 top-[38px] h-px bg-border" />

        {ordered.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={`${item.company}-${item.period}`} className="relative flex-1 flex flex-col items-center text-center px-2">
              <div className="mb-3">
                <span className="font-mono text-[11px] uppercase tracking-wider px-3 py-1.5 rounded-full border border-border bg-bg text-text-muted">
                  {item.period}
                </span>
              </div>

              <span
                className="relative z-10 block w-3 h-3 rounded-full mb-5"
                style={{ background: item.current ? "var(--accent)" : "var(--border)" }}
              />

              <h3 className="text-lg md:text-xl font-medium text-text leading-snug">{item.role}</h3>
              <p className="text-sm text-text-muted mb-3">{item.company}</p>
              <p className="text-sm text-text max-w-[26ch]">{item.oneLiner}</p>

              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="mt-4 font-mono text-[11px] uppercase tracking-wider text-accent hover:text-accent-hover"
              >
                {isOpen ? "less −" : "more +"}
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="overflow-hidden mt-4 flex flex-col gap-2 text-left max-w-[28ch]"
                  >
                    {item.bullets.map((bullet) => (
                      <li key={bullet} className="text-xs text-text-muted flex gap-2">
                        <span className="text-accent">·</span>
                        {bullet}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
