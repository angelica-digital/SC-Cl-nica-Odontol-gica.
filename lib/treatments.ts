import {
  Stethoscope,
  Layers,
  Sparkles,
  Gem,
  Activity,
  Scissors,
  ShieldCheck,
  Droplet,
  type LucideIcon,
} from "lucide-react";

export interface Treatment {
  slug: string;
  name: string;
  description: string;
  icon: LucideIcon;
}

// Lista única de tratamentos, compartilhada entre a seção "Tratamentos"
// (components/Treatments.tsx) e o formulário de agendamento
// (components/BookingForm.tsx), para manter os nomes sempre consistentes.
export const TREATMENTS: Treatment[] = [
  {
    slug: "clinica-geral",
    name: "Clínica Geral",
    description:
      "Prevenção, acompanhamento e cuidados essenciais para manter a saúde bucal.",
    icon: Stethoscope,
  },
  {
    slug: "implantes-dentarios",
    name: "Implantes Dentários",
    description:
      "Planejamento para reposição de dentes ausentes e recuperação da função mastigatória, conforme avaliação profissional.",
    icon: Layers,
  },
  {
    slug: "proteses",
    name: "Próteses",
    description:
      "Opções de próteses móveis e fixas de acordo com cada necessidade.",
    icon: ShieldCheck,
  },
  {
    slug: "clareamento-dental",
    name: "Clareamento Dental",
    description:
      "Tratamento para melhorar a tonalidade dos dentes com acompanhamento odontológico.",
    icon: Sparkles,
  },
  {
    slug: "facetas",
    name: "Facetas",
    description:
      "Alternativa estética indicada após avaliação individual do sorriso.",
    icon: Gem,
  },
  {
    slug: "endodontia",
    name: "Endodontia",
    description:
      "Tratamento da região interna do dente quando clinicamente indicado.",
    icon: Activity,
  },
  {
    slug: "cirurgias",
    name: "Cirurgias",
    description:
      "Procedimentos cirúrgicos realizados após diagnóstico e planejamento.",
    icon: Scissors,
  },
  {
    slug: "limpeza-dentaria",
    name: "Limpeza Dentária",
    description:
      "Cuidados preventivos para auxiliar na manutenção da saúde bucal.",
    icon: Droplet,
  },
];
