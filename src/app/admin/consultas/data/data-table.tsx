'use client';

import { useState } from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { XIcon } from 'lucide-react';

const TIPO_OPTIONS = [
  { value: 'AVALIACAO', label: 'Avaliação' },
  { value: 'SESSAO', label: 'Sessão' },
  { value: 'RETORNO', label: 'Retorno' },
  { value: 'REAVALIACAO', label: 'Reavaliação' },
];

const STATUS_OPTIONS = [
  { value: 'AGENDADA', label: 'Agendada' },
  { value: 'CONFIRMADA', label: 'Confirmada' },
  { value: 'EM_ANDAMENTO', label: 'Em Andamento' },
  { value: 'FINALIZADA', label: 'Finalizada' },
  { value: 'CANCELADA', label: 'Cancelada' },
  { value: 'FALTA', label: 'Falta' },
];

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: { sorting, columnFilters },
  });

  const hasFilters = columnFilters.length > 0;
  const filteredCount = table.getFilteredRowModel().rows.length;
  const totalCount = data.length;

  return (
    <div className="space-y-3 p-4">
      <div className="flex flex-wrap items-center gap-2">
        <Input
          placeholder="Buscar paciente..."
          value={(table.getColumn('paciente')?.getFilterValue() as string) ?? ''}
          onChange={e =>
            table.getColumn('paciente')?.setFilterValue(e.target.value)
          }
          className="h-8 w-full sm:w-48"
        />

        <Select
          value={(table.getColumn('tipo')?.getFilterValue() as string) ?? 'all'}
          onValueChange={val =>
            table.getColumn('tipo')?.setFilterValue(val === 'all' ? '' : val)
          }
        >
          <SelectTrigger className="h-8 min-w-0 flex-1 sm:w-36 sm:flex-none">
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os tipos</SelectItem>
            {TIPO_OPTIONS.map(o => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={
            (table.getColumn('status')?.getFilterValue() as string) ?? 'all'
          }
          onValueChange={val =>
            table.getColumn('status')?.setFilterValue(val === 'all' ? '' : val)
          }
        >
          <SelectTrigger className="h-8 min-w-0 flex-1 sm:w-40 sm:flex-none">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os status</SelectItem>
            {STATUS_OPTIONS.map(o => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => table.resetColumnFilters()}
            className="h-8 gap-1 text-muted-foreground"
          >
            <XIcon className="h-3.5 w-3.5" />
            Limpar
          </Button>
        )}

        {hasFilters && filteredCount !== totalCount && (
          <span className="text-xs text-muted-foreground">
            {filteredCount} de {totalCount} consultas
          </span>
        )}
      </div>

      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id} className="whitespace-nowrap">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Nenhum resultado encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
