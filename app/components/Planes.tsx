"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Check } from "lucide-react";
import { useLang } from "../lib/LanguageContext";

const PLAN_KEYS = [
  {
    nameKey: "plans.p1.name",
    featuresKeys: [
      "plans.p1.f1",
      "plans.p1.f2",
      "plans.p1.f3",
      "plans.p1.f4",
      "plans.p1.f5",
    ],
  },
  {
    nameKey: "plans.p2.name",
    badgeKey: "plans.mostChosen",
    highlighted: true,
    featuresKeys: [
      "plans.p2.f1",
      "plans.p2.f2",
      "plans.p2.f3",
      "plans.p2.f4",
      "plans.p2.f5",
    ],
  },
  {
    nameKey: "plans.p3.name",
    featuresKeys: [
      "plans.p3.f1",
      "plans.p3.f2",
      "plans.p3.f3",
      "plans.p3.f4",
    ],
  },
];

const FLOATING_DOTS = [
  { x: "5%", y: "20%", size: 4, color: "bg-forest/20", delay: 0, duration: 7 },
  { x: "90%", y: "15%", size: 3, color: "bg-bronze/15", delay: 1.5, duration: 6 },
  { x: "85%", y: "80%", size: 5, color: "bg-forest/15", delay: 0.8, duration: 8 },
  { x: "10%", y: "75%", size: 3, color: "bg-bronze/20", delay: 2, duration: 5 },
  { x: "50%", y: "8%", size: 2, color: "bg-forest/20", delay: 1, duration: 7 },
];

export default function Planes() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const decorY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section
      ref={sectionRef}
      id="planes"
      className="relative overflow-hidden py-12 sm:py-16 md:py-20"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#1a1715]" />

      {/* Decorative blurs */}
      <motion.div
        style={{ y: decorY }}
        className="absolute left-[10%] top-[15%] h-64 w-64 rounded-full bg-forest/5 blur-3xl"
      />
      <motion.div
        style={{ y: decorY }}
        className="absolute bottom-[10%] right-[8%] h-48 w-48 rounded-full bg-bronze/5 blur-3xl"
      />

      {/* Floating dots */}
      {FLOATING_DOTS.map((dot, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${dot.color}`}
          style={{ left: dot.x, top: dot.y, width: dot.size, height: dot.size }}
          animate={{
            y: [0, -10, 0],
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

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center sm:mb-10 md:mb-12">
          <motion.p
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4 inline-block rounded-full border border-forest/20 bg-forest/10 px-5 py-2 font-body text-xs font-semibold uppercase tracking-[0.2em] text-forest backdrop-blur-sm"
          >
            {t("plans.badge")}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto font-display text-2xl font-semibold text-white sm:text-3xl md:text-[2.5rem]"
          >
            {t("plans.title")}
          </motion.h2>
        </div>

        {/* Plans Grid */}
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3">
          {PLAN_KEYS.map((plan, i) => (
            <motion.div
              key={plan.nameKey}
              initial={{ opacity: 0, y: 40, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                delay: i * 0.15,
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
              }}
              whileHover={{ y: -6, borderColor: plan.highlighted ? "rgba(194,119,94,0.5)" : "rgba(255,255,255,0.2)" }}
              className={`group relative overflow-hidden rounded-2xl border backdrop-blur-xl transition-all duration-500 hover:shadow-2xl ${
                plan.highlighted
                  ? "border-forest/40 bg-white/8 shadow-lg shadow-forest/5 md:scale-105"
                  : "border-white/10 bg-white/5"
              }`}
            >
              {/* Shimmer on hover */}
              <div className="pointer-events-none absolute inset-0 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

              {/* Corner glow */}
              <div className={`pointer-events-none absolute -bottom-6 -right-6 h-24 w-24 rounded-full opacity-0 blur-2xl transition-all duration-700 group-hover:opacity-100 ${
                plan.highlighted ? "bg-forest/15" : "bg-forest/0 group-hover:bg-forest/10"
              }`} />

              <div className="relative flex flex-col p-6 sm:p-7">
                {/* Badge */}
                {plan.badgeKey && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.4, type: "spring" }}
                    className="mb-3 inline-block w-fit rounded-full bg-forest px-3 py-1 font-body text-[11px] font-medium text-white"
                  >
                    {t(plan.badgeKey)}
                  </motion.span>
                )}

                {/* Name */}
                <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">
                  {t(plan.nameKey)}
                </h3>

                {/* Price */}
                <p className="mt-2 font-body text-sm text-white/45">
                  {t("plans.from")}{" "}
                  <span className="font-semibold text-white/80">{t("plans.consultar")}</span>
                </p>

                {/* Divider */}
                <div className="my-5 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                {/* Features */}
                <ul className="mb-6 flex flex-1 flex-col gap-3">
                  {plan.featuresKeys.map((fk, fi) => (
                    <motion.li
                      key={fk}
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + fi * 0.08, duration: 0.4, ease: "easeOut" }}
                      className="flex items-start gap-3"
                    >
                      <motion.span
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                          plan.highlighted
                            ? "bg-forest/15 text-forest"
                            : "bg-bronze/10 text-bronze"
                        }`}
                      >
                        <Check className="h-3 w-3" strokeWidth={2.5} />
                      </motion.span>
                      <span className="font-body text-sm text-white/65 transition-colors duration-300 group-hover:text-white/75">
                        {t(fk)}
                      </span>
                    </motion.li>
                  ))}
                </ul>

                {/* CTA */}
                <motion.a
                  href="#contacto"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className={`block rounded-full py-3.5 text-center font-body text-sm font-medium transition-all duration-300 ${
                    plan.highlighted
                      ? "bg-forest text-white shadow-lg shadow-forest/20 hover:bg-forest/90 hover:shadow-forest/30"
                      : "border border-white/15 bg-white/5 text-white/80 hover:border-white/25 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {t("plans.request")}
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
