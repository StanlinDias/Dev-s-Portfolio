import type { ReactNode } from "react";
import SectionEyebrow from "@/components/SectionEyebrow";

type SectionProps = {
  id: string;
  title?: string;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
};

export default function Section({ id, title, eyebrow, children, className = "" }: SectionProps) {
  return (
    <section id={id} className={`px-6 md:px-12 py-12 md:py-20 max-w-6xl mx-auto ${className}`}>
      {(eyebrow || title) && (
        <div className="mb-8 md:mb-12">
          {eyebrow && <SectionEyebrow className="mb-3">{eyebrow}</SectionEyebrow>}
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
