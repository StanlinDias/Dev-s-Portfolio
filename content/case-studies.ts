import type { CaseStudy } from "./types";

export const caseStudies: CaseStudy[] = [
  {
    slug: "sovereign-defence-ai",
    industry: "Defence",
    status: "In production",
    title: "Sovereign AI for a national defence programme",
    summary:
      "Private, air-gapped AI that connects intelligence from across the globe and predicts whether critical assets are ready for a mission.",
    facts: [
      { value: "Air-gapped", label: "no data leaves controlled infrastructure" },
      { value: "Sovereign", label: "models trained and served in-house" },
      { value: "3 modules", label: "intelligence, readiness and purpose-built models" },
    ],
    situation:
      "Defence organisations can't send sensitive information to commercial AI services. Every model has to be trained and run inside controlled infrastructure, and it still has to be genuinely useful to the people relying on it.",
    hardPart:
      "There is no shortcut. No cloud models, no external APIs, nothing leaving the network. Calling a frontier model isn't an option, so the models themselves have to be built for the job and proven inside the boundary.",
    built: [
      {
        title: "Intelligence surface",
        body: "Gathers information from sources across the globe and connects the dots between them, using a specialised model built for that correlation work.",
      },
      {
        title: "Predictive maintenance and readiness",
        body: "Predicts the reliability and capacity of assets such as aircraft, armoured vehicles and weapon systems for a given mission.",
      },
      {
        title: "Purpose-built private models",
        body: "Smaller specialised models, each serving a specific need, trained and served entirely inside controlled infrastructure.",
      },
    ],
    diagram: {
      boundary: "controlled infrastructure",
      nodes: [
        { id: "sources", label: "Global sources", col: 0, row: 0, kind: "source" },
        { id: "ingest", label: "Ingestion", col: 1, row: 0 },
        { id: "correlate", label: "Correlation model", col: 2, row: 0, kind: "model" },
        { id: "surface", label: "Intelligence surface", col: 3, row: 0, kind: "output" },
        { id: "assets", label: "Asset data", col: 0, row: 1, kind: "source" },
        { id: "readiness", label: "Readiness model", col: 2, row: 1, kind: "model" },
        { id: "mission", label: "Mission readiness", col: 3, row: 1, kind: "output" },
      ],
      edges: [
        { from: "sources", to: "ingest" },
        { from: "ingest", to: "correlate" },
        { from: "correlate", to: "surface" },
        { from: "assets", to: "readiness" },
        { from: "readiness", to: "mission" },
      ],
    },
    results: [
      "Built and deployed to users, running entirely inside controlled infrastructure.",
      "A specialised in-house model for connecting intelligence, replacing any dependence on external AI services.",
    ],
    stack: ["Private fine-tuned models", "On-prem serving", "Air-gapped deployment", "Evaluation harnesses"],
  },
  {
    slug: "life-critical-medicine",
    industry: "Pharma & healthcare",
    status: "Live",
    title: "Getting life-critical medicine to patients in time",
    summary:
      "An end-to-end platform for a UK manufacturer of late-stage cancer injections with a three-day half-life, planning, tracking and flagging risk from production to patient.",
    facts: [
      { value: "30%", label: "fewer delivery failures" },
      { value: "3-day", label: "half-life on every dose" },
      { value: "End to end", label: "from production facility to patient" },
    ],
    situation:
      "The product loses its potency within days. A late shipment isn't a logistics problem, it means a patient misses treatment.",
    hardPart:
      "Planning had to account for decay, demand and transit time all at once, and problems had to be caught before they happened rather than reported after.",
    built: [
      {
        title: "Half-life-aware planning",
        body: "Scheduling for manufacturing and shipments that accounts for decay constraints and demand patterns.",
      },
      {
        title: "AI risk flagging",
        body: "Identifies shipments at risk early, so the team can act before a dose is lost.",
      },
      {
        title: "Real-time monitoring",
        body: "Visibility from the production facility through to patient delivery.",
      },
      {
        title: "End-to-end optimisation",
        body: "Manufacturing planning and shipment logistics optimised as one system rather than separately.",
      },
    ],
    diagram: {
      nodes: [
        { id: "risk", label: "Risk model", col: 1.5, row: 0, kind: "model" },
        { id: "alerts", label: "Alerts", col: 3, row: 0, kind: "output" },
        { id: "production", label: "Production", col: 0, row: 1, kind: "source" },
        { id: "planning", label: "Half-life-aware planning", col: 1, row: 1, kind: "model" },
        { id: "shipment", label: "Shipment", col: 2, row: 1 },
        { id: "patient", label: "Patient", col: 3, row: 1, kind: "output" },
      ],
      edges: [
        { from: "production", to: "planning" },
        { from: "planning", to: "shipment" },
        { from: "shipment", to: "patient" },
        { from: "risk", to: "production", dashed: true },
        { from: "risk", to: "planning", dashed: true },
        { from: "risk", to: "shipment", dashed: true },
        { from: "risk", to: "patient", dashed: true },
        { from: "risk", to: "alerts" },
      ],
    },
    results: ["Cut delivery failure rates by 30%.", "Live tracking across the full journey from facility to patient."],
    stack: ["Forecasting & optimisation", "Risk models", "Real-time data pipelines", "Cloud deployment"],
  },
  {
    slug: "government-voice-intelligence",
    industry: "Government",
    status: "In production",
    title: "Round-the-clock citizen service, with intelligence on every conversation",
    summary:
      "A bilingual voice AI assistant for a government entity in the Middle East that answers citizens 24/7 and shows leadership what people are actually calling about.",
    facts: [
      { value: "24/7", label: "service, up from 12 hours a day" },
      { value: "200+", label: "enquiries handled every day" },
      { value: "Arabic & English", label: "in both languages" },
      { value: "~$52K", label: "saved every month" },
    ],
    situation:
      "Citizen enquiries were handled manually by a 10-person team, and only during a 12-hour window. Leadership had little visibility into what people were calling about.",
    hardPart:
      "It had to handle real conversations in two languages at government-grade reliability, and do more than answer calls: management needed to understand the conversations, not just clear the queue.",
    built: [
      { title: "Bilingual voice agent", body: "Handles enquiries in Arabic and English around the clock." },
      {
        title: "Conversation intelligence",
        body: "Tracks what is being discussed across calls, so it's clear who is talking about what.",
      },
      {
        title: "Management assistant",
        body: "Surfaces those insights to leadership, so decisions are based on what citizens actually raise.",
      },
    ],
    diagram: {
      nodes: [
        { id: "call", label: "Citizen call", col: 0, row: 0, kind: "source" },
        { id: "asr", label: "Speech recognition (AR/EN)", col: 1, row: 0 },
        { id: "agent", label: "Voice agent", col: 2, row: 0, kind: "model" },
        { id: "response", label: "Response", col: 3, row: 0, kind: "output" },
        { id: "intel", label: "Conversation intelligence", col: 2, row: 1, kind: "model" },
        { id: "mgmt", label: "Management assistant", col: 3, row: 1, kind: "output" },
      ],
      edges: [
        { from: "call", to: "asr" },
        { from: "asr", to: "agent" },
        { from: "agent", to: "response" },
        { from: "agent", to: "intel" },
        { from: "intel", to: "mgmt" },
      ],
    },
    results: [
      "Service moved from 12 hours a day to 24/7.",
      "200+ enquiries handled daily, in Arabic and English.",
      "Took over the workload of a 10-person team, saving about $52K a month.",
    ],
    stack: ["Speech-to-text & text-to-speech", "LLM agents", "Conversation analytics"],
  },
  {
    slug: "retail-stock-intelligence",
    industry: "Retail",
    status: "In production",
    title: "Predicting stock-outs before they happen",
    summary:
      "An AI agent for a UK retailer with 22+ stores and 5 warehouses that predicts stock-outs from events and demand signals, and recommends what to move where.",
    facts: [
      { value: "$65K", label: "saved every month" },
      { value: "22+ stores", label: "and 5 warehouses" },
      { value: "Automated", label: "replenishment planning" },
    ],
    situation:
      "Replenishment across stores and warehouses was planned by hand by a 10-person team, and manual errors were expensive.",
    hardPart:
      "Demand moves with events, so planning from averages misses exactly the spikes that cause stock-outs. The system had to see them coming and say what to do about them.",
    built: [
      { title: "Central data pipeline", body: "One view of stock and sales across 22+ stores and 5 warehouses." },
      { title: "Event-aware demand forecasting", body: "Forecasts demand using events and other criteria, not just history." },
      {
        title: "Stock-out prediction and recommendations",
        body: "Flags likely stock-outs ahead of time and recommends what to move where.",
      },
      { title: "Automated replenishment", body: "Replenishment plans generated automatically, removing manual error." },
    ],
    diagram: {
      nodes: [
        { id: "stores", label: "Stores (22+)", col: 0, row: 0, kind: "source" },
        { id: "warehouses", label: "Warehouses (5)", col: 0, row: 1, kind: "source" },
        { id: "pipeline", label: "Central data pipeline", col: 1, row: 0.5 },
        { id: "forecast", label: "Event-aware forecasting", col: 2, row: 0.5, kind: "model" },
        { id: "stockout", label: "Stock-out prediction", col: 3, row: 0.5, kind: "model" },
        { id: "recs", label: "Recommendations: what to move where", col: 4, row: 0.5, kind: "output" },
      ],
      edges: [
        { from: "stores", to: "pipeline" },
        { from: "warehouses", to: "pipeline" },
        { from: "pipeline", to: "forecast" },
        { from: "forecast", to: "stockout" },
        { from: "stockout", to: "recs" },
      ],
    },
    results: [
      "$65K a month in cost reduction.",
      "Replenishment planning automated, replacing manual work by a 10-person team.",
    ],
    stack: ["Demand forecasting", "AI agents", "Data pipelines", "Cloud deployment"],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}

/** The case study after this one, looping back to the first. */
export function getNextCaseStudy(slug: string) {
  const i = caseStudies.findIndex((c) => c.slug === slug);
  return caseStudies[(i + 1) % caseStudies.length];
}
