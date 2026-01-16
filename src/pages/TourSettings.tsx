import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Tag, Clock, DollarSign, Globe, Save, Plus, Trash2, GripVertical } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categories = [
  { id: 1, name: "Adventure", slug: "adventure", count: 45 },
  { id: 2, name: "Cultural", slug: "cultural", count: 32 },
  { id: 3, name: "Sightseeing", slug: "sightseeing", count: 28 },
  { id: 4, name: "Dining", slug: "dining", count: 18 },
  { id: 5, name: "Luxury", slug: "luxury", count: 24 },
  { id: 6, name: "Theme Park", slug: "theme-park", count: 15 },
];

export default function TourSettings() {
  return (
    <AdminLayout title="Tour Settings" breadcrumb={["Dashboard", "Tour Settings"]}>
      <div className="space-y-6">
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="booking">Booking</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <div className="admin-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Settings className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">General Settings</h3>
                  <p className="text-sm text-muted-foreground">Configure default tour settings</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Default Currency</Label>
                  <Select defaultValue="usd">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD ($)</SelectItem>
                      <SelectItem value="aed">AED (د.إ)</SelectItem>
                      <SelectItem value="eur">EUR (€)</SelectItem>
                      <SelectItem value="gbp">GBP (£)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Default Timezone</Label>
                  <Select defaultValue="gmt4">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gmt4">GMT+4 (Dubai)</SelectItem>
                      <SelectItem value="gmt0">GMT+0 (London)</SelectItem>
                      <SelectItem value="gmt-5">GMT-5 (New York)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Date Format</Label>
                  <Select defaultValue="dmy">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                      <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                      <SelectItem value="ymd">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Time Format</Label>
                  <Select defaultValue="12">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12">12 Hour (AM/PM)</SelectItem>
                      <SelectItem value="24">24 Hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="col-span-2 space-y-2">
                  <Label>Default Tour Description Template</Label>
                  <Textarea 
                    placeholder="Enter default description template..."
                    rows={4}
                  />
                </div>

                <div className="col-span-2 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Enable Reviews</Label>
                      <p className="text-sm text-muted-foreground">Allow customers to leave reviews on tours</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto-publish Tours</Label>
                      <p className="text-sm text-muted-foreground">Automatically publish tours after creation</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Show Availability Calendar</Label>
                      <p className="text-sm text-muted-foreground">Display availability calendar on tour pages</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <div className="admin-card p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Tag className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Tour Categories</h3>
                    <p className="text-sm text-muted-foreground">Manage tour categories and slugs</p>
                  </div>
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Category
                </Button>
              </div>

              <div className="space-y-3">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <Button variant="ghost" size="icon" className="cursor-grab">
                      <GripVertical className="w-4 h-4 text-muted-foreground" />
                    </Button>
                    <Input value={category.name} className="flex-1" />
                    <Input value={category.slug} className="w-40" />
                    <span className="text-sm text-muted-foreground w-20">{category.count} tours</span>
                    <Button variant="ghost" size="icon" className="text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-end">
                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  Save Categories
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="pricing" className="space-y-6">
            <div className="admin-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Pricing Settings</h3>
                  <p className="text-sm text-muted-foreground">Configure pricing rules and tax settings</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Tax Rate (%)</Label>
                  <Input type="number" defaultValue="5" />
                </div>

                <div className="space-y-2">
                  <Label>Service Fee (%)</Label>
                  <Input type="number" defaultValue="10" />
                </div>

                <div className="space-y-2">
                  <Label>Child Discount (%)</Label>
                  <Input type="number" defaultValue="30" />
                </div>

                <div className="space-y-2">
                  <Label>Infant Age (Up to)</Label>
                  <Input type="number" defaultValue="2" />
                </div>

                <div className="space-y-2">
                  <Label>Child Age Range</Label>
                  <div className="flex items-center gap-2">
                    <Input type="number" defaultValue="3" placeholder="From" />
                    <span>to</span>
                    <Input type="number" defaultValue="11" placeholder="To" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Adult Age (From)</Label>
                  <Input type="number" defaultValue="12" />
                </div>

                <div className="col-span-2 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Show Prices with Tax</Label>
                      <p className="text-sm text-muted-foreground">Display final prices including tax</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Enable Group Discounts</Label>
                      <p className="text-sm text-muted-foreground">Allow automatic discounts for large groups</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  Save Pricing
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="booking" className="space-y-6">
            <div className="admin-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Booking Settings</h3>
                  <p className="text-sm text-muted-foreground">Configure booking rules and policies</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Minimum Booking Notice (Hours)</Label>
                  <Input type="number" defaultValue="24" />
                </div>

                <div className="space-y-2">
                  <Label>Maximum Advance Booking (Days)</Label>
                  <Input type="number" defaultValue="365" />
                </div>

                <div className="space-y-2">
                  <Label>Cancellation Period (Hours)</Label>
                  <Input type="number" defaultValue="48" />
                </div>

                <div className="space-y-2">
                  <Label>Cancellation Fee (%)</Label>
                  <Input type="number" defaultValue="20" />
                </div>

                <div className="col-span-2 space-y-2">
                  <Label>Booking Confirmation Email Template</Label>
                  <Textarea 
                    placeholder="Enter email template..."
                    rows={4}
                  />
                </div>

                <div className="col-span-2 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Require Deposit</Label>
                      <p className="text-sm text-muted-foreground">Require deposit payment for bookings</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Send Reminder Emails</Label>
                      <p className="text-sm text-muted-foreground">Send booking reminders to customers</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Allow Modification</Label>
                      <p className="text-sm text-muted-foreground">Allow customers to modify their bookings</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  Save Booking Settings
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
