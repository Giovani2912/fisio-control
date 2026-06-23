import { TipoConsulta, StatusConsulta } from '@prisma/client';

export const TIPO_COLORS: Record<TipoConsulta, string> = {
  AVALIACAO:   'bg-sky-100 text-sky-800 dark:bg-sky-500/15 dark:text-sky-300',
  SESSAO:      'bg-violet-100 text-violet-800 dark:bg-violet-500/15 dark:text-violet-300',
  RETORNO:     'bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300',
  REAVALIACAO: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300',
};

export const TIPO_BORDER_COLORS: Record<TipoConsulta, string> = {
  AVALIACAO:   'border-sky-400',
  SESSAO:      'border-violet-400',
  RETORNO:     'border-amber-400',
  REAVALIACAO: 'border-emerald-400',
};

export const TIPO_LABELS: Record<TipoConsulta, string> = {
  AVALIACAO:   'Avaliação',
  SESSAO:      'Sessão',
  RETORNO:     'Retorno',
  REAVALIACAO: 'Reavaliação',
};

export const STATUS_BORDER_COLORS: Record<StatusConsulta, string> = {
  AGENDADA:    'border-amber-400',
  CONFIRMADA:  'border-green-500',
  CANCELADA:   'border-red-400',
  FALTA:       'border-gray-400',
  EM_ANDAMENTO:'border-yellow-400',
  FINALIZADA:  'border-red-400',
};

export const STATUS_OPTIONS = [
  {
    value: StatusConsulta.AGENDADA,
    label: 'Agendada',
  },
  {
    value: StatusConsulta.CONFIRMADA,
    label: 'Confirmada',
  },
  {
    value: StatusConsulta.CANCELADA,
    label: 'Cancelada',
  },
  {
    value: StatusConsulta.FALTA,
    label: 'Falta',
  },
];

export const TIPO_CONSULTA = [
    {
        value: TipoConsulta.AVALIACAO,
        label: 'Avaliação',
    },
    {
        value: TipoConsulta.RETORNO,
        label: 'Retorno',
    },
    {
        value: TipoConsulta.SESSAO,
        label: 'Sessão',
    },
]