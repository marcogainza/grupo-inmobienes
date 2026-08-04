import { prisma } from "@/lib/db";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Hero from "@/components/home/Hero";
import StatsStripe from "@/components/home/StatsStripe";
import ComoFunciona from "@/components/home/ComoFunciona";
import Beneficios from "@/components/home/Beneficios";
import EntregasRecientes from "@/components/home/EntregasRecientes";
import Catalogo from "@/components/home/Catalogo";
import FormasAdjudicacion from "@/components/home/FormasAdjudicacion";
import Simulador from "@/components/home/Simulador";
import Testimonios from "@/components/home/Testimonios";
import Confianza from "@/components/home/Confianza";
import CTAAsesoria from "@/components/home/CTAAsesoria";
import Agencias from "@/components/home/Agencias";
import FAQ from "@/components/home/FAQ";
import BlogPreview from "@/components/home/BlogPreview";
import Contacto from "@/components/home/Contacto";

// Se renderiza por request: el contenido editable desde el CMS (entregas,
// testimonios, cifras) debe reflejarse siempre sin depender del build.
export const dynamic = "force-dynamic";

export default async function Home() {
  const [stat, entregas, testimonios, posts] = await Promise.all([
    prisma.dashboardStat.upsert({
      where: { id: "main" },
      update: {},
      create: { id: "main" },
    }),
    prisma.entrega.findMany({
      orderBy: { createdAt: "desc" },
      take: 6,
    }),
    prisma.testimonio.findMany({
      orderBy: { createdAt: "desc" },
      take: 6,
    }),
    prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      take: 3,
    }),
  ]);

  return (
    <div className="flex min-h-full flex-col">
      <Nav />
      <main className="flex-1">
        <Hero />
        <StatsStripe
          familiasAdjudicadas={stat.familiasAdjudicadas}
          ciudadesAlcanzadas={stat.ciudadesAlcanzadas}
          aniosExperiencia={stat.aniosExperiencia}
        />
        <ComoFunciona />
        <Beneficios />
        <EntregasRecientes entregas={entregas} />
        <Catalogo />
        <FormasAdjudicacion />
        <Simulador />
        <Testimonios testimonios={testimonios} />
        <Confianza />
        <CTAAsesoria />
        <Agencias />
        <FAQ />
        <BlogPreview posts={posts} />
        <Contacto />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
