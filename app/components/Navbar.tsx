"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { useLang } from "../lib/LanguageContext";

/* ───────────────────────────── constants ───────────────────────────── */

const NAV_LINKS = [
  { key: "nav.home", href: "#" },
  { key: "nav.nosotros", href: "#sobre-nosotros" },
  { key: "nav.servicios", href: "#servicios" },
  { key: "nav.planes", href: "#planes" },
  { key: "nav.soporte", href: "#cobertura" },
  { key: "nav.contacto", href: "#contacto" },
];

const WHATSAPP_LINK =
  "https://wa.me/5491159568286?text=Hola%2C%20me%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20sobre%20sus%20servicios.";

const SCROLL_THRESHOLD = 80;

/* ─────────────────────────── custom hook ──────────────────────────── */

function useScrollNavbar() {
  const { scrollY } = useScroll();
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const progress = useTransform(scrollY, [0, SCROLL_THRESHOLD], [0, 1]);
  const [p, setP] = useState(0);
  useMotionValueEvent(progress, "change", (v) => setP(reduced ? 1 : v));

  const height = 72 - 16 * p;
  const borderRadius = 24 * p;
  const padX = 24 * p;
  const bgOpacity = p;
  const blurAmount = 12 * p;
  const shadowOpacity = 0.08 * p;

  return {
    height,
    borderRadius,
    padX,
    bgOpacity,
    blurAmount,
    shadowOpacity,
    progress: p,
  };
}

/* ───────────────────────── sub-components ─────────────────────────── */

function NavbarLogo({ progress }: { progress: number }) {
  const light = progress < 0.5;
  return (
    <motion.a
      href="#"
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex items-center shrink-0"
    >
      <Image
        src="/images/logo.png"
        alt="Fersion Tech"
        width={120}
        height={28}
        priority
        className={`h-auto w-auto object-contain transition-[filter] duration-200 ${
          light ? "brightness-0 invert" : ""
        }`}
      />
    </motion.a>
  );
}

function NavLink({
  href,
  label,
  progress,
}: {
  href: string;
  label: string;
  progress: number;
}) {
  const light = progress < 0.5;
  return (
    <motion.a
      href={href}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={`group relative py-1 font-body text-sm font-medium transition-colors duration-200 lg:text-base ${
        light
          ? "text-white/80 hover:text-white"
          : "text-ink/60 hover:text-ink"
      }`}
    >
      {label}
      <span
        className={`absolute bottom-0 left-0 h-[1.5px] w-full origin-left scale-x-0 transition-transform duration-250 ease-out group-hover:scale-x-100 ${
          light ? "bg-white/60" : "bg-bronze"
        }`}
      />
    </motion.a>
  );
}

