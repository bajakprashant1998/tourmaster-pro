import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import type { Json } from "@/integrations/supabase/types";

export interface TourFormData {
  // Content
  title: string;
  slug: string;
  description: string;
  short_description: string;
  category_id: string | null;
  youtube_url: string;
  disable_add_to_cart: boolean;
  // Options
  duration: string;
  duration_unit: string;
  pickup_time: string;
  dropback_time: string;
  // Pricing
  price: number;
  original_price: number | null;
  discount_percent: number | null;
  // Information
  min_people: number | null;
  max_people: number | null;
  information_blocks: Json;
  // Timing
  activity_timing_title: string;
  activity_timing_items: Json;
  // Gallery
  images: string[];
  main_image: string | null;
  enable_faqs: boolean;
  // Child age
  child_age_adult_label: string;
  child_age_child_label: string;
  child_age_infant_label: string;
  // SEO
  seo_meta_title: string;
  seo_meta_keyword: string;
  seo_meta_description: string;
  seo_meta_tag: string;
  // Right panel
  status: string;
  location_id: string | null;
  homepage_top_dubai: boolean;
  homepage_top_abudhabi: boolean;
  homepage_image_url: string | null;
  mobile_feature_image_url: string | null;
  banner_image_url: string | null;
  featured_availability: string;
  related_tour_ids: string[];
}

export interface PricingOption {
  id?: string;
  name: string;
  price: number;
  original_price?: number | null;
  transfer_option: string;
  quantity: string;
  sort_order: number;
}

export function useTourById(id: string | undefined) {
  return useQuery({
    queryKey: ["admin-tour", id],
    enabled: !!id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tours")
        .select("*, category:categories(*), location:locations(*)")
        .eq("id", id!)
        .single();
      if (error) throw error;
      return data;
    },
  });
}

export function useTourPricingOptions(tourId: string | undefined) {
  return useQuery({
    queryKey: ["tour-pricing", tourId],
    enabled: !!tourId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tour_pricing_options")
        .select("*")
        .eq("tour_id", tourId!)
        .order("sort_order");
      if (error) throw error;
      return data;
    },
  });
}

export function useSaveTour() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      data,
      pricingOptions,
    }: {
      id?: string;
      data: Partial<TourFormData>;
      pricingOptions?: PricingOption[];
    }) => {
      let tourId = id;

      if (tourId) {
        // Update
        const { error } = await supabase.from("tours").update(data).eq("id", tourId);
        if (error) throw error;
      } else {
        // Insert
        const { data: newTour, error } = await supabase
          .from("tours")
          .insert({
            title: data.title || "Untitled Tour",
            slug: data.slug || "untitled-tour-" + Date.now(),
            duration: data.duration || "1",
            price: data.price || 0,
            ...data,
          } as any)
          .select("id")
          .single();
        if (error) throw error;
        tourId = newTour.id;
      }

      // Sync pricing options
      if (pricingOptions && tourId) {
        // Delete existing
        await supabase.from("tour_pricing_options").delete().eq("tour_id", tourId);
        // Insert new
        if (pricingOptions.length > 0) {
          const rows = pricingOptions.map((opt, i) => ({
            tour_id: tourId!,
            name: opt.name,
            price: opt.price,
            original_price: opt.original_price || null,
            transfer_option: opt.transfer_option || null,
            quantity: opt.quantity || null,
            sort_order: i,
          }));
          const { error: pErr } = await supabase.from("tour_pricing_options").insert(rows);
          if (pErr) throw pErr;
        }
      }

      return tourId;
    },
    onSuccess: (tourId) => {
      queryClient.invalidateQueries({ queryKey: ["admin-tours"] });
      queryClient.invalidateQueries({ queryKey: ["admin-tour", tourId] });
      queryClient.invalidateQueries({ queryKey: ["tour-pricing", tourId] });
      toast({ title: "Tour saved successfully" });
    },
    onError: (err: Error) => {
      toast({ title: "Error saving tour", description: err.message, variant: "destructive" });
    },
  });
}
