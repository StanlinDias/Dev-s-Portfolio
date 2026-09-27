"use client";

import { useId, useState } from "react";

// Short, standard definitions for terms this site references. Extend as
// new terms come up; keep each one to one plain-English sentence.
export const GLOSSARY: Record<string, string> = {
  RAG: "Retrieval-augmented generation: the model looks up relevant documents at answer time instead of relying only on what it learned during training.",
  LoRA: "Low-Rank Adaptation: a fine-tuning method that trains a small set of extra weights instead of the whole model, making it cheap and fast to adapt.",
  QLoRA: "LoRA fine-tuning on a quantized (compressed) base model, so adaptation fits on much smaller hardware.",
  PEFT: "Parameter-efficient fine-tuning: a family of methods (including LoRA and QLoRA) that adapt a model by training only a small fraction of its weights.",
  DPO: "Direct Preference Optimization: a fine-tuning method that trains a model directly on pairs of preferred vs. rejected responses, without a separate reward model.",
  GRPO: "Group Relative Policy Optimization: a reinforcement-learning fine-tuning method that scores a group of candidate responses against each other to improve the model.",
  distillation: "Training a smaller model to mimic a larger one's outputs, so it runs faster and cheaper while keeping most of its quality on the target task.",
  quantization: "Reducing the numerical precision of a model's weights so it uses less memory and runs faster, usually with a small accuracy trade-off.",
  vLLM: "An open-source, high-throughput inference engine for serving LLMs, commonly used for private and self-hosted deployment.",
  SGLang: "An inference and serving framework for LLMs, optimised for high-throughput structured generation.",
};

type GlossaryTermProps = {
  term: keyof typeof GLOSSARY | string;
  children?: string;
};

export default function GlossaryTerm({ term, children }: GlossaryTermProps) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const definition = GLOSSARY[term];
  const label = children ?? term;

  if (!definition) return <>{label}</>;

  return (
    <span className="relative inline-block">
      <button
        type="button"
        aria-describedby={open ? id : undefined}
        onClick={() => setOpen(true)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onKeyDown={(e) => {
          if (e.key === "Escape") setOpen(false);
        }}
        className="underline decoration-dotted decoration-text-muted underline-offset-2 text-text hover:text-accent transition-colors cursor-help"
      >
        {label}
      </button>
      {open && (
        <span
          id={id}
          role="tooltip"
          className="absolute z-20 bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-3 border border-border bg-bg text-xs text-text-muted shadow-lg"
        >
          {definition}
        </span>
      )}
    </span>
  );
}
