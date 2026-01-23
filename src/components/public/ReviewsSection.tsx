import { Star, Quote } from "lucide-react";

const reviews = [
  {
    id: "1",
    name: "Sarah Johnson",
    location: "United Kingdom",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    text: "Amazing experience! The desert safari was absolutely breathtaking. Our guide was knowledgeable and friendly. Highly recommend!",
    tour: "Desert Safari with BBQ",
  },
  {
    id: "2",
    name: "Michael Chen",
    location: "Australia",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    text: "Best tour company in Dubai! The Burj Khalifa tour was perfectly organized. Will definitely book again on my next visit.",
    tour: "Dubai City Tour",
  },
  {
    id: "3",
    name: "Emma Martinez",
    location: "Spain",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
    text: "The yacht tour exceeded our expectations. Beautiful sunset views and excellent service. A must-do experience in Dubai!",
    tour: "Luxury Yacht Tour",
  },
];

const platforms = [
  {
    name: "TripAdvisor",
    logo: "https://static.tacdn.com/img2/brand_refresh/Tripadvisor_lockup_horizontal_secondary_registered.svg",
    rating: 5.0,
    reviews: "2,500+",
  },
  {
    name: "Google",
    logo: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_160x56dp.png",
    rating: 4.9,
    reviews: "1,800+",
  },
];

const ReviewsSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Our Travelers Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of happy travelers who have experienced unforgettable adventures with us
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300"
            >
              <Quote className="h-8 w-8 text-primary/20 mb-4" />
              
              <div className="flex items-center gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                ))}
              </div>

              <p className="text-foreground mb-4 line-clamp-4">{review.text}</p>
              
              <p className="text-sm text-primary font-medium mb-4">{review.tour}</p>

              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-foreground">{review.name}</p>
                  <p className="text-sm text-muted-foreground">{review.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Platform Ratings */}
        <div className="bg-muted/50 rounded-2xl p-8">
          <h3 className="text-center text-xl font-semibold text-foreground mb-8">
            Trusted Across Platforms
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {platforms.map((platform) => (
              <div key={platform.name} className="text-center">
                <img
                  src={platform.logo}
                  alt={platform.name}
                  className="h-8 md:h-10 mx-auto mb-3 object-contain"
                />
                <div className="flex items-center justify-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">{platform.rating}</span>
                  {" "}• {platform.reviews} reviews
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
