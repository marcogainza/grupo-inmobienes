const monthFmt = new Intl.DateTimeFormat("es-EC", { month: "short" });

/** Convierte "YYYY-MM" a una etiqueta corta en español, ej. "Ene". */
export function monthLabel(month: string) {
  const [year, m] = month.split("-").map(Number);
  const label = monthFmt.format(new Date(year, (m ?? 1) - 1, 1));
  return label.charAt(0).toUpperCase() + label.slice(1).replace(".", "");
}
