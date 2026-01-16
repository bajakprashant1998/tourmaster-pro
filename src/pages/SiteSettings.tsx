import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, Palette, Shield, Bell, Save, Upload, Mail, Lock, Database, Server } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SiteSettings() {
  return (
    <AdminLayout title="Site Settings" breadcrumb={["Dashboard", "Site Settings"]}>
      <div className="space-y-6">
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <div className="admin-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">General Settings</h3>
                  <p className="text-sm text-muted-foreground">Basic site configuration</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Site Name</Label>
                  <Input defaultValue="BetterView Tour" />
                </div>

                <div className="space-y-2">
                  <Label>Site Tagline</Label>
                  <Input defaultValue="Your Gateway to UAE Adventures" />
                </div>

                <div className="space-y-2">
                  <Label>Site URL</Label>
                  <Input defaultValue="https://betterviewtour.com" />
                </div>

                <div className="space-y-2">
                  <Label>Admin Email</Label>
                  <Input defaultValue="admin@betterviewtour.com" />
                </div>

                <div className="space-y-2">
                  <Label>Default Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="ar">Arabic</SelectItem>
                      <SelectItem value="ru">Russian</SelectItem>
                      <SelectItem value="zh">Chinese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Timezone</Label>
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

                <div className="col-span-2 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Maintenance Mode</Label>
                      <p className="text-sm text-muted-foreground">Temporarily disable the site for visitors</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Enable Multi-language</Label>
                      <p className="text-sm text-muted-foreground">Allow visitors to switch languages</p>
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

          <TabsContent value="appearance" className="space-y-6">
            <div className="admin-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Palette className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Appearance Settings</h3>
                  <p className="text-sm text-muted-foreground">Customize site look and feel</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Site Logo</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <div className="w-32 h-12 mx-auto bg-muted rounded mb-4 flex items-center justify-center">
                      <Globe className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <Button variant="outline" size="sm">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Logo
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Favicon</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <div className="w-12 h-12 mx-auto bg-muted rounded mb-4 flex items-center justify-center">
                      <Globe className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <Button variant="outline" size="sm">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Favicon
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Primary Color</Label>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary border" />
                    <Input defaultValue="#16A34A" className="flex-1" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Accent Color</Label>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent border" />
                    <Input defaultValue="#F59E0B" className="flex-1" />
                  </div>
                </div>

                <div className="col-span-2 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Dark Mode</Label>
                      <p className="text-sm text-muted-foreground">Enable dark mode option for visitors</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Show Preloader</Label>
                      <p className="text-sm text-muted-foreground">Display loading animation on page load</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  Save Appearance
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="email" className="space-y-6">
            <div className="admin-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Email Settings</h3>
                  <p className="text-sm text-muted-foreground">Configure email delivery settings</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>SMTP Host</Label>
                  <Input placeholder="smtp.example.com" />
                </div>

                <div className="space-y-2">
                  <Label>SMTP Port</Label>
                  <Input placeholder="587" />
                </div>

                <div className="space-y-2">
                  <Label>SMTP Username</Label>
                  <Input placeholder="username" />
                </div>

                <div className="space-y-2">
                  <Label>SMTP Password</Label>
                  <Input type="password" placeholder="••••••••" />
                </div>

                <div className="space-y-2">
                  <Label>From Email</Label>
                  <Input defaultValue="noreply@betterviewtour.com" />
                </div>

                <div className="space-y-2">
                  <Label>From Name</Label>
                  <Input defaultValue="BetterView Tour" />
                </div>

                <div className="col-span-2 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Enable SSL/TLS</Label>
                      <p className="text-sm text-muted-foreground">Use secure connection for email</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <Button variant="outline">Send Test Email</Button>
                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  Save Email Settings
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <div className="admin-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Security Settings</h3>
                  <p className="text-sm text-muted-foreground">Configure security and access controls</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Require 2FA for admin accounts</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Force HTTPS</Label>
                    <p className="text-sm text-muted-foreground">Redirect all traffic to HTTPS</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Login Attempt Limit</Label>
                    <p className="text-sm text-muted-foreground">Lock accounts after failed attempts</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Max Login Attempts</Label>
                    <Input type="number" defaultValue="5" />
                  </div>

                  <div className="space-y-2">
                    <Label>Lockout Duration (minutes)</Label>
                    <Input type="number" defaultValue="30" />
                  </div>

                  <div className="space-y-2">
                    <Label>Session Timeout (hours)</Label>
                    <Input type="number" defaultValue="24" />
                  </div>

                  <div className="space-y-2">
                    <Label>Password Min Length</Label>
                    <Input type="number" defaultValue="8" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable reCAPTCHA</Label>
                    <p className="text-sm text-muted-foreground">Add CAPTCHA to forms</p>
                  </div>
                  <Switch />
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  Save Security Settings
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
            <div className="admin-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Server className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Advanced Settings</h3>
                  <p className="text-sm text-muted-foreground">System and performance settings</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable Caching</Label>
                    <p className="text-sm text-muted-foreground">Cache pages for faster loading</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable CDN</Label>
                    <p className="text-sm text-muted-foreground">Use CDN for static assets</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Debug Mode</Label>
                    <p className="text-sm text-muted-foreground">Enable detailed error logging</p>
                  </div>
                  <Switch />
                </div>

                <div className="space-y-2">
                  <Label>Google Analytics ID</Label>
                  <Input placeholder="UA-XXXXXXXXX-X or G-XXXXXXXXXX" />
                </div>

                <div className="space-y-2">
                  <Label>Custom Header Scripts</Label>
                  <Textarea 
                    rows={4}
                    placeholder="<!-- Add custom scripts here -->"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Custom Footer Scripts</Label>
                  <Textarea 
                    rows={4}
                    placeholder="<!-- Add custom scripts here -->"
                  />
                </div>

                <div className="flex items-center gap-4 p-4 border rounded-lg bg-destructive/5 border-destructive/20">
                  <Database className="w-8 h-8 text-destructive" />
                  <div className="flex-1">
                    <p className="font-medium text-destructive">Danger Zone</p>
                    <p className="text-sm text-muted-foreground">Clear all cache and reset settings</p>
                  </div>
                  <Button variant="destructive">Clear Cache</Button>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  Save Advanced Settings
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
