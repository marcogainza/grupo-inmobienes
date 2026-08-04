export default function CTAAsesoria() {
  return (
    <section className="bg-emerald-500 py-16">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <span className="text-xs font-semibold uppercase tracking-widest text-emerald-950/70">
          Da el primer paso
        </span>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
          Empieza hoy a planificar tu vivienda propia
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-slate-900/80">
          Agenda una asesoría gratuita y descubre cómo funciona el sistema de
          compra programada. Sin compromisos, sin letras pequeñas.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3">
          <a
            href="#contacto"
            className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Quiero mi asesoría gratuita
          </a>
          <a
            href="tel:0991052697"
            className="text-sm font-medium text-slate-950/80 underline"
          >
            O llámanos: 0991052697
          </a>
        </div>
      </div>
    </section>
  );
}
