import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileText } from "lucide-react";
import { useAppNavigation } from "@/hooks/useAppNavigation";

export default function Eventos() {
    const { CadastroEventos } = useAppNavigation();

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Eventos</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie seus gastos imprevistos e lançamentos financeiros
          </p>
        </div>
        <Button
          className="flex items-center gap-2"
          onClick={() => CadastroEventos()}
        >
          <Plus className="h-4 w-4" />
          Novo Evento
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Eventos Recentes</CardTitle>
            <CardDescription>
              Últimos gastos imprevistos registrados no sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="mx-auto h-12 w-12 mb-4 opacity-50" />
              <p>Nenhum evento encontrado</p>
              <p className="text-sm">Clique em "Novo Evento" para começar</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
