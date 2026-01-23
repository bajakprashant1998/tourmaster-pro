import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { label: "City Tours", href: "/city-tours" },
    { label: "Desert Safari", href: "/desert-safari" },
    { label: "Yacht Tours", href: "/yacht-tours" },
    { label: "Theme Parks", href: "/theme-parks" },
    { label: "Combo Deals", href: "/combo-deals" },
  ];

  const supportLinks = [
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "FAQs", href: "/faqs" },
  ];

  return (
    <footer className="bg-sidebar text-sidebar-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/dibull_logo.png" 
                alt="BetterView Tourism" 
                className="h-10 w-auto brightness-0 invert"
              />
              <span className="text-xl font-bold text-white">
                BetterView
              </span>
            </div>
            <p className="text-sidebar-foreground/80 text-sm leading-relaxed mb-4">
              Your trusted travel partner in Dubai. We offer the best tours, activities, 
              and experiences at unbeatable prices with 24/7 customer support.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-sidebar-foreground/80 text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-sidebar-foreground/80 text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="tel:+971585725692"
                  className="flex items-start gap-3 text-sidebar-foreground/80 text-sm hover:text-white transition-colors"
                >
                  <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>+971 58 572 5692</span>
                </a>
              </li>
              <li>
                <a 
                  href="mailto:info@betterviewtourism.com"
                  className="flex items-start gap-3 text-sidebar-foreground/80 text-sm hover:text-white transition-colors"
                >
                  <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>info@betterviewtourism.com</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-sidebar-foreground/80 text-sm">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Dubai, United Arab Emirates</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-sidebar-foreground/60">
            <p>© 2024 BetterView Tourism. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <img src="https://cdn-icons-png.flaticon.com/512/349/349221.png" alt="Visa" className="h-6 opacity-60" />
              <img src="https://cdn-icons-png.flaticon.com/512/349/349228.png" alt="Mastercard" className="h-6 opacity-60" />
              <img src="https://cdn-icons-png.flaticon.com/512/6124/6124998.png" alt="Apple Pay" className="h-6 opacity-60" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
