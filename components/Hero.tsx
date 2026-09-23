import { ArrowRight } from "lucide-react";
import HeroBackground from "./HeroBackground";
import WhatsAppCTA from "./WhatsAppCTA";

export default function Hero() {
  return (
    // Faixa fotográfica de largura total: foto + overlay cobrem a seção de
    // ponta a ponta; o conteúdo fica alinhado ao container padrão do site.
    // O fundo alterna 3 fotos em crossfade (HeroBackground); o conteúdo
    // permanece fixo.
    <section id="inicio" className="relative isolate overflow-hidden bg-deep-dark">
      <HeroBackground />

      {/* Overlay: no mobile/tablet protege todo o conteúdo (vertical);
          no desktop protege a esquerda e libera a foto à direita. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-deep-dark/70 via-deep-dark/75 to-deep-dark/90 lg:bg-gradient-to-r lg:from-deep-dark/90 lg:via-deep-dark/60 lg:via-45% lg:to-deep-dark/0"
      />

      {/* Fade inferior: dissolve a foto no branco da próxima seção só nos
          últimos pixels. Fica acima da foto/overlay e abaixo do conteúdo;
          praticamente transparente até a metade, branco sólido só no fim. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-10 bg-[linear-gradient(to_bottom,rgba(255,255,255,0)_0%,rgba(255,255,255,0.03)_45%,rgba(255,255,255,0.22)_70%,rgba(255,255,255,0.7)_90%,#ffffff_100%)] lg:h-12"
      />

      <div className="container-page py-10 sm:py-12 lg:flex lg:min-h-[533px] lg:items-center lg:py-8">
        <div className="max-w-[600px] animate-fade-in-up">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest2 text-beige">
            Dentista em Osasco
          </p>
          <h1 className="font-display text-[2.3rem] leading-[1.12] text-ivory sm:text-5xl lg:text-[3.1rem] lg:leading-[1.1]">
            Odontologia com cuidado, precisão e atenção em cada detalhe.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ivory/85 sm:text-lg">
            Atendimento odontológico em Osasco para cuidar da saúde, função e
            estética do seu sorriso com acompanhamento próximo e
            individualizado.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:mt-7">
            <WhatsAppCTA location="hero" variant="ghost" className="w-full sm:w-auto">
              Agendar uma avaliação
            </WhatsAppCTA>
            <a
              href="#tratamentos"
              className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-full border border-ivory/40 px-7 py-3.5 text-sm font-semibold text-ivory transition-colors hover:border-ivory hover:bg-ivory/10 sm:w-auto"
            >
              Conhecer tratamentos
              <ArrowRight className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
