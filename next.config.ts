import type { NextConfig } from "next";

const SECURITY_HEADERS = [
  // Evita que el sitio (y en particular /admin) se incruste en un iframe
  // de otro origen (protección contra clickjacking).
  { key: "X-Frame-Options", value: "DENY" },
  // El navegador no debe intentar "adivinar" el tipo de contenido.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // No filtrar la URL completa (con posibles querystrings) a otros orígenes.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // El sitio no usa cámara/micrófono/geolocalización/USB: se desactivan.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), usb=()",
  },
  // Fuerza HTTPS en el navegador durante 2 años (Vercel ya sirve por HTTPS).
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  // No anunciar la versión de Next.js en el header de respuesta.
  poweredByHeader: false,
  // Las Server Actions (formularios del CMS que suben fotos) limitan el
  // body a 1MB por defecto. El límite real de la foto es 2MB (ver
  // lib/blob.ts); este valor da margen extra sobre esos 2MB para el resto
  // de campos del formulario (título, contenido del editor, etc.) y el
  // overhead propio de multipart/form-data.
  experimental: {
    serverActions: {
      bodySizeLimit: "3mb",
    },
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: SECURITY_HEADERS,
      },
    ];
  },
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
