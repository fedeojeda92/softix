"use client";

import { motion } from "framer-motion";
import { useLang } from "../lib/LanguageContext";

const ZONAS = ["CABA", "Zona Norte", "Zona Oeste", "Zona Sur", "La Plata"];

const FLOATING_DOTS = [
  { x: "6%", y: "18%", size: 3, color: "bg-forest/20", delay: 0, duration: 7 },
  { x: "92%", y: "14%", size: 2, color: "bg-bronze/15", delay: 1.5, duration: 6 },
  { x: "80%", y: "80%", size: 4, color: "bg-forest/15", delay: 0.8, duration: 8 },
  { x: "12%", y: "78%", size: 3, color: "bg-bronze/20", delay: 2, duration: 5 },
  { x: "45%", y: "6%", size: 2, color: "bg-white/10", delay: 1, duration: 7 },
];

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
    <section id="cobertura" className="relative overflow-hidden bg-[#1a1715] py-14 md:py-20">
      {/* Floating dots */}
      {FLOATING_DOTS.map((dot, i) => (
        <motion.div
          key={i}
          className={`absolute z-10 rounded-full ${dot.color}`}
          style={{ left: dot.x, top: dot.y, width: dot.size, height: dot.size }}
          animate={{
            y: [0, -8, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: dot.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: dot.delay,
          }}
        />
      ))}

      <div className="relative z-20 mx-auto max-w-6xl px-5 text-center sm:px-6 lg:px-10">
        <motion.span
          initial={{ opacity: 0, y: 15, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-4 inline-block rounded-full border border-forest/20 bg-forest/10 px-5 py-2 font-body text-xs font-semibold uppercase tracking-[0.2em] text-forest backdrop-blur-sm sm:text-sm"
        >
          {t("coverage.badge")}
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
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
