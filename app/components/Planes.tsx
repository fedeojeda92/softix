"use client";

import { motion } from "framer-motion";
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
      "plans.p3.f5",
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
  const { t } = useLang();

  return (
    <section id="planes" className="bg-bg py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-10">
        <div className="mb-12 text-center md:mb-16">
          <h2 className="font-display text-3xl font-semibold text-ink md:text-[2.75rem]">
            {t("plans.title")}
          </h2>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 pt-5 md:mx-auto md:max-w-4xl md:overflow-visible md:pb-0 md:pt-0"
        >
          {PLAN_KEYS.map((plan) => (
            <motion.div
              key={plan.nameKey}
              variants={item}
              whileTap={{ scale: 0.98 }}
              className={`relative flex min-w-[260px] shrink-0 flex-col rounded-2xl border bg-bg p-6 snap-center sm:min-w-[280px] sm:p-8 md:min-w-0 md:flex-1 ${
                plan.highlighted
                    ? "border-forest md:scale-105 md:shadow-[0_1px_2px_rgba(45,41,38,0.06)]"
                  : "border-line"
              }`}
            >
              {plan.badgeKey && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-forest px-4 py-1 font-body text-xs font-medium text-white">
                  {t(plan.badgeKey)}
                </span>
              )}

              <h3 className="mb-2 font-display text-xl font-semibold text-ink">
                {t(plan.nameKey)}
              </h3>

              <p className="mb-8 font-body text-sm text-ink/50">
                {t("plans.from")}{" "}
                <span className="font-semibold text-ink">{t("plans.consultar")}</span>
              </p>

              <ul className="mb-8 flex flex-1 flex-col gap-3.5">
                {plan.featuresKeys.map((fk) => (
                  <li key={fk} className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                        plan.highlighted ? "bg-forest/10 text-forest" : "bg-bronze/10 text-bronze"
                      }`}
                    >
                      <Check className="h-3 w-3" strokeWidth={2.5} />
                    </span>
                    <span className="font-body text-sm text-ink/70">
                      {t(fk)}
                    </span>
                  </li>
                ))}
              </ul>

              <motion.a
                href="#contacto"
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className={`block rounded-full py-3.5 text-center font-body text-sm font-medium transition-colors ${
                  plan.highlighted
                    ? "bg-forest text-white hover:bg-forest/90"
                    : "border border-line text-ink hover:border-ink/30"
                }`}
              >
                {t("plans.request")}
              </motion.a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
