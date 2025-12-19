import { useState } from "react";
import { Mail, Bell, Eye } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    applicantEmails: true,
    hrNotifications: true,
    statusChangeEmails: false,
    weeklyDigest: true,
  });
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    setting: keyof typeof settings;
    newValue: boolean;
  } | null>(null);

  const handleToggle = (setting: keyof typeof settings, value: boolean) => {
    if (setting === "applicantEmails" || setting === "hrNotifications") {
      setConfirmDialog({ open: true, setting, newValue: value });
    } else {
      updateSetting(setting, value);
    }
  };

  const updateSetting = (setting: keyof typeof settings, value: boolean) => {
    setSettings({ ...settings, [setting]: value });
    toast({
      title: "Settings Updated",
      description: "Your notification preferences have been saved.",
    });
  };

  const confirmChange = () => {
    if (confirmDialog) {
      updateSetting(confirmDialog.setting, confirmDialog.newValue);
      setConfirmDialog(null);
    }
  };

  const emailTemplates = [
    {
      name: "Application Received",
      description: "Sent to applicants when their application is submitted",
      preview: `Dear {{applicant_name}},\n\nThank you for applying to {{job_title}} at Mini ATS. We have received your application and will review it shortly.\n\nBest regards,\nThe HR Team`,
    },
    {
      name: "Interview Invitation",
      description: "Sent when an applicant is invited for an interview",
      preview: `Dear {{applicant_name}},\n\nCongratulations! We would like to invite you for an interview for the {{job_title}} position.\n\nPlease reply to schedule a convenient time.\n\nBest regards,\nThe HR Team`,
    },
    {
      name: "Application Status Update",
      description: "Sent when an applicant's status changes",
      preview: `Dear {{applicant_name}},\n\nWe wanted to update you on the status of your application for {{job_title}}.\n\nYour current status: {{status}}\n\nBest regards,\nThe HR Team`,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Configure notifications and email templates
        </p>
      </div>

      <Tabs defaultValue="notifications" className="space-y-6">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="templates">Email Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                Email Notifications
              </CardTitle>
              <CardDescription>
                Configure which email notifications are sent to applicants
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="applicantEmails" className="font-medium">
                    Enable Applicant Emails
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Send automated emails to applicants about their application status
                  </p>
                </div>
                <Switch
                  id="applicantEmails"
                  checked={settings.applicantEmails}
                  onCheckedChange={(value) => handleToggle("applicantEmails", value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="statusChangeEmails" className="font-medium">
                    Status Change Notifications
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Notify applicants when their status is updated
                  </p>
                </div>
                <Switch
                  id="statusChangeEmails"
                  checked={settings.statusChangeEmails}
                  onCheckedChange={(value) => handleToggle("statusChangeEmails", value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-accent" />
                HR Notifications
              </CardTitle>
              <CardDescription>
                Configure notifications for HR team members
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="hrNotifications" className="font-medium">
                    Enable HR Notifications
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications about new applications and status changes
                  </p>
                </div>
                <Switch
                  id="hrNotifications"
                  checked={settings.hrNotifications}
                  onCheckedChange={(value) => handleToggle("hrNotifications", value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="weeklyDigest" className="font-medium">
                    Weekly Digest
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receive a weekly summary of recruitment activity
                  </p>
                </div>
                <Switch
                  id="weeklyDigest"
                  checked={settings.weeklyDigest}
                  onCheckedChange={(value) => handleToggle("weeklyDigest", value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          {emailTemplates.map((template, index) => (
            <Card key={index} className="animate-slide-up">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">{template.name}</CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted/50 p-4 rounded-lg text-sm text-muted-foreground whitespace-pre-wrap font-mono">
                  {template.preview}
                </pre>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDialog?.open ?? false}
        onOpenChange={(open) => !open && setConfirmDialog(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Change</DialogTitle>
            <DialogDescription>
              Are you sure you want to{" "}
              {confirmDialog?.newValue ? "enable" : "disable"} this setting? This
              will affect how notifications are sent.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDialog(null)}>
              Cancel
            </Button>
            <Button onClick={confirmChange}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
