"use client";

import { useEffect, useRef } from "react";

type Role = { role: string; org: string; dates: string; body: string };

// The rail fills as the section scrolls through the viewport (scroll-linked
// scaleY, written straight to the element, no re-renders); entries use the
// shared scroll-reveal.
export default function ExperienceTimeline({ items }: { items: Role[] }) {
  const listRef = useRef<HTMLOListElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const list = listRef.current;
    const fill = fillRef.current;
    if (!list || !fill) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      fill.style.transform = "scaleY(1)";
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = list.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the list top hits 80% of the viewport, 1 when its bottom hits 60%.
      const start = r.top - vh * 0.8;
      const end = r.bottom - vh * 0.6;
      const p = Math.min(Math.max(-start / (end - start || 1), 0), 1);
      fill.style.transform = `scaleY(${p})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <ol ref={listRef} className="relative flex flex-col gap-12 pl-8 md:pl-12">
      <span aria-hidden="true" className="absolute left-[5px] md:left-[7px] top-2 bottom-2 w-px bg-border" />
      <span
        ref={fillRef}
        aria-hidden="true"
        className="absolute left-[5px] md:left-[7px] top-2 bottom-2 w-px bg-accent origin-top will-change-transform"
        style={{ transform: "scaleY(0)" }}
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
