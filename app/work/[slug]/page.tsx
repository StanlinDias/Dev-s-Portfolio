import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import Chip from "@/components/Chip";
import StatusDot from "@/components/StatusDot";
import CountUp from "@/components/CountUp";
import FlowDiagram from "@/components/FlowDiagram";
import CaseStudyCard from "@/components/CaseStudyCard";
import CaseStudyMiniHeader from "@/components/CaseStudyMiniHeader";
import ContactBlock from "@/components/ContactBlock";
import SectionEyebrow from "@/components/SectionEyebrow";
import { caseStudies, getCaseStudy, getNextCaseStudy } from "@/content/case-studies";
import { site } from "@/content/site";
import { stagger } from "@/lib/motion";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const study = getCaseStudy((await params).slug);
  if (!study) return {};
  return {
    title: `${study.title} · ${site.name}`,
    description: study.summary,
    alternates: { canonical: `/work/${study.slug}` },
  };
}

function Block({ eyebrow, children }: { eyebrow: string; children: React.ReactNode }) {
  return (
    <section className="py-12 md:py-16 border-t border-border">
      <div data-reveal>
        <SectionEyebrow className="mb-6">{eyebrow}</SectionEyebrow>
      </div>
      {children}
    </section>
  );
}

export default async function CaseStudyPage({ params }: Props) {
  const study = getCaseStudy((await params).slug);
  if (!study) notFound();
  const next = getNextCaseStudy(study.slug);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.title,
    description: study.summary,
    about: study.industry,
    author: { "@type": "Person", name: site.name, url: site.url },
    url: `${site.url}/work/${study.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <CaseStudyMiniHeader title={study.title} heroId="case-hero" />

      <article>
        <header id="case-hero" className="px-6 md:px-12 pt-12 pb-12 md:pt-20 md:pb-16 max-w-6xl mx-auto">
          <Link
            href="/#work"
            transitionTypes={["nav-back"]}
            className="inline-block mb-10 font-mono text-[11px] uppercase tracking-wider text-text-muted hover:text-accent"
          >
            ← All work
          </Link>
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-14 items-start">
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap items-center gap-4">
                <Chip tone="accent">{study.industry}</Chip>
                <StatusDot status={study.status} />
              </div>
              <ViewTransition name={`cs-title-${study.slug}`} share="morph">
                <h1 className="text-3xl md:text-5xl font-medium tracking-tight text-text leading-[1.1]">
                  {study.title}
                </h1>
              </ViewTransition>
              <p className="text-base md:text-lg text-text-muted">{study.summary}</p>
            </div>
            <ViewTransition name={`cs-diagram-${study.slug}`} share="morph">
              <div className="border border-border p-4 md:p-5">
                <FlowDiagram spec={study.diagram} id={`hero-${study.slug}`} variant="preview" />
              </div>
            </ViewTransition>
          </div>

          <div
            className={`mt-12 pt-8 border-t border-border grid grid-cols-2 gap-x-6 gap-y-8 ${
              study.facts.length === 4 ? "md:grid-cols-4" : "md:grid-cols-3"
            } ${study.facts.length === 3 ? "[&>*:last-child]:col-span-2 md:[&>*:last-child]:col-span-1" : ""}`}
          >
            {study.facts.map((fact) => (
              <div key={fact.label} className="flex flex-col gap-1">
                <CountUp value={fact.value} delay={200} className="font-mono text-2xl md:text-4xl font-medium text-text" />
                <p className="text-xs md:text-sm text-text-muted max-w-[26ch]">{fact.label}</p>
              </div>
            ))}
          </div>
        </header>

        <div className="px-6 md:px-12 max-w-6xl mx-auto">
          <Block eyebrow="the situation">
            <p data-reveal className="text-lg md:text-2xl text-text max-w-3xl leading-relaxed">
              {study.situation}
            </p>
          </Block>

          <Block eyebrow="the hard part">
            <blockquote
              data-reveal
              className="border-l-2 border-accent pl-6 md:pl-8 font-serif italic text-2xl md:text-4xl text-text max-w-4xl leading-snug"
            >
              {study.hardPart}
            </blockquote>
          </Block>

          <Block eyebrow="what i built">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {study.built.map((module, i) => (
                <div
                  key={module.title}
                  data-reveal
                  style={stagger(i)}
                  className={`border border-border p-6 flex flex-col gap-3 ${
                    study.built.length % 2 === 1 && i === study.built.length - 1 ? "md:col-span-2" : ""
                  }`}
                >
                  <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="text-lg font-medium text-text">{module.title}</h3>
                  <p className="text-sm md:text-base text-text-muted">{module.body}</p>
                </div>
              ))}
            </div>
          </Block>

          <Block eyebrow="how it fits together">
            <FlowDiagram spec={study.diagram} id={`full-${study.slug}`} />
          </Block>

          <Block eyebrow="results">
            <ul className="flex flex-col gap-4 max-w-3xl">
              {study.results.map((result, i) => (
                <li key={result} data-reveal style={stagger(i)} className="flex items-start gap-3">
                  <span className="text-accent font-mono text-sm mt-1" aria-hidden="true">
                    ✓
                  </span>
                  <span className="text-base md:text-lg text-text">{result}</span>
                </li>
              ))}
            </ul>
          </Block>

          <Block eyebrow="stack">
            <div data-reveal className="flex flex-wrap gap-2">
              {study.stack.map((item) => (
                <Chip key={item}>{item}</Chip>
              ))}
            </div>
          </Block>

          <section className="py-12 md:py-16 border-t border-border">
            <div data-reveal>
              <SectionEyebrow className="mb-6">next case study</SectionEyebrow>
            </div>
            <CaseStudyCard study={next} label="Read the next case study →" className="md:p-10" />
          </section>
        </div>
      </article>

      <ContactBlock />
    </>
  );
}
