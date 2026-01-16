import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Image, Grid, List, Upload, Trash2, Download, FolderOpen, MoreHorizontal, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

const images = [
  { id: 1, name: "dubai-skyline.jpg", size: "2.4 MB", date: "2026-01-15", folder: "Dubai", url: "/placeholder.svg" },
  { id: 2, name: "desert-safari.jpg", size: "1.8 MB", date: "2026-01-14", folder: "Tours", url: "/placeholder.svg" },
  { id: 3, name: "burj-khalifa.jpg", size: "3.2 MB", date: "2026-01-13", folder: "Dubai", url: "/placeholder.svg" },
  { id: 4, name: "abu-dhabi-mosque.jpg", size: "2.1 MB", date: "2026-01-12", folder: "Abu Dhabi", url: "/placeholder.svg" },
  { id: 5, name: "palm-jumeirah.jpg", size: "2.8 MB", date: "2026-01-11", folder: "Dubai", url: "/placeholder.svg" },
  { id: 6, name: "ferrari-world.jpg", size: "1.9 MB", date: "2026-01-10", folder: "Abu Dhabi", url: "/placeholder.svg" },
  { id: 7, name: "dhow-cruise.jpg", size: "1.5 MB", date: "2026-01-09", folder: "Tours", url: "/placeholder.svg" },
  { id: 8, name: "marina-yacht.jpg", size: "2.6 MB", date: "2026-01-08", folder: "Dubai", url: "/placeholder.svg" },
];

const folders = [
  { name: "Dubai", count: 45 },
  { name: "Abu Dhabi", count: 32 },
  { name: "Tours", count: 28 },
  { name: "Hotels", count: 56 },
  { name: "Banners", count: 12 },
];

export default function Gallery() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedImages, setSelectedImages] = useState<number[]>([]);

  const toggleSelect = (id: number) => {
    setSelectedImages(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <AdminLayout title="Gallery" breadcrumb={["Dashboard", "Gallery"]}>
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="admin-card p-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Image className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Images</p>
                <p className="text-2xl font-bold">1,234</p>
              </div>
            </div>
          </div>
          <div className="admin-card p-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <FolderOpen className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Folders</p>
                <p className="text-2xl font-bold">24</p>
              </div>
            </div>
          </div>
          <div className="admin-card p-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <Upload className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold">89</p>
              </div>
            </div>
          </div>
          <div className="admin-card p-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <Download className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Storage Used</p>
                <p className="text-2xl font-bold">12.4 GB</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Folders Sidebar */}
          <div className="admin-card p-4">
            <h3 className="font-semibold mb-4">Folders</h3>
            <ul className="space-y-2">
              <li>
                <button className="w-full flex items-center justify-between px-3 py-2 rounded-md bg-primary/10 text-primary">
                  <span className="flex items-center gap-2">
                    <FolderOpen className="w-4 h-4" />
                    All Images
                  </span>
                  <span className="text-sm">1,234</span>
                </button>
              </li>
              {folders.map((folder) => (
                <li key={folder.name}>
                  <button className="w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-muted transition-colors">
                    <span className="flex items-center gap-2">
                      <FolderOpen className="w-4 h-4" />
                      {folder.name}
                    </span>
                    <span className="text-sm text-muted-foreground">{folder.count}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-4">
            {/* Toolbar */}
            <div className="admin-card p-4">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <div className="relative flex-1 md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input placeholder="Search images..." className="pl-9" />
                  </div>
                  <div className="flex items-center border rounded-md">
                    <Button 
                      variant={viewMode === "grid" ? "secondary" : "ghost"} 
                      size="icon"
                      onClick={() => setViewMode("grid")}
                    >
                      <Grid className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant={viewMode === "list" ? "secondary" : "ghost"} 
                      size="icon"
                      onClick={() => setViewMode("list")}
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto">
                  {selectedImages.length > 0 && (
                    <Button variant="destructive" size="sm">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete ({selectedImages.length})
                    </Button>
                  )}
                  <Button className="w-full md:w-auto">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload
                  </Button>
                </div>
              </div>
            </div>

            {/* Images Grid */}
            <div className={viewMode === "grid" ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" : "space-y-2"}>
              {images.map((image) => (
                viewMode === "grid" ? (
                  <div key={image.id} className="admin-card overflow-hidden group relative">
                    <div className="absolute top-2 left-2 z-10">
                      <Checkbox 
                        checked={selectedImages.includes(image.id)}
                        onCheckedChange={() => toggleSelect(image.id)}
                        className="bg-white/80"
                      />
                    </div>
                    <div className="aspect-square bg-muted relative overflow-hidden">
                      <img src={image.url} alt={image.name} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Button size="icon" variant="secondary">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="secondary">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-medium truncate">{image.name}</p>
                      <p className="text-xs text-muted-foreground">{image.size}</p>
                    </div>
                  </div>
                ) : (
                  <div key={image.id} className="admin-card p-3 flex items-center gap-4">
                    <Checkbox 
                      checked={selectedImages.includes(image.id)}
                      onCheckedChange={() => toggleSelect(image.id)}
                    />
                    <div className="w-12 h-12 rounded bg-muted overflow-hidden flex-shrink-0">
                      <img src={image.url} alt={image.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{image.name}</p>
                      <p className="text-sm text-muted-foreground">{image.folder}</p>
                    </div>
                    <div className="text-sm text-muted-foreground hidden md:block">{image.size}</div>
                    <div className="text-sm text-muted-foreground hidden md:block">{image.date}</div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem><Eye className="w-4 h-4 mr-2" /> View</DropdownMenuItem>
                        <DropdownMenuItem><Download className="w-4 h-4 mr-2" /> Download</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive"><Trash2 className="w-4 h-4 mr-2" /> Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
