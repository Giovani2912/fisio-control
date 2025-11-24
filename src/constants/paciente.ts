import { Sexo, Convenios } from '@prisma/client';

export const SEX_OPTIONS = [
  {
    value: Sexo.MASCULINO,
    label: 'Masculino',
  },
  {
    value: Sexo.FEMININO,
    label: 'Feminino',
  },
  {
    value: Sexo.OUTRO,
    label: 'Outro',
  },
];

export const CONVENIO_OPTIONS = [
  {
    value: Convenios.HAOC,
    label: 'HAOC',
  },
  {
    value: Convenios.UNIMED,
    label: 'Unimed',
  },
  {
    value: Convenios.SAMARITANO,
    label: 'Samaritano',
  },
  {
    value: Convenios.BRADESCO,
    label: 'Bradesco',
  },
  {
    value: Convenios.SULAMERICA,
    label: 'Sul América',
  },
  {
    value: Convenios.AMIL,
    label: 'Amil',
  },
  {
    value: Convenios.PORTOSEGURO,
    label: 'Porto Seguro',
  },
  {
    value: Convenios.NOTREDAME,
    label: 'Notre Dame',
  },
];
