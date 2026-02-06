import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { MailSummarizer } from "@/components/mail/MailSummarizer";
import { AttendanceDashboard } from "@/pages/AttendancePrediction";
import { AcademicDashboard } from "@/components/academic/AcademicDashboard";
import { MessMenu } from "@/components/mess/MessMenu";
import { StudentExchange } from "@/components/exchange/StudentExchange";
import { ExplorerGuide } from "@/components/explorer/ExplorerGuide";
import { EmergencyPage } from "@/components/emergency/EmergencyPage";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardOverview onNavigate={setActiveSection} />;
      case "attendance":
        return <AttendanceDashboard />;
      case "mail":
        return <MailSummarizer />;
      case "academic":
        return <AcademicDashboard />;
      case "mess":
        return <MessMenu />;
      case "exchange":
        return <StudentExchange />;
      case "explorer":
        return <ExplorerGuide />;
      case "emergency":
        return <EmergencyPage />;
      default:
        return <DashboardOverview onNavigate={setActiveSection} />;
    }
  };

  return (
    <DashboardLayout
      activeSection={activeSection}
      onSectionChange={setActiveSection}
    >
      {renderSection()}
    </DashboardLayout>
  );
};

export default Index;
