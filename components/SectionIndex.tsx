"use client";

import { useEffect, useRef, useState } from "react";

type IndexItem = {
  id: string;
  label: string;
};

type SectionIndexProps = {
  items: IndexItem[];
};

export default function SectionIndex({ items }: SectionIndexProps) {
  const [activeId, setActiveId] = useState(items[0]?.id);
  const [open, setOpen] = useState(false);
  const sectionsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    sectionsRef.current = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => !!el);

    function handleScroll() {
      const viewportMarker = window.innerHeight * 0.3;
      let current = sectionsRef.current[0];
      for (const el of sectionsRef.current) {
        if (el.getBoundingClientRect().top <= viewportMarker) {
          current = el;
        }
      }
      if (current) setActiveId(current.id);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [items]);

  function scrollToId(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  }

  return (
    <>
      {/* Desktop: sticky left rail */}
      <nav className="hidden lg:block sticky top-24 self-start w-44 shrink-0">
        <p className="font-mono text-[10px] uppercase tracking-wider text-text-muted mb-3">On this page</p>
        <ul className="flex flex-col gap-2 border-l border-border pl-4">
          {items.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollToId(item.id)}
                className={`text-left text-sm transition-colors ${
                  activeId === item.id ? "text-accent" : "text-text-muted hover:text-text"
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile: collapsible menu */}
      <div className="lg:hidden sticky top-16 z-40 bg-bg border-b border-border">
        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-section-index"
          className="w-full flex items-center justify-between px-6 py-3 font-mono text-xs uppercase tracking-wider text-text-muted"
        >
          On this page: {items.find((i) => i.id === activeId)?.label}
          <span>{open ? "−" : "+"}</span>
        </button>
        <div
          id="mobile-section-index"
          className="grid transition-[grid-template-rows] duration-300 ease-out"
          style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
        >
          <div className="overflow-hidden">
            <ul className="flex flex-col px-6 pb-4">
              {items.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToId(item.id)}
                    className={`py-2 text-left text-sm ${
                      activeId === item.id ? "text-accent" : "text-text-muted"
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
