// Casos da seção "Antes e Depois" da Home.
//
// Para publicar um caso real, coloque as duas fotos em
// public/images/resultados/ com os nomes abaixo (ou altere os caminhos).
// Enquanto os arquivos não existirem, o site exibe um placeholder
// neutro — nenhuma imagem é inventada.
//
// Use somente fotografias de pacientes da clínica, com autorização
// por escrito para divulgação.
//
// Proporção recomendada: quadrada (1:1), mínimo 1200 x 1200 px, com o
// mesmo enquadramento, distância e iluminação nas fotos de antes e depois.

export interface ResultCase {
  slug: string;
  treatment: string;
  beforeImage: string;
  afterImage: string;
  altBefore: string;
  altAfter: string;
}

export const RESULT_CASES: ResultCase[] = [
  {
    slug: "clareamento",
    treatment: "Clareamento dental",
    beforeImage: "/images/resultados/clareamento-antes.jpg",
    afterImage: "/images/resultados/clareamento-depois.jpg",
    altBefore: "Sorriso antes do clareamento dental",
    altAfter: "Sorriso depois do clareamento dental",
  },
  {
    slug: "facetas",
    treatment: "Facetas",
    beforeImage: "/images/resultados/facetas-antes.jpg",
    afterImage: "/images/resultados/facetas-depois.jpg",
    altBefore: "Sorriso antes da aplicação de facetas",
    altAfter: "Sorriso depois da aplicação de facetas",
  },
  {
    slug: "implante",
    treatment: "Implantes / reabilitação",
    beforeImage: "/images/resultados/implante-antes.jpg",
    afterImage: "/images/resultados/implante-depois.jpg",
    altBefore: "Sorriso antes da reabilitação com implantes",
    altAfter: "Sorriso depois da reabilitação com implantes",
  },
];
