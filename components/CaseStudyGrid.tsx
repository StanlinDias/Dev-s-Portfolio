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

const BENTO_SPANS = [
  "sm:col-span-2 sm:row-span-2",
  "sm:col-span-1 sm:row-span-1",
  "sm:col-span-1 sm:row-span-2",
  "sm:col-span-1 sm:row-span-1",
  "sm:col-span-1 sm:row-span-1",
  "sm:col-span-2 sm:row-span-1",
];

function CardMedia({ tag }: { tag: string }) {
  return (
    <motion.div
      className="relative h-16 mb-4 flex items-center justify-start"
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
          className={`pointer-events-none absolute ${pos} border-white/25`}
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
    <section
      id="work"
      className="relative overflow-hidden bg-[#0a0a0b] px-6 md:px-12 py-12 md:py-20"
    >
      <div className="pointer-events-none absolute -top-32 -left-20 w-[420px] h-[420px] rounded-full bg-accent/30 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[360px] h-[360px] rounded-full bg-accent-hover/20 blur-[110px]" />

      <div className="relative max-w-6xl mx-auto">
        <div className="mb-10 md:mb-16">
          <p className="font-mono text-xs md:text-sm uppercase tracking-[0.2em] text-accent mb-3">
            selected work
          </p>
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white max-w-3xl">
            Case studies that moved the needle.
          </h2>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActiveTag(null)}
            className={`font-mono text-xs uppercase tracking-wider px-3 py-1.5 rounded-full border transition-colors ${
              activeTag === null
                ? "border-accent text-accent bg-accent/10"
                : "border-white/15 text-white/50 hover:text-white"
            }`}
          >
            All
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`font-mono text-xs uppercase tracking-wider px-3 py-1.5 rounded-full border transition-colors ${
                activeTag === tag
                  ? "border-accent text-accent bg-accent/10"
                  : "border-white/15 text-white/50 hover:text-white"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-4 gap-5"
          style={{ gridAutoFlow: "dense", gridAutoRows: "180px" }}
        >
          <AnimatePresence>
            {filtered.map((item, i) => {
              const isOpen = expanded === item.title;
              const span = BENTO_SPANS[i % BENTO_SPANS.length];
              return (
                <motion.div
                  key={item.title}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-xl backdrop-saturate-150 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] p-6 flex flex-col ${span}`}
                >
                  <CardMedia tag={item.tag} />

                  <h3 className="text-lg font-medium text-white mb-2">
                    {item.title}
                    {item.confidential && (
                      <span className="ml-2 font-mono text-[10px] uppercase tracking-wider text-white/40 align-middle">
                        confidential
                      </span>
                    )}
                  </h3>
                  <p className="text-sm text-white/60 mb-4 line-clamp-4">{item.summary}</p>

                  <button
                    onClick={() => setExpanded(isOpen ? null : item.title)}
                    className="font-mono text-xs uppercase tracking-wider text-accent hover:text-accent-hover self-start mt-auto"
                  >
                    What I built +
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="absolute inset-0 z-10 flex flex-col rounded-2xl border border-white/15 bg-[#0a0a0b]/90 backdrop-blur-2xl p-6"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                            {item.tag}
                          </p>
                          <button
                            onClick={() => setExpanded(null)}
                            className="font-mono text-xs text-white/50 hover:text-white"
                            aria-label="Close"
                          >
                            close ×
                          </button>
                        </div>
                        <h3 className="text-lg font-medium text-white mb-3">{item.title}</h3>
                        <ul className="flex flex-col gap-2 overflow-y-auto">
                          {item.bullets.map((bullet) => (
                            <li key={bullet} className="text-sm text-white/70 flex gap-2">
                              <span className="text-accent">·</span>
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
