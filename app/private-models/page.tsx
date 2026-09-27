import type { Metadata } from "next";
import Button from "@/components/Button";
import SectionEyebrow from "@/components/SectionEyebrow";
import BoundaryVisual from "@/components/BoundaryVisual";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import SectionIndex from "@/components/SectionIndex";
import ProcessStepper, { type ProcessStep } from "@/components/ProcessStepper";
import RawToStructuredToggle from "@/components/RawToStructuredToggle";
import SpecPicker from "@/components/SpecPicker";
import EvalChart from "@/components/EvalChart";
import DecisionHelper from "@/components/DecisionHelper";
import TopologySwitcher from "@/components/TopologySwitcher";
import CaseStudyGrid from "@/components/CaseStudyGrid";
import FAQAccordion from "@/components/FAQAccordion";
import GlossaryTerm from "@/components/GlossaryTerm";
import BentoGrid from "@/components/BentoGrid";
import SegmentReveal from "@/components/SegmentReveal";
import data from "@/content/portfolio-data.json";

export const metadata: Metadata = {
  title: "Dev Seth · Private, secure models and on-prem deployment",
  description:
    "I build specialised models end to end, starting with the data, then deploy them inside the client's own cloud, data centre or air-gapped network.",
};

// TODO: Dev to supply a real booking tool URL (plan Section 13, item 1).
const BOOKING_URL = "mailto:devseth34@gmail.com?subject=20-min%20call";

