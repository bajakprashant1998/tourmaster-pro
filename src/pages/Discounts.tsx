import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Percent, Calendar, Edit, Trash2, Eye, MoreHorizontal, Tag, Copy, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
import { Progress } from "@/components/ui/progress";

const discounts = [
  { id: 1, code: "SUMMER2026", type: "Percentage", value: "20%", minOrder: "$100", used: 234, limit: 500, expires: "2026-03-31", status: "Active" },
  { id: 2, code: "NEWUSER50", type: "Fixed", value: "$50", minOrder: "$200", used: 89, limit: 200, expires: "2026-12-31", status: "Active" },
  { id: 3, code: "FLASH30", type: "Percentage", value: "30%", minOrder: "$150", used: 45, limit: 100, expires: "2026-01-31", status: "Active" },
  { id: 4, code: "WINTER25", type: "Percentage", value: "25%", minOrder: "$50", used: 500, limit: 500, expires: "2026-01-15", status: "Expired" },
  { id: 5, code: "VIP100", type: "Fixed", value: "$100", minOrder: "$500", used: 12, limit: 50, expires: "2026-06-30", status: "Active" },
];

export default function Discounts() {
  return (
    <AdminLayout title="Discounts" breadcrumb={["Dashboard", "Discounts"]}>
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="admin-card p-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Tag className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Coupons</p>
                <p className="text-2xl font-bold">24</p>
              </div>
            </div>
          </div>
          <div className="admin-card p-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Times Used</p>
                <p className="text-2xl font-bold">12,456</p>
              </div>
            </div>
          </div>
          <div className="admin-card p-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Percent className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg. Discount</p>
                <p className="text-2xl font-bold">22%</p>
              </div>
            </div>
          </div>
          <div className="admin-card p-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Expiring Soon</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters & Actions */}
        <div className="admin-card p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search discount codes..." className="pl-9" />
            </div>
            <Button className="w-full md:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Create Discount
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="admin-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Min. Order</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Expires</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {discounts.map((discount) => (
                <TableRow key={discount.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <code className="px-2 py-1 bg-muted rounded text-sm font-mono">{discount.code}</code>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{discount.type}</Badge>
                  </TableCell>
                  <TableCell className="font-semibold text-primary">{discount.value}</TableCell>
                  <TableCell>{discount.minOrder}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span>{discount.used}/{discount.limit}</span>
                        <span className="text-muted-foreground">{Math.round((discount.used / discount.limit) * 100)}%</span>
                      </div>
                      <Progress value={(discount.used / discount.limit) * 100} className="h-1.5" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      {discount.expires}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={discount.status === "Active" ? "default" : "secondary"}>
                      {discount.status}
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
                        <DropdownMenuItem><Copy className="w-4 h-4 mr-2" /> Duplicate</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive"><Trash2 className="w-4 h-4 mr-2" /> Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
}
