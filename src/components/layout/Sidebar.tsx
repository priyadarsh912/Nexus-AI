import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Mail, 
  GraduationCap, 
  UtensilsCrossed, 
  ArrowLeftRight, 
  MapPin, 
  Stethoscope,
  X,
  Sparkles,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "attendance", label: "Attendance Predictor", icon: TrendingUp },
  { id: "mail", label: "AI Mail Summarizer", icon: Mail, badge: "AI" },
  { id: "academic", label: "Academic Intelligence", icon: GraduationCap },
  { id: "mess", label: "Mess Menu", icon: UtensilsCrossed },
  { id: "exchange", label: "Student Exchange", icon: ArrowLeftRight },
  { id: "explorer", label: "Explorer's Guide", icon: MapPin },
  { id: "emergency", label: "Medical Emergency", icon: Stethoscope, emergency: true },
];

export function Sidebar({ isOpen, onClose, activeSection, onSectionChange }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-72 bg-sidebar border-r border-sidebar-border transition-transform duration-300 lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border lg:hidden">
          <div className="flex items-center gap-2">
            <img src="/nexus_logo.svg" alt="NEXUS" className="h-10 w-10" />
            <span className="text-xl font-bold text-gradient">NEXUS</span>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Nav items */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onSectionChange(item.id);
                onClose();
              }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 group",
                activeSection === item.id
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
                  : "text-sidebar-foreground hover:bg-sidebar-accent",
                item.emergency && activeSection !== item.id && "text-destructive hover:bg-destructive/10"
              )}
            >
              <item.icon className={cn(
                "h-5 w-5 transition-transform duration-200 group-hover:scale-110",
                item.emergency && activeSection !== item.id && "text-destructive"
              )} />
              <span className="font-medium flex-1">{item.label}</span>
              {item.badge && (
                <span className="ai-badge flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  {item.badge}
                </span>
              )}
              {item.emergency && activeSection !== item.id && (
                <span className="h-2 w-2 rounded-full bg-destructive animate-pulse" />
              )}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-sidebar-border">
          <div className="p-4 rounded-lg hero-gradient">
            <p className="text-sm font-medium mb-1">Need Help?</p>
            <p className="text-xs text-muted-foreground">Contact support for assistance</p>
          </div>
        </div>
      </aside>
    </>
  );
}
