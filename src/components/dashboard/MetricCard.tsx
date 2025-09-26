import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
    isPositive?: boolean;
  };
  variant?: "default" | "success" | "warning" | "primary";
  className?: string;
}

const variantStyles = {
  default: "border-border hover:shadow-md",
  success: "border-success/20 bg-success-light/30 hover:shadow-md hover:shadow-success/10",
  warning: "border-warning/20 bg-warning-light/30 hover:shadow-md hover:shadow-warning/10", 
  primary: "border-primary/20 bg-primary-light/30 hover:shadow-md hover:shadow-primary/10"
};

const iconStyles = {
  default: "text-primary bg-primary-light",
  success: "text-success bg-success-light",
  warning: "text-warning bg-warning-light",
  primary: "text-primary bg-primary-light"
};

export function MetricCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend, 
  variant = "default",
  className 
}: MetricCardProps) {
  return (
    <Card className={cn(
      "transition-all duration-200 hover:translate-y-[-2px]",
      variantStyles[variant],
      className
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <div className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center",
            iconStyles[variant]
          )}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-2">
          <p className="text-3xl font-bold text-card-foreground">{value}</p>
          
          <div className="flex items-center justify-between">
            {subtitle && (
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            )}
            
            {trend && (
              <div className="flex items-center gap-1">
                <span className={cn(
                  "text-sm font-medium",
                  trend.isPositive ? "text-success" : "text-destructive"
                )}>
                  {trend.isPositive ? "+" : ""}{trend.value}%
                </span>
                <span className="text-xs text-muted-foreground">{trend.label}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}