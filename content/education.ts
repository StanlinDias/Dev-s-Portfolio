export const education: {
  degree: { name: string; school: string; note: string };
  publications: { title: string; note: string }[];
  certifications: { name: string; issuer: string; year: number | null; url: string | null }[];
} = {
  degree: {
    name: "B.Sc. Economics (Honors)",
    school: "Symbiosis School of Economics, Pune",
    note: "Thesis: Automation, AI and its Impact on the Future of Work",
  },
  publications: [
    {
      title: "E-Commerce Adoption by Service MSMEs",
      note: "Recognised at the 3rd National Conference on Sustainable Agricultural Development for Food Security and Nutrition",
    },
  ],
  certifications: [
    { name: "Applied Statistics", issuer: "Google", year: null, url: null },
    // Add more here. Year and link render only when present.
  ],
};
