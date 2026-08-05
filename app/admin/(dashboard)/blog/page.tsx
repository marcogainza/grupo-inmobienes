import Image from "next/image";
import { prisma } from "@/lib/db";
import type { BlogPost, BlogCategory } from "@prisma/client";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { saveBlogPost, deleteBlogPost } from "./actions";

function BlogRow({ p }: { p: BlogPost & { category: BlogCategory | null } }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 p-4">
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
          <p className="text-xs text-slate-500">
            /blog/{p.slug}
            {p.category && (
              <span className="ml-2 rounded-full bg-gold/10 px-2 py-0.5 text-[10px] font-semibold text-gold-dark">
                {p.category.name}
              </span>
            )}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <a
          href={`/admin/blog?edit=${p.id}`}
          className="text-sm font-medium text-blue-accent hover:underline"
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
  );
}

export default async function AdminBlogPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  const { edit } = await searchParams;

  const [posts, editing, categories] = await Promise.all([
    prisma.blogPost.findMany({
      orderBy: { publishedAt: "desc" },
      include: { category: true },
    }),
    edit
      ? prisma.blogPost.findUnique({ where: { id: edit } })
      : null,
    prisma.blogCategory.findMany({ orderBy: { name: "asc" } }),
  ]);
  const visibles = posts.slice(0, 6);
  const resto = posts.slice(6);

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

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">
              Categoría
            </span>
            <select
              name="categoryId"
              defaultValue={editing?.categoryId ?? ""}
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
            >
              <option value="">Sin categoría</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">
              O crea una categoría nueva
            </span>
            <input
              name="newCategoryName"
              placeholder="Ej: Consejos financieros"
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
        </div>

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
          <RichTextEditor name="content" defaultValue={editing?.content ?? ""} />
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
            className="rounded-full bg-gold/100 px-6 py-2.5 text-sm font-semibold text-white hover:bg-gold-dark"
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
        {visibles.map((p) => (
          <BlogRow key={p.id} p={p} />
        ))}

        {resto.length > 0 && (
          <details className="rounded-xl border border-slate-200">
            <summary className="cursor-pointer list-none p-4 text-sm font-medium text-blue-accent hover:underline">
              Ver los {resto.length} artículos restantes
            </summary>
            <div className="max-h-96 space-y-3 overflow-y-auto border-t border-slate-200 p-4">
              {resto.map((p) => (
                <BlogRow key={p.id} p={p} />
              ))}
            </div>
          </details>
        )}
      </div>
    </div>
  );
}
