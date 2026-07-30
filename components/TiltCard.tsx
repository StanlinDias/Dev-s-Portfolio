"use client";

import { useReducedMotion } from "framer-motion";
import { useRef, useState, type ReactNode, type MouseEvent } from "react";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
};

export default function TiltCard({ children, className = "", maxTilt = 12 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, scale: 1 });

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (reduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: -py * maxTilt * 2, ry: px * maxTilt * 2, scale: 1.03 });
  }

  function handleMouseLeave() {
    setTilt({ rx: 0, ry: 0, scale: 1 });
  }

  return (
    <div style={{ perspective: 1200 }} className={className}>
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(${tilt.scale})`,
          transition: "transform 200ms ease-out",
        }}
        className="will-change-transform"
      >
        {children}
      </div>
    </div>
  );
}
