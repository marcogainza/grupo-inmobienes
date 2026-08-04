"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type MontoContextValue = {
  monto: number | null;
  applyMonto: (value: number) => void;
};

const MontoContext = createContext<MontoContextValue | null>(null);

export function MontoProvider({ children }: { children: ReactNode }) {
  const [monto, setMonto] = useState<number | null>(null);

  function applyMonto(value: number) {
    setMonto(value);
    document
      .getElementById("contacto")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <MontoContext.Provider value={{ monto, applyMonto }}>
      {children}
    </MontoContext.Provider>
  );
}

export function useMonto() {
  const ctx = useContext(MontoContext);
  if (!ctx) {
    throw new Error("useMonto debe usarse dentro de un MontoProvider");
  }
  return ctx;
}
