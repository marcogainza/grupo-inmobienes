import Image from "next/image";
import SectionEyebrow from "./SectionEyebrow";
import Reveal from "@/components/motion/Reveal";

const AGENCIAS = [
  {
    city: "Quito",
    address: "Av. Los Shyris e Isla Floreana",
    detail: "Local esquinero",
    photo: "/quito.jpg",
  },
  {
    city: "Guayaquil",
    address: "Alborada, etapa II, villa 12, Mz. 21",
    detail: "Frente a Créditos Económicos",
    photo: "/gye.jpg",
  },
];

export default function Agencias() {
  return (
    <section id="agencias" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionEyebrow text="Nuestras agencias" />
        <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Visítanos en Quito o Guayaquil
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {AGENCIAS.map((a, i) => (
            <Reveal key={a.city} delay={i * 0.12}>
              <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1.5 hover:shadow-lg">
                <div className="overflow-hidden">
                  <Image
                    src={a.photo}
                    alt={`Agencia ${a.city}`}
                    width={600}
                    height={320}
                    className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold text-slate-900">
                    {a.city}
                  </h3>
                  <p className="mt-2 text-slate-600">{a.address}</p>
                  <p className="text-sm text-slate-400">{a.detail}</p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      `${a.address}, ${a.city}, Ecuador`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block text-sm font-semibold text-blue-accent hover:underline"
                  >
                    Cómo llegar →
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
