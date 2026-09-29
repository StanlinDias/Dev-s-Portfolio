"use client";

import { useEffect, useRef } from "react";

type CountUpProps = {
  value: string;
  /** ms to wait after the element is visible before counting. */
  delay?: number;
  className?: string;
};

// Splits "20+" / "1M+" / "~$52K" / "22+ stores" into prefix, number and suffix.
// Values that aren't a leading number ("24/7", "Air-gapped") render as-is.
function parse(value: string) {
  const m = value.match(/^([^\d]*)(\d+)(.*)$/);
  if (!m || /^[\d/.,]/.test(m[3])) return null;
  return { prefix: m[1], target: parseInt(m[2], 10), suffix: m[3] };
}

// The final value is server-rendered; on first view it counts up from 0 once.
export default function CountUp({ value, delay = 0, className = "" }: CountUpProps) {
  const numRef = useRef<HTMLSpanElement>(null);
  const parts = parse(value);

  useEffect(() => {
    const el = numRef.current;
    if (!el || !parts || parts.target < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let timer = 0;
    const run = () => {
      const start = performance.now();
      const dur = 900 + Math.min(parts.target, 40) * 10;
      const tick = (now: number) => {
        const t = Math.max(0, Math.min((now - start) / dur, 1));
        const eased = 1 - Math.pow(1 - t, 4);
        el.textContent = String(Math.round(parts.target * eased));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      el.textContent = "0";
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        timer = window.setTimeout(run, delay);
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
    // value is static per instance
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!parts) return <span className={className}>{value}</span>;
  return (
    <span className={`tabular-nums ${className}`}>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true">
        {parts.prefix}
        <span ref={numRef}>{parts.target}</span>
        {parts.suffix}
      </span>
    </span>
  );
}
