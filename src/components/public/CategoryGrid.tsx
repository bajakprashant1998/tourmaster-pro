import { Building2, Compass, Ship, Ticket, Package } from "lucide-react";

const categories = [
  {
    icon: Building2,
    title: "City Tours",
    description: "Explore iconic landmarks",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80",
    href: "/city-tours",
    color: "from-blue-500/80 to-blue-600/80",
  },
  {
    icon: Compass,
    title: "Desert Safari",
    description: "Arabian adventure awaits",
    image: "https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=400&q=80",
    href: "/desert-safari",
    color: "from-amber-500/80 to-orange-600/80",
  },
  {
    icon: Ship,
    title: "Yacht Tours",
    description: "Luxury on the water",
    image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=400&q=80",
    href: "/yacht-tours",
    color: "from-cyan-500/80 to-teal-600/80",
  },
  {
    icon: Ticket,
    title: "Theme Parks",
    description: "Fun for all ages",
    image: "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=400&q=80",
    href: "/theme-parks",
    color: "from-purple-500/80 to-pink-600/80",
  },
  {
    icon: Package,
    title: "Combo Deals",
    description: "Best value packages",
    image: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=400&q=80",
    href: "/combo-deals",
    color: "from-emerald-500/80 to-green-600/80",
  },
];

const CategoryGrid = () => {
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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <a
                key={category.title}
                href={category.href}
                className="group relative h-48 md:h-56 rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${category.image})` }}
                />
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${category.color}`} />
                
                {/* Content */}
                <div className="relative h-full flex flex-col items-center justify-center text-white p-4 text-center">
                  <div className="p-3 bg-white/20 rounded-full mb-3 backdrop-blur-sm">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{category.title}</h3>
                  <p className="text-sm text-white/80">{category.description}</p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
