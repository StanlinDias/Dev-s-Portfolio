import Button from "@/components/Button";
import Section from "@/components/Section";
import StatCounter from "@/components/StatCounter";
import StatDial from "@/components/StatDial";
import ScrollZoomReveal from "@/components/ScrollZoomReveal";
import TrajectoryChart from "@/components/TrajectoryChart";
import CaseStudyGrid from "@/components/CaseStudyGrid";
import Timeline from "@/components/Timeline";
import StackGrid from "@/components/StackGrid";
import AccomplishmentList from "@/components/AccomplishmentList";
import data from "@/content/portfolio-data.json";

function ProofStrip() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 w-full max-w-5xl px-6">
      {data.stats.map((stat) =>
        stat.type === "counter" ? (
          <StatCounter
            key={stat.label}
            value={stat.value}
            suffix={stat.suffix}
            label={stat.label}
          />
        ) : (
          <StatDial
            key={stat.label}
            value={stat.value}
            max={stat.max ?? 100}
            unit={stat.unit ?? ""}
            label={stat.label}
          />
        )
      )}
    </div>
  );
}

function NowBuildingPanel() {
  return (
    <div id="now-building" className="max-w-2xl px-6 text-center md:text-left flex flex-col gap-6 items-center md:items-start">
      <p className="font-mono text-xs md:text-sm uppercase tracking-[0.2em] text-accent">
        now building
      </p>
      <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-text">
        Vibe code your own private &amp; affordable LLM.
      </h2>
      <p className="text-text-muted text-base md:text-lg">
        Xantyr turns a company&apos;s own data into a specialised model it owns
        outright, in three steps — structure the data, fine-tune it, deploy it —
        no ML team required. I&apos;m the technical co-founder; I write the code.
      </p>
      <Button variant="primary" href="https://xantyr.com" label="Visit xantyr.com ▸" />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <section id="hero" className="px-6 md:px-12 py-32 md:py-40 max-w-6xl mx-auto flex flex-col gap-8">
        <p className="font-mono text-xs md:text-sm uppercase tracking-[0.2em] text-accent">
          cto · xantyr · ai architect
        </p>
        <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-text max-w-4xl leading-[1.1]">
          Six years building AI that enterprises actually trust.
        </h1>
        <p className="text-text-muted text-base md:text-lg max-w-2xl">
          I&apos;ve fine-tuned models for individuals and Fortune 500s, shipped
          production AI across pharma, retail, real estate, and government — and
          I&apos;m now building the platform that lets any business own its model
          the same way.
        </p>
        <div className="flex flex-wrap gap-4 mt-2">
          <Button variant="primary" href="https://xantyr.com" label="See what I'm building" />
          <Button variant="secondary" href="#work" label="View case studies" />
        </div>
      </section>

      <ScrollZoomReveal
        className="border-t border-border"
        from={<ProofStrip />}
        to={<NowBuildingPanel />}
        cascadeLines={["now building", "the platform.", "xantyr."]}
      />

      <Section id="trajectory" eyebrow="the trajectory" title="From a team of 5 to leading 25+.">
        <TrajectoryChart points={data.trajectory} />
      </Section>

      <Section id="work" eyebrow="selected work" title="Case studies that moved the needle.">
        <CaseStudyGrid items={data.caseStudies} tags={data.industryTags} />
      </Section>

      <Section id="experience" eyebrow="experience" title="A trajectory built on compounding impact.">
        <Timeline items={data.experience} />
      </Section>

      <Section id="stack" eyebrow="technical stack" title="Deep across the full AI stack.">
        <StackGrid groups={data.stack} />
      </Section>

      <Section id="accomplishments" eyebrow="off the resume" title="Things that don't fit in a bullet point.">
        <AccomplishmentList items={data.accomplishments} />
      </Section>

      <section id="contact" className="px-6 md:px-12 py-24 md:py-32 max-w-6xl mx-auto border-t border-border flex flex-col gap-6">
        <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-text max-w-3xl">
          Building Xantyr. Always happy to talk shop.
        </h2>
        <p className="text-text-muted text-base md:text-lg max-w-2xl">
          I&apos;m full-time on Xantyr now, so I&apos;m not taking on consulting
          work — but I&apos;m glad to talk AI, defence-grade infrastructure, or
          anything hard and technical.
        </p>
        <div className="flex flex-wrap gap-6 font-mono text-sm uppercase tracking-wider mt-2">
          <a href="mailto:dev@xantyr.com" className="text-accent hover:text-accent-hover">
            dev@xantyr.com
          </a>
          <a
            href="https://www.linkedin.com/in/dev-seth-840774185/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-accent"
          >
            LinkedIn
          </a>
        </div>
      </section>
    </>
  );
}
