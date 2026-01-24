import { useParams, Link } from "react-router-dom";
import { ChevronRight, Share2, Heart } from "lucide-react";
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import { TourGallery } from "@/components/public/TourGallery";
import { TourInfo } from "@/components/public/TourInfo";
import { BookingForm } from "@/components/public/BookingForm";
import { TourItinerary } from "@/components/public/TourItinerary";
import { TourReviews } from "@/components/public/TourReviews";
import { RelatedTours } from "@/components/public/RelatedTours";
import { Button } from "@/components/ui/button";

// Mock tour data
const mockTour = {
  id: "desert-safari-premium",
  title: "Premium Desert Safari with BBQ Dinner & Entertainment",
  images: [
    "https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1549144511-f099e773c147?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1498454069107-cc6b2b3ccf2c?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1502786129293-79981df4e689?w=1200&h=800&fit=crop",
  ],
  rating: 4.8,
  reviewCount: 2453,
  duration: "6-7 Hours",
  location: "Dubai Desert",
  groupSize: "Up to 15 people",
  languages: ["English", "Arabic", "Russian"],
  overview:
    "Embark on an unforgettable adventure through the golden dunes of Dubai's desert. This premium safari experience combines thrilling dune bashing, traditional Bedouin camp activities, and a sumptuous BBQ dinner under the starlit Arabian sky. Perfect for adventure seekers and culture enthusiasts alike.",
  highlights: [
    "Thrilling dune bashing in 4x4 Land Cruiser",
    "Camel riding experience",
    "Traditional henna painting",
    "Falcon photography opportunity",
    "Live belly dance and Tanoura show",
    "Unlimited refreshments and BBQ dinner",
    "Sandboarding on pristine dunes",
    "Shisha lounge experience",
  ],
  included: [
    "Hotel pickup and drop-off",
    "Professional desert driver/guide",
    "Dune bashing adventure",
    "Camel ride",
    "BBQ dinner with vegetarian options",
    "Unlimited soft drinks and water",
    "Traditional entertainment shows",
    "Henna painting",
  ],
  excluded: [
    "Alcoholic beverages",
    "Quad biking (available for extra charge)",
    "Personal expenses",
    "Gratuities (optional)",
  ],
};

const mockItinerary = [
  {
    time: "3:00 PM",
    title: "Hotel Pickup",
    description:
      "Our professional driver will pick you up from your hotel or residence in a comfortable, air-conditioned 4x4 Land Cruiser.",
  },
  {
    time: "4:00 PM",
    title: "Desert Arrival & Dune Bashing",
    description:
      "Experience the thrill of dune bashing as our skilled drivers navigate the towering sand dunes. Hold on tight for an adrenaline-pumping adventure!",
  },
  {
    time: "5:00 PM",
    title: "Sunset Photo Stop & Sandboarding",
    description:
      "Stop at a scenic point to capture stunning sunset photos and try your hand at sandboarding down the dunes.",
  },
  {
    time: "5:30 PM",
    title: "Bedouin Camp Arrival",
    description:
      "Arrive at our traditional Bedouin-style camp. Enjoy camel rides, henna painting, and dress up in traditional Arabic attire for photos.",
  },
  {
    time: "7:00 PM",
    title: "BBQ Dinner & Entertainment",
    description:
      "Savor a delicious BBQ buffet dinner while enjoying live entertainment including belly dancing and Tanoura shows.",
  },
  {
    time: "9:00 PM",
    title: "Return Journey",
    description:
      "Depart from the camp and relax as we drive you back to your hotel, arriving approximately 9:30 PM.",
  },
];

const mockReviews = [
  {
    id: "1",
    author: "Sarah Johnson",
    avatar: "https://i.pravatar.cc/150?img=1",
    rating: 5,
    date: "January 15, 2026",
    comment:
      "Absolutely incredible experience! The dune bashing was thrilling and the camp was beautifully set up. The dinner was delicious and the entertainment was top-notch. Highly recommend!",
    helpful: 24,
  },
  {
    id: "2",
    author: "Mohammed Al-Rashid",
    avatar: "https://i.pravatar.cc/150?img=8",
    rating: 5,
    date: "January 10, 2026",
    comment:
      "Perfect family experience. Our kids loved the camel rides and sandboarding. The staff was very friendly and accommodating. Will definitely book again!",
    helpful: 18,
  },
  {
    id: "3",
    author: "Emma Williams",
    avatar: "https://i.pravatar.cc/150?img=5",
    rating: 4,
    date: "January 5, 2026",
    comment:
      "Great overall experience. The sunset views were breathtaking and the food was excellent. Only minor issue was the wait time for pickup, but once we started, everything was perfect.",
    helpful: 12,
  },
];

const mockPricingOptions = [
  {
    id: "shared",
    title: "Shared Tour",
    description: "Join other travelers in a group experience",
    price: 149,
    originalPrice: 199,
  },
  {
    id: "private",
    title: "Private Tour",
    description: "Exclusive experience for your group only",
    price: 299,
    originalPrice: 399,
  },
  {
    id: "vip",
    title: "VIP Experience",
    description: "Premium service with luxury vehicle and extras",
    price: 499,
    originalPrice: 649,
  },
];

const relatedTours = [
  {
    id: "morning-safari",
    title: "Morning Desert Safari with Quad Biking",
    image: "https://images.unsplash.com/photo-1549144511-f099e773c147?w=800&h=600&fit=crop",
    price: 199,
    originalPrice: 249,
    rating: 4.7,
    reviewCount: 1234,
    duration: "4 Hours",
    location: "Dubai Desert",
    badge: "Popular",
  },
  {
    id: "dhow-cruise",
    title: "Dubai Marina Dhow Cruise with Dinner",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop",
    price: 89,
    rating: 4.6,
    reviewCount: 892,
    duration: "2.5 Hours",
    location: "Dubai Marina",
  },
  {
    id: "abu-dhabi-tour",
    title: "Abu Dhabi City Tour with Sheikh Zayed Mosque",
    image: "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=800&h=600&fit=crop",
    price: 159,
    originalPrice: 189,
    rating: 4.9,
    reviewCount: 2156,
    duration: "10 Hours",
    location: "Abu Dhabi",
    badge: "Bestseller",
  },
  {
    id: "burj-khalifa",
    title: "Burj Khalifa At The Top Experience",
    image: "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=800&h=600&fit=crop",
    price: 149,
    rating: 4.8,
    reviewCount: 3421,
    duration: "2 Hours",
    location: "Downtown Dubai",
  },
];

export default function TourDetails() {
  const { slug } = useParams();

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
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Tours
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground font-medium">{mockTour.title}</span>
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
            <TourGallery images={mockTour.images} title={mockTour.title} />
            <TourInfo tour={mockTour} />
            <TourItinerary itinerary={mockItinerary} />
            <TourReviews
              reviews={mockReviews}
              averageRating={mockTour.rating}
              totalReviews={mockTour.reviewCount}
            />
          </div>

          {/* Right Column - Booking Form */}
          <div className="lg:col-span-1">
            <BookingForm
              pricingOptions={mockPricingOptions}
              basePrice={149}
              originalPrice={199}
            />
          </div>
        </div>
      </main>

      {/* Related Tours */}
      <div className="bg-muted/30 border-t border-border">
        <RelatedTours tours={relatedTours} currentTourId={mockTour.id} />
      </div>

      <Footer />
    </div>
  );
}
