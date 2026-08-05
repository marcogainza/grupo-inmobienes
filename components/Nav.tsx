"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Los anchors apuntan a "/#id" (no solo "#id") para que funcionen desde
// cualquier página del sitio (Blog, FAQ, Términos, Política), no solo desde
// la home. next/link navega a "/" y hace scroll al elemento correspondiente.
const LINKS = [
  { href: "/#como-funciona", label: "¿Cómo funciona?" },
  { href: "/#beneficios", label: "Beneficios" },
  { href: "/#inmuebles", label: "Inmuebles" },
  { href: "/#testimonios", label: "Testimonios" },
  { href: "/#agencias", label: "Agencias" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#blog", label: "Blog" },
  { href: "/#contacto", label: "Contacto" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-navy/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-white">
          <Image
            src="/logo-inmo-blanco.png"
            alt="Grupo Inmobienes"
            width={160}
            height={35}
            className="h-8 w-auto"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-5 lg:flex">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative text-sm text-slate-300 transition hover:text-white"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/dashboard"
            className="rounded-full border border-gold/40 px-4 py-2 text-sm font-medium text-gold transition hover:scale-105 hover:bg-gold/10"
          >
            🤝 Transparencia
          </Link>
          <Link
            href="/#contacto"
            className="rounded-full bg-gold px-4 py-2 text-sm font-semibold text-navy transition hover:scale-105 hover:bg-gold-dark"
          >
            Comenzar ahora
          </Link>
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
        <div className="border-t border-white/10 bg-navy px-4 pb-4 lg:hidden">
          <nav className="flex flex-col gap-3 pt-3">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm text-slate-300 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-gold"
            >
              🤝 Transparencia
            </Link>
            <Link
              href="/#contacto"
              onClick={() => setOpen(false)}
              className="rounded-full bg-gold/100 px-4 py-2 text-center text-sm font-semibold text-navy"
            >
              Comenzar ahora
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
