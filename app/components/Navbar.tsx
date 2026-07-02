"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

const NAV_LINKS = [
  { label: "Home", href: "#" },
  { label: "Nosotros", href: "#sobre-nosotros" },
  { label: "Servicios", href: "#servicios" },
  { label: "Planes", href: "#planes" },
  { label: "Soporte", href: "#cobertura" },
  { label: "Contacto", href: "#contacto" },
];

const WHATSAPP_LINK = "https://wa.me/549XXXXXXXXXX";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lang, setLang] = useState<"ES" | "EN">("ES");
  const menuRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Focus first element when mobile menu opens
  useEffect(() => {
    if (mobileOpen) {
      closeRef.current?.focus();
    }
  }, [mobileOpen]);

  // Escape key closes mobile menu
  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  // Focus trap inside mobile menu
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key !== "Tab" || !menuRef.current) return;
      const focusable = menuRef.current.querySelectorAll<HTMLElement>(
        'a[href], button, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [],
  );

  return (
    <>
      {/* ── Header ── */}
      <header
        className={`fixed top-0 inset-x-0 z-50 h-[72px] flex items-center transition-colors duration-300 ${
          scrolled
            ? "bg-bg/100 backdrop-blur-none"
            : "bg-bg/60 backdrop-blur-md"
        }`}
        style={{
          boxShadow: scrolled ? "0 1px 2px rgba(18,17,15,0.06)" : "none",
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
              <a
                key={link.label}
                href={link.href}
                className="font-body text-sm font-medium text-ink/70 transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            ))}

            {/* Language toggle */}
            <div className="flex items-center gap-1 rounded-full border border-line px-1 py-0.5" role="group" aria-label="Selector de idioma">
              <button
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
              </button>
              <button
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
              </button>
            </div>
          </nav>

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="flex flex-col items-center justify-center gap-1.5 md:flex"
            aria-label="Abrir menú"
          >
            <span className="block h-0.5 w-6 bg-ink transition-all" />
            <span className="block h-0.5 w-6 bg-ink transition-all" />
          </button>
        </div>
      </header>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-overlay"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-bg"
            onKeyDown={handleKeyDown}
          >
            {/* Close button */}
            <button
              ref={closeRef}
              onClick={() => setMobileOpen(false)}
              className="absolute top-5 right-6 flex h-10 w-10 items-center justify-center"
              aria-label="Cerrar menú"
            >
              <span className="relative block h-6 w-6">
                <span className="absolute inset-0 rotate-45 bg-ink" style={{ height: 2, top: 11 }} />
                <span className="absolute inset-0 -rotate-45 bg-ink" style={{ height: 2, top: 11 }} />
              </span>
            </button>

            <nav className="flex flex-col items-center gap-8" aria-label="Navegación móvil">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.3 }}
                  className="font-display text-3xl font-semibold text-ink"
                >
                  {link.label}
                </motion.a>
              ))}

              {/* Mobile language toggle */}
              <div className="mt-4 flex items-center gap-2 rounded-full border border-line px-2 py-1" role="group" aria-label="Selector de idioma">
                <button
                  onClick={() => setLang("ES")}
                  aria-label="Cambiar a español"
                  aria-pressed={lang === "ES"}
                  className={`rounded-full px-4 py-1.5 font-body text-sm font-medium transition-colors ${
                    lang === "ES"
                      ? "bg-forest text-white"
                      : "text-ink/50"
                  }`}
                >
                  ES
                </button>
                <button
                  onClick={() => setLang("EN")}
                  aria-label="Cambiar a inglés"
                  aria-pressed={lang === "EN"}
                  className={`rounded-full px-4 py-1.5 font-body text-sm font-medium transition-colors ${
                    lang === "EN"
                      ? "bg-forest text-white"
                      : "text-ink/50"
                  }`}
                >
                  EN
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── WhatsApp floating button ── */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-forest text-white"
      >
        {/* Pulse ring */}
        <motion.span
          className="absolute inset-0 rounded-full bg-forest"
          animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Icon */}
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="relative z-10 h-6 w-6"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </>
  );
}
