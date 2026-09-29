"use client";

import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

// Slides in under the site header once the case-study hero has scrolled away.
export default function CaseStudyMiniHeader({ title, heroId }: { title: string; heroId: string }) {
  const [visible, setVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });

  useEffect(() => {
    const hero = document.getElementById(heroId);
    if (!hero) return;
    const io = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting), {
      rootMargin: "-64px 0px 0px 0px",
    });
    io.observe(hero);
    return () => io.disconnect();
  }, [heroId]);

  return (
    <div
      aria-hidden={!visible}
      className={`fixed top-16 left-0 right-0 z-40 border-b border-border bg-bg/95 backdrop-blur-sm transition-[transform,opacity] duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0 pointer-events-none"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 h-11 flex items-center justify-between gap-4">
        <p className="text-sm text-text truncate">{title}</p>
        <Link
          href="/#work"
          transitionTypes={["nav-back"]}
          tabIndex={visible ? 0 : -1}
          className="shrink-0 font-mono text-[11px] uppercase tracking-wider text-text-muted hover:text-accent"
        >
          ← All work
        </Link>
      </div>
      <motion.div className="h-[2px] bg-accent origin-left" style={{ scaleX }} />
    </div>
  );
}
