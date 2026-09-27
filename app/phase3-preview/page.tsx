import type { Metadata } from "next";
import SectionEyebrow from "@/components/SectionEyebrow";
import CapabilityCard from "@/components/CapabilityCard";
import LayerDiagram from "@/components/LayerDiagram";
import ProcessStepper, { type ProcessStep } from "@/components/ProcessStepper";
import TopologySwitcher from "@/components/TopologySwitcher";
import TimezoneOverlap from "@/components/TimezoneOverlap";
import GlossaryTerm from "@/components/GlossaryTerm";
import FAQAccordion from "@/components/FAQAccordion";
import DecisionHelper from "@/components/DecisionHelper";
import EvalChart from "@/components/EvalChart";
import StickyCTA from "@/components/StickyCTA";

// Internal, unlinked verification page for the Phase 3 shared components.
// Not part of the site's nav or sitemap.
export const metadata: Metadata = {
  title: "Phase 3 component preview",
  robots: { index: false, follow: false },
};

const CAPABILITIES = [
  {
    glyph: "◇",
    title: "Decide",
    whatIDo: "Eval design, benchmarks, quality and cost baselines, RAG vs fine-tune call.",
    whenYouNeedIt: "Client asks \"why not just use GPT?\", or quality is inconsistent.",
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
    whenYouNeedIt: "API bill too high on a narrow task, latency too slow, or the model needs to run on-device.",
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
    whenYouNeedIt: "Model in production drifting or regressing.",
    tools: ["Tracing", "Monitoring", "Retraining"],
  },
];

const LAYERS = [
  { title: "Client", owns: "Relationship, budget, requirements." },
  { title: "Your agency", owns: "Account, product, app layer: agents, RAG, UI, integrations." },
  { title: "Model layer, me", owns: "Evals, training data, fine-tuning, compression, private serving." },
];

const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Define the outcome",
    whatIDo:
      "Agree what \"good\" means for the task, build an eval set from real examples, measure the current approach and a frontier API as baselines.",
    whatYouGet: "Written success criteria, eval set, baseline scores.",
  },
  {
    number: "02",
    title: "Structure the data",
    whatIDo:
      "Audit sources, clean and dedupe, handle PII, and shape the data into training and eval examples built around the outcome, not just what's available.",
    whatYouGet: "Training and eval datasets, data card, PII handling notes.",
  },
  {
    number: "03",
    title: "Choose the model specs",
    whatIDo:
      "Pick the base model family, size, context length and licence against the hardware target, latency budget and data sensitivity; choose the tuning method.",
    whatYouGet: "Model spec sheet with trade-offs and hardware estimate.",
    tools: ["LoRA", "QLoRA", "DPO", "GRPO"],
  },
  {
    number: "04",
    title: "Fine-tune and iterate",
    whatIDo:
      "Train, evaluate, read the failures, fix the data, repeat. Automated evals plus LLM-as-judge and human review, every run tracked.",
    whatYouGet: "Model checkpoints, eval reports per iteration, experiment log.",
    tools: ["PyTorch", "Unsloth", "MLflow"],
  },
  {
    number: "05",
    title: "Compress and harden",
    whatIDo: "Distill and quantize to fit the target hardware, test for regressions, add guardrails.",
    whatYouGet: "Optimised model, regression suite, guardrail config.",
  },
  {
    number: "06",
    title: "Deploy privately",
    whatIDo:
      "Package and serve inside the client's environment with access control, audit logging, and vLLM/SGLang for high-throughput serving.",
    whatYouGet: "Deployment scripts (IaC), serving endpoint, runbook.",
    tools: ["Docker", "Kubernetes", "Terraform", "vLLM", "SGLang"],
  },
  {
    number: "07",
    title: "Monitor and improve",
    whatIDo: "Tracing, drift checks and a retraining cadence tied back to the eval set.",
    whatYouGet: "Monitoring dashboard, retraining plan.",
  },
];

