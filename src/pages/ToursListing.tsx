import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Grid3X3, List } from "lucide-react";
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import TourCard from "@/components/public/TourCard";
import {
  TourFilters,
  TourSearchBar,
  ActiveFilters,
  FilterState,
} from "@/components/public/TourFilters";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// Mock data - in production this would come from an API
const allTours = [
  {
    id: "desert-safari-premium",
    image: "https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=600&q=80",
    title: "Premium Desert Safari with BBQ Dinner & Entertainment",
    location: "Dubai",
    duration: "6-7 Hours",
    price: 149,
    originalPrice: 199,
    rating: 4.8,
    reviewCount: 2453,
    badge: "Bestseller",
    category: "Desert Safari",
  },
  {
    id: "dhow-cruise-marina",
    image: "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=600&q=80",
    title: "Dhow Cruise Dubai Marina with Dinner",
    location: "Dubai",
    duration: "2-3 Hours",
    price: 120,
    rating: 4.8,
    reviewCount: 324,
    category: "Water Activities",
  },
  {
    id: "museum-future",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80",
    title: "Museum of The Future Tickets",
    location: "Dubai",
    duration: "2-3 Hours",
    price: 169,
    rating: 4.9,
    reviewCount: 512,
    badge: "Popular",
    category: "Attractions",
  },
  {
    id: "burj-khalifa-top",
    image: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=600&q=80",
    title: "Burj Khalifa At The Top Experience",
    location: "Dubai",
    duration: "2-3 Hours",
    price: 149,
    rating: 4.7,
    reviewCount: 3421,
    category: "Attractions",
  },
  {
    id: "abu-dhabi-city",
    image: "https://images.unsplash.com/photo-1609866138210-84bb689f3c61?w=600&q=80",
    title: "Abu Dhabi City Tour from Dubai",
    location: "Abu Dhabi",
    duration: "Full Day",
    price: 149,
    rating: 4.8,
    reviewCount: 445,
    category: "City Tours",
  },
  {
    id: "ferrari-world",
    image: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=600&q=80",
    title: "Ferrari World Abu Dhabi Tickets",
    location: "Abu Dhabi",
    duration: "Full Day",
    price: 295,
    rating: 4.9,
    reviewCount: 678,
    badge: "Popular",
    category: "Theme Parks",
  },
  {
    id: "warner-bros",
    image: "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=600&q=80",
    title: "Warner Bros World Abu Dhabi",
    location: "Abu Dhabi",
    duration: "Full Day",
    price: 315,
    rating: 4.8,
    reviewCount: 392,
    category: "Theme Parks",
  },
  {
    id: "yas-waterworld",
    image: "https://images.unsplash.com/photo-1548017544-09b1e1ad57e5?w=600&q=80",
    title: "Yas Waterworld Abu Dhabi",
    location: "Abu Dhabi",
    duration: "Full Day",
    price: 265,
    originalPrice: 310,
    rating: 4.7,
    reviewCount: 267,
    badge: "15% Off",
    category: "Water Activities",
  },
  {
    id: "morning-safari",
    image: "https://images.unsplash.com/photo-1549144511-f099e773c147?w=600&q=80",
    title: "Morning Desert Safari with Quad Biking",
    location: "Dubai",
    duration: "4-5 Hours",
    price: 199,
    originalPrice: 249,
    rating: 4.7,
    reviewCount: 1234,
    category: "Desert Safari",
  },
  {
    id: "miracle-garden",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&q=80",
    title: "Dubai Miracle Garden Tickets",
    location: "Dubai",
    duration: "2-3 Hours",
    price: 65,
    rating: 4.6,
    reviewCount: 892,
    category: "Attractions",
  },
  {
    id: "aquaventure",
    image: "https://images.unsplash.com/photo-1559599746-c0f80c6d2b5e?w=600&q=80",
    title: "Aquaventure Waterpark Atlantis",
    location: "Dubai",
    duration: "Full Day",
    price: 320,
    rating: 4.8,
    reviewCount: 1567,
    category: "Water Activities",
  },
  {
    id: "dubai-frame",
    image: "https://images.unsplash.com/photo-1597659840241-37e2b9c2f55f?w=600&q=80",
    title: "Dubai Frame Entry Tickets",
    location: "Dubai",
    duration: "1-2 Hours",
    price: 50,
    rating: 4.5,
    reviewCount: 2341,
    category: "Attractions",
  },
];

