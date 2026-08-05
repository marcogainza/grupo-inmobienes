import "server-only";
import { put } from "@vercel/blob";

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);
const MAX_FILE_SIZE_MB = 2;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

/**
 * Sube una imagen a Vercel Blob. Devuelve null si no se proporcionó archivo
 * (permite dejar formularios de edición sin cambiar la foto existente).
 *
 * Valida tipo MIME y tamaño antes de subir: el formulario del CMS solo se
 * usa para fotos, así que cualquier otro tipo de archivo (o uno demasiado
 * grande) se rechaza en vez de aceptarse a ciegas.
 */
export async function uploadImage(
  file: File | null,
  folder: "entregas" | "testimonios" | "blog"
): Promise<string | null> {
  if (!file || file.size === 0) return null;

  if (!ALLOWED_MIME_TYPES.has(file.type)) {
    throw new Error(
      "Formato de imagen no permitido. Usa JPG, PNG, WEBP o GIF."
    );
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    throw new Error(
      `La imagen supera el tamaño máximo permitido (${MAX_FILE_SIZE_MB}MB).`
    );
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
  const pathname = `${folder}/${Date.now()}-${safeName}`;

  const blob = await put(pathname, file, {
    access: "private",
    addRandomSuffix: true,
  });

  return `/api/media?pathname=${encodeURIComponent(blob.pathname)}`;
}
