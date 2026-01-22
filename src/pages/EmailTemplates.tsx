import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Mail,
  Edit,
  Eye,
  MoreHorizontal,
  Copy,
  Send,
  CheckCircle,
  XCircle,
  Clock,
  Bell,
  Calendar,
  User,
  DollarSign,
  MapPin,
  Plus,
  Code,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

interface EmailTemplate {
  id: string;
  name: string;
  type: "confirmation" | "cancellation" | "reminder" | "payment" | "custom";
  subject: string;
  body: string;
  isActive: boolean;
  lastModified: Date;
  triggerEvent: string;
}

const initialTemplates: EmailTemplate[] = [
  {
    id: "1",
    name: "Booking Confirmation",
    type: "confirmation",
    subject: "Your booking {{booking_ref}} is confirmed!",
    body: `Dear {{customer_name}},

Thank you for booking with us! Your reservation has been confirmed.

**Booking Details:**
- Reference: {{booking_ref}}
- Tour: {{tour_name}}
- Date: {{tour_date}}
- Guests: {{guest_count}}
- Total Amount: {{total_amount}}

**Meeting Point:**
{{meeting_point}}

Please arrive 15 minutes before the scheduled time.

If you have any questions, feel free to contact us.

Best regards,
The TourMaster Pro Team`,
    isActive: true,
    lastModified: new Date(2026, 0, 15),
    triggerEvent: "Booking status changed to Confirmed",
  },
  {
    id: "2",
    name: "Booking Cancellation",
    type: "cancellation",
    subject: "Booking {{booking_ref}} has been cancelled",
    body: `Dear {{customer_name}},

We're sorry to inform you that your booking has been cancelled.

**Cancelled Booking:**
- Reference: {{booking_ref}}
- Tour: {{tour_name}}
- Original Date: {{tour_date}}

{{#if refund_amount}}
A refund of {{refund_amount}} will be processed to your original payment method within 5-7 business days.
{{/if}}

If you didn't request this cancellation or have any questions, please contact us immediately.

Best regards,
The TourMaster Pro Team`,
    isActive: true,
    lastModified: new Date(2026, 0, 14),
    triggerEvent: "Booking status changed to Cancelled",
  },
  {
    id: "3",
    name: "24-Hour Reminder",
    type: "reminder",
    subject: "Reminder: Your tour is tomorrow! 🎉",
    body: `Dear {{customer_name}},

This is a friendly reminder that your tour is scheduled for tomorrow!

**Tour Details:**
- Reference: {{booking_ref}}
- Tour: {{tour_name}}
- Date: {{tour_date}}
- Time: {{tour_time}}
- Guests: {{guest_count}}

**Meeting Point:**
{{meeting_point}}

**What to Bring:**
- Comfortable shoes
- Sunscreen and sunglasses
- Camera
- Valid ID

We're excited to see you!

Best regards,
The TourMaster Pro Team`,
    isActive: true,
    lastModified: new Date(2026, 0, 13),
    triggerEvent: "24 hours before tour date",
  },
  {
    id: "4",
    name: "Payment Received",
    type: "payment",
    subject: "Payment received for booking {{booking_ref}}",
    body: `Dear {{customer_name}},

We've received your payment. Thank you!

**Payment Details:**
- Booking Reference: {{booking_ref}}
- Amount Paid: {{payment_amount}}
- Payment Method: {{payment_method}}
- Transaction ID: {{transaction_id}}

**Booking Summary:**
- Tour: {{tour_name}}
- Date: {{tour_date}}
- Guests: {{guest_count}}
- Total Amount: {{total_amount}}
- Balance Due: {{balance_due}}

Thank you for choosing us!

Best regards,
The TourMaster Pro Team`,
    isActive: true,
    lastModified: new Date(2026, 0, 12),
    triggerEvent: "Payment received",
  },
  {
    id: "5",
    name: "7-Day Reminder",
    type: "reminder",
    subject: "Your tour is coming up next week!",
    body: `Dear {{customer_name}},

Just a reminder that your tour is scheduled for next week!

**Tour Details:**
- Reference: {{booking_ref}}
- Tour: {{tour_name}}
- Date: {{tour_date}}
- Guests: {{guest_count}}

Need to make changes? Please contact us at least 48 hours before your scheduled tour.

Best regards,
The TourMaster Pro Team`,
    isActive: false,
    lastModified: new Date(2026, 0, 10),
    triggerEvent: "7 days before tour date",
  },
];

