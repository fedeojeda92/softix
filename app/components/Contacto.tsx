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
    console.log("Form payload:", form);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setForm({ nombre: "", email: "", telefono: "", tipoPropiedad: "", mensaje: "" });
  };

  const inputClass =
    "w-full rounded-xl border border-line bg-bg px-4 py-3 font-body text-sm text-ink placeholder:text-ink/30 outline-none transition-all duration-300 focus:border-forest focus:shadow-[0_0_0_3px_rgba(194,119,94,0.1)] focus:scale-[1.01]";

  return (
    <section id="contacto" className="bg-bg py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center md:mb-16"
        >
          <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.2em] text-bronze">
            {t("contact.badge")}
          </p>
          <h2 className="font-display text-3xl font-semibold text-ink md:text-[2.75rem]">
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
                  className="mt-1.5 font-body text-xs text-red-500"
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
                  className="mt-1.5 font-body text-xs text-red-500"
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
                className={`${inputClass} ${!form.tipoPropiedad ? "text-ink/30" : ""}`}
              >
                <option value="">{t("contact.propertyType")}</option>
                <option value="casa">{t("contact.prop.casa")}</option>
                <option value="departamento">{t("contact.prop.departamento")}</option>
                <option value="ph">{t("contact.prop.ph")}</option>
                <option value="terreno">{t("contact.prop.terreno")}</option>
                <option value="local">{t("contact.prop.local")}</option>
                <option value="oficina">{t("contact.prop.oficina")}</option>
                <option value="otro">{t("contact.prop.otro")}</option>
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
                  className="mt-1.5 font-body text-xs text-red-500"
                >
                  {errors.mensaje}
                </motion.p>
              )}
            </motion.div>

            <motion.div variants={itemVariants}>
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-2 w-full rounded-full bg-forest py-3.5 font-body text-sm font-medium text-white transition-colors hover:bg-forest/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? t("contact.sending") : t("contact.send")}
              </motion.button>
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
              <h4 className="mb-1 font-display text-base font-semibold text-ink">
                {t("contact.emailLabel")}
              </h4>
              <a
                href="mailto:hola@softix.com.ar"
                className="group flex items-center gap-2.5 font-body text-sm text-ink/60 transition-colors hover:text-ink"
              >
                <motion.span
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Mail className="h-4 w-4 text-bronze" strokeWidth={1.5} />
                </motion.span>
                hola@softix.com.ar
              </a>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h4 className="mb-1 font-display text-base font-semibold text-ink">
                {t("contact.whatsappLabel")}
              </h4>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 font-body text-sm text-ink/60 transition-colors hover:text-ink"
              >
                <motion.span
                  whileHover={{ rotate: -10, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Phone className="h-4 w-4 text-bronze" strokeWidth={1.5} />
                </motion.span>
                +54 9 115956-8286
              </a>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h4 className="mb-1 font-display text-base font-semibold text-ink">
                {t("contact.hoursLabel")}
              </h4>
              <p className="flex items-center gap-2.5 font-body text-sm text-ink/60">
                <Clock className="h-4 w-4 text-bronze" strokeWidth={1.5} />
                {t("contact.hours")}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
