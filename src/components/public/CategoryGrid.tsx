import { Link } from "react-router-dom";
import { Building2, Compass, Ship, Ticket, Mountain, LucideIcon } from "lucide-react";
import { useCategories } from "@/hooks/useTours";
import { Skeleton } from "@/components/ui/skeleton";

const categoryIcons: Record<string, LucideIcon> = {
  "city-tours": Building2,
  "desert-safari": Compass,
  "water-activities": Ship,
  "theme-parks": Ticket,
  "cultural-tours": Building2,
  "adventure-sports": Mountain,
};

const categoryColors: Record<string, string> = {
  "city-tours": "from-blue-500/80 to-blue-600/80",
  "desert-safari": "from-amber-500/80 to-orange-600/80",
  "water-activities": "from-cyan-500/80 to-teal-600/80",
  "theme-parks": "from-purple-500/80 to-pink-600/80",
  "cultural-tours": "from-rose-500/80 to-red-600/80",
  "adventure-sports": "from-emerald-500/80 to-green-600/80",
};

const CategoryGrid = () => {
  const { data: categories = [], isLoading } = useCategories();

  if (isLoading) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Skeleton className="h-10 w-72 mx-auto mb-4" />
            <Skeleton className="h-5 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-48 md:h-56 rounded-2xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Explore Our Categories
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose from our wide range of tours and activities designed to give you the best experience in Dubai
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => {
            const Icon = categoryIcons[category.slug] || Compass;
            const colorClass = categoryColors[category.slug] || "from-gray-500/80 to-gray-600/80";
            
            return (
              <Link
                key={category.id}
                to={`/tours-listing?category=${category.slug}`}
                className="group relative h-48 md:h-56 rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${category.image || "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400"})` }}
                />
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${colorClass}`} />
                
                {/* Content */}
                <div className="relative h-full flex flex-col items-center justify-center text-white p-4 text-center">
                  <div className="p-3 bg-white/20 rounded-full mb-3 backdrop-blur-sm">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
                  <p className="text-sm text-white/80">{category.tour_count || 0} tours</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
