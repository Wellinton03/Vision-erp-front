import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ERPSidebar } from "./ERPSidebar";
import { Bell, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ERPLayoutProps {
  children: React.ReactNode;
}

export function ERPLayout({ children }: ERPLayoutProps) {
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

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="hover:bg-muted/60">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-muted/60">
                <User className="h-5 w-5" />
              </Button>
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