"use client";

import { useActionState } from "react";
import SectionEyebrow from "./SectionEyebrow";
import { CITIES } from "@/lib/constants";
import { useMonto } from "./MontoContext";
import { sendContactForm } from "@/app/actions/contact";

export default function Contacto() {
  const { monto } = useMonto();
  const [state, formAction, pending] = useActionState(sendContactForm, {});

  return (
    <section id="contacto" className="bg-white py-20">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <div className="text-center">
          <SectionEyebrow text="Hablemos" />
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Contáctanos
          </h2>
          <p className="mt-4 text-slate-600">
            Estamos listos para resolver todas tus preguntas y acompañarte en
            el camino hacia tu vivienda propia.
          </p>
        </div>

        {state.success ? (
          <div className="mt-10 rounded-2xl border border-gold/30 bg-gold/10 p-8 text-center">
            <p className="text-lg font-semibold text-navy">
              ¡Gracias! Hemos recibido tu mensaje.
            </p>
            <p className="mt-2 text-sm text-blue-accent">
              Un asesor se pondrá en contacto contigo muy pronto.
            </p>
          </div>
        ) : (
          <form
            action={formAction}
            className="mt-10 space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-8"
          >
            {monto !== null && (
              <p className="rounded-lg bg-gold/10 px-3 py-2 text-xs font-medium text-gold-dark">
                Monto aplicado desde el simulador: ${monto.toLocaleString("es-EC")}
              </p>
            )}
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                required
                name="nombre"
                type="text"
                placeholder="Nombre completo"
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
              />
              <input
                required
                name="correo"
                type="email"
                placeholder="Correo electrónico"
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                required
                name="telefono"
                type="tel"
                placeholder="Teléfono"
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
              />
              <select
                required
                name="ciudad"
                defaultValue=""
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
              >
                <option value="" disabled>
                  Ciudad
                </option>
                {CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <input
              key={monto ?? "empty"}
              type="text"
              name="monto"
              placeholder="Monto a financiar $"
              defaultValue={monto ?? ""}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
            />
            <textarea
              name="mensaje"
              placeholder="Mensaje"
              rows={4}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
            />
            <label className="flex items-start gap-2 text-xs text-slate-500">
              <input required type="checkbox" name="acepta" className="mt-0.5" />
              He leído y acepto las{" "}
              <a
                href="/politica-de-privacidad"
                target="_blank"
                className="underline hover:text-gold-dark"
              >
                Políticas de Privacidad
              </a>{" "}
              y los{" "}
              <a
                href="/terminos-y-condiciones"
                target="_blank"
                className="underline hover:text-gold-dark"
              >
                Términos y Condiciones
              </a>
              .
            </label>

            {state.error && (
              <p className="text-sm font-medium text-red-600">{state.error}</p>
            )}

            <button
              type="submit"
              disabled={pending}
              className="w-full rounded-full bg-gold px-6 py-3 text-sm font-semibold text-white transition hover:scale-[1.02] hover:bg-gold-dark disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
            >
              {pending ? "Enviando…" : "Enviar mensaje"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
