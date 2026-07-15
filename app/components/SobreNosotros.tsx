"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Code, Camera, Brain } from "lucide-react";
import { useLang } from "../lib/LanguageContext";

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.span
      ref={ref}
      className="font-display text-4xl font-bold text-forest md:text-5xl"
    >
      {isInView ? (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {value}
          </motion.span>
          {suffix}
        </motion.span>
      ) : (
        <span className="opacity-0">0{suffix}</span>
      )}
    </motion.span>
  );
}

const SKILLS = [
  { icon: Code, key: "about.skill1" },
  { icon: Camera, key: "about.skill2" },
  { icon: Brain, key: "about.skill3" },
];

export default function SobreNosotros() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.04]);
  const decorY = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const decorY2 = useTransform(scrollYProgress, [0, 1], [15, -15]);

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" as const },
    }),
  };

  return (
    <section
      ref={sectionRef}
      id="sobre-nosotros"
      className="relative overflow-hidden bg-bg py-14 md:py-20"
    >
      {/* Decorative floating elements */}
      <motion.div
        style={{ y: decorY }}
        className="absolute right-[10%] top-[15%] h-64 w-64 rounded-full bg-forest/5 blur-3xl"
      />
      <motion.div
        style={{ y: decorY2 }}
        className="absolute bottom-[10%] left-[5%] h-48 w-48 rounded-full bg-bronze/5 blur-3xl"
      />
      <motion.div
        style={{ y: decorY }}
        className="absolute left-[40%] top-[60%] h-32 w-32 rounded-full bg-forest/3 blur-2xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          {/* Image Column - Left */}
          <motion.div
            style={{ y: imageY }}
            className="relative order-2 lg:order-1"
          >
            {/* Main image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative aspect-[4/5] overflow-hidden rounded-3xl"
            >
              <motion.div style={{ scale: imageScale }} className="absolute inset-0">
                <Image
                  src="/images/nos.png"
                  alt="Sobre nosotros"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                  priority
                />
              </motion.div>
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/30 via-transparent to-transparent" />

              {/* Animated border glow */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-forest/10"
              />
            </motion.div>

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7, x: 20, rotate: -3 }}
              whileInView={{ opacity: 1, scale: 1, x: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6, type: "spring", stiffness: 200, damping: 15 }}
              className="absolute -bottom-6 -right-4 rounded-2xl border border-line bg-bg p-5 shadow-xl md:-right-8 md:p-6"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest/10"
                >
                  <Brain className="h-6 w-6 text-forest" />
                </motion.div>
                <div>
                  <p className="font-display text-2xl font-bold text-ink">AI</p>
                  <p className="font-body text-xs text-ink/50">Integrada</p>
                </div>
              </div>
            </motion.div>

            {/* Floating decorative dot */}
            <motion.div
              animate={{ y: [0, -8, 0], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-4 top-1/4 h-3 w-3 rounded-full bg-forest/40"
            />
            <motion.div
              animate={{ y: [0, 6, 0], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -right-2 top-1/3 h-2 w-2 rounded-full bg-bronze/40"
            />
          </motion.div>

          {/* Content Column - Right */}
          <div className="order-1 lg:order-2">
            <motion.p
              custom={0}
              variants={textVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.2em] text-bronze"
            >
              {t("about.badge")}
            </motion.p>

            <motion.div
              custom={1}
              variants={textVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4 font-body text-base leading-relaxed text-ink/70"
              style={{ lineHeight: 1.8 }}
            >
              <p>{t("about.p1")}</p>
              <p>{t("about.p2")}</p>
            </motion.div>

            {/* Skills */}
            <motion.div
              custom={2}
              variants={textVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            >
              {SKILLS.map((skill, i) => (
                <motion.div
                  key={skill.key}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5, type: "spring", stiffness: 300, damping: 20 }}
                  whileHover={{ scale: 1.05, y: -3 }}
                  className="group flex items-center gap-3 rounded-xl border border-line bg-bg px-5 py-3.5 transition-colors duration-300 hover:border-forest/30 hover:bg-forest/5"
                >
                  <motion.span
                    whileHover={{ rotate: 10, scale: 1.15 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-forest/10 text-forest transition-colors duration-300 group-hover:bg-forest/20"
                  >
                    <skill.icon className="h-5 w-5" strokeWidth={1.5} />
                  </motion.span>
                  <span className="font-body text-sm font-medium text-ink/80">
                    {t(skill.key)}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              custom={3}
              variants={textVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-10 grid grid-cols-3 gap-6 border-t border-line pt-8"
            >
              <div>
                <AnimatedNumber value={4} suffix="+" />
                <p className="mt-1 font-body text-xs text-ink/50">Años de experiencia</p>
              </div>
              <div>
                <AnimatedNumber value={50} suffix="+" />
                <p className="mt-1 font-body text-xs text-ink/50">Proyectos entregados</p>
              </div>
              <div>
                <AnimatedNumber value={100} suffix="%" />
                <p className="mt-1 font-body text-xs text-ink/50">Clientes satisfechos</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
