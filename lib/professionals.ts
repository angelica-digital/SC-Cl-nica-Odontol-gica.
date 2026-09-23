// Profissionais da SC Clínica Odontológica — exibidos na seção "Profissionais".
//
// Preencha os campos opcionais somente com informações confirmadas pela
// clínica. Campos vazios/ausentes simplesmente não aparecem no site —
// nenhuma informação incompleta ou inventada é exibida ao visitante.
//
// - photo: caminho em /public (ex.: "/images/dra-selma.jpg"), retrato 4:5.
//          Sem foto, é exibido um placeholder com as iniciais.
// - cro:   ex.: "CRO-SP 00000"
// - areas: áreas de atuação, ex.: ["Implantes", "Prótese dentária"]
// - bio:   pequena biografia (1 a 3 frases)

export interface Professional {
  slug: string;
  name: string;
  initials: string;
  photo?: string;
  cro?: string;
  areas?: string[];
  bio?: string;
}

export const PROFESSIONALS: Professional[] = [
  {
    slug: "selma-cristina-carrasco-zuffo",
    name: "Dra. Selma Cristina Carrasco Zuffo",
    initials: "SZ",
  },
  {
    slug: "renan-carrasco-zuffo",
    name: "Dr. Renan Carrasco Zuffo",
    initials: "RZ",
  },
];
