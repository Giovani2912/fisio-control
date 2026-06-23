import Link from 'next/link';
import {
  ArrowRight,
  Brain,
  Check,
  Clock,
  Dumbbell,
  FileText,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const features = [
  {
    icon: FileText,
    title: 'Prontuário SOAP automático',
    description:
      'Digite tópicos rápidos da sessão e receba a evolução clínica formatada no padrão internacional SOAP em segundos.',
  },
  {
    icon: Dumbbell,
    title: 'Prescrição de exercícios',
    description:
      'Gere planos de home care com séries, repetições e cuidados, prontos para exportar em PDF ou enviar pelo WhatsApp.',
  },
  {
    icon: Stethoscope,
    title: 'Laudos para convênios',
    description:
      'Justificativas técnicas fundamentadas em CIF e anatomia para aprovar sessões com auditorias mais rápidas.',
  },
  {
    icon: Brain,
    title: 'Engenharia de prompt oculta',
    description:
      'Sem prompts abertos. Você preenche formulários modulares e o sistema monta a instrução técnica nos bastidores.',
  },
  {
    icon: ShieldCheck,
    title: 'Privacidade e LGPD',
    description:
      'Dados sensíveis criptografados. Nenhuma informação identificável do paciente é enviada para a IA.',
  },
  {
    icon: Clock,
    title: 'Feito para o dia a dia',
    description:
      'Mobile-first: gere a evolução do paciente pelo celular entre um atendimento e outro e vá para casa mais cedo.',
  },
];

const steps = [
  {
    step: '01',
    title: 'Selecione o contexto',
    description:
      'Escolha região do corpo, patologia e a semana de tratamento em selects rápidos.',
  },
  {
    step: '02',
    title: 'Adicione palavras-chave',
    description:
      'Descreva a sessão em poucos tópicos — sem precisar escrever textos longos.',
  },
  {
    step: '03',
    title: 'Receba e revise',
    description:
      'A IA entrega o documento técnico pronto para sua revisão e validação final.',
  },
];

const plans = [
  {
    name: 'Free',
    price: 'R$ 0',
    period: '/mês',
    description: 'Para experimentar a agilidade da plataforma.',
    features: [
      'CRUD completo de pacientes',
      'Agendamento de consultas',
      '3 gerações de IA por mês',
      'Histórico de avaliações',
    ],
    cta: 'Começar grátis',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: 'R$ 79',
    period: '/mês',
    description: 'Para o fisioterapeuta autônomo que quer escalar.',
    features: [
      'Gerações de IA ilimitadas',
      'Prontuário SOAP, exercícios e laudos',
      'Exportação de PDF com sua logo',
      'Envio direto para o WhatsApp',
      'Suporte prioritário',
    ],
    cta: 'Assinar o Pro',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Sob consulta',
    period: '',
    description: 'Para clínicas com múltiplos profissionais.',
    features: [
      'Tudo do plano Pro',
      'Painel administrativo multiusuário',
      'Relatórios de uso por equipe',
      'Segurança de dados customizada',
      'Onboarding dedicado',
    ],
    cta: 'Falar com vendas',
    highlighted: false,
  },
];

export default function Home() {
  return (
    <div className="bg-[#f1f1f1]">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <span className="text-lg font-bold text-gray-900">
            Fisio<span className="text-emerald-600">Control</span>
          </span>
          <nav className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link href="/sign-in">Entrar</Link>
            </Button>
            <Button
              asChild
              size="sm"
              className="bg-green-600 text-white hover:bg-green-700"
            >
              <Link href="/sign-up">Criar conta</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-linear-to-b from-emerald-50 via-[#f1f1f1] to-[#f1f1f1]" />
        <div
          aria-hidden
          className="absolute -top-24 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-300/40 blur-3xl"
        />
        <div className="mx-auto max-w-5xl px-6 pt-20 pb-16 text-center sm:pt-28">
          <Badge variant="success" className="mx-auto mb-6 gap-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            Copiloto de IA para Fisioterapia
          </Badge>
          <h1 className="text-4xl leading-tight font-extrabold tracking-tight text-gray-900 sm:text-6xl">
            Documentação clínica
            <br />
            <span className="bg-linear-to-r from-blue-500 to-emerald-500 bg-clip-text text-transparent">
              em segundos, não em horas
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Prontuários SOAP, prescrição de exercícios e laudos para convênios
            gerados por IA. Você atende, a plataforma documenta. Mais tempo para
            o paciente e para você.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-green-600 px-7 text-white hover:bg-green-700"
            >
              <Link href="/sign-up">
                Começar gratuitamente
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="px-7">
              <Link href="#precos">Ver planos</Link>
            </Button>
          </div>
          <p className="mt-5 text-sm text-gray-500">
            Sem cartão de crédito • 3 gerações de IA grátis por mês
          </p>
        </div>
      </section>

      {/* Trust / stats */}
      <section className="border-y border-gray-200 bg-white">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-6 py-12 text-center md:grid-cols-4">
          {[
            { value: '90%', label: 'menos tempo escrevendo' },
            { value: 'SOAP', label: 'padrão internacional' },
            { value: 'LGPD', label: 'dados criptografados' },
            { value: '24/7', label: 'disponível no celular' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-bold text-gray-900">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="default" className="mb-4">
            Recursos
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Tudo o que a sua clínica precisa
          </h2>
          <p className="mt-4 text-gray-600">
            Uma camada de experiência de IA construída sobre a sua rotina
            clínica — sem prompts abertos, sem complicação.
          </p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="border-gray-200 transition-shadow hover:shadow-md"
            >
              <CardHeader>
                <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                  <feature.icon className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="default" className="mb-4">
              Como funciona
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Três passos para a sua evolução pronta
            </h2>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {steps.map((item) => (
              <div key={item.step} className="relative">
                <div className="text-5xl font-extrabold text-emerald-200">
                  {item.step}
                </div>
                <h3 className="mt-3 text-xl font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="precos" className="mx-auto max-w-6xl px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="default" className="mb-4">
            Planos
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Preços simples e transparentes
          </h2>
          <p className="mt-4 text-gray-600">
            Comece grátis e evolua quando a sua agenda pedir. Cancele quando
            quiser.
          </p>
        </div>
        <div className="mt-14 grid items-start gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={
                plan.highlighted
                  ? 'relative border-emerald-500 shadow-lg ring-1 ring-emerald-500'
                  : 'border-gray-200'
              }
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge variant="success" className="gap-1 shadow-sm">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    Mais popular
                  </Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription className="text-base">
                  {plan.description}
                </CardDescription>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-gray-900">
                    {plan.price}
                  </span>
                  <span className="text-gray-500">{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col">
                <ul className="space-y-3">
                  {plan.features.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                      <span className="text-sm text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  size="lg"
                  variant={plan.highlighted ? 'default' : 'outline'}
                  className={
                    plan.highlighted
                      ? 'mt-8 w-full bg-green-600 text-white hover:bg-green-700'
                      : 'mt-8 w-full'
                  }
                >
                  <Link href="/sign-up">{plan.cta}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-20">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-linear-to-br from-emerald-600 to-blue-600 px-6 py-16 text-center shadow-xl">
          <div
            aria-hidden
            className="absolute -right-10 -bottom-10 h-48 w-48 rounded-full bg-white/10 blur-2xl"
          />
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Pronto para ir para casa mais cedo?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-emerald-50">
            Junte-se aos fisioterapeutas que automatizaram a parte chata e
            recuperaram o tempo com os pacientes.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-white px-7 text-emerald-700 hover:bg-emerald-50"
            >
              <Link href="/sign-up">
                Criar conta grátis
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/40 bg-transparent px-7 text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="/sign-in">Já tenho conta</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer / disclaimer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <span className="text-lg font-bold text-gray-900">
              Fisio<span className="text-emerald-600">Control</span>
            </span>
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Fisio Control. Todos os direitos
              reservados.
            </p>
          </div>
          <p className="mt-6 rounded-lg bg-amber-50 px-4 py-3 text-center text-xs text-amber-800">
            ⚕️ O conteúdo gerado por IA é um copiloto e necessita da revisão e
            validação final do profissional portador do Crefito.
          </p>
        </div>
      </footer>
    </div>
  );
}
