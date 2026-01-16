import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, MapPin, Edit, Trash2, Eye, MoreHorizontal } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";

const locations = [
  { id: 1, name: "Dubai", country: "UAE", tours: 45, status: "Active", image: "/placeholder.svg" },
  { id: 2, name: "Abu Dhabi", country: "UAE", tours: 32, status: "Active", image: "/placeholder.svg" },
  { id: 3, name: "Sharjah", country: "UAE", tours: 18, status: "Active", image: "/placeholder.svg" },
  { id: 4, name: "Ras Al Khaimah", country: "UAE", tours: 12, status: "Draft", image: "/placeholder.svg" },
  { id: 5, name: "Fujairah", country: "UAE", tours: 8, status: "Active", image: "/placeholder.svg" },
];

export default function Locations() {
  return (
    <AdminLayout title="Locations" breadcrumb={["Dashboard", "Locations"]}>
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="admin-card p-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Locations</p>
                <p className="text-2xl font-bold">24</p>
              </div>
            </div>
          </div>
          <div className="admin-card p-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <Eye className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl font-bold">20</p>
              </div>
            </div>
          </div>
          <div className="admin-card p-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <Edit className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Draft</p>
                <p className="text-2xl font-bold">4</p>
              </div>
            </div>
          </div>
          <div className="admin-card p-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Countries</p>
                <p className="text-2xl font-bold">5</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters & Actions */}
        <div className="admin-card p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search locations..." className="pl-9" />
              </div>
            </div>
            <Button className="w-full md:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Add Location
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="admin-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Tours</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {locations.map((location) => (
                <TableRow key={location.id}>
                  <TableCell>
                    <div className="w-12 h-12 rounded-lg bg-muted overflow-hidden">
                      <img src={location.image} alt={location.name} className="w-full h-full object-cover" />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{location.name}</TableCell>
                  <TableCell>{location.country}</TableCell>
                  <TableCell>{location.tours} tours</TableCell>
                  <TableCell>
                    <Badge variant={location.status === "Active" ? "default" : "secondary"}>
                      {location.status}
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
      </div>
    </AdminLayout>
  );
}
