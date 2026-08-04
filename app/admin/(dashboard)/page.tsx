import Link from "next/link";
import { prisma } from "@/lib/db";
import ChangePasswordForm from "@/components/admin/ChangePasswordForm";

export default async function AdminOverviewPage() {
  const [entregas, testimonios, posts] = await Promise.all([
    prisma.entrega.count(),
    prisma.testimonio.count(),
    prisma.blogPost.count(),
  ]);

  const cards = [
    {
      href: "/admin/entregas",
      title: "Entregas recientes",
      value: entregas,
      desc: "Fotos y datos de clientes que recibieron su bien.",
    },
    {
      href: "/admin/testimonios",
      title: "Testimonios",
      value: testimonios,
      desc: "Familias que ya tienen su hogar.",
    },
    {
      href: "/admin/blog",
      title: "Blog",
      value: posts,
      desc: "Noticias publicadas en el sitio.",
    },
    {
      href: "/admin/dashboard-data",
      title: "Cifras del dashboard",
      value: "—",
      desc: "Contadores, gráficas y último cliente afiliado.",
    },
  ];

  return (
    <div>
      <h1 className="text-xl font-bold text-slate-900">Resumen</h1>
      <p className="mt-1 text-sm text-slate-500">
        Bienvenido al panel de administración de Grupo Inmobienes.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="rounded-xl border border-slate-200 p-5 transition hover:border-emerald-300 hover:bg-emerald-50/40"
          >
            <p className="text-2xl font-bold text-slate-900">{c.value}</p>
            <p className="mt-1 text-sm font-semibold text-slate-700">
              {c.title}
            </p>
            <p className="mt-1 text-xs text-slate-500">{c.desc}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 border-t border-slate-200 pt-6">
        <h2 className="text-sm font-semibold text-slate-900">
          Cambiar contraseña
        </h2>
        <ChangePasswordForm />
      </div>
    </div>
  );
}
