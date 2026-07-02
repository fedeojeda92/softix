"use client";

// TODO: integrar mapa interactivo cuando se defina la cobertura final

const ZONAS = ["CABA", "Zona Norte", "Zona Oeste", "Zona Sur", "La Plata"];

export default function ZonasCobertura() {
  return (
    <section id="cobertura" className="bg-bg-dark py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-5 text-center sm:px-6 lg:px-10">
        <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.2em] text-bronze">
          Cobertura
        </p>
        <h2 className="mb-12 font-display text-3xl font-semibold text-white md:text-[2.75rem]">
          Zonas de cobertura
        </h2>

        <div className="flex flex-wrap justify-center gap-3">
          {ZONAS.map((zona) => (
            <span
              key={zona}
              className="rounded-full border border-white/10 bg-white/5 px-6 py-2.5 font-body text-sm font-medium text-white/80"
            >
              {zona}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
