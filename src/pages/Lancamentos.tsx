import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileText } from "lucide-react";

export default function Lancamentos() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Lançamentos</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie seus gastos imprevistos e lançamentos financeiros
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Novo Lançamento
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Lançamentos Recentes</CardTitle>
            <CardDescription>
              Últimos gastos imprevistos registrados no sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="mx-auto h-12 w-12 mb-4 opacity-50" />
              <p>Nenhum lançamento encontrado</p>
              <p className="text-sm">Clique em "Novo Lançamento" para começar</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}