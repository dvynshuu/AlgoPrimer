import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/dsa/two-pointers",
        destination: "/dsa/arrays/two-pointers",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
