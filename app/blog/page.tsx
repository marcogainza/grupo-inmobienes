import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/db";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata = {
  title: "Blog — Grupo Inmobienes",
};

export const dynamic = "force-dynamic";

const dateFmt = new Intl.DateTimeFormat("es-EC", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export default async function BlogListPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div className="flex min-h-full flex-col">
      <Nav />
      <main className="flex-1 bg-slate-50 py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Blog
          </h1>
          <p className="mt-3 text-slate-600">
            Noticias, consejos y novedades de Grupo Inmobienes.
          </p>

          {posts.length === 0 ? (
            <p className="mt-12 text-sm text-slate-500">
              Aún no hay artículos publicados.
            </p>
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
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
                      width={500}
                      height={260}
                      className="h-52 w-full object-cover"
                    />
                  )}
                  <div className="p-6">
                    <p className="text-xs text-slate-400">
                      {dateFmt.format(post.publishedAt)}
                    </p>
                    <h2 className="mt-2 text-xl font-semibold text-slate-900">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-sm text-slate-600">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
