"use client";

import Image from "next/image";

export default function SobreNosotros() {
  return (
    <section id="sobre-nosotros" className="bg-bg py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-10">
        <div className="grid items-start gap-16 md:grid-cols-2 md:gap-20">
          {/* Text column */}
          <div>
            <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.2em] text-bronze">
              Sobre nosotros
            </p>

            <div className="space-y-6 font-body text-ink" style={{ fontSize: "18.5px", lineHeight: 1.7 }}>
              <p>
                Soy Federico Ojeda, formado en la UTN y de manera autodidacta
                como desarrollador de software, trabajando hace más de 4 años
                con empresas y realtors (agentes inmobiliarios) estadounidenses
                de manera remota.
              </p>

              <p>
                Junto con Sergio Alvarenga, fotógrafo y filmmaker profesional,
                decidimos crear Softix. Utilizando las últimas
                herramientas en tecnología, multimedia e inteligencia
                artificial, desarrollamos un sistema integral para inmobiliarias
                y agentes: contenido, presencia digital y gestión, todo en un
                mismo lugar.
              </p>
            </div>

            {/* Credential cards */}
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <div className="flex items-center gap-3 rounded-xl border border-line bg-bg px-5 py-3.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-bronze/10 text-bronze">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4.5 w-4.5">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                </span>
                <span className="font-body text-sm font-medium text-ink/80">
                  Desarrollo de software
                </span>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-line bg-bg px-5 py-3.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-bronze/10 text-bronze">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4.5 w-4.5">
                    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                    <circle cx="12" cy="13" r="3" />
                  </svg>
                </span>
                <span className="font-body text-sm font-medium text-ink/80">
                  Fotografía y filmmaking profesional
                </span>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-line bg-bg px-5 py-3.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-bronze/10 text-bronze">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4.5 w-4.5">
                    <path d="M12 2a4 4 0 0 0-4 4v2H6a2 2 0 0 0-2 2v2c0 1.1.9 2 2 2h2v2a4 4 0 0 0 8 0v-2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-2V6a4 4 0 0 0-4-4z" />
                    <circle cx="9" cy="10" r="1" fill="currentColor" />
                    <circle cx="15" cy="10" r="1" fill="currentColor" />
                  </svg>
                </span>
                <span className="font-body text-sm font-medium text-ink/80">
                  Inteligencia artificial
                </span>
              </div>
            </div>
          </div>

          {/* Visual block */}
          <div className="flex items-center justify-center">
            <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-2xl">
              <Image
                src="/images/Sobre_nosotros.jpeg"
                alt="Sobre nosotros"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
