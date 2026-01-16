import { useState, useRef } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { TourContentSection } from "@/components/admin/tour/TourContentSection";
import { TourOptionsSection } from "@/components/admin/tour/TourOptionsSection";
import { PricingSection } from "@/components/admin/tour/PricingSection";
import { InformationSection } from "@/components/admin/tour/InformationSection";
import { ActivityTimingSection } from "@/components/admin/tour/ActivityTimingSection";
import { GallerySection } from "@/components/admin/tour/GallerySection";
import { RelatedToursSection } from "@/components/admin/tour/RelatedToursSection";
import { ChildAgeSection } from "@/components/admin/tour/ChildAgeSection";
import { SEOSection } from "@/components/admin/tour/SEOSection";
import { RightPanelWidgets } from "@/components/admin/tour/RightPanelWidgets";
import { SectionNavigation } from "@/components/admin/tour/SectionNavigation";
import { Eye, Copy } from "lucide-react";

const sections = [
  { id: "content", label: "Content" },
  { id: "options", label: "Options" },
  { id: "pricing", label: "Pricing" },
  { id: "info", label: "Information" },
  { id: "timing", label: "Timing" },
  { id: "gallery", label: "Gallery" },
  { id: "seo", label: "SEO" },
];

export default function EditTour() {
  const [activeSection, setActiveSection] = useState("content");
  const [lastSaved, setLastSaved] = useState("Last saved 12s ago");
  const [publishStatus, setPublishStatus] = useState<"published" | "draft">("draft");
  const [location, setLocation] = useState("Dubai");

  // Form state
  const [tourContent, setTourContent] = useState({
    title: "Skydive Dubai palm",
    overview:
      "Skydive Palm Drop Zone in Dubai offers one of the world's most exhilarating tandem skydiving experiences. Jump from up to 13,000 feet above the iconic Palm Jumeirah island and freefall at speeds of over 193 km/h (120 mph) before a scenic parachute descent with breathtaking panoramas of Dubai's skyline, blue waters, and luxury landmarks. No prior skydiving experience is required — an expert tandem instructor accompanies you throughout the adventure.",
    category: "Adventure Tours",
    youtubeUrl: "",
    disableAddToCart: false,
  });

  const [tourOptions, setTourOptions] = useState({
    duration: "",
    durationUnit: "hours" as "minutes" | "hours",
    pickupTime: "",
    dropbackTime: "",
  });

  const [pricing, setPricing] = useState({
    tourPrice: "",
    salePrice: "",
    enableServiceFee: false,
    enableExtraFee: false,
    pricingItems: [],
  });

  const [information, setInformation] = useState({
    minPeople: "",
    maxPeople: "",
    blocks: [
      { id: "include", title: "Include", items: [{ id: "1", value: "" }] },
      { id: "whyGo", title: "Why Should I go for This?", items: [{ id: "2", value: "" }] },
      { id: "important", title: "Important Information", items: [{ id: "3", value: "" }] },
      { id: "additional", title: "Additional Information", items: [{ id: "4", value: "" }] },
      { id: "operating", title: "Operating Hours", items: [{ id: "5", value: "" }] },
      { id: "booking", title: "Booking Policy", items: [{ id: "6", value: "" }] },
      { id: "child", title: "Child Policy", items: [{ id: "7", value: "" }] },
    ],
  });

  const [activityTiming, setActivityTiming] = useState({
    title: "",
    items: [{ id: "1", leftHeading: "", rightDescription: "" }],
  });

  const [gallery, setGallery] = useState({
    images: [],
    enableFAQs: false,
  });

  const [relatedTours, setRelatedTours] = useState({
    tours: [],
  });

  const [childAge, setChildAge] = useState({
    adultLabel: "For Museum its above 3 years & Burj Khalifa Above 8 years",
    childLabel: "0-3 years",
    infantLabel: "Below 3 years",
  });

  const [seo, setSeo] = useState({
    metaTitle: "Camel Ride Dubai | Authentic Desert Experience with Betterview Tourism",
    metaKeyword: "UZBEKISTAN .03 NIGHTS IN TASHKENT 29 NOV '25 - 02 DEC '25",
    metaDescription: "",
    metaTag: "",
  });

  const [homepageSettings, setHomepageSettings] = useState({
    topDubai: false,
    topAbuDhabi: false,
  });

  // Calculate progress
  const calculateProgress = () => {
    let filled = 0;
    let total = 10;

    if (tourContent.title) filled++;
    if (tourContent.overview) filled++;
    if (tourContent.category) filled++;
    if (tourOptions.duration) filled++;
    if (pricing.tourPrice) filled++;
    if (seo.metaTitle) filled++;
    if (seo.metaDescription) filled++;
    if (information.blocks.some((b) => b.items.some((i) => i.value))) filled++;
    if (childAge.adultLabel) filled++;
    if (location) filled++;

    return Math.round((filled / total) * 100);
  };

  const handleSave = () => {
    setLastSaved("Last saved just now");
    setTimeout(() => setLastSaved("Last saved 1s ago"), 1000);
  };

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <AdminLayout title="Edit Tour" breadcrumb={["Home", "Tours", "Edit Tour"]}>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-foreground">Edit Tour</h1>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Copy className="w-4 h-4" />
            Clone Tour
          </Button>
          <Button variant="outline" className="gap-2">
            <Eye className="w-4 h-4" />
            Preview Tour Page
          </Button>
          <Button className="bg-primary hover:bg-primary/90">View Tours</Button>
        </div>
      </div>

      {/* Section Navigation */}
      <SectionNavigation
        sections={sections}
        activeSection={activeSection}
        onSectionClick={scrollToSection}
        progress={calculateProgress()}
      />

      {/* Main Content */}
      <div className="grid lg:grid-cols-[1fr,320px] gap-6">
        {/* Left Column - Form Sections */}
        <div className="space-y-6">
          <div id="content">
            <TourContentSection data={tourContent} onChange={setTourContent} />
          </div>

          <div id="options">
            <TourOptionsSection data={tourOptions} onChange={setTourOptions} />
          </div>

          <div id="pricing">
            <PricingSection data={pricing} onChange={setPricing} />
          </div>

          <div id="info">
            <InformationSection data={information} onChange={setInformation} />
          </div>

          <div id="timing">
            <ActivityTimingSection
              data={activityTiming}
              onChange={setActivityTiming}
            />
          </div>

          <div id="gallery">
            <GallerySection data={gallery} onChange={setGallery} />
            <div className="mt-6">
              <RelatedToursSection data={relatedTours} onChange={setRelatedTours} />
            </div>
            <div className="mt-6">
              <ChildAgeSection data={childAge} onChange={setChildAge} />
            </div>
          </div>

          <div id="seo">
            <SEOSection data={seo} onChange={setSeo} />
          </div>
        </div>

        {/* Right Column - Widgets */}
        <div className="lg:sticky lg:top-36 lg:self-start">
          <RightPanelWidgets
            publishStatus={publishStatus}
            onPublishChange={setPublishStatus}
            onSave={handleSave}
            lastSaved={lastSaved}
            location={location}
            onLocationChange={setLocation}
            homepageSettings={homepageSettings}
            onHomepageChange={setHomepageSettings}
          />
        </div>
      </div>
    </AdminLayout>
  );
}
