import CountUp from "@/components/motion/CountUp";
import Reveal from "@/components/motion/Reveal";

type StatsStripeProps = {
  familiasAdjudicadas: number;
  ciudadesAlcanzadas: number;
  aniosExperiencia: number;
};

export default function StatsStripe({
  familiasAdjudicadas,
  ciudadesAlcanzadas,
  aniosExperiencia,
}: StatsStripeProps) {
  const stats = [
    { label: "Familias adjudicadas", value: familiasAdjudicadas },
    { label: "Ciudades alcanzadas", value: ciudadesAlcanzadas },
    { label: "Años de experiencia", value: aniosExperiencia },
  ];

  return (
    <section className="relative bg-navy py-14">
      <div className="absolute left-1/2 top-0 h-1 w-24 -translate-x-1/2 rounded-full bg-gold" />
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 text-center sm:grid-cols-3 sm:px-6">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.15}>
            <p className="text-4xl font-extrabold text-gold sm:text-5xl">
              <CountUp value={stat.value} prefix="+" />
            </p>
            <p className="mt-2 text-sm text-slate-300">{stat.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
