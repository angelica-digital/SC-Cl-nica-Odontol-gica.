"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Reveal from "./Reveal";
import { CLINIC_ADDRESS_FULL, CLINIC_PHONE_DISPLAY } from "@/lib/constants";

const FAQ_ITEMS = [
  {
    question: "Como faço para agendar uma avaliação?",
    answer:
      "Você pode agendar uma avaliação diretamente pelo WhatsApp da clínica, clicando em qualquer botão de agendamento desta página.",
  },
  {
    question: "Quais tratamentos a clínica realiza?",
    answer:
      "A SC Clínica Odontológica realiza clínica geral, cirurgias odontológicas, próteses móveis e fixas, clareamento dental, facetas, endodontia, implantes dentários e limpeza dentária.",
  },
  {
    question: "A clínica realiza implantes?",
    answer:
      "Sim. O planejamento de implantes dentários é feito conforme avaliação individual de cada paciente.",
  },
  {
    question: "Vocês trabalham com próteses?",
    answer:
      "Sim, a clínica oferece opções de próteses móveis e fixas, de acordo com a necessidade identificada na avaliação.",
  },
  {
    question: "A clínica realiza clareamento dental?",
    answer:
      "Sim, o clareamento dental é realizado com acompanhamento odontológico.",
  },
  {
    question: "Onde fica a SC Clínica Odontológica?",
    answer: `A clínica está localizada em ${CLINIC_ADDRESS_FULL}.`,
  },
  {
    question: "Como posso falar com a clínica?",
    answer: `Você pode falar diretamente pelo WhatsApp no número ${CLINIC_PHONE_DISPLAY}, disponível nos botões de contato desta página.`,
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container-page container-editorial">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest2 text-[#D46A4A]">
            Dúvidas frequentes
          </p>
          <h2 className="font-display text-3xl leading-tight text-graphite sm:text-4xl">
            Perguntas frequentes
          </h2>
        </Reveal>

        <div className="mx-auto mt-12 max-w-2xl divide-y divide-graphite/10 border-t border-graphite/10">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.question}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-trigger-${i}`}
                    className="focus-ring flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="font-display text-lg text-graphite sm:text-xl">
                      {item.question}
                    </span>
                    <Plus
                      className={`h-5 w-5 shrink-0 text-deep transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                      strokeWidth={1.6}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${i}`}
                  className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="min-h-0">
                    <p className="max-w-xl text-sm leading-relaxed text-graphite/70 sm:text-base">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
