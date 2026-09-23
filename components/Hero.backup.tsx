import Image from "next/image";
import { ArrowRight } from "lucide-react";
import WhatsAppCTA from "./WhatsAppCTA";

export default function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-ivory pt-10 sm:pt-14 lg:pt-16">
      <div className="container-page grid grid-cols-1 items-center gap-10 lg:grid-cols-[11fr_9fr] lg:gap-0">
        {/* Texto — 55% no desktop (o padding à direita é o respiro até a foto).
            Ordem natural: texto primeiro no mobile. */}
        <div className="order-1 animate-fade-in-up lg:pr-10">
          <p className="mb-5 text-xs font-semibold uppercase tracking-widest2 text-sage-dark">
            Dentista em Osasco
          </p>
          <h1 className="font-display text-[2.3rem] leading-[1.12] text-graphite sm:text-5xl lg:text-[3.1rem] lg:leading-[1.1]">
            Odontologia com cuidado, precisão e atenção em cada detalhe.
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-graphite/75 sm:text-lg">
            Atendimento odontológico em Osasco para cuidar da saúde, função e
            estética do seu sorriso com acompanhamento próximo e
            individualizado.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <WhatsAppCTA location="hero" className="w-full sm:w-auto">
              Agendar uma avaliação
            </WhatsAppCTA>
            <a
              href="#tratamentos"
              className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-full border border-graphite/15 px-7 py-3.5 text-sm font-semibold text-graphite transition-colors hover:border-deep hover:text-deep sm:w-auto"
            >
              Conhecer tratamentos
              <ArrowRight className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
            </a>
          </div>

          <dl className="mt-12 grid grid-cols-1 gap-4 border-t border-graphite/10 pt-8 sm:grid-cols-3 sm:gap-6">
            {[
              "Atendimento em Osasco",
              "Diversos tratamentos em um só lugar",
              "Contato rápido pelo WhatsApp",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2.5">
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sage"
                  aria-hidden="true"
                />
                <dd className="text-sm leading-snug text-graphite/70">{item}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Imagem editorial — coluna de 45% no desktop, com a foto
            alinhada à direita e limitada a 500px; depois do texto no mobile. */}
        <div className="order-2 flex justify-center lg:justify-end">
          {/* Fotografia 4:3 (1600×1200) exibida no mesmo 4:3 em todos os
              breakpoints: sem corte, sem distorção e sem layout shift.
              A foto já contém a aplicação da logo (canto inferior direito). */}
          <div className="relative aspect-[4/3] w-full max-w-[600px] overflow-hidden rounded-xl2 bg-beige shadow-softer lg:max-w-[500px]">
            <Image
              src="/images/hero-clinica.webp"
              alt="Dois profissionais da SC Clínica Odontológica realizando atendimento em paciente no consultório, em Osasco"
              fill
              priority
              quality={85}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 600px, 500px"
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