function LanguageToggle({
  lang,
  setLang,
  progress,
  variant = "desktop",
}: {
  lang: string;
  setLang: (l: "ES" | "EN") => void;
  progress: number;
  variant?: "desktop" | "mobile";
}) {
  const isMobile = variant === "mobile";
  const light = progress < 0.5;

  if (isMobile) {
    return (
      <div
        className="flex items-center gap-1 rounded-full border border-white/15 px-1 py-0.5"
        role="group"
        aria-label="Selector de idioma"
      >
        <motion.button
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          onClick={() => setLang("ES")}
          aria-label="Cambiar a español"
          aria-pressed={lang === "ES"}
          className={`rounded-full px-2.5 py-0.5 font-body text-xs font-medium transition-colors ${
            lang === "ES" ? "bg-white/20 text-white" : "text-white/50"
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
            lang === "EN" ? "bg-white/20 text-white" : "text-white/50"
          }`}
        >
          EN
        </motion.button>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center gap-1 rounded-full border px-1 py-0.5 transition-colors duration-200 ${
        light ? "border-white/20" : "border-line"
      }`}
      role="group"
      aria-label="Selector de idioma"
    >
      <motion.button
        whileTap={{ scale: 0.92 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        onClick={() => setLang("ES")}
        aria-label="Cambiar a español"
        aria-pressed={lang === "ES"}
        className={`rounded-full px-2.5 py-0.5 font-body text-xs font-medium transition-colors duration-200 ${
          light
            ? lang === "ES"
              ? "bg-white/20 text-white"
              : "text-white/50"
            : lang === "ES"
              ? "bg-ink text-white"
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
        className={`rounded-full px-2.5 py-0.5 font-body text-xs font-medium transition-colors duration-200 ${
          light
            ? lang === "EN"
              ? "bg-white/20 text-white"
              : "text-white/50"
            : lang === "EN"
              ? "bg-ink text-white"
              : "text-ink/50 hover:text-ink"
        }`}
      >
        EN
      </motion.button>
    </div>
  );
}

function HamburgerButton({
  open,
  onClick,
  buttonRef,
  progress,
}: {
  open: boolean;
  onClick: () => void;
  buttonRef: React.RefObject<HTMLButtonElement>;
  progress: number;
}) {
  const light = progress < 0.5;
  return (
    <motion.button
      ref={buttonRef}
      whileTap={{ scale: 0.85 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      onClick={onClick}
      className="relative z-[70] flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
      aria-label={open ? "Cerrar menú" : "Abrir menú"}
      aria-expanded={open}
    >
      <motion.span
        className="block h-0.5 w-6"
        animate={
          open
            ? { rotate: 45, y: 8, backgroundColor: "#2D2926" }
            : { rotate: 0, y: 0, backgroundColor: light ? "#FAF8F5" : "#2D2926" }
        }
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
      <motion.span
        className="block h-0.5 w-6"
        animate={
          open
            ? { opacity: 0, scaleX: 0, backgroundColor: "#2D2926" }
            : { opacity: 1, scaleX: 1, backgroundColor: light ? "#FAF8F5" : "#2D2926" }
        }
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
      <motion.span
        className="block h-0.5 w-6"
        animate={
          open
            ? { rotate: -45, y: -8, backgroundColor: "#2D2926" }
            : { rotate: 0, y: 0, backgroundColor: light ? "#FAF8F5" : "#2D2926" }
        }
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
    </motion.button>
  );
}

function MobileOverlay({
  open,
  onClose,
  lang,
  setLang,
  t,
  hamburgerRef,
}: {
  open: boolean;
  onClose: () => void;
  lang: string;
  setLang: (l: "ES" | "EN") => void;
  t: (key: string) => string;
  hamburgerRef: React.RefObject<HTMLButtonElement>;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Focus trap
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;

    const focusable = panel.querySelectorAll<HTMLElement>(
      'a[href], button, input, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    first?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  // Return focus on close
  useEffect(() => {
    if (!open) {
      hamburgerRef.current?.focus();
    }
  }, [open, hamburgerRef]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-[65] bg-ink/50 backdrop-blur-sm md:hidden"
          />

          {/* Panel */}
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navegación móvil"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 bottom-0 z-[66] w-[85%] max-w-sm flex flex-col md:hidden overflow-hidden"
          >
            {/* Dark background with diagonal gradient */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(160deg, #2D2926 0%, #1C1B19 50%, #2D2926 100%)",
              }}
            />
            {/* Subtle warm grain overlay */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
              }}
            />

            {/* Content */}
            <div className="relative flex flex-col h-full">
              {/* Panel header */}
              <div className="flex items-center justify-between px-6 h-[72px] shrink-0">
                <motion.button
                  onClick={onClose}
                  whileTap={{ scale: 0.85 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 hover:border-white/25 transition-colors"
                  aria-label="Cerrar menú"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-4 w-4 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </motion.button>

                <Image
                  src="/images/logo.png"
                  alt="Fersion Tech"
                  width={90}
                  height={22}
                  className="h-auto w-auto brightness-0 invert object-contain"
                />
              </div>

              {/* Nav links */}
              <div className="flex flex-1 flex-col justify-center px-6">
                <nav
                  className="flex flex-col"
                  aria-label="Navegación móvil"
                >
                  {NAV_LINKS.map((link, i) => (
                    <motion.a
                      key={link.key}
                      href={link.href}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 30 }}
                      transition={{
                        delay: 0.08 + i * 0.05,
                        duration: 0.4,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                      onClick={onClose}
                      className="group flex items-center py-4 transition-colors"
                    >
                      <span className="font-body text-lg font-medium text-bg/90 transition-colors group-hover:text-forest">
                        {t(link.key)}
                      </span>
                    </motion.a>
                  ))}
                </nav>
              </div>

              {/* Bottom section */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.08 + NAV_LINKS.length * 0.05 + 0.15,
                  duration: 0.4,
                }}
                className="px-6 pb-10 pt-4 flex flex-col gap-5"
              >
                {/* Divider gradient */}
                <div className="h-[1px] w-full bg-gradient-to-r from-bronze/40 via-bronze/20 to-transparent" />

                {/* WhatsApp CTA */}
                <motion.a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-forest py-3.5 font-body text-sm font-medium text-white transition-colors hover:bg-forest/90"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-4 w-4"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  {t("menu.whatsapp")}
                </motion.a>

                {/* Language toggle */}
                <div
                  className="flex items-center gap-1 self-start rounded-full border border-white/10 px-1 py-0.5"
                  role="group"
                  aria-label="Selector de idioma"
                >
                  <motion.button
                    whileTap={{ scale: 0.92 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    onClick={() => setLang("ES")}
                    aria-label="Cambiar a español"
                    aria-pressed={lang === "ES"}
                    className={`rounded-full px-3 py-1 font-body text-xs font-medium transition-colors ${
                      lang === "ES"
                        ? "bg-white/15 text-white"
                        : "text-white/40 hover:text-white/70"
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
                    className={`rounded-full px-3 py-1 font-body text-xs font-medium transition-colors ${
                      lang === "EN"
                        ? "bg-white/15 text-white"
                        : "text-white/40 hover:text-white/70"
                    }`}
                  >
                    EN
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ──────────────────────── main component ──────────────────────────── */

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, setLang, t } = useLang();
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const {
    height,
    borderRadius,
    padX,
    bgOpacity,
    blurAmount,
    shadowOpacity,
    progress,
  } = useScrollNavbar();

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleClose = useCallback(() => setMobileOpen(false), []);

  return (
    <>
      {/* ─── Gradient overlay — provides contrast over hero when navbar is transparent ─── */}
      <div
        className="pointer-events-none fixed inset-x-0 top-0 z-40 h-[120px]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.45), transparent)",
          opacity: 1 - progress,
        }}
      />

      {/* ─── Header ─── */}
      <motion.header
        className="fixed top-0 inset-x-0 z-50 flex items-center"
        style={{
          height,
          borderRadius,
          marginLeft: padX,
          marginRight: padX,
          width: `calc(100% - ${padX * 2}px)`,
          backgroundColor: `rgba(250, 248, 245, ${bgOpacity})`,
          backdropFilter: `blur(${blurAmount}px)`,
          WebkitBackdropFilter: `blur(${blurAmount}px)`,
          boxShadow: `0 1px 3px rgba(45, 41, 38, ${shadowOpacity})`,
        }}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 lg:px-10 xl:max-w-[90rem] xl:px-12">
          <NavbarLogo progress={progress} />

          {/* Desktop nav */}
          <nav
            className="hidden items-center gap-8 lg:gap-10 xl:gap-12 md:flex"
            aria-label="Navegación principal"
          >
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.key}
                href={link.href}
                label={t(link.key)}
                progress={progress}
              />
            ))}

            <LanguageToggle
              lang={lang}
              setLang={setLang}
              progress={progress}
              variant="desktop"
            />
          </nav>

          {/* Hamburger */}
          <HamburgerButton
            open={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            buttonRef={hamburgerRef}
            progress={progress}
          />
        </div>
      </motion.header>

      {/* ─── Mobile Overlay ─── */}
      <MobileOverlay
        open={mobileOpen}
        onClose={handleClose}
        lang={lang}
        setLang={setLang}
        t={t}
        hamburgerRef={hamburgerRef}
      />

      {/* ─── WhatsApp FAB ─── */}
      <motion.a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        whileTap={{ scale: 0.85 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-forest text-white"
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
