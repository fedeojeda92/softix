"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { useLang } from "../lib/LanguageContext";

const NAV_LINKS = [
  { key: "nav.home", href: "#" },
  { key: "nav.nosotros", href: "#sobre-nosotros" },
  { key: "nav.servicios", href: "#servicios" },
  { key: "nav.planes", href: "#planes" },
  { key: "nav.soporte", href: "#cobertura" },
  { key: "nav.contacto", href: "#contacto" },
];

const WHATSAPP_LINK = "https://wa.me/5491159568286?text=Hola%2C%20me%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20sobre%20sus%20servicios.";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, setLang, t } = useLang();
  const sheetRef = useRef<HTMLDivElement>(null);
  const y = useMotionValue(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  const handleDragEnd = useCallback(
    (_: unknown, info: PanInfo) => {
      if (info.offset.y > 100 || info.velocity.y > 500) {
        setMobileOpen(false);
      }
    },
    [],
  );

  const sheetVariants = {
    hidden: { y: "100%" },
    visible: {
      y: 0,
      transition: { type: "spring" as const, stiffness: 300, damping: 30 },
    },
    exit: {
      y: "100%",
      transition: { type: "spring" as const, stiffness: 300, damping: 30 },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, type: "spring" as const, stiffness: 300, damping: 25 },
    }),
  };

  return (
    <>
      {/* Header */}
      <header
        className={`fixed top-0 inset-x-0 z-50 h-[72px] flex items-center transition-colors duration-300 ${
          scrolled
            ? "bg-bg/100 backdrop-blur-none"
            : "bg-bg/60 backdrop-blur-md"
        }`}
        style={{
          boxShadow: scrolled ? "0 1px 2px rgba(45,41,38,0.06)" : "none",
        }}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 lg:px-10">
          {/* Logo */}
          <a href="#" className="font-display text-xl font-semibold text-ink tracking-tight">
            Softix
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 md:flex" aria-label="Navegación principal">
            {NAV_LINKS.map((link) => (
              <motion.a
                key={link.key}
                href={link.href}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="font-body text-sm font-medium text-ink/70 transition-colors hover:text-ink"
              >
                {t(link.key)}
              </motion.a>
            ))}

            {/* Language toggle */}
            <div className="flex items-center gap-1 rounded-full border border-line px-1 py-0.5" role="group" aria-label="Selector de idioma">
              <motion.button
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                onClick={() => setLang("ES")}
                aria-label="Cambiar a español"
                aria-pressed={lang === "ES"}
                className={`rounded-full px-2.5 py-0.5 font-body text-xs font-medium transition-colors ${
                  lang === "ES"
                    ? "bg-forest text-white"
                    : "text-ink/50 hover:text-ink"
                }`}
              >
                ES
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                onClick={() => setLang("EN")}
                aria-label="Cambiar a inglés"
                aria-pressed={lang === "EN"}
                className={`rounded-full px-2.5 py-0.5 font-body text-xs font-medium transition-colors ${
                  lang === "EN"
                    ? "bg-forest text-white"
                    : "text-ink/50 hover:text-ink"
                }`}
              >
                EN
              </motion.button>
            </div>
          </nav>

          {/* Hamburger — triggers bottom sheet */}
          <motion.button
            whileTap={{ scale: 0.85 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            onClick={() => setMobileOpen((v) => !v)}
            className="relative z-[70] flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileOpen}
          >
            <span className={`block h-0.5 w-6 bg-ink transition-all duration-300 ${mobileOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-6 bg-ink transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 bg-ink transition-all duration-300 ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </motion.button>
        </div>
      </header>

      {/* Mobile Bottom Sheet */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-[65] bg-ink/40 backdrop-blur-sm md:hidden"
            />

            {/* Sheet */}
            <motion.div
              ref={sheetRef}
              variants={sheetVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              drag="y"
              dragConstraints={{ top: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              style={{ y }}
              className="fixed bottom-0 inset-x-0 z-[70] max-h-[90vh] overflow-y-auto rounded-t-3xl bg-bg-dark shadow-2xl md:hidden"
            >
              {/* Gradient accent at top */}
              <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-forest/10 via-forest/5 to-transparent" />

              {/* Drag Handle */}
              <div className="relative flex justify-center pt-4 pb-1">
                <div className="h-1 w-10 rounded-full bg-white/20" />
              </div>

              {/* Brand header */}
              <div className="relative px-6 pt-4 pb-2">
                <p className="font-display text-lg font-semibold text-white">Softix</p>
                <p className="mt-0.5 font-body text-xs text-white/40">Servicios digitales inmobiliarios</p>
              </div>

              {/* Nav Links */}
              <nav className="relative flex flex-col gap-1 px-4 pb-4 pt-4" aria-label="Navegación móvil">
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.key}
                    href={link.href}
                    variants={linkVariants}
                    initial="hidden"
                    animate="visible"
                    custom={i}
                    whileTap={{ scale: 0.97, opacity: 0.7 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    onClick={() => setMobileOpen(false)}
                    className="group flex items-center gap-4 rounded-xl px-4 py-3.5 font-body text-base font-medium text-white/80 transition-all duration-200 hover:bg-white/5 hover:text-white"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-forest transition-colors group-hover:bg-forest/20">
                      {link.key === "nav.home" && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4"><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
                      )}
                      {link.key === "nav.nosotros" && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>
                      )}
                      {link.key === "nav.servicios" && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" /></svg>
                      )}
                      {link.key === "nav.planes" && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" /></svg>
                      )}
                      {link.key === "nav.soporte" && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4"><path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 6.498 1.424-2.448m-3.074 1.026 2.448-1.424M12 3C7.03 3 2.73 5.11 1.004 8.498a.75.75 0 0 0 .496.727c.574.176 1.15.324 1.724.448.333.072.668.125 1.004.152m0 0a9.015 9.015 0 0 1 3.992-.002m0 0c.335-.027.671-.08 1.005-.151.573-.124 1.149-.272 1.723-.448a.75.75 0 0 0 .497-.727C21.27 8.11 16.97 6 12 6c-4.97 0-9.27 2.11-10.996 5.498a.75.75 0 0 0 .496.727c.574.176 1.15.324 1.724.448.333.072.668.125 1.004.152" /></svg>
                      )}
                      {link.key === "nav.contacto" && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>
                      )}
                    </span>
                    <span>{t(link.key)}</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="ml-auto h-4 w-4 text-white/20 transition-transform group-hover:translate-x-1 group-hover:text-white/40"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
                  </motion.a>
                ))}
              </nav>

              {/* CTA + Language */}
              <div className="relative border-t border-white/10 px-4 pb-8 pt-5">
                {/* Language toggle */}
                <div className="mb-5 flex items-center justify-center gap-1 rounded-full border border-white/10 px-1 py-0.5" role="group" aria-label="Selector de idioma">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    onClick={() => setLang("ES")}
                    aria-label="Cambiar a español"
                    aria-pressed={lang === "ES"}
                    className={`rounded-full px-5 py-1.5 font-body text-sm font-medium transition-colors ${
                      lang === "ES"
                        ? "bg-forest text-white"
                        : "text-white/50"
                    }`}
                  >
                    ES
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    onClick={() => setLang("EN")}
                    aria-label="Cambiar a inglés"
                    aria-pressed={lang === "EN"}
                    className={`rounded-full px-5 py-1.5 font-body text-sm font-medium transition-colors ${
                      lang === "EN"
                        ? "bg-forest text-white"
                        : "text-white/50"
                    }`}
                  >
                    EN
                  </motion.button>
                </div>

                {/* WhatsApp CTA */}
                <motion.a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="flex items-center justify-center gap-2 rounded-full bg-forest py-3.5 font-body text-sm font-medium text-white transition-colors hover:bg-forest/90"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Contactar por WhatsApp
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* WhatsApp floating button */}
      <motion.a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        whileTap={{ scale: 0.85 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-forest text-white md:h-14 md:w-14"
      >
        <motion.span
          className="absolute inset-0 rounded-full bg-forest"
          animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="relative z-10 h-6 w-6"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </motion.a>
    </>
  );
}
