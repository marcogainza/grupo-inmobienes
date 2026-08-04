import { prisma } from "@/lib/db";
import { monthLabel } from "@/lib/dates";
import {
  saveDashboardStat,
  saveMonthlyAffiliations,
  saveMonthlyDeliveries,
  updateCityStat,
  addCityStat,
  deleteCityStat,
} from "./actions";

function toDateInput(d: Date) {
  return d.toISOString().slice(0, 10);
}

export default async function AdminDashboardDataPage() {
  const [stat, affiliations, deliveries, cityStats] = await Promise.all([
    prisma.dashboardStat.upsert({
      where: { id: "main" },
      update: {},
      create: { id: "main" },
    }),
    prisma.monthlyAffiliation.findMany({ orderBy: { order: "asc" } }),
    prisma.monthlyDelivery.findMany({ orderBy: { order: "asc" } }),
    prisma.cityStat.findMany({ orderBy: { order: "asc" } }),
  ]);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-xl font-bold text-slate-900">
          Cifras del dashboard
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Todo lo que se muestra en /dashboard y en los contadores del
          inicio se edita aquí.
        </p>
      </div>

      {/* Último cliente + contadores principales */}
      <form
        action={saveDashboardStat}
        className="grid gap-4 rounded-xl border border-slate-200 bg-slate-50 p-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <h2 className="text-sm font-semibold text-slate-900 sm:col-span-2 lg:col-span-3">
          Último cliente afiliado
        </h2>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Nombre</span>
          <input
            name="lastClientName"
            defaultValue={stat.lastClientName}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Ciudad</span>
          <input
            name="lastClientCity"
            defaultValue={stat.lastClientCity}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">
            Plan al que se unió
          </span>
          <input
            name="lastClientPlan"
            placeholder="Plan casa"
            defaultValue={stat.lastClientPlan}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Fecha</span>
          <input
            type="date"
            name="lastClientDate"
            defaultValue={toDateInput(stat.lastClientDate)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>

        <h2 className="mt-2 text-sm font-semibold text-slate-900 sm:col-span-2 lg:col-span-3">
          Contadores principales
        </h2>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">
            Nuevos clientes este mes
          </span>
          <input
            type="number"
            name="newClientsThisMonth"
            defaultValue={stat.newClientsThisMonth}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">
            % de crecimiento vs mes anterior
          </span>
          <input
            type="number"
            name="newClientsGrowthPct"
            defaultValue={stat.newClientsGrowthPct}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">
            Bienes entregados
          </span>
          <input
            type="number"
            name="bienesEntregados"
            defaultValue={stat.bienesEntregados}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">
            Asambleas ejecutadas
          </span>
          <input
            type="number"
            name="asambleasEjecutadas"
            defaultValue={stat.asambleasEjecutadas}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">
            Inmuebles entregados
          </span>
          <input
            type="number"
            name="inmueblesEntregados"
            defaultValue={stat.inmueblesEntregados}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">
            Monto promedio adjudicado ($)
          </span>
          <input
            type="number"
            name="montoPromedioAdjudicado"
            defaultValue={stat.montoPromedioAdjudicado}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>

        <h2 className="mt-2 text-sm font-semibold text-slate-900 sm:col-span-2 lg:col-span-3">
          Contadores del inicio (hero)
        </h2>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">
            Familias adjudicadas
          </span>
          <input
            type="number"
            name="familiasAdjudicadas"
            defaultValue={stat.familiasAdjudicadas}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">
            Ciudades alcanzadas
          </span>
          <input
            type="number"
            name="ciudadesAlcanzadas"
            defaultValue={stat.ciudadesAlcanzadas}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">
            Años de experiencia
          </span>
          <input
            type="number"
            name="aniosExperiencia"
            defaultValue={stat.aniosExperiencia}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>

        <div className="sm:col-span-2 lg:col-span-3">
          <button
            type="submit"
            className="rounded-full bg-emerald-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-600"
          >
            Guardar cifras
          </button>
        </div>
      </form>

      {/* Clientes afiliados por mes */}
      <form
        action={saveMonthlyAffiliations}
        className="rounded-xl border border-slate-200 bg-slate-50 p-6"
      >
        <h2 className="text-sm font-semibold text-slate-900">
          Clientes afiliados — últimos 12 meses
        </h2>
        <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {affiliations.map((a) => (
            <label key={a.id} className="block">
              <input type="hidden" name="id" value={a.id} />
              <span className="text-xs font-medium text-slate-500">
                {monthLabel(a.month)}
              </span>
              <input
                type="number"
                name={`count-${a.id}`}
                defaultValue={a.count}
                className="mt-1 w-full rounded-lg border border-slate-300 px-2 py-1.5 text-sm"
              />
            </label>
          ))}
        </div>
        <button
          type="submit"
          className="mt-4 rounded-full bg-emerald-500 px-6 py-2 text-sm font-semibold text-white hover:bg-emerald-600"
        >
          Guardar serie
        </button>
      </form>

      {/* Entregas mensuales */}
      <form
        action={saveMonthlyDeliveries}
        className="rounded-xl border border-slate-200 bg-slate-50 p-6"
      >
        <h2 className="text-sm font-semibold text-slate-900">
          Entregas mensuales
        </h2>
        <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {deliveries.map((d) => (
            <label key={d.id} className="block">
              <input type="hidden" name="id" value={d.id} />
              <span className="text-xs font-medium text-slate-500">
                {monthLabel(d.month)}
              </span>
              <input
                type="number"
                name={`count-${d.id}`}
                defaultValue={d.count}
                className="mt-1 w-full rounded-lg border border-slate-300 px-2 py-1.5 text-sm"
              />
            </label>
          ))}
        </div>
        <button
          type="submit"
          className="mt-4 rounded-full bg-emerald-500 px-6 py-2 text-sm font-semibold text-white hover:bg-emerald-600"
        >
          Guardar serie
        </button>
      </form>

      {/* Clientes por ciudad */}
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="text-sm font-semibold text-slate-900">
          Clientes por ciudad
        </h2>

        <div className="mt-4 space-y-3">
          {cityStats.map((c) => (
            <form
              key={c.id}
              action={updateCityStat}
              className="flex items-center gap-3"
            >
              <input type="hidden" name="id" value={c.id} />
              <span className="w-28 text-sm text-slate-700">{c.city}</span>
              <input
                type="number"
                name="count"
                defaultValue={c.count}
                className="w-32 rounded-lg border border-slate-300 px-2 py-1.5 text-sm"
              />
              <button
                type="submit"
                className="rounded-full bg-emerald-500 px-4 py-1.5 text-xs font-semibold text-white hover:bg-emerald-600"
              >
                Guardar
              </button>
              <button
                type="submit"
                formAction={deleteCityStat}
                className="text-xs font-medium text-red-500 hover:underline"
              >
                Eliminar
              </button>
            </form>
          ))}
        </div>

        <form
          action={addCityStat}
          className="mt-6 flex items-center gap-3 border-t border-slate-200 pt-4"
        >
          <input
            name="city"
            placeholder="Nueva ciudad"
            required
            className="w-48 rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
          <button
            type="submit"
            className="rounded-full border border-emerald-500 px-4 py-2 text-sm font-semibold text-emerald-600 hover:bg-emerald-50"
          >
            + Añadir ciudad
          </button>
        </form>
      </div>
    </div>
  );
}
