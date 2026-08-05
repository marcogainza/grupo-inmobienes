import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/db";
import StatCard from "@/components/dashboard/StatCard";
import ClientesAfiliadosChart from "@/components/dashboard/ClientesAfiliadosChart";
import EntregasMensualesChart from "@/components/dashboard/EntregasMensualesChart";
import ClientesPorCiudadChart from "@/components/dashboard/ClientesPorCiudadChart";
import Reveal from "@/components/motion/Reveal";
import Footer from "@/components/Footer";
import { monthLabel } from "@/lib/dates";

export const metadata = {
  title: "Transparencia y Crecimiento en Tiempo Real",
  description:
    "Cifras reales de Grupo Inmobienes: familias adjudicadas, entregas mensuales y clientes afiliados por ciudad, actualizadas en tiempo real.",
};

export const dynamic = "force-dynamic";

const dateFmt = new Intl.DateTimeFormat("es-EC", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default async function DashboardPage() {
  const [stat, affiliations, deliveries, cityStats, entregas, clientes] =
    await Promise.all([
      prisma.dashboardStat.upsert({
        where: { id: "main" },
        update: {},
        create: { id: "main" },
      }),
      prisma.monthlyAffiliation.findMany({ orderBy: { order: "asc" } }),
      prisma.monthlyDelivery.findMany({ orderBy: { order: "asc" } }),
      prisma.cityStat.findMany({ orderBy: { order: "asc" } }),
      prisma.entrega.findMany({ orderBy: { deliveredAt: "desc" }, take: 3 }),
      prisma.clienteAfiliado.findMany({
        orderBy: { joinedAt: "desc" },
        take: 6,
      }),
    ]);

  const affiliationData = affiliations.map((a) => ({
    label: monthLabel(a.month),
    count: a.count,
  }));
  const deliveryData = deliveries.map((d) => ({
    label: monthLabel(d.month),
    count: d.count,
  }));
  const cityData = cityStats.map((c) => ({ city: c.city, count: c.count }));
  const ultimoCliente = clientes[0] ?? null;

  return (
    <div className="min-h-full bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-10 text-center sm:px-6">
          <Link
            href="/"
            className="text-sm font-medium text-blue-accent hover:underline"
          >
            ← Volver al inicio
          </Link>
          <Image
            src="/logo-inmo-azul.png"
            alt="Grupo Inmobienes"
            width={140}
            height={30}
            className="mx-auto mt-6 h-8 w-auto"
          />
          <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-blue-accent">
            Transparencia total
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            Nuestro Crecimiento en Tiempo Real
          </h1>
          <p className="mx-auto mt-2 max-w-2xl text-slate-600">
            Datos actualizados de nuestra operación. Porque en Grupo
            Inmobienes, la confianza se construye con transparencia.
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            En vivo
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Reveal>
            <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Último cliente
              </p>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/15 text-sm font-bold text-navy transition-transform duration-300 group-hover:scale-110">
                  {ultimoCliente ? initials(ultimoCliente.name) : "—"}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {ultimoCliente
                      ? `${ultimoCliente.name} — ${ultimoCliente.city}`
                      : "Sin datos"}
                  </p>
                  <p className="flex items-center gap-1 text-xs text-blue-accent">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
                    Reciente
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <StatCard
              label="Nuevos clientes este mes"
              value={stat.newClientsThisMonth}
              hint={`↑ +${stat.newClientsGrowthPct}% vs mes anterior`}
            />
          </Reveal>
          <Reveal delay={0.1}>
            <StatCard
              label="Bienes entregados"
              value={stat.bienesEntregados}
              hint="↑ Actualizando en tiempo real"
              icon="📦"
            />
          </Reveal>
          <Reveal delay={0.15}>
            <StatCard
              label="Asambleas ejecutadas"
              value={stat.asambleasEjecutadas}
              hint="Grupos de adjudicación completados"
              icon="🔄"
            />
          </Reveal>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">
                Nuevos clientes
              </p>
              <div className="mt-4 space-y-3">
                {clientes.length === 0 && (
                  <p className="text-sm text-slate-400">Sin datos aún.</p>
                )}
                {clientes.map((c) => (
                  <div
                    key={c.id}
                    className="rounded-xl bg-slate-50 p-3 transition-colors duration-300 hover:bg-gold/5"
                  >
                    <p className="text-sm text-slate-700">
                      {c.name} de {c.city} se unió al {c.plan}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      {dateFmt.format(c.joinedAt)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">
                Entregas recientes
              </p>
              <div className="mt-4 space-y-3">
                {entregas.length === 0 && (
                  <p className="text-sm text-slate-400">Sin datos aún.</p>
                )}
                {entregas.map((e) => (
                  <div
                    key={e.id}
                    className="rounded-xl bg-slate-50 p-3 transition-colors duration-300 hover:bg-gold/5"
                  >
                    <p className="text-sm text-slate-700">
                      {e.clientName} recibió su{" "}
                      {e.propertyType.toLowerCase()}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      {dateFmt.format(e.deliveredAt)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">
              Clientes Afiliados — Últimos 12 meses
            </p>
            <div className="mt-4">
              <ClientesAfiliadosChart data={affiliationData} />
            </div>
          </div>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">
                Entregas mensuales
              </p>
              <div className="mt-4">
                <EntregasMensualesChart data={deliveryData} />
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">
                Clientes por ciudad
              </p>
              <div className="mt-4">
                <ClientesPorCiudadChart data={cityData} />
              </div>
            </div>
          </Reveal>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Reveal>
            <StatCard
              label="Inmuebles entregados"
              value={stat.inmueblesEntregados}
              prefix="+"
              hint="familias adjudicadas"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <StatCard
              label="Monto promedio adjudicado"
              value={stat.montoPromedioAdjudicado}
              currency
              hint="por bien inmueble"
            />
          </Reveal>
        </div>
      </main>

      <Footer />
    </div>
  );
}
