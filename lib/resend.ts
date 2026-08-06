import "server-only";
import { Resend } from "resend";

let client: Resend | null = null;

/**
 * Cliente de Resend perezoso: solo se instancia cuando realmente se envía
 * un correo, para que la ausencia de RESEND_API_KEY (aún no configurada)
 * no rompa el build ni las demás páginas del sitio.
 */
export function getResendClient(): Resend {
  if (!client) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error(
        "Falta la variable de entorno RESEND_API_KEY (necesaria para enviar correos con Resend)."
      );
    }
    client = new Resend(apiKey);
  }
  return client;
}

// Remitente verificado en Resend. Requiere que el dominio
// grupoinmobienes.com.ec esté verificado (registros DKIM/SPF) en el
// panel de Resend antes de poder enviar "desde" esta dirección.
export const CONTACT_FROM = "Grupo Inmobienes <info@grupoinmobienes.com.ec>";

// Bandeja donde el equipo de ventas recibe la notificación de cada lead.
// Configurable por si en el futuro se quiere separar del correo de "info".
export const SALES_NOTIFICATION_EMAIL =
  process.env.SALES_NOTIFICATION_EMAIL || "info@grupoinmobienes.com.ec";
