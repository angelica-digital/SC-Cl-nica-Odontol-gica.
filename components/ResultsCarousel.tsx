"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BeforeAfterSlider from "./BeforeAfterSlider";
import type { ResultCase } from "@/lib/results";

interface ResultsCarouselProps {
  cases: (ResultCase & { hasImages: boolean })[];
}

/**
 * Desktop (lg+): comparadores lado a lado em grid.
 * Mobile/tablet: carrossel horizontal com scroll-snap, um caso por vez.
 * O swipe do carrossel funciona fora da imagem (legenda/margens) e pelos
 * botões/indicadores; dentro da imagem, o gesto horizontal move apenas a
 * divisória do comparador (touch-action: pan-y no slider).
 */
export default function ResultsCarousel({ cases }: ResultsCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const slideAt = (i: number) =>
    trackRef.current?.children[i] as HTMLElement | undefined;

  const goTo = (i: number) => {
    const track = trackRef.current;
    const slide = slideAt(i);
    if (!track || !slide) return;
    track.scrollTo({
      left: slide.offsetLeft - (track.clientWidth - slide.clientWidth) / 2,
      behavior: "smooth",
    });
  };

  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const center = track.scrollLeft + track.clientWidth / 2;
    let nearest = 0;
    let best = Infinity;
    Array.from(track.children).forEach((child, i) => {
      const el = child as HTMLElement;
      const d = Math.abs(el.offsetLeft + el.clientWidth / 2 - center);
      if (d < best) {
        best = d;
        nearest = i;
      }
    });
    setActive(nearest);
  };

  return (
    <div>
      <div
        ref={trackRef}
        onScroll={onScroll}
        role="list"
        aria-label="Casos de antes e depois"
        className="-my-3 flex snap-x snap-mandatory gap-4 overflow-x-auto py-3 [scrollbar-width:none] sm:gap-6 lg:grid lg:snap-none lg:grid-cols-3 lg:gap-8 lg:overflow-visible [&::-webkit-scrollbar]:hidden"
      >
        {cases.map((item, i) => (
          <figure
            key={item.slug}
            role="listitem"
            aria-label={`Caso ${i + 1} de ${cases.length}: ${item.treatment}`}
            className="w-full shrink-0 snap-center sm:w-[62%] lg:w-auto"
          >
            <BeforeAfterSlider
              treatment={item.treatment}
              beforeImage={item.beforeImage}
              afterImage={item.afterImage}
              altBefore={item.altBefore}
              altAfter={item.altAfter}
              hasImages={item.hasImages}
            />
            <figcaption className="mt-5 flex items-baseline gap-3">
              <span className="text-xs font-semibold tracking-widest2 text-sage-dark">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-xl text-graphite">
                {item.treatment}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Navegação do carrossel — somente mobile/tablet */}
      <div className="mt-8 flex items-center justify-center gap-5 lg:hidden">
        <button
          type="button"
          onClick={() => goTo(Math.max(0, active - 1))}
          disabled={active === 0}
          aria-label="Caso anterior"
          className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-graphite/15 text-graphite transition-colors hover:border-deep hover:text-deep disabled:opacity-30"
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={1.6} />
        </button>

        <div className="flex items-center gap-2">
          {cases.map((item, i) => (
            <button
              key={item.slug}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Ver caso ${i + 1}: ${item.treatment}`}
              aria-current={i === active ? "true" : undefined}
              className="focus-ring flex h-6 items-center justify-center px-0.5"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-300 ${
                  i === active ? "w-6 bg-deep" : "w-1.5 bg-graphite/25"
                }`}
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => goTo(Math.min(cases.length - 1, active + 1))}
          disabled={active === cases.length - 1}
          aria-label="Próximo caso"
          className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-graphite/15 text-graphite transition-colors hover:border-deep hover:text-deep disabled:opacity-30"
        >
          <ChevronRight className="h-5 w-5" strokeWidth={1.6} />
        </button>
      </div>
    </div>
  );
}
