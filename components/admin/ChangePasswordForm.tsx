"use client";

import { useActionState } from "react";
import { changePassword } from "@/app/admin/(dashboard)/actions";

export default function ChangePasswordForm() {
  const [state, formAction, pending] = useActionState(changePassword, {});

  return (
    <form action={formAction} className="mt-4 max-w-sm space-y-3">
      <input
        type="password"
        name="currentPassword"
        placeholder="Contraseña actual"
        required
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
      />
      <input
        type="password"
        name="newPassword"
        placeholder="Nueva contraseña (mín. 8 caracteres)"
        required
        minLength={8}
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
      />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirmar nueva contraseña"
        required
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
      />

      {state?.error && (
        <p className="text-sm font-medium text-red-600">{state.error}</p>
      )}
      {state?.success && (
        <p className="text-sm font-medium text-emerald-600">
          {state.success}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
      >
        {pending ? "Guardando…" : "Cambiar contraseña"}
      </button>
    </form>
  );
}
