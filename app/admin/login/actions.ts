"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { prisma } from "@/lib/db";
import { createSessionToken, verifyPassword } from "@/lib/auth";
import { setSessionCookie } from "@/lib/session";
import {
  checkRateLimit,
  registerFailedAttempt,
  registerSuccessfulAttempt,
} from "@/lib/rate-limit";

// Hash bcrypt "señuelo" (de una contraseña arbitraria) usado únicamente para
// mantener el tiempo de respuesta constante cuando el usuario no existe.
const DUMMY_HASH = "$2b$10$TAGD/ko8N0lsAqPV01OPC.g25eVfEdB2pkOyEqsSDjGkUrpKgB3zy";

async function getClientIp() {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
}

export async function loginAction(
  _prevState: { error?: string } | undefined,
  formData: FormData
): Promise<{ error?: string }> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!username || !password) {
    return { error: "Completa usuario y contraseña." };
  }

  const ip = await getClientIp();
  const rateLimitKey = `${ip}:${username.toLowerCase()}`;

  const { allowed, retryAfterSeconds } = checkRateLimit(rateLimitKey);
  if (!allowed) {
    const minutes = Math.ceil((retryAfterSeconds ?? 0) / 60);
    return {
      error: `Demasiados intentos fallidos. Vuelve a intentarlo en ${minutes} minuto${minutes === 1 ? "" : "s"}.`,
    };
  }

  const user = await prisma.adminUser.findUnique({ where: { username } });
  // Comparamos siempre contra un hash (real o "señuelo") para que el tiempo
  // de respuesta no revele si el usuario existe o no (mitiga enumeración
  // de usuarios por temporización).
  const valid = await verifyPassword(
    password,
    user?.passwordHash ?? DUMMY_HASH
  );

  if (!user || !valid) {
    registerFailedAttempt(rateLimitKey);
    return { error: "Usuario o contraseña incorrectos." };
  }

  registerSuccessfulAttempt(rateLimitKey);
  const token = await createSessionToken(user.username);
  await setSessionCookie(token);
  redirect("/admin");
}
