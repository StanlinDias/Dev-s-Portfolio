import Button from "@/components/Button";
import Section from "@/components/Section";
import StatCounter from "@/components/StatCounter";
import StatDial from "@/components/StatDial";
import ScrollZoomReveal from "@/components/ScrollZoomReveal";
import TrajectoryChart from "@/components/TrajectoryChart";
import CaseStudyGrid from "@/components/CaseStudyGrid";
import JourneyTimeline from "@/components/JourneyTimeline";
import StackGrid from "@/components/StackGrid";
import AccomplishmentList from "@/components/AccomplishmentList";
import Globe from "@/components/Globe";
import TiltCard from "@/components/TiltCard";
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

function CofounderBubble() {
  return (
    <div className="absolute -top-3 right-2 md:-top-4 md:-right-8 z-10">
      <div className="relative bg-text text-bg font-mono text-[10px] md:text-[11px] uppercase tracking-wider px-3 py-2 rounded-full shadow-lg whitespace-nowrap">
        I&apos;m the co-founder — I write the code
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
        <p className="font-mono text-xs md:text-sm uppercase tracking-[0.2em] text-accent">
          now building
        </p>
        <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-text">
          Vibe code your own private &amp; affordable LLM.
        </h2>
        <p className="text-text-muted text-base md:text-lg">
          Xantyr turns a company&apos;s own data into a specialised model it owns
          outright — structure it, fine-tune it, deploy it. No ML team required.
        </p>
        <Button variant="primary" href="https://xantyr.com" label="Visit xantyr.com ▸" />
      </div>
    </TiltCard>
  );
}

function TrajectoryTeaser() {
  return (
    <div className="max-w-2xl px-6 text-center flex flex-col gap-4 items-center">
      <p className="font-mono text-xs md:text-sm uppercase tracking-[0.2em] text-accent">
        the trajectory
      </p>
      <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-text">
        From a team of 5 to leading 25+.
      </h2>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <section id="hero" className="relative px-6 md:px-12 py-20 md:py-28 max-w-6xl mx-auto">
        <div className="pointer-events-auto absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block">
          <Globe size={420} />
        </div>

        <div className="relative flex flex-col gap-8 max-w-2xl">
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
        </div>
      </section>

      <ScrollZoomReveal
        className="border-t border-border"
        from={<ProofStrip />}
        to={<NowBuildingPanel />}
        cascadeLines={["the platform.", "xantyr."]}
      />

      <ScrollZoomReveal
        className="border-t border-border"
        from={<NowBuildingPanel />}
        to={<TrajectoryTeaser />}
        cascadeLines={["5 to 25+.", "and counting."]}
        fromZoomScale={1.9}
        fadeFloor={0.15}
      />

      <div id="trajectory" className="px-6 md:px-12 pb-12 md:pb-20 max-w-6xl mx-auto">
        <TrajectoryChart points={data.trajectory} />
      </div>

      <CaseStudyGrid items={data.caseStudies} tags={data.industryTags} />

      <Section id="experience" eyebrow="experience" title="A trajectory built on compounding impact.">
        <JourneyTimeline items={data.experience} />
      </Section>

      <Section id="stack" eyebrow="technical stack" title="Deep across the full AI stack.">
        <StackGrid groups={data.stack} />
      </Section>

      <Section id="accomplishments" eyebrow="off the resume" title="Things that don't fit in a bullet point.">
        <AccomplishmentList items={data.accomplishments} />
      </Section>

      <section id="contact" className="px-6 md:px-12 py-16 md:py-24 max-w-6xl mx-auto border-t border-border flex flex-col gap-6">
        <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-text max-w-3xl">
          Building Xantyr. Always happy to talk shop.
        </h2>
        <p className="text-text-muted text-base md:text-lg max-w-2xl">
          Ready to connect — always up for a conversation about AI, defence-grade
          infrastructure, or anything hard and technical.
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
