"use client";

import Link from "next/link";
import { useState } from "react";
import { SHOW_XANTYR } from "@/lib/flags";

const NAV_ITEMS = [
  { label: "Work", href: "/#work" },
  ...(SHOW_XANTYR ? [{ label: "Building Xantyr", href: "/#now-building" }] : []),
  { label: "Models", href: "/#models" },
  { label: "Industries", href: "/#industries" },
  { label: "Method", href: "/private-models" },
  { label: "Contact", href: "/#contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-sm bg-bg/90 border-b border-border"
      style={{ viewTransitionName: "site-header" }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        <Link href="/" transitionTypes={["nav-back"]} className="font-mono text-sm tracking-[0.15em] uppercase">
          Dev Seth
        </Link>

        <nav className="hidden md:flex items-center gap-8" aria-label="Main">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              transitionTypes={["nav-back"]}
              className="font-mono text-xs uppercase tracking-wider text-text-muted hover:text-accent transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          className="md:hidden font-mono text-xs uppercase tracking-wider text-text"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" className="md:hidden border-t border-border px-6 py-4 flex flex-col gap-4" aria-label="Main">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              transitionTypes={["nav-back"]}
              onClick={() => setOpen(false)}
              className="font-mono text-xs uppercase tracking-wider text-text-muted hover:text-accent transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
