import { Button } from "./ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { z } from "zod";
import { Convenios, Sexo } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CONVENIO_OPTIONS, SEX_OPTIONS } from "@/constants/paciente";
import { upsertPaciente } from "@/app/actions/upsertPaciente";
import { useState, useEffect } from "react";
import { toast } from "sonner"; // ou seu sistema de toast preferido

interface UpsertPacienteProps {
    isOpen: boolean;
    defaultValues?: FormSchema;
    pacienteId?: string;
    setIsOpen: (isOpen: boolean) => void;
}

const formSchema = z.object({
    nome: z.string().trim().min(1, {
        message: "O nome é obrigatório.",
    }),
    cpf: z.string().trim().min(1, {
        message: "O CPF é obrigatório.",
    }),
    rg: z.string().trim().min(1, {
        message: "O RG é obrigatório.",
    }),
    email: z.string().trim().min(1, {
        message: "O email é obrigatório.",
    }).email("Formato de email inválido"),
    celular: z.string().trim().min(1, {
        message: "O celular é obrigatório.",
    }),
    idade: z.string().trim().min(1, {
        message: "A idade é obrigatória.",
    }),
    sexo: z.nativeEnum(Sexo),
    convenio: z.nativeEnum(Convenios),
    numeroConvenio: z.string().trim().min(1, {
        message: "O número do convênio é obrigatório.",
    }),
    contato_emergencia: z.string().trim().min(1, {
        message: "O contato de emergência é obrigatório.",
    }),
    criadoEm: z.string().optional(),
    atualizadoEm: z.string().optional(),
    id: z.string().optional(),
    ativo: z.boolean().optional()
});

type FormSchema = z.infer<typeof formSchema>;

const UpsertPaciente = ({
    isOpen,
    defaultValues,
    pacienteId,
    setIsOpen,
}: UpsertPacienteProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues ?? {
            nome: "",
            cpf: "",
            rg: "",
            email: "",
            celular: "",
            idade: "",
            sexo: "MASCULINO",
            convenio: "HAOC",
            numeroConvenio: "",
            contato_emergencia: "",
        },
    });

    // Atualiza os valores do formulário quando defaultValues mudam
    useEffect(() => {
        if (defaultValues) {
            form.reset(defaultValues);
        } else {
            form.reset({
                nome: "",
                cpf: "",
                rg: "",
                email: "",
                celular: "",
                idade: "",
                sexo: "MASCULINO",
                convenio: "HAOC",
                numeroConvenio: "",
                contato_emergencia: "",
            });
        }
    }, [defaultValues, form]);

    const onSubmit = async (data: FormSchema) => {
        setIsLoading(true);
        try {
            await upsertPaciente({ ...data, id: pacienteId });
            setIsOpen(false);
            form.reset();
            toast.success(
                pacienteId
                    ? "Paciente atualizado com sucesso!"
                    : "Paciente cadastrado com sucesso!"
            );
        } catch (error) {
            console.error("Erro ao salvar paciente:", error);
            toast.error("Erro ao salvar paciente. Tente novamente.");
        } finally {
            setIsLoading(false);
        }
    };

    const isUpdate = Boolean(pacienteId);

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => {
                setIsOpen(open);
                if (!open) {
                    // Reset para valores vazios ao fechar
                    form.reset({
                        nome: "",
                        cpf: "",
                        rg: "",
                        email: "",
                        celular: "",
                        idade: "",
                        sexo: "MASCULINO",
                        convenio: "HAOC",
                        numeroConvenio: "",
                        contato_emergencia: "",
                    });
                }
            }}
        >
            <DialogTrigger asChild></DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {isUpdate ? "Atualizar" : "Criar"} paciente
                    </DialogTitle>
                    <DialogDescription>Insira as informações abaixo</DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="nome"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nome</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Digite o nome..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="cpf"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>CPF</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Digite o CPF..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="rg"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>RG</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Digite o RG..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="idade"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Idade</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Digite a idade..."
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder="Digite o email..."
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="celular"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Celular</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="tel"
                                                placeholder="Digite o celular..."
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="sexo"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Sexo</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecione o sexo" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {SEX_OPTIONS.map((option) => (
                                                    <SelectItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="convenio"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Convênio</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecione o convênio" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {CONVENIO_OPTIONS.map((option) => (
                                                    <SelectItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* CAMPOS QUE ESTAVAM FALTANDO */}
                        <FormField
                            control={form.control}
                            name="numeroConvenio"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Número do Convênio</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Digite o número do convênio..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="contato_emergencia"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contato de Emergência</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Digite o contato de emergência..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button
                                    type="button"
                                    variant="outline"
                                    disabled={isLoading}
                                >
                                    Cancelar
                                </Button>
                            </DialogClose>
                            <Button
                                type="submit"
                                disabled={isLoading}
                            >
                                {isLoading ? (
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
};

export default UpsertPaciente;