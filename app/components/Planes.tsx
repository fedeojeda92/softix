"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const PLANS = [
  {
    name: "Esencial",
    features: [
      "Sitio web a medida",
      "Hosting incluido",
      "Optimización SEO",
      "Soporte y actualización permanente",
      "Disponible en varios idiomas",
    ],
  },
  {
    name: "Profesional",
    badge: "Más elegido",
    highlighted: true,
    features: [
      "Todo lo del plan Esencial",
      "Tour virtual 360°",
      "Automatización y CRM básico",
      "Soporte prioritario",
      "Gestión de contenido mensual",
    ],
  },
  {
    name: "Elite",
    features: [
      "Todo lo del plan Profesional",
      "Producción multimedia mensual",
      "Fotografía, video y drone",
      "Marketing digital gestionado",
      "Estilo y acondicionamiento de propiedad",
    ],
  },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function Planes() {
  return (
    <section id="planes" className="bg-bg py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="mb-16 text-center md:mb-20">
          <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.2em] text-bronze">
            Inversión
          </p>
          <h2 className="font-display text-3xl font-semibold text-ink md:text-[2.75rem]">
            Planes
          </h2>
        </div>

        {/* Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 md:mx-auto md:max-w-4xl md:overflow-visible md:pb-0"
        >
          {PLANS.map((plan) => (
            <motion.div
              key={plan.name}
              variants={item}
              className={`relative flex min-w-[260px] shrink-0 flex-col rounded-2xl border bg-bg p-6 snap-center sm:min-w-[280px] sm:p-8 md:min-w-0 md:flex-1 ${
                plan.highlighted
                  ? "border-forest md:scale-105 md:shadow-[0_1px_2px_rgba(18,17,15,0.06)]"
                  : "border-line"
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-forest px-4 py-1 font-body text-xs font-medium text-white">
                  {plan.badge}
                </span>
              )}

              {/* Name */}
              <h3 className="mb-2 font-display text-xl font-semibold text-ink">
                {plan.name}
              </h3>

              {/* Price */}
              <p className="mb-8 font-body text-sm text-ink/50">
                Desde{" "}
                <span className="font-semibold text-ink">Consultar</span>
              </p>

              {/* Features */}
              <ul className="mb-8 flex flex-1 flex-col gap-3.5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                        plan.highlighted ? "bg-forest/10 text-forest" : "bg-bronze/10 text-bronze"
                      }`}
                    >
                      <Check className="h-3 w-3" strokeWidth={2.5} />
                    </span>
                    <span className="font-body text-sm text-ink/70">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#contacto"
                className={`block rounded-full py-3.5 text-center font-body text-sm font-medium transition-colors ${
                  plan.highlighted
                    ? "bg-forest text-white hover:bg-forest/90"
                    : "border border-line text-ink hover:border-ink/30"
                }`}
              >
                Solicitar información
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
