"use server";

import { sendMail, SALES_NOTIFICATION_EMAIL } from "@/lib/smtp";
import { welcomeClientEmail, leadNotificationEmail } from "@/lib/email-templates";

export type ContactFormState = { success?: boolean; error?: string };

/**
 * Server Action del formulario de Contacto: valida los datos y dispara los
 * dos correos transaccionales (bienvenida al cliente + notificación de
 * lead al equipo de ventas) vía SMTP (ver lib/smtp.ts).
 */
export async function sendContactForm(
  _prevState: ContactFormState | undefined,
  formData: FormData
): Promise<ContactFormState> {
  const nombre = String(formData.get("nombre") ?? "").trim();
  const correo = String(formData.get("correo") ?? "").trim();
  const telefono = String(formData.get("telefono") ?? "").trim();
  const ciudad = String(formData.get("ciudad") ?? "").trim();
  const monto = String(formData.get("monto") ?? "").trim();
  const mensaje = String(formData.get("mensaje") ?? "").trim();
  const aceptaTerminos = formData.get("acepta") === "on";

  if (!nombre || !correo || !telefono || !ciudad) {
    return { error: "Completa todos los campos obligatorios." };
  }
  if (!aceptaTerminos) {
    return {
      error:
        "Debes aceptar las Políticas de Privacidad y los Términos y Condiciones para continuar.",
    };
  }

  const lead = { nombre, correo, telefono, ciudad, monto, mensaje };

  try {
    const clientEmail = welcomeClientEmail(lead);
    const salesEmail = leadNotificationEmail(lead);

    await Promise.all([
      sendMail({
        to: correo,
        subject: clientEmail.subject,
        html: clientEmail.html,
      }),
      sendMail({
        to: SALES_NOTIFICATION_EMAIL,
        replyTo: correo,
        subject: salesEmail.subject,
        html: salesEmail.html,
      }),
    ]);

    return { success: true };
  } catch (err) {
    console.error("Error enviando correos de contacto:", err);
    return {
      error:
        "No pudimos enviar tu mensaje en este momento. Por favor, escríbenos directo por WhatsApp.",
    };
  }
}
