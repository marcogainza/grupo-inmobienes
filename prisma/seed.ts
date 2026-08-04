import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminUsername = process.env.ADMIN_USERNAME ?? "admin";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "cambiar-esta-clave";

  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.adminUser.upsert({
    where: { username: adminUsername },
    update: { passwordHash },
    create: { username: adminUsername, passwordHash },
  });
  console.log(`✔ Usuario admin listo: ${adminUsername}`);

  const entregasCount = await prisma.entrega.count();
  if (entregasCount === 0) {
    await prisma.entrega.createMany({
      data: [
        {
          clientName: "Martha",
          city: "Guayaquil",
          propertyType: "Local comercial",
          neighborhood: "Samborondón",
          deliveredAt: new Date("2026-07-30"),
          notarized: true,
        },
        {
          clientName: "Freddy B",
          city: "Guayaquil",
          propertyType: "Departamento",
          neighborhood: "Urdesa",
          deliveredAt: new Date("2026-07-30"),
          notarized: true,
        },
        {
          clientName: "Christian S",
          city: "Quito",
          propertyType: "Departamento",
          neighborhood: "Cumbayá",
          deliveredAt: new Date("2026-07-29"),
          notarized: true,
        },
      ],
    });
    console.log("✔ Entregas de ejemplo creadas");
  }

  const testimoniosCount = await prisma.testimonio.count();
  if (testimoniosCount === 0) {
    await prisma.testimonio.createMany({
      data: [
        {
          clientName: "Fredy Perez",
          comment:
            "Gracias a dios tuve la oportunidad de poderlos conocer a ustedes, usamos el beneficio para adquirir una vivienda, el objetivo también fue ampliar y remodelar.",
          city: "Quito",
          propertyType: "Departamento",
        },
        {
          clientName: "Margarita Reviera",
          comment:
            "Recibí las llaves y las escrituras de mi casa gracias a Inmobienes, fue una experiencia muy buena.",
          city: "Quito",
          propertyType: "Departamento",
        },
        {
          clientName: "Viviana Reyes",
          comment:
            "Muchas gracias a todo el equipo. Los recomiendo porque hicieron que este proceso fuera muy fácil y hoy puedo decir que tengo mi casa.",
          city: "Guayaquil",
          propertyType: "Casa",
        },
      ],
    });
    console.log("✔ Testimonios de ejemplo creados");
  }

  const postsCount = await prisma.blogPost.count();
  if (postsCount === 0) {
    await prisma.blogPost.create({
      data: {
        title: "Bienvenidos al blog de Grupo Inmobienes",
        slug: "bienvenidos-al-blog",
        excerpt:
          "Aquí compartiremos noticias, consejos y novedades sobre el sistema de compra programada.",
        content:
          "Este es un artículo de ejemplo. Edítalo o elimínalo desde el panel de administración y publica tus propias noticias.",
        published: true,
      },
    });
    console.log("✔ Post de blog de ejemplo creado");
  }

  await prisma.dashboardStat.upsert({
    where: { id: "main" },
    update: {},
    create: {
      id: "main",
      lastClientName: "Christian Santanas",
      lastClientCity: "Guayaquil",
      lastClientPlan: "Plan casa",
      lastClientDate: new Date("2026-07-28"),
      newClientsThisMonth: 0,
      newClientsGrowthPct: 12,
      bienesEntregados: 0,
      asambleasEjecutadas: 0,
      inmueblesEntregados: 0,
      montoPromedioAdjudicado: 0,
      familiasAdjudicadas: 0,
      ciudadesAlcanzadas: 0,
      aniosExperiencia: 0,
    },
  });
  console.log("✔ DashboardStat inicializado");

  const months = [
    "2025-09",
    "2025-10",
    "2025-11",
    "2025-12",
    "2026-01",
    "2026-02",
    "2026-03",
    "2026-04",
    "2026-05",
    "2026-06",
    "2026-07",
    "2026-08",
  ];

  const affiliationCount = await prisma.monthlyAffiliation.count();
  if (affiliationCount === 0) {
    await prisma.monthlyAffiliation.createMany({
      data: months.map((month, i) => ({ month, count: 0, order: i })),
    });
    console.log("✔ Serie de clientes afiliados inicializada");
  }

  const deliveryCount = await prisma.monthlyDelivery.count();
  if (deliveryCount === 0) {
    await prisma.monthlyDelivery.createMany({
      data: months.map((month, i) => ({ month, count: 0, order: i })),
    });
    console.log("✔ Serie de entregas mensuales inicializada");
  }

  const cityStatCount = await prisma.cityStat.count();
  if (cityStatCount === 0) {
    await prisma.cityStat.createMany({
      data: [
        { city: "Guayaquil", count: 0, order: 0 },
        { city: "Quito", count: 0, order: 1 },
        { city: "Manta", count: 0, order: 2 },
        { city: "Ambato", count: 0, order: 3 },
      ],
    });
    console.log("✔ Estadísticas por ciudad inicializadas");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
