import Image from "next/image";
import Reveal from "./Reveal";
import { PROFESSIONALS, type Professional as ProfessionalData } from "@/lib/professionals";

// Os dados dos profissionais (foto, CRO, áreas de atuação e biografia)
// ficam em lib/professionals.ts. Campos não preenchidos não são exibidos.

function ProfessionalPhoto({ professional }: { professional: ProfessionalData }) {
  if (professional.photo) {
    return (
      <Image
        src={professional.photo}
        alt={`${professional.name}, da SC Clínica Odontológica`}
        fill
        sizes="(max-width: 768px) 90vw, 400px"
        className="object-cover"
      />
    );
  }

  // Placeholder elegante enquanto a fotografia definitiva não é enviada.
  return (
    <div
      role="img"
      aria-label={`Fotografia de ${professional.name} em breve`}
      className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-beige/70 via-ivory to-nude/50"
    >
      <span className="flex h-24 w-24 items-center justify-center rounded-full border border-deep/15 bg-ivory/70 font-display text-3xl tracking-wide text-deep/70 shadow-soft sm:h-28 sm:w-28 sm:text-4xl">
        {professional.initials}
      </span>
      <span className="mt-5 text-[0.7rem] font-semibold uppercase tracking-widest2 text-graphite/40">
        Fotografia em breve
      </span>
    </div>
  );
}

function ProfessionalCard({ professional }: { professional: ProfessionalData }) {
  const { name, cro, areas, bio } = professional;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl2 bg-white shadow-card">
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <ProfessionalPhoto professional={professional} />
      </div>

      <div className="flex flex-1 flex-col px-6 py-6 sm:px-7 sm:py-7">
        <span className="mb-4 block h-px w-10 bg-sage/60" aria-hidden="true" />
        <h3 className="text-balance font-display text-xl leading-snug text-graphite sm:text-[1.4rem]">
          {name}
        </h3>

        {cro && <p className="mt-1.5 text-sm text-graphite/60">{cro}</p>}

        {areas && areas.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Áreas de atuação">
            {areas.map((area) => (
              <li
                key={area}
                className="rounded-full border border-sage/30 bg-ivory px-3 py-1 text-xs font-medium text-sage-dark"
              >
                {area}
              </li>
            ))}
          </ul>
        )}

        {bio && (
          <p className="mt-4 text-sm leading-relaxed text-graphite/70 sm:text-[0.95rem]">
            {bio}
          </p>
        )}
      </div>
    </article>
  );
}

export default function Professional() {
  return (
    <section id="profissionais" className="bg-ivory py-20 sm:py-28">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest2 text-sage-dark">
            Quem cuida do seu sorriso
          </p>
          <h2 className="text-balance font-display text-3xl leading-tight text-graphite sm:text-4xl">
            Atendimento próximo, cuidadoso e profissional.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-graphite/75 sm:text-lg">
            Na SC Clínica Odontológica, cada atendimento é conduzido com
            atenção às necessidades individuais do paciente, desde a primeira
            avaliação até o acompanhamento do tratamento.
          </p>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-sm grid-cols-1 gap-8 sm:mt-16 md:max-w-3xl md:grid-cols-2 lg:max-w-4xl lg:gap-10">
          {PROFESSIONALS.map((professional, i) => (
            <Reveal key={professional.slug} delay={i * 100} className="h-full">
              <ProfessionalCard professional={professional} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
