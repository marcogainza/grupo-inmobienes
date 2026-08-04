import Link from "next/link";
import SectionEyebrow from "./SectionEyebrow";
import Reveal from "@/components/motion/Reveal";

const FAQS = [
  {
    q: "¿En qué consiste un plan de compra programada?",
    a: "Es un sistema de autofinanciamiento con el objetivo de lograr la adquisición de un bien en particular.",
  },
  {
    q: "¿Qué es exactamente la compra programada y en qué se diferencia de un crédito bancario?",
    a: "A diferencia de un crédito, la compra programada es un sistema de planificación inteligente: tú aportas a un fondo común junto con otros clientes para adquirir un bien sin los intereses bancarios tradicionales.",
  },
  {
    q: "¿Qué es un grupo y cuántas personas hay en cada uno?",
    a: "Es una cantidad limitada de personas que se unen con el objetivo de adquirir un bien similar: 299 personas por cada grupo.",
  },
  {
    q: "¿Cómo funciona la adjudicación?",
    a: "Es un evento público donde nuestros clientes resultan favorecidos con la adjudicación para adquirir sus bienes, por sorteo o licitación.",
  },
  {
    q: "¿Qué es una asamblea?",
    a: "Son actos públicos mediante los cuales un notario declara y certifica la adjudicación del bien al cliente que se encuentre al día en sus pagos y no haya sido favorecido anteriormente.",
  },
  {
    q: "¿De qué formas puedo empezar a construir mi patrimonio (adjudicación)?",
    a: "Mediante sorteo mensual (participación igualitaria) o licitación (adelantando cuotas para acelerar tu adjudicación).",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="bg-white py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionEyebrow text="Dudas resueltas" />
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Preguntas Frecuentes
        </h2>
        <p className="mt-4 text-slate-600">
          Selecciona una pregunta para conocer más detalles sobre nuestro
          sistema de compra programada.
        </p>

        <Reveal>
          <div className="mt-10 divide-y divide-slate-200 rounded-2xl border border-slate-200">
            {FAQS.map((item) => (
              <details
                key={item.q}
                className="group p-6 transition-colors hover:bg-slate-50"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-slate-900 marker:content-none">
                  {item.q}
                  <span className="shrink-0 text-blue-accent transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </Reveal>

        <p className="mt-8 text-center text-sm text-slate-500">
          ¿No encontraste lo que buscabas?{" "}
          <Link
            href="/faq"
            className="font-semibold text-blue-accent hover:underline"
          >
            Ve todas las preguntas frecuentes →
          </Link>
        </p>
      </div>
    </section>
  );
}
