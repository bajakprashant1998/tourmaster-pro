import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import HeroSlider from "@/components/public/HeroSlider";
import CategoryGrid from "@/components/public/CategoryGrid";
import TourSection from "@/components/public/TourSection";
import ReviewsSection from "@/components/public/ReviewsSection";
import VisaSection from "@/components/public/VisaSection";
import WhyChooseUs from "@/components/public/WhyChooseUs";
import { useToursByLocation } from "@/hooks/useTours";

const Home = () => {
  const { data: dubaiTours = [], isLoading: dubaiLoading } = useToursByLocation("dubai", 4);
  const { data: abuDhabiTours = [], isLoading: abuDhabiLoading } = useToursByLocation("abu-dhabi", 4);

  const formatTours = (tours: typeof dubaiTours) =>
    tours.map((tour) => ({
      id: tour.slug,
      image: tour.main_image || tour.images?.[0] || "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600",
      title: tour.title,
      location: tour.location?.name || "UAE",
      duration: tour.duration,
      price: Number(tour.price),
      originalPrice: tour.original_price ? Number(tour.original_price) : undefined,
      rating: tour.rating || 0,
      reviewCount: tour.review_count || 0,
      badge: tour.is_bestseller ? "Bestseller" : tour.discount_percent && tour.discount_percent > 0 ? `${tour.discount_percent}% Off` : undefined,
    }));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <HeroSlider />
        
        <CategoryGrid />
        
        <TourSection
          title="Top Things To Do"
          subtitle="Dubai"
          tours={formatTours(dubaiTours)}
          viewAllLink="/tours-listing?location=dubai"
          isLoading={dubaiLoading}
        />
        
        <TourSection
          title="Top Things To Do"
          subtitle="Abu Dhabi"
          tours={formatTours(abuDhabiTours)}
          viewAllLink="/tours-listing?location=abu-dhabi"
          isLoading={abuDhabiLoading}
        />
        
        <VisaSection />
        
        <ReviewsSection />
        
        <WhyChooseUs />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
