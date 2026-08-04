import SectionEyebrow from "./SectionEyebrow";
import Reveal from "@/components/motion/Reveal";

const BENEFICIOS = [
  {
    icon: "🎯",
    title: "Adjudicación Directa",
    text: "Accede a tu bien de forma independiente y programada. Un sistema flexible basado en tu propio compromiso de ahorro, sin necesidad de historial crediticio.",
  },
  {
    icon: "🏠",
    title: "Elige el inmueble que quieras",
    text: "Casas, departamentos, terrenos o proyectos comerciales. Tú tienes la total libertad de decidir qué tipo de propiedad adquirir y exactamente en qué ubicación.",
  },
  {
    icon: "💳",
    title: "Cuotas a tu medida",
    text: "Disfruta de aportaciones mensuales adaptadas por completo a tu realidad financiera actual, brindándote tranquilidad y un crecimiento constante de tu capital.",
  },
  {
    icon: "🧑‍💼",
    title: "Asesoría personalizada",
    text: "Un especialista dedicado te acompaña de manera constante en cada etapa del proceso, garantizando respuestas claras desde tu afiliación hasta el día de la entrega.",
  },
  {
    icon: "📜",
    title: "Proceso transparente y legal",
    text: "Respaldamos tu inversión con contratos claros, reportes continuos y asambleas de adjudicación públicas avaladas ante la presencia de un Notario Público.",
  },
  {
    icon: "🇪🇨",
    title: "Presencia en todo el país",
    text: "Con oficinas principales en Quito y Guayaquil, brindamos atención a nivel nacional para que planifiques y adquieras tu propiedad en cualquier ciudad del Ecuador.",
  },
];

export default function Beneficios() {
  return (
    <section id="beneficios" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionEyebrow text="Nuestras ventajas" />
        <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          ¿Por qué Grupo Inmobienes?
        </h2>
        <p className="mt-4 max-w-2xl text-slate-600">
          Tu plan inteligente de ahorro y adjudicación directa. Diseñamos el
          camino más accesible, claro y seguro para alcanzar tus metas
          inmobiliarias.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFICIOS.map((b, i) => (
            <Reveal key={b.title} delay={(i % 3) * 0.1}>
              <div className="group h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-lg">
                <span className="inline-block text-3xl transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6">
                  {b.icon}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-slate-900">
                  {b.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{b.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
