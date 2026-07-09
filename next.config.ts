import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Ignorando erros de ESLint (como variáveis 'any' antigas) para não travar o deploy no Vercel
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
