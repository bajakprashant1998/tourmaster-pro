import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileCheck, Clock, Shield } from "lucide-react";

const visaTypes = [
  {
    id: "1",
    country: "Schengen Visa",
    flag: "🇪🇺",
    price: 350,
    processingTime: "15-20 days",
    validity: "Up to 90 days",
  },
  {
    id: "2",
    country: "UK Visa",
    flag: "🇬🇧",
    price: 450,
    processingTime: "15-20 days",
    validity: "Up to 6 months",
  },
  {
    id: "3",
    country: "Thailand Visa",
    flag: "🇹🇭",
    price: 150,
    processingTime: "3-5 days",
    validity: "60 days",
  },
  {
    id: "4",
    country: "Turkey Visa",
    flag: "🇹🇷",
    price: 120,
    processingTime: "3-5 days",
    validity: "30 days",
  },
];

const features = [
  {
    icon: FileCheck,
    title: "Easy Documentation",
    description: "Simple document submission process",
  },
  {
    icon: Clock,
    title: "Fast Processing",
    description: "Quick turnaround times",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Your documents are safe with us",
  },
];

const VisaSection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-primary/10">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            International Visa Services
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Hassle-Free Visa Assistance
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get your visa processed quickly and efficiently. We handle all the paperwork so you can focus on planning your trip.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="flex items-start gap-4 p-6 bg-card rounded-xl shadow-card"
              >
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Visa Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visaTypes.map((visa) => (
            <div
              key={visa.id}
              className="bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 text-center"
            >
              <div className="text-5xl mb-4">{visa.flag}</div>
              <h3 className="font-semibold text-lg text-foreground mb-2">
                {visa.country}
              </h3>
              <div className="space-y-1 text-sm text-muted-foreground mb-4">
                <p>Processing: {visa.processingTime}</p>
                <p>Validity: {visa.validity}</p>
              </div>
              <div className="mb-4">
                <span className="text-2xl font-bold text-primary">
                  {visa.price} AED
                </span>
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90">
                Enquire Now
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisaSection;
