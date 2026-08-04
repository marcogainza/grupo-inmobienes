import SectionEyebrow from "./SectionEyebrow";

const FAQS = [
  {
    q: "¿En qué consiste un plan de compra programada?",
    a: "Es un sistema de ahorro colectivo en el que te afilias a un grupo, realizas aportes mensuales y accedes a la adjudicación de tu bien por sorteo o licitación, sin necesidad de un crédito bancario tradicional.",
  },
  {
    q: "¿Qué es exactamente la compra programada y en qué se diferencia de un crédito bancario?",
    a: "A diferencia de un crédito bancario, no se evalúa historial crediticio ni se exige garante. Tus aportes conforman un fondo común que se adjudica periódicamente entre los participantes activos.",
  },
  {
    q: "¿Qué es un grupo y cuántas personas hay en cada uno?",
    a: "Un grupo es el conjunto de afiliados que comparten un mismo plan y calendario de adjudicaciones. El tamaño varía según el monto y plazo del plan contratado.",
  },
  {
    q: "¿Cómo funciona la adjudicación?",
    a: "Cada mes se realiza un sorteo público entre los afiliados al día en sus aportes. También puedes optar por licitación, aportando un monto adicional voluntario para acelerar tu adjudicación.",
  },
  {
    q: "¿Qué es una asamblea?",
    a: "Es la reunión pública, avalada ante un Notario, en la que se realiza el sorteo o la licitación mensual y se formaliza la adjudicación de los bienes.",
  },
  {
    q: "¿De qué formas puedo empezar a construir mi patrimonio (Adjudicación)?",
    a: "Mediante sorteo mensual (participación igualitaria) o licitación (aporte adicional voluntario para acelerar tu adjudicación).",
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

        <div className="mt-10 divide-y divide-slate-200 rounded-2xl border border-slate-200">
          {FAQS.map((item) => (
            <details key={item.q} className="group p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-slate-900 marker:content-none">
                {item.q}
                <span className="ml-4 text-emerald-600 transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm text-slate-600">{item.a}</p>
            </details>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-slate-500">
          ¿No encontraste lo que buscabas? Tenemos más respuestas detalladas
          listas para despejar todas tus dudas.
        </p>
      </div>
    </section>
  );
}
