export type FlowNode = {
  id: string;
  label: string;
  /** Grid position. Fractional values are allowed to centre a node between two others. */
  col: number;
  row: number;
  kind?: "source" | "model" | "output";
};

export type FlowDiagramSpec = {
  /** Optional labelled boundary enclosing every node. */
  boundary?: string;
  nodes: FlowNode[];
  edges: { from: string; to: string; dashed?: boolean }[];
};

export type CaseStudy = {
  slug: string;
  industry: string;
  status: string;
  title: string;
  summary: string;
  facts: { value: string; label: string }[];
  situation: string;
  hardPart: string;
  built: { title: string; body: string }[];
  diagram: FlowDiagramSpec;
  results: string[];
  stack: string[];
};

export type Model = {
  name: string;
  badge: string;
  oneLiner: string;
  headline: string;
  /** Scores to compare as bars, with Dev's model flagged. null hides the expander. */
  benchmark: { metric: string; scores: { label: string; score: number; mine?: boolean }[] } | null;
  caseStudy?: string;
};
