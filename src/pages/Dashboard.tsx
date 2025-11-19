import { MetricCard } from "@/components/dashboard/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  DollarSign, 
  Users, 
  ShoppingCart, 
  TrendingUp,
  Package,
  Calendar
} from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

export default function Dashboard() {
  // Dados mockados - substitua por dados reais da sua API
  const metrics = [
    {
      title: "Receita Total",
      value: "R$ 124.500",
      subtitle: "Este mês",
      icon: DollarSign,
      trend: { value: 12.5, label: "vs mês anterior", isPositive: true },
      variant: "success" as const
    },
    {
      title: "Novos Clientes",
      value: "148",
      subtitle: "Este mês",
      icon: Users,
      trend: { value: 8.2, label: "vs mês anterior", isPositive: true },
      variant: "primary" as const
    },
    {
      title: "Vendas Realizadas",
      value: "324",
      subtitle: "Este mês", 
      icon: ShoppingCart,
      trend: { value: -2.1, label: "vs mês anterior", isPositive: false },
      variant: "default" as const
    },
    {
      title: "Produtos Cadastrados",
      value: "1.247",
      subtitle: "Total ativo",
      icon: Package,
      trend: { value: 5.3, label: "novos produtos", isPositive: true },
      variant: "default" as const
    }
  ];

  // Dados mockados para o gráfico de vendas dos últimos 30 dias
  const salesData = [
    { day: "01", vendas: 12500 },
    { day: "05", vendas: 15300 },
    { day: "10", vendas: 18700 },
    { day: "15", vendas: 14200 },
    { day: "20", vendas: 21500 },
    { day: "25", vendas: 19800 },
    { day: "30", vendas: 22500 },
  ];

  const chartConfig = {
    vendas: {
      label: "Vendas",
      color: "hsl(var(--primary))",
    },
  };

  const recentActivities = [
    { id: 1, action: "Nova venda realizada", client: "João Silva", amount: "R$ 2.450", time: "2 min atrás" },
    { id: 2, action: "Cliente cadastrado", client: "Maria Santos", amount: "", time: "15 min atrás" },
    { id: 3, action: "Produto atualizado", client: "Notebook Dell", amount: "R$ 3.200", time: "1h atrás" },
    { id: 4, action: "Pagamento recebido", client: "Pedro Costa", amount: "R$ 890", time: "2h atrás" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Visão geral do seu negócio</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{new Date().toLocaleDateString('pt-BR', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            subtitle={metric.subtitle}
            icon={metric.icon}
            trend={metric.trend}
            variant={metric.variant}
          />
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Vendas */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Vendas dos Últimos 30 Dias
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64 w-full">
              <BarChart data={salesData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="day" 
                  tickLine={false}
                  axisLine={false}
                  className="text-xs"
                  tickFormatter={(value) => `Dia ${value}`}
                />
                <YAxis 
                  tickLine={false}
                  axisLine={false}
                  className="text-xs"
                  tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
                />
                <ChartTooltip 
                  content={<ChartTooltipContent />}
                  formatter={(value) => [`R$ ${Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, "Vendas"]}
                />
                <Bar 
                  dataKey="vendas" 
                  fill="var(--color-vendas)" 
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Atividades Recentes */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Atividades Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-accent transition-colors">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.client}</p>
                  </div>
                  <div className="text-right">
                    {activity.amount && (
                      <p className="font-medium text-sm text-success">{activity.amount}</p>
                    )}
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}