"use client";

import { motion } from "framer-motion";
import { useLang } from "../lib/LanguageContext";

const ZONAS = ["CABA", "Zona Norte", "Zona Oeste", "Zona Sur", "La Plata"];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const pillVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function ZonasCobertura() {
  const { t } = useLang();

  return (
    <section id="cobertura" className="bg-bg-dark py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-5 text-center sm:px-6 lg:px-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.2em] text-bronze"
        >
          {t("coverage.badge")}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10 font-display text-3xl font-semibold text-white md:text-[2.75rem]"
        >
          {t("coverage.title")}
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3"
        >
          {ZONAS.map((zona) => (
            <motion.span
              key={zona}
              variants={pillVariants}
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="cursor-default rounded-full border border-white/10 bg-white/5 px-6 py-2.5 font-body text-sm font-medium text-white/80 backdrop-blur-sm transition-colors duration-300 hover:border-white/30 hover:bg-white/10 hover:text-white"
            >
              {zona}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
