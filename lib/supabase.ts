import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Cliente Supabase server-only, usado apenas dentro das API Routes
// (app/api/**/route.ts) — nunca importado por componentes client-side.
//
// Usa a SERVICE ROLE KEY (não a anon key) porque toda a comunicação com o
// Supabase acontece no servidor: o navegador nunca fala diretamente com o
// Supabase, apenas com as nossas próprias rotas /api/*. Isso permite manter
// Row Level Security travada na tabela `appointments` (sem policies para o
// público) e ainda assim ler/gravar dados de forma segura pelo backend.
//
// As variáveis de ambiente precisam ser configuradas em `.env.local`
// (veja `.env.example`). Enquanto não forem configuradas, as rotas de API
// retornam um erro claro em vez de derrubar o build do Next.js — a criação
// do client é feita sob demanda (lazy), não no carregamento do módulo.

let client: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (client) return client;

  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "Supabase não configurado: defina SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY em .env.local (veja .env.example)."
    );
  }

  client = createClient(url, serviceRoleKey, {
    auth: { persistSession: false },
    global: {
      // O Next.js estende o `fetch` global com cache automático (mesmo em
      // rotas marcadas como dynamic). Como a disponibilidade de horários
      // muda a cada agendamento, forçamos "no-store" para nunca servir uma
      // resposta em cache do Supabase.
      fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }),
    },
  });

  return client;
}
