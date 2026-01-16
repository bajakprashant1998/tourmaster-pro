import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Image, Plus, X } from "lucide-react";

interface GallerySectionProps {
  data: {
    images: string[];
    enableFAQs: boolean;
  };
  onChange: (data: any) => void;
}

export function GallerySection({ data, onChange }: GallerySectionProps) {
  return (
    <div className="admin-card animate-fade-in">
      <div className="admin-card-header">
        <h2 className="admin-card-title">Gallery</h2>
      </div>
      <div className="admin-card-body space-y-6">
        {/* Gallery */}
        <div>
          <Label className="admin-label">Gallery</Label>
          <div className="flex flex-wrap gap-3">
            {data.images.map((image, index) => (
              <div
                key={index}
                className="relative w-24 h-24 rounded-lg border border-border overflow-hidden group"
              >
                <img
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() =>
                    onChange({
                      ...data,
                      images: data.images.filter((_, i) => i !== index),
                    })
                  }
                  className="absolute top-1 right-1 w-5 h-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
            <Button
              variant="outline"
              className="bg-primary text-primary-foreground hover:bg-primary/90 border-primary"
            >
              <Plus className="w-4 h-4 mr-2" />
              Select images
            </Button>
          </div>
        </div>

        {/* Enable FAQs */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-3">
            Enable / Disable FAQs
          </h3>
          <div className="flex items-center gap-3">
            <Checkbox
              id="enableFAQs"
              checked={data.enableFAQs}
              onCheckedChange={(checked) =>
                onChange({ ...data, enableFAQs: checked })
              }
            />
            <Label htmlFor="enableFAQs" className="text-sm cursor-pointer">
              Enable FAQs
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
}
