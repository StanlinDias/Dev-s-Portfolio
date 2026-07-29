import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  title?: string;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
};

export default function Section({ id, title, eyebrow, children, className = "" }: SectionProps) {
  return (
    <section id={id} className={`px-6 md:px-12 py-20 md:py-32 max-w-6xl mx-auto ${className}`}>
      {(eyebrow || title) && (
        <div className="mb-10 md:mb-16">
          {eyebrow && (
            <p className="font-mono text-xs md:text-sm uppercase tracking-[0.2em] text-accent mb-3">
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-text max-w-3xl">
              {title}
            </h2>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
