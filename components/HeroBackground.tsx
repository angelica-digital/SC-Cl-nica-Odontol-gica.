"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// Fotos de fundo do Hero. Cada uma tem enquadramento próprio
// (object-position): o primeiro valor vale até o tablet e o `lg:` no
// desktop, onde a faixa larga e baixa mostra só parte da altura da foto.
const SLIDES = [
  {
    src: "/images/Hero-principal-2.webp",
    alt: "Recepção da SC Clínica Odontológica, com balcão de atendimento e sala de espera",
    className: "object-[50%_40%] lg:object-[50%_78%]",
  },
  {
    src: "/images/hero-clinica.webp",
    alt: "Dois profissionais da SC Clínica Odontológica realizando atendimento em paciente no consultório, em Osasco",
    className: "object-[62%_40%] lg:object-[50%_32%]",
  },
  {
    src: "/images/Hero-principal-3.webp",
    alt: "Consultório da SC Clínica Odontológica, com cadeira odontológica e equipamentos",
    className: "object-[55%_65%] lg:object-[50%_65%]",
  },
];

const SLIDE_DURATION_MS = 6000;

/**
 * Fundo do Hero em crossfade. A foto ativa surge por cima da anterior,
 * que permanece 100% visível até o fim da transição — sem "piscar" nem
 * mostrar o fundo entre as fotos. Só o fundo muda; o conteúdo do Hero
 * fica fixo. Com prefers-reduced-motion, não troca sozinho.
 */
export default function HeroBackground() {
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const goTo = (index: number) => {
    if (index === active) return;
    setPrevious(active);
    setActive(index);
  };

  // Reinicia a contagem a cada troca (automática ou manual).
  useEffect(() => {
    if (reducedMotion) return;
    const timer = window.setTimeout(() => {
      setPrevious(active);
      setActive((active + 1) % SLIDES.length);
    }, SLIDE_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, [active, reducedMotion]);

  return (
    <>
      <div className="absolute inset-0 -z-20">
        {SLIDES.map((slide, i) => {
          const isActive = i === active;
          const isPrevious = i === previous;
          return (
            <Image
              key={slide.src}
              src={slide.src}
              alt={slide.alt}
              aria-hidden={!isActive}
              fill
              priority={i === 0}
              loading={i === 0 ? undefined : "eager"}
              quality={85}
              sizes="100vw"
              className={`object-cover transition-opacity duration-[1200ms] ease-in-out ${slide.className} ${
                isActive ? "z-[2] opacity-100" : isPrevious ? "z-[1] opacity-100" : "z-0 opacity-0"
              }`}
            />
          );
        })}
      </div>

      {/* Indicadores: discretos, na parte inferior central do Hero */}
      <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 items-center gap-0.5 rounded-full bg-ivory/75 px-1 py-0.5 shadow-soft backdrop-blur-sm">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Mostrar imagem ${i + 1} de ${SLIDES.length}`}
            aria-current={i === active ? "true" : undefined}
            className="focus-ring flex h-4 w-4 items-center justify-center"
          >
            <span
              className={`block h-1.5 rounded-full transition-all duration-300 ${
                i === active ? "w-3.5 bg-deep" : "w-1.5 bg-deep/35"
              }`}
            />
          </button>
        ))}
      </div>
    </>
  );
}
