import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon, Loader2, Sparkles } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { Relatorio } from "./Relatorios";

interface Evento {
  id: number;
  titulo: string;
  descricao: string;
  data: string;
  valor: number;
  status: string;
}

const eventosMockados: Evento[] = [
  {
    id: 1,
    titulo: "Manutenção Emergencial - Servidor Principal",
    descricao: "Substituição de HD com falha no servidor de produção",
    data: "2024-03-15",
    valor: 8500,
    status: "Concluído",
  },
  {
    id: 2,
    titulo: "Compra Urgente - Licenças de Software",
    descricao: "Aquisição de licenças adicionais para novo projeto",
    data: "2024-03-10",
    valor: 12000,
    status: "Concluído",
  },
  {
    id: 3,
    titulo: "Reembolso - Viagem Não Planejada",
    descricao: "Viagem para atender cliente com problema crítico",
    data: "2024-03-22",
    valor: 3200,
    status: "Pendente",
  },
  {
    id: 4,
    titulo: "Reparo de Climatização",
    descricao: "Manutenção de ar-condicionado central do escritório",
    data: "2024-03-08",
    valor: 4500,
    status: "Concluído",
  },
  {
    id: 5,
    titulo: "Consultoria Jurídica Emergencial",
    descricao: "Assessoria para contrato com prazo apertado",
    data: "2024-03-18",
    valor: 6800,
    status: "Concluído",
  },
];

interface NovoRelatorioDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRelatorioGerado: (relatorio: Relatorio) => void;
}

