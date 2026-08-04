import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Las fotos subidas desde el CMS se sirven vía /api/media (mismo origen),
     ya que la tienda de Vercel Blob de este proyecto es de tipo "private".
     Unsplash se usa solo para el catálogo de tipos de inmueble. */
  images: {
    // Next.js 16 exige declarar explícitamente qué paths locales puede
    // optimizar next/image. Al declarar localPatterns, TODOS los paths
    // locales (estáticos de /public y /api/media?pathname=...) deben
    // quedar cubiertos, por eso el comodín abarca ambos casos.
    localPatterns: [
      {
        pathname: "/**",
      },
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
