"use client";

import type { ReactNode } from "react";

const MAX_FILE_SIZE_MB = 2;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

/**
 * Input de archivo para fotos del CMS (entregas, testimonios, blog).
 * Valida tipo y tamaño en el navegador ANTES de enviar el formulario: usa
 * input.setCustomValidity para bloquear el submit nativo del <form> con un
 * mensaje de error, sin esperar el viaje al servidor. El límite debe
 * coincidir con el de lib/blob.ts (validación real, del lado del servidor).
 */
export default function ImageFileInput({
  name,
  label,
}: {
  name: string;
  label: ReactNode;
}) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target;
    const file = input.files?.[0];

    if (!file) {
      input.setCustomValidity("");
      return;
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      input.setCustomValidity(
        "Formato de imagen no permitido. Usa JPG, PNG, WEBP o GIF."
      );
      input.reportValidity();
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      input.setCustomValidity(
        `Esta imagen pesa ${sizeMb}MB. El tamaño máximo permitido es ${MAX_FILE_SIZE_MB}MB.`
      );
      input.reportValidity();
      return;
    }

    input.setCustomValidity("");
  }

  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <input
        type="file"
        name={name}
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleChange}
        className="mt-1 w-full text-sm"
      />
      <span className="mt-1 block text-xs text-slate-400">
        Formatos JPG, PNG, WEBP o GIF. Tamaño máximo: {MAX_FILE_SIZE_MB}MB.
      </span>
    </label>
  );
}
