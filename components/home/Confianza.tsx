import Reveal from "@/components/motion/Reveal";

const ITEMS = [
  {
    icon: "🇪🇨",
    title: "Ecuador",
    text: "Empresa 100% ecuatoriana",
  },
  {
    icon: "📍",
    title: "Quito | Guayaquil",
    text: "Atención en todo el país",
  },
  {
    icon: "🤝",
    title: "Confianza",
    text: "+4 años en el mercado",
  },
  {
    icon: "🛡️",
    title: "Seguridad",
    text: "Contratos transparentes",
  },
  {
    icon: "✅",
    title: "Cumplimiento",
    text: "+150 familias adjudicadas",
  },
];

export default function Confianza() {
  return (
    <section className="bg-navy py-20 text-white">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Somos una empresa ecuatoriana comprometida con tu futuro
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            Más de 4 años construyendo el sueño de la vivienda propia en
            Ecuador.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {ITEMS.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <div className="group h-full rounded-2xl border border-white/10 bg-white/5 p-6 transition duration-300 hover:-translate-y-1.5 hover:border-gold/40 hover:bg-white/10">
                <span className="inline-block text-3xl transition-transform duration-300 group-hover:scale-125">
                  {item.icon}
                </span>
                <p className="mt-3 font-semibold">{item.title}</p>
                <p className="mt-1 text-sm text-slate-400">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
