import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, FileImage, Edit, Trash2, Eye, MoreHorizontal, Globe, ExternalLink, GripVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
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

const iconPages = [
  { id: 1, title: "Dubai Desert Safari", icon: "🏜️", url: "/tours/desert-safari", order: 1, visible: true },
  { id: 2, title: "Abu Dhabi City Tour", icon: "🕌", url: "/tours/abu-dhabi", order: 2, visible: true },
  { id: 3, title: "Burj Khalifa", icon: "🏙️", url: "/tours/burj-khalifa", order: 3, visible: true },
  { id: 4, title: "Dhow Cruise", icon: "🚢", url: "/tours/dhow-cruise", order: 4, visible: true },
  { id: 5, title: "Ferrari World", icon: "🏎️", url: "/tours/ferrari-world", order: 5, visible: false },
  { id: 6, title: "Palm Jumeirah", icon: "🌴", url: "/tours/palm-jumeirah", order: 6, visible: true },
  { id: 7, title: "Dubai Mall", icon: "🛍️", url: "/tours/dubai-mall", order: 7, visible: true },
  { id: 8, title: "Miracle Garden", icon: "🌺", url: "/tours/miracle-garden", order: 8, visible: false },
];

export default function IconPages() {
  return (
    <AdminLayout title="Icon Pages" breadcrumb={["Dashboard", "Icon Pages"]}>
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="admin-card p-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileImage className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Icon Pages</p>
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
                <p className="text-sm text-muted-foreground">Visible</p>
                <p className="text-2xl font-bold">18</p>
              </div>
            </div>
          </div>
          <div className="admin-card p-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <Globe className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Homepage Icons</p>
                <p className="text-2xl font-bold">8</p>
              </div>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="admin-card p-4 border-l-4 border-primary">
          <p className="text-sm text-muted-foreground">
            <strong>Tip:</strong> Icon pages are displayed on the homepage as quick navigation links. Drag to reorder, toggle visibility, and customize icons and URLs.
          </p>
        </div>

        {/* Filters & Actions */}
        <div className="admin-card p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search icon pages..." className="pl-9" />
            </div>
            <Button className="w-full md:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Add Icon Page
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="admin-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead className="w-16">Order</TableHead>
                <TableHead className="w-16">Icon</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>URL</TableHead>
                <TableHead className="w-24">Visible</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {iconPages.map((page) => (
                <TableRow key={page.id}>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="cursor-grab">
                      <GripVertical className="w-4 h-4 text-muted-foreground" />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{page.order}</Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-2xl">{page.icon}</span>
                  </TableCell>
                  <TableCell className="font-medium">{page.title}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <code className="px-2 py-1 bg-muted rounded">{page.url}</code>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Switch checked={page.visible} />
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem><Eye className="w-4 h-4 mr-2" /> Preview</DropdownMenuItem>
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
