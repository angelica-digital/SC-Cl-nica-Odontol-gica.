"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarCheck, CheckCircle2, Loader2 } from "lucide-react";
import { TREATMENTS } from "@/lib/treatments";
import {
  APPOINTMENT_TYPE,
  BUSINESS_HOURS_LABEL,
  minBookingDate,
} from "@/lib/booking";
import WhatsAppCTA from "./WhatsAppCTA";

interface Slot {
  time: string;
  available: boolean;
}

type SlotsState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "loaded"; slots: Slot[] }
  | { status: "not-business-day" }
  | { status: "error"; message: string };

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; date: string; time: string }
  | { status: "error"; message: string };

function formatDatePretty(dateStr: string) {
  const [y, m, d] = dateStr.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });
}

export default function BookingForm() {
  const minDate = useMemo(() => minBookingDate(), []);

  const [treatment, setTreatment] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const [slotsState, setSlotsState] = useState<SlotsState>({ status: "idle" });
  const [submitState, setSubmitState] = useState<SubmitState>({
    status: "idle",
  });

  useEffect(() => {
    if (!date) {
      setSlotsState({ status: "idle" });
      return;
    }

    let cancelled = false;
    setTime("");
    setSlotsState({ status: "loading" });

    fetch(`/api/available-slots?date=${date}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Falha ao buscar horários.");
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        if (!data.businessDay) {
          setSlotsState({ status: "not-business-day" });
          return;
        }
        setSlotsState({ status: "loaded", slots: data.slots });
      })
      .catch(() => {
        if (!cancelled) {
          setSlotsState({
            status: "error",
            message:
              "Não foi possível carregar os horários agora. Tente novamente em instantes.",
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [date]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!treatment || !date || !time || !name || !phone) return;

    setSubmitState({ status: "submitting" });

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          treatmentInterest: treatment,
          date,
          time,
          name,
          phone,
          notes,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setSubmitState({
          status: "error",
          message: data.error ?? "Não foi possível concluir o agendamento.",
        });
        // Se o conflito foi de horário, atualiza a lista de horários.
        if (res.status === 409) {
          setDate((d) => d);
          setSlotsState({ status: "loading" });
          fetch(`/api/available-slots?date=${date}`)
            .then((r) => r.json())
            .then((d2) => setSlotsState({ status: "loaded", slots: d2.slots }))
            .catch(() => {});
        }
        return;
      }

      setSubmitState({ status: "success", date: data.date, time: data.time });
    } catch {
      setSubmitState({
        status: "error",
        message:
          "Não foi possível concluir o agendamento agora. Tente novamente ou fale pelo WhatsApp.",
      });
    }
  }

  if (submitState.status === "success") {
    const whatsappMessage = `Olá, tudo bem? Acabei de solicitar uma ${APPOINTMENT_TYPE} pelo site para ${formatDatePretty(
      submitState.date
    )} às ${submitState.time} (interesse: ${treatment}). Meu nome é ${name}.`;

    return (
      <div className="mx-auto max-w-lg rounded-xl2 border border-sage/30 bg-white px-6 py-10 text-center shadow-card sm:px-10 sm:py-12">
        <CheckCircle2
          className="mx-auto h-12 w-12 text-sage-dark"
          strokeWidth={1.5}
          aria-hidden="true"
        />
        <h3 className="mt-5 font-display text-2xl text-graphite sm:text-[1.75rem]">
          Solicitação enviada!
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-graphite/70 sm:text-base">
          Recebemos seu pedido de {APPOINTMENT_TYPE} para{" "}
          <strong className="text-graphite">
            {formatDatePretty(submitState.date)} às {submitState.time}
          </strong>
          . Em breve a clínica entrará em contato para confirmar. Se preferir,
          você também pode confirmar agora mesmo pelo WhatsApp.
        </p>
        <div className="mt-7">
          <WhatsAppCTA location="agendamento-sucesso" message={whatsappMessage}>
            Confirmar pelo WhatsApp
          </WhatsAppCTA>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl2 border border-graphite/10 bg-white p-5 shadow-card sm:p-8 lg:p-10"
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label
            htmlFor="treatment"
            className="mb-2 block text-sm font-semibold text-graphite"
          >
            Tratamento de interesse
          </label>
          <select
            id="treatment"
            required
            value={treatment}
            onChange={(e) => setTreatment(e.target.value)}
            className="focus-ring w-full rounded-lg border border-graphite/15 bg-ivory px-4 py-3 text-sm text-graphite"
          >
            <option value="" disabled>
              Selecione um tratamento
            </option>
            {TREATMENTS.map((t) => (
              <option key={t.slug} value={t.name}>
                {t.name}
              </option>
            ))}
          </select>
          <p className="mt-1.5 text-xs text-graphite/50">
            O primeiro atendimento é sempre uma {APPOINTMENT_TYPE} (30
            minutos). O tratamento escolhido indica apenas o motivo da sua
            avaliação.
          </p>
        </div>

        <div>
          <label
            htmlFor="date"
            className="mb-2 block text-sm font-semibold text-graphite"
          >
            Data
          </label>
          <input
            id="date"
            type="date"
            required
            min={minDate}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="focus-ring w-full rounded-lg border border-graphite/15 bg-ivory px-4 py-3 text-sm text-graphite"
          />
          <p className="mt-1.5 text-xs text-graphite/50">
            {BUSINESS_HOURS_LABEL}
          </p>
        </div>

        <div>
          <span className="mb-2 block text-sm font-semibold text-graphite">
            Horário
          </span>
          {slotsState.status === "idle" && (
            <p className="rounded-lg bg-ivory px-4 py-3 text-sm text-graphite/50">
              Selecione uma data
            </p>
          )}
          {slotsState.status === "loading" && (
            <p className="flex items-center gap-2 rounded-lg bg-ivory px-4 py-3 text-sm text-graphite/50">
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Carregando horários...
            </p>
          )}
          {slotsState.status === "not-business-day" && (
            <p className="rounded-lg bg-ivory px-4 py-3 text-sm text-graphite/60">
              A clínica não atende aos domingos. Escolha uma data de segunda
              a sábado.
            </p>
          )}
          {slotsState.status === "error" && (
            <p className="rounded-lg bg-ivory px-4 py-3 text-sm text-graphite/60">
              {slotsState.message}
            </p>
          )}
          {slotsState.status === "loaded" && (
            <div className="grid grid-cols-3 gap-2">
              {slotsState.slots.map((slot) => (
                <button
                  key={slot.time}
                  type="button"
                  disabled={!slot.available}
                  onClick={() => setTime(slot.time)}
                  aria-pressed={time === slot.time}
                  className={`focus-ring rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors ${
                    time === slot.time
                      ? "border-deep bg-deep text-ivory"
                      : slot.available
                        ? "border-graphite/15 bg-ivory text-graphite hover:border-deep"
                        : "cursor-not-allowed border-graphite/5 bg-graphite/5 text-graphite/30 line-through"
                  }`}
                >
                  {slot.time}
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-semibold text-graphite"
          >
            Nome completo
          </label>
          <input
            id="name"
            type="text"
            required
            minLength={2}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Seu nome"
            className="focus-ring w-full rounded-lg border border-graphite/15 bg-ivory px-4 py-3 text-sm text-graphite placeholder:text-graphite/35"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="mb-2 block text-sm font-semibold text-graphite"
          >
            WhatsApp / Telefone
          </label>
          <input
            id="phone"
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="(11) 99999-9999"
            className="focus-ring w-full rounded-lg border border-graphite/15 bg-ivory px-4 py-3 text-sm text-graphite placeholder:text-graphite/35"
          />
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="notes"
            className="mb-2 block text-sm font-semibold text-graphite"
          >
            Observações (opcional)
          </label>
          <textarea
            id="notes"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Conte um pouco sobre o que você precisa, se preferir."
            className="focus-ring w-full resize-none rounded-lg border border-graphite/15 bg-ivory px-4 py-3 text-sm text-graphite placeholder:text-graphite/35"
          />
        </div>
      </div>

      {submitState.status === "error" && (
        <p className="mt-6 rounded-lg bg-nude/30 px-4 py-3 text-sm text-graphite" role="alert">
          {submitState.message}
        </p>
      )}

      <button
        type="submit"
        disabled={
          submitState.status === "submitting" ||
          !treatment ||
          !date ||
          !time ||
          !name ||
          !phone
        }
        className="focus-ring mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-deep px-7 py-3.5 text-sm font-semibold tracking-wide text-ivory transition-all duration-300 hover:bg-deep-dark disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
      >
        {submitState.status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Enviando...
          </>
        ) : (
          <>
            <CalendarCheck className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
            Solicitar agendamento
          </>
        )}
      </button>
    </form>
  );
}
