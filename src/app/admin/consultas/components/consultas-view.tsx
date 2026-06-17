'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CalendarDaysIcon, CalendarIcon, LayoutListIcon } from 'lucide-react';
import { DataTable } from '../data/data-table';
import { columns, Consulta } from '../data/columns';
import { CalendarMonthlyView } from './calendar-monthly';
import { CalendarWeeklyView } from './calendar-weekly';

type ViewMode = 'table' | 'weekly' | 'monthly';

const VIEWS = [
  { id: 'table' as ViewMode, label: 'Tabela', Icon: LayoutListIcon },
  { id: 'weekly' as ViewMode, label: 'Semana', Icon: CalendarIcon },
  { id: 'monthly' as ViewMode, label: 'Mês', Icon: CalendarDaysIcon },
];

export function ConsultasView({ consultas }: { consultas: Consulta[] }) {
  const [view, setView] = useState<ViewMode>('table');

  return (
    <div className="space-y-4">
      <div className="flex w-fit items-center gap-1 rounded-lg border bg-muted/50 p-1">
        {VIEWS.map(({ id, label, Icon }) => (
          <Button
            key={id}
            variant={view === id ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setView(id)}
            className="h-8 gap-1.5"
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
          </Button>
        ))}
      </div>

      {view === 'table' && (
        <div className="w-full space-y-2 rounded-2xl bg-white">
          <DataTable columns={columns} data={consultas} />
        </div>
      )}
      {view === 'weekly' && <CalendarWeeklyView consultas={consultas} />}
      {view === 'monthly' && <CalendarMonthlyView consultas={consultas} />}
    </div>
  );
}
