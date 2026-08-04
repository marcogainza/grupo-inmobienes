"use client";

import { useState } from "react";
import SectionEyebrow from "./SectionEyebrow";

const MONTOS = [
  15000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000,
];

const PLAZOS = [
  { label: "5 años (60 cuotas)", cuotas: 60 },
  { label: "8 años (96 cuotas)", cuotas: 96 },
  { label: "10 años (120 cuotas)", cuotas: 120 },
  { label: "15 años (180 cuotas)", cuotas: 180 },
];

const currency = new Intl.NumberFormat("es-EC", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

export default function Simulador() {
  const [monto, setMonto] = useState<number | "">("");
  const [plazo, setPlazo] = useState<number | "">("");
  const [cuota, setCuota] = useState<number | null>(null);

  function calcular() {
    if (!monto || !plazo) return;
    setCuota(monto / plazo);
  }

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <SectionEyebrow text="Simulador de plan" />
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Calcula tu cuota mensual
          </h2>
          <p className="mt-4 text-slate-600">
            Selecciona el monto del bien que deseas adquirir y el plazo de tu
            plan. Conoce al instante tu cuota mensual estimada.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-8">
          <p className="text-center text-sm font-semibold text-slate-500">
            Simulación de plan programado
          </p>
          <p className="text-center text-xs text-slate-400">
            Sin crédito hipotecario · Sin garante · Sin buró
          </p>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">
                Monto del bien
              </span>
              <select
                value={monto}
                onChange={(e) =>
                  setMonto(e.target.value ? Number(e.target.value) : "")
                }
                className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
              >
                <option value="">Selecciona un monto</option>
                {MONTOS.map((m) => (
                  <option key={m} value={m}>
                    {currency.format(m)}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">
                Plazo de pago
              </span>
              <select
                value={plazo}
                onChange={(e) =>
                  setPlazo(e.target.value ? Number(e.target.value) : "")
                }
                className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
              >
                <option value="">Selecciona el plazo</option>
                {PLAZOS.map((p) => (
                  <option key={p.cuotas} value={p.cuotas}>
                    {p.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <button
            type="button"
            onClick={calcular}
            className="mt-6 w-full rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
          >
            Calcular cuota mensual
          </button>

          {cuota !== null && (
            <p className="mt-6 text-center text-2xl font-bold text-slate-900">
              Cuota estimada: {currency.format(cuota)}
              <span className="block text-sm font-normal text-slate-500">
                por mes (referencial, no incluye aportes de licitación)
              </span>
            </p>
          )}

          <ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-slate-500">
            <li>✓ Sin historial crediticio</li>
            <li>✓ Sin garante</li>
            <li>✓ Aprobación inmediata</li>
            <li>✓ Asesoría gratuita</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
