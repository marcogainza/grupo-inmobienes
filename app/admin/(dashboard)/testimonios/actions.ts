"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/session";
import { uploadImage } from "@/lib/blob";

export async function saveTestimonio(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  const clientName = String(formData.get("clientName") ?? "").trim();
  const comment = String(formData.get("comment") ?? "").trim();
  const city = String(formData.get("city") ?? "").trim();
  const propertyType = String(formData.get("propertyType") ?? "").trim();
  const photo = formData.get("photo") as File | null;

  if (!clientName || !comment || !city || !propertyType) {
    throw new Error("Faltan campos obligatorios.");
  }

  const photoUrl = await uploadImage(photo, "testimonios");

  const data = {
    clientName,
    comment,
    city,
    propertyType,
    ...(photoUrl ? { photoUrl } : {}),
  };

  if (id) {
    await prisma.testimonio.update({ where: { id }, data });
  } else {
    await prisma.testimonio.create({ data });
  }

  revalidatePath("/admin/testimonios");
  revalidatePath("/");
  redirect("/admin/testimonios");
}

export async function deleteTestimonio(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await prisma.testimonio.delete({ where: { id } });
  revalidatePath("/admin/testimonios");
  revalidatePath("/");
}
