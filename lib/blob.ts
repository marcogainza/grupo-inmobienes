import "server-only";
import { put } from "@vercel/blob";

/**
 * Sube una imagen a Vercel Blob. Devuelve null si no se proporcionó archivo
 * (permite dejar formularios de edición sin cambiar la foto existente).
 */
export async function uploadImage(
  file: File | null,
  folder: "entregas" | "testimonios" | "blog"
): Promise<string | null> {
  if (!file || file.size === 0) return null;

  const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
  const pathname = `${folder}/${Date.now()}-${safeName}`;

  const blob = await put(pathname, file, {
    access: "private",
    addRandomSuffix: true,
  });

  return `/api/media?pathname=${encodeURIComponent(blob.pathname)}`;
}
