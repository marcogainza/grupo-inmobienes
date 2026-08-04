"use client";

import { useState } from "react";
import SectionEyebrow from "./SectionEyebrow";
import { CITIES } from "@/lib/constants";

export default function Contacto() {
  const [enviado, setEnviado] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEnviado(true);
  }

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

        {enviado ? (
          <div className="mt-10 rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
            <p className="text-lg font-semibold text-emerald-700">
              ¡Gracias! Hemos recibido tu mensaje.
            </p>
            <p className="mt-2 text-sm text-emerald-600">
              Un asesor se pondrá en contacto contigo muy pronto.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-10 space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                required
                type="text"
                placeholder="Nombre completo"
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
              />
              <input
                required
                type="email"
                placeholder="Correo electrónico"
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                required
                type="tel"
                placeholder="Teléfono"
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
              />
              <select
                required
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
              type="text"
              placeholder="Monto a financiar $"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
            />
            <textarea
              placeholder="Mensaje"
              rows={4}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
            />
            <label className="flex items-start gap-2 text-xs text-slate-500">
              <input required type="checkbox" className="mt-0.5" />
              He leído y acepto las Políticas de Privacidad y los Términos y
              Condiciones.
            </label>
            <button
              type="submit"
              className="w-full rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
            >
              Enviar mensaje
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
