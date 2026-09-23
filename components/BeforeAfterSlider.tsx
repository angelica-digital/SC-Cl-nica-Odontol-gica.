"use client";

import { useCallback, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import Image from "next/image";
import { ChevronsLeftRight, ImageIcon } from "lucide-react";

interface BeforeAfterSliderProps {
  treatment: string;
  beforeImage: string;
  afterImage: string;
  altBefore: string;
  altAfter: string;
  /** false quando as fotos ainda não existem em /public — exibe placeholder. */
  hasImages?: boolean;
  sizes?: string;
}

const clamp = (n: number) => Math.min(100, Math.max(0, n));

// Placeholder neutro (sem simular resultado). O conteúdo fica centralizado
// na própria metade — antes à esquerda, depois à direita — para não ser
// cortado pela divisória na posição inicial.
function Placeholder({ side }: { side: "antes" | "depois" }) {
  const isBefore = side === "antes";
  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center px-3 text-center ${
        isBefore
          ? "bg-gradient-to-br from-beige/80 to-beige/40 pr-[50%]"
          : "bg-gradient-to-br from-sage/25 to-ivory pl-[50%]"
      }`}
    >
      <ImageIcon className="h-6 w-6 text-graphite/30" strokeWidth={1.4} aria-hidden="true" />
      <span className="mt-2.5 text-[0.65rem] font-semibold uppercase leading-relaxed tracking-widest2 text-graphite/50">
        Foto do {side}
        <br />
        em breve
      </span>
    </div>
  );
}

/**
 * Comparador "Antes | Depois" com divisória arrastável.
 * Mouse, toque e caneta via Pointer Events; teclado via setas/Home/End.
 * `touch-action: pan-y` mantém a rolagem vertical da página no celular,
 * enquanto gestos horizontais sobre a imagem movem apenas a divisória.
 */
export default function BeforeAfterSlider({
  treatment,
  beforeImage,
  afterImage,
  altBefore,
  altAfter,
  hasImages = true,
  sizes = "(max-width: 640px) 90vw, (max-width: 1024px) 60vw, 400px",
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const showImages = hasImages && !imageFailed;

  const updateFromClientX = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    setPosition(clamp(((clientX - rect.left) / rect.width) * 100));
  }, []);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
    updateFromClientX(e.clientX);
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (dragging) updateFromClientX(e.clientX);
  };

  const stopDragging = () => setDragging(false);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const steps: Record<string, number> = {
      ArrowLeft: -5,
      ArrowDown: -5,
      ArrowRight: 5,
      ArrowUp: 5,
      PageDown: -10,
      PageUp: 10,
    };
    if (e.key in steps) {
      e.preventDefault();
      setPosition((p) => clamp(p + steps[e.key]));
    } else if (e.key === "Home") {
      e.preventDefault();
      setPosition(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setPosition(100);
    }
  };

  const rounded = Math.round(position);

  return (
    <div
      ref={containerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
      onLostPointerCapture={stopDragging}
      className="relative aspect-square w-full cursor-ew-resize select-none overflow-hidden rounded-xl2 bg-beige/40 shadow-card [touch-action:pan-y]"
    >
      {/* Depois — camada de base, visível à direita da divisória */}
      <div className="absolute inset-0">
        {showImages ? (
          <Image
            src={afterImage}
            alt={altAfter}
            fill
            sizes={sizes}
            draggable={false}
            onError={() => setImageFailed(true)}
            className="pointer-events-none object-cover"
          />
        ) : (
          <Placeholder side="depois" />
        )}
      </div>

      {/* Antes — recortada até a posição da divisória */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        {showImages ? (
          <Image
            src={beforeImage}
            alt={altBefore}
            fill
            sizes={sizes}
            draggable={false}
            onError={() => setImageFailed(true)}
            className="pointer-events-none object-cover"
          />
        ) : (
          <Placeholder side="antes" />
        )}
      </div>

      {/* Indicadores */}
      <span
        className={`pointer-events-none absolute left-3 top-3 rounded-full bg-ivory/90 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-widest2 text-graphite shadow-soft transition-opacity duration-200 ${
          position < 22 ? "opacity-0" : "opacity-100"
        }`}
        aria-hidden="true"
      >
        Antes
      </span>
      <span
        className={`pointer-events-none absolute right-3 top-3 rounded-full bg-deep/90 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-widest2 text-ivory shadow-soft ring-1 ring-ivory/40 transition-opacity duration-200 ${
          position > 78 ? "opacity-0" : "opacity-100"
        }`}
        aria-hidden="true"
      >
        Depois
      </span>

      {/* Divisória + controle */}
      <div
        className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-ivory shadow-[0_0_12px_rgba(34,39,37,0.25)]"
        style={{ left: `${position}%` }}
        aria-hidden="true"
      />
      <div
        role="slider"
        tabIndex={0}
        aria-label={`Comparar antes e depois — ${treatment}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={rounded}
        aria-valuetext={`${rounded}% da imagem de antes visível`}
        onKeyDown={onKeyDown}
        className={`absolute top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-deep/10 bg-ivory text-deep shadow-softer outline-none transition-transform duration-150 focus-visible:ring-2 focus-visible:ring-deep focus-visible:ring-offset-2 focus-visible:ring-offset-ivory ${
          dragging ? "scale-105" : ""
        }`}
        style={{ left: `${position}%` }}
      >
        <ChevronsLeftRight className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
      </div>
    </div>
  );
}
