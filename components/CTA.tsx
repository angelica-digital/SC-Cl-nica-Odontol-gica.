import Reveal from "./Reveal";
import WhatsAppCTA from "./WhatsAppCTA";

interface CTAProps {
  location: string;
}

export default function CTA({ location }: CTAProps) {
  return (
    <section className="bg-deep py-16 sm:py-20">
      <div className="container-page">
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <h2 className="font-display text-3xl leading-tight text-ivory sm:text-4xl">
            Seu cuidado pode começar com uma conversa.
          </h2>
          <p className="max-w-md text-base leading-relaxed text-ivory/75">
            Entre em contato pelo WhatsApp para tirar dúvidas e solicitar seu
            agendamento.
          </p>
          <WhatsAppCTA
            location={location}
            variant="ghost"
            className="mt-2"
          >
            Falar com a clínica
          </WhatsAppCTA>
        </Reveal>
      </div>
    </section>
  );
}
