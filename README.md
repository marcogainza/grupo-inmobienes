# Grupo Inmobienes — sitio + CMS

Sitio público (Next.js + Tailwind) con panel de administración a medida para
que el cliente gestione entregas, testimonios, blog y las cifras del
dashboard público, sin tocar código.

Para desplegarlo en tu propia cuenta de Vercel desde cero (GitHub, Vercel
Postgres, Vercel Blob, variables de entorno, etc.), sigue la guía paso a
paso: **[GUIA_DESPLIEGUE.md](./GUIA_DESPLIEGUE.md)**.

## Desarrollo local

Requiere una base de datos PostgreSQL accesible (puede ser la misma Vercel
Postgres de producción, o una instancia local/de pruebas).

```bash
npm install
cp .env.example .env.local   # completa DATABASE_URL, DIRECT_URL, AUTH_SECRET, etc.
npm run db:push              # crea las tablas
npm run db:seed              # usuario admin + datos de ejemplo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) para el sitio público y
[http://localhost:3000/admin](http://localhost:3000/admin) para el panel de
administración (usuario/clave definidos por `ADMIN_USERNAME`/`ADMIN_PASSWORD`
al momento del seed).

## Estructura

- `app/` — páginas públicas (`/`, `/dashboard`, `/blog`) y panel `app/admin`.
- `components/` — componentes de UI, organizados por sección (`home/`,
  `dashboard/`, `admin/`).
- `prisma/schema.prisma` — modelo de datos.
- `lib/` — Prisma client, autenticación de sesión, subida de imágenes a
  Vercel Blob.
