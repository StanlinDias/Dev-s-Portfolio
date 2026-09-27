"use client";

import { useMemo, useState } from "react";

type Hardware = "edge" | "single-gpu" | "multi-gpu";
type Latency = "real-time" | "batch";
type Sensitivity = "standard" | "regulated" | "classified";

const HARDWARE_OPTIONS: { value: Hardware; label: string }[] = [
  { value: "edge", label: "Edge / CPU" },
  { value: "single-gpu", label: "Single GPU" },
  { value: "multi-gpu", label: "Multi-GPU" },
];
const LATENCY_OPTIONS: { value: Latency; label: string }[] = [
  { value: "real-time", label: "Real-time" },
  { value: "batch", label: "Batch" },
];
const SENSITIVITY_OPTIONS: { value: Sensitivity; label: string }[] = [
  { value: "standard", label: "Standard" },
  { value: "regulated", label: "Regulated" },
  { value: "classified", label: "Classified" },
];

// TODO: Dev to confirm these mapping rules (plan Section 6.2, step 03 / Section 13, item 4).
// Placeholder heuristic: hardware sets the size ceiling; classified data always
// pushes toward the smallest, most compressible option; real-time latency on
// constrained hardware favours a distilled/quantized model over a larger one.
function computeSpec(hardware: Hardware, latency: Latency, sensitivity: Sensitivity) {
  if (sensitivity === "classified" || hardware === "edge") {
    return {
      size: "Small (1B to 3B params)",
      method: "Distilled and quantized, LoRA fine-tune",
    };
  }
  if (hardware === "single-gpu") {
    return {
      size: "Medium (7B to 14B params)",
      method: latency === "real-time" ? "QLoRA fine-tune, quantized for serving" : "QLoRA fine-tune",
    };
  }
  return {
    size: "Large (30B+ params)",
    method: "Full fine-tune or LoRA, served on vLLM/SGLang",
  };
}

export default function SpecPicker() {
  const [hardware, setHardware] = useState<Hardware>("single-gpu");
  const [latency, setLatency] = useState<Latency>("real-time");
  const [sensitivity, setSensitivity] = useState<Sensitivity>("standard");

  const spec = useMemo(() => computeSpec(hardware, latency, sensitivity), [hardware, latency, sensitivity]);

  function SegmentedControl<T extends string>({
    label,
    options,
    value,
    onChange,
  }: {
    label: string;
    options: { value: T; label: string }[];
    value: T;
    onChange: (v: T) => void;
  }) {
    return (
      <div className="flex flex-col gap-2">
        <p className="font-mono text-[10px] uppercase tracking-wider text-text-muted">{label}</p>
        <div className="flex flex-wrap gap-2">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onChange(opt.value)}
              className={`font-mono text-xs uppercase tracking-wider px-3 py-1.5 border transition-colors ${
                value === opt.value
                  ? "border-accent text-accent"
                  : "border-border text-text-muted hover:text-text"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="border border-border p-6 flex flex-col gap-6">
      <SegmentedControl label="Hardware" options={HARDWARE_OPTIONS} value={hardware} onChange={setHardware} />
      <SegmentedControl label="Latency" options={LATENCY_OPTIONS} value={latency} onChange={setLatency} />
      <SegmentedControl
        label="Data sensitivity"
        options={SENSITIVITY_OPTIONS}
        value={sensitivity}
        onChange={setSensitivity}
      />

      <div className="border-t border-border pt-6 flex flex-col gap-1">
        <p className="font-mono text-[10px] uppercase tracking-wider text-accent">starting point, not a quote</p>
        <p className="text-text font-medium">{spec.size}</p>
        <p className="text-sm text-text-muted">{spec.method}</p>
      </div>
    </div>
  );
}