const categories = [
  "Desert Safari",
  "City Tours",
  "Attractions",
  "Water Activities",
  "Theme Parks",
];

const locations = ["Dubai", "Abu Dhabi", "Sharjah", "Ras Al Khaimah"];

const durations = ["1-2 Hours", "2-3 Hours", "4-5 Hours", "6-7 Hours", "Full Day"];

const MAX_PRICE = 500;

export default function ToursListing() {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    categories: [],
    locations: [],
    priceRange: [0, MAX_PRICE],
    durations: [],
  });
  const [sortBy, setSortBy] = useState("recommended");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredTours = useMemo(() => {
    let result = [...allTours];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (tour) =>
          tour.title.toLowerCase().includes(searchLower) ||
          tour.location.toLowerCase().includes(searchLower) ||
          tour.category.toLowerCase().includes(searchLower)
      );
    }

    // Category filter
    if (filters.categories.length > 0) {
      result = result.filter((tour) =>
        filters.categories.includes(tour.category)
      );
    }

    // Location filter
    if (filters.locations.length > 0) {
      result = result.filter((tour) =>
        filters.locations.includes(tour.location)
      );
    }

    // Price filter
    result = result.filter(
      (tour) =>
        tour.price >= filters.priceRange[0] &&
        tour.price <= filters.priceRange[1]
    );

    // Duration filter
    if (filters.durations.length > 0) {
      result = result.filter((tour) =>
        filters.durations.includes(tour.duration)
      );
    }

    // Sorting
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "popular":
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        // recommended - keep original order
        break;
    }

    return result;
  }, [filters, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link
              to="/"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground font-medium">All Tours</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 to-accent py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
            Explore Tours & Activities
          </h1>
          <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
            Discover amazing experiences in Dubai and beyond. From thrilling desert
            safaris to iconic landmarks, find your perfect adventure.
          </p>
          <div className="max-w-2xl mx-auto">
            <TourSearchBar
              value={filters.search}
              onChange={(search) => setFilters({ ...filters, search })}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <TourFilters
            filters={filters}
            onFiltersChange={setFilters}
            categories={categories}
            locations={locations}
            durations={durations}
            maxPrice={MAX_PRICE}
          />

          {/* Tours Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                {/* Mobile Filter Button is rendered inside TourFilters */}
                <div className="lg:hidden">
                  <TourFilters
                    filters={filters}
                    onFiltersChange={setFilters}
                    categories={categories}
                    locations={locations}
                    durations={durations}
                    maxPrice={MAX_PRICE}
                  />
                </div>
                <p className="text-muted-foreground">
                  <span className="font-medium text-foreground">
                    {filteredTours.length}
                  </span>{" "}
                  tours found
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-44">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recommended">Recommended</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Toggle */}
                <div className="hidden sm:flex items-center border border-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={cn(
                      "p-2 transition-colors",
                      viewMode === "grid"
                        ? "bg-primary text-primary-foreground"
                        : "bg-card text-muted-foreground hover:bg-muted"
                    )}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={cn(
                      "p-2 transition-colors",
                      viewMode === "list"
                        ? "bg-primary text-primary-foreground"
                        : "bg-card text-muted-foreground hover:bg-muted"
                    )}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            <div className="mb-6">
              <ActiveFilters
                filters={filters}
                onFiltersChange={setFilters}
                maxPrice={MAX_PRICE}
              />
            </div>

            {/* Tours Grid/List */}
            {filteredTours.length > 0 ? (
              <div
                className={cn(
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                    : "space-y-4"
                )}
              >
                {filteredTours.map((tour) => (
                  <TourCard key={tour.id} {...tour} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                  <Grid3X3 className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No tours found
                </h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters or search terms
                </p>
                <Button
                  onClick={() =>
                    setFilters({
                      search: "",
                      categories: [],
                      locations: [],
                      priceRange: [0, MAX_PRICE],
                      durations: [],
                    })
                  }
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
