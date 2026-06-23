// Lista curada de diagnósticos cinesiofuncionais comuns em fisioterapia,
// agrupados por região do corpo. Serve como sugestões no combobox —
// o campo continua aceitando texto livre quando nada encaixar.

export interface DiagnosticoGrupo {
  regiao: string;
  itens: string[];
}

export const diagnosticosPorRegiao: DiagnosticoGrupo[] = [
  {
    regiao: 'Coluna / Tronco',
    itens: [
      'Lombalgia mecânica',
      'Lombalgia com déficit de controle motor',
      'Hérnia de disco lombar',
      'Cervicalgia mecânica',
      'Hérnia de disco cervical',
      'Dorsalgia',
      'Escoliose',
      'Hiperlordose lombar',
      'Hipercifose torácica',
      'Espondilólise / espondilolistese',
      'Estenose de canal lombar',
    ],
  },
  {
    regiao: 'Ombro',
    itens: [
      'Síndrome do impacto do ombro',
      'Lesão do manguito rotador',
      'Capsulite adesiva (ombro congelado)',
      'Instabilidade glenoumeral / pós-luxação',
      'Tendinopatia do bíceps',
      'Pós-operatório de manguito rotador',
      'Bursite subacromial',
    ],
  },
  {
    regiao: 'Cotovelo / Punho / Mão',
    itens: [
      'Epicondilite lateral (cotovelo de tenista)',
      'Epicondilite medial (cotovelo de golfista)',
      'Síndrome do túnel do carpo',
      'Tenossinovite de De Quervain',
      'Rigidez pós-imobilização de punho',
      'Pós-operatório de fratura de punho',
    ],
  },
  {
    regiao: 'Quadril / Pelve',
    itens: [
      'Síndrome do impacto femoroacetabular',
      'Bursite trocantérica',
      'Pubalgia',
      'Tendinopatia dos glúteos',
      'Pós-operatório de artroplastia de quadril',
      'Osteoartrose de quadril (coxartrose)',
    ],
  },
  {
    regiao: 'Joelho',
    itens: [
      'Pós-operatório de LCA (ligamento cruzado anterior)',
      'Lesão meniscal',
      'Síndrome da dor patelofemoral',
      'Tendinopatia patelar',
      'Osteoartrose de joelho (gonartrose)',
      'Pós-operatório de artroplastia de joelho',
      'Lesão de ligamento colateral medial',
    ],
  },
  {
    regiao: 'Tornozelo / Pé',
    itens: [
      'Entorse de tornozelo',
      'Instabilidade crônica de tornozelo',
      'Fascite plantar',
      'Tendinopatia do calcâneo (Aquiles)',
      'Pós-operatório de fratura de tornozelo',
      'Metatarsalgia',
    ],
  },
  {
    regiao: 'Neurológico / Funcional',
    itens: [
      'Hemiparesia pós-AVC',
      'Déficit de equilíbrio e marcha',
      'Disfunção vestibular / labirintite',
      'Lesão de nervo periférico',
      'Reabilitação pós-imobilização prolongada',
      'Descondicionamento físico geral',
    ],
  },
];
