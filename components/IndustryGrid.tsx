"use client";

import Link from "next/link";
import type { MouseEvent } from "react";
import { stagger } from "@/lib/motion";

type Industry = { name: string; line: string; caseStudy?: string };

const GLYPHS = ["◆", "◈", "◇", "◫"];

// Cursor-follow glow: the grid tracks the pointer and writes it into the
// hovered tile's CSS variables. No per-tile listeners, no re-renders.
function trackGlow(e: MouseEvent<HTMLDivElement>) {
  const tile = (e.target as HTMLElement).closest<HTMLElement>("[data-tile]");
  if (!tile) return;
  const r = tile.getBoundingClientRect();
  tile.style.setProperty("--mx", `${e.clientX - r.left}px`);
  tile.style.setProperty("--my", `${e.clientY - r.top}px`);
}

export default function IndustryGrid({ items }: { items: Industry[] }) {
  return (
    <div onMouseMove={trackGlow} className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      {items.map((item, i) => {
        const body = (
          <>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[420ms] group-hover:opacity-100 [background:radial-gradient(220px_circle_at_var(--mx,50%)_var(--my,50%),color-mix(in_srgb,var(--accent)_14%,transparent),transparent_70%)]"
            />
            <span className="relative flex items-start justify-between gap-2">
              <span className="text-accent text-lg leading-none">{GLYPHS[i % GLYPHS.length]}</span>
              {item.caseStudy && (
                <span className="font-mono text-sm text-text-muted transition-transform duration-[180ms] group-hover:translate-x-1 group-hover:text-accent">
                  →
                </span>
              )}
            </span>
            <span className="relative text-base md:text-lg font-medium text-text">{item.name}</span>
            <span className="relative grid grid-rows-[0fr] transition-[grid-template-rows] duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr] [@media(hover:none)]:grid-rows-[1fr]">
              <span className="overflow-hidden">
                <span className="block pt-1 text-sm text-text-muted">{item.line}</span>
              </span>
            </span>
          </>
        );
        const cls = `group relative overflow-hidden flex flex-col gap-3 border border-border bg-bg p-5 md:p-6 min-h-[132px] transition-[border-color,transform] duration-[180ms] hover:border-accent/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
          i === 0 ? "col-span-2" : ""
        }`;
        return item.caseStudy ? (
          <Link
            key={item.name}
            href={`/work/${item.caseStudy}`}
            transitionTypes={["nav-forward"]}
            data-tile
            data-reveal
            style={stagger(i)}
            className={cls}
          >
            {body}
          </Link>
        ) : (
          <div key={item.name} tabIndex={0} data-tile data-reveal style={stagger(i)} className={cls}>
            {body}
          </div>
        );
      })}
    </div>
  );
}
