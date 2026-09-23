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

// TEMPORÁRIO: os quatro cards usam a mesma foto até as fotos individuais
// serem enviadas (previstas: /images/profissionais/dra-helena-meira.webp e
// /images/profissionais/dra-bianca-oliveira.webp).
const TEMP_PHOTO = "/images/Foto-Dra.-Selma-Dr.-Renan.webp";

export const PROFESSIONALS: Professional[] = [
  {
    slug: "selma-carrasco",
    name: "Dra. Selma Carrasco",
    initials: "SC",
    photo: TEMP_PHOTO,
    areas: ["Responsável Técnica · Ortodontia"],
    bio: "Conduz a clínica e a maior parte dos atendimentos, com ampla experiência e acompanhamento contínuo dos pacientes.",
  },
  {
    slug: "renan-carrasco",
    name: "Dr. Renan Carrasco",
    initials: "RC",
    photo: TEMP_PHOTO,
    areas: ["Prótese e Dentística"],
    bio: "Atua na reabilitação estética e funcional, com próteses e procedimentos restauradores de alta precisão.",
  },
  {
    slug: "helena-meira",
    name: "Dra. Helena Meira",
    initials: "HM",
    photo: TEMP_PHOTO,
    areas: ["Implantodontia"],
    bio: "Responsável pela área cirúrgica da implantodontia, com planejamento criterioso de cada caso.",
  },
  {
    slug: "bianca-oliveira",
    name: "Dra. Bianca Oliveira",
    initials: "BO",
    photo: TEMP_PHOTO,
    areas: ["Cirurgia Odontológica"],
    bio: "Atua na cirurgia odontológica, realizando extrações e procedimentos cirúrgicos quando indicados.",
  },
];
