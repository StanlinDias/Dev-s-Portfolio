"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type Answer = "a" | "b";
type Recommendation = "RAG" | "Fine-tune" | "Both";

const QUESTIONS: { prompt: string; a: string; b: string }[] = [
  {
    prompt: "Is the problem mostly missing knowledge, or wrong behaviour, format or tone?",
    a: "Missing knowledge",
    b: "Wrong behaviour, format or tone",
  },
  {
    prompt: "Does the underlying information change often?",
    a: "Yes, it changes often",
    b: "No, it's fairly stable",
  },
  {
    prompt: "Are cost, latency or privacy hard constraints?",
    a: "Yes, one or more is a hard constraint",
    b: "No, there's flexibility there",
  },
];

// TODO: Dev to review and approve this decision logic (plan Section 13, item 4).
// Current logic: missing-knowledge + frequently-changing info leans RAG;
// wrong-behaviour + stable info leans fine-tune; hard cost/latency/privacy
// constraints push toward fine-tuning (a private, smaller, tuned model),
// and a mixed signal across the first two answers recommends both.
function computeRecommendation(answers: Answer[]): { result: Recommendation; reason: string } {
  const [knowledge, changes, constraints] = answers;

  if (knowledge === "a" && changes === "a") {
    return {
      result: "RAG",
      reason:
        "Missing knowledge that changes often is what retrieval is built for. Fine-tuning would go stale fast.",
    };
  }

  if (knowledge === "b" && constraints === "a") {
    return {
      result: "Fine-tune",
      reason:
        "A behaviour or format problem, plus a hard constraint on cost, latency or privacy, points to a smaller tuned model you control end to end.",
    };
  }

  if (knowledge === "b") {
    return {
      result: "Fine-tune",
      reason:
        "This reads as a behaviour, format or tone problem. That's what fine-tuning corrects; more retrieval won't fix it.",
    };
  }

  return {
    result: "Both",
    reason:
      "Stable knowledge plus a behaviour concern usually means retrieval for the facts and fine-tuning for how the model uses them.",
  };
}

export default function DecisionHelper() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const isDone = step >= QUESTIONS.length;

  function handleAnswer(answer: Answer) {
    setAnswers((prev) => [...prev, answer]);
    setStep((s) => s + 1);
  }

  function reset() {
    setStep(0);
    setAnswers([]);
  }

  const recommendation = isDone ? computeRecommendation(answers) : null;

  return (
    <div className="border border-border p-6 md:p-8 min-h-[220px] flex flex-col justify-center">
      <AnimatePresence mode="wait">
        {!isDone ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex flex-col gap-4"
          >
            <p className="font-mono text-xs uppercase tracking-wider text-text-muted">
              question {step + 1} of {QUESTIONS.length}
            </p>
            <p className="text-lg md:text-xl text-text max-w-lg">{QUESTIONS[step].prompt}</p>
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <button
                onClick={() => handleAnswer("a")}
                className="border border-border px-5 py-3 text-sm text-text hover:border-accent hover:text-accent transition-colors text-left"
              >
                {QUESTIONS[step].a}
              </button>
              <button
                onClick={() => handleAnswer("b")}
                className="border border-border px-5 py-3 text-sm text-text hover:border-accent hover:text-accent transition-colors text-left"
              >
                {QUESTIONS[step].b}
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex flex-col gap-4"
          >
            <p className="font-mono text-xs uppercase tracking-wider text-accent">recommendation</p>
            <h3 className="text-3xl md:text-4xl font-medium text-text">{recommendation!.result}</h3>
            <p className="text-sm md:text-base text-text-muted max-w-lg">{recommendation!.reason}</p>
            <div className="flex flex-wrap gap-4 mt-2">
              <a
                href="#contact"
                className="font-mono text-xs uppercase tracking-wider text-accent hover:text-accent-hover"
              >
                Talk it through ▸
              </a>
              <button
                onClick={reset}
                className="font-mono text-xs uppercase tracking-wider text-text-muted hover:text-text"
              >
                Start over
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
