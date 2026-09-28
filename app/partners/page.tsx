import type { Metadata } from "next";
import Button from "@/components/Button";
import Section from "@/components/Section";
import SectionEyebrow from "@/components/SectionEyebrow";
import StatCounter from "@/components/StatCounter";
import LayerDiagram from "@/components/LayerDiagram";
import CapabilityCard from "@/components/CapabilityCard";
import CaseStudyGrid from "@/components/CaseStudyGrid";
import AnimatedChecklist from "@/components/AnimatedChecklist";
import TimezoneOverlap from "@/components/TimezoneOverlap";
import FAQAccordion from "@/components/FAQAccordion";
import BentoGrid from "@/components/BentoGrid";
import SegmentReveal from "@/components/SegmentReveal";
import data from "@/content/portfolio-data.json";
import { SHOW_PLAYWRIGHT_STAT, SHOW_TESTIMONIALS } from "@/lib/flags";

export const metadata: Metadata = {
  title: "Dev Seth · Model engineering partner for AI and software agencies",
  description:
    "The model layer behind your AI projects: evals, fine-tuning, distillation and private deployment. You keep the client, I work behind your team.",
};

// TODO: Dev to supply a real booking tool URL (plan Section 13, item 1).
// Using a mailto fallback until then so the CTA stays functional.
const BOOKING_URL = "mailto:devseth34@gmail.com?subject=20-min%20call";

const LAYERS = [
  { title: "Client", owns: "Relationship, budget, requirements." },
  { title: "Your agency", owns: "Account, product, app layer: agents, RAG, UI, integrations." },
  { title: "Model layer, me", owns: "Evals, training data, fine-tuning, compression, private serving." },
];

const CAPABILITIES = [
  {
    glyph: "◇",
    title: "Decide",
    whatIDo: "Eval design, benchmarks, quality and cost baselines, RAG vs fine-tune call.",
    whenYouNeedIt: "A client asks \"why not just use GPT?\", or quality is inconsistent.",
    tools: ["Eval harnesses", "LLM-as-judge", "Benchmarking"],
  },
  {
    glyph: "◈",
    title: "Adapt",
    whatIDo: "Instruction tuning, full fine-tuning, LoRA/QLoRA/PEFT, DPO, GRPO.",
    whenYouNeedIt: "RAG accuracy plateaus, or the model behaves wrong for the domain.",
    tools: ["LoRA", "QLoRA", "PEFT", "DPO", "GRPO"],
  },
  {
    glyph: "◫",
    title: "Compress",
    whatIDo: "Distillation, quantization, small and edge/on-device models.",
    whenYouNeedIt: "The API bill is too high on a narrow task, latency's too slow, or the model needs to run on-device.",
    tools: ["Distillation", "Quantization"],
  },
  {
    glyph: "◆",
    title: "Deploy",
    whatIDo: "Private and VPC deployment on AWS and Azure, on-prem, vLLM/SGLang serving.",
    whenYouNeedIt: "Data must stay in the client's cloud, region or building.",
    tools: ["AWS", "Azure", "vLLM", "SGLang"],
  },
  {
    glyph: "◈",
    title: "Operate",
    whatIDo: "Eval harnesses, regression suites, tracing, monitoring, retraining.",
    whenYouNeedIt: "A model in production is drifting or regressing.",
    tools: ["Tracing", "Monitoring", "Retraining"],
  },
];

const EXPERIENCE = [
  {
    company: "2SD Technologies",
    role: "Practice Head, Data Science & AI",
    period: "Nov 2025 to present",
    summary:
      "Enterprise AI for clients including ZS Associates and Domino's UK. Grew the practice from 5 to 25+. A sovereign AI programme for India's Army and Navy, air-gapped, no data leaving controlled infrastructure. A tracking platform for half-life-critical medicine that cut failure rates by 30%.",
  },
  {
    company: "100x.inc",
    role: "Founding Engineer & Head of AI",
    period: "Feb 2025 to Nov 2025",
    summary:
      "AI agents Sasha and Selina, past $50K MRR, a team of 12, +25% qualified lead conversion through A/B testing, LLM fine-tuning and retrieval tuning.",
  },
  {
    company: "Home.LLC",
    role: "Head of AI and earlier roles",
    period: "Jan 2021 to Jan 2025",
    summary:
      "AI agent across phone, SMS and email, +20% lead qualification accuracy, 15% lower cloud costs. A home price growth model at 87% accuracy across 100 US markets.",
  },
];

