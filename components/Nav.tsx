"use client";

import Link from "next/link";
import { useState } from "react";

const LINKS = [
  { href: "#como-funciona", label: "¿Cómo funciona?" },
  { href: "#beneficios", label: "Beneficios" },
  { href: "#inmuebles", label: "Inmuebles" },
  { href: "#testimonios", label: "Testimonios" },
  { href: "#agencias", label: "Agencias" },
  { href: "#faq", label: "FAQ" },
  { href: "#blog", label: "Blog" },
  { href: "#contacto", label: "Contacto" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-white">
          <span className="text-lg font-bold tracking-tight">
            Grupo <span className="text-emerald-400">INMOBIENES</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-slate-300 transition hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/dashboard"
            className="rounded-full border border-emerald-400/40 px-4 py-2 text-sm font-medium text-emerald-300 transition hover:bg-emerald-400/10"
          >
            🤝 Transparencia
          </Link>
          <a
            href="#contacto"
            className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
          >
            Comenzar ahora
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded-md border border-white/20 p-2 text-white lg:hidden"
          aria-label="Abrir menú"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-slate-950 px-4 pb-4 lg:hidden">
          <nav className="flex flex-col gap-3 pt-3">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm text-slate-300 hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/dashboard"
              className="text-sm font-medium text-emerald-300"
            >
              🤝 Transparencia
            </Link>
            <a
              href="#contacto"
              onClick={() => setOpen(false)}
              className="rounded-full bg-emerald-500 px-4 py-2 text-center text-sm font-semibold text-slate-950"
            >
              Comenzar ahora
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
