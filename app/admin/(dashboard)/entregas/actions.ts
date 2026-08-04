"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/session";
import { uploadImage } from "@/lib/blob";

export async function saveEntrega(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  const clientName = String(formData.get("clientName") ?? "").trim();
  const city = String(formData.get("city") ?? "").trim();
  const propertyType = String(formData.get("propertyType") ?? "").trim();
  const neighborhood = String(formData.get("neighborhood") ?? "").trim();
  const deliveredAt = String(formData.get("deliveredAt") ?? "");
  const notarized = formData.get("notarized") === "on";
  const photo = formData.get("photo") as File | null;

  if (!clientName || !city || !propertyType || !deliveredAt) {
    throw new Error("Faltan campos obligatorios.");
  }

  const photoUrl = await uploadImage(photo, "entregas");

  const data = {
    clientName,
    city,
    propertyType,
    neighborhood: neighborhood || null,
    deliveredAt: new Date(deliveredAt),
    notarized,
    ...(photoUrl ? { photoUrl } : {}),
  };

  if (id) {
    await prisma.entrega.update({ where: { id }, data });
  } else {
    await prisma.entrega.create({ data });
  }

  revalidatePath("/admin/entregas");
  revalidatePath("/");
  revalidatePath("/dashboard");
  redirect("/admin/entregas");
}

export async function deleteEntrega(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await prisma.entrega.delete({ where: { id } });
  revalidatePath("/admin/entregas");
  revalidatePath("/");
  revalidatePath("/dashboard");
}
