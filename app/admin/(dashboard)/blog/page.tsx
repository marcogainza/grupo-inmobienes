import Image from "next/image";
import { prisma } from "@/lib/db";
import { saveBlogPost, deleteBlogPost } from "./actions";

export default async function AdminBlogPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  const { edit } = await searchParams;

  const [posts, editing] = await Promise.all([
    prisma.blogPost.findMany({ orderBy: { publishedAt: "desc" } }),
    edit ? prisma.blogPost.findUnique({ where: { id: edit } }) : null,
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Blog</h1>
        <p className="mt-1 text-sm text-slate-500">
          Publica noticias y novedades. Aparecen en el inicio y en /blog.
        </p>
      </div>

      <form
        action={saveBlogPost}
        className="grid gap-4 rounded-xl border border-slate-200 bg-slate-50 p-6"
      >
        <input type="hidden" name="id" defaultValue={editing?.id ?? ""} />

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Título</span>
          <input
            name="title"
            required
            defaultValue={editing?.title ?? ""}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">
            Slug (URL, opcional — se genera del título si lo dejas vacío)
          </span>
          <input
            name="slug"
            defaultValue={editing?.slug ?? ""}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">
            Resumen corto
          </span>
          <input
            name="excerpt"
            required
            defaultValue={editing?.excerpt ?? ""}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">
            Imagen de portada{" "}
            {editing?.coverImageUrl ? "(deja vacío para no cambiarla)" : ""}
          </span>
          <input
            type="file"
            name="coverImage"
            accept="image/*"
            className="mt-1 w-full text-sm"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">
            Contenido
          </span>
          <textarea
            name="content"
            required
            rows={8}
            defaultValue={editing?.content ?? ""}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </label>

        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            name="published"
            defaultChecked={editing?.published ?? true}
          />
          Publicado (visible en el sitio)
        </label>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="rounded-full bg-emerald-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-600"
          >
            {editing ? "Guardar cambios" : "Publicar artículo"}
          </button>
          {editing && (
            <a
              href="/admin/blog"
              className="text-sm font-medium text-slate-500 hover:underline"
            >
              Cancelar edición
            </a>
          )}
        </div>
      </form>

      <div className="space-y-3">
        {posts.length === 0 && (
          <p className="text-sm text-slate-400">No hay artículos todavía.</p>
        )}
        {posts.map((p) => (
          <div
            key={p.id}
            className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 p-4"
          >
            <div className="flex items-center gap-3">
              {p.coverImageUrl && (
                <Image
                  src={p.coverImageUrl}
                  alt={p.title}
                  width={56}
                  height={56}
                  className="h-14 w-14 rounded-lg object-cover"
                />
              )}
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {p.title}{" "}
                  {!p.published && (
                    <span className="ml-1 rounded bg-slate-200 px-1.5 py-0.5 text-[10px] font-semibold text-slate-500">
                      BORRADOR
                    </span>
                  )}
                </p>
                <p className="text-xs text-slate-500">/blog/{p.slug}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={`/admin/blog?edit=${p.id}`}
                className="text-sm font-medium text-emerald-600 hover:underline"
              >
                Editar
              </a>
              <form action={deleteBlogPost}>
                <input type="hidden" name="id" value={p.id} />
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
