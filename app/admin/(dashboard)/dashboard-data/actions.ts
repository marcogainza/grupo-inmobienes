"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/session";

function num(formData: FormData, key: string) {
  const v = Number(formData.get(key));
  return Number.isFinite(v) ? v : 0;
}

export async function saveDashboardStat(formData: FormData) {
  await requireAdmin();

  await prisma.dashboardStat.upsert({
    where: { id: "main" },
    update: {
      newClientsThisMonth: num(formData, "newClientsThisMonth"),
      newClientsGrowthPct: num(formData, "newClientsGrowthPct"),
      bienesEntregados: num(formData, "bienesEntregados"),
      asambleasEjecutadas: num(formData, "asambleasEjecutadas"),
      inmueblesEntregados: num(formData, "inmueblesEntregados"),
      montoPromedioAdjudicado: num(formData, "montoPromedioAdjudicado"),
      familiasAdjudicadas: num(formData, "familiasAdjudicadas"),
      ciudadesAlcanzadas: num(formData, "ciudadesAlcanzadas"),
      aniosExperiencia: num(formData, "aniosExperiencia"),
    },
    create: { id: "main" },
  });

  revalidatePath("/admin/dashboard-data");
  revalidatePath("/dashboard");
  revalidatePath("/");
  redirect("/admin/dashboard-data");
}

export async function saveMonthlyAffiliations(formData: FormData) {
  await requireAdmin();
  const ids = formData.getAll("id") as string[];

  await Promise.all(
    ids.map((id) =>
      prisma.monthlyAffiliation.update({
        where: { id },
        data: { count: num(formData, `count-${id}`) },
      })
    )
  );

  revalidatePath("/admin/dashboard-data");
  revalidatePath("/dashboard");
  redirect("/admin/dashboard-data");
}

export async function saveMonthlyDeliveries(formData: FormData) {
  await requireAdmin();
  const ids = formData.getAll("id") as string[];

  await Promise.all(
    ids.map((id) =>
      prisma.monthlyDelivery.update({
        where: { id },
        data: { count: num(formData, `count-${id}`) },
      })
    )
  );

  revalidatePath("/admin/dashboard-data");
  revalidatePath("/dashboard");
  redirect("/admin/dashboard-data");
}

export async function updateCityStat(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  await prisma.cityStat.update({
    where: { id },
    data: { count: num(formData, "count") },
  });

  revalidatePath("/admin/dashboard-data");
  revalidatePath("/dashboard");
  redirect("/admin/dashboard-data");
}

export async function addCityStat(formData: FormData) {
  await requireAdmin();
  const city = String(formData.get("city") ?? "").trim();
  if (!city) return;

  const maxOrder = await prisma.cityStat.aggregate({ _max: { order: true } });

  await prisma.cityStat.create({
    data: { city, count: 0, order: (maxOrder._max.order ?? 0) + 1 },
  });

  revalidatePath("/admin/dashboard-data");
  revalidatePath("/dashboard");
  redirect("/admin/dashboard-data");
}

export async function deleteCityStat(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await prisma.cityStat.delete({ where: { id } });
  revalidatePath("/admin/dashboard-data");
  revalidatePath("/dashboard");
}
