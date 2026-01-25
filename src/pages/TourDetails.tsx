import { useParams, Link } from "react-router-dom";
import { ChevronRight, Share2, Heart, Loader2 } from "lucide-react";
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import { TourGallery } from "@/components/public/TourGallery";
import { TourInfo } from "@/components/public/TourInfo";
import { BookingForm } from "@/components/public/BookingForm";
import { TourItinerary } from "@/components/public/TourItinerary";
import { TourReviews } from "@/components/public/TourReviews";
import { RelatedTours } from "@/components/public/RelatedTours";
import { Button } from "@/components/ui/button";
import { useTour, useTourPricingOptions, useTourReviews, useTours } from "@/hooks/useTours";
import { format } from "date-fns";

export default function TourDetails() {
  const { slug } = useParams<{ slug: string }>();
  const { data: tour, isLoading: tourLoading, error } = useTour(slug || "");
  const { data: pricingOptions = [] } = useTourPricingOptions(tour?.id || "");
  const { data: reviews = [] } = useTourReviews(tour?.id || "");
  const { data: relatedTours = [] } = useTours({ categoryId: tour?.category_id || undefined, limit: 4 });

  if (tourLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center py-32">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !tour) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Tour Not Found</h1>
          <p className="text-muted-foreground mb-8">The tour you're looking for doesn't exist or has been removed.</p>
          <Link to="/tours-listing">
            <Button>Browse All Tours</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const formattedPricingOptions = pricingOptions.map((opt) => ({
    id: opt.id,
    title: opt.name,
    description: opt.description || "",
    price: Number(opt.price),
    originalPrice: opt.original_price ? Number(opt.original_price) : undefined,
  }));

  const tourInfo = {
    title: tour.title,
    rating: tour.rating || 0,
    reviewCount: tour.review_count || 0,
    duration: tour.duration,
    location: tour.location?.name || "Dubai",
    groupSize: tour.group_size || "Up to 15 people",
    languages: ["English", "Arabic"],
    overview: tour.description || "",
    highlights: tour.highlights || [],
    included: tour.includes || [],
    excluded: tour.excludes || [],
  };

  const itinerary = (tour.itinerary || []).map((item) => ({
    time: item.time,
    title: item.title,
    description: item.description,
  }));

  const formattedReviews = reviews.map((review) => ({
    id: review.id,
    author: review.author_name,
    avatar: review.author_avatar || `https://i.pravatar.cc/150?u=${review.id}`,
    rating: review.rating,
    date: format(new Date(review.created_at), "MMMM d, yyyy"),
    comment: review.comment,
    helpful: review.helpful_count || 0,
  }));

  const formattedRelatedTours = relatedTours
    .filter((t) => t.id !== tour.id)
    .slice(0, 4)
    .map((t) => ({
      id: t.slug,
      title: t.title,
      image: t.main_image || t.images?.[0] || "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
      price: Number(t.price),
      originalPrice: t.original_price ? Number(t.original_price) : undefined,
      rating: t.rating || 0,
      reviewCount: t.review_count || 0,
      duration: t.duration,
      location: t.location?.name || "Dubai",
      badge: t.is_bestseller ? "Bestseller" : undefined,
    }));

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <Link to="/tours-listing" className="text-muted-foreground hover:text-foreground transition-colors">
              Tours
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground font-medium">{tour.title}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Action Buttons */}
        <div className="flex justify-end gap-2 mb-4">
          <Button variant="outline" size="sm" className="gap-2">
            <Share2 className="w-4 h-4" />
            Share
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Heart className="w-4 h-4" />
            Save
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Tour Details */}
          <div className="lg:col-span-2 space-y-10">
            <TourGallery 
              images={tour.images && tour.images.length > 0 ? tour.images : [tour.main_image || "https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=1200"]} 
              title={tour.title} 
            />
            <TourInfo tour={tourInfo} />
            {itinerary.length > 0 && <TourItinerary itinerary={itinerary} />}
            {formattedReviews.length > 0 && (
              <TourReviews
                reviews={formattedReviews}
                averageRating={tour.rating || 0}
                totalReviews={tour.review_count || 0}
              />
            )}
          </div>

          {/* Right Column - Booking Form */}
          <div className="lg:col-span-1">
            <BookingForm
              tourId={tour.id}
              pricingOptions={formattedPricingOptions.length > 0 ? formattedPricingOptions : [{
                id: "default",
                title: "Standard",
                description: "Standard tour package",
                price: Number(tour.price),
                originalPrice: tour.original_price ? Number(tour.original_price) : undefined,
              }]}
              basePrice={Number(tour.price)}
              originalPrice={tour.original_price ? Number(tour.original_price) : undefined}
            />
          </div>
        </div>
      </main>

      {/* Related Tours */}
      {formattedRelatedTours.length > 0 && (
        <div className="bg-muted/30 border-t border-border">
          <RelatedTours tours={formattedRelatedTours} currentTourId={tour.slug} />
        </div>
      )}

      <Footer />
    </div>
  );
}
