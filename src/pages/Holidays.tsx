import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Search, Umbrella, Calendar, Edit, Trash2, MoreHorizontal, Users, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useAdminHolidays, type Holiday } from "@/hooks/useAdminInventory";

export default function Holidays() {
  const { data: holidays, isLoading, create, update, remove } = useAdminHolidays();
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Holiday | null>(null);
  const [form, setForm] = useState({ name: "", duration: "", price: 0, status: "active", image: "" });

  const filtered = holidays.filter(h => h.name.toLowerCase().includes(search.toLowerCase()));
  const stats = {
    total: holidays.length,
    totalBookings: holidays.reduce((s, h) => s + h.bookings, 0),
    revenue: holidays.reduce((s, h) => s + h.price * h.bookings, 0),
    active: holidays.filter(h => h.status === "active").length,
  };

  const openCreate = () => { setEditing(null); setForm({ name: "", duration: "", price: 0, status: "active", image: "" }); setDialogOpen(true); };
  const openEdit = (h: Holiday) => { setEditing(h); setForm({ name: h.name, duration: h.duration, price: h.price, status: h.status, image: h.image || "" }); setDialogOpen(true); };
  const handleSave = () => {
    const payload = { ...form, price: Number(form.price), image: form.image || null };
    if (editing) update({ id: editing.id, ...payload }); else create(payload);
    setDialogOpen(false);
  };

  return (
    <AdminLayout title="Holidays" breadcrumb={["Dashboard", "Holidays"]}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="admin-card p-5"><div className="flex items-center gap-4"><div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center"><Umbrella className="w-6 h-6 text-primary" /></div><div><p className="text-sm text-muted-foreground">Total Packages</p><p className="text-2xl font-bold">{stats.total}</p></div></div></div>
          <div className="admin-card p-5"><div className="flex items-center gap-4"><div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center"><Users className="w-6 h-6 text-emerald-500" /></div><div><p className="text-sm text-muted-foreground">Total Bookings</p><p className="text-2xl font-bold">{stats.totalBookings.toLocaleString()}</p></div></div></div>
          <div className="admin-card p-5"><div className="flex items-center gap-4"><div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center"><DollarSign className="w-6 h-6 text-blue-500" /></div><div><p className="text-sm text-muted-foreground">Revenue</p><p className="text-2xl font-bold">${(stats.revenue / 1000).toFixed(0)}K</p></div></div></div>
          <div className="admin-card p-5"><div className="flex items-center gap-4"><div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center"><Calendar className="w-6 h-6 text-amber-500" /></div><div><p className="text-sm text-muted-foreground">Active</p><p className="text-2xl font-bold">{stats.active}</p></div></div></div>
        </div>

        <div className="admin-card p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search holiday packages..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <Button className="w-full md:w-auto" onClick={openCreate}><Plus className="w-4 h-4 mr-2" />Add Holiday Package</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? <p className="text-muted-foreground col-span-3 p-6">Loading…</p> : filtered.map(holiday => (
            <div key={holiday.id} className="admin-card overflow-hidden group">
              <div className="h-48 bg-muted relative overflow-hidden">
                <img src={holiday.image || "/placeholder.svg"} alt={holiday.name} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                <Badge className="absolute top-3 right-3" variant={holiday.status === "active" ? "default" : "secondary"}>{holiday.status}</Badge>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-lg mb-2 line-clamp-1">{holiday.name}</h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{holiday.duration}</span>
                  <span className="flex items-center gap-1"><Users className="w-4 h-4" />{holiday.bookings} bookings</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary">${holiday.price}</span>
                  <DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="w-4 h-4" /></Button></DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openEdit(holiday)}><Edit className="w-4 h-4 mr-2" /> Edit</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive" onClick={() => remove(holiday.id)}><Trash2 className="w-4 h-4 mr-2" /> Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent><DialogHeader><DialogTitle>{editing ? "Edit Holiday Package" : "Add Holiday Package"}</DialogTitle></DialogHeader>
          <div className="grid gap-4 py-2">
            <div><Label>Name</Label><Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Duration</Label><Input placeholder="e.g. 3 Days" value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} /></div>
              <div><Label>Price</Label><Input type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: +e.target.value }))} /></div>
            </div>
            <div><Label>Image URL</Label><Input value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} /></div>
            <div><Label>Status</Label>
              <Select value={form.status} onValueChange={v => setForm(f => ({ ...f, status: v }))}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="active">Active</SelectItem><SelectItem value="draft">Draft</SelectItem></SelectContent></Select>
            </div>
          </div>
          <DialogFooter><Button onClick={handleSave}>{editing ? "Update" : "Create"}</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
