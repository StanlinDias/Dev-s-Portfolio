"use client";

import { motion, useReducedMotion, useScroll } from "framer-motion";
import { useRef } from "react";

type Role = { role: string; org: string; dates: string; body: string };

// The rail fills as the section scrolls through the viewport; entries use the
// shared scroll-reveal.
export default function ExperienceTimeline({ items }: { items: Role[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.6"] });

  return (
    <ol ref={ref} className="relative flex flex-col gap-12 pl-8 md:pl-12">
      <span aria-hidden="true" className="absolute left-[5px] md:left-[7px] top-2 bottom-2 w-px bg-border" />
      <motion.span
        aria-hidden="true"
        className="absolute left-[5px] md:left-[7px] top-2 bottom-2 w-px bg-accent origin-top"
        style={{ scaleY: reduceMotion ? 1 : scrollYProgress }}
      />
      {items.map((item) => (
        <li key={item.org} data-reveal className="relative flex flex-col gap-2">
          <span
            aria-hidden="true"
            className="absolute -left-8 md:-left-12 top-1.5 h-[11px] w-[11px] md:h-[15px] md:w-[15px] rounded-full border-2 border-accent bg-bg"
          />
          <p className="font-mono text-xs uppercase tracking-wider text-text-muted">{item.dates}</p>
          <h3 className="text-lg md:text-2xl font-medium text-text">{item.role}</h3>
          <p className="font-mono text-xs md:text-sm uppercase tracking-[0.15em] text-accent">{item.org}</p>
          <p className="text-sm md:text-base text-text-muted max-w-3xl">{item.body}</p>
        </li>
      ))}
    </ol>
  );
}
