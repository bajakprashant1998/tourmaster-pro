import { useState } from "react";
import { Phone, Mail, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { 
      label: "Activities", 
      href: "/activities",
      submenu: [
        { label: "City Tours", href: "/city-tours" },
        { label: "Desert Safari", href: "/desert-safari" },
        { label: "Yacht Tours", href: "/yacht-tours" },
      ]
    },
    { label: "Theme Parks", href: "/theme-parks" },
    { label: "Visa", href: "/visa-services" },
    { label: "Hotels", href: "/hotels" },
    { label: "Combo Deals", href: "/combo-deals" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-card shadow-sm">
      {/* Top Bar */}
      <div className="bg-primary">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-2 text-sm text-primary-foreground">
            <div className="flex items-center gap-6">
              <a href="tel:+971585725692" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <Phone className="h-4 w-4" />
                <span className="hidden sm:inline">+971 58 572 5692</span>
              </a>
              <a href="mailto:info@betterviewtourism.com" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <Mail className="h-4 w-4" />
                <span className="hidden sm:inline">info@betterviewtourism.com</span>
              </a>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden md:inline">Best Price Guarantee</span>
              <span className="hidden lg:inline">24/7 Customer Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3">
            <img 
              src="/dibull_logo.png" 
              alt="BetterView Tourism" 
              className="h-10 w-auto"
            />
            <span className="text-xl font-bold text-foreground hidden sm:block">
              BetterView
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div key={item.label} className="relative group">
                <a
                  href={item.href}
                  className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                  {item.submenu && <ChevronDown className="h-4 w-4" />}
                </a>
                {item.submenu && (
                  <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="bg-card rounded-lg shadow-dropdown border border-border py-2 min-w-[180px]">
                      {item.submenu.map((subItem) => (
                        <a
                          key={subItem.label}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                        >
                          {subItem.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <Button className="bg-primary hover:bg-primary/90">
              Book Now
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-card">
          <nav className="container mx-auto px-4 py-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block py-3 text-foreground hover:text-primary transition-colors border-b border-border last:border-0"
              >
                {item.label}
              </a>
            ))}
            <Button className="w-full mt-4 bg-primary hover:bg-primary/90">
              Book Now
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
