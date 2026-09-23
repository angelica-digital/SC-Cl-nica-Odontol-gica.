import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BookingForm from "@/components/BookingForm";

export const metadata: Metadata = {
  title: "Agendar avaliação",
  description:
    "Agende sua avaliação odontológica na SC Clínica Odontológica, em Osasco. Escolha o tratamento, a data e o horário de sua preferência.",
  alternates: {
    canonical: "/agendamento",
  },
};

export default function AgendamentoPage() {
  return (
    <>
      <Header />
      <main className="bg-ivory pb-16 pt-10 sm:pb-24 sm:pt-14 lg:pt-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest2 text-sage-dark">
              Agendamento
            </p>
            <h1 className="text-balance font-display text-[1.875rem] leading-tight text-graphite sm:text-4xl lg:text-[2.625rem]">
              Escolha o melhor horário para sua avaliação
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-graphite/70 sm:text-lg">
              Preencha os dados abaixo para solicitar seu horário. A clínica
              confirma o agendamento em seguida — se preferir, você também
              pode agendar diretamente pelo WhatsApp.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-[40rem] sm:mt-12">
            <BookingForm />
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
