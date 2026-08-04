import Image from "next/image";
import SectionEyebrow from "./SectionEyebrow";
import { PROPERTY_TYPES } from "@/lib/constants";

const PHOTOS: Record<string, string> = {
  Casa: "/local-1.jpg",
  Departamento: "/venucia.png",
  Terreno: "/terreno-0.png",
  "Proyecto inmobiliario": "/local-3.jpg",
  "Local comercial": "/local-2.jpg",
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
          {PROPERTY_TYPES.map((type) => {
            const photo = PHOTOS[type];
            return (
              <div
                key={type}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50"
              >
                {photo ? (
                  <Image
                    src={photo}
                    alt={type}
                    width={400}
                    height={220}
                    className="h-40 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-40 items-center justify-center bg-navy/5 text-4xl">
                    🚗
                  </div>
                )}
                <p className="p-4 text-lg font-semibold text-slate-900">
                  {type}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
