import "server-only";
import nodemailer, { type Transporter } from "nodemailer";

let transporter: Transporter | null = null;

/**
 * Transporter SMTP perezoso: solo se crea al enviar el primer correo, para
 * que la ausencia de las variables de entorno (aún no configuradas en
 * Vercel) no rompa el build ni el resto del sitio.
 *
 * Variables esperadas (Settings → Environment Variables en Vercel):
 *   SMTP_HOST      ej. mail.grupoinmobienes.com.ec
 *   SMTP_PORT      465 (SSL) o 587 (STARTTLS) — 465 por defecto
 *   SMTP_USER      info@grupoinmobienes.com.ec
 *   SMTP_PASSWORD  la contraseña real de esa cuenta de correo
 *   SMTP_FROM      opcional, por defecto "Grupo Inmobienes <SMTP_USER>"
 */
function getTransporter(): Transporter {
  if (!transporter) {
    const host = process.env.SMTP_HOST;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASSWORD;
    const port = Number(process.env.SMTP_PORT ?? 465);

    if (!host || !user || !pass) {
      throw new Error(
        "Faltan variables de entorno SMTP (SMTP_HOST, SMTP_USER, SMTP_PASSWORD) para enviar correos."
      );
    }

    transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // 465 = SSL/TLS implícito; 587 = STARTTLS
      auth: { user, pass },
      // El certificado del servidor de correo del hosting no valida la
      // cadena completa (frecuente en hosting compartido/cPanel); la
      // conexión sigue cifrada, solo se omite la verificación estricta.
      tls: { rejectUnauthorized: false },
    });
  }
  return transporter;
}

export async function sendMail(opts: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}) {
  const t = getTransporter();
  const from =
    process.env.SMTP_FROM || `Grupo Inmobienes <${process.env.SMTP_USER}>`;
  return t.sendMail({ from, ...opts });
}

// Bandeja donde el equipo de ventas recibe la notificación de cada lead.
export const SALES_NOTIFICATION_EMAIL =
  process.env.SALES_NOTIFICATION_EMAIL ||
  process.env.SMTP_USER ||
  "info@grupoinmobienes.com.ec";
