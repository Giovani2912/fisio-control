import { TipoConsulta, StatusConsulta } from '@prisma/client';

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