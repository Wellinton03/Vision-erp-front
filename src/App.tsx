import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ERPLayout } from "@/components/layout/ERPLayout";
import Dashboard from "@/pages/Dashboard";
import CadastroUsuarios from "@/pages/usuario/CadastroUsuarios";
import CadastroEmpresas from "@/pages/empresa/CadastroEmpresas";
import NotFound from "@/pages/NotFound";
import Usuarios from "@/pages/usuario/Usuarios";
import Empresas from "@/pages/empresa/Empresas";
import Items from "@/pages/Item/Items";
import CadastroItems from "@/pages/Item/CadastroItems";
import Eventos from "./pages/evento/Eventos";
import CadastroEventos from "./pages/evento/CadastroEventos";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ERPLayout>
                <Dashboard />
              </ERPLayout>
            }
          />
          <Route
            path="/eventos"
            element={
              <ERPLayout>
                <Eventos />
              </ERPLayout>
            }
          />
          <Route
            path="/eventos/cadastro-eventos"
            element={
              <ERPLayout>
                <CadastroEventos />
              </ERPLayout>
            }
          />
          <Route
            path="/usuarios"
            element={
              <ERPLayout>
                <Usuarios />
              </ERPLayout>
            }
          />
          <Route
            path="/usuarios/cadastro-usuarios"
            element={
              <ERPLayout>
                <CadastroUsuarios />
              </ERPLayout>
            }
          />
          <Route
            path="/empresas"
            element={
              <ERPLayout>
                <Empresas />
              </ERPLayout>
            }
          />
          <Route
            path="/empresas/cadastro-empresas"
            element={
              <ERPLayout>
                <CadastroEmpresas />
              </ERPLayout>
            }
          />
          <Route
            path="/items/cadastro-items"
            element={
              <ERPLayout>
                <CadastroItems />
              </ERPLayout>
            }
          />
          <Route
            path="/items"
            element={
              <ERPLayout>
                <Items />
              </ERPLayout>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
