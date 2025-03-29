import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["www.apple.com", "http2.mlstatic.com", "http2.mlstatic.com"], // Agrega aquí los dominios permitidos
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Permite cualquier dominio (si lo necesitas)
      },
    ],
  },

};

export default nextConfig;
