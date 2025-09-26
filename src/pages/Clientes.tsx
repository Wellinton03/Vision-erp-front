import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search,
  Plus,
  MoreVertical,
  Phone,
  Mail,
  MapPin
} from "lucide-react";

export default function Clientes() {
  // Dados mockados - substitua por dados reais da sua API
  const clientes = [
    {
      id: 1,
      nome: "João Silva",
      empresa: "Silva & Associados",
      email: "joao@silva.com",
      telefone: "(11) 99999-9999",
      cidade: "São Paulo, SP",
      status: "Ativo",
      totalPedidos: 15,
      valorTotal: "R$ 45.200"
    },
    {
      id: 2,
      nome: "Maria Santos",
      empresa: "Santos Comércio",
      email: "maria@santos.com",
      telefone: "(11) 88888-8888",
      cidade: "Rio de Janeiro, RJ",
      status: "Ativo",
      totalPedidos: 8,
      valorTotal: "R$ 22.800"
    },
    {
      id: 3,
      nome: "Pedro Costa",
      empresa: "Costa Ltda",
      email: "pedro@costa.com",
      telefone: "(11) 77777-7777", 
      cidade: "Belo Horizonte, MG",
      status: "Inativo",
      totalPedidos: 3,
      valorTotal: "R$ 8.900"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Clientes</h1>
          <p className="text-muted-foreground">Gerencie sua base de clientes</p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90 transition-opacity">
          <Plus className="h-4 w-4 mr-2" />
          Novo Cliente
        </Button>
      </div>

      {/* Search & Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Buscar clientes..." 
                className="pl-10 bg-muted/30"
              />
            </div>
            <Button variant="outline">Filtros</Button>
          </div>
        </CardContent>
      </Card>

      {/* Clientes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clientes.map((cliente) => (
          <Card key={cliente.id} className="hover:shadow-md transition-all duration-200 hover:translate-y-[-2px]">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{cliente.nome}</CardTitle>
                  <p className="text-sm text-muted-foreground">{cliente.empresa}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={cliente.status === "Ativo" ? "default" : "secondary"}
                    className={cliente.status === "Ativo" 
                      ? "bg-success text-success-foreground" 
                      : "bg-muted text-muted-foreground"
                    }
                  >
                    {cliente.status}
                  </Badge>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Contact Info */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{cliente.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{cliente.telefone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{cliente.cidade}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="pt-4 border-t border-border">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Pedidos</p>
                    <p className="font-semibold">{cliente.totalPedidos}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Valor Total</p>
                    <p className="font-semibold text-success">{cliente.valorTotal}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Ver Detalhes
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Editar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}