import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Umbrella, Calendar, Edit, Trash2, Eye, MoreHorizontal, Users, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const holidays = [
  { id: 1, name: "Dubai Desert Safari Experience", duration: "3 Days", price: "$599", bookings: 234, status: "Active", image: "/placeholder.svg" },
  { id: 2, name: "Abu Dhabi City Tour Package", duration: "2 Days", price: "$399", bookings: 156, status: "Active", image: "/placeholder.svg" },
  { id: 3, name: "Luxury Maldives Getaway", duration: "5 Days", price: "$2,499", bookings: 89, status: "Active", image: "/placeholder.svg" },
  { id: 4, name: "Thailand Adventure Package", duration: "7 Days", price: "$1,299", bookings: 178, status: "Draft", image: "/placeholder.svg" },
  { id: 5, name: "Egypt Pyramids Tour", duration: "4 Days", price: "$899", bookings: 67, status: "Active", image: "/placeholder.svg" },
  { id: 6, name: "Bali Wellness Retreat", duration: "6 Days", price: "$1,599", bookings: 112, status: "Active", image: "/placeholder.svg" },
];

export default function Holidays() {
  return (
    <AdminLayout title="Holidays" breadcrumb={["Dashboard", "Holidays"]}>
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="admin-card p-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Umbrella className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Packages</p>
                <p className="text-2xl font-bold">48</p>
              </div>
            </div>
          </div>
          <div className="admin-card p-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Bookings</p>
                <p className="text-2xl font-bold">1,234</p>
              </div>
            </div>
          </div>
          <div className="admin-card p-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Revenue</p>
                <p className="text-2xl font-bold">$485K</p>
              </div>
            </div>
          </div>
          <div className="admin-card p-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold">89</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters & Actions */}
        <div className="admin-card p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search holiday packages..." className="pl-9" />
            </div>
            <Button className="w-full md:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Add Holiday Package
            </Button>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {holidays.map((holiday) => (
            <div key={holiday.id} className="admin-card overflow-hidden group">
              <div className="h-48 bg-muted relative overflow-hidden">
                <img src={holiday.image} alt={holiday.name} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                <Badge className="absolute top-3 right-3" variant={holiday.status === "Active" ? "default" : "secondary"}>
                  {holiday.status}
                </Badge>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-lg mb-2 line-clamp-1">{holiday.name}</h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {holiday.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {holiday.bookings} bookings
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary">{holiday.price}</span>
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
