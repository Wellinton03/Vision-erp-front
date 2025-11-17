import { NavLink, useLocation } from "react-router-dom";
import {
  BarChart3,
  Users,
  Package,
  ShoppingCart,
  FileText,
  Settings,
  CreditCard,
  TrendingUp,
  Building2,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: BarChart3,
    group: "principal",
  },
  {
    title: "Eventos",
    url: "/eventos",
    icon: FileText,
    group: "principal",
  },

  {
    title: "Produtos",
    url: "/items",
    icon: Package,
    group: "vendas",
  },
  {
    title: "Relatórios",
    url: "/relatorios",
    icon: TrendingUp,
    group: "vendas",
  },
  {
    title: "Financeiro",
    url: "/financeiro",
    icon: CreditCard,
    group: "gestao",
  },
  {
    title: "Empresas",
    url: "/empresas",
    icon: Building2,
    group: "gestao",
  },
  {
    title: "Usuários",
    url: "/usuarios",
    icon: Users,
    group: "gestao",
  },
  {
    title: "Configurações",
    url: "/configuracoes",
    icon: Settings,
    group: "sistema",
  },
];

const groupLabels = {
  principal: "Principal",
  vendas: "Vendas & Produtos",
  gestao: "Gestão",
  sistema: "Sistema",
};

export function ERPSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;

  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "bg-primary text-primary-foreground hover:bg-primary/90"
      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground";

  const groupedItems = menuItems.reduce((acc, item) => {
    if (!acc[item.group]) acc[item.group] = [];
    acc[item.group].push(item);
    return acc;
  }, {} as Record<string, typeof menuItems>);

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarContent className="bg-sidebar">
        <div className="p-6 border-b border-sidebar-accent">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              <h1 className="font-bold text-lg text-sidebar-foreground">
                VISION ERP
              </h1>
            </div>
          )}
        </div>

        {Object.entries(groupedItems).map(([groupKey, items]) => (
          <SidebarGroup key={groupKey} className="px-4">
            {!collapsed && (
              <SidebarGroupLabel className="text-sidebar-foreground/60 font-medium text-xs uppercase tracking-wider">
                {groupLabels[groupKey as keyof typeof groupLabels]}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        end={item.url === "/"}
                        className={getNavClass}
                      >
                        <item.icon className="h-5 w-5 flex-shrink-0" />
                        {!collapsed && (
                          <span className="font-medium">{item.title}</span>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
