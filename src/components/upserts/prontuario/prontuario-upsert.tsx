'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';
import { Sparkles, ArrowLeft, AlertTriangle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  prontuarioInputSchema,
  ProntuarioInputData,
  prontuarioInputDefaultValues,
  prontuarioFields,
} from './config';
import { generateSoapNote, saveProntuario } from '@/app/actions/upsertProntuario';

type Step = 'input' | 'preview';

export type ProntuarioEditData = {
  id: string;
  queixaDoDia: string;
  nivelDor: number | null;
  regiaoCorpo: string;
  tecnicas: string;
  respostaTratamento: string;
  observacoes: string | null;
  evolucao: string;
};

interface UpsertProntuarioProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  initialData?: ProntuarioEditData;
}

const UpsertProntuario = ({ isOpen, setIsOpen, initialData }: UpsertProntuarioProps) => {
  const params = useParams();
  const pacienteId = params.id as string;

  const isEditing = Boolean(initialData);

  const [step, setStep] = useState<Step>(isEditing ? 'preview' : 'input');
  const [soapText, setSoapText] = useState(initialData?.evolucao ?? '');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [inputData, setInputData] = useState<ProntuarioInputData | null>(
    initialData
      ? {
          queixaDoDia: initialData.queixaDoDia,
          nivelDor: initialData.nivelDor !== null ? String(initialData.nivelDor) : '',
          regiaoCorpo: initialData.regiaoCorpo,
          tecnicas: initialData.tecnicas,
          respostaTratamento: initialData.respostaTratamento,
          observacoes: initialData.observacoes ?? '',
        }
      : null,
  );

  const form = useForm<ProntuarioInputData>({
    resolver: zodResolver(prontuarioInputSchema),
    defaultValues: inputData ?? prontuarioInputDefaultValues,
  });

  const handleClose = (open: boolean) => {
    if (!open) {
      setIsOpen(false);
      if (!isEditing) {
        setStep('input');
        setSoapText('');
        setInputData(null);
        form.reset(prontuarioInputDefaultValues);
      }
    }
  };

  const handleGenerate = async (data: ProntuarioInputData) => {
    setIsGenerating(true);
    setInputData(data);
    try {
      const generated = await generateSoapNote({
        ...data,
        nivelDor: data.nivelDor ? Number(data.nivelDor) : undefined,
      });
      setSoapText(generated);
      setStep('preview');
    } catch {
      toast.error('Erro ao gerar o prontuário. Tente novamente.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!inputData) return;
    setIsSaving(true);
    try {
      await saveProntuario({
        ...inputData,
        nivelDor: inputData.nivelDor ? Number(inputData.nivelDor) : undefined,
        evolucao: soapText,
        pacienteId,
        id: initialData?.id,
      });
      toast.success(isEditing ? 'Prontuário atualizado com sucesso!' : 'Prontuário salvo com sucesso!');
      handleClose(false);
    } catch {
      toast.error('Erro ao salvar o prontuário. Tente novamente.');
    } finally {
      setIsSaving(false);
    }
  };

  const renderInputStep = () => (
    <>
      <DialogHeader>
        <DialogTitle>Gerar Prontuário SOAP</DialogTitle>
        <DialogDescription>
          Preencha os dados da sessão com palavras-chave. A IA irá gerar a evolução clínica formatada.
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleGenerate)} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {prontuarioFields.map((fieldConfig) => (
              <FormField
                key={fieldConfig.name}
                control={form.control}
                name={fieldConfig.name as keyof ProntuarioInputData}
                render={({ field }) => (
                  <FormItem className={fieldConfig.gridColumn === 'full' ? 'md:col-span-2' : ''}>
                    <FormLabel>{fieldConfig.label}</FormLabel>
                    <FormControl>
                      {fieldConfig.type === 'select' ? (
                        <Select onValueChange={field.onChange} value={(field.value as string) ?? ''}>
                          <SelectTrigger>
                            <SelectValue placeholder={fieldConfig.placeholder} />
                          </SelectTrigger>
                          <SelectContent>
                            {fieldConfig.options?.map((opt) => (
                              <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Textarea
                          placeholder={fieldConfig.placeholder}
                          className="resize-none"
                          value={(field.value as string) ?? ''}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          name={field.name}
                          ref={field.ref}
                        />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => handleClose(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isGenerating}>
              {isGenerating ? (
                <>
                  <Sparkles className="mr-2 h-4 w-4 animate-pulse" />
                  Gerando prontuário...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Gerar com IA
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );

  const renderPreviewStep = () => (
    <>
      <DialogHeader>
        <DialogTitle>{isEditing ? 'Editar Prontuário' : 'Prontuário SOAP Gerado'}</DialogTitle>
        <DialogDescription>
          {isEditing
            ? 'Edite o texto do prontuário ou regenere com novos dados.'
            : 'Revise e edite o texto antes de salvar no prontuário do paciente.'}
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4">
        <div className="flex items-start gap-2 rounded-md border border-yellow-200 bg-yellow-50 p-3 text-sm text-yellow-800">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            Este texto é gerado por IA como copiloto clínico e necessita da revisão e validação
            do profissional fisioterapeuta portador do CREFITO.
          </span>
        </div>

        <Textarea
          value={soapText}
          onChange={(e) => setSoapText(e.target.value)}
          className="min-h-72 font-mono text-sm"
          placeholder="Evolução SOAP..."
        />
      </div>

      <DialogFooter>
        <Button
          type="button"
          variant="outline"
          onClick={() => setStep('input')}
          disabled={isSaving}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {isEditing ? 'Regenerar' : 'Voltar'}
        </Button>
        <Button onClick={handleSave} disabled={isSaving || !soapText.trim()}>
          {isSaving ? 'Salvando...' : isEditing ? 'Atualizar' : 'Salvar Prontuário'}
        </Button>
      </DialogFooter>
    </>
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        {step === 'input' ? renderInputStep() : renderPreviewStep()}
      </DialogContent>
    </Dialog>
  );
};

export default UpsertProntuario;
