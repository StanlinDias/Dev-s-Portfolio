"use client";

import Link from "next/link";
import { useState } from "react";
import Chip from "@/components/Chip";
import type { Model } from "@/content/types";

export default function ModelCard({ model, className = "", style }: { model: Model; className?: string; style?: React.CSSProperties }) {
  const [open, setOpen] = useState(false);
  const bench = model.benchmark;
  const panelId = `model-bench-${model.name.replace(/\W+/g, "-").toLowerCase()}`;
  const top = bench ? Math.max(...bench.scores.map((s) => s.score)) : 0;

  return (
    <article
      data-reveal
      style={style}
      className={`group flex flex-col gap-4 border border-border bg-bg p-6 transition-[border-color,transform] duration-[180ms] hover:border-accent/50 ${className}`}
    >
      <div className="flex items-center justify-between gap-3">
        <Chip tone="accent">{model.badge}</Chip>
        <span className="text-accent text-base leading-none" aria-hidden="true">◈</span>
      </div>
      <h3 className="text-lg font-medium text-text">{model.name}</h3>
      <p className="text-sm text-text-muted">{model.oneLiner}</p>
      <p className="text-sm text-text border-l-2 border-accent/60 pl-3 mt-auto">{model.headline}</p>

      {model.caseStudy && (
        <Link
          href={`/work/${model.caseStudy}`}
          transitionTypes={["nav-forward"]}
          className="font-mono text-xs uppercase tracking-wider text-accent hover:text-accent-hover self-start"
        >
          See it in production →
        </Link>
      )}

      {bench && (
        <>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls={panelId}
            className="font-mono text-xs uppercase tracking-wider text-accent hover:text-accent-hover self-start"
          >
            {open ? "benchmark −" : "benchmark +"}
          </button>
          <div
            id={panelId}
            className="grid transition-[grid-template-rows] duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
          >
            <div className="overflow-hidden">
              <ul className="flex flex-col gap-2 pt-2">
                {bench.scores.map((s, i) => (
                  <li key={s.label} className="flex flex-col gap-1">
                    <span className="flex justify-between text-xs">
                      <span className={s.mine ? "text-text" : "text-text-muted"}>{s.label}</span>
                      <span className="font-mono tabular-nums">{s.score}</span>
                    </span>
                    <span className="h-1.5 bg-border overflow-hidden">
                      <span
                        className={`block h-full origin-left transition-transform duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${s.mine ? "bg-accent" : "bg-text-muted/50"}`}
                        style={{
                          width: `${(s.score / top) * 100}%`,
                          transform: `scaleX(${open ? 1 : 0})`,
                          transitionDelay: open ? `${i * 60}ms` : "0ms",
                        }}
                      />
                    </span>
                  </li>
                ))}
              </ul>
              <p className="font-mono text-[10px] uppercase tracking-wider text-text-muted pt-2">{bench.metric}</p>
            </div>
          </div>
        </>
      )}
    </article>
  );
}
