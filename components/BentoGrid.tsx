"use client";

import { motion } from "framer-motion";

export type BentoItem = {
  glyph?: string;
  title: string;
  body: string;
  note?: string;
};

type BentoGridProps = {
  items: BentoItem[];
  emphasizeFirst?: boolean;
};

export default function BentoGrid({ items, emphasizeFirst = true }: BentoGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item, i) => {
        const isFeatured = emphasizeFirst && i === 0;
        return (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
            className={`group relative border border-border p-6 flex flex-col gap-4 justify-between overflow-hidden transition-all duration-300 hover:border-accent/40 hover:-translate-y-1 hover:shadow-[0_16px_32px_-16px_rgba(255,77,23,0.3)] ${
              isFeatured ? "sm:col-span-2 lg:col-span-2 lg:row-span-2 min-h-[220px]" : "min-h-[160px]"
            }`}
          >
            <div className={`flex items-start ${item.glyph ? "justify-between" : "justify-end"}`}>
              {item.glyph && (
                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10 text-accent text-lg transition-colors group-hover:bg-accent/20">
                  {item.glyph}
                </span>
              )}
              <span className="font-mono text-xs text-text-muted/60">{String(i + 1).padStart(2, "0")}</span>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className={`font-medium text-text ${isFeatured ? "text-xl md:text-2xl" : "text-base"}`}>
                {item.title}
              </h3>
              <p className={`text-text-muted ${isFeatured ? "text-sm md:text-base" : "text-sm"}`}>{item.body}</p>
              {item.note && <p className="text-xs text-text-muted/70">{item.note}</p>}
            </div>

            <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
          </motion.div>
        );
      })}
    </div>
  );
}
