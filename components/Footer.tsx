import {
  BOOKING_LINK,
  CLINIC_ADDRESS,
  CLINIC_NAME,
  CLINIC_PHONE_DISPLAY,
  whatsappLink,
} from "@/lib/constants";

const FOOTER_LINKS = [
  { label: "Início", href: "#inicio" },
  { label: "A Clínica", href: "#a-clinica" },
  { label: "Tratamentos", href: "#tratamentos" },
  { label: "Localização", href: "#localizacao" },
  BOOKING_LINK,
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-graphite py-14 text-ivory/80 sm:py-16">
      <div className="container-page grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8">
        <div>
          <p className="font-display text-xl text-ivory">{CLINIC_NAME}</p>
          <address className="mt-4 text-sm not-italic leading-relaxed">
            {CLINIC_ADDRESS.street} - {CLINIC_ADDRESS.complement}
            <br />
            {CLINIC_ADDRESS.neighborhood}, {CLINIC_ADDRESS.city} -{" "}
            {CLINIC_ADDRESS.state}
          </address>
        </div>

        <nav aria-label="Links do rodapé">
          <p className="text-xs font-semibold uppercase tracking-widest2 text-ivory/50">
            Navegação
          </p>
          <ul className="mt-4 flex flex-col gap-3">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="focus-ring text-sm text-ivory/75 transition-colors hover:text-ivory"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest2 text-ivory/50">
            Contato
          </p>
          <p className="mt-4 text-sm">
            WhatsApp:{" "}
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              data-event="whatsapp_click"
              data-location="footer"
              className="focus-ring font-medium text-ivory transition-colors hover:text-beige"
            >
              {CLINIC_PHONE_DISPLAY}
            </a>
          </p>
        </div>
      </div>

      <div className="container-page mt-12 border-t border-ivory/10 pt-6">
        <p className="text-xs text-ivory/50">
          © {year} {CLINIC_NAME}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
