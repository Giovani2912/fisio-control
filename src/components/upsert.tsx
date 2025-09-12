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
import { } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CONVENIO_OPTIONS, SEX_OPTIONS } from "@/constants/paciente";

interface UpsertPacienteProps {
    isOpen: boolean;
    defaultValues?: FormSchema;
    transactionId?: string;
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
    idade: z.number().min(0, { message: "A idade deve ser um número positivo." }).optional(),
    sexo: z.enum(["MASCULINO", "FEMININO", "OUTRO"], {
        errorMap: () => ({ message: "O sexo é obrigatório." }),
    }),
    convenio: z.enum(["HAOC", "Unimed", "Samaritano", "Bradesco", "SulAmerica", "Amil", "PortoSeguro", "NotreDame"], {
        errorMap: () => ({ message: "O convênio é obrigatório." }),
    }),
    numeroConvenio: z.string().trim().min(1, {
        message: "O número do convênio é obrigatório.",
    }),
    contato_emergencia: z.string().trim().min(1, {
        message: "O contato de emergência é obrigatório.",
    }),
});

type FormSchema = z.infer<typeof formSchema>;

const UpsertPaciente = ({
    isOpen,
    defaultValues,
    transactionId,
    setIsOpen,
}: UpsertPacienteProps) => {
    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues ?? {
            nome: "",
            cpf: "",
            rg: "",
            email: "",
            celular: "",
            idade: undefined,
            sexo: "MASCULINO",
            convenio: "HAOC",
            numeroConvenio: "",
            contato_emergencia: "",
        },
    });

    const onSubmit = async (data: FormSchema) => {
        alert(JSON.stringify(data, null, 2));
    };

    const isUpdate = Boolean(transactionId);

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => {
                setIsOpen(open);
                if (!open) {
                    form.reset();
                }
            }}
        >
            <DialogTrigger asChild></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {isUpdate ? "Atualizar" : "Criar"} paciente
                    </DialogTitle>
                    <DialogDescription>Insira as informações abaixo</DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                                        <Input placeholder="Digite o CPF do paciente..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="rg"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>RG</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Digite o RG do paciente..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Digite o email do paciente..." {...field} />
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
                                        <Input placeholder="Digite o celular do paciente..." {...field} />
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
                                        <Input placeholder="Digite a idade do paciente..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                                                <SelectValue placeholder="Selecione o sexo do paciente" />
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
                                                <SelectValue placeholder="Selecione o convênio do paciente" />
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

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="outline">
                                    Cancelar
                                </Button>
                            </DialogClose>
                            <Button type="submit">
                                {isUpdate ? "Atualizar" : "Cadastrar"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default UpsertPaciente;