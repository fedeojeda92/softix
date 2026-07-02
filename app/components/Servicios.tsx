"use client";

import { motion } from "framer-motion";
import { Globe, Workflow, Camera, TrendingUp, Sparkles } from "lucide-react";

const SERVICES = [
  {
    icon: Globe,
    title: "Sitio web a medida",
    description:
      "Desarrollo de tu sitio con optimización para buscadores (SEO), soporte y actualización permanente, disponible en varios idiomas.",
  },
  {
    icon: Workflow,
    title: "Automatización y CRM",
    description:
      "Gestión de leads y automatizaciones a medida del sector inmobiliario, integradas a tu flujo de trabajo diario.",
  },
  {
    icon: Camera,
    title: "Contenido multimedia integral",
    description:
      "Fotografía e iluminación profesional, imágenes interactivas en 360°, video con drone en 4K, edición e implementación lista para web y redes.",
  },
  {
    icon: TrendingUp,
    title: "Marketing digital inmobiliario",
    description:
      "Gestión de Google Ads y Meta Ads, con estrategia especializada en el sector inmobiliario.",
  },
  {
    icon: Sparkles,
    title: "Styling previo a la sesión",
    description:
      "Preparación y acondicionamiento de la propiedad antes de la sesión, para que cada imagen luzca en su mejor versión.",
    badge: "Complementario",
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function Servicios() {
  return (
    <section id="servicios" className="bg-bg py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="mb-16 md:mb-20">
          <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.2em] text-bronze">
            Servicios
          </p>
          <h2 className="max-w-2xl font-display text-3xl font-semibold leading-tight text-ink md:text-[2.75rem]">
            Un sistema, no una lista de servicios sueltos
          </h2>
        </div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-5 md:grid-cols-2"
        >
          {SERVICES.map((service) => (
            <motion.div
              key={service.title}
              variants={item}
              whileHover={{ y: -4 }}
              className="group rounded-2xl border border-line bg-bg p-6 transition-colors duration-300 hover:border-bronze sm:p-8"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-bronze/10 text-bronze transition-colors duration-300 group-hover:bg-bronze/20">
                <service.icon className="h-5.5 w-5.5" strokeWidth={1.5} />
              </div>

              <div className="mb-3 flex items-center gap-2.5">
                <h3 className="font-display text-lg font-semibold text-ink">
                  {service.title}
                </h3>
                {service.badge && (
                  <span className="rounded-full bg-bronze/20 px-2.5 py-0.5 font-body text-[11px] font-medium text-bronze">
                    {service.badge}
                  </span>
                )}
              </div>

              <p className="font-body text-sm leading-relaxed text-ink/60">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
