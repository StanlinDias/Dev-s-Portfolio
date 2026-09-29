import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/phase3-preview"] },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
