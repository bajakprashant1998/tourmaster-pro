import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RichTextEditor } from "./RichTextEditor";

interface TourContentSectionProps {
  data: {
    title: string;
    overview: string;
    category: string;
    youtubeUrl: string;
    disableAddToCart: boolean;
  };
  onChange: (data: any) => void;
  categories?: { id: string; name: string }[];
}

export function TourContentSection({ data, onChange, categories: categoriesProp }: TourContentSectionProps) {
  const defaultCategories = [
    { id: "Adventure Tours", name: "Adventure Tours" },
    { id: "City Tours", name: "City Tours" },
    { id: "Cultural Tours", name: "Cultural Tours" },
    { id: "Desert Safari", name: "Desert Safari" },
    { id: "Water Sports", name: "Water Sports" },
    { id: "Luxury Experiences", name: "Luxury Experiences" },
  ];
  const categories = categoriesProp && categoriesProp.length > 0 ? categoriesProp : defaultCategories;

  return (
    <div className="admin-card animate-fade-in">
      <div className="admin-card-header">
        <h2 className="admin-card-title">Tour Content</h2>
      </div>
      <div className="admin-card-body space-y-6">
        {/* Title */}
        <div>
          <Label htmlFor="title" className="admin-label">Title</Label>
          <Input
            id="title"
            value={data.title}
            onChange={(e) => onChange({ ...data, title: e.target.value })}
            placeholder="Enter tour title"
            className="admin-input"
          />
        </div>

        {/* Overview */}
        <div>
          <Label className="admin-label">Overview</Label>
          <RichTextEditor
            value={data.overview}
            onChange={(value) => onChange({ ...data, overview: value })}
            placeholder="Write a compelling tour overview..."
          />
        </div>

        {/* Category */}
        <div>
          <Label className="admin-label">Category</Label>
          <Select
            value={data.category}
            onValueChange={(value) => onChange({ ...data, category: value })}
          >
            <SelectTrigger className="admin-input">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* YouTube Video */}
        <div>
          <Label htmlFor="youtube" className="admin-label">Youtube Video</Label>
          <Input
            id="youtube"
            value={data.youtubeUrl}
            onChange={(e) => onChange({ ...data, youtubeUrl: e.target.value })}
            placeholder="Youtube link video"
            className="admin-input"
          />
        </div>

        {/* Disable Add to Cart */}
        <div className="flex items-center gap-3">
          <Checkbox
            id="disableCart"
            checked={data.disableAddToCart}
            onCheckedChange={(checked) =>
              onChange({ ...data, disableAddToCart: checked })
            }
          />
          <Label htmlFor="disableCart" className="text-sm cursor-pointer">
            Disable add to cart
          </Label>
        </div>
      </div>
    </div>
  );
}
