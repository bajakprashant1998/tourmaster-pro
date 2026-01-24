import { Clock, MapPin, Users, Calendar, CheckCircle2, XCircle, Star, Languages } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TourInfoProps {
  tour: {
    title: string;
    rating: number;
    reviewCount: number;
    duration: string;
    location: string;
    groupSize: string;
    languages: string[];
    overview: string;
    highlights: string[];
    included: string[];
    excluded: string[];
  };
}

export function TourInfo({ tour }: TourInfoProps) {
  return (
    <div className="space-y-8">
      {/* Title and Rating */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-3">{tour.title}</h1>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(tour.rating) ? "fill-warning text-warning" : "text-muted"
                }`}
              />
            ))}
            <span className="ml-2 text-sm font-medium text-foreground">{tour.rating}</span>
            <span className="text-sm text-muted-foreground">({tour.reviewCount} reviews)</span>
          </div>
        </div>
      </div>

      {/* Quick Info */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
          <Clock className="w-5 h-5 text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">Duration</p>
            <p className="text-sm font-medium text-foreground">{tour.duration}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
          <MapPin className="w-5 h-5 text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">Location</p>
            <p className="text-sm font-medium text-foreground">{tour.location}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
          <Users className="w-5 h-5 text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">Group Size</p>
            <p className="text-sm font-medium text-foreground">{tour.groupSize}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
          <Languages className="w-5 h-5 text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">Languages</p>
            <p className="text-sm font-medium text-foreground">{tour.languages.join(", ")}</p>
          </div>
        </div>
      </div>

      {/* Overview */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-3">Overview</h2>
        <p className="text-muted-foreground leading-relaxed">{tour.overview}</p>
      </div>

      {/* Highlights */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-3">Tour Highlights</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {tour.highlights.map((highlight, index) => (
            <li key={index} className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              <span className="text-muted-foreground">{highlight}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Included/Excluded */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-3">What's Included</h2>
          <ul className="space-y-2">
            {tour.included.map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-3">What's Excluded</h2>
          <ul className="space-y-2">
            {tour.excluded.map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