export function NovoRelatorioDialog({
  open,
  onOpenChange,
  onRelatorioGerado,
}: NovoRelatorioDialogProps) {
  const [eventosSelecionados, setEventosSelecionados] = useState<number[]>([]);
  const [dtInicio, setDtInicio] = useState<Date>();
  const [dtFinal, setDtFinal] = useState<Date>();
  const [gerando, setGerando] = useState(false);

  const toggleEvento = (eventoId: number) => {
    setEventosSelecionados((prev) =>
      prev.includes(eventoId)
        ? prev.filter((id) => id !== eventoId)
        : [...prev, eventoId]
    );
  };

  const simularChamadaIA = async (eventos: Evento[]): Promise<string> => {
    // Simula delay de chamada à IA
    await new Promise((resolve) => setTimeout(resolve, 2500));

    const totalGastos = eventos.reduce((acc, e) => acc + e.valor, 0);
    const eventosTexto = eventos
      .map(
        (e) =>
          `- ${e.titulo} (${format(new Date(e.data), "dd/MM/yyyy", { locale: ptBR })}): R$ ${e.valor.toLocaleString("pt-BR")}`
      )
      .join("\n");

    return `Análise Detalhada de Gastos - ${format(new Date(), "MMMM yyyy", { locale: ptBR })}

**Resumo Geral:**
Foram analisados ${eventos.length} eventos no período, totalizando R$ ${totalGastos.toLocaleString("pt-BR")} em gastos imprevistos. Este montante representa uma necessidade imediata de revisão dos processos de planejamento financeiro.

**Eventos Analisados:**
${eventosTexto}

**Principais Causas:**
1. Manutenções emergenciais (${Math.round((eventos.filter(e => e.titulo.includes("Manutenção")).length / eventos.length) * 100)}%)
2. Demandas urgentes de clientes (${Math.round((eventos.filter(e => e.titulo.includes("Urgente") || e.titulo.includes("Emergencial")).length / eventos.length) * 100)}%)
3. Compras não planejadas (${Math.round((eventos.filter(e => e.titulo.includes("Compra")).length / eventos.length) * 100)}%)

**Relações entre os Eventos:**
Observa-se um padrão de gastos reativos ao invés de preventivos. A concentração de eventos em um curto período indica falta de planejamento adequado e manutenção preventiva insuficiente.

**Sugestões Práticas para Reduzir Gastos:**
1. Implementar programa de manutenção preventiva mensal para equipamentos críticos
2. Criar processo de pré-aprovação para compras acima de R$ 5.000
3. Estabelecer fundo de contingência mensal de aproximadamente R$ ${Math.round(totalGastos * 0.3).toLocaleString("pt-BR")}
4. Desenvolver checklist de validação antes de aprovação de gastos emergenciais
5. Implementar sistema de alertas preventivos para equipamentos críticos

**Riscos Futuros se Nada For Feito:**
- Projeção de aumento de 40% nos gastos imprevistos nos próximos 6 meses
- Possível interrupção de serviços críticos causando perda de receita
- Deterioração do relacionamento com clientes devido a falhas recorrentes
- Aumento da rotatividade de colaboradores devido ao estresse operacional
- Perda de competitividade no mercado por falta de investimento em inovação

**Recomendações de Reuniões, Processos e Documentação:**

*Reuniões Sugeridas:*
- Reunião semanal de alinhamento entre gestores de área (30 min)
- Workshop mensal sobre gestão de custos e prevenção de gastos (2h)
- Revisão trimestral do budget com diretoria (4h)

*Processos a Implementar:*
1. Fluxo de aprovação em 3 níveis para gastos não planejados
2. Checklist de manutenção preventiva mensal
3. Processo de análise de causa raiz para cada evento > R$ 5.000
4. Sistema de tickets para solicitações urgentes com categorização de prioridade

*Documentação Necessária:*
- Manual de procedimentos para gastos emergenciais
- Política de alçadas de aprovação atualizada
- Cronograma anual de manutenções preventivas
- Dashboard de KPIs financeiros de fácil acesso
- Registro histórico de eventos para análise de tendências

**Conclusão:**
A implementação destas medidas pode resultar em redução de 30-40% nos gastos imprevistos no próximo semestre, além de melhorar significativamente a previsibilidade financeira da organização.`;
  };

  const gerarRelatorio = async () => {
    if (eventosSelecionados.length === 0) {
      toast.error("Selecione pelo menos um evento");
      return;
    }

    if (!dtInicio || !dtFinal) {
      toast.error("Selecione o período de análise");
      return;
    }

    setGerando(true);

    try {
      const eventosParaAnalise = eventosMockados.filter((e) =>
        eventosSelecionados.includes(e.id)
      );

      const relatorioGerado = await simularChamadaIA(eventosParaAnalise);

      const novoRelatorio: Relatorio = {
        id: Date.now(),
        relatorio: relatorioGerado,
        dtInicioPesq: format(dtInicio, "yyyy-MM-dd"),
        dtFinalPesq: format(dtFinal, "yyyy-MM-dd"),
        dtCriacao: format(new Date(), "yyyy-MM-dd"),
      };

      onRelatorioGerado(novoRelatorio);
      toast.success("Relatório gerado com sucesso!");
      
      // Reset form
      setEventosSelecionados([]);
      setDtInicio(undefined);
      setDtFinal(undefined);
      onOpenChange(false);
    } catch (error) {
      toast.error("Erro ao gerar relatório");
    } finally {
      setGerando(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Gerar Novo Relatório com IA</DialogTitle>
          <DialogDescription>
            Selecione os eventos que deseja analisar e o período. Nossa IA irá
            gerar um relatório completo com insights e recomendações.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Período de Análise */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Período de Análise</label>
            <div className="flex gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dtInicio && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dtInicio ? (
                      format(dtInicio, "PPP", { locale: ptBR })
                    ) : (
                      <span>Data inicial</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dtInicio}
                    onSelect={setDtInicio}
                    locale={ptBR}
                  />
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dtFinal && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dtFinal ? (
                      format(dtFinal, "PPP", { locale: ptBR })
                    ) : (
                      <span>Data final</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dtFinal}
                    onSelect={setDtFinal}
                    locale={ptBR}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Lista de Eventos */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Selecione os Eventos ({eventosSelecionados.length} selecionados)
            </label>
            <div className="border rounded-lg divide-y max-h-96 overflow-y-auto">
              {eventosMockados.map((evento) => (
                <div
                  key={evento.id}
                  className="flex items-start gap-3 p-4 hover:bg-accent cursor-pointer"
                  onClick={() => toggleEvento(evento.id)}
                >
                  <Checkbox
                    checked={eventosSelecionados.includes(evento.id)}
                    onCheckedChange={() => toggleEvento(evento.id)}
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-medium text-sm">{evento.titulo}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {evento.descricao}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-sm">
                          R$ {evento.valor.toLocaleString("pt-BR")}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(evento.data), "dd/MM/yyyy")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Botão Gerar */}
          <Button
            onClick={gerarRelatorio}
            disabled={gerando || eventosSelecionados.length === 0 || !dtInicio || !dtFinal}
            className="w-full"
            size="lg"
          >
            {gerando ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Gerando relatório...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Gerar Relatório com IA
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
