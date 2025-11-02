import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { CalendarDays, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { UsuarioService } from "@/api/UsuarioService";
import { EventoService } from "@/api/EventoService";
const eventoSchema = z.object({
  titulo: z
    .string()
    .trim()
    .min(1, { message: "Título é obrigatório" })
    .max(150, { message: "Título deve ter no máximo 150 caracteres" }),

  descricao: z
    .string()
    .trim()
    .min(1, { message: "Descrição é obrigatória" })
    .max(500, { message: "Descrição deve ter no máximo 500 caracteres" }),

  data: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), { message: "Data inválida" }),

  setorResponsavel: z
    .string()
    .trim()
    .min(1, { message: "Setor responsável é obrigatório" }),

    relatorId: z.string().trim().min(1, { message: "Relator é obrigatório" }),

    responsavelId: z
    .string()
    .trim()
    .min(1, { message: "Responsável é obrigatório" }),
});

type EventoFormData = z.infer<typeof eventoSchema>;

export default function CadastroEventos() {
  const { toast } = useToast();
  const [usuarios, setUsuarios] = useState<{ id: string; nome: string }[]>([]);

  const form = useForm<EventoFormData>({
    resolver: zodResolver(eventoSchema),
    defaultValues: {
      titulo: "",
      descricao: "",
      data: "",
      setorResponsavel: "",
      relatorId: "",
      responsavelId: "",
    },
  });

  const onSubmit = async (data: EventoFormData) => {
    console.log("Dados do evento:", data);
    try {
      await EventoService.criarEvento(data);
      toast({
        title: "Evento cadastrado",
        description: "O evento foi adicionado com sucesso!",
        variant: "default",
      });
      form.reset();
    } catch (error) {
      console.error("Erro ao cadastrar evento:", error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao cadastrar o evento. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    async function carregaUsuarios() {
      try {
        const usuariosResp = await UsuarioService.listarUsuarios();
        const usuariosFormatados = usuariosResp.map((u) => ({ ...u, id: String(u.id) }));
        setUsuarios(usuariosFormatados);
      } catch (error) {
        console.error("Erro ao carregar usuarios:", error);
      }
    }

    carregaUsuarios();
  }, []);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-2">
        <CalendarDays className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Cadastro de Eventos
          </h1>
          <p className="text-muted-foreground mt-1">
            Adicione novos eventos ao sistema
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Dados do Evento</CardTitle>
          <CardDescription>
            Preencha as informações do novo evento
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="titulo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título do Evento</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Digite o título do evento"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="data"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="setorResponsavel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Setor Responsável</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Informe o setor responsável"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="relatorId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Relator</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o relator" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-white text-gray-900 dark:bg-gray-800 dark:text-white">
                          {usuarios.map((usuario) => (
                            <SelectItem key={usuario.id} value={String(usuario.id)}>
                              {usuario.nome}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="responsavelId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Responsável</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o responsável" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-white text-gray-900 dark:bg-gray-800 dark:text-white">
                          {usuarios.map((usuario) => (
                            <SelectItem key={usuario.id} value={String(usuario.id)}>
                              {usuario.nome}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="descricao"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Detalhes do evento..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => form.reset()}
                >
                  Limpar
                </Button>
                <Button type="submit" className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Cadastrar Evento
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
