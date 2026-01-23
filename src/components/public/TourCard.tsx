import { MapPin, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface TourCardProps {
  image: string;
  title: string;
  location: string;
  duration: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  badge?: string;
}

const TourCard = ({
  image,
  title,
  location,
  duration,
  price,
  originalPrice,
  rating,
  reviewCount,
  badge,
}: TourCardProps) => {
  return (
    <div className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {badge && (
          <Badge className="absolute top-3 left-3 bg-destructive text-destructive-foreground">
            {badge}
          </Badge>
        )}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-foreground/60 backdrop-blur-sm rounded-full text-card text-sm">
          <Star className="h-3.5 w-3.5 fill-warning text-warning" />
          <span>{rating}</span>
          <span className="text-card/70">({reviewCount})</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {location}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {duration}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-primary">
                {price.toFixed(2)} AED
              </span>
              {originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {originalPrice.toFixed(2)} AED
                </span>
              )}
            </div>
            <span className="text-xs text-muted-foreground">per person</span>
          </div>
          <Button size="sm" className="bg-primary hover:bg-primary/90">
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
