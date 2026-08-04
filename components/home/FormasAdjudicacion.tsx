import SectionEyebrow from "./SectionEyebrow";

export default function FormasAdjudicacion() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionEyebrow text="Cómo se adjudica" />
        <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Formas de Adjudicación
        </h2>
        <p className="mt-4 max-w-2xl text-slate-600">
          Dos caminos para llegar antes a tu vivienda propia. Tú eliges la
          estrategia que mejor se adapta a tus posibilidades.
        </p>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-8">
            <h3 className="text-xl font-bold text-slate-900">
              Sorteo mensual
            </h3>
            <p className="mt-3 text-sm text-slate-600">
              Cada mes realizamos un sorteo entre todos los afiliados activos
              al día en sus aportes. Cualquier participante tiene la misma
              oportunidad de ser adjudicado sin importar el monto acumulado.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-slate-700">
              <li>✓ Participación igualitaria</li>
              <li>✓ Sin costo adicional</li>
              <li>✓ Sorteo público y verificable</li>
            </ul>
          </div>

          <div className="relative rounded-2xl border-2 border-gold bg-white p-8">
            <span className="absolute -top-3 right-6 rounded-full bg-gold/100 px-3 py-1 text-xs font-bold text-white">
              RECOMENDADO
            </span>
            <h3 className="text-xl font-bold text-slate-900">Licitación</h3>
            <p className="mt-3 text-sm text-slate-600">
              Complementa tus aportes mensuales con un monto adicional
              voluntario. A mayor aporte en licitación, mayor posibilidad de
              ser adjudicado antes y elegir tu bien con más rapidez.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-slate-700">
              <li>✓ Adjudicación acelerada</li>
              <li>✓ Tú controlas el ritmo</li>
              <li>✓ Mayor aporte = mayor prioridad</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
