"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type CaseStudy = {
  tag: string;
  title: string;
  summary: string;
  bullets: string[];
  confidential?: boolean;
};

type CaseStudyGridProps = {
  items: CaseStudy[];
  tags: string[];
};

function CardMedia({ tag }: { tag: string }) {
  return (
    <motion.div
      className="relative h-24 mb-4 flex items-center justify-start"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-30% 0px -30% 0px" }}
    >
      <motion.p
        variants={{ hidden: { scale: 1.1, opacity: 0.5 }, visible: { scale: 1, opacity: 1 } }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="font-mono text-xs uppercase tracking-[0.2em] text-accent"
      >
        {tag}
      </motion.p>

      {["top-0 left-0 border-t border-l", "bottom-0 left-0 border-b border-l"].map((pos) => (
        <motion.span
          key={pos}
          variants={{
            hidden: { opacity: 0, scale: 0.85 },
            visible: { opacity: 1, scale: 1 },
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`pointer-events-none absolute ${pos} border-border`}
          style={{ width: 16, height: 16 }}
        />
      ))}
    </motion.div>
  );
}

export default function CaseStudyGrid({ items, tags }: CaseStudyGridProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = activeTag ? items.filter((item) => item.tag === activeTag) : items;

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-10">
        <button
          onClick={() => setActiveTag(null)}
          className={`font-mono text-xs uppercase tracking-wider px-3 py-1.5 border transition-colors ${
            activeTag === null
              ? "border-accent text-accent"
              : "border-border text-text-muted hover:text-text"
          }`}
        >
          All
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`font-mono text-xs uppercase tracking-wider px-3 py-1.5 border transition-colors ${
              activeTag === tag
                ? "border-accent text-accent"
                : "border-border text-text-muted hover:text-text"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
        <AnimatePresence>
          {filtered.map((item) => {
            const isOpen = expanded === item.title;
            return (
              <motion.div
                key={item.title}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="border border-border p-6 flex flex-col"
              >
                <CardMedia tag={item.tag} />

                <h3 className="text-lg font-medium text-text mb-2">
                  {item.title}
                  {item.confidential && (
                    <span className="ml-2 font-mono text-[10px] uppercase tracking-wider text-text-muted align-middle">
                      confidential
                    </span>
                  )}
                </h3>
                <p className="text-sm text-text-muted mb-4">{item.summary}</p>

                <button
                  onClick={() => setExpanded(isOpen ? null : item.title)}
                  className="font-mono text-xs uppercase tracking-wider text-accent hover:text-accent-hover self-start"
                >
                  {isOpen ? "Show less −" : "What I built +"}
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.ul
                      layout
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="overflow-hidden mt-4 flex flex-col gap-2 border-t border-border pt-4"
                    >
                      {item.bullets.map((bullet) => (
                        <li key={bullet} className="text-sm text-text-muted flex gap-2">
                          <span className="text-accent">·</span>
                          {bullet}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
