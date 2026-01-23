import { Shield, ThumbsUp, Headphones, BadgePercent, Clock, Users } from "lucide-react";

const features = [
  {
    icon: BadgePercent,
    title: "Best Price Guarantee",
    description: "We match any competitor's price for the same tour or activity.",
  },
  {
    icon: Headphones,
    title: "24/7 Customer Support",
    description: "Our team is available around the clock to assist you.",
  },
  {
    icon: Shield,
    title: "Secure Booking",
    description: "Your payment and personal data are always protected.",
  },
  {
    icon: ThumbsUp,
    title: "Verified Reviews",
    description: "Real reviews from real travelers you can trust.",
  },
  {
    icon: Clock,
    title: "Instant Confirmation",
    description: "Get immediate booking confirmation via email.",
  },
  {
    icon: Users,
    title: "Expert Local Guides",
    description: "Knowledgeable guides who bring destinations to life.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 bg-sidebar text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose BetterView Tourism?
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            We're committed to providing exceptional travel experiences with unmatched service and value.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="flex items-start gap-4 p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
              >
                <div className="p-3 bg-primary rounded-lg flex-shrink-0">
                  <Icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-white/70 text-sm">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
