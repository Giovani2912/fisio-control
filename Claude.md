# Especificação Técnica do Projeto: ReabilitarAI (Copiloto de IA para Fisioterapia)

Este documento centraliza as definições do modelo de negócio, escopo do produto, arquitetura de software e roadmap de desenvolvimento para a expansão do sistema atual com recursos de Inteligência Artificial Generativa inspirados no modelo *MagicSchool*.

---

## 1. Visão Geral do Sistema Atual (Legado)
O sistema já conta com uma estrutura base operacional (CRUD) focada no gerenciamento de rotinas clínicas essenciais:
* **Pacientes:** Cadastro completo, histórico básico e controle de dados demográficos.
* **Consultas:** Agendamento, controle de presença e histórico de sessões.
* **Avaliação por Paciente:** Registro das avaliações físicas, anamnese e testes iniciais de movimentação.

---

## 2. Nova Arquitetura de Produto: O Modelo "MagicSchool"
A expansão transforma o sistema em uma **camada de experiência (UX) contextual de IA**, eliminando a necessidade de prompts abertos (como ChatGPT). O usuário preenche formulários modulares rápidos e o sistema monta a engenharia de prompt oculta nos bastidores.

### 2.1 Módulos Core de IA a serem Implementados
1.  **Assistente de Prontuário SOAP (Evolução Diária)**
    * *Input do usuário:* Tópicos rápidos ou palavras-chave sobre a sessão (ex: *"dor 4/10 na flexão do ombro, mobilização grau II, manguito com elástico"*).
    * *Ação do sistema:* Formata um prompt estruturado exigindo a formatação técnica no padrão internacional SOAP (Subjective, Objective, Assessment, Plan).
    * *Output:* Evolução clínica formalizada em segundos para o prontuário.
2.  **Prescritor de Exercícios Domiciliares (Home Care)**
    * *Input do usuário:* Diagnóstico cinesiofuncional, limitações e semana do tratamento (ex: *"Pós-operatório de LCA, semana 4, foco em ganho de ADM e ativação de quadríceps"*).
    * *Output:* Cronograma estruturado com séries, repetições, cuidados específicos e instruções de execução em linguagem acessível para o paciente (Pronto para exportar em PDF/WhatsApp).
3.  **Gerador de Laudos e Justificativas para Convênios**
    * *Input do usuário:* Seleção da evolução do paciente e o objetivo do pedido (ex: *"Solicitar mais 10 sessões de RPG por manutenção de quadro álgico na coluna lombar"*).
    * *Output:* Texto técnico robusto, fundamentado em terminologias da CIF/Anatomia para aprovação rápida de auditorias de planos de saúde.

---

## 3. Modelo de Negócio e Monetização
O modelo estratégico adotado será o **SaaS Freemium B2B2C** focado inicialmente na verticalização de Fisioterapia:
* **Plano Free/Trial:** Acesso ao CRUD básico de pacientes e 3 gerações de IA por mês (para degustação da agilidade).
* **Plano Pro (Fisioterapeuta Autônomo):** Uso ilimitado das ferramentas de IA, exportação de PDFs customizados com logo e envio direto para o WhatsApp. Faixa sugerida: *R$ 49,00 a R$ 99,00/mês* (focado no gatilho mental de economia de tempo / "ir para casa mais cedo").
* **Plano Enterprise/Clínicas:** Painel administrativo para gerenciar múltiplos fisioterapeutas, relatórios de uso e segurança de dados customizada.

---

## 4. Diretrizes Técnicas e Engenharia de Prompt (Para o Desenvolvimento)

### 4.1 UI/UX (Interface com o Usuário)
* **Foco Mobile-First:** O fisioterapeuta deve conseguir gerar a evolução clínica pelo smartphone entre um atendimento e outro.
* **Formulários Limpos:** Substituir inputs abertos de chat por `selects` (Região do corpo, Patologia) e campos de texto curto para palavras-chave.

### 4.2 Camada de IA e Backend
* **Prompt Engineering Oculto:** O backend interceptará os dados do formulário e injetará regras estritas de formatação técnica, tom profissional e prevenção de alucinações antes de enviar para a API (OpenAI / Anthropic / Gemini).
* **Privacidade e LGPD:** Criptografia de dados sensíveis dos pacientes. Os prompts enviados para a API não devem conter dados identificáveis (como nome completo ou CPF) do paciente, apenas o contexto clínico.
* **Disclaimer Jurídico:** Todo output gerado pela IA deve conter um aviso visual reforçando que o texto é um *copiloto* e necessita da revisão e validação final do profissional portador do Crefito.

---

## 5. Roadmap de Expansão (Visão de Futuro)
* **Fase 1 (Atual/Validação):** Lançamento do MVP exclusivo para Fisioterapia validando a retenção de uso dos prontuários automatizados.
* **Fase 2 (Expansão por Proximidade):** Lançamento de módulos para áreas correlatas de reabilitação com estruturas similares (Terapia Ocupacional, Quiropraxistras, Educadores Físicos).
* **Fase 3 (Plataforma Multidisciplinar):** Módulos expandidos para clínicas gerais (Nutrição, Psicologia e Fonoaudiologia), unificando a gestão de clínicas multidisciplinares.
