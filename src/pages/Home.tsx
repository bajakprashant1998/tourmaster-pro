import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import HeroSlider from "@/components/public/HeroSlider";
import CategoryGrid from "@/components/public/CategoryGrid";
import TourSection from "@/components/public/TourSection";
import ReviewsSection from "@/components/public/ReviewsSection";
import VisaSection from "@/components/public/VisaSection";
import WhyChooseUs from "@/components/public/WhyChooseUs";

const dubaiTours = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=600&q=80",
    title: "Dhow Cruise Dubai Marina",
    location: "Dubai",
    duration: "4 Hours",
    price: 120,
    rating: 4.8,
    reviewCount: 324,
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80",
    title: "Museum of The Future Tickets",
    location: "Dubai",
    duration: "2 Hours",
    price: 169,
    rating: 4.9,
    reviewCount: 512,
    badge: "Bestseller",
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=600&q=80",
    title: "Desert Safari with Quad Bike",
    location: "Dubai",
    duration: "6 Hours",
    price: 350,
    originalPrice: 450,
    rating: 4.9,
    reviewCount: 856,
    badge: "Hot Deal",
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=600&q=80",
    title: "Dubai City Tour with Burj Khalifa",
    location: "Dubai",
    duration: "5 Hours",
    price: 365,
    rating: 4.7,
    reviewCount: 203,
  },
];

const abuDhabiTours = [
  {
    id: "5",
    image: "https://images.unsplash.com/photo-1609866138210-84bb689f3c61?w=600&q=80",
    title: "Abu Dhabi City Tour from Dubai",
    location: "Abu Dhabi",
    duration: "8 Hours",
    price: 149,
    rating: 4.8,
    reviewCount: 445,
  },
  {
    id: "6",
    image: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=600&q=80",
    title: "Ferrari World Abu Dhabi Tickets",
    location: "Abu Dhabi",
    duration: "5 Hours",
    price: 295,
    rating: 4.9,
    reviewCount: 678,
    badge: "Popular",
  },
  {
    id: "7",
    image: "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=600&q=80",
    title: "Warner Bros World Abu Dhabi",
    location: "Abu Dhabi",
    duration: "Full Day",
    price: 315,
    rating: 4.8,
    reviewCount: 392,
  },
  {
    id: "8",
    image: "https://images.unsplash.com/photo-1548017544-09b1e1ad57e5?w=600&q=80",
    title: "Yas Waterworld Abu Dhabi",
    location: "Abu Dhabi",
    duration: "Full Day",
    price: 265,
    originalPrice: 310,
    rating: 4.7,
    reviewCount: 267,
    badge: "15% Off",
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <HeroSlider />
        
        <CategoryGrid />
        
        <TourSection
          title="Top Things To Do"
          subtitle="Dubai"
          tours={dubaiTours}
          viewAllLink="/dubai-tours"
        />
        
        <TourSection
          title="Top Things To Do"
          subtitle="Abu Dhabi"
          tours={abuDhabiTours}
          viewAllLink="/abu-dhabi-tours"
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
