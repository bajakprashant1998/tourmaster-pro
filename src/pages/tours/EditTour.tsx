import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import { Eye, Copy, Loader2 } from "lucide-react";
import { useTourById, useTourPricingOptions, useSaveTour } from "@/hooks/useEditTour";
import { useAdminLocations } from "@/hooks/useAdminLocations";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const sections = [
  { id: "content", label: "Content" },
  { id: "options", label: "Options" },
  { id: "pricing", label: "Pricing" },
  { id: "info", label: "Information" },
  { id: "timing", label: "Timing" },
  { id: "gallery", label: "Gallery" },
  { id: "seo", label: "SEO" },
];

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function EditTour() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = !id;

  const { data: tour, isLoading: tourLoading } = useTourById(id);
  const { data: pricingRows } = useTourPricingOptions(id);
  const { data: dbLocations = [] } = useAdminLocations();
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase.from("categories").select("*").order("name");
      if (error) throw error;
      return data;
    },
  });

  const saveMutation = useSaveTour();

  const [activeSection, setActiveSection] = useState("content");
  const [publishStatus, setPublishStatus] = useState<"published" | "draft">("draft");
  const [locationId, setLocationId] = useState("");

  // Form state
  const [tourContent, setTourContent] = useState({
    title: "",
    overview: "",
    category: "",
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
    pricingItems: [] as { id: string; title: string; price: string; transferOption: string; quantity: string }[],
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
    images: [] as { id: string; url: string }[],
    enableFAQs: false,
  });

  const [relatedTours, setRelatedTours] = useState({ tours: [] as string[] });

  const [childAge, setChildAge] = useState({
    adultLabel: "",
    childLabel: "",
    infantLabel: "",
  });

  const [seo, setSeo] = useState({
    metaTitle: "",
    metaKeyword: "",
    metaDescription: "",
    metaTag: "",
  });

  const [homepageSettings, setHomepageSettings] = useState({
    topDubai: false,
    topAbuDhabi: false,
  });

  const [featuredAvailability, setFeaturedAvailability] = useState("always");

  // Load tour data into form
  useEffect(() => {
    if (!tour) return;

    setTourContent({
      title: tour.title || "",
      overview: tour.description || "",
      category: tour.category_id || "",
      youtubeUrl: tour.youtube_url || "",
      disableAddToCart: tour.disable_add_to_cart || false,
    });

    setTourOptions({
      duration: tour.duration || "",
      durationUnit: (tour.duration_unit as "minutes" | "hours") || "hours",
      pickupTime: tour.pickup_time || "",
      dropbackTime: tour.dropback_time || "",
    });

    setPricing((prev) => ({
      ...prev,
      tourPrice: tour.original_price?.toString() || tour.price?.toString() || "",
      salePrice: tour.original_price ? tour.price?.toString() || "" : "",
    }));

    setInformation({
      minPeople: tour.min_people?.toString() || "",
      maxPeople: tour.max_people?.toString() || "",
      blocks: Array.isArray(tour.information_blocks) && (tour.information_blocks as any[]).length > 0
        ? (tour.information_blocks as any[])
        : [
            { id: "include", title: "Include", items: [{ id: "1", value: "" }] },
            { id: "whyGo", title: "Why Should I go for This?", items: [{ id: "2", value: "" }] },
            { id: "important", title: "Important Information", items: [{ id: "3", value: "" }] },
            { id: "additional", title: "Additional Information", items: [{ id: "4", value: "" }] },
            { id: "operating", title: "Operating Hours", items: [{ id: "5", value: "" }] },
            { id: "booking", title: "Booking Policy", items: [{ id: "6", value: "" }] },
            { id: "child", title: "Child Policy", items: [{ id: "7", value: "" }] },
          ],
    });

    setActivityTiming({
      title: tour.activity_timing_title || "",
      items: Array.isArray(tour.activity_timing_items) && (tour.activity_timing_items as any[]).length > 0
        ? (tour.activity_timing_items as any[])
        : [{ id: "1", leftHeading: "", rightDescription: "" }],
    });

    setGallery({
      images: (tour.images || []).map((url: string, i: number) => ({ id: String(i), url })),
      enableFAQs: tour.enable_faqs || false,
    });

    setRelatedTours({ tours: tour.related_tour_ids || [] });

    setChildAge({
      adultLabel: tour.child_age_adult_label || "",
      childLabel: tour.child_age_child_label || "",
      infantLabel: tour.child_age_infant_label || "",
    });

    setSeo({
      metaTitle: tour.seo_meta_title || "",
      metaKeyword: tour.seo_meta_keyword || "",
      metaDescription: tour.seo_meta_description || "",
      metaTag: tour.seo_meta_tag || "",
    });

    setPublishStatus(tour.status === "active" ? "published" : "draft");
    setLocationId(tour.location_id || "");
    setHomepageSettings({
      topDubai: tour.homepage_top_dubai || false,
      topAbuDhabi: tour.homepage_top_abudhabi || false,
    });
    setFeaturedAvailability(tour.featured_availability || "always");
  }, [tour]);

  // Load pricing options
  useEffect(() => {
    if (!pricingRows) return;
    setPricing((prev) => ({
      ...prev,
      pricingItems: pricingRows.map((r) => ({
        id: r.id,
        title: r.name,
        price: r.price.toString(),
        transferOption: r.transfer_option || "",
        quantity: r.quantity || "",
      })),
    }));
  }, [pricingRows]);

  // Calculate progress
  const calculateProgress = () => {
    let filled = 0;
    const total = 10;
    if (tourContent.title) filled++;
    if (tourContent.overview) filled++;
    if (tourContent.category) filled++;
    if (tourOptions.duration) filled++;
    if (pricing.tourPrice) filled++;
    if (seo.metaTitle) filled++;
    if (seo.metaDescription) filled++;
    if (information.blocks.some((b) => b.items.some((i) => i.value))) filled++;
    if (childAge.adultLabel) filled++;
    if (locationId) filled++;
    return Math.round((filled / total) * 100);
  };

  const handleSave = () => {
    const salePrice = parseFloat(pricing.salePrice) || 0;
    const tourPrice = parseFloat(pricing.tourPrice) || 0;
    const hasSale = salePrice > 0 && salePrice < tourPrice;

    const data: any = {
      title: tourContent.title,
      slug: slugify(tourContent.title),
      description: tourContent.overview,
      category_id: tourContent.category || null,
      youtube_url: tourContent.youtubeUrl || null,
      disable_add_to_cart: tourContent.disableAddToCart,
      duration: tourOptions.duration || "1",
      duration_unit: tourOptions.durationUnit,
      pickup_time: tourOptions.pickupTime || null,
      dropback_time: tourOptions.dropbackTime || null,
      price: hasSale ? salePrice : tourPrice,
      original_price: hasSale ? tourPrice : null,
      discount_percent: hasSale ? Math.round(((tourPrice - salePrice) / tourPrice) * 100) : 0,
      min_people: information.minPeople ? parseInt(information.minPeople) : null,
      max_people: information.maxPeople ? parseInt(information.maxPeople) : null,
      information_blocks: information.blocks,
      activity_timing_title: activityTiming.title || null,
      activity_timing_items: activityTiming.items,
      images: gallery.images.map((img) => img.url),
      enable_faqs: gallery.enableFAQs,
      child_age_adult_label: childAge.adultLabel || null,
      child_age_child_label: childAge.childLabel || null,
      child_age_infant_label: childAge.infantLabel || null,
      seo_meta_title: seo.metaTitle || null,
      seo_meta_keyword: seo.metaKeyword || null,
      seo_meta_description: seo.metaDescription || null,
      seo_meta_tag: seo.metaTag || null,
      status: publishStatus === "published" ? "active" : "draft",
      location_id: locationId || null,
      homepage_top_dubai: homepageSettings.topDubai,
      homepage_top_abudhabi: homepageSettings.topAbuDhabi,
      featured_availability: featuredAvailability,
      related_tour_ids: relatedTours.tours,
    };

    const pricingOptions = pricing.pricingItems.map((item, i) => ({
      name: item.title,
      price: parseFloat(item.price) || 0,
      transfer_option: item.transferOption,
      quantity: item.quantity,
      sort_order: i,
    }));

    saveMutation.mutate(
      { id, data, pricingOptions },
      {
        onSuccess: (tourId) => {
          if (isNew && tourId) {
            navigate(`/tours/edit/${tourId}`, { replace: true });
          }
        },
      }
    );
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (tourLoading && !isNew) {
    return (
      <AdminLayout title="Edit Tour" breadcrumb={["Home", "Tours", "Edit Tour"]}>
        <div className="flex items-center justify-center p-20">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title={isNew ? "Add Tour" : "Edit Tour"} breadcrumb={["Home", "Tours", isNew ? "Add Tour" : "Edit Tour"]}>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-foreground">{isNew ? "Add Tour" : "Edit Tour"}</h1>
        <div className="flex items-center gap-3">
          {!isNew && (
            <Button variant="outline" className="gap-2">
              <Eye className="w-4 h-4" />
              Preview Tour Page
            </Button>
          )}
          <Button variant="outline" onClick={() => navigate("/tours")}>
            View Tours
          </Button>
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
        {/* Left Column */}
        <div className="space-y-6">
          <div id="content">
            <TourContentSection
              data={tourContent}
              onChange={setTourContent}
              categories={categories}
            />
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
            <ActivityTimingSection data={activityTiming} onChange={setActivityTiming} />
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

        {/* Right Column */}
        <div className="lg:sticky lg:top-36 lg:self-start">
          <RightPanelWidgets
            publishStatus={publishStatus}
            onPublishChange={setPublishStatus}
            onSave={handleSave}
            lastSaved={saveMutation.isPending ? "Saving..." : saveMutation.isSuccess ? "Saved" : ""}
            location={locationId}
            onLocationChange={setLocationId}
            locations={dbLocations}
            homepageSettings={homepageSettings}
            onHomepageChange={setHomepageSettings}
            isSaving={saveMutation.isPending}
          />
        </div>
      </div>
    </AdminLayout>
  );
}
