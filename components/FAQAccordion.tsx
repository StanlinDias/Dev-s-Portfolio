"use client";

import { useState } from "react";

type FAQItem = {
  question: string;
  answer: string;
};

type FAQAccordionProps = {
  items: FAQItem[];
  /** Emits a FAQPage JSON-LD script alongside the accordion for SEO. */
  jsonLd?: boolean;
};

export default function FAQAccordion({ items, jsonLd = false }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col border-t border-border">
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: items.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.answer,
                },
              })),
            }),
          }}
        />
      )}

      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const panelId = `faq-panel-${i}`;
        return (
          <div key={item.question} className="border-b border-border">
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="w-full flex items-center justify-between gap-6 py-5 text-left group"
            >
              <span className="text-base md:text-lg text-text group-hover:text-accent transition-colors">
                {item.question}
              </span>
              <span className="font-mono text-lg text-text-muted shrink-0">
                {isOpen ? "−" : "+"}
              </span>
            </button>

            {/* Answer text is always in the DOM (SSR-visible), collapsed
                with a CSS grid-rows transition, not conditionally mounted. */}
            <div
              id={panelId}
              className="grid transition-[grid-template-rows] duration-300 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="text-sm md:text-base text-text-muted max-w-3xl pb-6">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
