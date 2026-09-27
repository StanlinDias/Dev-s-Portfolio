"use client";

import { useState } from "react";

export type SegmentRevealItem = {
  title: string;
  body: string;
};

type SegmentRevealProps = {
  items: SegmentRevealItem[];
  defaultIndex?: number;
};

export default function SegmentReveal({ items, defaultIndex = 0 }: SegmentRevealProps) {
  const [active, setActive] = useState(defaultIndex);

  return (
    <>
      <div className="hidden md:flex gap-3 h-72 lg:h-80">
        {items.map((item, i) => {
          const isActive = i === active;
          return (
            <button
              key={item.title}
              onClick={() => setActive(i)}
              aria-expanded={isActive}
              className={`group relative flex flex-col justify-between overflow-hidden border p-6 text-left transition-[flex-grow] duration-500 ease-out ${
                isActive ? "border-accent/50 bg-accent/[0.04]" : "border-border hover:border-accent/30"
              }`}
              style={{ flexGrow: isActive ? 4 : 1, flexBasis: 0, minWidth: "88px" }}
            >
              <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>

              <div className="grid flex-1 items-center">
                <span
                  className={`[grid-area:1/1] whitespace-nowrap font-mono text-xs uppercase tracking-[0.2em] text-text-muted transition-opacity duration-200 [writing-mode:vertical-rl] ${
                    isActive ? "pointer-events-none opacity-0" : "opacity-100"
                  }`}
                >
                  {item.title}
                </span>
                <div
                  className={`[grid-area:1/1] flex flex-col gap-2 transition-opacity duration-300 ${
                    isActive ? "opacity-100 delay-150" : "pointer-events-none opacity-0"
                  }`}
                >
                  <h3 className="text-lg font-medium text-text">{item.title}</h3>
                  <p className="text-sm text-text-muted">{item.body}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-4 md:hidden">
        {items.map((item) => (
          <div key={item.title} className="border border-border p-5 flex flex-col gap-2">
            <h3 className="font-mono text-xs uppercase tracking-[0.15em] text-accent">{item.title}</h3>
            <p className="text-sm text-text-muted">{item.body}</p>
          </div>
        ))}
      </div>
    </>
  );
}
