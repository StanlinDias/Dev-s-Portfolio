import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  variant?: "primary" | "secondary";
  href: string;
  label: ReactNode;
};

export default function Button({ variant = "primary", href, label }: ButtonProps) {
  const isExternal = href.startsWith("http");

  const base =
    "inline-flex items-center gap-2 px-6 py-3 text-sm tracking-wide transition-colors duration-200 border";
  const styles =
    variant === "primary"
      ? "bg-accent border-accent text-bg hover:bg-accent-hover hover:border-accent-hover"
      : "bg-transparent border-border text-text hover:border-accent hover:text-accent";

  return (
    <Link
      href={href}
      className={`${base} ${styles}`}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
    >
      {label}
    </Link>
  );
}
