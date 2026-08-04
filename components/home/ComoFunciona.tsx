import SectionEyebrow from "./SectionEyebrow";
import Reveal from "@/components/motion/Reveal";

const STEPS = [
  {
    n: "01",
    title: "Afíliate",
    text: "Ingresa a tu plan programado de compra de vivienda. Sin revisión de buró de crédito, sin garante.",
  },
  {
    n: "02",
    title: "Aporta",
    text: "Realiza tus aportes mensuales accesibles y flexibles. Cada pago te acerca más a tu vivienda propia.",
  },
  {
    n: "03",
    title: "Adjudicación",
    text: "Por sorteo mensual o licitación. A mayor aporte adicional, mayor posibilidad de ser adjudicado antes.",
  },
  {
    n: "04",
    title: "Elige tu bien",
    text: "Casa / departamento, local comercial o terreno. Tú eliges el inmueble que quieras en cualquier ciudad de Ecuador.",
  },
];

export default function ComoFunciona() {
  return (
    <section id="como-funciona" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <SectionEyebrow text="Proceso simple" />
          <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Tu vivienda en 4 pasos
          </h2>
          <p className="mt-4 max-w-2xl text-slate-600">
            Un sistema claro, transparente y diseñado para que cualquier
            familia ecuatoriana pueda acceder a su vivienda propia.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <Reveal key={step.n} delay={i * 0.1}>
              <div className="h-full rounded-2xl border border-slate-100 bg-slate-50 p-6 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-lg">
                <span className="text-3xl font-bold text-blue-accent">
                  {step.n}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="#contacto"
            className="inline-block rounded-full bg-gold px-6 py-3 text-sm font-semibold text-white transition hover:scale-105 hover:bg-gold-dark"
          >
            Quiero comenzar mi plan
          </a>
        </div>
      </div>
    </section>
  );
}
