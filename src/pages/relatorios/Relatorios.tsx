import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Calendar, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { NovoRelatorioDialog } from "./NovoRelatorioDialog";

export interface Relatorio {
  id: number;
  relatorio: string;
  dtInicioPesq: string;
  dtFinalPesq: string;
  dtCriacao: string;
}

const relatoriosMockados: Relatorio[] = [
  {
    id: 1,
    relatorio: "Análise de Gastos - Q1 2024\n\n**Resumo Geral:**\nForam identificados R$ 45.000 em gastos imprevistos no primeiro trimestre, representando um aumento de 23% em relação ao período anterior.\n\n**Principais Causas:**\n- Manutenções emergenciais (45%)\n- Compras não planejadas de TI (30%)\n- Reembolsos de viagens (25%)\n\n**Relações entre Eventos:**\nObservou-se correlação entre falhas de equipamentos e aumento de horas extras.\n\n**Sugestões Práticas:**\n1. Implementar manutenção preventiva trimestral\n2. Estabelecer política de pré-aprovação para compras acima de R$ 5.000\n3. Criar budget fixo mensal para TI\n\n**Riscos Futuros:**\nSem ação imediata, projeção de crescimento de 35% nos gastos imprevistos até Q4.\n\n**Recomendações:**\n- Reunião mensal com gerentes de área\n- Documentação de processos de aprovação\n- Dashboard de monitoramento em tempo real",
    dtInicioPesq: "2024-01-01",
    dtFinalPesq: "2024-03-31",
    dtCriacao: "2024-04-15",
  },
  {
    id: 2,
    relatorio: "Relatório de Eventos Críticos - Março 2024\n\n**Resumo Geral:**\nMarço apresentou 12 eventos críticos totalizando R$ 18.500 em gastos não previstos.\n\n**Principais Causas:**\n- Falhas de infraestrutura (60%)\n- Demandas urgentes de clientes (25%)\n- Problemas de fornecedores (15%)\n\n**Relações entre Eventos:**\nA maioria dos eventos ocorreu após períodos de alta demanda operacional.\n\n**Sugestões Práticas:**\n1. Revisar contratos com fornecedores críticos\n2. Criar fundo de contingência de R$ 10.000/mês\n3. Implementar sistema de alertas preventivos\n\n**Riscos Futuros:**\nPossibilidade de interrupção de serviços caso infraestrutura não seja modernizada.\n\n**Recomendações:**\n- Workshop sobre gestão de crises\n- Auditoria trimestral de fornecedores\n- Plano de backup para serviços críticos",
    dtInicioPesq: "2024-03-01",
    dtFinalPesq: "2024-03-31",
    dtCriacao: "2024-04-02",
  },
];

export default function Relatorios() {
  const [relatorios, setRelatorios] = useState<Relatorio[]>(relatoriosMockados);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleNovoRelatorio = (novoRelatorio: Relatorio) => {
    setRelatorios([novoRelatorio, ...relatorios]);
  };

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString("pt-BR");
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Relatórios de Gastos</h1>
          <p className="text-muted-foreground mt-1">
            Análises geradas por IA sobre eventos e gastos imprevistos
          </p>
        </div>
        <Button
          className="flex items-center gap-2"
          onClick={() => setDialogOpen(true)}
        >
          <Plus className="h-4 w-4" />
          Novo Relatório
        </Button>
      </div>

      <div className="grid gap-6">
        {relatorios.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="mx-auto h-12 w-12 mb-4 opacity-50" />
                <p>Nenhum relatório encontrado</p>
                <p className="text-sm">Clique em "Novo Relatório" para começar</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          relatorios.map((relatorio) => (
            <Card key={relatorio.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-xl">
                        Relatório #{relatorio.id}
                      </CardTitle>
                      <Badge variant="secondary">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatarData(relatorio.dtCriacao)}
                      </Badge>
                    </div>
                    <CardDescription className="flex items-center gap-4">
                      <span>
                        Período: {formatarData(relatorio.dtInicioPesq)} até{" "}
                        {formatarData(relatorio.dtFinalPesq)}
                      </span>
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  <pre className="whitespace-pre-wrap font-sans text-sm text-foreground bg-muted p-4 rounded-lg">
                    {relatorio.relatorio}
                  </pre>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <NovoRelatorioDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onRelatorioGerado={handleNovoRelatorio}
      />
    </div>
  );
}
