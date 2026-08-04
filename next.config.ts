import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Las fotos subidas desde el CMS se sirven vía /api/media (mismo origen),
     ya que la tienda de Vercel Blob de este proyecto es de tipo "private".
     Unsplash se usa solo para el catálogo de tipos de inmueble. */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
