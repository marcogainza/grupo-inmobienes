"use client";

import { motion } from "motion/react";
import CountUp from "@/components/motion/CountUp";

export default function StatCard({
  label,
  value,
  hint,
  icon,
  format,
}: {
  label: string;
  value: number;
  hint?: string;
  icon?: string;
  format?: (n: number) => string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md"
    >
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          {label}
        </p>
        {icon && <span className="text-lg">{icon}</span>}
      </div>
      <p className="mt-2 text-3xl font-bold text-slate-900">
        <CountUp value={value} format={format} />
      </p>
      {hint && (
        <p className="mt-1 text-xs font-medium text-blue-accent">{hint}</p>
      )}
    </motion.div>
  );
}
