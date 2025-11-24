import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default async function Dashboard() {
  return (
    <>
      <div className="flex flex-row gap-4">
        <Card className="w-1/6">
          <CardHeader className="text-2xl font-bold">
            Pacientes ativos
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">150</div>
          </CardContent>
        </Card>
        <Card className="w-1/6">
          <CardHeader className="text-2xl font-bold">
            Pacientes com consultas em: {new Date().toLocaleDateString()}
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">20</div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
