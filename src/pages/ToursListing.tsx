import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ChevronRight, Grid3X3, List, Loader2 } from "lucide-react";
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
import { useTours, useCategories, useLocations } from "@/hooks/useTours";

const MAX_PRICE = 2000;

export default function ToursListing() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category");
  const initialLocation = searchParams.get("location");

  const { data: tours = [], isLoading } = useTours();
  const { data: categoriesData = [] } = useCategories();
  const { data: locationsData = [] } = useLocations();

  const categories = categoriesData.map((c) => c.name);
  const locations = locationsData.map((l) => l.name);
  const durations = ["1-2 Hours", "2-3 Hours", "3 Hours", "4-5 Hours", "6 Hours", "6-7 Hours", "8 Hours", "Full Day"];

  const [filters, setFilters] = useState<FilterState>(() => {
    const initialCategories: string[] = [];
    const initialLocations: string[] = [];

    if (initialCategory) {
      const cat = categoriesData.find((c) => c.slug === initialCategory);
      if (cat) initialCategories.push(cat.name);
    }
    if (initialLocation) {
      const loc = locationsData.find((l) => l.slug === initialLocation);
      if (loc) initialLocations.push(loc.name);
    }

    return {
      search: "",
      categories: initialCategories,
      locations: initialLocations,
      priceRange: [0, MAX_PRICE],
      durations: [],
    };
  });
  const [sortBy, setSortBy] = useState("recommended");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const formattedTours = useMemo(() => {
    return tours.map((tour) => ({
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
      category: tour.category?.name || "Other",
      bookingCount: tour.booking_count || 0,
    }));
  }, [tours]);

  const filteredTours = useMemo(() => {
    let result = [...formattedTours];

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
        filters.durations.some((d) => tour.duration.includes(d.replace("-", " ").replace(" Hours", "")))
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
        result.sort((a, b) => b.bookingCount - a.bookingCount);
        break;
      default:
        // recommended - keep original order (by booking count from API)
        break;
    }

    return result;
  }, [formattedTours, filters, sortBy]);

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
            {isLoading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : filteredTours.length > 0 ? (
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
