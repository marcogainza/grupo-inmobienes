import DOMPurify from "isomorphic-dompurify";

/**
 * Sanitiza el HTML del contenido de un post antes de renderizarlo con
 * dangerouslySetInnerHTML. Aunque el contenido lo escribe el propio admin
 * (autenticado), sanitizamos igual: evita que un XSS accidental en el editor,
 * HTML pegado de una fuente externa, o una sesión de admin comprometida
 * termine ejecutando scripts en el navegador de los visitantes públicos.
 */
export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ADD_ATTR: ["target", "rel"],
  });
}

/**
 * Prepara el contenido de un BlogPost para renderizarlo como HTML.
 * Los posts creados antes del editor enriquecido guardaron texto plano
 * (sin tags); esta función lo detecta y lo envuelve en párrafos
 * preservando los saltos de línea, para no "aplastar" contenido antiguo.
 */
export function renderBlogContent(content: string): string {
  const looksLikeHtml = /<[a-z][\s\S]*>/i.test(content);
  if (looksLikeHtml) return sanitizeHtml(content);

  const escaped = content
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  const paragraphs = escaped
    .split(/\n{2,}/)
    .map((p) => `<p>${p.replace(/\n/g, "<br/>")}</p>`)
    .join("");
  return sanitizeHtml(paragraphs);
}
