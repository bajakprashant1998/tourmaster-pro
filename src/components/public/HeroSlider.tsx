import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=80",
    title: "Explore Dubai's Wonders",
    subtitle: "Unforgettable tours and experiences at the best prices",
    cta: "View All Tours",
    ctaLink: "/tours",
  },
  {
    image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1920&q=80",
    title: "Desert Safari Adventures",
    subtitle: "Experience the magic of the Arabian desert",
    cta: "Book Safari",
    ctaLink: "/desert-safari",
  },
  {
    image: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=1920&q=80",
    title: "Visa Assistance Services",
    subtitle: "Hassle-free visa processing for all destinations",
    cta: "Apply Now",
    ctaLink: "/visa-services",
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative h-full container mx-auto px-4 flex items-center">
            <div className="max-w-2xl text-white">
              <h1 
                className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 transition-all duration-700 delay-100 ${
                  index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
              >
                {slide.title}
              </h1>
              <p 
                className={`text-lg md:text-xl text-white/90 mb-8 transition-all duration-700 delay-200 ${
                  index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
              >
                {slide.subtitle}
              </p>
              <Button 
                size="lg"
                className={`bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg transition-all duration-700 delay-300 ${
                  index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
              >
                {slide.cta}
              </Button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full text-white transition-colors"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full text-white transition-colors"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide 
                ? "w-8 bg-primary" 
                : "w-2 bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
