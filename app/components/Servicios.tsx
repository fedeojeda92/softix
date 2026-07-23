"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Globe, Workflow, Camera, TrendingUp } from "lucide-react";
import { useLang } from "../lib/LanguageContext";

const SERVICES = [
  {
    icon: Globe,
    titleKey: "services.s1.title",
    descKey: "services.s1.desc",
    iconColor: "text-forest",
  },
  {
    icon: Workflow,
    titleKey: "services.s2.title",
    descKey: "services.s2.desc",
    iconColor: "text-bronze",
  },
  {
    icon: Camera,
    titleKey: "services.s3.title",
    descKey: "services.s3.desc",
    iconColor: "text-forest",
  },
  {
    icon: TrendingUp,
    titleKey: "services.s4.title",
    descKey: "services.s4.desc",
    iconColor: "text-bronze",
  },
];

const FLOATING_DOTS = [
  { x: "8%", y: "15%", size: 4, color: "bg-forest/25", delay: 0, duration: 7 },
  { x: "92%", y: "25%", size: 3, color: "bg-bronze/20", delay: 1.2, duration: 6 },
  { x: "80%", y: "75%", size: 5, color: "bg-forest/15", delay: 0.5, duration: 8 },
  { x: "12%", y: "85%", size: 3, color: "bg-bronze/25", delay: 2, duration: 5 },
  { x: "45%", y: "5%", size: 2, color: "bg-forest/20", delay: 1.8, duration: 7 },
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
      initial={{ opacity: 0, y: 40, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        delay: index * 0.1,
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      }}
      whileHover={{ y: -4, borderColor: "rgba(255,255,255,0.2)" }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition-all duration-500 hover:shadow-2xl sm:p-6"
    >
      {/* Shimmer on hover */}
      <div className="pointer-events-none absolute inset-0 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

      {/* Corner glow */}
      <div className="pointer-events-none absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-forest/0 opacity-0 blur-2xl transition-all duration-700 group-hover:bg-forest/10 group-hover:opacity-100" />

      <div className="relative flex flex-col gap-3">
        {/* Icon */}
        <motion.div
          whileHover={{ rotate: 8, scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          className={`flex h-10 w-10 items-center justify-center rounded-xl bg-white/8 ${service.iconColor} transition-all duration-300 group-hover:bg-white/12 sm:h-12 sm:w-12`}
        >
          <service.icon className="h-5 w-5" strokeWidth={1.5} />
        </motion.div>

        {/* Title */}
        <h3 className="font-display text-base font-semibold text-white transition-colors duration-300 group-hover:text-forest sm:text-lg">
          {t(service.titleKey)}
        </h3>

        {/* Description */}
        <p className="font-body text-sm leading-relaxed text-white/55 transition-colors duration-300 group-hover:text-white/70">
          {t(service.descKey)}
        </p>
      </div>
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

  const decorY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const titleWords = t("services.title").split(" ");

  return (
    <section
      ref={sectionRef}
      id="servicios"
      className="relative overflow-hidden py-12 sm:py-16 md:py-20"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#1a1715]" />

      {/* Decorative blurs */}
      <motion.div
        style={{ y: decorY }}
        className="absolute left-[5%] top-[10%] h-64 w-64 rounded-full bg-forest/5 blur-3xl"
      />
      <motion.div
        style={{ y: decorY }}
        className="absolute bottom-[10%] right-[10%] h-48 w-48 rounded-full bg-bronze/5 blur-3xl"
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

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header - centered */}
        <div className="mb-8 text-center sm:mb-10 md:mb-12">
          <motion.p
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4 inline-block rounded-full border border-forest/20 bg-forest/10 px-5 py-2 font-body text-xs font-semibold uppercase tracking-[0.2em] text-forest backdrop-blur-sm"
          >
            {t("services.badge")}
          </motion.p>

          <h2 className="mx-auto max-w-4xl font-display text-2xl font-semibold leading-tight text-white sm:text-3xl md:text-[2.5rem]">
            {titleWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.2 + i * 0.05,
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

        {/* Grid 2x2 - simétrico */}
        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.titleKey} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
