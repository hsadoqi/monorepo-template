import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  transpilePackages: [
    "@repo/ui-components",
    "@repo/ui-theme",
    "@repo/ui-design-system",
    "@repo/ui-panel",
    "@repo/ui-preferenes",
    "@repo/ui-theme",
    "@repo/ui-tailwind-config",
  ],
  serverExternalPackages: [],
  experimental: {
    optimizePackageImports: [
      "@hugeicons/core-free-icons",
      "@hugeicons/react",
      "lucide-react",
      "date-fns",
      "class-variance-authority",
      "cmdk",
      "clsx",
      "react-day-picker",
      "tailwind-merge",
      "zod",
      "zustand",
      "@base-ui/react",
    ],
  },
  allowedDevOrigins: ['127.0.0.1']
}

export default nextConfig
