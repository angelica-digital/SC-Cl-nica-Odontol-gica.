import type { AnchorHTMLAttributes, ReactNode } from "react";
import { whatsappLink } from "@/lib/constants";

interface WhatsAppCTAProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  location: string;
  message?: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}

const VARIANT_STYLES: Record<string, string> = {
  primary:
    "bg-deep text-ivory hover:bg-deep-dark active:bg-deep-dark shadow-soft",
  secondary:
    "bg-transparent text-deep border border-deep/30 hover:border-deep hover:bg-deep/5",
  ghost: "bg-ivory text-deep hover:bg-white",
};

/**
 * Botão/CTA padrão para direcionamento ao WhatsApp.
 * Inclui atributos data-event/data-location para futura
 * integração com Google Analytics / Meta Pixel.
 */
export default function WhatsAppCTA({
  children,
  location,
  message,
  variant = "primary",
  className = "",
  ...rest
}: WhatsAppCTAProps) {
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      data-event="whatsapp_click"
      data-location={location}
      className={`focus-ring inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300 ${VARIANT_STYLES[variant]} ${className}`}
      {...rest}
    >
      {children}
    </a>
  );
}
