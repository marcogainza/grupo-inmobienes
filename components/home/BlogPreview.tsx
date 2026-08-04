import Image from "next/image";
import Link from "next/link";
import SectionEyebrow from "./SectionEyebrow";

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImageUrl: string | null;
  publishedAt: Date;
};

const dateFmt = new Intl.DateTimeFormat("es-EC", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export default function BlogPreview({ posts }: { posts: Post[] }) {
  return (
    <section id="blog" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionEyebrow text="Novedades" />
        <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Blog
        </h2>
        <p className="mt-4 max-w-2xl text-slate-600">
          Noticias, consejos y novedades sobre el sistema de compra
          programada.
        </p>

        {posts.length === 0 ? (
          <p className="mt-12 text-sm text-slate-500">
            Aún no hay artículos publicados.
          </p>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
              >
                {post.coverImageUrl && (
                  <Image
                    src={post.coverImageUrl}
                    alt={post.title}
                    width={400}
                    height={220}
                    className="h-44 w-full object-cover"
                  />
                )}
                <div className="p-6">
                  <p className="text-xs text-slate-400">
                    {dateFmt.format(post.publishedAt)}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-slate-900">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            href="/blog"
            className="inline-block rounded-full border border-emerald-500 px-6 py-3 text-sm font-semibold text-emerald-600 transition hover:bg-emerald-50"
          >
            Ver todas las noticias
          </Link>
        </div>
      </div>
    </section>
  );
}
