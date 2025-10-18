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
  
    local: z
      .string()
      .trim()
      .min(1, { message: "Local é obrigatório" })
      .max(200, { message: "Local deve ter no máximo 200 caracteres" }),
  
    setorResponsavel: z
      .string()
      .trim()
      .min(1, { message: "Setor responsável é obrigatório" }),
  
    relator: z
      .string()
      .trim()
      .min(1, { message: "Relator é obrigatório" }),
  
    responsavel: z
      .string()
      .trim()
      .min(1, { message: "Responsável é obrigatório" }),
  
    statusEvento: z.enum(["ativo", "cancelado", "finalizado"], {
      errorMap: () => ({ message: "Selecione um status válido" }),
    }),
  });
  
  type EventoFormData = z.infer<typeof eventoSchema>;
  
  export default function CadastroEventos() {
    const { toast } = useToast();
  
    const form = useForm<EventoFormData>({
      resolver: zodResolver(eventoSchema),
      defaultValues: {
        titulo: "",
        descricao: "",
        data: "",
        local: "",
        setorResponsavel: "",
        relator: "",
        responsavel: "",
        statusEvento: "ativo",
      },
    });
  
    const onSubmit = (data: EventoFormData) => {
  
      toast({
        title: "Evento cadastrado",
        description: "O evento foi adicionado com sucesso!",
      });
  
      form.reset();
    };
  
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
                    name="local"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Local</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Informe o local do evento"
                            {...field}
                          />
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
                    name="relator"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Relator</FormLabel>
                        <FormControl>
                          <Input placeholder="Informe o nome do relator" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
  
                  <FormField
                    control={form.control}
                    name="responsavel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Responsável</FormLabel>
                        <FormControl>
                          <Input placeholder="Informe o nome do responsável" {...field} />
                        </FormControl>
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
  
                <FormField
                  control={form.control}
                  name="statusEvento"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="ativo">Ativo</SelectItem>
                          <SelectItem value="cancelado">Cancelado</SelectItem>
                          <SelectItem value="finalizado">Finalizado</SelectItem>
                        </SelectContent>
                      </Select>
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
