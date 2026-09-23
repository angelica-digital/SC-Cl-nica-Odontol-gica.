# SC Clínica Odontológica — Site institucional

Site institucional desenvolvido em **Next.js 14 (App Router) + TypeScript +
Tailwind CSS** para a SC Clínica Odontológica, em Osasco - SP.

## Como rodar

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

Build de produção:

```bash
npm run build
npm run start
```

## Imagens reais

O projeto está preparado para receber as três fotografias reais da clínica em
`public/images/`. Veja [`public/images/README.md`](public/images/README.md)
para os nomes de arquivo esperados e recomendações técnicas. Até lá, o site
usa imagens placeholder geradas na paleta do projeto.

## Estrutura

```text
app/                  rotas, layout, SEO (metadata, robots, sitemap), JSON-LD
app/agendamento/      página do sistema de agendamento online
app/api/               rotas de API (disponibilidade de horários, criação de agendamento)
components/           componentes de seção (Header, Hero, Tratamentos, etc.)
lib/                  constantes, regras de negócio do agendamento, cliente Supabase
public/images/        imagens da clínica
supabase/schema.sql   schema do banco de dados (rodar no projeto Supabase)
```

## Sistema de agendamento (MVP)

A página [`/agendamento`](app/agendamento/page.tsx) permite ao paciente
solicitar uma **Avaliação Odontológica** (30 minutos), escolhendo o
tratamento de interesse, a data e um horário disponível — sem duplo
agendamento no mesmo horário. O tratamento escolhido é gravado apenas como
motivo/interesse da avaliação (`treatment_interest`), não como procedimento
agendado. Após o envio, também é oferecido um botão para confirmar direto
pelo WhatsApp.

**Regras de negócio** (confirmadas pela clínica, em `lib/booking.ts`):

- Segunda a sexta: 09:00 às 18:00 — último início às 17:30
- Sábado: 09:00 às 12:00 — último início às 11:30
- Domingo: fechado
- Horários de 30 em 30 minutos; cada avaliação dura 30 minutos
- "Horário já passou" é calculado no fuso `America/Sao_Paulo`

Para alterar dias/horários, ajuste `BUSINESS_SCHEDULE` e
`BUSINESS_HOURS_LABEL` nesse arquivo — e replique a mudança nas constraints
do banco em `supabase/schema.sql` (`appointment_is_business_day` /
`appointment_is_business_hour`).

### Configurar o banco de dados (Supabase)

1. Crie um projeto gratuito em [supabase.com](https://supabase.com).
2. Abra o **SQL Editor** do projeto e execute todo o conteúdo de
   [`supabase/schema.sql`](supabase/schema.sql).
3. Em **Project Settings > API**, copie a **Project URL** e a chave
   **service_role** (não a `anon`).
4. Copie `.env.example` para `.env.local` e preencha:

   ```text
   SUPABASE_URL=...
   SUPABASE_SERVICE_ROLE_KEY=...
   ```

5. Na Vercel, adicione as mesmas duas variáveis em
   **Project Settings > Environment Variables**.

Enquanto essas variáveis não estiverem configuradas, o restante do site
funciona normalmente — apenas a página `/agendamento` mostra uma mensagem de
erro amigável ao tentar carregar horários ou enviar um agendamento.

A tabela `appointments` fica protegida por Row Level Security sem nenhuma
policy pública: toda leitura/escrita acontece pelas API Routes do servidor
(`app/api/available-slots`, `app/api/appointments`) usando a service role
key, então dados de pacientes (nome, telefone) nunca ficam acessíveis
diretamente pelo navegador.

Não há painel administrativo nesta primeira versão — as solicitações podem
ser consultadas diretamente na aba **Table Editor** do Supabase.

## Conteúdo pendente de confirmação

- Nome, CRO e formação da profissional: estrutura pronta em
  `components/Professional.tsx` (variáveis `PROFESSIONAL_NAME`,
  `PROFESSIONAL_CRO`, `PROFESSIONAL_FORMATION`). Enquanto vazias, o site não
  exibe nenhuma informação incompleta.
- Avaliações reais do Google: estrutura pronta em `components/Reviews.tsx`
  para receber depoimentos confirmados futuramente.

## Tracking

Os principais CTAs de WhatsApp possuem `data-event="whatsapp_click"` e
`data-location="..."` (`hero`, `tratamentos`, `localizacao`, `floating`,
`header`, `cta-intermediario`, `cta-final`, `footer`) prontos para integração
futura com Google Analytics / Meta Pixel.

## Deploy

Projeto pronto para publicação na [Vercel](https://vercel.com) — basta
conectar o repositório do GitHub.
