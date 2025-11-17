import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ERPSidebar } from "./ERPSidebar";
import { Bell, Search, User, LogOut, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

interface ERPLayoutProps {
  children: React.ReactNode;
}

export function ERPLayout({ children }: ERPLayoutProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <ERPSidebar />
        
        <main className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 shadow-sm">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Buscar..." 
                  className="pl-10 w-80 bg-muted/30 border-muted hover:border-primary/30 focus:border-primary"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Empresa Atual */}
              <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-lg border border-primary/20">
                <Building2 className="h-4 w-4 text-primary" />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-foreground">{user?.empresa.nome}</span>
                  <span className="text-xs text-muted-foreground">{user?.empresa.cnpj}</span>
                </div>
              </div>

              <Button variant="ghost" size="icon" className="hover:bg-muted/60">
                <Bell className="h-5 w-5" />
              </Button>

              {/* User Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hover:bg-muted/60">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{user?.nome}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                      <Badge variant={user?.role === 'owner' ? 'default' : 'secondary'} className="w-fit mt-1">
                        {user?.role === 'owner' ? 'Proprietário' : 'Usuário'}
                      </Badge>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sair</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Content Area */}
          <div className="flex-1 p-6 bg-gradient-surface">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}