import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Search, Hotel as HotelIcon, Star, Edit, Trash2, Eye, MoreHorizontal, MapPin } from "lucide-react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { useAdminHotels, type Hotel } from "@/hooks/useAdminInventory";

export default function Hotels() {
  const { data: hotels, isLoading, create, update, remove } = useAdminHotels();
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Hotel | null>(null);
  const [form, setForm] = useState({ name: "", location: "", rating: 3, rooms: 0, price: 0, status: "active", image: "" });

  const filtered = hotels.filter(h => h.name.toLowerCase().includes(search.toLowerCase()));

  const stats = {
    total: hotels.length,
    fiveStar: hotels.filter(h => h.rating === 5).length,
    active: hotels.filter(h => h.status === "active").length,
    locations: new Set(hotels.map(h => h.location)).size,
  };

  const openCreate = () => { setEditing(null); setForm({ name: "", location: "", rating: 3, rooms: 0, price: 0, status: "active", image: "" }); setDialogOpen(true); };
  const openEdit = (h: Hotel) => { setEditing(h); setForm({ name: h.name, location: h.location, rating: h.rating, rooms: h.rooms, price: h.price, status: h.status, image: h.image || "" }); setDialogOpen(true); };
  const handleSave = () => {
    const payload = { ...form, price: Number(form.price), rooms: Number(form.rooms), rating: Number(form.rating), image: form.image || null };
    if (editing) update({ id: editing.id, ...payload }); else create(payload);
    setDialogOpen(false);
  };

  return (
    <AdminLayout title="Hotels" breadcrumb={["Dashboard", "Hotels"]}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="admin-card p-5"><div className="flex items-center gap-4"><div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center"><HotelIcon className="w-6 h-6 text-primary" /></div><div><p className="text-sm text-muted-foreground">Total Hotels</p><p className="text-2xl font-bold">{stats.total}</p></div></div></div>
          <div className="admin-card p-5"><div className="flex items-center gap-4"><div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center"><Star className="w-6 h-6 text-amber-500" /></div><div><p className="text-sm text-muted-foreground">5-Star Hotels</p><p className="text-2xl font-bold">{stats.fiveStar}</p></div></div></div>
          <div className="admin-card p-5"><div className="flex items-center gap-4"><div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center"><Eye className="w-6 h-6 text-emerald-500" /></div><div><p className="text-sm text-muted-foreground">Active</p><p className="text-2xl font-bold">{stats.active}</p></div></div></div>
          <div className="admin-card p-5"><div className="flex items-center gap-4"><div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center"><MapPin className="w-6 h-6 text-blue-500" /></div><div><p className="text-sm text-muted-foreground">Locations</p><p className="text-2xl font-bold">{stats.locations}</p></div></div></div>
        </div>

        <div className="admin-card p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search hotels..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <Button className="w-full md:w-auto" onClick={openCreate}><Plus className="w-4 h-4 mr-2" />Add Hotel</Button>
          </div>
        </div>

        <div className="admin-card">
          {isLoading ? <p className="p-6 text-muted-foreground">Loading…</p> : (
            <Table>
              <TableHeader><TableRow>
                <TableHead>Hotel Name</TableHead><TableHead>Location</TableHead><TableHead>Rating</TableHead><TableHead>Rooms</TableHead><TableHead>Price/Night</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead>
              </TableRow></TableHeader>
              <TableBody>
                {filtered.map(h => (
                  <TableRow key={h.id}>
                    <TableCell className="font-medium">{h.name}</TableCell>
                    <TableCell>{h.location}</TableCell>
                    <TableCell><div className="flex items-center gap-1">{Array.from({ length: h.rating }).map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}</div></TableCell>
                    <TableCell>{h.rooms}</TableCell>
                    <TableCell className="font-semibold">${h.price}</TableCell>
                    <TableCell><Badge variant={h.status === "active" ? "default" : "secondary"}>{h.status}</Badge></TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="w-4 h-4" /></Button></DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openEdit(h)}><Edit className="w-4 h-4 mr-2" /> Edit</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive" onClick={() => remove(h.id)}><Trash2 className="w-4 h-4 mr-2" /> Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent><DialogHeader><DialogTitle>{editing ? "Edit Hotel" : "Add Hotel"}</DialogTitle></DialogHeader>
          <div className="grid gap-4 py-2">
            <div><Label>Name</Label><Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></div>
            <div><Label>Location</Label><Input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} /></div>
            <div className="grid grid-cols-3 gap-3">
              <div><Label>Rating</Label><Input type="number" min={1} max={5} value={form.rating} onChange={e => setForm(f => ({ ...f, rating: +e.target.value }))} /></div>
              <div><Label>Rooms</Label><Input type="number" value={form.rooms} onChange={e => setForm(f => ({ ...f, rooms: +e.target.value }))} /></div>
              <div><Label>Price/Night</Label><Input type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: +e.target.value }))} /></div>
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
