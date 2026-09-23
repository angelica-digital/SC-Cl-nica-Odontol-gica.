import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import { whatsappLink } from "@/lib/constants";
import { TREATMENTS } from "@/lib/treatments";

export default function Treatments() {
  return (
    <section id="tratamentos" className="bg-white py-20 sm:py-28">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest2 text-sage-dark">
            Tratamentos
          </p>
          <h2 className="font-display text-3xl leading-tight text-graphite sm:text-4xl">
            Cuidados para diferentes momentos do seu sorriso
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TREATMENTS.map((treatment, i) => {
            const Icon = treatment.icon;
            return (
              <Reveal key={treatment.slug} delay={(i % 4) * 60}>
                <div className="group flex h-full flex-col rounded-xl2 border border-graphite/10 bg-ivory p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-sage/40 hover:shadow-softer">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-deep/10 text-deep">
                    <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-xl text-graphite">
                    {treatment.name}
                  </h3>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-graphite/70">
                    {treatment.description}
                  </p>
                  <a
                    href={whatsappLink(
                      `Olá, tudo bem? Gostaria de saber mais sobre ${treatment.name.toLowerCase()}`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-event="whatsapp_click"
                    data-location="tratamentos"
                    className="focus-ring mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-deep transition-colors hover:text-sage-dark"
                  >
                    Saiba mais
                    <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
