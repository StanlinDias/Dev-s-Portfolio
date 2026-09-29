import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
  },
  async headers() {
    return [
      {
        // Build stamp: must always reflect the deployment actually serving the request.
        source: "/version.json",
        headers: [{ key: "Cache-Control", value: "no-store" }],
      },
    ];
  },
  async redirects() {
    return [
      // /partners is retired; the page source stays in the repo, unlinked.
      { source: "/partners", destination: "/#contact", permanent: true },
    ];
  },
};

export default nextConfig;
