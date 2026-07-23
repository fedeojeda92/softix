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
      className="font-display text-3xl font-bold text-forest sm:text-4xl md:text-5xl"
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

const FLOATING_DOTS = [
  { x: "10%", y: "20%", size: 4, color: "bg-forest/30", delay: 0, duration: 6 },
  { x: "85%", y: "15%", size: 3, color: "bg-bronze/25", delay: 1, duration: 7 },
  { x: "75%", y: "70%", size: 5, color: "bg-forest/20", delay: 2, duration: 8 },
  { x: "15%", y: "80%", size: 3, color: "bg-bronze/30", delay: 0.5, duration: 5 },
  { x: "50%", y: "10%", size: 2, color: "bg-forest/25", delay: 1.5, duration: 6 },
  { x: "90%", y: "50%", size: 4, color: "bg-bronze/20", delay: 3, duration: 7 },
];

export default function SobreNosotros() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.92 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    }),
  };

  const textLineVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + i * 0.12,
        duration: 0.5,
        ease: "easeOut" as const,
      },
    }),
  };

  return (
    <section
      ref={sectionRef}
      id="sobre-nosotros"
      className="relative overflow-hidden py-16 sm:py-20 md:py-28"
    >
      {/* Background Image */}
      <motion.div style={{ y: bgY }} className="pointer-events-none absolute inset-0 -top-20 -bottom-20">
        <Image
          src="/images/tech-bg.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Dark Overlay with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1715]/85 via-[#2D2926]/75 to-[#1a1715]/90" />

      {/* Floating Decorative Dots */}
      {FLOATING_DOTS.map((dot, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${dot.color}`}
          style={{ left: dot.x, top: dot.y, width: dot.size, height: dot.size }}
          animate={{
            y: [0, -12, 0],
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

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-4 sm:px-6 lg:px-8">
        {/* Badge */}
        <motion.p
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 rounded-full border border-forest/20 bg-forest/10 px-5 py-2 font-body text-xs font-semibold uppercase tracking-[0.2em] text-forest backdrop-blur-sm sm:mb-10"
        >
          {t("about.badge")}
        </motion.p>

        {/* Main Glass Card - Text */}
        <motion.div
          custom={0}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          whileHover={{ y: -4, borderColor: "rgba(255,255,255,0.2)" }}
          className="group relative w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-500 hover:shadow-2xl hover:shadow-forest/5 sm:rounded-3xl sm:p-8 md:p-10"
        >
          {/* Shimmer Effect on Hover */}
          <div className="pointer-events-none absolute inset-0 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

          {/* Glow Effect */}
          <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 sm:rounded-3xl" style={{ background: "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(194,119,94,0.06), transparent 40%)" }} />

          {/* Text Content */}
          <div className="relative space-y-4 text-center sm:space-y-5">
            <motion.p
              custom={0}
              variants={textLineVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="font-body text-sm leading-relaxed text-white/85 sm:text-base md:text-lg"
              style={{ lineHeight: 1.8 }}
            >
              {t("about.p1")}
            </motion.p>
            <motion.p
              custom={1}
              variants={textLineVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="font-body text-sm leading-relaxed text-white/85 sm:text-base md:text-lg"
              style={{ lineHeight: 1.8 }}
            >
              {t("about.p2")}
            </motion.p>
          </div>
        </motion.div>

        {/* Skills Chips - always in a row */}
        <motion.div
          custom={1}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-6 flex w-full justify-center gap-2 sm:mt-8 sm:gap-3"
        >
          {SKILLS.map((skill, i) => (
            <motion.div
              key={skill.key}
              initial={{ opacity: 0, x: -20, scale: 0.9 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.4 + i * 0.15,
                duration: 0.5,
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="group flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/8 px-3 py-3 backdrop-blur-lg transition-all duration-300 hover:border-forest/40 hover:bg-white/12 hover:shadow-lg hover:shadow-forest/10 sm:gap-3 sm:rounded-2xl sm:px-5 sm:py-3.5"
            >
              <motion.span
                whileHover={{ rotate: 10, scale: 1.15 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-forest/15 text-forest transition-colors duration-300 group-hover:bg-forest/25 sm:h-10 sm:w-10 sm:rounded-xl"
              >
                <skill.icon className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.5} />
              </motion.span>
              <span className="truncate font-body text-xs font-medium text-white/80 sm:text-sm">
                {t(skill.key)}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Glass Card */}
        <motion.div
          custom={2}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          whileHover={{ y: -4, borderColor: "rgba(255,255,255,0.2)" }}
          className="group relative mt-6 w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-500 hover:shadow-2xl hover:shadow-forest/5 sm:mt-8 sm:rounded-3xl sm:p-8 md:p-10"
        >
          {/* Shimmer Effect on Hover */}
          <div className="pointer-events-none absolute inset-0 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

          {/* Stats Row */}
          <div className="relative flex items-center justify-between">
            {/* Stat 1 */}
            <div className="text-center">
              <AnimatedNumber value={4} suffix="+" />
              <p className="mt-1 font-body text-[10px] text-white/50 sm:mt-2 sm:text-xs">Años de experiencia</p>
            </div>

            {/* Divider */}
            <div className="flex h-12 items-center">
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
                className="w-px bg-gradient-to-b from-transparent via-white/20 to-transparent"
              />
            </div>

            {/* Stat 2 */}
            <div className="text-center">
              <AnimatedNumber value={100} suffix="%" />
              <p className="mt-1 font-body text-[10px] text-white/50 sm:mt-2 sm:text-xs">Clientes satisfechos</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
