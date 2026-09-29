import type { ReactNode } from "react";
import SectionEyebrow from "@/components/SectionEyebrow";

type SectionProps = {
  id: string;
  title?: string;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
  intro?: string;
};

export default function Section({ id, title, eyebrow, children, className = "", intro }: SectionProps) {
  return (
    <section id={id} className={`px-6 md:px-12 py-12 md:py-20 max-w-6xl mx-auto ${className}`}>
      {(eyebrow || title) && (
        <div className="mb-8 md:mb-12">
          {eyebrow && (
            <div data-reveal>
              <SectionEyebrow className="mb-3">{eyebrow}</SectionEyebrow>
            </div>
          )}
          {title && (
            <h2 data-reveal="heading" className="text-3xl md:text-5xl font-medium tracking-tight text-text max-w-3xl">
              {title}
            </h2>
          )}
          {intro && (
            <p data-reveal className="text-text-muted text-base md:text-lg max-w-2xl mt-4">
              {intro}
            </p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
