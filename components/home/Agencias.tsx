import SectionEyebrow from "./SectionEyebrow";

const AGENCIAS = [
  {
    city: "Quito",
    address: "Av. Los Shyris e Isla Floreana",
    detail: "Local esquinero",
  },
  {
    city: "Guayaquil",
    address: "Alborada, etapa II, villa 12, Mz. 21",
    detail: "Frente a Créditos Económicos",
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
          {AGENCIAS.map((a) => (
            <div
              key={a.city}
              className="rounded-2xl border border-slate-200 bg-white p-8"
            >
              <h3 className="text-xl font-bold text-slate-900">{a.city}</h3>
              <p className="mt-2 text-slate-600">{a.address}</p>
              <p className="text-sm text-slate-400">{a.detail}</p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  `${a.address}, ${a.city}, Ecuador`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-sm font-semibold text-emerald-600 hover:underline"
              >
                Cómo llegar →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
