"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Globe, Workflow, Camera, TrendingUp, Sparkles } from "lucide-react";
import { useLang } from "../lib/LanguageContext";

const SERVICES = [
  {
    icon: Globe,
    titleKey: "services.s1.title",
    descKey: "services.s1.desc",
    span: "col-span-1 row-span-2",
    iconBg: "bg-forest/10",
    iconColor: "text-forest",
  },
  {
    icon: Workflow,
    titleKey: "services.s2.title",
    descKey: "services.s2.desc",
    span: "col-span-1 row-span-1",
    iconBg: "bg-bronze/10",
    iconColor: "text-bronze",
  },
  {
    icon: Camera,
    titleKey: "services.s3.title",
    descKey: "services.s3.desc",
    span: "col-span-1 row-span-1",
    iconBg: "bg-forest/10",
    iconColor: "text-forest",
  },
  {
    icon: TrendingUp,
    titleKey: "services.s4.title",
    descKey: "services.s4.desc",
    span: "col-span-1 row-span-1",
    iconBg: "bg-bronze/10",
    iconColor: "text-bronze",
  },
  {
    icon: Sparkles,
    titleKey: "services.s5.title",
    descKey: "services.s5.desc",
    badgeKey: "services.s5.badge",
    span: "col-span-1 row-span-1",
    iconBg: "bg-forest/10",
    iconColor: "text-forest",
  },
];

function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[number];
  index: number;
}) {
  const { t } = useLang();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        delay: index * 0.1,
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative overflow-hidden rounded-2xl border border-line/50 bg-bg p-6 transition-all duration-500 hover:border-forest/30 hover:shadow-2xl hover:shadow-forest/5 sm:p-8 ${service.span}`}
    >
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-forest/0 via-transparent to-bronze/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Icon */}
      <div className="relative mb-5">
        <motion.div
          whileHover={{ rotate: 5, scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${service.iconBg} ${service.iconColor} transition-all duration-300 group-hover:shadow-lg`}
        >
          <service.icon className="h-6 w-6" strokeWidth={1.5} />
        </motion.div>
      </div>

      {/* Title */}
      <div className="relative mb-3 flex items-center gap-2.5">
        <h3 className="font-display text-xl font-semibold text-ink transition-colors duration-300 group-hover:text-forest">
          {t(service.titleKey)}
        </h3>
        {service.badgeKey && (
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="rounded-full bg-forest/10 px-2.5 py-0.5 font-body text-[11px] font-medium text-forest"
          >
            {t(service.badgeKey)}
          </motion.span>
        )}
      </div>

      {/* Description */}
      <p className="relative font-body text-sm leading-relaxed text-ink/60 transition-colors duration-300 group-hover:text-ink/70">
        {t(service.descKey)}
      </p>

      {/* Decorative corner */}
      <div className="absolute -bottom-2 -right-2 h-24 w-24 rounded-full bg-forest/5 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:-bottom-4 group-hover:-right-4" />
    </motion.div>
  );
}

export default function Servicios() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const decorY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const titleWords = t("services.title").split(" ");

  return (
    <section
      ref={sectionRef}
      id="servicios"
      className="relative overflow-hidden bg-bg-dark py-14 md:py-20"
    >
      {/* Decorative elements */}
      <motion.div
        style={{ y: decorY }}
        className="absolute left-[5%] top-[10%] h-72 w-72 rounded-full bg-forest/5 blur-3xl"
      />
      <motion.div
        style={{ y: decorY }}
        className="absolute bottom-[15%] right-[10%] h-56 w-56 rounded-full bg-bronze/5 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.2em] text-bronze"
          >
            {t("services.badge")}
          </motion.p>

          <h2 className="max-w-3xl font-display text-3xl font-semibold leading-tight text-bg md:text-[2.75rem]">
            {titleWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.05,
                  duration: 0.5,
                  ease: "easeOut",
                }}
                className="mr-[0.3em] inline-block"
              >
                {word}
              </motion.span>
            ))}
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:grid-rows-2">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.titleKey} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
