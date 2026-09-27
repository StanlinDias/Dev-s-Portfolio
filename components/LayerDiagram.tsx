"use client";

import { useState } from "react";

type Layer = {
  title: string;
  owns: string;
};

type LayerDiagramProps = {
  layers: Layer[];
  footnote?: string;
};

export default function LayerDiagram({ layers, footnote }: LayerDiagramProps) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col border border-border">
        {layers.map((layer, i) => {
          const isActive = active === i;
          return (
            <button
              key={layer.title}
              onClick={() => setActive(isActive ? null : i)}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              className={`text-left px-5 py-4 transition-colors ${
                i > 0 ? "border-t border-border" : ""
              } ${isActive ? "bg-accent/[0.06]" : ""}`}
            >
              <p
                className={`font-mono text-xs uppercase tracking-[0.15em] mb-1 transition-colors ${
                  isActive ? "text-accent" : "text-text-muted"
                }`}
              >
                {layer.title}
              </p>
              <p className="text-sm md:text-base text-text-muted">{layer.owns}</p>
            </button>
          );
        })}
      </div>
      {footnote && <p className="text-sm text-text-muted max-w-lg">{footnote}</p>}
    </div>
  );
}
