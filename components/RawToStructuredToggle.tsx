"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

// Fictional example data only, for illustration.
const RAW_TEXT = `From: sarah.k@example-mail.com
To: support@example-co.com
Subject: Order #48213 arrived damaged

Hi, my order arrived with a cracked screen. Can I get
a replacement? My number is 555-0142 if easier to call.

Thanks,
Sarah Kim
Account: skim_1984`;

const STRUCTURED_FIELDS: { key: string; value: string }[] = [
  { key: "intent", value: "damaged_item_replacement" },
  { key: "order_id", value: "48213" },
  { key: "customer_name", value: "Sarah Kim" },
  { key: "contact_email", value: "[REDACTED]" },
  { key: "contact_phone", value: "[REDACTED]" },
  { key: "account_id", value: "[REDACTED]" },
];

export default function RawToStructuredToggle() {
  const [structured, setStructured] = useState(false);

  return (
    <div className="border border-border p-6 flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
          {structured ? "structured training example" : "raw source record"}
        </p>
        <button
          onClick={() => setStructured((s) => !s)}
          className="font-mono text-xs uppercase tracking-wider text-accent hover:text-accent-hover border border-border px-3 py-1.5"
        >
          {structured ? "show raw" : "structure it"}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {!structured ? (
          <motion.pre
            key="raw"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-xs md:text-sm text-text-muted whitespace-pre-wrap font-mono leading-relaxed"
          >
            {RAW_TEXT}
          </motion.pre>
        ) : (
          <motion.div
            key="structured"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-1 font-mono text-xs md:text-sm"
          >
            <span className="text-text-muted">{"{"}</span>
            {STRUCTURED_FIELDS.map((field, i) => (
              <motion.div
                key={field.key}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: i * 0.08 }}
                className="pl-4"
              >
                <span className="text-accent">&quot;{field.key}&quot;</span>
                <span className="text-text-muted">: </span>
                <span className={field.value === "[REDACTED]" ? "text-text-muted italic" : "text-text"}>
                  &quot;{field.value}&quot;
                </span>
                {i < STRUCTURED_FIELDS.length - 1 && <span className="text-text-muted">,</span>}
              </motion.div>
            ))}
            <span className="text-text-muted">{"}"}</span>
          </motion.div>
        )}
      </AnimatePresence>
      <p className="text-xs text-text-muted">Fictional example, for illustration only.</p>
    </div>
  );
}