const FAQ_ITEMS = [
  { question: "Do you work directly with end clients?", answer: "[Dev's answer]" },
  { question: "How is pricing structured?", answer: "[Dev's answer: fixed sprint, then project or retainer]" },
  {
    question: "What does a client need to have ready?",
    answer: "[Dev's answer] Typically: data access, a clear task, success criteria.",
  },
  { question: "Can you work inside our tools and repos?", answer: "[Dev's answer]" },
];

export default function Phase3Preview() {
  return (
    <div className="flex flex-col gap-24 py-16 max-w-6xl mx-auto px-6 md:px-12">
      <section>
        <SectionEyebrow className="mb-3">component</SectionEyebrow>
        <h2 className="text-2xl font-medium text-text mb-6">CapabilityCard</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CAPABILITIES.map((c) => (
            <CapabilityCard key={c.title} {...c} />
          ))}
        </div>
      </section>

      <section>
        <SectionEyebrow className="mb-3">component</SectionEyebrow>
        <h2 className="text-2xl font-medium text-text mb-6">LayerDiagram</h2>
        <LayerDiagram
          layers={LAYERS}
          footnote="You own the relationship and the product. I own the part that needs a model specialist."
        />
      </section>

      <section>
        <SectionEyebrow className="mb-3">component</SectionEyebrow>
        <h2 className="text-2xl font-medium text-text mb-6">ProcessStepper</h2>
        <ProcessStepper steps={PROCESS_STEPS} />
      </section>

      <section>
        <SectionEyebrow className="mb-3">component</SectionEyebrow>
        <h2 className="text-2xl font-medium text-text mb-6">TopologySwitcher</h2>
        <TopologySwitcher />
      </section>

      <section>
        <SectionEyebrow className="mb-3">component</SectionEyebrow>
        <h2 className="text-2xl font-medium text-text mb-6">TimezoneOverlap</h2>
        <TimezoneOverlap />
      </section>

      <section>
        <SectionEyebrow className="mb-3">component</SectionEyebrow>
        <h2 className="text-2xl font-medium text-text mb-6">GlossaryTerm</h2>
        <p className="text-text-muted max-w-lg">
          I use <GlossaryTerm term="LoRA" /> and <GlossaryTerm term="QLoRA" /> for most fine-tuning work,
          then <GlossaryTerm term="distillation" /> or <GlossaryTerm term="quantization" /> to fit the
          target hardware, and serve with <GlossaryTerm term="vLLM" /> or <GlossaryTerm term="SGLang" />.
        </p>
      </section>

      <section>
        <SectionEyebrow className="mb-3">component</SectionEyebrow>
        <h2 className="text-2xl font-medium text-text mb-6">FAQAccordion</h2>
        <FAQAccordion items={FAQ_ITEMS} />
      </section>

      <section>
        <SectionEyebrow className="mb-3">component</SectionEyebrow>
        <h2 className="text-2xl font-medium text-text mb-6">DecisionHelper</h2>
        <DecisionHelper />
      </section>

      <section>
        <SectionEyebrow className="mb-3">component</SectionEyebrow>
        <h2 className="text-2xl font-medium text-text mb-6">EvalChart</h2>
        <EvalChart
          illustrative
          baseline={62}
          baselineLabel="frontier API baseline"
          points={[
            { iteration: "v0", score: 48 },
            { iteration: "v1", score: 67 },
            { iteration: "v2", score: 79 },
            { iteration: "v3", score: 91 },
          ]}
        />
      </section>

      <section id="preview-footer-sentinel" className="min-h-[40vh] flex items-center justify-center">
        <p className="text-text-muted font-mono text-xs uppercase tracking-wider">
          StickyCTA (mobile only) hides once this section is in view
        </p>
      </section>

      <StickyCTA label="Book a 20-min call" href="#preview-footer-sentinel" hideNearId="preview-footer-sentinel" />
    </div>
  );
}
