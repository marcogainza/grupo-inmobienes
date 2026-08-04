"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/session";

export async function addCliente(formData: FormData) {
  await requireAdmin();

  const name = String(formData.get("name") ?? "").trim();
  const city = String(formData.get("city") ?? "").trim();
  const plan = String(formData.get("plan") ?? "").trim();
  const joinedAtRaw = String(formData.get("joinedAt") ?? "");

  if (!name || !city || !plan) {
    throw new Error("Faltan campos obligatorios.");
  }

  await prisma.clienteAfiliado.create({
    data: {
      name,
      city,
      plan,
      joinedAt: joinedAtRaw ? new Date(joinedAtRaw) : new Date(),
    },
  });

  revalidatePath("/admin/clientes");
  revalidatePath("/dashboard");
  revalidatePath("/");
  redirect("/admin/clientes");
}

export async function deleteCliente(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await prisma.clienteAfiliado.delete({ where: { id } });
  revalidatePath("/admin/clientes");
  revalidatePath("/dashboard");
  revalidatePath("/");
}
