import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession, clearSessionCookie } from "@/lib/session";

const LINKS = [
  { href: "/admin", label: "Resumen" },
  { href: "/admin/entregas", label: "Entregas recientes" },
  { href: "/admin/testimonios", label: "Testimonios" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/clientes", label: "Clientes afiliados" },
  { href: "/admin/dashboard-data", label: "Cifras del dashboard" },
];

async function logoutAction() {
  "use server";
  await clearSessionCookie();
  redirect("/admin/login");
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row">
        <aside className="lg:w-64 lg:shrink-0">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <Image
              src="/logo-inmo-azul.png"
              alt="Grupo Inmobienes"
              width={140}
              height={30}
              className="h-7 w-auto px-2"
            />
            <p className="mt-2 px-2 text-xs text-slate-400">
              Sesión: {session.username}
            </p>
            <nav className="mt-4 flex flex-row gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
              {LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <form action={logoutAction} className="mt-4 px-2">
              <button
                type="submit"
                className="text-xs font-medium text-slate-400 hover:text-red-600"
              >
                Cerrar sesión
              </button>
            </form>
            <Link
              href="/"
              target="_blank"
              className="mt-2 block px-2 text-xs font-medium text-blue-accent hover:underline"
            >
              Ver sitio público ↗
            </Link>
          </div>
        </aside>

        <main className="flex-1 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          {children}
        </main>
      </div>
    </div>
  );
}
