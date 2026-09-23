// Dados reais da clínica — centralizados para reutilização em toda a aplicação.
// Ajuste aqui caso qualquer informação precise ser atualizada futuramente.

export const CLINIC_NAME = "SC Clínica Odontológica";

export const CLINIC_ADDRESS = {
  street: "Av. dos Remédios, 675",
  complement: "Sala 5",
  neighborhood: "Remédios",
  city: "Osasco",
  state: "SP",
  zip: "06298-004",
  country: "Brasil",
};

export const CLINIC_ADDRESS_FULL =
  "Av. dos Remédios, 675 - Sala 5, Remédios, Osasco - SP, 06298-004";

export const CLINIC_PHONE_DISPLAY = "(11) 98313-1121";
export const CLINIC_PHONE_E164 = "+5511983131121";
export const CLINIC_WHATSAPP_NUMBER = "5511983131121";

export const WHATSAPP_MESSAGE =
  "Olá, tudo bem? Gostaria de agendar uma consulta";

export const WHATSAPP_LINK = `https://api.whatsapp.com/send?phone=${CLINIC_WHATSAPP_NUMBER}&text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;

export const SITE_URL = "https://sc-clinica-odontologica.vercel.app";

// Embed do Google Maps para o endereço da clínica.
export const GOOGLE_MAPS_EMBED_SRC =
  "https://www.google.com/maps?q=Av.+dos+Rem%C3%A9dios,+675+-+Sala+5,+Rem%C3%A9dios,+Osasco+-+SP,+06298-004&output=embed";

export const GOOGLE_MAPS_DIRECTIONS_LINK =
  "https://www.google.com/maps/dir/?api=1&destination=Av.+dos+Rem%C3%A9dios,+675+-+Sala+5,+Rem%C3%A9dios,+Osasco+-+SP,+06298-004";

export const NAV_LINKS = [
  { label: "Início", href: "#inicio" },
  { label: "A Clínica", href: "#a-clinica" },
  { label: "Tratamentos", href: "#tratamentos" },
  { label: "Profissionais", href: "#profissionais" },
  { label: "Avaliações", href: "#avaliacoes" },
  { label: "Localização", href: "#localizacao" },
];

// Link adicional para o sistema de agendamento online (MVP).
// Mantido separado de NAV_LINKS para não alterar o menu principal já
// aprovado — usado como item extra no Header e no Footer.
export const BOOKING_LINK = { label: "Agendar horário", href: "/agendamento" };

export function whatsappLink(message?: string) {
  const text = message ?? WHATSAPP_MESSAGE;
  return `https://api.whatsapp.com/send?phone=${CLINIC_WHATSAPP_NUMBER}&text=${encodeURIComponent(
    text
  )}`;
}
