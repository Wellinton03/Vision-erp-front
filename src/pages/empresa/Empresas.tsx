import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, MoreVertical, Phone, Mail, MapPin } from "lucide-react";
import { Empresa } from "@/api/Api";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import { EmpresaService } from "@/api/EmpresaService";

export default function Empresas() {
  const [usuarios, setUsuarios] = useState<Empresa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const { CadastroEmpresas } = useAppNavigation();

  useEffect(() => {
    EmpresaService.listarEmpresas()
      .then((data) => {
        if (Array.isArray(data)) {
          setUsuarios(data);
        } else {
          setError("Erro interno no servidor.");
        }
      })
      .catch(() => setError("Erro ao carregar empresas."))
      .finally(() => setLoading(false));
  }, []);

  const filteredUsuarios = usuarios.filter((u) =>
    u.nome?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Empresas</h1>
          <p className="text-muted-foreground">Gerencie sua base de empresas</p>
        </div>
        <Button
          className="bg-gradient-primary hover:opacity-90 transition-opacity"
          onClick={() => CadastroEmpresas()}
        >
          <Plus className="h-4 w-4 mr-2" />
          Nova Empresa
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar usuários..."
                className="pl-10 bg-muted/30"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button variant="outline">Filtros</Button>
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <div className="flex justify-center items-center h-40 text-muted-foreground">
          Carregando empresas...
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center h-40 text-destructive text-center">
          <p>{error}</p>
        </div>
      ) : filteredUsuarios.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
          <p>Nenhuma empresa encontrada.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsuarios.map((empresa) => (
            <Card
              key={empresa.id}
              className="hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{empresa.nome}</CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        empresa.status === "Ativo" ? "default" : "secondary"
                      }
                      className={
                        empresa.status === "Ativo"
                          ? "bg-success text-success-foreground"
                          : "bg-muted text-muted-foreground"
                      }
                    >
                      {empresa.status ?? "Indefinido"}
                    </Badge>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>{empresa.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>{empresa.telefone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{empresa.cidade}</span>
                  </div>
                </div>

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
      )}
    </div>
  );
}
