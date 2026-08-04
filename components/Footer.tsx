export default function Footer() {
  return (
    <footer className="bg-slate-950 py-12 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-lg font-bold text-white">
              Grupo <span className="text-emerald-400">INMOBIENES</span>
            </p>
            <p className="mt-2 text-sm text-slate-400">
              Tu vivienda propia, al alcance de tu plan.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-400">
              Email
            </p>
            <p className="mt-1 text-sm">ginmobienes@gmail.com</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-400">
              Teléfono
            </p>
            <p className="mt-1 text-sm">+593 99 105 2697</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-400">
              Ubicación
            </p>
            <p className="mt-1 text-sm">Quito y Guayaquil — Atención nacional</p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-emerald-400">
              Redes
            </p>
            <p className="mt-1 text-sm">@inmo_bienes_ec · @inmobienesec</p>
          </div>
        </div>
        <div className="mt-8 border-t border-white/10 pt-6 text-xs text-slate-500">
          © {new Date().getFullYear()} Grupo Inmobienes. Todos los derechos
          reservados.
        </div>
      </div>
    </footer>
  );
}
