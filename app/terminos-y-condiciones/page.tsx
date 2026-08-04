import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description: "Términos y Condiciones de uso del sitio de Grupo Inmobienes S.A.",
};

const CLAUSULAS = [
  {
    n: "01",
    title: "Aceptación Expresa y Obligatoria",
    body: `El acceso, navegación y uso del sitio web de Grupo Inmobienes S.A. implica la aceptación expresa, libre, informada, incondicional y obligatoria de los presentes Términos y Condiciones. Si el usuario no está de acuerdo, deberá abstenerse de utilizar el sitio o proporcionar información personal.\n\nEl uso del sitio genera efectos jurídicos vinculantes en los términos aquí establecidos con respecto a la naturaleza del servicio ofrecido.`,
  },
  {
    n: "02",
    title: "Identificación del Titular",
    body: `El sitio web es operado por Grupo Inmobienes S.A., sociedad legalmente constituida en la República del Ecuador.`,
  },
  {
    n: "03",
    title: "Naturaleza del Modelo de Negocio",
    body: `El usuario declara expresamente que entiende y acepta que:\n\n• Grupo Inmobienes S.A. NO es una entidad financiera\n• Grupo Inmobienes S.A. NO es banco, cooperativa ni institución de crédito\n• Grupo Inmobienes S.A. NO otorga préstamos, créditos ni financiamiento\n• Grupo Inmobienes S.A. NO realiza intermediación financiera\n• Grupo Inmobienes S.A. NO capta dinero del público como actividad financiera regulada\n\nEl modelo de negocio corresponde exclusivamente a un servicio de COMPRA PROGRAMADA DE INMUEBLES, de naturaleza comercial, no financiera, sujeto a normativa de la Superintendencia de Compañías, Valores y Seguros del Ecuador conforme a la Resolución No. SCVS-INC-DNCDN-2024-0010 y su reforma No. SCVS-INC-DNCDN-2024-0017. El usuario reconoce que el servicio prestado únicamente tiene dos modalidades de adjudicación: por Sorteo o Licitación. El inmueble que el titular detalle en el formulario únicamente es referencial y no genera obligación alguna a Grupo Inmobienes S.A. de entregarlo, y no crea relación comercial alguna hasta la suscripción formal del contrato de gestión de compra programada, cuyo objeto únicamente es la intermediación para la adquisición de un inmueble que es elegido por el titular en caso de ser adjudicado bajo las modalidades antes mencionadas.`,
  },
  {
    n: "04",
    title: "No Oferta Financiera ni Compromiso de Resultado",
    body: `Toda información publicada tiene carácter estrictamente informativo y comercial. En ningún caso constituye:\n\n• Oferta de crédito\n• Promesa de financiamiento\n• Garantía de adjudicación inmediata\n• Garantía de entrega en plazo fijo\n• Compromiso automático de asignación de inmueble\n\nToda relación contractual queda sujeta a evaluación interna, condiciones del sistema de compra programada y suscripción formal de contrato de gestión de compra programada.`,
  },
  {
    n: "05",
    title: "Contratación Válida Únicamente por Escrito",
    body: `No existe relación contractual válida por formularios web, chats, mensajes de WhatsApp o publicidad digital.\n\nLa única forma de vinculación jurídica válida es mediante la firma expresa de contrato físico autorizado por la compañía.`,
  },
  {
    n: "06",
    title: "Propiedad Intelectual",
    body: `Todo el contenido disponible en el sitio web de Grupo Inmobienes S.A., incluyendo de manera enunciativa mas no limitativa: textos, diseños, interfaces, código fuente, bases de datos, imágenes, fotografías, videos, audios, logotipos, marcas, signos distintivos, eslóganes, estructura del sitio, arquitectura de información, simuladores, herramientas digitales, materiales comerciales, presentaciones, y cualquier otro contenido digital o físico asociado, es propiedad exclusiva de Grupo Inmobienes S.A. o de terceros que han otorgado las respectivas licencias de uso. Queda estrictamente prohibido al usuario, sin autorización previa, expresa y por escrito de GRUPO INMOBIENES:\n\n• Copiar, reproducir, distribuir, transmitir, publicar o modificar cualquier contenido del sitio web\n• Utilizar el contenido para fines comerciales, promocionales o competitivos\n• Crear obras derivadas basadas en el contenido del sitio\n• Usar la marca, logotipos o identidad visual de la compañía de forma directa o indirecta`,
  },
];

export default function TerminosCondicionesPage() {
  return (
    <div className="flex min-h-full flex-col">
      <Nav />
      <main className="flex-1 bg-white py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-accent">
            Legal
          </span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Términos y Condiciones
          </h1>
          <p className="mt-4 text-slate-600">
            Términos y Condiciones de uso del sitio web de Grupo Inmobienes
            S.A.
          </p>

          <div className="mt-10 space-y-8">
            {CLAUSULAS.map((c) => (
              <div key={c.n} className="border-t border-slate-100 pt-6">
                <p className="text-xs font-semibold text-gold">
                  CLÁUSULA {c.n}
                </p>
                <h2 className="mt-1 text-lg font-bold text-slate-900">
                  {c.title}
                </h2>
                <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-slate-600">
                  {c.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
            <p className="font-semibold text-slate-900">¿Tienes preguntas?</p>
            <p className="mt-1">
              Si tienes dudas sobre estos Términos y Condiciones o sobre el
              servicio de compra programada, nuestro equipo está disponible
              para orientarte.
            </p>
            <p className="mt-3">✉️ ginmobienes@gmail.com</p>
            <p>📞 099 105 2697</p>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
