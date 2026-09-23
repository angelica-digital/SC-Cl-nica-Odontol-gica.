import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { buildSlotsForDate, isBusinessDay, parseDateString } from "@/lib/booking";

export const dynamic = "force-dynamic";

// GET /api/available-slots?date=YYYY-MM-DD
// Retorna os horários de início de avaliação do dia (de 30 em 30 min,
// conforme o expediente daquele dia da semana) e se cada um está
// disponível. Domingo retorna businessDay: false.
// Não expõe nenhum dado de pacientes — apenas quais horários já
// possuem um agendamento ativo (pendente/confirmado).
export async function GET(request: NextRequest) {
  const dateStr = request.nextUrl.searchParams.get("date");

  if (!dateStr || !parseDateString(dateStr)) {
    return NextResponse.json(
      { error: "Parâmetro 'date' inválido. Use o formato YYYY-MM-DD." },
      { status: 400 }
    );
  }

  if (!isBusinessDay(dateStr)) {
    return NextResponse.json({
      date: dateStr,
      businessDay: false,
      slots: [],
    });
  }

  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("appointments")
      .select("appointment_time")
      .eq("appointment_date", dateStr)
      .neq("status", "cancelado");

    if (error) throw error;

    const busyTimes = (data ?? []).map((row) =>
      String(row.appointment_time).slice(0, 5)
    );

    return NextResponse.json({
      date: dateStr,
      businessDay: true,
      slots: buildSlotsForDate(dateStr, busyTimes),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erro desconhecido.";
    return NextResponse.json(
      {
        error:
          "Não foi possível consultar os horários disponíveis no momento.",
        detail: message,
      },
      { status: 503 }
    );
  }
}
