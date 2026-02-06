import { useState } from "react";
// import { useNavigate } from "react-router-dom"; // REMOVE or COMMENT OUT if not used elsewhere
import { 
  Mail, 
  BookOpen, 
  Calendar, 
  Clock, 
  AlertCircle, 
  TrendingUp,
  Sparkles,
  ChevronRight,
  Bell
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface TimetableEntry {
  time: string;
  subject: string;
  room: string;
  type: "lecture" | "lab" | "tutorial";
  ongoing?: boolean;
}

interface QuickStat {
  label: string;
  value: string;
  change?: string;
  positive?: boolean;
  icon: React.ElementType;
}

const todayTimetable: TimetableEntry[] = [
  { time: "9:00 AM", subject: "Data Structures & Algorithms", room: "LH-101", type: "lecture" },
  { time: "10:00 AM", subject: "Digital Electronics", room: "LH-203", type: "lecture", ongoing: true },
  { time: "11:00 AM", subject: "Programming Practice", room: "Lab-05", type: "lab" },
  { time: "1:00 PM", subject: "Lunch Break", room: "—", type: "tutorial" },
  { time: "2:00 PM", subject: "Mathematics-II", room: "LH-101", type: "lecture" },
  { time: "3:00 PM", subject: "Communication Skills", room: "LH-305", type: "tutorial" },
];

const quickStats: QuickStat[] = [
  { label: "Attendance", value: "82.4%", change: "+2.1%", positive: true, icon: BookOpen },
  { label: "Current CGPA", value: "8.45", change: "Sem 1", positive: true, icon: TrendingUp },
  { label: "Unread Mails", value: "12", change: "3 urgent", positive: false, icon: Mail },
  { label: "Upcoming", value: "2", change: "deadlines", positive: false, icon: Calendar },
];

const recentNotifications = [
  { title: "Mid-term exam schedule released", type: "urgent", time: "2h ago" },
  { title: "Mess fee due by Feb 3", type: "warning", time: "5h ago" },
  { title: "TechnoVerse registrations open", type: "info", time: "1d ago" },
];

interface DashboardOverviewProps {
  onNavigate: (section: string) => void;
}

export function DashboardOverview({ onNavigate }: DashboardOverviewProps) {
  // const navigate = useNavigate();
  const getTypeColor = (type: string) => {
    switch (type) {
      case "lecture":
        return "bg-primary/10 text-primary";
      case "lab":
        return "bg-accent/10 text-accent";
      case "tutorial":
        return "bg-secondary/10 text-secondary";
      default:
        return "bg-muted";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl hero-gradient p-6 lg:p-8 border border-border">
        <div className="relative z-10">
          <p className="text-muted-foreground mb-1">Good morning,</p>
          <h1 className="text-2xl lg:text-3xl font-bold mb-2">Welcome back, Student! 👋</h1>
          <p className="text-muted-foreground max-w-xl">
            You have 3 classes today and 2 pending deadlines. Your attendance is looking good!
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <Card key={index} className="card-elevated interactive-card" onClick={() => {
            if (stat.label === "Attendance" || stat.label === "Current CGPA") onNavigate("academic");
            if (stat.label === "Unread Mails") onNavigate("mail");
          }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                  stat.positive ? "bg-success/10" : "bg-warning/10"
                }`}>
                  <stat.icon className={`h-5 w-5 ${stat.positive ? "text-success" : "text-warning"}`} />
                </div>
                {stat.change && (
                  <Badge variant="secondary" className="text-xs">
                    {stat.change}
                  </Badge>
                )}
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Timetable */}
        <Card className="card-elevated lg:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Today's Schedule
                </CardTitle>
                <CardDescription>
                  {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                </CardDescription>
              </div>
              <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todayTimetable.map((entry, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-4 p-3 rounded-lg transition-colors ${
                    entry.ongoing
                      ? "bg-primary/5 border border-primary/20"
                      : "hover:bg-muted/50"
                  }`}
                >
                  <div className="text-center min-w-16">
                    <p className={`font-semibold ${entry.ongoing ? "text-primary" : ""}`}>
                      {entry.time}
                    </p>
                    {entry.ongoing && (
                      <Badge className="badge-success text-[10px] mt-1">Now</Badge>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{entry.subject}</p>
                    <p className="text-sm text-muted-foreground">{entry.room}</p>
                  </div>
                  <Badge className={getTypeColor(entry.type)}>
                    {entry.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notifications & Quick Actions */}
        <div className="space-y-4">
          {/* Notifications */}
          <Card className="card-elevated">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Bell className="h-4 w-4 text-primary" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentNotifications.map((notif, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <div className={`h-2 w-2 rounded-full mt-2 ${
                    notif.type === "urgent" ? "bg-destructive" :
                    notif.type === "warning" ? "bg-warning" : "bg-primary"
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium line-clamp-1">{notif.title}</p>
                    <p className="text-xs text-muted-foreground">{notif.time}</p>
                  </div>
                </div>
              ))}
              <Button variant="ghost" size="sm" className="w-full">
                View all notifications
              </Button>
            </CardContent>
          </Card>

          {/* AI Summary CTA */}
          <Card 
            className="card-elevated interactive-card cursor-pointer border-primary/20"
            onClick={() => onNavigate("mail")}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg btn-gradient flex items-center justify-center">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">AI Mail Summarizer</p>
                  <p className="text-xs text-muted-foreground">12 new emails to summarize</p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          {/* Attendance Alert */}
          <Card className="card-elevated border-warning/20">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center">
                  <AlertCircle className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <p className="font-medium text-sm">Attendance Alert</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Mathematics-II is at 77.78%. Attend next 2 classes to stay above 75%.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Attendance Predictor Entry */}
          <Card 
            className="card-elevated interactive-card cursor-pointer border-indigo-500/20"
            onClick={() => onNavigate("attendance")}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-indigo-500" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Attendance Predictor</p>
                  <p className="text-xs text-muted-foreground">Forecast your attendance & plan leaves</p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
