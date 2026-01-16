import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, Image, Layers, Star, Save, Plus, Trash2, GripVertical, Upload, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const heroSlides = [
  { id: 1, title: "Explore Dubai", subtitle: "Discover the city of wonders", image: "/placeholder.svg", active: true },
  { id: 2, title: "Abu Dhabi Adventures", subtitle: "Experience the capital", image: "/placeholder.svg", active: true },
  { id: 3, title: "Desert Safari", subtitle: "Unforgettable memories", image: "/placeholder.svg", active: false },
];

const featuredSections = [
  { id: 1, title: "Top Dubai Experiences", type: "tours", count: 8, visible: true },
  { id: 2, title: "Popular Activities", type: "activities", count: 6, visible: true },
  { id: 3, title: "Featured Hotels", type: "hotels", count: 4, visible: true },
  { id: 4, title: "Holiday Packages", type: "holidays", count: 6, visible: false },
];

export default function HomepageSettings() {
  return (
    <AdminLayout title="Homepage Settings" breadcrumb={["Dashboard", "Homepage Settings"]}>
      <div className="space-y-6">
        <Tabs defaultValue="hero" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="hero">Hero Section</TabsTrigger>
            <TabsTrigger value="sections">Sections</TabsTrigger>
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
          </TabsList>

          <TabsContent value="hero" className="space-y-6">
            <div className="admin-card p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Image className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Hero Slider</h3>
                    <p className="text-sm text-muted-foreground">Manage homepage hero banner slides</p>
                  </div>
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Slide
                </Button>
              </div>

              <div className="space-y-4">
                {heroSlides.map((slide) => (
                  <div key={slide.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <Button variant="ghost" size="icon" className="cursor-grab">
                      <GripVertical className="w-4 h-4 text-muted-foreground" />
                    </Button>
                    <div className="w-32 h-20 rounded bg-muted overflow-hidden flex-shrink-0">
                      <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <Input value={slide.title} placeholder="Slide Title" />
                      <Input value={slide.subtitle} placeholder="Subtitle" className="text-sm" />
                    </div>
                    <Switch checked={slide.active} />
                    <Badge variant={slide.active ? "default" : "secondary"}>
                      {slide.active ? "Active" : "Hidden"}
                    </Badge>
                    <Button variant="ghost" size="icon" className="text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Slide Duration (seconds)</Label>
                  <Input type="number" defaultValue="5" />
                </div>
                <div className="space-y-2">
                  <Label>Transition Effect</Label>
                  <Input defaultValue="fade" />
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  Save Hero Settings
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sections" className="space-y-6">
            <div className="admin-card p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Layers className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Homepage Sections</h3>
                    <p className="text-sm text-muted-foreground">Reorder and configure homepage sections</p>
                  </div>
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Section
                </Button>
              </div>

              <div className="space-y-3">
                {featuredSections.map((section) => (
                  <div key={section.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <Button variant="ghost" size="icon" className="cursor-grab">
                      <GripVertical className="w-4 h-4 text-muted-foreground" />
                    </Button>
                    <div className="flex-1">
                      <Input value={section.title} className="font-medium" />
                    </div>
                    <Badge variant="outline">{section.type}</Badge>
                    <span className="text-sm text-muted-foreground w-20">{section.count} items</span>
                    <Switch checked={section.visible} />
                    <Button variant="ghost" size="icon">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-end">
                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  Save Section Order
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="featured" className="space-y-6">
            <div className="admin-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Star className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Featured Content</h3>
                  <p className="text-sm text-muted-foreground">Configure featured items on homepage</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Label>Featured Tours (Select up to 8)</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <Button variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Select Tours
                    </Button>
                    <p className="text-sm text-muted-foreground mt-2">0 of 8 selected</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Featured Activities (Select up to 6)</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <Button variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Select Activities
                    </Button>
                    <p className="text-sm text-muted-foreground mt-2">0 of 6 selected</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Featured Hotels (Select up to 4)</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <Button variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Select Hotels
                    </Button>
                    <p className="text-sm text-muted-foreground mt-2">0 of 4 selected</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Featured Testimonials (Select up to 6)</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <Button variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Select Testimonials
                    </Button>
                    <p className="text-sm text-muted-foreground mt-2">0 of 6 selected</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  Save Featured Content
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="seo" className="space-y-6">
            <div className="admin-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Home className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Homepage SEO</h3>
                  <p className="text-sm text-muted-foreground">Optimize homepage for search engines</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Page Title</Label>
                    <span className="text-sm text-muted-foreground">52/60</span>
                  </div>
                  <Input defaultValue="BetterView Tour - Best Tours & Travel Experiences in UAE" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Meta Description</Label>
                    <span className="text-sm text-muted-foreground">145/160</span>
                  </div>
                  <Textarea 
                    rows={3}
                    defaultValue="Discover the best tours, activities, and travel experiences in Dubai and Abu Dhabi. Book desert safaris, city tours, and more with BetterView Tour."
                  />
                </div>

                <div className="space-y-2">
                  <Label>Meta Keywords</Label>
                  <Textarea 
                    rows={2}
                    defaultValue="dubai tours, abu dhabi tours, desert safari, uae travel, city tours"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Open Graph Image</Label>
                  <div className="border-2 border-dashed rounded-lg p-8 text-center">
                    <div className="w-32 h-20 mx-auto bg-muted rounded-lg mb-4 flex items-center justify-center">
                      <Image className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <Button variant="outline">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Image
                    </Button>
                    <p className="text-sm text-muted-foreground mt-2">Recommended: 1200 x 630 pixels</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  Save SEO Settings
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
