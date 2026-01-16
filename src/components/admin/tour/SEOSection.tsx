import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RichTextEditor } from "./RichTextEditor";
import { CheckCircle, AlertCircle, XCircle } from "lucide-react";

interface SEOSectionProps {
  data: {
    metaTitle: string;
    metaKeyword: string;
    metaDescription: string;
    metaTag: string;
  };
  onChange: (data: any) => void;
}

export function SEOSection({ data, onChange }: SEOSectionProps) {
  const titleLength = data.metaTitle.length;
  const descriptionLength = data.metaDescription.length;

  const getTitleStatus = () => {
    if (titleLength === 0) return { status: "empty", color: "text-muted-foreground" };
    if (titleLength >= 50 && titleLength <= 60) return { status: "good", color: "text-success", icon: CheckCircle };
    if (titleLength > 60) return { status: "too-long", color: "text-destructive", icon: XCircle };
    return { status: "short", color: "text-warning", icon: AlertCircle };
  };

  const getDescriptionStatus = () => {
    if (descriptionLength === 0) return { status: "empty", color: "text-muted-foreground" };
    if (descriptionLength >= 150 && descriptionLength <= 160) return { status: "good", color: "text-success", icon: CheckCircle };
    if (descriptionLength > 160) return { status: "too-long", color: "text-destructive", icon: XCircle };
    return { status: "short", color: "text-warning", icon: AlertCircle };
  };

  const titleStatus = getTitleStatus();
  const descStatus = getDescriptionStatus();

  // Calculate overall SEO score
  const getSEOScore = () => {
    let score = 0;
    if (titleLength >= 50 && titleLength <= 60) score += 25;
    else if (titleLength > 0) score += 10;
    
    if (descriptionLength >= 150 && descriptionLength <= 160) score += 25;
    else if (descriptionLength > 0) score += 10;
    
    if (data.metaKeyword.length > 0) score += 25;
    if (data.metaTag.length > 0) score += 25;
    
    return score;
  };

  const seoScore = getSEOScore();
  const getSEOLabel = () => {
    if (seoScore >= 80) return { label: "Good", color: "bg-success" };
    if (seoScore >= 50) return { label: "Improve", color: "bg-warning" };
    return { label: "Poor", color: "bg-destructive" };
  };

  const seoLabel = getSEOLabel();

  return (
    <div className="admin-card animate-fade-in">
      <div className="admin-card-header flex items-center justify-between">
        <h2 className="admin-card-title">SEO Management</h2>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">SEO Score:</span>
          <span className={`px-2 py-0.5 rounded text-xs font-medium text-white ${seoLabel.color}`}>
            {seoLabel.label}
          </span>
        </div>
      </div>
      <div className="admin-card-body space-y-6">
        {/* Meta Title */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <Label className="admin-label mb-0">Meta Title</Label>
            <span className={`text-xs font-medium ${titleStatus.color}`}>
              {titleLength}/60 characters
              {titleStatus.icon && (
                <titleStatus.icon className="w-3 h-3 inline ml-1" />
              )}
            </span>
          </div>
          <Input
            value={data.metaTitle}
            onChange={(e) => onChange({ ...data, metaTitle: e.target.value })}
            placeholder="Camel Ride Dubai | Authentic Desert Experience with Betterview Tourism"
            className="admin-input"
          />
          <p className="admin-hint">
            Ideal length: 50-60 characters. Currently: {titleLength} characters.
          </p>
        </div>

        {/* Meta Keyword */}
        <div>
          <Label className="admin-label">Meta Keyword</Label>
          <Input
            value={data.metaKeyword}
            onChange={(e) => onChange({ ...data, metaKeyword: e.target.value })}
            placeholder="UZBEKISTAN .03 NIGHTS IN TASHKENT 29 NOV '25 - 02 DEC '25"
            className="admin-input"
          />
        </div>

        {/* Meta Description */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <Label className="admin-label mb-0">Meta Description</Label>
            <span className={`text-xs font-medium ${descStatus.color}`}>
              {descriptionLength}/160 characters
              {descStatus.icon && (
                <descStatus.icon className="w-3 h-3 inline ml-1" />
              )}
            </span>
          </div>
          <RichTextEditor
            value={data.metaDescription}
            onChange={(value) => onChange({ ...data, metaDescription: value })}
            placeholder="Write a compelling meta description (150-160 characters)..."
          />
          <p className="admin-hint">
            Target length: 150-160 characters for optimal SEO.
          </p>
        </div>

        {/* Meta Tag */}
        <div>
          <Label className="admin-label">Meta Tag</Label>
          <Input
            value={data.metaTag}
            onChange={(e) => onChange({ ...data, metaTag: e.target.value })}
            placeholder="Enter meta tags"
            className="admin-input"
          />
        </div>
      </div>
    </div>
  );
}
