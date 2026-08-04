import SectionEyebrow from "./SectionEyebrow";
import { PROPERTY_TYPES } from "@/lib/constants";

const ICONS: Record<string, string> = {
  Casa: "🏡",
  Departamento: "🏢",
  Terreno: "🌳",
  "Proyecto inmobiliario": "🏗️",
  "Local comercial": "🏬",
  Vehículo: "🚗",
};

export default function Catalogo() {
  return (
    <section id="inmuebles" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionEyebrow text="Nuestro catálogo" />
        <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Bienes a tu alcance
        </h2>
        <p className="mt-4 max-w-2xl text-slate-600">
          Elige el tipo de bien que mejor se adapte a tu proyecto de vida. Tú
          decides, nosotros te ayudamos a conseguirlo.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROPERTY_TYPES.map((type) => (
            <div
              key={type}
              className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-6"
            >
              <span className="text-3xl">{ICONS[type] ?? "🏠"}</span>
              <span className="text-lg font-semibold text-slate-900">
                {type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
