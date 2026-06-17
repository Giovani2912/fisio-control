'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CreateProntuarioButton, EditProntuarioButton } from './upserts/prontuario/prontuario-buttons';
import { DeleteProntuarioDialog } from './upserts/prontuario/prontuario-delete-dialog';

type SoapKey = 'S' | 'O' | 'A' | 'P';
type SoapSection = { key: SoapKey; label: string; content: string };

export type ProntuarioItem = {
  id: string;
  criadoEm: string;
  regiaoCorpo: string;
  nivelDor: number | null;
  respostaTratamento: string;
  evolucao: string;
  queixaDoDia: string;
  tecnicas: string;
  observacoes: string | null;
};

const SOAP_STYLE: Record<SoapKey, { badge: string; border: string; label: string }> = {
  S: { badge: 'bg-blue-100 text-blue-700', border: 'border-l-blue-400', label: 'Subjetivo' },
  O: { badge: 'bg-emerald-100 text-emerald-700', border: 'border-l-emerald-400', label: 'Objetivo' },
  A: { badge: 'bg-violet-100 text-violet-700', border: 'border-l-violet-400', label: 'Avaliação' },
  P: { badge: 'bg-amber-100 text-amber-700', border: 'border-l-amber-400', label: 'Plano' },
};

function parseSoap(text: string): SoapSection[] {
  const sections: SoapSection[] = [];
  const lines = text.split('\n');
  let currentKey: SoapKey | null = null;
  let currentLines: string[] = [];

  const flush = () => {
    if (currentKey) {
      sections.push({
        key: currentKey,
        label: SOAP_STYLE[currentKey].label,
        content: currentLines.join('\n').trim(),
      });
    }
  };

  for (const line of lines) {
    const match = line.match(/^\*{0,2}([SOAP])\*{0,2}\s*(?:\([^)]*\))?\s*[:\-]\s*/i);
    if (match) {
      flush();
      currentKey = match[1].toUpperCase() as SoapKey;
      const rest = line.replace(/^\*{0,2}[SOAP]\*{0,2}\s*(?:\([^)]*\))?\s*[:\-]\s*/i, '').trim();
      currentLines = rest ? [rest] : [];
    } else if (currentKey) {
      currentLines.push(line);
    }
  }
  flush();

  return sections;
}

function dorBadgeClass(nivel: number) {
  if (nivel <= 3) return 'bg-green-100 text-green-700';
  if (nivel <= 6) return 'bg-orange-100 text-orange-700';
  return 'bg-red-100 text-red-700';
}

function formatRegiao(r: string) {
  return r.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function formatResposta(r: string) {
  const map: Record<string, string> = {
    excelente: 'Excelente',
    boa: 'Boa',
    parcial: 'Parcial',
    sem_resposta: 'Sem resposta',
    piora: 'Piora',
  };
  return map[r] ?? r;
}

function ProntuarioEntry({ prontuario }: { prontuario: ProntuarioItem }) {
  const [expanded, setExpanded] = useState(false);
  const sections = parseSoap(prontuario.evolucao);
  const hasSoap = sections.length > 0;
  const preview = hasSoap
    ? sections[0].content.split('\n')[0]
    : prontuario.evolucao.split('\n')[0];

  return (
    <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
      <button
        className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors"
        onClick={() => setExpanded((v) => !v)}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-gray-900">
              {format(new Date(prontuario.criadoEm), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
            </span>
            <span className="text-xs text-muted-foreground">
              {format(new Date(prontuario.criadoEm), 'HH:mm', { locale: ptBR })}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span className="text-xs text-gray-500">{formatRegiao(prontuario.regiaoCorpo)}</span>
            {prontuario.nivelDor !== null && (
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${dorBadgeClass(prontuario.nivelDor)}`}>
                Dor {prontuario.nivelDor}/10
              </span>
            )}
            <span className="text-xs text-gray-400">·</span>
            <span className="text-xs text-gray-500">{formatResposta(prontuario.respostaTratamento)}</span>
          </div>
          {!expanded && (
            <p className="text-xs text-muted-foreground mt-1 truncate">{preview}</p>
          )}
        </div>
        <div className="shrink-0 text-gray-400">
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </div>
      </button>

      {expanded && (
        <div className="border-t border-gray-100 px-4 pb-4 pt-3 space-y-3">
          {hasSoap ? (
            sections.map((section) => {
              const style = SOAP_STYLE[section.key];
              return (
                <div key={section.key} className={`border-l-4 pl-3 py-1 ${style.border}`}>
                  <span className={`inline-block rounded px-1.5 py-0.5 text-xs font-semibold mb-1 ${style.badge}`}>
                    {section.key} — {section.label}
                  </span>
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {section.content}
                  </p>
                </div>
              );
            })
          ) : (
            <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
              {prontuario.evolucao}
            </p>
          )}

          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <p className="text-xs text-gray-400">
              ✦ Gerado por IA — revisado pelo fisioterapeuta responsável (CREFITO)
            </p>
            <div className="flex items-center gap-1">
              <EditProntuarioButton
                prontuario={{
                  id: prontuario.id,
                  queixaDoDia: prontuario.queixaDoDia,
                  nivelDor: prontuario.nivelDor,
                  regiaoCorpo: prontuario.regiaoCorpo,
                  tecnicas: prontuario.tecnicas,
                  respostaTratamento: prontuario.respostaTratamento,
                  observacoes: prontuario.observacoes,
                  evolucao: prontuario.evolucao,
                }}
              />
              <DeleteProntuarioDialog id={prontuario.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function ProntuarioTimeline({ prontuarios }: { prontuarios: ProntuarioItem[] }) {
  const sorted = [...prontuarios].sort(
    (a, b) => new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime(),
  );

  if (sorted.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-12 text-center">
        <div className="rounded-full bg-blue-50 p-4">
          <Sparkles className="h-7 w-7 text-blue-500" />
        </div>
        <div>
          <p className="font-medium text-gray-900">Nenhum prontuário registrado</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Gere a evolução clínica após cada sessão com IA
          </p>
        </div>
        <CreateProntuarioButton />
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {sorted.map((p) => (
        <ProntuarioEntry key={p.id} prontuario={p} />
      ))}
    </div>
  );
}
