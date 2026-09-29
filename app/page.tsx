import Link from "next/link";
import Button from "@/components/Button";
import Section from "@/components/Section";
import ScrollZoomReveal from "@/components/ScrollZoomReveal";
import AccomplishmentList from "@/components/AccomplishmentList";
import LazyGlobe from "@/components/LazyGlobe";
import TiltCard from "@/components/TiltCard";
import SectionEyebrow from "@/components/SectionEyebrow";
import CountUp from "@/components/CountUp";
import PressLine from "@/components/PressLine";
import CaseStudyCard from "@/components/CaseStudyCard";
import ModelCard from "@/components/ModelCard";
import IndustryGrid from "@/components/IndustryGrid";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import ContactBlock from "@/components/ContactBlock";
import Chip from "@/components/Chip";
import { site, metrics } from "@/content/site";
import { caseStudies } from "@/content/case-studies";
import { moreWork } from "@/content/more-work";
import { models } from "@/content/models";
import { industries, regions } from "@/content/industries";
import { experience } from "@/content/experience";
import { education } from "@/content/education";
import { testimonials } from "@/content/testimonials";
import { accomplishments } from "@/content/accomplishments";
import { stagger } from "@/lib/motion";
import { SHOW_XANTYR } from "@/lib/flags";

function MetricRow() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8 w-full">
      {metrics.map((m) => (
        <div key={m.label} className="flex flex-col gap-1">
          <CountUp value={m.value} delay={900} className="font-mono text-3xl md:text-5xl font-medium text-text" />
          <p className="text-xs md:text-sm text-text-muted max-w-[24ch]">{m.label}</p>
        </div>
      ))}
    </div>
  );
}

function CofounderBubble() {
  return (
    <div className="absolute -top-3 right-2 md:-top-4 md:-right-8 z-10">
      <div className="relative bg-text text-bg font-mono text-[10px] md:text-[11px] uppercase tracking-wider px-3 py-2 rounded-full shadow-lg whitespace-nowrap">
        I&apos;m the co-founder. I write the code
        <span className="absolute -bottom-1.5 left-6 w-3 h-3 bg-text rotate-45" />
      </div>
    </div>
  );
}

