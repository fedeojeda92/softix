"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Clock } from "lucide-react";
import { useLang } from "../lib/LanguageContext";

const WHATSAPP_LINK = "https://wa.me/5491159568286?text=Hola%2C%20me%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20sobre%20sus%20servicios.";

interface FormData {
  nombre: string;
  email: string;
  telefono: string;
  tipoPropiedad: string;
  mensaje: string;
}

interface FormErrors {
  nombre?: string;
  email?: string;
  mensaje?: string;
}

const FLOATING_DOTS = [
  { x: "5%", y: "15%", size: 3, color: "bg-forest/20", delay: 0, duration: 7 },
  { x: "90%", y: "20%", size: 2, color: "bg-bronze/15", delay: 1.5, duration: 6 },
  { x: "85%", y: "75%", size: 4, color: "bg-forest/15", delay: 0.8, duration: 8 },
  { x: "10%", y: "80%", size: 3, color: "bg-bronze/20", delay: 2, duration: 5 },
  { x: "55%", y: "8%", size: 2, color: "bg-white/10", delay: 1, duration: 7 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function Contacto() {
  const { t } = useLang();
  const [form, setForm] = useState<FormData>({
    nombre: "",
    email: "",
    telefono: "",
    tipoPropiedad: "",
    mensaje: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!form.nombre.trim()) e.nombre = t("contact.error.name");
    if (!form.email.trim()) {
      e.email = t("contact.error.email");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = t("contact.error.emailInvalid");
    }
    if (!form.mensaje.trim()) e.mensaje = t("contact.error.message");
    return e;
  };

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setLoading(true);
    try {
      const res = await fetch("https://formsubmit.co/ajax/fersiontech@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          nombre: form.nombre,
          email: form.email,
          telefono: form.telefono || "No especificado",
          tipoPropiedad: form.tipoPropiedad || "No especificado",
          mensaje: form.mensaje,
        }),
      });
      if (!res.ok) throw new Error("Error al enviar");
      setSubmitted(true);
      setForm({ nombre: "", email: "", telefono: "", tipoPropiedad: "", mensaje: "" });
    } catch {
      setErrors({ mensaje: "Error al enviar. Intentá de nuevo." });
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-body text-sm text-white placeholder:text-white/30 outline-none backdrop-blur-sm transition-all duration-300 focus:border-forest/50 focus:shadow-[0_0_0_3px_rgba(194,119,94,0.1)] focus:scale-[1.01] focus:bg-white/8";

  return (
    <section id="contacto" className="relative overflow-hidden bg-[#1a1715] py-14 md:py-20">
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

      <div className="relative z-20 mx-auto max-w-6xl px-5 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center md:mb-16"
        >
          <motion.span
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4 inline-block rounded-full border border-forest/20 bg-forest/10 px-5 py-2 font-body text-xs font-semibold uppercase tracking-[0.2em] text-forest backdrop-blur-sm sm:text-sm"
          >
            {t("contact.badge")}
          </motion.span>
          <h2 className="font-display text-3xl font-semibold text-white md:text-[2.75rem]">
            {t("contact.title")}
          </h2>
        </motion.div>

        <div className="grid gap-12 md:grid-cols-5 md:gap-16">
          <motion.form
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-5 md:col-span-3"
          >
            <motion.div variants={itemVariants}>
              <input
                type="text"
                placeholder={t("contact.name")}
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                aria-label={t("contact.name")}
                className={inputClass}
              />
              {errors.nombre && (
                <motion.p
                  initial={{ opacity: 0, y: -5, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="mt-1.5 font-body text-xs text-red-400"
                >
                  {errors.nombre}
                </motion.p>
              )}
            </motion.div>

            <motion.div variants={itemVariants}>
              <input
                type="email"
                placeholder={t("contact.email")}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                aria-label={t("contact.email")}
                className={inputClass}
              />
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -5, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="mt-1.5 font-body text-xs text-red-400"
                >
                  {errors.email}
                </motion.p>
              )}
            </motion.div>

            <motion.div variants={itemVariants}>
              <input
                type="tel"
                placeholder={t("contact.phone")}
                value={form.telefono}
                onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                aria-label={t("contact.phone")}
                className={inputClass}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <select
                value={form.tipoPropiedad}
                onChange={(e) => setForm({ ...form, tipoPropiedad: e.target.value })}
                aria-label={t("contact.propertyType")}
                className={`${inputClass} appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22rgba(255%2C255%2C255%2C0.4)%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[right_12px_center] bg-no-repeat pr-10 ${!form.tipoPropiedad ? "text-white/30" : "text-white"}`}
              >
                <option value="" className="bg-[#2a2623] text-white">{t("contact.propertyType")}</option>
                <option value="casa" className="bg-[#2a2623] text-white">{t("contact.prop.casa")}</option>
                <option value="departamento" className="bg-[#2a2623] text-white">{t("contact.prop.departamento")}</option>
                <option value="ph" className="bg-[#2a2623] text-white">{t("contact.prop.ph")}</option>
                <option value="terreno" className="bg-[#2a2623] text-white">{t("contact.prop.terreno")}</option>
                <option value="local" className="bg-[#2a2623] text-white">{t("contact.prop.local")}</option>
                <option value="oficina" className="bg-[#2a2623] text-white">{t("contact.prop.oficina")}</option>
                <option value="otro" className="bg-[#2a2623] text-white">{t("contact.prop.otro")}</option>
              </select>
            </motion.div>

            <motion.div variants={itemVariants}>
              <textarea
                placeholder={t("contact.message")}
                rows={5}
                value={form.mensaje}
                onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                aria-label={t("contact.message")}
                className={`${inputClass} resize-none`}
              />
              {errors.mensaje && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1.5 font-body text-xs text-red-400"
                >
                  {errors.mensaje}
                </motion.p>
              )}
            </motion.div>

            <motion.div variants={itemVariants}>
              {submitted ? (
                <div className="mt-2 rounded-xl border border-forest/20 bg-forest/10 p-6 text-center backdrop-blur-sm">
                  <p className="font-body text-sm font-medium text-forest">
                    Mensaje enviado correctamente. Te contactamos pronto.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-3 font-body text-xs text-white/40 underline transition-colors hover:text-white/60"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-2 w-full rounded-full bg-forest py-3.5 font-body text-sm font-medium text-white transition-colors hover:bg-forest/90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? t("contact.sending") : t("contact.send")}
                </motion.button>
              )}
            </motion.div>
          </motion.form>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-col gap-8 md:col-span-2"
          >
            <motion.div variants={itemVariants}>
              <h4 className="mb-1 font-display text-base font-semibold text-white">
                {t("contact.emailLabel")}
              </h4>
              <a
                href="mailto:fersiontech@gmail.com"
                className="group flex items-center gap-2.5 font-body text-sm text-white/50 transition-colors hover:text-white"
              >
                <motion.span
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Mail className="h-4 w-4 text-forest" strokeWidth={1.5} />
                </motion.span>
                fersiontech@gmail.com
              </a>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h4 className="mb-1 font-display text-base font-semibold text-white">
                {t("contact.whatsappLabel")}
              </h4>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 font-body text-sm text-white/50 transition-colors hover:text-white"
              >
                <motion.span
                  whileHover={{ rotate: -10, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Phone className="h-4 w-4 text-forest" strokeWidth={1.5} />
                </motion.span>
                +54 9 115956-8286
              </a>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h4 className="mb-1 font-display text-base font-semibold text-white">
                {t("contact.hoursLabel")}
              </h4>
              <p className="flex items-center gap-2.5 font-body text-sm text-white/50">
                <Clock className="h-4 w-4 text-forest" strokeWidth={1.5} />
                {t("contact.hours")}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
