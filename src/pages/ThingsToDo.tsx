import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Camera, MapPin, Edit, Trash2, Eye, MoreHorizontal, Star, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const activities = [
  { id: 1, name: "Visit Burj Khalifa", location: "Dubai", category: "Sightseeing", rating: 4.9, price: "$65", status: "Featured", image: "/placeholder.svg" },
  { id: 2, name: "Dubai Mall Shopping", location: "Dubai", category: "Shopping", rating: 4.7, price: "Free", status: "Active", image: "/placeholder.svg" },
  { id: 3, name: "Palm Jumeirah Beach", location: "Dubai", category: "Beach", rating: 4.8, price: "Free", status: "Active", image: "/placeholder.svg" },
  { id: 4, name: "Ferrari World", location: "Abu Dhabi", category: "Theme Park", rating: 4.6, price: "$120", status: "Featured", image: "/placeholder.svg" },
  { id: 5, name: "Sheikh Zayed Mosque", location: "Abu Dhabi", category: "Cultural", rating: 4.9, price: "Free", status: "Active", image: "/placeholder.svg" },
  { id: 6, name: "Dubai Frame", location: "Dubai", category: "Sightseeing", rating: 4.5, price: "$15", status: "Active", image: "/placeholder.svg" },
];

export default function ThingsToDo() {
  return (
    <AdminLayout title="Things To Do" breadcrumb={["Dashboard", "Things To Do"]}>
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="admin-card p-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Camera className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Activities</p>
                <p className="text-2xl font-bold">248</p>
              </div>
            </div>
          </div>
          <div className="admin-card p-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <Star className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Featured</p>
                <p className="text-2xl font-bold">24</p>
              </div>
            </div>
          </div>
          <div className="admin-card p-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <Tag className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Categories</p>
                <p className="text-2xl font-bold">18</p>
              </div>
            </div>
          </div>
          <div className="admin-card p-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Locations</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters & Actions */}
        <div className="admin-card p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search activities..." className="pl-9" />
            </div>
            <Button className="w-full md:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Add Activity
            </Button>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity) => (
            <div key={activity.id} className="admin-card overflow-hidden group">
              <div className="h-48 bg-muted relative overflow-hidden">
                <img src={activity.image} alt={activity.name} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                {activity.status === "Featured" && (
                  <Badge className="absolute top-3 left-3 bg-amber-500">
                    <Star className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">{activity.category}</Badge>
                </div>
                <h3 className="font-semibold text-lg mb-2">{activity.name}</h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {activity.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    {activity.rating}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary">{activity.price}</span>
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
