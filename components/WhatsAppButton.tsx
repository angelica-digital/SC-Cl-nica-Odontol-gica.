"use client";

import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/constants";

/**
 * Botão flutuante de WhatsApp.
 * Desktop: ícone + tooltip ao lado.
 * Mobile: botão discreto no canto inferior direito, sem cobrir conteúdo.
 */
export default function WhatsAppButton() {
  return (
    <div className="fixed bottom-5 right-4 z-50 sm:bottom-6 sm:right-6">
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        data-event="whatsapp_click"
        data-location="floating"
        aria-label="Conversar no WhatsApp com a SC Clínica Odontológica"
        className="group focus-ring relative flex h-14 w-14 items-center justify-center rounded-full bg-deep text-ivory shadow-softer transition-transform duration-300 hover:scale-105 active:scale-95"
      >
        <MessageCircle className="h-6 w-6" strokeWidth={1.8} aria-hidden="true" />
        <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-graphite px-4 py-2 text-sm font-medium text-ivory opacity-0 shadow-soft transition-opacity duration-200 group-hover:opacity-100 sm:block">
          Falar no WhatsApp
        </span>
      </a>
    </div>
  );
}
