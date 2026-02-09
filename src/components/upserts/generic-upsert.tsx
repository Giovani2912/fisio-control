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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useEffect } from 'react';
import { z } from 'zod';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
// Tipos para os campos do formulário
export interface SelectOption {
  value: string;
  label: string;
}

export interface FormFieldConfig {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'number' | 'select' | 'textarea' | 'date' | 'time';
  placeholder?: string;
  required?: boolean;
  options?: SelectOption[]; // Para campos select
  gridColumn?: 'full' | 'half'; // Para controlar o layout
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
}

type RHFField = {
  value: any;
  onChange: (...args: any[]) => void;
  onBlur?: (...args: any[]) => void;
  name?: string;
  ref?: any;
};

const renderFormControl = (
  type: string,
  formField: RHFField,
  placeholder?: string,
  options?: Array<{ value: string; label: string }>,
) => {
  switch (type) {
    case 'select':
      return (
        <Select
          onValueChange={(v) => formField.onChange(v)}
          value={(formField.value as string | undefined) ?? ''}
        >
          <SelectTrigger>
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

    case 'textarea':
      return (
        <Textarea
          placeholder={placeholder}
          className="resize-none"
          {...formField}
        />
      );

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

    default:
      return <Input type={type} placeholder={placeholder} {...formField} />;
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
    const { name, label, type, placeholder, options } = field;

    return (
      <FormField
        key={name}
        // @ts-expect-error FieldPath typing is ensured by schema and config
        control={form.control}
        // @ts-expect-error Name maps to FieldPath<T> through config
        name={name}
        render={({ field: formField }) => (
          <FormItem
            className={field.gridColumn === 'full' ? 'md:col-span-2' : ''}
          >
            <FormLabel>{label}</FormLabel>
            <FormControl>
              {renderFormControl(type, formField, placeholder, options)}
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
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
            className="space-y-4"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {fields.map(renderField)}
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline" disabled={loading}>
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit" disabled={loading}>
                {loading ? 'Salvando...' : isUpdate ? 'Atualizar' : 'Cadastrar'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default GenericUpsert;
