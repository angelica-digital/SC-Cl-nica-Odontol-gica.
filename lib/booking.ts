// Regras de negócio do agendamento — confirmadas pela clínica.
//
// Atendimento:
//   - Segunda a sexta-feira: 09:00 às 18:00 (último início às 17:30)
//   - Sábado: 09:00 às 12:00 (último início às 11:30)
//   - Domingo: fechado
//
// Todo paciente novo agenda primeiro uma "Avaliação Odontológica", com
// duração de 30 minutos. Os horários são oferecidos de 30 em 30 minutos.
// O tratamento escolhido no formulário é apenas o motivo/interesse da
// avaliação — não é um procedimento agendado.
//
// Estas regras são espelhadas nas constraints do banco em
// supabase/schema.sql (appointment_is_business_day /
// appointment_is_business_hour). Ao alterar algo aqui, replique lá.
//
// Datas são tratadas como "YYYY-MM-DD" (string) e horários como "HH:MM"
// (string). O "agora" é sempre calculado no fuso da clínica
// (America/Sao_Paulo), para que navegador e servidor (ex.: Vercel, em UTC)
// apliquem exatamente a mesma regra de "horário já passou".

export const CLINIC_TIME_ZONE = "America/Sao_Paulo";

/** Tipo de atendimento agendado pelo site (sempre o mesmo). */
export const APPOINTMENT_TYPE = "Avaliação Odontológica";

/** Duração de cada avaliação, em minutos. */
export const APPOINTMENT_DURATION_MINUTES = 30;

/** Intervalo entre os horários oferecidos, em minutos. */
export const SLOT_INTERVAL_MINUTES = 30;

interface DaySchedule {
  open: string; // "HH:MM" — primeiro horário de início
  close: string; // "HH:MM" — fim do expediente
}

// Chave = dia da semana (0=domingo ... 6=sábado). Dias ausentes = fechado.
export const BUSINESS_SCHEDULE: Record<number, DaySchedule> = {
  1: { open: "09:00", close: "18:00" },
  2: { open: "09:00", close: "18:00" },
  3: { open: "09:00", close: "18:00" },
  4: { open: "09:00", close: "18:00" },
  5: { open: "09:00", close: "18:00" },
  6: { open: "09:00", close: "12:00" },
};

export const BUSINESS_DAYS = Object.keys(BUSINESS_SCHEDULE).map(Number);

/** Texto único de horário de atendimento, usado na interface e nas APIs. */
export const BUSINESS_HOURS_LABEL =
  "Segunda a sexta, das 9h às 18h. Sábado, das 9h às 12h.";

function toMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function fromMinutes(total: number): string {
  const h = String(Math.floor(total / 60)).padStart(2, "0");
  const m = String(total % 60).padStart(2, "0");
  return `${h}:${m}`;
}

/** Interpreta uma string "YYYY-MM-DD" como data local (evita bug de UTC). */
export function parseDateString(dateStr: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateStr);
  if (!match) return null;
  const [, y, m, d] = match;
  const date = new Date(Number(y), Number(m) - 1, Number(d));
  if (
    date.getFullYear() !== Number(y) ||
    date.getMonth() !== Number(m) - 1 ||
    date.getDate() !== Number(d)
  ) {
    return null;
  }
  return date;
}

function scheduleForDate(dateStr: string): DaySchedule | null {
  const date = parseDateString(dateStr);
  if (!date) return null;
  return BUSINESS_SCHEDULE[date.getDay()] ?? null;
}

export function isBusinessDay(dateStr: string): boolean {
  return scheduleForDate(dateStr) !== null;
}

/**
 * Horários de início possíveis para a data: de 30 em 30 minutos, do
 * horário de abertura até o último início que ainda termina dentro do
 * expediente (fechamento - duração da avaliação).
 */
export function getTimeSlotsForDate(dateStr: string): string[] {
  const schedule = scheduleForDate(dateStr);
  if (!schedule) return [];
  const first = toMinutes(schedule.open);
  const lastStart = toMinutes(schedule.close) - APPOINTMENT_DURATION_MINUTES;
  const slots: string[] = [];
  for (let t = first; t <= lastStart; t += SLOT_INTERVAL_MINUTES) {
    slots.push(fromMinutes(t));
  }
  return slots;
}

export function isValidTimeSlot(dateStr: string, time: string): boolean {
  return getTimeSlotsForDate(dateStr).includes(time);
}

/** Data ("YYYY-MM-DD") e minutos do dia atuais no fuso da clínica. */
function nowInClinic(): { date: string; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: CLINIC_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return {
    date: `${get("year")}-${get("month")}-${get("day")}`,
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

/** Retorna true se a data (e opcionalmente o horário) já passaram. */
export function isPastSlot(dateStr: string, time?: string): boolean {
  if (!parseDateString(dateStr)) return true;
  const now = nowInClinic();
  if (dateStr < now.date) return true;
  if (dateStr > now.date) return false;
  // é hoje: compara horário, se fornecido
  if (!time) return false;
  return toMinutes(time) <= now.minutes;
}

/** Menor data permitida para agendamento (hoje no fuso da clínica). */
export function minBookingDate(): string {
  return nowInClinic().date;
}

export interface SlotAvailability {
  time: string;
  available: boolean;
}

/**
 * Calcula os horários do dia com base nas regras de negócio, marcando
 * como indisponíveis os horários já ocupados (busyTimes) e os que já
 * passaram (quando a data é hoje).
 */
export function buildSlotsForDate(
  dateStr: string,
  busyTimes: string[]
): SlotAvailability[] {
  const busy = new Set(busyTimes);
  return getTimeSlotsForDate(dateStr).map((time) => ({
    time,
    available: !busy.has(time) && !isPastSlot(dateStr, time),
  }));
}
