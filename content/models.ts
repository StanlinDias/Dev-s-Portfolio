import type { Model } from "./types";

// benchmark: fill in as { metric: "pass rate on held-out tests", scores: [{ label, score, mine? }] },
// including frontier baselines. Leave null to hide the comparison.
export const models: Model[] = [
  {
    name: "Playwright test-generation model",
    badge: "fine-tuned",
    oneLiner: "A small model fine-tuned to write Playwright browser tests.",
    headline: "More accurate at test generation than frontier models in my benchmarks.",
    benchmark: null,
  },
  {
    name: "On-device document model",
    badge: "on-device",
    oneLiner: "Processes documents on a phone, with nothing sent to the cloud.",
    headline: "Private by design: the document never leaves the device.",
    benchmark: null,
  },
  {
    name: "Decision intelligence engine",
    badge: "specialised",
    oneLiner: "A purpose-built model for fast, consistent decisions inside a workflow.",
    headline: "Built for decisions that can't wait on a general-purpose model.",
    benchmark: null,
  },
  {
    name: "Intelligence correlation model",
    badge: "air-gapped",
    oneLiner: "A specialised model that connects the dots across global information.",
    headline: "Runs entirely inside controlled infrastructure.",
    benchmark: null,
    caseStudy: "sovereign-defence-ai",
  },
  {
    name: "US home price forecast model",
    badge: "forecasting",
    oneLiner: "Predicted home price growth across 100 major US markets at 87% accuracy.",
    headline: "Called a 4% rise for 2023 when most expected a fall. Named the most accurate forecast of the year.",
    benchmark: null,
  },
];
