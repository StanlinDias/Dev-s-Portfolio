import Link from "next/link";
import { ViewTransition } from "react";
import Chip from "@/components/Chip";
import StatusDot from "@/components/StatusDot";
import FlowDiagram from "@/components/FlowDiagram";
import type { CaseStudy } from "@/content/types";

type CaseStudyCardProps = {
  study: CaseStudy;
  /** "next" is the larger end-of-page card on case-study pages. */
  label?: string;
  className?: string;
  style?: React.CSSProperties;
};

// The whole card is the link. Title and diagram share view-transition names
// with the case-study hero, so they morph into place on navigation.
export default function CaseStudyCard({ study, label = "Read the case study →", className = "", style }: CaseStudyCardProps) {
  return (
    <Link
      href={`/work/${study.slug}`}
      transitionTypes={["nav-forward"]}
      data-reveal
      style={style}
      className={`flow-preview-host group relative flex flex-col gap-5 border border-border bg-bg p-6 md:p-8 transition-[transform,box-shadow,border-color] duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_18px_40px_-24px_rgba(16,16,16,0.35)] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${className}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Chip tone="accent">{study.industry}</Chip>
        <StatusDot status={study.status} />
      </div>

      <div className="flex flex-col gap-3">
        <ViewTransition name={`cs-title-${study.slug}`} share="morph">
          <h3 className="text-xl md:text-2xl font-medium tracking-tight text-text">{study.title}</h3>
        </ViewTransition>
        <p className="text-sm md:text-base text-text-muted">{study.summary}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {study.facts.slice(0, 2).map((fact) => (
          <p key={fact.label} className="flex flex-col gap-1">
            <span className="font-mono text-lg md:text-xl text-text">{fact.value}</span>
            <span className="text-xs text-text-muted">{fact.label}</span>
          </p>
        ))}
      </div>

      <ViewTransition name={`cs-diagram-${study.slug}`} share="morph">
        <div className="mt-auto border-t border-border pt-5">
          <FlowDiagram spec={study.diagram} id={`card-${study.slug}`} variant="preview" />
        </div>
      </ViewTransition>

      <span className="font-mono text-xs uppercase tracking-wider text-accent group-hover:text-accent-hover">
        {label}
      </span>
    </Link>
  );
}
