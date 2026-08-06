import "server-only";

export type ContactLead = {
  nombre: string;
  correo: string;
  telefono: string;
  ciudad: string;
  monto: string;
  mensaje: string;
};

const NAVY = "#1b2c42";
const GOLD = "#c9a84c";
const SLATE = "#475569";

/**
 * Normaliza un teléfono ecuatoriano (con espacios, guiones, "+", 0 inicial,
 * etc.) al formato E.164 sin "+" que exige el enlace wa.me.
 */
export function cleanPhoneForWhatsapp(rawPhone: string): string {
  const digits = rawPhone.replace(/\D/g, "");
  if (digits.startsWith("593")) return digits;
  if (digits.startsWith("0")) return `593${digits.slice(1)}`;
  return `593${digits}`;
}

function emailShell(bodyHtml: string): string {
  return `<!doctype html>
<html lang="es">
  <head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /></head>
  <body style="margin:0;padding:0;background:#f4f5f7;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f5f7;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;">
            <tr>
              <td style="background:${NAVY};padding:24px 32px;">
                <span style="color:#ffffff;font-size:18px;font-weight:bold;letter-spacing:0.5px;">GIB · Grupo Inmobienes</span>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                ${bodyHtml}
              </td>
            </tr>
            <tr>
              <td style="background:#f8fafc;padding:20px 32px;text-align:center;color:#94a3b8;font-size:12px;">
                Grupo Inmobienes · Quito y Guayaquil, Ecuador<br/>
                info@grupoinmobienes.com.ec · +593 99 105 2697
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

/** CORREO 1 — Bienvenida al cliente que llenó el formulario. */
export function welcomeClientEmail(lead: ContactLead): {
  subject: string;
  html: string;
} {
  const subject = `🏠 ¡Bienvenido/a a Grupo Inmobienes, ${lead.nombre}! Tu camino a la vivienda propia empieza hoy ✨`;

  const body = `
    <p style="margin:0 0 4px;color:${SLATE};font-size:12px;">
      Hemos recibido tu solicitud — un Asesor Senior se pondrá en contacto contigo muy pronto 📲
    </p>
    <h1 style="margin:16px 0 20px;color:${NAVY};font-size:22px;">¡Hola ${lead.nombre}! 👋</h1>
    <p style="margin:0 0 16px;color:${SLATE};font-size:15px;line-height:1.6;">
      ¡Qué alegría tenerte aquí! Acabas de dar el primer paso — y probablemente el más importante —
      hacia la casa, departamento o local que siempre soñaste. 🏠✨
    </p>
    <p style="margin:0 0 20px;color:${SLATE};font-size:15px;line-height:1.6;">
      En Grupo Inmobienes creemos que la vivienda propia no debería ser un privilegio de unos pocos,
      sino una meta alcanzable para cualquier familia ecuatoriana. Y tú ya estás en el camino correcto. 🔑
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:12px;margin:0 0 20px;">
      <tr><td style="padding:20px;">
        <p style="margin:0 0 12px;color:${NAVY};font-size:14px;font-weight:bold;">Esto es lo que sigue:</p>
        <p style="margin:0 0 8px;color:${SLATE};font-size:14px;">📞 Un Asesor Inmobiliario Senior revisará tu información en las próximas horas.</p>
        <p style="margin:0 0 8px;color:${SLATE};font-size:14px;">🤝 Te contactará personalmente para resolver tus dudas y armar un plan a tu medida — sin crédito hipotecario, sin buró, sin complicaciones.</p>
        <p style="margin:0;color:${SLATE};font-size:14px;">📈 Juntos definiremos la mejor estrategia (sorteo o licitación) para que llegues más rápido a la adjudicación de tu bien.</p>
      </td></tr>
    </table>
    <p style="margin:0 0 24px;color:${SLATE};font-size:15px;line-height:1.6;">
      Mientras tanto, respira tranquilo/a: tu información está en buenas manos y tu sueño ya empezó a moverse. 🚀
    </p>
    <table role="presentation" cellpadding="0" cellspacing="0">
      <tr><td style="background:${GOLD};border-radius:999px;">
        <a href="https://wa.me/593991052697" style="display:inline-block;padding:12px 24px;color:${NAVY};font-size:14px;font-weight:bold;text-decoration:none;">
          💬 Escríbenos por WhatsApp
        </a>
      </td></tr>
    </table>
    <p style="margin:28px 0 0;color:${SLATE};font-size:15px;line-height:1.6;">
      ¡Bienvenido/a a la familia Grupo Inmobienes! 🏡<br/>
      Un abrazo,<br/>
      <strong style="color:${NAVY};">El equipo de Grupo Inmobienes</strong>
    </p>
  `;

  return { subject, html: emailShell(body) };
}

/** CORREO 2 — Notificación interna de lead para el equipo de ventas. */
export function leadNotificationEmail(lead: ContactLead): {
  subject: string;
  html: string;
} {
  const subject = `🔴 NUEVO LEAD: ${lead.nombre} — ${lead.ciudad} — $${lead.monto || "s/d"} [Acción requerida]`;
  const whatsappPhone = cleanPhoneForWhatsapp(lead.telefono);
  const whatsappMessage = encodeURIComponent(
    `Hola ${lead.nombre}, te contacto de Grupo Inmobienes...`
  );
  const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${whatsappMessage}`;

  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;color:${SLATE};font-size:13px;font-weight:bold;white-space:nowrap;">${label}</td>
      <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;color:${NAVY};font-size:13px;">${value || "—"}</td>
    </tr>`;

  const body = `
    <p style="margin:0 0 4px;color:#dc2626;font-size:12px;font-weight:bold;">
      NUEVO PROSPECTO POR EL SITIO WEB — SLA DE RESPUESTA: 15-30 MIN
    </p>
    <h1 style="margin:16px 0 20px;color:${NAVY};font-size:20px;">🔴 Nuevo lead recibido — gestionar de inmediato</h1>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;margin:0 0 24px;">
      ${row("Nombre", lead.nombre)}
      ${row("Correo", lead.correo)}
      ${row("Teléfono", lead.telefono)}
      ${row("Ciudad", lead.ciudad)}
      ${row("Monto a financiar", lead.monto ? `$${lead.monto}` : "—")}
      ${row("Mensaje", lead.mensaje)}
    </table>
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
      <tr><td style="background:#25D366;border-radius:999px;">
        <a href="${whatsappUrl}" style="display:inline-block;padding:12px 24px;color:#ffffff;font-size:14px;font-weight:bold;text-decoration:none;">
          📲 Contactar por WhatsApp ahora
        </a>
      </td></tr>
    </table>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:12px;">
      <tr><td style="padding:20px;">
        <p style="margin:0 0 12px;color:${NAVY};font-size:14px;font-weight:bold;">Recomendaciones rápidas de abordaje:</p>
        <p style="margin:0 0 6px;color:${SLATE};font-size:13px;">✅ Confirma si ${lead.ciudad || "la ciudad indicada"} es zona de cobertura directa (Quito/Guayaquil) o requiere derivar a agencia aliada.</p>
        <p style="margin:0 0 6px;color:${SLATE};font-size:13px;">✅ Ten a la mano el monto sugerido para validar cuota mensual antes de llamar.</p>
        <p style="margin:0 0 6px;color:${SLATE};font-size:13px;">✅ Revisa el mensaje del cliente para anticipar objeciones o necesidades específicas.</p>
        <p style="margin:0;color:${SLATE};font-size:13px;">✅ Registra el resultado de la gestión en el CRM dentro de las próximas 2 horas.</p>
      </td></tr>
    </table>
  `;

  return { subject, html: emailShell(body) };
}
