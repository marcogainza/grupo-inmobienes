import Image from "next/image";
import { prisma } from "@/lib/db";
import { PROPERTY_TYPES, CITIES } from "@/lib/constants";
import { saveTestimonio, deleteTestimonio } from "./actions";

export default async function AdminTestimoniosPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  const { edit } = await searchParams;

  const [testimonios, editing] = await Promise.all([
    prisma.testimonio.findMany({ orderBy: { createdAt: "desc" } }),
    edit ? prisma.testimonio.findUnique({ where: { id: edit } }) : null,
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl font-bold text-slate-900">
          Familias que ya tienen su hogar
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Testimonios que se muestran en la página de inicio.
        </p>
      </div>

      <form
        action={saveTestimonio}
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
            Foto {editing?.photoUrl ? "(deja vacío para no cambiarla)" : ""}
          </span>
          <input
            type="file"
            name="photo"
            accept="image/*"
            className="mt-1 w-full text-sm"
          />
        </label>

        <label className="block sm:col-span-2">
          <span className="text-sm font-medium text-slate-700">
            Comentario
          </span>
          <textarea
            name="comment"
            required
            rows={3}
            defaultValue={editing?.comment ?? ""}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>

        <div className="sm:col-span-2 flex items-center gap-3">
          <button
            type="submit"
            className="rounded-full bg-gold/100 px-6 py-2.5 text-sm font-semibold text-white hover:bg-gold-dark"
          >
            {editing ? "Guardar cambios" : "Añadir testimonio"}
          </button>
          {editing && (
            <a
              href="/admin/testimonios"
              className="text-sm font-medium text-slate-500 hover:underline"
            >
              Cancelar edición
            </a>
          )}
        </div>
      </form>

      <div className="space-y-3">
        {testimonios.length === 0 && (
          <p className="text-sm text-slate-400">No hay testimonios todavía.</p>
        )}
        {testimonios.map((t) => (
          <div
            key={t.id}
            className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 p-4"
          >
            <div className="flex items-center gap-3">
              {t.photoUrl && (
                <Image
                  src={t.photoUrl}
                  alt={t.clientName}
                  width={44}
                  height={44}
                  className="h-11 w-11 rounded-full object-cover"
                />
              )}
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {t.clientName} · {t.city}
                </p>
                <p className="max-w-md truncate text-xs text-slate-500">
                  {t.comment}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={`/admin/testimonios?edit=${t.id}`}
                className="text-sm font-medium text-blue-accent hover:underline"
              >
                Editar
              </a>
              <form action={deleteTestimonio}>
                <input type="hidden" name="id" value={t.id} />
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
