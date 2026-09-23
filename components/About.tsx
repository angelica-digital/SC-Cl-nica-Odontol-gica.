import Image from "next/image";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="a-clinica" className="bg-ivory py-20 sm:py-28">
      <div className="container-page container-editorial grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative order-2 lg:order-1">
          <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-xl2 shadow-soft lg:max-w-none">
            <Image
              src="/images/clinica-atendimento.jpg"
              alt="Ambiente interno da SC Clínica Odontológica durante atendimento"
              fill
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover"
            />
          </div>
          <div
            className="absolute -bottom-6 -right-4 hidden h-28 w-28 rounded-xl2 bg-sage/20 sm:block lg:-right-8"
            aria-hidden="true"
          />
        </Reveal>

        <Reveal delay={100} className="order-1 lg:order-2">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest2 text-[#D46A4A]">
            A clínica
          </p>
          <h2 className="font-display text-3xl leading-tight text-graphite sm:text-4xl">
            Cuidado que começa pela escuta.
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-graphite/75 sm:text-lg">
            Cada sorriso tem sua própria história. Por isso, o atendimento
            começa com uma avaliação cuidadosa para entender suas necessidades
            e indicar as possibilidades adequadas para cada caso.
          </p>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-graphite/75">
            Na SC Clínica Odontológica, em Osasco, reunimos diferentes
            tratamentos em um só lugar, com atenção individual em cada etapa
            do cuidado.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
