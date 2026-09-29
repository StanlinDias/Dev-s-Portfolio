"use client";

import { motion } from "framer-motion";
import { useState } from "react";

type NodeId = "data" | "training" | "weights" | "inference" | "monitoring";

type ModeConfig = {
  key: string;
  label: string;
  description: string;
  typicalFor: string;
  example: string;
  boundary: { x: number; y: number; w: number; h: number };
  nodes: Record<NodeId, { x: number; y: number }>;
  crossesBoundary: boolean;
};

const NODE_LABELS: Record<NodeId, string> = {
  data: "Data",
  training: "Training",
  weights: "Weights",
  inference: "Inference",
  monitoring: "Monitoring",
};

const MODES: ModeConfig[] = [
  {
    key: "client-vpc",
    label: "Client VPC",
    description: "Deployed inside the client's own cloud account and network, isolated from other tenants.",
    typicalFor: "Typical for mid-size enterprise clients on AWS or Azure.",
    example: "",
    boundary: { x: 20, y: 20, w: 200, h: 160 },
    nodes: {
      data: { x: 60, y: 60 },
      training: { x: 60, y: 140 },
      weights: { x: 140, y: 60 },
      inference: { x: 140, y: 140 },
      monitoring: { x: 265, y: 100 },
    },
    crossesBoundary: true,
  },
  {
    key: "on-prem",
    label: "On-prem",
    description: "Runs entirely on hardware inside the client's own building or data centre.",
    typicalFor: "Typical for regulated or defence clients.",
    example: "Example: a national defence programme (air-gapped).",
    boundary: { x: 20, y: 20, w: 200, h: 160 },
    nodes: {
      data: { x: 60, y: 60 },
      training: { x: 60, y: 140 },
      weights: { x: 140, y: 60 },
      inference: { x: 140, y: 140 },
      monitoring: { x: 265, y: 100 },
    },
    crossesBoundary: true,
  },
  {
    key: "on-device",
    label: "On-device",
    description: "The whole model runs on the device itself. Nothing is sent anywhere.",
    typicalFor: "Typical for mobile or edge use cases.",
    example: "Example: the on-device document processing model.",
    boundary: { x: 50, y: 20, w: 140, h: 150 },
    nodes: {
      data: { x: 90, y: 60 },
      training: { x: 150, y: 60 },
      weights: { x: 90, y: 120 },
      inference: { x: 150, y: 120 },
      monitoring: { x: 120, y: 158 },
    },
    crossesBoundary: false,
  },
  {
    key: "air-gapped",
    label: "Air-gapped",
    description: "No network path in or out at all. Updates and model delivery happen offline, by hand.",
    typicalFor: "Typical for defence and classified environments.",
    example: "Example: the sovereign AI programme.",
    boundary: { x: 20, y: 20, w: 200, h: 160 },
    nodes: {
      data: { x: 60, y: 60 },
      training: { x: 140, y: 60 },
      weights: { x: 60, y: 140 },
      inference: { x: 140, y: 140 },
      monitoring: { x: 190, y: 100 },
    },
    crossesBoundary: false,
  },
];

export default function TopologySwitcher() {
  const [activeIndex, setActiveIndex] = useState(0);
  const mode = MODES[activeIndex];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-2">
        {MODES.map((m, i) => (
          <button
            key={m.key}
            onClick={() => setActiveIndex(i)}
            className={`font-mono text-xs uppercase tracking-wider px-3 py-1.5 border transition-colors ${
              i === activeIndex
                ? "border-accent text-accent"
                : "border-border text-text-muted hover:text-text"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <svg viewBox="0 0 300 200" className="w-full max-w-md mx-auto">
        <motion.rect
          initial={false}
          animate={{ x: mode.boundary.x, y: mode.boundary.y, width: mode.boundary.w, height: mode.boundary.h }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          fill="none"
          stroke="var(--accent)"
          strokeWidth={mode.crossesBoundary ? 1.5 : 2.5}
          strokeDasharray={mode.crossesBoundary ? "6 4" : undefined}
        />

        {mode.crossesBoundary && (
          <motion.line
            initial={false}
            animate={{
              x1: mode.nodes.inference.x,
              y1: mode.nodes.inference.y,
              x2: mode.nodes.monitoring.x,
              y2: mode.nodes.monitoring.y,
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            stroke="var(--text-muted)"
            strokeWidth={1.5}
            strokeDasharray="3 3"
          />
        )}

        {(Object.keys(mode.nodes) as NodeId[]).map((id) => (
          <motion.g
            key={id}
            initial={false}
            animate={{ x: mode.nodes[id].x, y: mode.nodes[id].y }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <circle r={16} fill="var(--bg)" stroke="var(--text)" strokeWidth={1.5} />
            <text
              y={30}
              textAnchor="middle"
              className="fill-current text-text-muted"
              fontSize="9"
              fontFamily="var(--font-mono)"
            >
              {NODE_LABELS[id]}
            </text>
          </motion.g>
        ))}
      </svg>

      <div className="flex flex-col gap-1 text-center max-w-md mx-auto">
        <p className="text-sm md:text-base text-text">{mode.description}</p>
        <p className="text-sm text-text-muted">{mode.typicalFor}</p>
        {mode.example && <p className="text-sm text-text-muted">{mode.example}</p>}
      </div>
    </div>
  );
}
