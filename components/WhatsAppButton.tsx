const WHATSAPP_URL =
  "https://wa.me/593991052697?text=Hola%2C%20me%20interesa%20saber%20m%C3%A1s%20sobre%20el%20sistema%20de%20compra%20programada%20de%20vivienda.";

export default function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gold/100 text-2xl text-white shadow-lg shadow-gold/30 transition hover:bg-gold-dark"
    >
      💬
    </a>
  );
}
