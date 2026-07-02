"use client";

import { useState, FormEvent } from "react";
import { Mail, Phone, Clock } from "lucide-react";

const WHATSAPP_LINK = "https://wa.me/549XXXXXXXXXX";

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

export default function Contacto() {
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
    if (!form.nombre.trim()) e.nombre = "Ingresá tu nombre";
    if (!form.email.trim()) {
      e.email = "Ingresá tu email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Email inválido";
    }
    if (!form.mensaje.trim()) e.mensaje = "Ingresá tu mensaje";
    return e;
  };

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setLoading(true);
    // TODO: conectar a endpoint de envío / Resend
    console.log("Form payload:", form);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setForm({ nombre: "", email: "", telefono: "", tipoPropiedad: "", mensaje: "" });
  };

  const inputClass =
    "w-full rounded-xl border border-line bg-bg px-4 py-3 font-body text-sm text-ink placeholder:text-ink/30 outline-none transition-colors focus:border-forest";

  return (
    <section id="contacto" className="bg-bg py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="mb-16 text-center md:mb-20">
          <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.2em] text-bronze">
            Contacto
          </p>
          <h2 className="font-display text-3xl font-semibold text-ink md:text-[2.75rem]">
            Hablemos de tu proyecto
          </h2>
        </div>

        <div className="grid gap-16 md:grid-cols-5 md:gap-20">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-5 md:col-span-3"
          >
            {/* Nombre */}
            <div>
              <input
                type="text"
                placeholder="Nombre"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                className={inputClass}
              />
              {errors.nombre && (
                <p className="mt-1.5 font-body text-xs text-red-500">{errors.nombre}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={inputClass}
              />
              {errors.email && (
                <p className="mt-1.5 font-body text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Teléfono */}
            <input
              type="tel"
              placeholder="Teléfono (opcional)"
              value={form.telefono}
              onChange={(e) => setForm({ ...form, telefono: e.target.value })}
              className={inputClass}
            />

            {/* Tipo de propiedad */}
            <select
              value={form.tipoPropiedad}
              onChange={(e) => setForm({ ...form, tipoPropiedad: e.target.value })}
              className={`${inputClass} ${!form.tipoPropiedad ? "text-ink/30" : ""}`}
            >
              <option value="">Tipo de propiedad (opcional)</option>
              <option value="casa">Casa</option>
              <option value="departamento">Departamento</option>
              <option value="ph">PH</option>
              <option value="terreno">Terreno</option>
              <option value="local">Local comercial</option>
              <option value="oficina">Oficina</option>
              <option value="otro">Otro</option>
            </select>

            {/* Mensaje */}
            <div>
              <textarea
                placeholder="Mensaje"
                rows={5}
                value={form.mensaje}
                onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                className={`${inputClass} resize-none`}
              />
              {errors.mensaje && (
                <p className="mt-1.5 font-body text-xs text-red-500">{errors.mensaje}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 rounded-full bg-forest py-3.5 font-body text-sm font-medium text-white transition-colors hover:bg-forest/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Enviando..." : "Enviar mensaje"}
            </button>
          </form>

          {/* Contact info */}
          <div className="flex flex-col gap-8 md:col-span-2">
            <div>
              <h4 className="mb-1 font-display text-base font-semibold text-ink">
                Email
              </h4>
              <a
                href="mailto:hola@softix.com.ar"
                className="flex items-center gap-2.5 font-body text-sm text-ink/60 transition-colors hover:text-ink"
              >
                <Mail className="h-4 w-4 text-bronze" strokeWidth={1.5} />
                hola@softix.com.ar
              </a>
            </div>

            <div>
              <h4 className="mb-1 font-display text-base font-semibold text-ink">
                WhatsApp
              </h4>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 font-body text-sm text-ink/60 transition-colors hover:text-ink"
              >
                <Phone className="h-4 w-4 text-bronze" strokeWidth={1.5} />
                +54 9 XX XXXX-XXXX
              </a>
            </div>

            <div>
              <h4 className="mb-1 font-display text-base font-semibold text-ink">
                Horario de atención
              </h4>
              <p className="flex items-center gap-2.5 font-body text-sm text-ink/60">
                <Clock className="h-4 w-4 text-bronze" strokeWidth={1.5} />
                Lun a Vie — 9 a 18 hs
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