const availableVariables = [
  { name: "customer_name", description: "Customer's full name", icon: User },
  { name: "customer_email", description: "Customer's email address", icon: Mail },
  { name: "booking_ref", description: "Booking reference number", icon: Code },
  { name: "tour_name", description: "Name of the tour", icon: MapPin },
  { name: "tour_date", description: "Scheduled tour date", icon: Calendar },
  { name: "tour_time", description: "Scheduled tour time", icon: Clock },
  { name: "guest_count", description: "Number of guests", icon: User },
  { name: "total_amount", description: "Total booking amount", icon: DollarSign },
  { name: "payment_amount", description: "Amount paid", icon: DollarSign },
  { name: "balance_due", description: "Remaining balance", icon: DollarSign },
  { name: "payment_method", description: "Payment method used", icon: DollarSign },
  { name: "transaction_id", description: "Payment transaction ID", icon: Code },
  { name: "refund_amount", description: "Refund amount (if applicable)", icon: DollarSign },
  { name: "meeting_point", description: "Tour meeting location", icon: MapPin },
];

const EmailTemplates = () => {
  const [templates, setTemplates] = useState<EmailTemplate[]>(initialTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    subject: "",
    body: "",
    isActive: true,
  });

  const getTypeBadge = (type: EmailTemplate["type"]) => {
    const styles = {
      confirmation: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      cancellation: "bg-red-500/10 text-red-500 border-red-500/20",
      reminder: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      payment: "bg-amber-500/10 text-amber-500 border-amber-500/20",
      custom: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    };
    const icons = {
      confirmation: <CheckCircle className="w-3 h-3" />,
      cancellation: <XCircle className="w-3 h-3" />,
      reminder: <Bell className="w-3 h-3" />,
      payment: <DollarSign className="w-3 h-3" />,
      custom: <Sparkles className="w-3 h-3" />,
    };
    return (
      <Badge variant="outline" className={`${styles[type]} flex items-center gap-1`}>
        {icons[type]}
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </Badge>
    );
  };

  const handleEdit = (template: EmailTemplate) => {
    setSelectedTemplate(template);
    setEditForm({
      name: template.name,
      subject: template.subject,
      body: template.body,
      isActive: template.isActive,
    });
    setEditDialogOpen(true);
  };

  const handlePreview = (template: EmailTemplate) => {
    setSelectedTemplate(template);
    setPreviewDialogOpen(true);
  };

  const handleSave = () => {
    if (!selectedTemplate) return;

    setTemplates(templates.map(t => 
      t.id === selectedTemplate.id 
        ? { 
            ...t, 
            ...editForm, 
            lastModified: new Date() 
          } 
        : t
    ));
    setEditDialogOpen(false);
    toast.success("Template saved successfully!");
  };

  const handleToggleActive = (templateId: string) => {
    setTemplates(templates.map(t =>
      t.id === templateId ? { ...t, isActive: !t.isActive } : t
    ));
    toast.success("Template status updated!");
  };

  const handleDuplicate = (template: EmailTemplate) => {
    const newTemplate: EmailTemplate = {
      ...template,
      id: String(templates.length + 1),
      name: `${template.name} (Copy)`,
      lastModified: new Date(),
    };
    setTemplates([...templates, newTemplate]);
    toast.success("Template duplicated!");
  };

  const handleSendTest = (template: EmailTemplate) => {
    toast.success(`Test email sent for "${template.name}"`);
  };

  const insertVariable = (variableName: string) => {
    const variable = `{{${variableName}}}`;
    setEditForm(prev => ({
      ...prev,
      body: prev.body + variable,
    }));
  };

  const renderPreviewContent = (content: string) => {
    const sampleData: Record<string, string> = {
      customer_name: "John Smith",
      customer_email: "john@example.com",
      booking_ref: "BV-2026-001",
      tour_name: "Desert Safari Adventure",
      tour_date: "January 25, 2026",
      tour_time: "4:00 PM",
      guest_count: "4",
      total_amount: "$800",
      payment_amount: "$400",
      balance_due: "$400",
      payment_method: "Credit Card",
      transaction_id: "TXN-123456",
      refund_amount: "$800",
      meeting_point: "Dubai Marina Mall, Ground Floor Entrance",
    };

    let rendered = content;
    Object.entries(sampleData).forEach(([key, value]) => {
      rendered = rendered.replace(new RegExp(`{{${key}}}`, 'g'), value);
    });
    // Remove conditional blocks for preview
    rendered = rendered.replace(/{{#if.*?}}([\s\S]*?){{\/if}}/g, '$1');
    return rendered;
  };

  const stats = {
    total: templates.length,
    active: templates.filter(t => t.isActive).length,
    confirmation: templates.filter(t => t.type === "confirmation").length,
    reminder: templates.filter(t => t.type === "reminder").length,
  };

  return (
    <AdminLayout title="Email Templates" breadcrumb={["Settings", "Email Templates"]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Email Templates</h1>
            <p className="text-muted-foreground">
              Customize notification emails sent to customers
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Create Template
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="admin-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Templates</p>
                  <p className="text-xl font-bold">{stats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="admin-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active</p>
                  <p className="text-xl font-bold">{stats.active}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="admin-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Bell className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Reminders</p>
                  <p className="text-xl font-bold">{stats.reminder}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="admin-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-500/10">
                  <Calendar className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Confirmations</p>
                  <p className="text-xl font-bold">{stats.confirmation}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Templates Table */}
        <Card className="admin-card">
          <CardHeader>
            <CardTitle>Email Templates</CardTitle>
            <CardDescription>
              Manage and customize your notification email templates
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Template Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Trigger</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Modified</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {templates.map((template) => (
                  <TableRow key={template.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{template.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getTypeBadge(template.type)}</TableCell>
                    <TableCell className="max-w-[200px] truncate text-sm text-muted-foreground">
                      {template.subject}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {template.triggerEvent}
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={template.isActive}
                        onCheckedChange={() => handleToggleActive(template.id)}
                      />
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {template.lastModified.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(template)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Template
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handlePreview(template)}>
                            <Eye className="w-4 h-4 mr-2" />
                            Preview
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleSendTest(template)}>
                            <Send className="w-4 h-4 mr-2" />
                            Send Test Email
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDuplicate(template)}>
                            <Copy className="w-4 h-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Available Variables Reference */}
        <Card className="admin-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="w-5 h-5" />
              Available Variables
            </CardTitle>
            <CardDescription>
              Use these variables in your templates. They will be replaced with actual data when emails are sent.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {availableVariables.map((variable) => (
                <div
                  key={variable.name}
                  className="flex items-center gap-2 p-3 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <variable.icon className="w-4 h-4 text-muted-foreground shrink-0" />
                  <div className="min-w-0">
                    <code className="text-xs font-mono text-primary block truncate">
                      {`{{${variable.name}}}`}
                    </code>
                    <p className="text-xs text-muted-foreground truncate">
                      {variable.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Email Template</DialogTitle>
              <DialogDescription>
                Customize the email content and settings
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="content" className="mt-4">
              <TabsList>
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="variables">Variables</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="templateName">Template Name</Label>
                  <Input
                    id="templateName"
                    value={editForm.name}
                    onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter template name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Email Subject</Label>
                  <Input
                    id="subject"
                    value={editForm.subject}
                    onChange={(e) => setEditForm(prev => ({ ...prev, subject: e.target.value }))}
                    placeholder="Enter email subject"
                  />
                  <p className="text-xs text-muted-foreground">
                    You can use variables like {"{{booking_ref}}"} in the subject line
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="body">Email Body</Label>
                  <Textarea
                    id="body"
                    value={editForm.body}
                    onChange={(e) => setEditForm(prev => ({ ...prev, body: e.target.value }))}
                    placeholder="Enter email content..."
                    className="min-h-[300px] font-mono text-sm"
                  />
                  <p className="text-xs text-muted-foreground">
                    Supports Markdown formatting. Use **bold** and *italic* for emphasis.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="variables" className="mt-4">
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Click on a variable to insert it at the end of the email body.
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {availableVariables.map((variable) => (
                      <Button
                        key={variable.name}
                        variant="outline"
                        className="justify-start gap-2 h-auto py-3"
                        onClick={() => insertVariable(variable.name)}
                      >
                        <variable.icon className="w-4 h-4 text-muted-foreground" />
                        <div className="text-left">
                          <code className="text-xs font-mono text-primary block">
                            {`{{${variable.name}}}`}
                          </code>
                          <p className="text-xs text-muted-foreground">
                            {variable.description}
                          </p>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="settings" className="mt-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <p className="font-medium">Active Status</p>
                      <p className="text-sm text-muted-foreground">
                        Enable or disable this email template
                      </p>
                    </div>
                    <Switch
                      checked={editForm.isActive}
                      onCheckedChange={(checked) => setEditForm(prev => ({ ...prev, isActive: checked }))}
                    />
                  </div>

                  {selectedTemplate && (
                    <div className="p-4 rounded-lg border bg-muted/30">
                      <p className="text-sm font-medium mb-1">Trigger Event</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedTemplate.triggerEvent}
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>

            <DialogFooter className="mt-6">
              <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Preview Dialog */}
        <Dialog open={previewDialogOpen} onOpenChange={setPreviewDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Email Preview</DialogTitle>
              <DialogDescription>
                Preview how the email will look with sample data
              </DialogDescription>
            </DialogHeader>

            {selectedTemplate && (
              <div className="mt-4 space-y-4">
                <div className="p-4 rounded-lg border bg-muted/30">
                  <p className="text-xs text-muted-foreground mb-1">Subject</p>
                  <p className="font-medium">
                    {renderPreviewContent(selectedTemplate.subject)}
                  </p>
                </div>

                <div className="p-6 rounded-lg border bg-white">
                  <pre className="whitespace-pre-wrap text-sm font-sans leading-relaxed">
                    {renderPreviewContent(selectedTemplate.body)}
                  </pre>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleSendTest(selectedTemplate)}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Test Email
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setPreviewDialogOpen(false);
                      handleEdit(selectedTemplate);
                    }}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default EmailTemplates;
