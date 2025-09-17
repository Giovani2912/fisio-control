"use client";

import { Button } from "../ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { z } from "zod";
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
// Tipos para os campos do formulário
export interface SelectOption {
    value: string;
    label: string;
}

export interface FormFieldConfig {
    name: string;
    label: string;
    type: 'text' | 'email' | 'tel' | 'number' | 'select' | 'textarea' | 'date';
    placeholder?: string;
    required?: boolean;
    options?: SelectOption[]; // Para campos select
    gridColumn?: 'full' | 'half'; // Para controlar o layout
}

// Props do componente genérico
interface GenericUpsertProps<T extends Record<string, any>> {
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

const renderFormControl = (type: string, formField: any, placeholder?: string, options?: Array<{ value: string, label: string }>) => {
    switch (type) {
        case 'select':
            return (
                <Select
                    onValueChange={formField.onChange}
                    value={formField.value}
                >
                    <SelectTrigger>
                        <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                        {options?.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            )

        case 'textarea':
            return (
                <Textarea
                    placeholder={placeholder}
                    className="resize-none"
                    {...formField}
                />
            )

        case 'date':
            return (
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                                "w-full justify-start text-left font-normal",
                                !formField.value && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formField.value ? (
                                format(formField.value, "dd/MM/yyyy")
                            ) : (
                                <span>{placeholder || "Selecione uma data"}</span>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={formField.value}
                            onSelect={formField.onChange}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
            )

        default:
            return (
                <Input
                    type={type}
                    placeholder={placeholder}
                    {...formField}
                />
            )
    }
}

function GenericUpsert<T extends Record<string, any>>({
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
        resolver: zodResolver(schema),
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
            console.error("Erro ao salvar:", error);
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
                control={form.control}
                name={name as any}
                render={({ field: formField }) => (
                    <FormItem className={field.gridColumn === 'full' ? 'md:col-span-2' : ''}>
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
            onOpenChange={(open) => {
                setIsOpen(open);
                if (!open) {
                    form.reset(defaultValues);
                }
            }}
        >
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {isUpdate ? "Atualizar" : "Criar"} {title}
                    </DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {fields.map(renderField)}
                        </div>

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button
                                    type="button"
                                    variant="outline"
                                    disabled={loading}
                                >
                                    Cancelar
                                </Button>
                            </DialogClose>
                            <Button
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? (
                                    "Salvando..."
                                ) : (
                                    isUpdate ? "Atualizar" : "Cadastrar"
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