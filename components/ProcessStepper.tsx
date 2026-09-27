"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export type ProcessStep = {
  number: string;
  title: string;
  whatIDo: string;
  whatYouGet: string;
  tools?: string[];
  /** Optional per-step interactive, rendered below the standard content. */
  extra?: ReactNode;
};

type ProcessStepperProps = {
  steps: ProcessStep[];
};

function ToolChips({ tools }: { tools: string[] }) {
  return (
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
  );
}

function MobileStep({ step, index }: { step: ProcessStep; index: number }) {
  const [open, setOpen] = useState(false);
  const panelId = `process-mobile-panel-${index}`;

  return (
    <div className="border border-border p-5 flex flex-col gap-3">
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-xs text-accent">{step.number}</span>
        <h3 className="text-lg font-medium text-text">{step.title}</h3>
      </div>
      <p className="text-sm text-text-muted">{step.whatIDo}</p>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={panelId}
        className="font-mono text-xs uppercase tracking-wider text-accent hover:text-accent-hover self-start"
      >
        {open ? "deliverables & tools −" : "deliverables & tools +"}
      </button>
      <div
        id={panelId}
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden flex flex-col gap-3 pt-1">
          <p className="text-sm text-text-muted">{step.whatYouGet}</p>
          {step.tools && step.tools.length > 0 && <ToolChips tools={step.tools} />}
          {step.extra && <div className="mt-2">{step.extra}</div>}
        </div>
      </div>
    </div>
  );
}

export default function ProcessStepper({ steps }: ProcessStepperProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    function handleScroll() {
      const viewportCenter = window.innerHeight / 2;
      let closestIndex = 0;
      let closestDistance = Infinity;
      panelRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const distance = Math.abs(center - viewportCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = i;
        }
      });
      setActiveIndex(closestIndex);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollToStep(i: number) {
    panelRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <div>
      {/* Mobile: stacked cards, no scroll-jacking, no sticky nav. */}
      <div className="flex flex-col gap-4 md:hidden">
        {steps.map((step, i) => (
          <MobileStep key={step.title} step={step} index={i} />
        ))}
      </div>

      {/* Desktop: sticky step list + progress line, scrolling panels. */}
      <div className="hidden md:grid md:grid-cols-[220px_1fr] gap-12">
        <div className="sticky top-24 self-start">
          <div className="relative pl-6">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />
            <div
              className="absolute left-0 top-0 w-px bg-accent transition-all duration-300 ease-out"
              style={{
                height: steps.length > 1 ? `${(activeIndex / (steps.length - 1)) * 100}%` : "0%",
              }}
            />
            <div className="flex flex-col gap-6">
              {steps.map((step, i) => (
                <button
                  key={step.title}
                  onClick={() => scrollToStep(i)}
                  className="text-left"
                >
                  <p
                    className={`font-mono text-xs uppercase tracking-wider transition-colors ${
                      i === activeIndex ? "text-accent" : "text-text-muted"
                    }`}
                  >
                    {step.number}
                  </p>
                  <p
                    className={`text-sm transition-colors ${
                      i === activeIndex ? "text-text" : "text-text-muted"
                    }`}
                  >
                    {step.title}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-24">
          {steps.map((step, i) => (
            <div
              key={step.title}
              ref={(el) => {
                panelRefs.current[i] = el;
              }}
              className="flex flex-col gap-4 min-h-[200px] justify-center"
            >
              <p className="font-mono text-xs uppercase tracking-wider text-accent">{step.number}</p>
              <h3 className="text-2xl md:text-3xl font-medium text-text">{step.title}</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted mb-2">
                    what I do
                  </p>
                  <p className="text-sm md:text-base text-text-muted">{step.whatIDo}</p>
                </div>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted mb-2">
                    what you get
                  </p>
                  <p className="text-sm md:text-base text-text-muted">{step.whatYouGet}</p>
                </div>
              </div>
              {step.tools && step.tools.length > 0 && <ToolChips tools={step.tools} />}
              {step.extra && <div className="mt-4 max-w-xl">{step.extra}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