function NowBuildingPanel() {
  return (
    <TiltCard className="max-w-2xl">
      <div
        id="now-building"
        className="relative px-8 py-10 text-center md:text-left flex flex-col gap-6 items-center md:items-start"
      >
        <CofounderBubble />
        <SectionEyebrow>now building</SectionEyebrow>
        <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-text">
          Vibe code your own private &amp; affordable LLM.
        </h2>
        <p className="text-text-muted text-base md:text-lg">
          Xantyr turns a company&apos;s own data into a specialised model it owns
          outright: structure it, fine-tune it, deploy it. No ML team required.
        </p>
        <Button variant="primary" href="https://xantyr.com" label="Visit xantyr.com ▸" />
      </div>
    </TiltCard>
  );
}

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.title,
  email: `mailto:${site.email}`,
  url: site.url,
  sameAs: [site.linkedin],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      <section id="hero" className="relative px-6 md:px-12 pt-16 pb-16 md:pt-24 md:pb-20 max-w-6xl mx-auto">
        <div className="pointer-events-auto absolute right-0 top-10 hidden lg:block">
          <LazyGlobe size={400} />
        </div>

        <div className="relative flex flex-col gap-8 max-w-2xl">
          <SectionEyebrow>chief ai architect · private models · production ai</SectionEyebrow>
          <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-text leading-[1.1]">
            <span className="mask-line">
              <span style={{ "--line": 0 } as React.CSSProperties}>7 years building AI</span>
            </span>
            <span className="mask-line">
              <span style={{ "--line": 1 } as React.CSSProperties}>that enterprises actually trust.</span>
            </span>
          </h1>
          <p className="text-text-muted text-base md:text-lg">
            I build private, specialised models and the production systems around them for global clients in
            defence, government, healthcare, retail and real estate. From structuring the data to deploying
            inside the client&apos;s own infrastructure.
          </p>
          <div className="flex flex-wrap gap-4 mt-2">
            <Button variant="primary" href="/#work" label="See the work" />
            <Button variant="secondary" href="/private-models" label="How I build private models" />
          </div>
        </div>

        <div className="relative mt-14 md:mt-20 pt-10 border-t border-border">
          <MetricRow />
        </div>
      </section>

      {SHOW_XANTYR && (
        <ScrollZoomReveal
          className="border-t border-border"
          from={<MetricRow />}
          to={<NowBuildingPanel />}
          cascadeLines={["the platform.", "xantyr."]}
        />
      )}

      <PressLine />

      <Section
        id="work"
        eyebrow="selected work"
        title="Four systems, four very different stakes."
        className="border-t border-border"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {caseStudies.map((study, i) => (
            <CaseStudyCard key={study.slug} study={study} style={stagger(i)} />
          ))}
        </div>

        <div className="mt-16">
          <h3 data-reveal className="font-mono text-xs uppercase tracking-[0.2em] text-text-muted mb-4">
            More work
          </h3>
          <ul className="border-t border-border">
            {moreWork.map((item, i) => (
              <li
                key={item.title}
                data-reveal
                style={stagger(i)}
                className="grid grid-cols-1 md:grid-cols-[1fr_2fr_auto] gap-2 md:gap-8 items-baseline py-5 border-b border-border"
              >
                <span className="text-base font-medium text-text">{item.title}</span>
                <span className="text-sm text-text-muted">{item.line}</span>
                <span>
                  <Chip>{item.industry}</Chip>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section
        id="models"
        eyebrow="models"
        title="Models I've built, not just prompted."
        intro="When an API model isn't good enough, private enough or cheap enough, I build one that is."
        className="border-t border-border"
      >
        {/* Mobile: swipeable row. Desktop: 3 + 2 on a 6-column grid, so no slot is left empty. */}
        <div className="-mx-6 px-6 md:mx-0 md:px-0 flex md:grid md:grid-cols-2 lg:grid-cols-6 gap-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-2 md:pb-0">
          {models.map((model, i) => (
            <ModelCard
              key={model.name}
              model={model}
              style={stagger(i)}
              className={`w-[82%] shrink-0 snap-start md:w-auto ${
                i < 3 ? "lg:col-span-2" : "lg:col-span-3"
              } ${i === models.length - 1 ? "md:col-span-2" : ""}`}
            />
          ))}
        </div>
        <Link
          href="/private-models"
          transitionTypes={["nav-forward"]}
          data-reveal
          className="inline-block mt-10 font-mono text-sm uppercase tracking-wider text-accent hover:text-accent-hover"
        >
          See how I build them →
        </Link>
      </Section>

      <Section
        id="industries"
        eyebrow="industries"
        title="Seven industries. Clients across four regions."
        className="border-t border-border"
      >
        <IndustryGrid items={industries} />
        <p data-reveal className="mt-8 font-mono text-xs md:text-sm uppercase tracking-[0.2em] text-text-muted">
          {regions.join(" · ")}
        </p>
      </Section>

      <Section id="experience" eyebrow="experience" title="Where I've done it." className="border-t border-border">
        <ExperienceTimeline items={experience} />
      </Section>

      <Section id="education" eyebrow="education" title="Training and credentials." className="border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <div data-reveal className="flex flex-col gap-8">
            <div className="flex flex-col gap-1">
              <h3 className="text-lg md:text-xl font-medium text-text">{education.degree.name}</h3>
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-accent">{education.degree.school}</p>
              <p className="text-sm text-text-muted mt-1">{education.degree.note}</p>
            </div>
            {education.publications.map((pub) => (
              <div key={pub.title} className="flex flex-col gap-1">
                <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted">publication</p>
                <h3 className="text-base md:text-lg font-medium text-text">{pub.title}</h3>
                <p className="text-sm text-text-muted">{pub.note}</p>
              </div>
            ))}
          </div>
          <div data-reveal style={stagger(1)}>
            <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted mb-3">certifications</p>
            <ul className="border-t border-border">
              {education.certifications.map((cert) => {
                const row = (
                  <span className="flex items-baseline justify-between gap-4 py-4">
                    <span className="flex flex-col">
                      <span className="text-base text-text">{cert.name}</span>
                      <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">{cert.issuer}</span>
                    </span>
                    {(cert.year || cert.url) && (
                      <span className="font-mono text-xs text-text-muted shrink-0">
                        {cert.year}
                        {cert.url && " ↗"}
                      </span>
                    )}
                  </span>
                );
                return (
                  <li key={cert.name} className="border-b border-border">
                    {cert.url ? (
                      <a href={cert.url} target="_blank" rel="noopener noreferrer" className="block hover:text-accent">
                        {row}
                      </a>
                    ) : (
                      row
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Section>

      {testimonials.length > 0 && (
        <Section id="testimonials" eyebrow="testimonials" title="In their words." className="border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <figure key={t.name} data-reveal style={stagger(i)} className="border border-border p-6 flex flex-col gap-4">
                <blockquote className="text-base text-text">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-auto text-sm text-text-muted">
                  <span className="text-text">{t.name}</span>, {t.role}, {t.org}
                </figcaption>
              </figure>
            ))}
          </div>
        </Section>
      )}

      <Section
        id="accomplishments"
        eyebrow="off the resume"
        title="Things that don't fit in a bullet point."
        className="border-t border-border"
      >
        <AccomplishmentList items={accomplishments} />
      </Section>

      <ContactBlock />
    </>
  );
}
