"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Reveal from "./Reveal";

// Estrutura preparada para receber mais fotografias no futuro:
// basta adicionar novos itens a este array.
const GALLERY_IMAGES = [
  {
    src: "/images/clinica-atendimento.jpg",
    alt: "Atendimento em andamento na SC Clínica Odontológica",
    span: "sm:col-span-2 sm:row-span-2",
  },
  {
    src: "/images/procedimento-odontologico.jpg",
    alt: "Detalhe de procedimento odontológico realizado na clínica",
    span: "",
  },
  {
    src: "/images/profissional-sc.jpg",
    alt: "Profissional da clínica durante atendimento",
    span: "",
  },
];

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = () => setActiveIndex(null);
  const showPrev = () =>
    setActiveIndex((i) =>
      i === null ? null : (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length
    );
  const showNext = () =>
    setActiveIndex((i) => (i === null ? null : (i + 1) % GALLERY_IMAGES.length));

  return (
    <section className="bg-ivory py-20 sm:py-28">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest2 text-sage-dark">
            Galeria
          </p>
          <h2 className="font-display text-3xl leading-tight text-graphite sm:text-4xl">
            Um pouco da nossa rotina
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5">
          {GALLERY_IMAGES.map((image, i) => (
            <Reveal
              key={image.src}
              delay={i * 70}
              className={`${image.span} ${i === 0 ? "col-span-2" : ""}`}
            >
              <button
                type="button"
                onClick={() => setActiveIndex(i)}
                aria-label={`Ampliar imagem: ${image.alt}`}
                className="focus-ring group relative block h-full w-full overflow-hidden rounded-xl2 shadow-card"
              >
                <div className="relative aspect-[4/3] w-full sm:aspect-square">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {activeIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Visualização de imagem ampliada"
          className="fixed inset-0 z-50 flex items-center justify-center bg-graphite/95 p-4 animate-fade-in"
          onClick={close}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            aria-label="Fechar visualização"
            className="focus-ring absolute right-4 top-4 rounded-full p-2 text-ivory hover:bg-ivory/10 sm:right-6 sm:top-6"
          >
            <X className="h-6 w-6" strokeWidth={1.6} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            aria-label="Imagem anterior"
            className="focus-ring absolute left-2 top-1/2 -translate-y-1/2 rounded-full p-2 text-ivory hover:bg-ivory/10 sm:left-6"
          >
            <ChevronLeft className="h-7 w-7" strokeWidth={1.6} />
          </button>

          <div
            className="relative h-[70vh] w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={GALLERY_IMAGES[activeIndex].src}
              alt={GALLERY_IMAGES[activeIndex].alt}
              fill
              sizes="90vw"
              className="object-contain"
            />
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            aria-label="Próxima imagem"
            className="focus-ring absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 text-ivory hover:bg-ivory/10 sm:right-6"
          >
            <ChevronRight className="h-7 w-7" strokeWidth={1.6} />
          </button>
        </div>
      )}
    </section>
  );
}
