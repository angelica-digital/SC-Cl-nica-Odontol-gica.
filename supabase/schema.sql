-- SC Clínica Odontológica — schema do sistema de agendamento (MVP)
--
-- Como usar:
-- 1. Crie um projeto gratuito em https://supabase.com
-- 2. Abra o "SQL Editor" do projeto e execute este arquivo inteiro
-- 3. Em "Project Settings > API", copie a "Project URL" e a
--    "service_role" key (NÃO a "anon" key) para o seu .env.local
--    (veja .env.example na raiz do projeto)

create extension if not exists pgcrypto;

create table if not exists appointments (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  patient_name text not null check (char_length(trim(patient_name)) >= 2),
  patient_phone text not null check (char_length(trim(patient_phone)) >= 8),
  -- Todo agendamento feito pelo site é uma "Avaliação Odontológica" de
  -- 30 minutos. O tratamento escolhido é apenas o motivo/interesse da
  -- avaliação, não um procedimento agendado.
  appointment_type text not null default 'Avaliação Odontológica'
    check (appointment_type = 'Avaliação Odontológica'),
  duration_minutes smallint not null default 30
    check (duration_minutes = 30),
  treatment_interest text not null,
  appointment_date date not null,
  appointment_time time not null,
  notes text,
  status text not null default 'pendente'
    check (status in ('pendente', 'confirmado', 'cancelado')),

  -- Regras de negócio (espelham lib/booking.ts):
  --   segunda a sexta (dow 1 a 5): 09:00 às 18:00 -> início entre 09:00 e 17:30
  --   sábado (dow 6):              09:00 às 12:00 -> início entre 09:00 e 11:30
  --   domingo (dow 0):             fechado
  --   horários de início de 30 em 30 minutos (:00 ou :30)
  constraint appointment_is_business_day
    check (extract(dow from appointment_date) between 1 and 6),
  constraint appointment_is_business_hour
    check (
      extract(minute from appointment_time) in (0, 30)
      and extract(second from appointment_time) = 0
      and appointment_time >= time '09:00'
      and (
        (extract(dow from appointment_date) between 1 and 5
          and appointment_time <= time '17:30')
        or (extract(dow from appointment_date) = 6
          and appointment_time <= time '11:30')
      )
    )
);

-- Impede dois agendamentos ativos (não cancelados) no mesmo dia/horário.
create unique index if not exists appointments_active_slot_unique
  on appointments (appointment_date, appointment_time)
  where (status <> 'cancelado');

create index if not exists appointments_date_idx
  on appointments (appointment_date);

-- Row Level Security: nenhuma policy pública é criada de propósito.
-- Toda a leitura/escrita acontece pelo backend do Next.js usando a
-- service_role key (que ignora RLS), então o público (chave anon) não
-- tem nenhum acesso direto a esta tabela — nem para ler nomes/telefones
-- de pacientes, nem para inserir registros diretamente pelo navegador.
alter table appointments enable row level security;
