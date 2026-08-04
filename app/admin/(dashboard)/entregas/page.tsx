import Image from "next/image";
import { prisma } from "@/lib/db";
import { PROPERTY_TYPES, CITIES } from "@/lib/constants";
import { saveEntrega, deleteEntrega } from "./actions";

function toDateInput(d: Date) {
  return d.toISOString().slice(0, 10);
}

export default async function AdminEntregasPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  const { edit } = await searchParams;

  const [entregas, editing] = await Promise.all([
    prisma.entrega.findMany({ orderBy: { deliveredAt: "desc" } }),
    edit ? prisma.entrega.findUnique({ where: { id: edit } }) : null,
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl font-bold text-slate-900">
          Entregas recientes
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Estas entregas aparecen en el inicio (con foto) y en el dashboard
          público (solo texto).
        </p>
      </div>

      <form
        action={saveEntrega}
        className="grid gap-4 rounded-xl border border-slate-200 bg-slate-50 p-6 sm:grid-cols-2"
      >
        <input type="hidden" name="id" defaultValue={editing?.id ?? ""} />

        <label className="block">
          <span className="text-sm font-medium text-slate-700">
            Nombre del cliente
          </span>
          <input
            name="clientName"
            required
            defaultValue={editing?.clientName ?? ""}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Ciudad</span>
          <select
            name="city"
            required
            defaultValue={editing?.city ?? ""}
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
            Tipo de bien
          </span>
          <select
            name="propertyType"
            required
            defaultValue={editing?.propertyType ?? ""}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
          >
            <option value="" disabled>
              Selecciona un tipo
            </option>
            {PROPERTY_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">
            Sector / referencia (opcional)
          </span>
          <input
            name="neighborhood"
            defaultValue={editing?.neighborhood ?? ""}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">
            Fecha de entrega
          </span>
          <input
            type="date"
            name="deliveredAt"
            required
            defaultValue={
              editing ? toDateInput(editing.deliveredAt) : undefined
            }
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">
            Foto {editing?.photoUrl ? "(deja vacío para no cambiarla)" : ""}
          </span>
          <input
            type="file"
            name="photo"
            accept="image/*"
            className="mt-1 w-full text-sm"
          />
        </label>

        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            name="notarized"
            defaultChecked={editing?.notarized ?? true}
          />
          Entregado ante Notario Público
        </label>

        <div className="sm:col-span-2 flex items-center gap-3">
          <button
            type="submit"
            className="rounded-full bg-gold/100 px-6 py-2.5 text-sm font-semibold text-white hover:bg-gold-dark"
          >
            {editing ? "Guardar cambios" : "Añadir entrega"}
          </button>
          {editing && (
            <a
              href="/admin/entregas"
              className="text-sm font-medium text-slate-500 hover:underline"
            >
              Cancelar edición
            </a>
          )}
        </div>
      </form>

      <div className="space-y-3">
        {entregas.length === 0 && (
          <p className="text-sm text-slate-400">No hay entregas todavía.</p>
        )}
        {entregas.map((e) => (
          <div
            key={e.id}
            className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 p-4"
          >
            <div className="flex items-center gap-3">
              {e.photoUrl && (
                <Image
                  src={e.photoUrl}
                  alt={e.clientName}
                  width={44}
                  height={44}
                  className="h-11 w-11 rounded-full object-cover"
                />
              )}
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {e.clientName} · {e.city}
                </p>
                <p className="text-xs text-slate-500">
                  {e.propertyType}
                  {e.neighborhood ? ` · ${e.neighborhood}` : ""} ·{" "}
                  {toDateInput(e.deliveredAt)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={`/admin/entregas?edit=${e.id}`}
                className="text-sm font-medium text-blue-accent hover:underline"
              >
                Editar
              </a>
              <form action={deleteEntrega}>
                <input type="hidden" name="id" value={e.id} />
                <button
                  type="submit"
                  className="text-sm font-medium text-red-500 hover:underline"
                >
                  Eliminar
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
