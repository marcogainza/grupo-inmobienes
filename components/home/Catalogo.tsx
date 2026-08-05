import Image from "next/image";
import SectionEyebrow from "./SectionEyebrow";
import Reveal from "@/components/motion/Reveal";
import { PROPERTY_TYPES } from "@/lib/constants";

const PHOTOS: Record<string, string> = {
  Casa: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  Departamento:
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
  Terreno: "/terreno-0.jpg",
  "Proyecto inmobiliario":
    "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
  "Local comercial": "/local-2.jpg",
  Vehículo: "/venucia_2.jpg",
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
          {PROPERTY_TYPES.map((type, i) => (
            <Reveal key={type} delay={i * 0.08}>
              <div className="group relative h-56 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                <Image
                  src={PHOTOS[type]}
                  alt={type}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/10 to-transparent transition-opacity duration-300 group-hover:from-navy/90" />
                <p className="absolute bottom-4 left-4 text-lg font-semibold text-white drop-shadow">
                  {type}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
