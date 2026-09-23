import { Star } from "lucide-react";
import Reveal from "./Reveal";

export default function Reviews() {
  return (
    <section id="avaliacoes" className="bg-white py-20 sm:py-28">
      <div className="container-page">
        <Reveal className="mx-auto flex max-w-xl flex-col items-center text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest2 text-sage-dark">
            Avaliações
          </p>
          <h2 className="font-display text-3xl leading-tight text-graphite sm:text-4xl">
            5,0 no Google
          </h2>

          <div className="mt-5 flex items-center gap-1" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="h-5 w-5 fill-sage text-sage"
                strokeWidth={1.5}
              />
            ))}
          </div>

          <p className="mt-6 max-w-md text-base leading-relaxed text-graphite/70">
            A experiência dos pacientes também faz parte da nossa história.
          </p>

          {/*
            Estrutura preparada para futuras avaliações reais do Google:
            ao integrar a API do Google Places ou inserir depoimentos
            confirmados pela clínica, adicione os cards abaixo seguindo
            este mesmo componente — sem inventar nomes ou textos.
          */}
        </Reveal>
      </div>
    </section>
  );
}