const CHECKLIST_ITEMS = [
  "A client wants their model to run privately, not through OpenAI or Anthropic.",
  "RAG and prompting aren't hitting the accuracy the client needs.",
  "Inference costs or latency have become a real problem.",
  "An enterprise client needs VPC, on-prem or in-country deployment.",
  "You want to offer fine-tuning or private AI without hiring a model team.",
];

const WORK_TOGETHER = [
  {
    title: "Referral",
    body: "You introduce, I contract directly.",
  },
  {
    title: "White-label",
    body: "You own the client, I deliver behind your team under your brand.",
  },
  {
    title: "Capability partner",
    body: "You sell private or custom AI as a service line, I'm your delivery layer.",
  },
];

const TRUST_ITEMS = [
  "Your client, your account. I don't approach your clients directly.",
  "White-label and NDA friendly.",
  "The client owns the data, the eval sets and the model weights.",
  "Full handover: docs, evals and deployment scripts.",
];

const FAQ_ITEMS = [
  {
    question: "Who owns the model and the data?",
    answer: "The client. Data, eval sets and model weights all stay theirs.",
  },
  {
    question: "Can you work under our brand?",
    answer: "Yes. I'm white-label and NDA friendly, and I don't approach your clients directly.",
  },
  {
    question: "What does a client need to have ready?",
    answer: "Data access, a clear task, and success criteria.",
  },
];

const RELEVANT_TAGS = ["Defence", "Real estate"];
const relevantCaseStudies = data.caseStudies.filter((item) => RELEVANT_TAGS.includes(item.tag));

