# Imagens reais da clínica

Os três arquivos abaixo são **placeholders temporários** (retângulos coloridos
com a paleta do site) gerados apenas para o site não ficar com imagens
quebradas antes da entrega das fotografias reais.

Substitua cada arquivo por uma fotografia real **mantendo exatamente o mesmo
nome**, para que nenhum código precise ser alterado:

| Arquivo | Conteúdo esperado | Usado em |
|---|---|---|
| `clinica-atendimento.jpg` | Atendimento/procedimento sendo realizado dentro da clínica | Hero, seção "A Clínica", Open Graph |
| `procedimento-odontologico.jpg` | Fotografia odontológica aproximada de procedimento/tratamento | Galeria |
| `profissional-sc.jpg` | Profissional da clínica durante atendimento | Galeria |

Recomendações técnicas:

- Formato: `.jpg` ou `.webp`, orientação retrato para `clinica-atendimento.jpg`
  e `profissional-sc.jpg` (proporção próxima de 4:5).
- Resolução mínima recomendada: 1600px no lado maior, para boa nitidez em
  telas grandes sem prejudicar performance (o Next.js otimiza automaticamente
  via `next/image`).
- Caso queira usar nomes de arquivo diferentes, atualize os caminhos
  `/images/...` nos componentes: `components/Hero.tsx`, `components/About.tsx`,
  `components/Gallery.tsx` e a metadata Open
  Graph em `app/layout.tsx`.

## Fotos dos profissionais (seção "Profissionais")

Cada profissional tem sua própria foto, configurada em `lib/professionals.ts`.
Para adicionar, coloque o retrato nesta pasta (proporção 4:5, ex.:
`dra-selma.jpg`, `dr-renan.jpg`) e preencha o campo `photo` do profissional
correspondente, ex.: `photo: "/images/dra-selma.jpg"`. Enquanto o campo
estiver vazio, o site exibe um placeholder com as iniciais.
