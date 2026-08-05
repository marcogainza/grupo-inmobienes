import Image from "next/image";

const SOCIALS = [
  {
    name: "Instagram",
    href: "https://instagram.com/inmo_bienes_ec",
    path: "M12 2c-2.72 0-3.06.01-4.12.06-1.06.05-1.79.22-2.43.47a4.9 4.9 0 0 0-1.77 1.15A4.9 4.9 0 0 0 2.53 5.45c-.25.64-.42 1.37-.47 2.43C2.01 8.94 2 9.28 2 12s.01 3.06.06 4.12c.05 1.06.22 1.79.47 2.43a4.9 4.9 0 0 0 1.15 1.77 4.9 4.9 0 0 0 1.77 1.15c.64.25 1.37.42 2.43.47C8.94 21.99 9.28 22 12 22s3.06-.01 4.12-.06c1.06-.05 1.79-.22 2.43-.47a4.9 4.9 0 0 0 1.77-1.15 4.9 4.9 0 0 0 1.15-1.77c.25-.64.42-1.37.47-2.43.05-1.06.06-1.4.06-4.12s-.01-3.06-.06-4.12c-.05-1.06-.22-1.79-.47-2.43a4.9 4.9 0 0 0-1.15-1.77A4.9 4.9 0 0 0 18.55 2.53c-.64-.25-1.37-.42-2.43-.47C15.06 2.01 14.72 2 12 2Zm0 1.8c2.67 0 2.99.01 4.04.06.98.04 1.5.2 1.85.34.47.18.8.4 1.15.75.35.35.57.68.75 1.15.14.36.3.87.34 1.85.05 1.05.06 1.37.06 4.04s-.01 2.99-.06 4.04c-.04.98-.2 1.5-.34 1.85-.18.47-.4.8-.75 1.15-.35.35-.68.57-1.15.75-.36.14-.87.3-1.85.34-1.05.05-1.37.06-4.04.06s-2.99-.01-4.04-.06c-.98-.04-1.5-.2-1.85-.34a3.1 3.1 0 0 1-1.15-.75 3.1 3.1 0 0 1-.75-1.15c-.14-.36-.3-.87-.34-1.85C3.81 14.99 3.8 14.67 3.8 12s.01-2.99.06-4.04c.04-.98.2-1.5.34-1.85.18-.47.4-.8.75-1.15.35-.35.68-.57 1.15-.75.36-.14.87-.3 1.85-.34C9.01 3.81 9.33 3.8 12 3.8Zm0 3.05a5.15 5.15 0 1 0 0 10.3 5.15 5.15 0 0 0 0-10.3Zm0 8.5a3.35 3.35 0 1 1 0-6.7 3.35 3.35 0 0 1 0 6.7Zm5.36-8.7a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0Z",
  },
  {
    name: "TikTok",
    href: "https://tiktok.com/@inmobienesec",
    path: "M16.6 2h-3.3v13.9c0 1.6-1.3 3-3 3s-3-1.3-3-3 1.3-3 3-3c.3 0 .6 0 .9.1V9.7c-.3 0-.6-.1-.9-.1-3.6 0-6.5 2.9-6.5 6.5S9.7 22.6 13.3 22.6s6.5-2.9 6.5-6.5V9.1c1.3.9 2.9 1.5 4.6 1.5V7.3c-2.6-.1-4.8-2.3-4.8-5.1V2h-3Z",
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/593991052697",
    path: "M16.004 2.667c-7.363 0-13.334 5.97-13.334 13.333 0 2.353.615 4.646 1.782 6.666L2.667 29.333l6.84-1.794a13.27 13.27 0 0 0 6.497 1.694h.006c7.362 0 13.333-5.97 13.333-13.333 0-3.56-1.387-6.907-3.905-9.427a13.24 13.24 0 0 0-9.43-3.906Zm0 24.4h-.005a11.08 11.08 0 0 1-5.646-1.546l-.405-.24-4.06 1.065 1.084-3.958-.264-.407a11.05 11.05 0 0 1-1.69-5.885c0-6.122 4.982-11.103 11.108-11.103a11.04 11.04 0 0 1 7.85 3.256 11.04 11.04 0 0 1 3.253 7.856c-.002 6.122-4.983 11.103-11.106 11.103Zm6.09-8.318c-.334-.167-1.974-.973-2.28-1.084-.306-.112-.528-.167-.75.167-.222.333-.86 1.084-1.055 1.306-.194.223-.389.25-.722.084-.334-.167-1.409-.52-2.684-1.657-.992-.885-1.663-1.978-1.858-2.311-.194-.334-.02-.514.147-.68.15-.15.334-.39.5-.585.168-.195.223-.334.334-.556.111-.223.056-.417-.028-.584-.083-.167-.75-1.807-1.028-2.474-.27-.65-.545-.562-.75-.573-.194-.01-.417-.012-.639-.012-.222 0-.583.084-.888.417-.306.334-1.167 1.14-1.167 2.78 0 1.638 1.195 3.222 1.362 3.444.167.223 2.354 3.594 5.703 5.041.797.344 1.418.55 1.903.704.8.254 1.528.218 2.104.132.642-.096 1.974-.807 2.252-1.585.278-.779.278-1.446.194-1.586-.083-.14-.306-.223-.639-.39Z",
    viewBox: "0 0 32 32",
  },
];

export default function Footer() {
  return (
    <footer className="bg-navy py-12 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image
              src="/logo-inmo-blanco.png"
              alt="Grupo Inmobienes"
              width={160}
              height={35}
              className="h-8 w-auto"
            />
            <p className="mt-3 max-w-xs text-sm text-slate-400">
              Tu vivienda propia, al alcance de tu plan. Sistema de compra
              programada sin banco.
            </p>
            <div className="mt-4 flex items-center gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-slate-300 transition hover:border-gold/40 hover:text-gold"
                >
                  <svg
                    viewBox={s.viewBox ?? "0 0 24 24"}
                    className="h-4 w-4"
                    fill="currentColor"
                  >
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gold">
              Email
            </p>
            <a
              href="mailto:ginmobienes@gmail.com"
              className="mt-1 block text-sm hover:text-gold hover:underline"
            >
              ginmobienes@gmail.com
            </a>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gold">
              Teléfono
            </p>
            <a
              href="tel:+593991052697"
              className="mt-1 block text-sm hover:text-gold hover:underline"
            >
              +593 99 105 2697
            </a>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gold">
              Ubicación
            </p>
            <p className="mt-1 text-sm">
              Quito y Guayaquil — Atención nacional
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Grupo Inmobienes. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <a
              href="/politica-de-privacidad"
              className="hover:text-gold hover:underline"
            >
              Política de Privacidad
            </a>
            <a
              href="/terminos-y-condiciones"
              className="hover:text-gold hover:underline"
            >
              Términos y Condiciones
            </a>
          </div>
        </div>

        <p className="mt-6 text-center text-[11px] text-slate-600">
          Diseñado por{" "}
          <a
            href="https://marketing-infinito.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-400 hover:underline"
          >
            Agencia Marketing Infinito ♾️
          </a>
        </p>
      </div>
    </footer>
  );
}
