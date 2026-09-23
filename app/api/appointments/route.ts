import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import {
  APPOINTMENT_DURATION_MINUTES,
  APPOINTMENT_TYPE,
  BUSINESS_HOURS_LABEL,
  isBusinessDay,
  isPastSlot,
  isValidTimeSlot,
  parseDateString,
} from "@/lib/booking";
import { TREATMENTS } from "@/lib/treatments";

export const dynamic = "force-dynamic";

interface AppointmentPayload {
  name?: string;
  phone?: string;
  treatmentInterest?: string;
  date?: string;
  time?: string;
  notes?: string;
}

// POST /api/appointments
// Cria uma solicitação de "Avaliação Odontológica" (30 min). O tratamento
// escolhido é gravado apenas como motivo/interesse da avaliação. Valida as
// regras de negócio no servidor (dia de atendimento, horário válido para
// aquele dia, não estar no passado, tratamento reconhecido) e confia na
// constraint única do banco para evitar conflito de horário em caso de
// duas pessoas enviando ao mesmo tempo.
export async function POST(request: NextRequest) {
  let body: AppointmentPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Corpo da requisição inválido." },
      { status: 400 }
    );
  }

  const name = body.name?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const treatmentInterest = body.treatmentInterest?.trim() ?? "";
  const date = body.date?.trim() ?? "";
  const time = body.time?.trim() ?? "";
  const notes = body.notes?.trim() || null;

  const errors: string[] = [];

  if (name.length < 2) errors.push("Informe seu nome completo.");
  if (phone.replace(/\D/g, "").length < 10)
    errors.push("Informe um telefone/WhatsApp válido, com DDD.");
  if (!TREATMENTS.some((t) => t.name === treatmentInterest))
    errors.push("Selecione um tratamento de interesse válido.");
  if (!parseDateString(date)) errors.push("Data inválida.");
  else if (!isBusinessDay(date))
    errors.push(`A clínica não atende neste dia. ${BUSINESS_HOURS_LABEL}`);
  else if (!isValidTimeSlot(date, time))
    errors.push(`Horário inválido para esta data. ${BUSINESS_HOURS_LABEL}`);
  else if (isPastSlot(date, time))
    errors.push("Esse horário já passou. Escolha outro.");

  if (errors.length > 0) {
    return NextResponse.json({ error: errors.join(" ") }, { status: 400 });
  }

  try {
    const supabase = getSupabaseAdmin();

    const { data, error } = await supabase
      .from("appointments")
      .insert({
        patient_name: name,
        patient_phone: phone,
        appointment_type: APPOINTMENT_TYPE,
        duration_minutes: APPOINTMENT_DURATION_MINUTES,
        treatment_interest: treatmentInterest,
        appointment_date: date,
        appointment_time: time,
        notes,
      })
      .select("id, appointment_date, appointment_time")
      .single();

    if (error) {
      // Violação da constraint única = horário acabou de ser ocupado
      // por outra pessoa entre a consulta de disponibilidade e o envio.
      if (error.code === "23505") {
        return NextResponse.json(
          {
            error:
              "Esse horário acabou de ser reservado por outra pessoa. Escolha outro horário.",
          },
          { status: 409 }
        );
      }
      throw error;
    }

    return NextResponse.json(
      {
        id: data.id,
        appointmentType: APPOINTMENT_TYPE,
        treatmentInterest,
        date: data.appointment_date,
        time: String(data.appointment_time).slice(0, 5),
        status: "pendente",
      },
      { status: 201 }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erro desconhecido.";
    return NextResponse.json(
      {
        error: "Não foi possível concluir o agendamento no momento.",
        detail: message,
      },
      { status: 503 }
    );
  }
}
