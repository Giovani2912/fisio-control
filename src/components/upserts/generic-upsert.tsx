'use client';

import { Button } from '../ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command';
import { useForm } from 'react-hook-form';
import { useState, useEffect, type Ref } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import {
  Calendar as CalendarIcon,
  Check,
  ChevronsUpDown,
  Clock,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { Textarea } from '@/components/ui/textarea';
// Tipos para os campos do formulário
export interface SelectOption {
  value: string;
  label: string;
}

export interface ComboboxGroup {
  label: string;
  options: SelectOption[];
}

export interface FormFieldConfig {
  name: string;
  label: string;
  type:
    | 'text'
    | 'email'
    | 'tel'
    | 'number'
    | 'select'
    | 'combobox'
    | 'textarea'
    | 'date'
    | 'time';
  placeholder?: string;
  required?: boolean;
  options?: SelectOption[];
  /** Sugestões agrupadas para o tipo 'combobox' (aceita texto livre). */
  groups?: ComboboxGroup[];
  gridColumn?: 'full' | 'half';
  step?: number;
}

// Props do componente genérico
interface GenericUpsertProps<T extends Record<string, unknown>> {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title: string;
  description: string;
  schema: z.ZodSchema<T>;
  defaultValues: T;
  fields: FormFieldConfig[];
  onSubmit: (data: T, isUpdate: boolean) => Promise<void>;
  entityId?: string;
  isLoading?: boolean;
  onFieldChange?: (name: string, value: unknown, setValue: (name: string, value: unknown) => void) => void;
}

type RHFField = {
  value: unknown;
  onChange: (value: unknown) => void;
  onBlur?: () => void;
  name?: string;
  ref?: Ref<HTMLInputElement | HTMLTextAreaElement>;
};

function ComboboxField({
  value,
  onChange,
  placeholder,
  groups,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  groups: ComboboxGroup[];
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const typed = search.trim();
  const hasExactMatch = groups.some(group =>
    group.options.some(o => o.label.toLowerCase() === typed.toLowerCase()),
  );

  const commit = (next: string) => {
    onChange(next);
    setOpen(false);
    setSearch('');
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between font-normal"
        >
          <span className={cn('truncate', !value && 'text-muted-foreground')}>
            {value || placeholder || 'Selecione...'}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      {/* Sem portal: renderiza dentro da árvore do Dialog para que o
          react-remove-scroll não bloqueie o scroll do mouse na lista. */}
      <PopoverPrimitive.Content
        align="start"
        sideOffset={4}
        className="bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 z-50 w-(--radix-popover-trigger-width) origin-(--radix-popover-content-transform-origin) rounded-md border p-0 shadow-md outline-hidden"
      >
        <Command>
          <CommandInput
            placeholder="Buscar ou digitar..."
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandEmpty>Nenhum diagnóstico encontrado.</CommandEmpty>
            {typed && !hasExactMatch && (
              <CommandGroup heading="Texto livre">
                <CommandItem value={typed} onSelect={() => commit(typed)}>
                  Usar &ldquo;{typed}&rdquo;
                </CommandItem>
              </CommandGroup>
            )}
            {groups.map(group => (
              <CommandGroup key={group.label} heading={group.label}>
                {group.options.map(option => (
                  <CommandItem
                    key={option.value}
                    value={option.label}
                    onSelect={() => commit(option.label)}
                  >
                    <Check
                      className={cn(
                        'h-4 w-4',
                        value === option.label ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverPrimitive.Content>
    </Popover>
  );
}

const renderFormControl = (
  type: string,
  formField: RHFField,
  placeholder?: string,
  options?: Array<{ value: string; label: string }>,
  step?: number,
  groups?: ComboboxGroup[],
) => {
  switch (type) {
    case 'combobox':
      return (
        <ComboboxField
          value={(formField.value as string | undefined) ?? ''}
          onChange={value => formField.onChange(value)}
          placeholder={placeholder}
          groups={groups ?? []}
        />
      );

    case 'select':
      return (
        <Select
          onValueChange={(v) => formField.onChange(v)}
          value={(formField.value as string | undefined) ?? ''}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options?.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );

    case 'textarea': {
      const { ref, value, ...rest } = formField;
      return (
        <Textarea
          placeholder={placeholder}
          className="resize-none"
          ref={ref as Ref<HTMLTextAreaElement>}
          value={(value as string) ?? ''}
          {...rest}
        />
      );
    }

    case 'date':
      // RHF value is a Date for date inputs in our forms.
      // We keep it as `unknown` in the generic component and narrow here.
      const dateValue = formField.value as Date | undefined;
      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn(
                'w-full justify-start text-left font-normal',
                !formField.value && 'text-muted-foreground',
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateValue ? (
                format(dateValue, 'dd/MM/yyyy')
              ) : (
                <span>{placeholder || 'Selecione uma data'}</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={dateValue}
              onSelect={(d) => {
                if (!d) return formField.onChange(d);
                // Use UTC parts: the picker may give UTC midnight, so getDate() returns
                // the previous day in timezones behind UTC (e.g. Brazil). Build local noon
                // from the intended calendar day.
                const y = d.getUTCFullYear();
                const m = d.getUTCMonth();
                const day = d.getUTCDate();
                const safeDate = new Date(y, m, day, 12, 0, 0);
                formField.onChange(safeDate);
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      );

    case 'time':
      // RHF value is a Date for time inputs in our forms.
      const timeDateValue = formField.value as Date | undefined;
      return (
        <div className="relative">
          <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="time"
            className="pl-10"
            placeholder={placeholder}
            step={step}
            value={
              timeDateValue
                ? `${String(timeDateValue.getHours()).padStart(2, '0')}:${String(
                    timeDateValue.getMinutes(),
                  ).padStart(2, '0')}`
                : ''
            }
            onChange={(e) => {
              const timeValue = e.target.value;
              if (timeValue) {
                const [hours, minutes] = timeValue.split(':');
                const date = timeDateValue ? new Date(timeDateValue) : new Date();
                date.setHours(parseInt(hours, 10));
                date.setMinutes(parseInt(minutes, 10));
                date.setSeconds(0);
                date.setMilliseconds(0);
                formField.onChange(date);
              }
            }}
          />
        </div>
      );

    default: {
      const { ref, value, ...rest } = formField;
      return (
        <Input
          type={type}
          placeholder={placeholder}
          ref={ref as Ref<HTMLInputElement>}
          value={(value as string | number) ?? ''}
          {...rest}
        />
      );
    }
  }
};

function GenericUpsert<T extends Record<string, unknown>>({
  isOpen,
  setIsOpen,
  title,
  description,
  schema,
  defaultValues,
  fields,
  onSubmit,
  entityId,
  isLoading = false,
  onFieldChange,
}: GenericUpsertProps<T>) {
  const [internalLoading, setInternalLoading] = useState(false);

  const form = useForm<T>({
    // @ts-expect-error zod + react-hook-form generic mismatch is safe at runtime
    resolver: zodResolver(schema),
    // @ts-expect-error defaultValues generic narrowing is safe for controlled form
    defaultValues,
  });

  // Atualiza os valores do formulário quando defaultValues mudam
  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues, form]);

  const handleSubmit = async (data: T) => {
    setInternalLoading(true);
    try {
      const isUpdate = Boolean(entityId);
      await onSubmit({ ...data, id: entityId }, isUpdate);
      setIsOpen(false);
      form.reset(defaultValues);
    } catch (error) {
      console.error('Erro ao salvar:', error);
    } finally {
      setInternalLoading(false);
    }
  };

  const isUpdate = Boolean(entityId);
  const loading = isLoading || internalLoading;

  const renderField = (field: FormFieldConfig) => {
    const { name, label, type, placeholder, options, step, groups } = field;

    return (
      <FormField
        key={name}
        // @ts-expect-error FieldPath typing is ensured by schema and config
        control={form.control}
        // @ts-expect-error Name maps to FieldPath<T> through config
        name={name}
        render={({ field: formField }) => {
          const wrappedFormField = onFieldChange
            ? {
                ...formField,
                onChange: (value: unknown) => {
                  formField.onChange(value);
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onFieldChange(name, value, (n, v) => form.setValue(n as any, v as any));
                },
              }
            : formField;

          return (
            <FormItem className={field.gridColumn === 'full' ? 'md:col-span-2' : ''}>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                {renderFormControl(type, wrappedFormField, placeholder, options, step, groups)}
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    );
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={open => {
        setIsOpen(open);
        if (!open) {
          form.reset(defaultValues);
        }
      }}
    >
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isUpdate ? 'Atualizar' : 'Criar'} {title}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            // @ts-expect-error Submit handler types align structurally
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {fields.map(renderField)}
            </div>

            <DialogFooter className="border-t pt-4">
              <DialogClose asChild>
                <Button type="button" variant="outline" disabled={loading}>
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Salvando...
                  </>
                ) : isUpdate ? (
                  'Atualizar'
                ) : (
                  'Cadastrar'
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default GenericUpsert;
