"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type Accomplishment = {
  title: string;
  body: string;
};

type AccomplishmentListProps = {
  items: Accomplishment[];
};

export default function AccomplishmentList({ items }: AccomplishmentListProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col border-t border-border">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.title} className="border-b border-border">
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-6 py-5 text-left group"
            >
              <span className="font-mono text-xs md:text-sm uppercase tracking-[0.2em] text-accent group-hover:text-accent-hover transition-colors">
                {item.title}
              </span>
              <span className="font-mono text-lg text-text-muted shrink-0">
                {isOpen ? "−" : "+"}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <p className="text-sm md:text-base text-text-muted max-w-3xl pb-6">
                    {item.body}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
