import TourCard from "./TourCard";

interface Tour {
  id: string;
  title: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  duration: string;
  location: string;
  badge?: string;
}

interface RelatedToursProps {
  tours: Tour[];
  currentTourId: string;
}

export function RelatedTours({ tours, currentTourId }: RelatedToursProps) {
  const relatedTours = tours.filter((tour) => tour.id !== currentTourId).slice(0, 4);

  if (relatedTours.length === 0) return null;

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-foreground mb-8">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedTours.map((tour) => (
            <TourCard key={tour.id} {...tour} />
          ))}
        </div>
      </div>
    </section>
  );
}
