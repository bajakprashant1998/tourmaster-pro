import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Car, Fuel, Settings, Edit, Trash2, Eye, MoreHorizontal, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const cars = [
  { id: 1, name: "Mercedes S-Class", type: "Luxury", seats: 4, fuel: "Petrol", price: "$299/day", status: "Available", image: "/placeholder.svg" },
  { id: 2, name: "BMW 7 Series", type: "Luxury", seats: 4, fuel: "Petrol", price: "$275/day", status: "Available", image: "/placeholder.svg" },
  { id: 3, name: "Toyota Land Cruiser", type: "SUV", seats: 7, fuel: "Diesel", price: "$189/day", status: "Rented", image: "/placeholder.svg" },
  { id: 4, name: "Range Rover Sport", type: "SUV", seats: 5, fuel: "Petrol", price: "$249/day", status: "Available", image: "/placeholder.svg" },
  { id: 5, name: "Rolls Royce Ghost", type: "Ultra Luxury", seats: 4, fuel: "Petrol", price: "$799/day", status: "Available", image: "/placeholder.svg" },
  { id: 6, name: "Lamborghini Urus", type: "Sports SUV", seats: 4, fuel: "Petrol", price: "$599/day", status: "Maintenance", image: "/placeholder.svg" },
];

export default function RentCars() {
  return (
    <AdminLayout title="Rent Cars" breadcrumb={["Dashboard", "Rent Cars"]}>
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="admin-card p-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Car className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Cars</p>
                <p className="text-2xl font-bold">86</p>
              </div>
            </div>
          </div>
          <div className="admin-card p-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <Eye className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Available</p>
                <p className="text-2xl font-bold">62</p>
              </div>
            </div>
          </div>
          <div className="admin-card p-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Rented</p>
                <p className="text-2xl font-bold">20</p>
              </div>
            </div>
          </div>
          <div className="admin-card p-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center">
                <Settings className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Maintenance</p>
                <p className="text-2xl font-bold">4</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters & Actions */}
        <div className="admin-card p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search cars..." className="pl-9" />
              </div>
              <Select>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="luxury">Luxury</SelectItem>
                  <SelectItem value="suv">SUV</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                  <SelectItem value="economy">Economy</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="rented">Rented</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full md:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Add Car
            </Button>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <div key={car.id} className="admin-card overflow-hidden group">
              <div className="h-48 bg-muted relative overflow-hidden">
                <img src={car.image} alt={car.name} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                <Badge 
                  className="absolute top-3 right-3" 
                  variant={car.status === "Available" ? "default" : car.status === "Rented" ? "secondary" : "destructive"}
                >
                  {car.status}
                </Badge>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-lg mb-1">{car.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{car.type}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {car.seats} seats
                  </span>
                  <span className="flex items-center gap-1">
                    <Fuel className="w-4 h-4" />
                    {car.fuel}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary">{car.price}</span>
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
