import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ERPLayout } from "@/components/layout/ERPLayout";
import Dashboard from "@/pages/Dashboard";
import Clientes from "@/pages/Clientes";
import Lancamentos from "@/pages/Lancamentos";
import CadastroUsuarios from "@/pages/CadastroUsuarios";
import CadastroEmpresas from "@/pages/CadastroEmpresas";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <ERPLayout>
              <Dashboard />
            </ERPLayout>
          } />
          <Route path="/clientes" element={
            <ERPLayout>
              <Clientes />
            </ERPLayout>
          } />
          <Route path="/lancamentos" element={
            <ERPLayout>
              <Lancamentos />
            </ERPLayout>
          } />
          <Route path="/usuarios" element={
            <ERPLayout>
              <CadastroUsuarios />
            </ERPLayout>
          } />
          <Route path="/empresas" element={
            <ERPLayout>
              <CadastroEmpresas />
            </ERPLayout>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
