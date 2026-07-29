"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type Role = {
  company: string;
  role: string;
  period: string;
  current?: boolean;
  bullets: string[];
};

type TimelineProps = {
  items: Role[];
};

export default function Timeline({ items }: TimelineProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="border-l border-border">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={`${item.company}-${item.period}`} className="relative pl-8 pb-12 last:pb-0">
            <span
              className="absolute -left-[5px] top-1.5 w-[9px] h-[9px] rounded-full"
              style={{ background: item.current ? "var(--accent)" : "var(--border)" }}
            />
            <p className="font-mono text-xs uppercase tracking-wider text-text-muted mb-1">
              {item.period}
              {item.current && <span className="ml-2 text-accent">current</span>}
            </p>
            <h3 className="text-xl md:text-2xl font-medium text-text">{item.role}</h3>
            <p className="text-text-muted mb-3">{item.company}</p>

            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="font-mono text-xs uppercase tracking-wider text-accent hover:text-accent-hover"
            >
              {isOpen ? "Hide detail −" : "Show detail +"}
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.ul
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="overflow-hidden mt-4 flex flex-col gap-2"
                >
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="text-sm text-text-muted flex gap-2 max-w-2xl">
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
  );
}
