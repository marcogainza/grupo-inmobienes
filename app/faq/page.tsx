import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Preguntas Frecuentes",
  description:
    "Todas las respuestas sobre el sistema de compra programada de inmuebles de Grupo Inmobienes: adjudicación, pagos, requisitos y más.",
};

const FAQS = [
  {
    category: "Conceptos básicos",
    items: [
      {
        q: "¿En qué consiste un plan de compra programada?",
        a: "Es un sistema de autofinanciamiento con el objetivo de lograr la adquisición de un bien en particular.",
      },
      {
        q: "¿Qué es exactamente la compra programada y en qué se diferencia de un crédito bancario?",
        a: "A diferencia de un crédito, donde el banco te presta dinero con una tasa de interés alta para una compra inmediata, la compra programada es un sistema de planificación inteligente. Aquí, tú aportas a un fondo común junto con otros clientes para adquirir un bien sin los intereses bancarios tradicionales. Es ideal para quienes buscan cuotas más bajas, accesibles y una gestión financiera más saludable.",
      },
      {
        q: "¿Qué es un grupo y cuántas personas hay en cada uno?",
        a: "Es una cantidad limitada de personas que se unen con el objetivo de adquirir un bien similar: 299 personas por cada grupo.",
      },
    ],
  },
  {
    category: "Proceso de adjudicación",
    items: [
      {
        q: "¿Cómo funciona la adjudicación?",
        a: "Es un evento público donde nuestros clientes resultan favorecidos con la adjudicación para adquirir sus bienes.",
      },
      {
        q: "¿Qué es una asamblea?",
        a: "Son actos públicos mediante los cuales un notario declara y certifica la adjudicación o designación del bien al cliente que se encuentre al día en sus pagos mensuales y no haya sido favorecido anteriormente.",
      },
      {
        q: "¿De qué formas puedo empezar a construir mi patrimonio (adjudicación)?",
        a: "Existen principalmente dos caminos claros y transparentes a través del fondo común de aportes: Sorteo, donde todos los meses los clientes que están al día en sus cuotas participan en un proceso donde se elige a un ganador de forma aleatoria y equitativa; y Licitación, donde si deseas acelerar el proceso puedes adelantar un número determinado de cuotas — quien presente la oferta más alta dentro de su grupo en la asamblea mensual se adjudica el bien, dándote control sobre cuándo recibirlo.",
      },
      {
        q: "¿Qué es licitación?",
        a: "Consiste en adjudicar el bien a los clientes que ofrezcan cancelar anticipadamente el mayor número de cuotas mensuales completas (oferta), siempre y cuando los recursos del grupo lo permitan, y se efectúa después de realizada la asignación de cupos por el mecanismo de sorteo en cada uno de los grupos.",
      },
      {
        q: "¿Cómo realizo una licitación (oferta)?",
        a: "Puedes comunicarte de manera directa con un representante de Postventa, quien te asesorará detalladamente sobre este tema.",
      },
    ],
  },
  {
    category: "Selección de bien y pagos",
    items: [
      {
        q: "¿Puedo elegir cualquier inmueble?",
        a: "¡Absolutamente! Esa es una de nuestras mayores ventajas. No estamos atados a un solo proyecto. Gracias a nuestras alianzas, puedes elegir tu bien basado en el monto programado: un departamento, una casa, o lo que prefieras.",
      },
      {
        q: "¿Qué pasa si el inmueble que quiero cuesta más que mi plan?",
        a: "Si el bien seleccionado es mayor, se cubre la diferencia al momento de la adjudicación. Si es menor, el excedente se aplica directamente a las cuotas finales de tu planificación.",
      },
      {
        q: "¿De cuántas cuotas es mi plan de compra programada?",
        a: "El plazo estándar establecido para el plan de compra programada es de un mínimo de 60 meses y un máximo de 180 meses.",
      },
      {
        q: "¿Las cuotas varían en años siguientes?",
        a: "No, al momento de firmar el contrato las cuotas se mantienen fijas por el plazo establecido. La única excepción es si existiera un cambio legal directo en temas de impuestos nacionales.",
      },
      {
        q: "¿Cuáles son las formas de pago?",
        a: "Habilitamos múltiples facilidades para tu comodidad: efectivo, transferencia bancaria y tarjeta de crédito.",
      },
    ],
  },
  {
    category: "Requisitos, seguridad y políticas",
    items: [
      {
        q: "¿Cómo se garantiza que mi dinero está seguro y que recibiré el inmueble?",
        a: "La transparencia es nuestra base fundamental. Inmobienes es una compañía legalmente constituida en el Ecuador y regulada bajo la normativa vigente de la Superintendencia de Compañías. Cada proceso de adjudicación es verificado públicamente y los fondos se gestionan de forma exclusiva para la adquisición del inmueble de los miembros del grupo.",
      },
      {
        q: "¿Cuáles son los requisitos para inscribirme a un plan?",
        a: "Escoge el plan que más se acopla a tus necesidades de presupuesto, cancela la inscripción junto a la primera cuota, firma el contrato formal, recibe la llamada de verificación interna y listo: empiezas a formar parte de tu grupo.",
      },
      {
        q: "¿Quiénes no pueden acceder a un plan de compra programada?",
        a: "Por políticas de cumplimiento normativo y legal, el acceso no está disponible para: menores de edad, personas con antecedentes penales y procesos vigentes, personas en listas restrictivas e internacionales, y personas que no pueden justificar ingresos.",
      },
      {
        q: "¿Qué sucede si mi situación económica cambia y no puedo seguir pagando?",
        a: "Entendemos perfectamente que la vida tiene imprevistos. A diferencia de la rigidez tradicional bancaria, ofrecemos opciones de cesión de derechos (traspasar legalmente tu plan a un tercero) o análisis personalizado de reestructuración. La transparencia implica acompañarte en todo el camino para proteger tu inversión.",
      },
      {
        q: "En caso de que no desee continuar, ¿cuándo recibo la devolución de mis aportes?",
        a: "Cuando finalice formalmente el plazo fijado en el contrato del grupo, se podrá realizar el respectivo proceso de liquidación y devolución de haberes.",
      },
      {
        q: "¿Qué gastos adicionales debo considerar al momento de la entrega?",
        a: "Para que no haya sorpresas de última hora, debes considerar los gastos administrativos correspondientes a la gestión de entrega. Todos estos valores se detallan con absoluta claridad en tu contrato físico desde el inicio.",
      },
    ],
  },
  {
    category: "Ubicaciones y puntos de atención",
    items: [
      {
        q: "¿Dónde puedo visitarlos a nivel nacional?",
        a: "Contamos con presencia estratégica en las principales ciudades del país: Guayaquil (Alborada, etapa II, villa 12, Mz. 21, frente a Créditos Económicos) y Quito (Av. Los Shyris e Isla Floreana, local esquinero).",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <div className="flex min-h-full flex-col">
      <Nav />
      <main className="flex-1 bg-white py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-accent">
            Dudas resueltas
          </span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Preguntas Frecuentes
          </h1>
          <p className="mt-4 text-slate-600">
            Todo lo que necesitas saber sobre el sistema de compra programada
            de Grupo Inmobienes.
          </p>

          <div className="mt-10 space-y-10">
            {FAQS.map((group) => (
              <div key={group.category}>
                <h2 className="text-xs font-semibold uppercase tracking-widest text-gold">
                  {group.category}
                </h2>
                <div className="mt-4 divide-y divide-slate-200 rounded-2xl border border-slate-200">
                  {group.items.map((item) => (
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
                      <p className="mt-3 text-sm leading-relaxed text-slate-600">
                        {item.a}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-600">
            <p className="font-semibold text-slate-900">
              ¿Aún tienes dudas adicionales?
            </p>
            <p className="mt-1">
              Nuestro equipo de atención al cliente está listo para
              explicarte a detalle las ventajas de nuestro modelo comercial.
            </p>
            <p className="mt-3">💬 WhatsApp +593 99 105 2697</p>
            <p>✉️ info@grupoinmobienes.com.ec</p>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
