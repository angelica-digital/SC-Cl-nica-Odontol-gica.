import Reveal from "./Reveal";

const ITEMS = [
  "Atendimento humanizado",
  "Tratamentos personalizados",
  "Estrutura preparada para diferentes necessidades",
  "Clínica em Osasco",
];

export default function TrustBar() {
  return (
    <section className="border-t border-graphite/10 bg-white">
      <div className="container-page container-editorial py-8 sm:py-10">
        <Reveal>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4 sm:gap-x-8">
            {ITEMS.map((item) => (
              <li
                key={item}
                className="text-center text-[0.8rem] font-medium leading-snug text-graphite/70 sm:text-sm"
              >
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
