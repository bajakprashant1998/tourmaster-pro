import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Plane, FileCheck, Clock, XCircle, Edit, Trash2, Eye, MoreHorizontal, User, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

const visaTypes = [
  { id: 1, name: "UAE Tourist Visa", duration: "30 Days", price: "$120", processing: "3-5 days", status: "Active" },
  { id: 2, name: "UAE Transit Visa", duration: "96 Hours", price: "$45", processing: "24 hours", status: "Active" },
  { id: 3, name: "UAE Business Visa", duration: "90 Days", price: "$350", processing: "5-7 days", status: "Active" },
  { id: 4, name: "UAE Multiple Entry", duration: "60 Days", price: "$450", processing: "5-7 days", status: "Draft" },
];

const applications = [
  { id: 1, applicant: "John Smith", type: "Tourist Visa", destination: "UAE", date: "2026-01-15", status: "Approved" },
  { id: 2, applicant: "Emily Davis", type: "Business Visa", destination: "UAE", date: "2026-01-14", status: "Processing" },
  { id: 3, applicant: "Robert Wilson", type: "Transit Visa", destination: "UAE", date: "2026-01-13", status: "Pending" },
  { id: 4, applicant: "Sarah Miller", type: "Tourist Visa", destination: "UAE", date: "2026-01-12", status: "Rejected" },
];

export default function Visa() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Approved": return <Badge className="bg-emerald-500"><CheckCircle className="w-3 h-3 mr-1" /> Approved</Badge>;
      case "Processing": return <Badge className="bg-blue-500"><Clock className="w-3 h-3 mr-1" /> Processing</Badge>;
      case "Pending": return <Badge className="bg-amber-500"><Clock className="w-3 h-3 mr-1" /> Pending</Badge>;
      case "Rejected": return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" /> Rejected</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  return (
    <AdminLayout title="Visa Services" breadcrumb={["Dashboard", "Visa"]}>
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="admin-card p-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Plane className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Visa Types</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </div>
          <div className="admin-card p-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <FileCheck className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Applications</p>
                <p className="text-2xl font-bold">1,456</p>
              </div>
            </div>
          </div>
          <div className="admin-card p-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">89</p>
              </div>
            </div>
          </div>
          <div className="admin-card p-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Approved</p>
                <p className="text-2xl font-bold">1,234</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="types" className="space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <TabsList>
              <TabsTrigger value="types">Visa Types</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
            </TabsList>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Visa Type
            </Button>
          </div>

          <TabsContent value="types" className="space-y-4">
            <div className="admin-card p-4">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search visa types..." className="pl-9" />
              </div>
            </div>

            <div className="admin-card">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Visa Type</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Processing Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {visaTypes.map((visa) => (
                    <TableRow key={visa.id}>
                      <TableCell className="font-medium">{visa.name}</TableCell>
                      <TableCell>{visa.duration}</TableCell>
                      <TableCell className="font-semibold">{visa.price}</TableCell>
                      <TableCell>{visa.processing}</TableCell>
                      <TableCell>
                        <Badge variant={visa.status === "Active" ? "default" : "secondary"}>
                          {visa.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem><Eye className="w-4 h-4 mr-2" /> View</DropdownMenuItem>
                            <DropdownMenuItem><Edit className="w-4 h-4 mr-2" /> Edit</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive"><Trash2 className="w-4 h-4 mr-2" /> Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="applications" className="space-y-4">
            <div className="admin-card p-4">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search applications..." className="pl-9" />
              </div>
            </div>

            <div className="admin-card">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Applicant</TableHead>
                    <TableHead>Visa Type</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications.map((app) => (
                    <TableRow key={app.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="w-4 h-4 text-primary" />
                          </div>
                          {app.applicant}
                        </div>
                      </TableCell>
                      <TableCell>{app.type}</TableCell>
                      <TableCell>{app.destination}</TableCell>
                      <TableCell>{app.date}</TableCell>
                      <TableCell>{getStatusBadge(app.status)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem><Eye className="w-4 h-4 mr-2" /> View Details</DropdownMenuItem>
                            <DropdownMenuItem><CheckCircle className="w-4 h-4 mr-2" /> Approve</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive"><XCircle className="w-4 h-4 mr-2" /> Reject</DropdownMenuItem>
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
    </AdminLayout>
  );
}
