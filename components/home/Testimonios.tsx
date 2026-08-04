import Image from "next/image";
import SectionEyebrow from "./SectionEyebrow";
import Reveal from "@/components/motion/Reveal";

type Testimonio = {
  id: string;
  clientName: string;
  comment: string;
  city: string;
  propertyType: string;
  photoUrl: string | null;
};

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function Testimonios({
  testimonios,
}: {
  testimonios: Testimonio[];
}) {
  return (
    <section id="testimonios" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionEyebrow text="Casos reales" />
        <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Familias que ya tienen su hogar
        </h2>

        {testimonios.length === 0 ? (
          <p className="mt-12 text-sm text-slate-500">
            Aún no hay testimonios publicados.
          </p>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonios.map((t, i) => (
              <Reveal key={t.id} delay={(i % 3) * 0.1} className="h-full">
              <figure className="flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50 p-6 transition duration-300 hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-lg">
                <blockquote className="flex-1 text-sm italic text-slate-700">
                  “{t.comment}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  {t.photoUrl ? (
                    <Image
                      src={t.photoUrl}
                      alt={t.clientName}
                      width={44}
                      height={44}
                      className="h-11 w-11 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/15 text-sm font-bold text-navy">
                      {initials(t.clientName)}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {t.clientName}
                    </p>
                    <p className="text-xs text-slate-500">
                      {t.propertyType} · {t.city}
                    </p>
                  </div>
                </figcaption>
              </figure>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
