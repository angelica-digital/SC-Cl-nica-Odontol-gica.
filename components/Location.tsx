import { MapPin, Navigation } from "lucide-react";
import Reveal from "./Reveal";
import WhatsAppCTA from "./WhatsAppCTA";
import {
  CLINIC_ADDRESS,
  CLINIC_NAME,
  GOOGLE_MAPS_DIRECTIONS_LINK,
  GOOGLE_MAPS_EMBED_SRC,
} from "@/lib/constants";

export default function Location() {
  return (
    <section id="localizacao" className="bg-ivory py-20 sm:py-28">
      <div className="container-page grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest2 text-sage-dark">
            Localização
          </p>
          <h2 className="font-display text-3xl leading-tight text-graphite sm:text-4xl">
            Estamos em Osasco
          </h2>

          <div className="mt-8 flex items-start gap-3">
            <MapPin
              className="mt-0.5 h-5 w-5 shrink-0 text-deep"
              strokeWidth={1.6}
              aria-hidden="true"
            />
            <address className="text-base not-italic leading-relaxed text-graphite/75">
              <span className="font-semibold text-graphite">{CLINIC_NAME}</span>
              <br />
              {CLINIC_ADDRESS.street} - {CLINIC_ADDRESS.complement}
              <br />
              {CLINIC_ADDRESS.neighborhood}, {CLINIC_ADDRESS.city} -{" "}
              {CLINIC_ADDRESS.state}
              <br />
              {CLINIC_ADDRESS.zip}
            </address>
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href={GOOGLE_MAPS_DIRECTIONS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-graphite/15 px-7 py-3.5 text-sm font-semibold text-graphite transition-colors hover:border-deep hover:text-deep"
            >
              <Navigation className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
              Como chegar
            </a>
            <WhatsAppCTA location="localizacao">
              Agendar pelo WhatsApp
            </WhatsAppCTA>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="aspect-[4/3] w-full overflow-hidden rounded-xl2 shadow-soft sm:aspect-[16/12]">
            <iframe
              src={GOOGLE_MAPS_EMBED_SRC}
              title={`Mapa de localização — ${CLINIC_NAME}`}
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
