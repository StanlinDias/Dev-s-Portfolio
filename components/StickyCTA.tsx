"use client";

import { useEffect, useState } from "react";

type StickyCTAProps = {
  label: string;
  href: string;
  /** id of the element to hide near (typically the footer CTA/contact section). */
  hideNearId: string;
};

export default function StickyCTA({ label, href, hideNearId }: StickyCTAProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const heroHeight = window.innerHeight;
    const hideTarget = document.getElementById(hideNearId);

    function handleScroll() {
      const pastHero = window.scrollY > heroHeight * 0.9;
      let nearFooter = false;
      if (hideTarget) {
        const rect = hideTarget.getBoundingClientRect();
        nearFooter = rect.top < window.innerHeight;
      }
      setVisible(pastHero && !nearFooter);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hideNearId]);

  return (
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-bg/95 backdrop-blur-sm px-4 py-3 transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!visible}
    >
      <a
        href={href}
        tabIndex={visible ? 0 : -1}
        className="block w-full text-center bg-accent text-bg font-mono text-sm uppercase tracking-wider py-3 hover:bg-accent-hover transition-colors"
      >
        {label}
      </a>
    </div>
  );
}