const CONFIRMED_TOOLS = [
  "PyTorch",
  "Unsloth",
  "Modal",
  "MLflow",
  "Docker",
  "Kubernetes",
  "Terraform",
  "AWS SageMaker",
  "AWS Bedrock",
  "Azure AI",
  "LangGraph",
  "vLLM",
  "SGLang",
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
    extra: <RawToStructuredToggle />,
  },
  {
    number: "03",
    title: "Choose the model specs",
    whatIDo:
      "Pick the base model family, size, context length and licence against the hardware target, latency budget and data sensitivity; choose the tuning method.",
    whatYouGet: "Model spec sheet with trade-offs and hardware estimate.",
    tools: ["LoRA", "QLoRA", "DPO", "GRPO"],
    extra: <SpecPicker />,
  },
  {
    number: "04",
    title: "Fine-tune and iterate",
    whatIDo:
      "Train, evaluate, read the failures, fix the data, repeat. Automated evals plus LLM-as-judge and human review, every run tracked. Worked example: the Playwright test-generation model.",
    whatYouGet: "Model checkpoints, eval reports per iteration, experiment log.",
    tools: ["PyTorch", "Unsloth", "MLflow"],
    extra: (
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
    ),
  },
  {
    number: "05",
    title: "Compress and harden",
    whatIDo:
      "Distill and quantize to fit the target hardware, test for regressions, add guardrails. Worked example: the on-device document processing model.",
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

const WHY_PRIVATE = [
  {
    title: "Control",
    body: "Data, weights and eval sets stay with the client.",
  },
  {
    title: "Cost",
    body: "A smaller tuned model can replace frontier API calls on a narrow task, as with the Playwright test-generation model.",
  },
  {
    title: "Compliance",
    body: "Runs in the client's region or building, which matters for regulated sectors and data residency requirements, a big theme for Australian clients.",
  },
];

// TODO: Dev to confirm each of these controls before publishing (plan Section 6.4).
const SECURITY_CONTROLS = [
  {
    glyph: "◆",
    title: "Data stays put",
    teaser: "Data never leaves the client environment during training or inference.",
  },
  {
    glyph: "◈",
    title: "Role-based access",
    teaser: "Role-based access to data, weights and endpoints.",
  },
  {
    glyph: "◇",
    title: "Audit logging",
    teaser: "Audit logs on every model call.",
  },
  {
    glyph: "◫",
    title: "PII handling",
    teaser: "PII handling and redaction in the data pipeline.",
  },
  {
    glyph: "◆",
    title: "Encrypted storage",
    teaser: "Encrypted storage for datasets and weights.",
  },
  {
    glyph: "◈",
    title: "Air-gapped option",
    teaser: "Offline model delivery, as built for the sovereign AI programme.",
  },
];

const NAMED_PROJECTS = [
  {
    title: "Playwright test-generation model",
    oneLiner: "A small fine-tuned model that generates Playwright browser tests at higher accuracy than frontier models.",
    problem:
      "Writing and maintaining Playwright test suites by hand is slow, and general-purpose frontier models generate tests with flaky selectors and wrong assertions.",
  },
  {
    title: "On-device document processing model",
    oneLiner: "A model that runs on your phone to process documents entirely on-device.",
    problem:
      "Cloud-based document processing sends sensitive documents off-device and needs connectivity; regulated or privacy-conscious clients need it handled locally.",
  },
  {
    title: "Decision intelligence engine",
    oneLiner: "A purpose-built model for fast, reliable decisions embedded directly in a workflow.",
    problem:
      "General-purpose LLM calls are too slow or inconsistent for decisions that need to happen inline in a workflow.",
  },
];

const FAQ_ITEMS = [
  { question: "Who owns the model?", answer: "The client." },
  { question: "How much data do we need?", answer: "[Dev's answer]" },
  { question: "What hardware does the client need?", answer: "[Dev's answer]" },
  { question: "How long does a first version take?", answer: "[Dev's answer]" },
  {
    question: "What if a new version performs worse?",
    answer: "The regression suite blocks it before it ships, and the previous version stays live until it's fixed.",
  },
];

const SECTION_INDEX_ITEMS = [
  { id: "hero", label: "Overview" },
  { id: "process", label: "The process" },
  { id: "why-private", label: "Why private" },
  { id: "security", label: "Security" },
  { id: "decide", label: "Fine-tune or RAG" },
  { id: "deployment", label: "Deployment options" },
  { id: "proof", label: "Proof" },
  { id: "faq", label: "FAQ" },
];

const defenceCaseStudy = data.caseStudies.filter((item) => item.tag === "Defence");

export default function PrivateModelsPage() {
  return (
    <>
      <ReadingProgressBar />

      <section id="hero" className="relative px-6 md:px-12 py-20 md:py-28 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12 items-center">
          <div className="flex flex-col gap-8">
            <SectionEyebrow>private models · on-prem · secure by design</SectionEyebrow>
            <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-text leading-[1.1]">
              Models your clients own, running where their data already lives.
            </h1>
            <p className="text-text-muted text-base md:text-lg max-w-2xl">
              I build specialised models end to end, starting with the data. Structured toward the
              outcome, fine-tuned and tested against it, then deployed inside the client&apos;s own
              cloud, data centre or air-gapped network.
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              <Button variant="primary" href={BOOKING_URL} label="Book a 20-min call" />
              <Button variant="secondary" href="#process" label="See the process ↓" />
            </div>
          </div>
          <BoundaryVisual />
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 md:px-12 flex gap-12 border-t border-border">
        <SectionIndex items={SECTION_INDEX_ITEMS} />

        <div className="flex-1 min-w-0">
          <div id="process" className="py-16 md:py-20">
            <SectionEyebrow className="mb-3">the process</SectionEyebrow>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-text max-w-3xl mb-4">
              Seven steps, from data to a model running in your client&apos;s environment.
            </h2>
            <p className="text-text-muted text-base md:text-lg max-w-2xl mb-10">
              Confirmed tools across these steps: {CONFIRMED_TOOLS.filter((t) => t !== "vLLM" && t !== "SGLang").join(", ")},{" "}
              <GlossaryTerm term="vLLM" /> and <GlossaryTerm term="SGLang" /> for serving.
            </p>
            <ProcessStepper steps={PROCESS_STEPS} />
          </div>

          <div id="why-private" className="py-16 md:py-20 border-t border-border">
            <SectionEyebrow className="mb-3">why private</SectionEyebrow>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-text max-w-3xl mb-10">
              Three reasons it&apos;s worth doing.
            </h2>
            <SegmentReveal items={WHY_PRIVATE} />
          </div>

          <div id="security" className="py-16 md:py-20 border-t border-border">
            <SectionEyebrow className="mb-3">security by design</SectionEyebrow>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-text max-w-3xl mb-10">
              Built to hold up under a security review.
            </h2>
            <BentoGrid
              items={SECURITY_CONTROLS.map((control) => ({
                glyph: control.glyph,
                title: control.title,
                body: control.teaser,
              }))}
            />
          </div>

          <div id="decide" className="py-16 md:py-20 border-t border-border">
            <SectionEyebrow className="mb-3">fine-tune, rag, or both?</SectionEyebrow>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-text max-w-3xl mb-10">
              Not sure which you need? Answer three questions.
            </h2>
            <DecisionHelper />
          </div>

          <div id="deployment" className="py-16 md:py-20 border-t border-border">
            <SectionEyebrow className="mb-3">deployment options</SectionEyebrow>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-text max-w-3xl mb-10">
              Client VPC, on-prem, on-device, or fully air-gapped.
            </h2>
            <TopologySwitcher />
          </div>

          <div id="proof" className="py-16 md:py-20 border-t border-border">
            <SectionEyebrow className="mb-3">proof</SectionEyebrow>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-text max-w-3xl mb-10">
              What this looks like, built.
            </h2>
            <BentoGrid
              emphasizeFirst={false}
              items={NAMED_PROJECTS.map((project) => ({
                title: project.title,
                body: project.oneLiner,
                note: project.problem,
              }))}
            />
          </div>
        </div>
      </div>

      <CaseStudyGrid items={defenceCaseStudy} tags={["Defence"]} />

      <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-20 border-t border-border">
        <div id="faq">
          <SectionEyebrow className="mb-3">faq</SectionEyebrow>
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-text max-w-3xl mb-10">
            Common questions.
          </h2>
          <FAQAccordion items={FAQ_ITEMS} jsonLd />
        </div>
      </div>

      <section id="contact" className="px-6 md:px-12 py-16 md:py-24 max-w-6xl mx-auto border-t border-border flex flex-col gap-6">
        <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-text max-w-3xl">
          Have a use case that can&apos;t leave the building?
        </h2>
        <div className="flex flex-wrap gap-6 items-center mt-2">
          <Button variant="primary" href={BOOKING_URL} label="Book a 20-min call" />
          <a
            href="/partners"
            className="font-mono text-sm uppercase tracking-wider text-text-muted hover:text-accent"
          >
            For agencies ▸
          </a>
        </div>
      </section>
    </>
  );
}
