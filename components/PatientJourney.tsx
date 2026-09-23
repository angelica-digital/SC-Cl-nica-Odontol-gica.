import Reveal from "./Reveal";

const STEPS = [
  {
    number: "01",
    title: "Avaliação",
    description: "Entendimento das necessidades do paciente.",
  },
  {
    number: "02",
    title: "Planejamento",
    description: "Explicação das possibilidades de tratamento.",
  },
  {
    number: "03",
    title: "Tratamento",
    description: "Execução conforme indicação profissional.",
  },
  {
    number: "04",
    title: "Acompanhamento",
    description: "Orientações e acompanhamento conforme cada caso.",
  },
];

export default function PatientJourney() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest2 text-sage-dark">
            Experiência do paciente
          </p>
          <h2 className="font-display text-3xl leading-tight text-graphite sm:text-4xl">
            Uma jornada pensada para cada etapa do cuidado
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <Reveal key={step.number} delay={i * 80}>
              <div className="relative border-l border-graphite/15 pl-6">
                <span className="font-display text-4xl text-beige">
                  {step.number}
                </span>
                <h3 className="mt-3 font-display text-xl text-graphite">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-graphite/70">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