export default function PartnersPage() {
  return (
    <>
      <section className="relative px-6 md:px-12 py-20 md:py-28 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 items-center">
          <div className="flex flex-col gap-8">
            <SectionEyebrow>for software &amp; ai agencies</SectionEyebrow>
            <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-text leading-[1.1]">
              The model layer behind your AI projects.
            </h1>
            <p className="text-text-muted text-base md:text-lg max-w-2xl">
              When prompting and RAG stop being enough, I handle the model work: evals, fine-tuning,
              distillation and private deployment. You keep the client. I work behind your team.
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              <Button variant="primary" href={BOOKING_URL} label="Book a 20-min call" />
              <Button variant="secondary" href="/private-models" label="How I build private models" />
            </div>
          </div>
          <div>
            <LayerDiagram
              layers={LAYERS}
              footnote="You own the relationship and the product. I own the part that needs a model specialist."
            />
          </div>
        </div>
      </section>

      <div className="border-t border-border px-6 md:px-12 py-16 md:py-20 max-w-6xl mx-auto">
        <div
          className={`grid gap-8 md:gap-10 ${
            SHOW_PLAYWRIGHT_STAT ? "grid-cols-2 md:grid-cols-4" : "grid-cols-2 md:grid-cols-3"
          }`}
        >
          <StatCounter value={7} suffix=" yrs" label="shipping production AI" />
          <StatCounter value={25} prefix="5 → " suffix="+" label="AI practice grown at 2SD" />
          <StatCounter value={5} suffix="+" label="products shipped from idea to paying customer" />
          {SHOW_PLAYWRIGHT_STAT && (
            <div className="flex flex-col gap-1">
              <p className="font-mono text-4xl md:text-6xl font-medium text-text-muted">[TBD]</p>
              <p className="text-sm md:text-base text-text-muted max-w-[20ch]">
                accuracy vs. frontier models, Playwright test-generation model
              </p>
            </div>
          )}
        </div>
      </div>

      <Section
        id="experience"
        eyebrow="experience"
        title="7 years designing and shipping production AI for enterprise clients across Europe, the US and India."
      >
        <p className="text-text-muted text-base md:text-lg max-w-2xl mb-10">
          From agentic systems to model fine-tuning and private deployment on AWS and Azure.
        </p>
        <div className="mb-16">
          <BentoGrid
            items={EXPERIENCE.map((role) => ({
              title: role.role,
              body: role.summary,
              note: `${role.company} · ${role.period}`,
            }))}
          />
        </div>
      </Section>

      <CaseStudyGrid items={relevantCaseStudies} tags={RELEVANT_TAGS} />

      <Section
        id="model-expertise"
        eyebrow="model engineering"
        title="What I do when an API model isn't enough."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {CAPABILITIES.map((c) => (
            <CapabilityCard key={c.title} {...c} />
          ))}
        </div>
        <a
          href="/private-models"
          className="inline-block font-mono text-sm uppercase tracking-wider text-accent hover:text-accent-hover"
        >
          Deep dive: how I build private, secure models end to end ▸
        </a>
      </Section>

      <Section id="when-to-bring-me-in" eyebrow="when to bring me in" title="Five signs it's time to call.">
        <AnimatedChecklist items={CHECKLIST_ITEMS} />
      </Section>

      <Section id="work-together" eyebrow="how we can work together" title="Three ways to partner.">
        <div className="mb-10">
          <SegmentReveal
            items={WORK_TOGETHER.map((item) => ({
              title: item.title,
              body: item.note ? `${item.body} ${item.note}` : item.body,
            }))}
          />
        </div>
        <div className="border border-accent/40 bg-accent/[0.04] p-6 flex flex-col gap-2 max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-accent">featured entry offer</p>
          <h3 className="text-lg font-medium text-text">Model feasibility sprint</h3>
          <p className="text-sm text-text-muted">
            A fixed-scope first engagement: baseline evals, a RAG vs fine-tune recommendation, and a cost
            and hardware estimate. Easy to resell to your client.
          </p>
        </div>
      </Section>

      <Section id="working-rhythm" eyebrow="working rhythm" title="How an engagement starts.">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {["Intro call", "Scoping on a live client need", "Sprint", "Build and handover"].map((step, i) => (
            <div key={step} className="flex flex-col gap-2">
              <p className="font-mono text-xs text-accent">0{i + 1}</p>
              <p className="text-sm md:text-base text-text">{step}</p>
            </div>
          ))}
        </div>
        <TimezoneOverlap />
      </Section>

      <Section id="trust" eyebrow="trust and terms" title="How this works, in practice.">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {TRUST_ITEMS.map((item) => (
            <div key={item} className="border border-border p-5 flex items-start gap-3">
              <span className="text-accent font-mono text-sm mt-0.5">✓</span>
              <p className="text-sm md:text-base text-text-muted">{item}</p>
            </div>
          ))}
        </div>
      </Section>

      {SHOW_TESTIMONIALS && (
        <Section id="social-proof" eyebrow="social proof" title="What agencies say.">
          {/* TODO: Dev to supply testimonial quotes and confirm logo permissions (plan Section 13, item 6). */}
          <div className="border border-border p-6 max-w-xl">
            <p className="text-sm text-text-muted">[Testimonials and permitted logos, Dev to supply]</p>
          </div>
        </Section>
      )}

      <Section id="faq" eyebrow="faq" title="Common questions.">
        <FAQAccordion items={FAQ_ITEMS} jsonLd />
      </Section>

      <section id="contact" className="px-6 md:px-12 py-16 md:py-24 max-w-6xl mx-auto border-t border-border flex flex-col gap-6">
        <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-text max-w-3xl">
          Got a client need that&apos;s outgrown prompting?
        </h2>
        <div className="flex flex-wrap gap-6 items-center mt-2">
          <Button variant="primary" href={BOOKING_URL} label="Book a 20-min call" />
          <a
            href="mailto:devseth34@gmail.com"
            className="font-mono text-sm uppercase tracking-wider text-accent hover:text-accent-hover"
          >
            devseth34@gmail.com
          </a>
        </div>
      </section>
    </>
  );
}
