import { Briefcase, Users, UserCheck, Plus, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { KPICard } from "@/components/dashboard/KPICard";
import { ApplicantsChart } from "@/components/dashboard/ApplicantsChart";
import { StatusPieChart } from "@/components/dashboard/StatusPieChart";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your recruitment pipeline
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link to="/jobs">
              <Plus className="h-4 w-4 mr-2" />
              Create Job
            </Link>
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <KPICard
          title="Total Jobs"
          value={12}
          change="+2 this month"
          changeType="positive"
          icon={Briefcase}
          iconColor="bg-primary/10 text-primary"
        />
        <KPICard
          title="Total Applicants"
          value={145}
          change="+23 this week"
          changeType="positive"
          icon={Users}
          iconColor="bg-accent/10 text-accent"
        />
        <KPICard
          title="Shortlisted"
          value={18}
          change="12.4% of total"
          changeType="neutral"
          icon={UserCheck}
          iconColor="bg-success/10 text-success"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ApplicantsChart />
        <StatusPieChart />
      </div>
    </div>
  );
}
