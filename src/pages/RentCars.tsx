import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Search, Car, Fuel, Settings, Edit, Trash2, Eye, MoreHorizontal, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useAdminRentCars, type RentCar } from "@/hooks/useAdminInventory";

export default function RentCars() {
  const { data: cars, isLoading, create, update, remove } = useAdminRentCars();
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<RentCar | null>(null);
  const [form, setForm] = useState({ name: "", type: "Luxury", seats: 4, fuel: "Petrol", price: 0, status: "available", image: "" });

  const filtered = cars.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
  const stats = {
    total: cars.length,
    available: cars.filter(c => c.status === "available").length,
    rented: cars.filter(c => c.status === "rented").length,
    maintenance: cars.filter(c => c.status === "maintenance").length,
  };

  const openCreate = () => { setEditing(null); setForm({ name: "", type: "Luxury", seats: 4, fuel: "Petrol", price: 0, status: "available", image: "" }); setDialogOpen(true); };
  const openEdit = (c: RentCar) => { setEditing(c); setForm({ name: c.name, type: c.type, seats: c.seats, fuel: c.fuel, price: c.price, status: c.status, image: c.image || "" }); setDialogOpen(true); };
  const handleSave = () => {
    const payload = { ...form, price: Number(form.price), seats: Number(form.seats), image: form.image || null };
    if (editing) update({ id: editing.id, ...payload }); else create(payload);
    setDialogOpen(false);
  };

  return (
    <AdminLayout title="Rent Cars" breadcrumb={["Dashboard", "Rent Cars"]}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="admin-card p-5"><div className="flex items-center gap-4"><div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center"><Car className="w-6 h-6 text-primary" /></div><div><p className="text-sm text-muted-foreground">Total Cars</p><p className="text-2xl font-bold">{stats.total}</p></div></div></div>
          <div className="admin-card p-5"><div className="flex items-center gap-4"><div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center"><Eye className="w-6 h-6 text-emerald-500" /></div><div><p className="text-sm text-muted-foreground">Available</p><p className="text-2xl font-bold">{stats.available}</p></div></div></div>
          <div className="admin-card p-5"><div className="flex items-center gap-4"><div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center"><Users className="w-6 h-6 text-amber-500" /></div><div><p className="text-sm text-muted-foreground">Rented</p><p className="text-2xl font-bold">{stats.rented}</p></div></div></div>
          <div className="admin-card p-5"><div className="flex items-center gap-4"><div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center"><Settings className="w-6 h-6 text-red-500" /></div><div><p className="text-sm text-muted-foreground">Maintenance</p><p className="text-2xl font-bold">{stats.maintenance}</p></div></div></div>
        </div>

        <div className="admin-card p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search cars..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <Button className="w-full md:w-auto" onClick={openCreate}><Plus className="w-4 h-4 mr-2" />Add Car</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? <p className="text-muted-foreground col-span-3 p-6">Loading…</p> : filtered.map(car => (
            <div key={car.id} className="admin-card overflow-hidden group">
              <div className="h-48 bg-muted relative overflow-hidden">
                <img src={car.image || "/placeholder.svg"} alt={car.name} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                <Badge className="absolute top-3 right-3" variant={car.status === "available" ? "default" : car.status === "rented" ? "secondary" : "destructive"}>{car.status}</Badge>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-lg mb-1">{car.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{car.type}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1"><Users className="w-4 h-4" />{car.seats} seats</span>
                  <span className="flex items-center gap-1"><Fuel className="w-4 h-4" />{car.fuel}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary">${car.price}/day</span>
                  <DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="w-4 h-4" /></Button></DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openEdit(car)}><Edit className="w-4 h-4 mr-2" /> Edit</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive" onClick={() => remove(car.id)}><Trash2 className="w-4 h-4 mr-2" /> Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent><DialogHeader><DialogTitle>{editing ? "Edit Car" : "Add Car"}</DialogTitle></DialogHeader>
          <div className="grid gap-4 py-2">
            <div><Label>Name</Label><Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Type</Label><Input value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} /></div>
              <div><Label>Fuel</Label><Input value={form.fuel} onChange={e => setForm(f => ({ ...f, fuel: e.target.value }))} /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Seats</Label><Input type="number" value={form.seats} onChange={e => setForm(f => ({ ...f, seats: +e.target.value }))} /></div>
              <div><Label>Price/Day</Label><Input type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: +e.target.value }))} /></div>
            </div>
            <div><Label>Image URL</Label><Input value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} /></div>
            <div><Label>Status</Label>
              <Select value={form.status} onValueChange={v => setForm(f => ({ ...f, status: v }))}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="available">Available</SelectItem><SelectItem value="rented">Rented</SelectItem><SelectItem value="maintenance">Maintenance</SelectItem></SelectContent></Select>
            </div>
          </div>
          <DialogFooter><Button onClick={handleSave}>{editing ? "Update" : "Create"}</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
