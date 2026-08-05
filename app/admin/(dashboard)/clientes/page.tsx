import { CITIES, PROPERTY_TYPES } from "@/lib/constants";
import { prisma } from "@/lib/db";
import { addCliente, deleteCliente } from "./actions";

function toDateInput(d: Date) {
  return d.toISOString().slice(0, 10);
}

function ClienteRow({
  cliente,
}: {
  cliente: { id: string; name: string; city: string; plan: string; joinedAt: Date };
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 p-4">
      <div>
        <p className="text-sm font-semibold text-slate-900">
          {cliente.name} · {cliente.city}
        </p>
        <p className="text-xs text-slate-500">
          {cliente.plan} · {toDateInput(cliente.joinedAt)}
        </p>
      </div>
      <form action={deleteCliente}>
        <input type="hidden" name="id" value={cliente.id} />
        <button
          type="submit"
          className="text-sm font-medium text-red-500 hover:underline"
        >
          Eliminar
        </button>
      </form>
    </div>
  );
}

export default async function AdminClientesPage() {
  const clientes = await prisma.clienteAfiliado.findMany({
    orderBy: { joinedAt: "desc" },
  });
  const visibles = clientes.slice(0, 6);
  const resto = clientes.slice(6);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl font-bold text-slate-900">
          Clientes afiliados
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Cada cliente que se une a un plan. El más reciente aparece como
          &quot;Último cliente&quot; en /dashboard.
        </p>
      </div>

      <form
        action={addCliente}
        className="grid gap-4 rounded-xl border border-slate-200 bg-slate-50 p-6 sm:grid-cols-2"
      >
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Nombre</span>
          <input
            name="name"
            required
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Ciudad</span>
          <select
            name="city"
            required
            defaultValue=""
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
          >
            <option value="" disabled>
              Selecciona una ciudad
            </option>
            {CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">
            Plan al que se unió
          </span>
          <select
            name="plan"
            required
            defaultValue=""
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
          >
            <option value="" disabled>
              Selecciona un tipo de bien
            </option>
            {PROPERTY_TYPES.map((t) => (
              <option key={t} value={`Plan ${t}`}>
                Plan {t}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Fecha</span>
          <input
            type="date"
            name="joinedAt"
            defaultValue={toDateInput(new Date())}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <div className="sm:col-span-2">
          <button
            type="submit"
            className="rounded-full bg-gold px-6 py-2.5 text-sm font-semibold text-white hover:bg-gold-dark"
          >
            Añadir cliente
          </button>
        </div>
      </form>

      <div className="space-y-3">
        {clientes.length === 0 && (
          <p className="text-sm text-slate-400">
            No hay clientes afiliados todavía.
          </p>
        )}
        {visibles.map((c) => (
          <ClienteRow key={c.id} cliente={c} />
        ))}

        {resto.length > 0 && (
          <details className="rounded-xl border border-slate-200">
            <summary className="cursor-pointer list-none p-4 text-sm font-medium text-blue-accent hover:underline">
              Ver los {resto.length} clientes restantes
            </summary>
            <div className="max-h-96 space-y-3 overflow-y-auto border-t border-slate-200 p-4">
              {resto.map((c) => (
                <ClienteRow key={c.id} cliente={c} />
              ))}
            </div>
          </details>
        )}
      </div>
    </div>
  );
}
