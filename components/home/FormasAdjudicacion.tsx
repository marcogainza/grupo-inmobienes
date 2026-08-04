import SectionEyebrow from "./SectionEyebrow";
import Reveal from "@/components/motion/Reveal";

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
          <Reveal>
            <div className="h-full rounded-2xl border border-slate-200 bg-white p-8 transition duration-300 hover:-translate-y-1.5 hover:shadow-lg">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-accent/10 text-2xl">
                🎲
              </span>
              <h3 className="mt-4 text-xl font-bold text-slate-900">
                Sorteo mensual
              </h3>
              <p className="mt-3 text-sm text-slate-600">
                Cada mes realizamos un sorteo entre todos los afiliados
                activos al día en sus aportes. Cualquier participante tiene la
                misma oportunidad de ser adjudicado sin importar el monto
                acumulado.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-slate-700">
                <li>✓ Participación igualitaria</li>
                <li>✓ Sin costo adicional</li>
                <li>✓ Sorteo público y verificable</li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative h-full rounded-2xl border-2 border-gold bg-white p-8 transition duration-300 hover:-translate-y-1.5 hover:shadow-lg">
              <span className="absolute -top-3 right-6 rounded-full bg-gold px-3 py-1 text-xs font-bold text-white">
                RECOMENDADO
              </span>
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-2xl">
                📈
              </span>
              <h3 className="mt-4 text-xl font-bold text-slate-900">
                Licitación
              </h3>
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
          </Reveal>
        </div>
      </div>
    </section>
  );
}
