import { ImageResponse } from "next/og";
import { caseStudies, getCaseStudy } from "@/content/case-studies";

export const alt = "Dev Seth case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

// Colours mirror styles/tokens.css.
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const study = getCaseStudy((await params).slug)!;
  const fact = study.facts[0];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#ebebeb",
          color: "#101010",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              border: "2px solid #ff4d17",
              color: "#ff4d17",
              padding: "8px 18px",
              fontSize: 24,
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            {study.industry}
          </div>
          <div style={{ display: "flex", fontSize: 24, letterSpacing: 4, textTransform: "uppercase", color: "#646464" }}>
            Dev Seth · case study
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 64, lineHeight: 1.1, letterSpacing: -1, maxWidth: 1000 }}>
          {study.title}
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 56, color: "#ff4d17" }}>{fact.value}</div>
          <div style={{ display: "flex", fontSize: 28, color: "#646464" }}>{fact.label}</div>
        </div>
      </div>
    ),
    size
  );
}
