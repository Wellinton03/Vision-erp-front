import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ERPLayout } from "@/components/layout/ERPLayout";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { ThemeProvider } from "@/components/ThemeProvider";
import Login from "@/pages/Auth/Login";
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
import Relatorios from "./pages/relatorios/Relatorios";
import Configuracoes from "./pages/Configuracoes";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <ERPLayout>
                    <Dashboard />
                  </ERPLayout>
                </ProtectedRoute>
              }
            />
          <Route
            path="/eventos"
            element={
              <ProtectedRoute>
                <ERPLayout>
                  <Eventos />
                </ERPLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/eventos/cadastro-eventos"
            element={
              <ProtectedRoute>
                <ERPLayout>
                  <CadastroEventos />
                </ERPLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/usuarios"
            element={
              <ProtectedRoute>
                <ERPLayout>
                  <Usuarios />
                </ERPLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/usuarios/cadastro-usuarios"
            element={
              <ProtectedRoute>
                <ERPLayout>
                  <CadastroUsuarios />
                </ERPLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/empresas"
            element={
              <ProtectedRoute>
                <ERPLayout>
                  <Empresas />
                </ERPLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/empresas/cadastro-empresas"
            element={
              <ProtectedRoute>
                <ERPLayout>
                  <CadastroEmpresas />
                </ERPLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/items/cadastro-items"
            element={
              <ProtectedRoute>
                <ERPLayout>
                  <CadastroItems />
                </ERPLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/items"
            element={
              <ProtectedRoute>
                <ERPLayout>
                  <Items />
                </ERPLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/relatorios"
            element={
              <ProtectedRoute>
                <ERPLayout>
                  <Relatorios />
                </ERPLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/configuracoes"
            element={
              <ProtectedRoute>
                <ERPLayout>
                  <Configuracoes />
                </ERPLayout>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
          </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
