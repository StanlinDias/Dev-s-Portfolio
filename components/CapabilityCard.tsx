"use client";

import { useState } from "react";

type CapabilityCardProps = {
  glyph: string;
  title: string;
  whatIDo: string;
  whenYouNeedIt: string;
  tools?: string[];
};

export default function CapabilityCard({ glyph, title, whatIDo, whenYouNeedIt, tools }: CapabilityCardProps) {
  const [open, setOpen] = useState(false);
  const panelId = `capability-panel-${title.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div className="border border-border p-6 flex flex-col gap-3 hover:border-accent/50 transition-colors">
      <div className="flex items-center gap-2">
        <span className="text-accent text-lg leading-none">{glyph}</span>
        <h3 className="font-mono text-xs uppercase tracking-[0.15em] text-text">{title}</h3>
      </div>

      <p className="text-sm md:text-base text-text-muted">{whatIDo}</p>

      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={panelId}
        className="font-mono text-xs uppercase tracking-wider text-accent hover:text-accent-hover self-start"
      >
        {open ? "when you need it −" : "when you need it +"}
      </button>

      {/* Always in the DOM, collapsed with CSS, not conditionally mounted. */}
      <div
        id={panelId}
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden flex flex-col gap-3">
          <p className="text-sm text-text-muted pt-1">{whenYouNeedIt}</p>
          {tools && tools.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {tools.map((tool) => (
                <span
                  key={tool}
                  className="font-mono text-[11px] uppercase tracking-wider px-2.5 py-1 border border-border text-text-muted"
                >
                  {tool}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
