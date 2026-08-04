import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Política de Privacidad y Protección de Datos Personales de Grupo Inmobienes S.A.",
};

const CLAUSULAS = [
  {
    n: "01",
    title: "Identificación del Responsable",
    body: `Grupo Inmobienes S.A. (en adelante, "Grupo Inmobienes", "GRUPO INMOBIENES" o "la Compañía"), es una sociedad legalmente constituida en la República del Ecuador, dedicada a la compra programada de inmuebles bajo las modalidades de sorteo o licitación sujeto a normativa de la Superintendencia de Compañías, Valores y Seguros del Ecuador conforme a la Resolución No. SCVS-INC-DNCDN-2024-0010 y su reforma No. SCVS-INC-DNCDN-2024-0017. Grupo Inmobienes actuará como responsable del tratamiento de los datos personales que recopila dentro del desarrollo de sus actividades comerciales, contractuales, administrativas y de marketing. Grupo Inmobienes podrá actuar directamente o a través de terceros encargados del tratamiento, garantizando en todo momento el cumplimiento de la Ley Orgánica de Protección de Datos Personales, su reglamento y demás normativa aplicable.`,
  },
  {
    n: "02",
    title: "Aceptación de la Política",
    body: `El titular de los datos personales acepta esta Política y autoriza el tratamiento de sus datos personales desde el momento en que entrega voluntariamente su información a Grupo Inmobienes mediante el formulario digital.`,
  },
  {
    n: "03",
    title: "Principios Aplicables al Tratamiento",
    body: `Grupo Inmobienes garantiza que el tratamiento de datos personales se regirá por los principios establecidos en la Ley Orgánica de Protección de Datos Personales y su reglamento.`,
  },
  {
    n: "04",
    title: "Datos Personales que se Recopilan",
    body: `En el marco de sus actividades, Grupo Inmobienes podrá recopilar:\n\n• Datos de identificación: nombres, apellidos, número de cédula o pasaporte\n• Datos de contacto: teléfono, correo electrónico, dirección\n• Datos financieros o de capacidad de pago\n• Información comercial o de comportamiento de consumo\n• Datos derivados del uso de canales digitales, formularios, cookies o CRM\n\nNo se recolectarán datos sensibles salvo autorización expresa del titular o habilitación legal.`,
  },
  {
    n: "05",
    title: "Finalidades del Tratamiento de Datos Personales",
    body: `Los datos personales serán utilizados para finalidades legítimas, incluyendo:\n\n• Gestión de prospectos comerciales y clientes potenciales\n• Ofrecimiento y promoción del servicio de compra programada de inmuebles ofrecido por Grupo Inmobienes\n• Contacto mediante llamadas, mensajes, correo electrónico o mensajería instantánea\n• Actividades de marketing directo, publicidad personalizada y remarketing\n• Evaluación de perfil comercial, capacidad de pago y viabilidad de servicios y/o evaluaciones crediticias\n• Gestión contractual, precontractual y poscontractual\n• Administración de cartera, cobranza preventiva y recuperación de obligaciones\n• Análisis estadístico, segmentación de mercado y mejora de servicios\n• Prevención de fraude, riesgos operativos y cumplimiento normativo\n\nEl titular reconoce que podrá recibir comunicaciones comerciales mientras no ejerza su derecho de oposición o supresión.`,
  },
  {
    n: "06",
    title: "Base Legal del Tratamiento",
    body: `El tratamiento de datos se fundamenta en lo determinado en el artículo 7 de la Ley de Protección de Datos Personales una vez que el titular haya dado su consentimiento expreso mediante la aceptación de la Política de Privacidad y tratamiento de datos personales.`,
  },
  {
    n: "07",
    title: "Autorización para Contacto y Marketing",
    body: `El titular autoriza expresamente a Grupo Inmobienes a contactarlo por cualquier medio físico o digital, incluyendo llamadas telefónicas, SMS, WhatsApp, correo electrónico y otros medios tecnológicos, para fines informativos, comerciales, promocionales y de fidelización. Asimismo, autoriza el uso de herramientas de CRM, segmentación de clientes, análisis de comportamiento y gestión de campañas publicitarias.`,
  },
  {
    n: "08",
    title: "Transferencia y Encargo de Datos a Terceros",
    body: `Grupo Inmobienes podrá compartir, transferir o encargar el tratamiento de datos personales a aliados comerciales y estratégicos, empresas vinculadas o relacionadas, así como a terceros encargados del tratamiento, ya sea dentro o fuera del territorio ecuatoriano, cuando ello sea necesario para el cumplimiento de las finalidades informadas en la presente Política, la ejecución de relaciones contractuales o el desarrollo de actividades comerciales y operativas de la Compañía; en todos los casos, Grupo Inmobienes exigirá que dichos terceros cumplan con estándares adecuados de protección de datos personales, garantizando la confidencialidad, seguridad y uso limitado de la información conforme a la normativa aplicable.`,
  },
  {
    n: "09",
    title: "Derechos del Titular",
    body: `El titular podrá ejercer en cualquier momento sus derechos de acceso, rectificación, actualización, eliminación, oposición, portabilidad y suspensión del tratamiento de sus datos personales, de conformidad con lo establecido en la normativa vigente en materia de protección de datos personales, para lo cual podrá solicitar información sobre los datos que Grupo Inmobienes mantiene sobre él, requerir su corrección cuando sean inexactos o incompletos, actualizar aquellos que hayan sufrido variaciones, solicitar su eliminación cuando corresponda legalmente, oponerse a determinados tratamientos, requerir la portabilidad de sus datos a otro responsable cuando sea técnicamente procedente y solicitar la suspensión del tratamiento en los casos permitidos por la ley; el ejercicio de estos derechos no estará sujeto a condiciones irrazonables, demoras injustificadas ni podrá ser restringido de manera arbitraria por Grupo Inmobienes, la cual garantizará mecanismos accesibles y efectivos para su atención dentro de los plazos legales correspondientes.\n\nAcceso: conocer qué datos tenemos sobre ti.\nRectificación: corregir datos inexactos o incompletos.\nActualización: mantener tus datos al día.\nEliminación: solicitar la supresión de tus datos.\nOposición: oponerte a determinados tratamientos.\nPortabilidad: recibir tus datos en formato reutilizable.`,
  },
  {
    n: "10",
    title: "Conservación de los Datos",
    body: `Los datos personales serán conservados durante el tiempo que sea necesario para el cumplimiento de las finalidades del tratamiento, así como mientras subsista una relación comercial, contractual o precontractual con el titular, o exista una obligación legal, regulatoria o contractual que exija su conservación. En caso de que el titular solicite la eliminación de sus datos personales, dicha solicitud será atendida conforme a la normativa aplicable y a las obligaciones legales de conservación que correspondan, pudiendo implicar la limitación, oposición o bloqueo del tratamiento en lugar de su eliminación total cuando exista un deber legal de conservación por parte de Grupo Inmobienes.`,
  },
  {
    n: "11",
    title: "Seguridad de la Información",
    body: `Grupo Inmobienes implementará medidas técnicas, organizativas y administrativas razonables para proteger los datos personales contra pérdida, acceso no autorizado, alteración o divulgación. Estas medidas incluyen controles de acceso, políticas internas de confidencialidad, respaldo de información y gestión de riesgos tecnológicos.`,
  },
  {
    n: "12",
    title: "Cookies y Tecnologías Similares",
    body: `El sitio web, plataformas digitales y demás canales electrónicos de Grupo Inmobienes podrán utilizar cookies, píxeles, identificadores de dispositivo u otras tecnologías similares con el fin de garantizar su correcto funcionamiento, mejorar la experiencia de navegación del usuario, analizar patrones de uso y comportamiento dentro de los entornos digitales, personalizar contenidos, comunicaciones y publicidad de acuerdo con los intereses del usuario, así como optimizar la efectividad de las campañas comerciales y la calidad de los servicios ofrecidos; el usuario podrá en todo momento configurar, restringir o deshabilitar el uso de cookies a través de las opciones de su navegador o dispositivo, entendiendo que dicha decisión podría afectar parcial o totalmente la funcionalidad, desempeño o disponibilidad de ciertos servicios dentro de las plataformas digitales de Grupo Inmobienes.`,
  },
  {
    n: "13",
    title: "Notificación de Incidentes",
    body: `En caso de incidentes de seguridad que comprometan datos personales, Grupo Inmobienes adoptará medidas correctivas y notificará a la autoridad competente y a los titulares cuando corresponda conforme a la normativa aplicable.`,
  },
  {
    n: "14",
    title: "Modificaciones a la Política",
    body: `Grupo Inmobienes se reserva el derecho de modificar esta Política en cualquier momento. Las modificaciones serán publicadas en los canales oficiales y entrarán en vigencia desde su publicación.`,
  },
  {
    n: "15",
    title: "Canales de Contacto",
    body: `Para el ejercicio de sus derechos, la atención de consultas, solicitudes, reclamos o cualquier comunicación relacionada con la presente Política de Privacidad y Protección de Datos Personales, el titular podrá contactar a Grupo Inmobienes a través de sus canales oficiales de atención, los cuales se encuentran habilitados para la recepción, gestión y respuesta de requerimientos conforme a la normativa vigente en materia de protección de datos personales.\n\nCorreo electrónico: ginmobienes@gmail.com\n\nGrupo Inmobienes atenderá su solicitud dentro del término de 15 días contados a partir de la recepción de la solicitud en el correo electrónico antes establecido. La solicitud deberá tener al menos lo siguiente: a) Nombres y apellidos; b) Cédula de identidad; c) Descripción clara y detallada de los hechos que fundamentan la solicitud; d) correo para notificaciones; e) Petición concreta; f) firma electrónica del titular. En caso de ser necesario, Grupo Inmobienes requerirá al interesado dentro de los tres (3) días siguientes a la recepción del reclamo para que aporte documentos adicionales, en los casos en que resulte incompleta la solicitud. Si dentro de los treinta (30) días siguientes a la fecha del requerimiento el solicitante no presenta la información requerida, se entenderá que el titular ha desistido de la solicitud y se le enviará una constancia de los hechos sucedidos, sin perjuicio de la posibilidad de volver a ejercer sus derechos.`,
  },
  {
    n: "16",
    title: "Controversias",
    body: `Grupo Inmobienes S.A. y los usuarios que acepten la presente Política se someten al cumplimiento de las normas legales del Estado Ecuatoriano y acuerdan que cualquier diferencia que surgiere respecto al presente documento será sometida a mediación y, en caso de que escalare, será sometida a las autoridades y jueces de la ciudad de Guayaquil. Además, aceptan ser citados telemáticamente al correo proporcionado por el titular en el formulario.`,
  },
  {
    n: "17",
    title: "Declaraciones",
    body: `El titular que acepta esta Política de Privacidad y tratamiento de datos personales declara que entiende el servicio prestado por Grupo Inmobienes S.A., esto es, la compra programada de inmuebles bajo la modalidad de sorteo o licitación; es decir, Grupo Inmobienes S.A. no otorga créditos, no es financiera. El inmueble que el titular detalle en el formulario únicamente es referencial y no genera obligación alguna a Grupo Inmobienes S.A. de entregarlo, y no crea relación comercial alguna hasta la suscripción formal del contrato de gestión de compra programada, cuyo objeto únicamente es la intermediación para la adquisición de un inmueble que es elegido por el titular en caso de ser adjudicado bajo las modalidades antes mencionadas.`,
  },
  {
    n: "18",
    title: "Aceptación",
    body: `El titular declara haber leído, comprendido y aceptado esta Política de Privacidad y Protección de Datos Personales, autorizando de forma libre, informada e inequívoca el tratamiento de sus datos conforme a lo aquí establecido.`,
  },
];

export default function PoliticaPrivacidadPage() {
  return (
    <div className="flex min-h-full flex-col">
      <Nav />
      <main className="flex-1 bg-white py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-accent">
            Legal
          </span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Política de Privacidad
          </h1>
          <p className="mt-4 text-slate-600">
            Política de Privacidad y Protección de Datos Personales de Grupo
            Inmobienes S.A.
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
              Para ejercer cualquiera de tus derechos ARCO+P, consultar esta
              política o presentar una solicitud, comunícate directamente con
              Grupo Inmobienes S.A.
            </p>
            <p className="mt-3">✉️ ginmobienes@gmail.com</p>
            <p>💬 WhatsApp +593 99 105 2697</p>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
