'use client';

import { useState } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addMonths,
  subMonths,
  isSameDay,
  isSameMonth,
  isToday,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Consulta } from '../data/columns';
import { ConsultaActions } from './consulta-actions';
import type { SelectOption } from '@/components/upserts/generic-upsert';

const WEEKDAYS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

const TIPO_COLORS: Record<string, string> = {
  AVALIACAO: 'bg-sky-100 text-sky-800',
  SESSAO: 'bg-violet-100 text-violet-800',
  RETORNO: 'bg-amber-100 text-amber-800',
  REAVALIACAO: 'bg-emerald-100 text-emerald-800',
};

const TIPO_DOT: Record<string, string> = {
  AVALIACAO: 'bg-sky-500',
  SESSAO: 'bg-violet-500',
  RETORNO: 'bg-amber-500',
  REAVALIACAO: 'bg-emerald-500',
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

export function CalendarMonthlyView({
  consultas,
  pacienteOptions,
}: {
  consultas: Consulta[];
  pacienteOptions: SelectOption[];
}) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: calStart, end: calEnd });

  const getConsultasForDay = (day: Date) =>
    consultas
      .filter(c => isSameDay(parseDate(c.data), day))
      .sort((a, b) => a.horaInicio.localeCompare(b.horaInicio));

  return (
    <div className="rounded-2xl bg-white p-4">
      <div className="mb-4 flex items-center justify-between">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentDate(d => subMonths(d, 1))}
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
        <h2 className="text-sm font-semibold capitalize">
          {format(currentDate, 'MMMM yyyy', { locale: ptBR })}
        </h2>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentDate(d => addMonths(d, 1))}
        >
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
      </div>

      <div className="mb-1 grid grid-cols-7">
        {WEEKDAYS.map(day => (
          <div
            key={day}
            className="py-1 text-center text-xs font-medium text-muted-foreground"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-px overflow-hidden rounded-lg bg-border">
        {days.map(day => {
          const dayConsultas = getConsultasForDay(day);
          const isCurrentMonth = isSameMonth(day, currentDate);
          const isCurrentDay = isToday(day);
          const isSelected = selectedDay !== null && isSameDay(day, selectedDay);
          const visible = dayConsultas.slice(0, 2);
          const overflow = dayConsultas.length - 2;

          return (
            <button
              type="button"
              key={day.toISOString()}
              onClick={() => setSelectedDay(day)}
              className={cn(
                'flex min-h-14 flex-col gap-0.5 bg-white p-1.5 text-left transition-colors hover:bg-muted/40 lg:min-h-20',
                !isCurrentMonth && 'bg-muted/30',
                isSelected && 'ring-2 ring-inset ring-primary',
              )}
            >
              <span
                className={cn(
                  'mb-0.5 flex h-6 w-6 items-center justify-center self-end rounded-full text-xs font-medium',
                  isCurrentDay && 'bg-primary text-primary-foreground',
                  !isCurrentDay && isCurrentMonth && 'text-foreground',
                  !isCurrentDay && !isCurrentMonth && 'text-muted-foreground',
                )}
              >
                {format(day, 'd')}
              </span>

              {/* Pontinhos (mobile) */}
              {dayConsultas.length > 0 && (
                <div className="flex flex-wrap gap-0.5 self-center lg:hidden">
                  {dayConsultas.slice(0, 4).map(c => (
                    <span
                      key={c.id}
                      className={cn(
                        'h-1.5 w-1.5 rounded-full',
                        TIPO_DOT[c.tipo] ?? 'bg-gray-400',
                      )}
                    />
                  ))}
                </div>
              )}

              {/* Chips de texto (desktop) */}
              <div className="hidden flex-col gap-0.5 lg:flex">
                {visible.map(c => (
                  <div
                    key={c.id}
                    title={`${c.paciente} — ${c.horaInicio}`}
                    className={cn(
                      'truncate rounded px-1 py-0.5 text-[10px] leading-tight',
                      TIPO_COLORS[c.tipo] ?? 'bg-gray-100 text-gray-800',
                    )}
                  >
                    {c.horaInicio} {c.paciente}
                  </div>
                ))}
                {overflow > 0 && (
                  <span className="pl-1 text-[10px] text-muted-foreground">
                    +{overflow} mais
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Detalhe do dia selecionado */}
      {selectedDay && (
        <div className="mt-4 border-t pt-4">
          <h3 className="mb-2 text-sm font-semibold capitalize">
            {format(selectedDay, "EEEE, d 'de' MMMM", { locale: ptBR })}
          </h3>
          {getConsultasForDay(selectedDay).length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Nenhuma consulta neste dia.
            </p>
          ) : (
            <div className="space-y-1.5">
              {getConsultasForDay(selectedDay).map(c => (
                <div
                  key={c.id}
                  className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm"
                >
                  <span
                    className={cn(
                      'h-2 w-2 shrink-0 rounded-full',
                      TIPO_DOT[c.tipo] ?? 'bg-gray-400',
                    )}
                  />
                  <span className="font-semibold tabular-nums">
                    {c.horaInicio}
                  </span>
                  <span className="min-w-0 flex-1 truncate font-medium">
                    {c.paciente}
                  </span>
                  <span className="hidden shrink-0 text-xs text-muted-foreground sm:inline">
                    {TIPO_LABELS[c.tipo] ?? c.tipo}
                  </span>
                  <ConsultaActions
                    consulta={c}
                    pacienteOptions={pacienteOptions}
                    className="shrink-0"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
