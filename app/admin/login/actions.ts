"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { createSessionToken, verifyPassword } from "@/lib/auth";
import { setSessionCookie } from "@/lib/session";

export async function loginAction(
  _prevState: { error?: string } | undefined,
  formData: FormData
): Promise<{ error?: string }> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!username || !password) {
    return { error: "Completa usuario y contraseña." };
  }

  const user = await prisma.adminUser.findUnique({ where: { username } });
  if (!user) {
    return { error: "Usuario o contraseña incorrectos." };
  }

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) {
    return { error: "Usuario o contraseña incorrectos." };
  }

  const token = await createSessionToken(user.username);
  await setSessionCookie(token);
  redirect("/admin");
}
