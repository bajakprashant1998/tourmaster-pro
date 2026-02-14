import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Search, Camera, MapPin, Edit, Trash2, MoreHorizontal, Star, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useAdminThingsToDo, type ThingToDo } from "@/hooks/useAdminInventory";

export default function ThingsToDo() {
  const { data: activities, isLoading, create, update, remove } = useAdminThingsToDo();
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<ThingToDo | null>(null);
  const [form, setForm] = useState({ name: "", location: "", category: "Sightseeing", rating: 0, price: 0, status: "active", is_featured: false, image: "" });

  const filtered = activities.filter(a => a.name.toLowerCase().includes(search.toLowerCase()));
  const stats = {
    total: activities.length,
    featured: activities.filter(a => a.is_featured).length,
    categories: new Set(activities.map(a => a.category)).size,
    locations: new Set(activities.map(a => a.location)).size,
  };

  const openCreate = () => { setEditing(null); setForm({ name: "", location: "", category: "Sightseeing", rating: 0, price: 0, status: "active", is_featured: false, image: "" }); setDialogOpen(true); };
  const openEdit = (a: ThingToDo) => { setEditing(a); setForm({ name: a.name, location: a.location, category: a.category, rating: a.rating, price: a.price, status: a.status, is_featured: a.is_featured, image: a.image || "" }); setDialogOpen(true); };
  const handleSave = () => {
    const payload = { ...form, price: Number(form.price), rating: Number(form.rating), image: form.image || null };
    if (editing) update({ id: editing.id, ...payload }); else create(payload);
    setDialogOpen(false);
  };

  return (
    <AdminLayout title="Things To Do" breadcrumb={["Dashboard", "Things To Do"]}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="admin-card p-5"><div className="flex items-center gap-4"><div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center"><Camera className="w-6 h-6 text-primary" /></div><div><p className="text-sm text-muted-foreground">Total Activities</p><p className="text-2xl font-bold">{stats.total}</p></div></div></div>
          <div className="admin-card p-5"><div className="flex items-center gap-4"><div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center"><Star className="w-6 h-6 text-amber-500" /></div><div><p className="text-sm text-muted-foreground">Featured</p><p className="text-2xl font-bold">{stats.featured}</p></div></div></div>
          <div className="admin-card p-5"><div className="flex items-center gap-4"><div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center"><Tag className="w-6 h-6 text-emerald-500" /></div><div><p className="text-sm text-muted-foreground">Categories</p><p className="text-2xl font-bold">{stats.categories}</p></div></div></div>
          <div className="admin-card p-5"><div className="flex items-center gap-4"><div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center"><MapPin className="w-6 h-6 text-blue-500" /></div><div><p className="text-sm text-muted-foreground">Locations</p><p className="text-2xl font-bold">{stats.locations}</p></div></div></div>
        </div>

        <div className="admin-card p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search activities..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <Button className="w-full md:w-auto" onClick={openCreate}><Plus className="w-4 h-4 mr-2" />Add Activity</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? <p className="text-muted-foreground col-span-3 p-6">Loading…</p> : filtered.map(activity => (
            <div key={activity.id} className="admin-card overflow-hidden group">
              <div className="h-48 bg-muted relative overflow-hidden">
                <img src={activity.image || "/placeholder.svg"} alt={activity.name} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                {activity.is_featured && <Badge className="absolute top-3 left-3 bg-amber-500"><Star className="w-3 h-3 mr-1" />Featured</Badge>}
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2"><Badge variant="outline">{activity.category}</Badge></div>
                <h3 className="font-semibold text-lg mb-2">{activity.name}</h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{activity.location}</span>
                  <span className="flex items-center gap-1"><Star className="w-4 h-4 fill-amber-400 text-amber-400" />{activity.rating}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary">{activity.price === 0 ? "Free" : `$${activity.price}`}</span>
                  <DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="w-4 h-4" /></Button></DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openEdit(activity)}><Edit className="w-4 h-4 mr-2" /> Edit</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive" onClick={() => remove(activity.id)}><Trash2 className="w-4 h-4 mr-2" /> Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent><DialogHeader><DialogTitle>{editing ? "Edit Activity" : "Add Activity"}</DialogTitle></DialogHeader>
          <div className="grid gap-4 py-2">
            <div><Label>Name</Label><Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Location</Label><Input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} /></div>
              <div><Label>Category</Label><Input value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Rating</Label><Input type="number" min={0} max={5} step={0.1} value={form.rating} onChange={e => setForm(f => ({ ...f, rating: +e.target.value }))} /></div>
              <div><Label>Price (0 = Free)</Label><Input type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: +e.target.value }))} /></div>
            </div>
            <div><Label>Image URL</Label><Input value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Status</Label>
                <Select value={form.status} onValueChange={v => setForm(f => ({ ...f, status: v }))}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="active">Active</SelectItem><SelectItem value="draft">Draft</SelectItem></SelectContent></Select>
              </div>
              <div className="flex items-center gap-2 pt-6"><Switch checked={form.is_featured} onCheckedChange={v => setForm(f => ({ ...f, is_featured: v }))} /><Label>Featured</Label></div>
            </div>
          </div>
          <DialogFooter><Button onClick={handleSave}>{editing ? "Update" : "Create"}</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
