"use client";

import { useSyncExternalStore } from "react";
import { clinica } from "@/lib/content";

const DIAS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/** Dia da semana e minutos do dia no horário de Brasília (independe do fuso do visitante). */
function agoraEmBrasilia() {
  const partes = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Sao_Paulo",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const v = (t: string) => partes.find((p) => p.type === t)?.value ?? "";
  return { dia: v("weekday"), minutos: Number(v("hour")) * 60 + Number(v("minute")) };
}

const emMinutos = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};
const formatar = (hhmm: string) => {
  const [h, m] = hhmm.split(":");
  return m === "00" ? `${Number(h)}h` : `${Number(h)}h${m}`;
};
const periodosDo = (dia: string) => clinica.horarios.find((h) => h.dias.includes(dia))?.periodos ?? [];

/** Texto do status, ex.: "Aberto agora · fecha às 12h" ou "Fechado · abre segunda às 8h". */
function calcular(): { aberto: boolean; texto: string } {
  const { dia, minutos } = agoraEmBrasilia();

  const atual = periodosDo(dia).find((p) => minutos >= emMinutos(p.abre) && minutos < emMinutos(p.fecha));
  if (atual) return { aberto: true, texto: `Aberto agora · fecha às ${formatar(atual.fecha)}` };

  const proximoHoje = periodosDo(dia).find((p) => minutos < emMinutos(p.abre));
  if (proximoHoje) return { aberto: false, texto: `Fechado agora · abre às ${formatar(proximoHoje.abre)}` };

  const nomes: Record<string, string> = {
    Sunday: "domingo",
    Monday: "segunda",
    Tuesday: "terça",
    Wednesday: "quarta",
    Thursday: "quinta",
    Friday: "sexta",
    Saturday: "sábado",
  };
  const hoje = DIAS.indexOf(dia);
  for (let i = 1; i <= 7; i++) {
    const outro = DIAS[(hoje + i) % 7];
    const primeiro = periodosDo(outro)[0];
    if (primeiro) {
      const quando = i === 1 ? "amanhã" : nomes[outro];
      return { aberto: false, texto: `Fechado agora · abre ${quando} às ${formatar(primeiro.abre)}` };
    }
  }
  return { aberto: false, texto: "Fechado agora" };
}

// Atualiza a cada minuto; no servidor não renderiza nada (evita divergência na hidratação).
let cache = "";
function assinar(aoMudar: () => void) {
  const id = setInterval(aoMudar, 60_000);
  return () => clearInterval(id);
}
function ler() {
  const { aberto, texto } = calcular();
  const novo = `${aberto ? 1 : 0}|${texto}`;
  if (novo !== cache) cache = novo;
  return cache;
}

/** Selo "Aberto agora / Fechado", calculado pelo horário de Brasília. */
export function StatusFuncionamento({ className = "" }: { className?: string }) {
  const valor = useSyncExternalStore(assinar, ler, () => "");
  if (!valor) return null;
  const [flag, texto] = valor.split("|");
  const aberto = flag === "1";

  return (
    <p
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${
        aberto ? "border-verde-aberto/40 bg-verde-aberto/10 text-verde-aberto-claro" : "border-areia/30 bg-branco/5 text-areia"
      } ${className}`}
    >
      <span aria-hidden className="relative flex size-2">
        {aberto && <span className="absolute inset-0 animate-ping rounded-full bg-verde-aberto opacity-60 motion-reduce:animate-none" />}
        <span className={`relative size-2 rounded-full ${aberto ? "bg-verde-aberto" : "bg-areia/70"}`} />
      </span>
      {texto}
    </p>
  );
}
