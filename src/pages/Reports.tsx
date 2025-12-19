import { useState } from "react";
import { Download, Calendar, UserCheck, UserX, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "recruiter" | "hiring_manager";
  status: "active" | "inactive";
  lastActive: string;
}

const users: User[] = [
  {
    id: "1",
    name: "Jane Doe",
    email: "jane@company.com",
    role: "admin",
    status: "active",
    lastActive: "2024-01-20",
  },
  {
    id: "2",
    name: "John Smith",
    email: "john@company.com",
    role: "recruiter",
    status: "active",
    lastActive: "2024-01-19",
  },
  {
    id: "3",
    name: "Emily Brown",
    email: "emily@company.com",
    role: "hiring_manager",
    status: "active",
    lastActive: "2024-01-18",
  },
  {
    id: "4",
    name: "Michael Lee",
    email: "michael@company.com",
    role: "recruiter",
    status: "inactive",
    lastActive: "2024-01-10",
  },
];

export default function Reports() {
  const [userList, setUserList] = useState<User[]>(users);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  const handleToggleStatus = (id: string) => {
    setUserList(
      userList.map((user) =>
        user.id === id
          ? { ...user, status: user.status === "active" ? "inactive" : "active" }
          : user
      )
    );
  };

  const getRoleBadge = (role: User["role"]) => {
    const variants = {
      admin: "bg-primary/10 text-primary border-primary/20",
      recruiter: "bg-accent/10 text-accent border-accent/20",
      hiring_manager: "bg-warning/10 text-warning border-warning/20",
    };
    const labels = {
      admin: "Admin",
      recruiter: "Recruiter",
      hiring_manager: "Hiring Manager",
    };
    return (
      <Badge variant="outline" className={variants[role]}>
        {labels[role]}
      </Badge>
    );
  };

  const getStatusBadge = (status: User["status"]) => {
    return status === "active" ? (
      <Badge variant="outline" className="bg-success/10 text-success border-success/20">
        Active
      </Badge>
    ) : (
      <Badge variant="outline" className="bg-muted text-muted-foreground border-border">
        Inactive
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Reports & Users</h1>
        <p className="text-muted-foreground">
          Generate reports and manage system users
        </p>
      </div>

      <Tabs defaultValue="reports" className="space-y-6">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-6">
          <div className="bg-card rounded-xl border border-border p-6 animate-slide-up">
            <h3 className="text-lg font-semibold mb-4">Generate Report</h3>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="date"
                    className="pl-10"
                    value={dateRange.start}
                    onChange={(e) =>
                      setDateRange({ ...dateRange, start: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="date"
                    className="pl-10"
                    value={dateRange.end}
                    onChange={(e) =>
                      setDateRange({ ...dateRange, end: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Report Type</Label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Data</SelectItem>
                    <SelectItem value="applicants">Applicants Only</SelectItem>
                    <SelectItem value="jobs">Jobs Only</SelectItem>
                    <SelectItem value="hires">Hires Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end gap-2">
                <Button className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  CSV
                </Button>
                <Button variant="outline" className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  PDF
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-6 animate-slide-up">
            <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold">45</p>
                <p className="text-xs text-muted-foreground">New Applications</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold text-success">12</p>
                <p className="text-xs text-muted-foreground">Shortlisted</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold text-destructive">8</p>
                <p className="text-xs text-muted-foreground">Rejected</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Average</p>
                <p className="text-2xl font-bold text-primary">5.2</p>
                <p className="text-xs text-muted-foreground">Days to Hire</p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <div className="bg-card rounded-xl border border-border overflow-hidden animate-slide-up">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userList.map((user) => (
                  <TableRow key={user.id} className="hover:bg-muted/30">
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {user.email}
                    </TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {user.lastActive}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleToggleStatus(user.id)}
                          >
                            {user.status === "active" ? (
                              <>
                                <UserX className="h-4 w-4 mr-2" />
                                Deactivate
                              </>
                            ) : (
                              <>
                                <UserCheck className="h-4 w-4 mr-2" />
                                Activate
                              </>
                            )}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
