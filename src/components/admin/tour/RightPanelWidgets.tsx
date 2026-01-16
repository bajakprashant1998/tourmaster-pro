import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Save, Upload, Image } from "lucide-react";

interface RightPanelWidgetsProps {
  publishStatus: "published" | "draft";
  onPublishChange: (status: "published" | "draft") => void;
  onSave: () => void;
  lastSaved: string;
  location: string;
  onLocationChange: (location: string) => void;
  homepageSettings: {
    topDubai: boolean;
    topAbuDhabi: boolean;
  };
  onHomepageChange: (settings: any) => void;
}

export function RightPanelWidgets({
  publishStatus,
  onPublishChange,
  onSave,
  lastSaved,
  location,
  onLocationChange,
  homepageSettings,
  onHomepageChange,
}: RightPanelWidgetsProps) {
  const locations = ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah"];

  return (
    <div className="space-y-4">
      {/* Publish Widget */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3 className="admin-card-title">Publish</h3>
        </div>
        <div className="admin-card-body space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <input
                type="radio"
                id="publish"
                name="status"
                checked={publishStatus === "published"}
                onChange={() => onPublishChange("published")}
                className="w-4 h-4 text-primary"
              />
              <Label htmlFor="publish" className="cursor-pointer">
                Publish
              </Label>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="radio"
                id="draft"
                name="status"
                checked={publishStatus === "draft"}
                onChange={() => onPublishChange("draft")}
                className="w-4 h-4 text-primary"
              />
              <Label htmlFor="draft" className="cursor-pointer">
                Draft
              </Label>
            </div>
          </div>

          <Button
            onClick={onSave}
            className="w-full bg-primary hover:bg-primary/90"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>

          <p className="text-xs text-center text-muted-foreground animate-pulse-subtle">
            {lastSaved}
          </p>
        </div>
      </div>

      {/* Homepage Settings Widget */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3 className="admin-card-title">Homepage Settings</h3>
        </div>
        <div className="admin-card-body space-y-4">
          <div className="flex items-center gap-3">
            <Checkbox
              id="topDubai"
              checked={homepageSettings.topDubai}
              onCheckedChange={(checked) =>
                onHomepageChange({ ...homepageSettings, topDubai: checked })
              }
            />
            <Label htmlFor="topDubai" className="text-sm cursor-pointer">
              Top things to do <strong>Dubai</strong>
            </Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox
              id="topAbuDhabi"
              checked={homepageSettings.topAbuDhabi}
              onCheckedChange={(checked) =>
                onHomepageChange({ ...homepageSettings, topAbuDhabi: checked })
              }
            />
            <Label htmlFor="topAbuDhabi" className="text-sm cursor-pointer">
              Top things to do <strong>Abu Dhabi</strong>
            </Label>
          </div>

          {/* Featured Image */}
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Select Image (Home page)
            </p>
            <div className="image-upload">
              <Image className="w-10 h-10 text-muted-foreground" />
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                <Upload className="w-4 h-4 mr-2" />
                Upload image
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Location Widget */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3 className="admin-card-title">Locations</h3>
        </div>
        <div className="admin-card-body">
          <Label className="admin-label">Location</Label>
          <Select value={location} onValueChange={onLocationChange}>
            <SelectTrigger className="admin-input">
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((loc) => (
                <SelectItem key={loc} value={loc}>
                  - {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Mobile Feature Image */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3 className="admin-card-title">Mobile Feature Image</h3>
        </div>
        <div className="admin-card-body">
          <div className="image-upload">
            <Image className="w-10 h-10 text-muted-foreground" />
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              <Upload className="w-4 h-4 mr-2" />
              Upload image
            </Button>
          </div>
        </div>
      </div>

      {/* Banner Image */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3 className="admin-card-title">Banner Image</h3>
        </div>
        <div className="admin-card-body">
          <div className="image-upload">
            <Image className="w-10 h-10 text-muted-foreground" />
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              <Upload className="w-4 h-4 mr-2" />
              Upload image
            </Button>
          </div>
        </div>
      </div>

      {/* Tour Featured */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3 className="admin-card-title">Tour Featured</h3>
        </div>
        <div className="admin-card-body">
          <Select defaultValue="always">
            <SelectTrigger className="admin-input">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="always">Always available</SelectItem>
              <SelectItem value="seasonal">Seasonal</SelectItem>
              <SelectItem value="limited">Limited time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
