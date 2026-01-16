import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileCode, Link, Phone, Mail, MapPin, Save, Plus, Trash2, GripVertical, Facebook, Twitter, Instagram, Youtube, Linkedin } from "lucide-react";

const footerLinks = [
  { id: 1, section: "Quick Links", title: "About Us", url: "/about" },
  { id: 2, section: "Quick Links", title: "Contact", url: "/contact" },
  { id: 3, section: "Quick Links", title: "FAQs", url: "/faqs" },
  { id: 4, section: "Tours", title: "Dubai Tours", url: "/tours/dubai" },
  { id: 5, section: "Tours", title: "Abu Dhabi Tours", url: "/tours/abu-dhabi" },
  { id: 6, section: "Legal", title: "Privacy Policy", url: "/privacy" },
  { id: 7, section: "Legal", title: "Terms of Service", url: "/terms" },
];

export default function FooterSettings() {
  return (
    <AdminLayout title="Footer Settings" breadcrumb={["Dashboard", "Footer Settings"]}>
      <div className="space-y-6">
        <Tabs defaultValue="content" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="links">Links</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="social">Social</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-6">
            <div className="admin-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileCode className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Footer Content</h3>
                  <p className="text-sm text-muted-foreground">Customize footer text and branding</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Company Description</Label>
                  <Textarea 
                    placeholder="Enter company description for footer..."
                    rows={3}
                    defaultValue="BetterView Tour is your trusted partner for unforgettable travel experiences in the UAE. Discover the best tours, activities, and adventures."
                  />
                </div>

                <div className="space-y-2">
                  <Label>Copyright Text</Label>
                  <Input defaultValue="© 2026 BetterView Tour. All rights reserved." />
                </div>

                <div className="space-y-2">
                  <Label>Footer Logo</Label>
                  <div className="border-2 border-dashed rounded-lg p-8 text-center">
                    <div className="w-16 h-16 mx-auto bg-muted rounded-lg mb-4 flex items-center justify-center">
                      <FileCode className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <Button variant="outline">Upload Logo</Button>
                    <p className="text-sm text-muted-foreground mt-2">Recommended: PNG with transparent background</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Show Newsletter Signup</Label>
                      <p className="text-sm text-muted-foreground">Display newsletter subscription form</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Show Payment Icons</Label>
                      <p className="text-sm text-muted-foreground">Display accepted payment method icons</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Show Trust Badges</Label>
                      <p className="text-sm text-muted-foreground">Display security and trust badges</p>
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

          <TabsContent value="links" className="space-y-6">
            <div className="admin-card p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Link className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Footer Links</h3>
                    <p className="text-sm text-muted-foreground">Manage footer navigation links</p>
                  </div>
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Link
                </Button>
              </div>

              <div className="space-y-3">
                {footerLinks.map((link) => (
                  <div key={link.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <Button variant="ghost" size="icon" className="cursor-grab">
                      <GripVertical className="w-4 h-4 text-muted-foreground" />
                    </Button>
                    <Input value={link.section} className="w-32" placeholder="Section" />
                    <Input value={link.title} className="flex-1" placeholder="Title" />
                    <Input value={link.url} className="flex-1" placeholder="URL" />
                    <Button variant="ghost" size="icon" className="text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-end">
                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  Save Links
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <div className="admin-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Contact Information</h3>
                  <p className="text-sm text-muted-foreground">Display contact details in footer</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone Number
                  </Label>
                  <Input defaultValue="+971 4 123 4567" />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    WhatsApp
                  </Label>
                  <Input defaultValue="+971 50 123 4567" />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </Label>
                  <Input defaultValue="info@betterviewtour.com" />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Support Email
                  </Label>
                  <Input defaultValue="support@betterviewtour.com" />
                </div>

                <div className="col-span-2 space-y-2">
                  <Label className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Address
                  </Label>
                  <Textarea 
                    rows={2}
                    defaultValue="Office 123, Business Bay, Dubai, United Arab Emirates"
                  />
                </div>

                <div className="col-span-2 space-y-2">
                  <Label>Working Hours</Label>
                  <Input defaultValue="Mon - Sat: 9:00 AM - 6:00 PM" />
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  Save Contact Info
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="social" className="space-y-6">
            <div className="admin-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Facebook className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Social Media Links</h3>
                  <p className="text-sm text-muted-foreground">Add your social media profiles</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Facebook className="w-4 h-4" />
                    Facebook
                  </Label>
                  <Input placeholder="https://facebook.com/..." defaultValue="https://facebook.com/betterviewtour" />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Instagram className="w-4 h-4" />
                    Instagram
                  </Label>
                  <Input placeholder="https://instagram.com/..." defaultValue="https://instagram.com/betterviewtour" />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Twitter className="w-4 h-4" />
                    Twitter / X
                  </Label>
                  <Input placeholder="https://twitter.com/..." defaultValue="https://twitter.com/betterviewtour" />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Youtube className="w-4 h-4" />
                    YouTube
                  </Label>
                  <Input placeholder="https://youtube.com/..." defaultValue="https://youtube.com/betterviewtour" />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </Label>
                  <Input placeholder="https://linkedin.com/..." />
                </div>

                <div className="space-y-2">
                  <Label>TikTok</Label>
                  <Input placeholder="https://tiktok.com/..." />
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Show Social Icons in Footer</Label>
                    <p className="text-sm text-muted-foreground">Display social media icons</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Open in New Tab</Label>
                    <p className="text-sm text-muted-foreground">Open social links in new browser tab</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  Save Social Links
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
