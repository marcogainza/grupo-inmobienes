type HeroProps = {
  familiasAdjudicadas: number;
  ciudadesAlcanzadas: number;
  aniosExperiencia: number;
};

export default function Hero({
  familiasAdjudicadas,
  ciudadesAlcanzadas,
  aniosExperiencia,
}: HeroProps) {
  const stats = [
    { label: "Familias adjudicadas", value: familiasAdjudicadas },
    { label: "Ciudades alcanzadas", value: ciudadesAlcanzadas },
    { label: "Años de experiencia", value: aniosExperiencia },
  ];

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-28">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-emerald-300">
            🏢 Tu meta inmobiliaria, planificada
          </span>
          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Planificamos tu futuro inmobiliario
          </h1>
          <p className="mt-6 max-w-xl text-lg text-slate-300">
            Hacemos posible la adquisición de tus bienes mediante un sistema
            de compra programada flexible, seguro y diseñado a tu medida. El
            camino inteligente para construir tu patrimonio con total
            tranquilidad.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#contacto"
              className="rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              Comenzar ahora
            </a>
            <a
              href="#como-funciona"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              ¿Cómo funciona?
            </a>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-300">
            <li>✓ Sin crédito hipotecario</li>
            <li>✓ Asesoría personalizada</li>
            <li>✓ 100% Ecuador</li>
          </ul>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl backdrop-blur">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-2xl">
              🔒
            </div>
            <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-emerald-300">
              Inversión asegurada
            </p>
            <p className="mt-2 text-xl font-bold">
              Grupo <span className="text-emerald-400">INMOBIENES</span>
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-white/5">
        <div className="mx-auto grid max-w-7xl grid-cols-3 gap-4 px-4 py-8 text-center sm:px-6">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-2xl font-bold text-emerald-400 sm:text-3xl">
                +{stat.value}
              </p>
              <p className="mt-1 text-xs text-slate-300 sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
