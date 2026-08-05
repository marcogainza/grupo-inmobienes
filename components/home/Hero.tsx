"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

type Slide = {
  bg: string;
  eyebrowIcon: string;
  eyebrow: string;
  title: string;
  description: string;
  badgeIcon: string;
  badgeLabel: string;
  badgeValue: string;
  images: [string, string, string];
};

const SLIDES: Slide[] = [
  {
    bg: "/empresa-0.jpg",
    eyebrowIcon: "🏢",
    eyebrow: "Tu meta inmobiliaria, planificada",
    title: "Planificamos tu futuro inmobiliario",
    description:
      "Hacemos posible la adquisición de tus bienes mediante un sistema de compra programada flexible, seguro y diseñado a tu medida. El camino inteligente para construir tu patrimonio con total tranquilidad.",
    badgeIcon: "🔒",
    badgeLabel: "Inversión asegurada",
    badgeValue: "Grupo INMOBIENES",
    images: ["/jaqueline.jpg", "/mario.jpg", "/fanny.jpg"],
  },
  {
    bg: "/local-1.jpg",
    eyebrowIcon: "🏠",
    eyebrow: "Tu propio hogar, sin garantes",
    title: "Tu propio hogar, bajo tus condiciones",
    description:
      "Deja de pagar arriendo y empieza a invertir en lo tuyo. Accede a tu vivienda propia de forma planificada, con cuotas cómodas, sin garantes y sin revisión de buró.",
    badgeIcon: "🏡",
    badgeLabel: "Plan casa",
    badgeValue: "Desde $288.75/Mes",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
      "/venucia.jpg",
    ],
  },
  {
    bg: "/local-2.jpg",
    eyebrowIcon: "🏬",
    eyebrow: "Tu local, tu propio negocio",
    title: "El espacio ideal para tu negocio",
    description:
      "Deja de alquilar y haz crecer tu empresa en tu propio local comercial. Asegura la ubicación que tu marca merece con un plan de financiamiento directo y sin complicaciones.",
    badgeIcon: "🛒",
    badgeLabel: "Plan comercial",
    badgeValue: "Desde $288.75/Mes",
    images: [
      "/local-2.jpg",
      "/local-3.jpg",
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
    ],
  },
  {
    bg: "/terreno-0.jpg",
    eyebrowIcon: "🌱",
    eyebrow: "TERRENOS Y PROYECTOS",
    title: "Construye tu patrimonio desde la base",
    description:
      "Adquiere el terreno ideal para tu próximo proyecto o vivienda. Invierte de manera segura, con plazos flexibles y aprobación inmediata, sin requisitos inalcanzables ni trámites burocráticos interminables.",
    badgeIcon: "🌱",
    badgeLabel: "Plan terreno",
    badgeValue: "Desde $288.75/Mes",
    images: ["/terreno-1.jpg", "/terreno-2.jpg", "/terreno-3.jpg"],
  },
];

const AUTO_ADVANCE_MS = 8000;

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, []);

  const slide = SLIDES[index];

  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.bg + index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
        >
          <Image src={slide.bg} alt="" fill priority className="object-cover" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(27,44,66,0.92) 0%, rgba(27,44,66,0.75) 55%, rgba(27,44,66,0.4) 100%)",
            }}
          />
        </motion.div>
      </AnimatePresence>

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-gold">
              {slide.eyebrowIcon} {slide.eyebrow}
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              {slide.title}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-slate-300">
              {slide.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#contacto"
                className="rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy transition hover:scale-105 hover:bg-gold-dark"
              >
                Comenzar ahora
              </a>
              <a
                href="#como-funciona"
                className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:scale-105 hover:bg-white/10"
              >
                ¿Cómo funciona?
              </a>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-300">
              <li>✓ Sin crédito hipotecario</li>
              <li>✓ Asesoría personalizada</li>
              <li>✓ 100% Ecuador</li>
            </ul>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center lg:justify-end">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex w-full max-w-md flex-col items-center gap-5 sm:max-w-lg"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="w-44 rounded-xl border border-white/10 bg-navy/90 px-3 py-2.5 text-center shadow-2xl backdrop-blur"
              >
                <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-gold/20 text-base">
                  {slide.badgeIcon}
                </div>
                <p className="mt-1.5 text-[8px] font-semibold uppercase tracking-widest text-gold">
                  {slide.badgeLabel}
                </p>
                <p className="mt-0.5 text-xs font-bold">{slide.badgeValue}</p>
              </motion.div>

              <div className="grid w-full grid-cols-3 items-end gap-2 sm:gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.06, y: -4 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="min-w-0"
                >
                  <Image
                    src={slide.images[0]}
                    alt=""
                    width={200}
                    height={280}
                    className="h-32 w-full rounded-2xl border-2 border-white/20 object-cover shadow-xl transition-shadow duration-300 hover:shadow-2xl hover:border-gold/50 sm:h-44"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.06, y: -6 }}
                  transition={{ duration: 0.5, delay: 0.35 }}
                  className="min-w-0"
                >
                  <Image
                    src={slide.images[1]}
                    alt=""
                    width={220}
                    height={300}
                    className="h-40 w-full rounded-2xl border-2 border-gold/60 object-cover shadow-2xl transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(212,175,55,0.35)] sm:h-56"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.06, y: -4 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="min-w-0"
                >
                  <Image
                    src={slide.images[2]}
                    alt=""
                    width={200}
                    height={280}
                    className="h-32 w-full rounded-2xl border-2 border-white/20 object-cover shadow-xl transition-shadow duration-300 hover:shadow-2xl hover:border-gold/50 sm:h-44"
                  />
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="relative flex justify-center gap-2 pb-6 lg:absolute lg:bottom-6 lg:left-6 lg:justify-start lg:pb-0">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Ir al slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-8 bg-gold" : "w-4 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
