import type {
  Paciente,
  Consulta,
  Avaliacao,
  PlanoTratamento,
  Pagamento,
} from '@prisma/client';

// Tipos estendidos com relações
export type PacienteCompleto = Paciente & {
  consultas: Consulta[];
  pagamentos: Pagamento[];
  _count: {
    consultas: number;
    pagamentos: number;
  };
};

export type ConsultaCompleta = Consulta & {
  paciente: Paciente;
};

export type AvaliacaoCompleta = Avaliacao & {
  paciente: Paciente;
  planoTratamento: PlanoTratamento | null;
};

// Tipos para formulários
export type CreatePacienteData = Omit<
  Paciente,
  'id' | 'criadoEm' | 'atualizadoEm'
>;
export type UpdatePacienteData = Partial<CreatePacienteData>;

// API Response types
export type ApiResponse<T> = {
  data?: T;
  error?: string;
  success: boolean;
};

export type PaginatedResponse<T> = ApiResponse<T[]> & {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};
