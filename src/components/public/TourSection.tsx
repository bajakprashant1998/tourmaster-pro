import TourCard from "./TourCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface Tour {
  id: string;
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

interface TourSectionProps {
  title: string;
  subtitle?: string;
  tours: Tour[];
  viewAllLink?: string;
}

const TourSection = ({ title, subtitle, tours, viewAllLink }: TourSectionProps) => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              {title}
            </h2>
            {subtitle && (
              <p className="text-muted-foreground">{subtitle}</p>
            )}
          </div>
          {viewAllLink && (
            <Button variant="outline" className="self-start md:self-auto">
              View All
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tours.map((tour) => (
            <TourCard key={tour.id} {...tour} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TourSection;
