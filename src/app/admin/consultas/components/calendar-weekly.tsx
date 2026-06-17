'use client';

import { useState } from 'react';
import {
  format,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addWeeks,
  subWeeks,
  isSameDay,
  isToday,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Consulta } from '../data/columns';

const TIPO_COLORS: Record<string, string> = {
  AVALIACAO: 'border-sky-200 bg-sky-100 text-sky-700',
  SESSAO: 'border-violet-200 bg-violet-100 text-violet-700',
  RETORNO: 'border-amber-200 bg-amber-100 text-amber-700',
  REAVALIACAO: 'border-emerald-200 bg-emerald-100 text-emerald-700',
};

const TIPO_LABELS: Record<string, string> = {
  AVALIACAO: 'Avaliação',
  SESSAO: 'Sessão',
  RETORNO: 'Retorno',
  REAVALIACAO: 'Reavaliação',
};

const parseDate = (dateStr: string) => {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d);
};

export function CalendarWeeklyView({ consultas }: { consultas: Consulta[] }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd });

  const getConsultasForDay = (day: Date) =>
    consultas
      .filter(c => isSameDay(parseDate(c.data), day))
      .sort((a, b) => a.horaInicio.localeCompare(b.horaInicio));

  const weekLabel = `${format(weekStart, "d 'de' MMM", { locale: ptBR })} – ${format(weekEnd, "d 'de' MMM yyyy", { locale: ptBR })}`;

  return (
    <div className="rounded-2xl bg-white p-4">
      <div className="mb-4 flex items-center justify-between">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentDate(d => subWeeks(d, 1))}
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
        <h2 className="text-sm font-semibold capitalize">{weekLabel}</h2>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentDate(d => addWeeks(d, 1))}
        >
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map(day => {
          const dayConsultas = getConsultasForDay(day);
          const isCurrentDay = isToday(day);

          return (
            <div key={day.toISOString()} className="flex flex-col gap-1">
              <div
                className={cn(
                  'rounded-lg py-1 text-center',
                  isCurrentDay
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted/50',
                )}
              >
                <div className="text-[10px] font-medium uppercase">
                  {format(day, 'EEE', { locale: ptBR })}
                </div>
                <div className="text-sm font-bold">{format(day, 'd')}</div>
              </div>

              <div className="flex min-h-[160px] flex-col gap-1">
                {dayConsultas.length === 0 ? (
                  <div className="mt-2 text-center text-[10px] text-muted-foreground">
                    —
                  </div>
                ) : (
                  dayConsultas.map(c => (
                    <div
                      key={c.id}
                      className={cn(
                        'rounded-md border px-1.5 py-1 text-[10px] leading-tight',
                        TIPO_COLORS[c.tipo] ??
                          'border-gray-200 bg-gray-100 text-gray-700',
                      )}
                    >
                      <div className="font-semibold">{c.horaInicio}</div>
                      <div className="truncate font-medium">{c.paciente}</div>
                      <div className="opacity-70">
                        {TIPO_LABELS[c.tipo] ?? c.tipo}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
