import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const dynamic = "force-dynamic";

const dateFmt = new Intl.DateTimeFormat("es-EC", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug } });
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt.toISOString(),
      images: post.coverImageUrl ? [post.coverImageUrl] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug } });

  if (!post || !post.published) {
    notFound();
  }

  return (
    <div className="flex min-h-full flex-col">
      <Nav />
      <main className="flex-1 bg-white py-16">
        <article className="mx-auto max-w-3xl px-4 sm:px-6">
          <Link
            href="/blog"
            className="text-sm font-medium text-blue-accent hover:underline"
          >
            ← Volver al blog
          </Link>

          <p className="mt-6 text-xs text-slate-400">
            {dateFmt.format(post.publishedAt)}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {post.title}
          </h1>

          {post.coverImageUrl && (
            <Image
              src={post.coverImageUrl}
              alt={post.title}
              width={900}
              height={480}
              className="mt-8 h-auto w-full rounded-2xl object-cover"
            />
          )}

          <div className="mt-8 whitespace-pre-wrap leading-relaxed text-slate-700">
            {post.content}
          </div>
        </article>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
