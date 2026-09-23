import { existsSync } from "fs";
import { join } from "path";
import Reveal from "./Reveal";
import ResultsCarousel from "./ResultsCarousel";
import { RESULT_CASES } from "@/lib/results";

// Verifica no servidor se as fotos existem em /public. Se ainda não
// existirem, o comparador exibe um placeholder em vez de imagem quebrada.
function imageExists(src: string) {
  return existsSync(join(process.cwd(), "public", src));
}

export default function ResultsSection() {
  const cases = RESULT_CASES.map((item) => ({
    ...item,
    hasImages: imageExists(item.beforeImage) && imageExists(item.afterImage),
  }));

  return (
    <section id="resultados" className="bg-ivory py-20 sm:py-28">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest2 text-sage-dark">
            Antes e depois
          </p>
          <h2 className="text-balance font-display text-3xl leading-tight text-graphite sm:text-4xl">
            Resultados que podem ser vistos nos detalhes
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-graphite/75 sm:text-lg">
            Compare alguns resultados de tratamentos realizados na clínica.
          </p>
          <p className="mt-3 text-sm text-graphite/60">
            Arraste a divisória para comparar.
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-12 sm:mt-14">
          <ResultsCarousel cases={cases} />
        </Reveal>

        <p className="mx-auto mt-10 max-w-2xl text-center text-xs leading-relaxed text-graphite/55">
          Os resultados variam de pessoa para pessoa e dependem da avaliação
          individual de cada caso. As imagens não representam garantia de
          resultado.
        </p>
      </div>
    </section>
  );
}
