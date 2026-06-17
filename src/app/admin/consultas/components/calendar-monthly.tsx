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

const WEEKDAYS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

const TIPO_COLORS: Record<string, string> = {
  AVALIACAO: 'bg-sky-100 text-sky-800',
  SESSAO: 'bg-violet-100 text-violet-800',
  RETORNO: 'bg-amber-100 text-amber-800',
  REAVALIACAO: 'bg-emerald-100 text-emerald-800',
};

const parseDate = (dateStr: string) => {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d);
};

export function CalendarMonthlyView({ consultas }: { consultas: Consulta[] }) {
  const [currentDate, setCurrentDate] = useState(new Date());

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
          const visible = dayConsultas.slice(0, 2);
          const overflow = dayConsultas.length - 2;

          return (
            <div
              key={day.toISOString()}
              className={cn(
                'flex min-h-[80px] flex-col gap-0.5 bg-white p-1.5',
                !isCurrentMonth && 'bg-muted/30',
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
          );
        })}
      </div>
    </div>
  );
}
