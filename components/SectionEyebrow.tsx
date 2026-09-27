import type { ReactNode } from "react";

type SectionEyebrowProps = {
  children: ReactNode;
  className?: string;
};

export default function SectionEyebrow({ children, className = "" }: SectionEyebrowProps) {
  return (
    <p className={`font-mono text-xs md:text-sm uppercase tracking-[0.2em] text-accent ${className}`}>
      {children}
    </p>
  );
}
