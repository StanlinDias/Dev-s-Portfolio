"use client";

import { motion } from "framer-motion";

type AnimatedChecklistProps = {
  items: string[];
};

export default function AnimatedChecklist({ items }: AnimatedChecklistProps) {
  return (
    <ul className="flex flex-col gap-4 max-w-2xl">
      {items.map((item, i) => (
        <motion.li
          key={item}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.35, ease: "easeOut", delay: i * 0.08 }}
          className="flex items-start gap-3"
        >
          <span className="text-accent font-mono text-sm mt-0.5">✓</span>
          <span className="text-text text-base md:text-lg">{item}</span>
        </motion.li>
      ))}
    </ul>
  );
}
