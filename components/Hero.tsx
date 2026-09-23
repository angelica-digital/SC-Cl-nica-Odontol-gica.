import HeroBackground from "./HeroBackground";
import { whatsappLink } from "@/lib/constants";

// Logo do WhatsApp (a biblioteca de ícones do projeto não inclui marcas).
function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

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
            {/* CTA principal → página de agendamento online (mesmo visual do
                WhatsAppCTA variante "ghost"). */}
            <a
              href="/agendamento"
              data-location="hero"
              className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-full bg-ivory px-7 py-3.5 text-sm font-semibold tracking-wide text-deep transition-all duration-300 hover:bg-white sm:w-auto"
            >
              Agendar horário
            </a>
            {/* CTA secundário → conversa no WhatsApp. */}
            <a
              href={whatsappLink("Olá, tudo bem? Gostaria de tirar uma dúvida.")}
              target="_blank"
              rel="noopener noreferrer"
              data-event="whatsapp_click"
              data-location="hero-duvida"
              className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-full border border-ivory/40 px-7 py-3.5 text-sm font-semibold text-ivory transition-colors hover:border-ivory hover:bg-ivory/10 sm:w-auto"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Tirar uma dúvida
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
