import Image from "next/image";
import SectionEyebrow from "./SectionEyebrow";
import Reveal from "@/components/motion/Reveal";

type Entrega = {
  id: string;
  clientName: string;
  city: string;
  propertyType: string;
  neighborhood: string | null;
  deliveredAt: Date;
  photoUrl: string | null;
  notarized: boolean;
};

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const dateFmt = new Intl.DateTimeFormat("es-EC", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

export default function EntregasRecientes({
  entregas,
}: {
  entregas: Entrega[];
}) {
  return (
    <section id="entregas" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionEyebrow text="Historias reales" />
        <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Entregas recientes
        </h2>
        <p className="mt-4 max-w-2xl text-slate-600">
          Cada entrega es un sueño cumplido. Conoce a quienes ya tienen las
          llaves de su propiedad gracias al plan de Grupo Inmobienes.
        </p>

        {entregas.length === 0 ? (
          <p className="mt-12 text-sm text-slate-500">
            Aún no hay entregas publicadas.
          </p>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {entregas.map((e, i) => (
              <Reveal key={e.id} delay={(i % 3) * 0.1}>
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-lg">
                <div className="flex items-center gap-4 p-6">
                  {e.photoUrl ? (
                    <Image
                      src={e.photoUrl}
                      alt={e.clientName}
                      width={56}
                      height={56}
                      className="h-14 w-14 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 text-lg font-bold text-navy">
                      {initials(e.clientName)}
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-slate-400">
                      {dateFmt.format(e.deliveredAt)}
                    </p>
                    <p className="text-lg font-semibold text-slate-900">
                      {e.clientName}
                    </p>
                    <p className="text-sm text-slate-500">{e.city}</p>
                  </div>
                </div>
                <div className="border-t border-slate-100 px-6 py-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-blue-accent">
                    {e.propertyType}
                  </p>
                  {e.neighborhood && (
                    <p className="text-sm text-slate-600">{e.neighborhood}</p>
                  )}
                  {e.notarized && (
                    <p className="mt-2 text-xs text-slate-400">
                      Entregado ante Notario Público
                    </p>
                  )}
                </div>
              </div>
              </Reveal>
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <p className="text-lg font-medium text-slate-700">
            ¿Quieres ser el próximo en recibir las llaves de tu bien?
          </p>
          <a
            href="#contacto"
            className="mt-4 inline-block rounded-full bg-gold/100 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gold-dark"
          >
            Comenzar mi plan ahora
          </a>
        </div>
      </div>
    </section>
  );
}
