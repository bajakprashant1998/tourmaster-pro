import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";

export interface Tour {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  short_description: string | null;
  duration: string;
  group_size: string | null;
  price: number;
  original_price: number | null;
  discount_percent: number | null;
  rating: number | null;
  review_count: number | null;
  booking_count: number | null;
  category_id: string | null;
  location_id: string | null;
  images: string[] | null;
  main_image: string | null;
  highlights: string[] | null;
  includes: string[] | null;
  excludes: string[] | null;
  itinerary: ItineraryItem[] | null;
  is_bestseller: boolean | null;
  is_featured: boolean | null;
  status: string | null;
  category?: Category | null;
  location?: Location | null;
}

export interface ItineraryItem {
  time: string;
  title: string;
  description: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string | null;
  tour_count: number | null;
}

export interface Location {
  id: string;
  name: string;
  slug: string;
  country: string | null;
}

export interface PricingOption {
  id: string;
  tour_id: string;
  name: string;
  price: number;
  original_price: number | null;
  description: string | null;
  sort_order: number | null;
}

export interface Review {
  id: string;
  tour_id: string;
  booking_id: string | null;
  author_name: string;
  author_avatar: string | null;
  rating: number;
  title: string | null;
  comment: string;
  helpful_count: number | null;
  status: string | null;
  created_at: string;
}

function parseItinerary(json: Json | null): ItineraryItem[] | null {
  if (!json) return null;
  if (Array.isArray(json)) {
    return json as unknown as ItineraryItem[];
  }
  return null;
}

function transformTour(data: unknown): Tour {
  const raw = data as Record<string, unknown>;
  return {
    ...raw,
    itinerary: parseItinerary(raw.itinerary as Json | null),
  } as Tour;
}

export function useTours(options?: { locationId?: string; categoryId?: string; featured?: boolean; bestseller?: boolean; limit?: number }) {
  return useQuery({
    queryKey: ["tours", options],
    queryFn: async () => {
      let query = supabase
        .from("tours")
        .select(`
          *,
          category:categories(*),
          location:locations(*)
        `)
        .eq("status", "active");

      if (options?.locationId) {
        query = query.eq("location_id", options.locationId);
      }
      if (options?.categoryId) {
        query = query.eq("category_id", options.categoryId);
      }
      if (options?.featured) {
        query = query.eq("is_featured", true);
      }
      if (options?.bestseller) {
        query = query.eq("is_bestseller", true);
      }
      if (options?.limit) {
        query = query.limit(options.limit);
      }

      const { data, error } = await query.order("booking_count", { ascending: false });
      
      if (error) throw error;
      return (data ?? []).map(transformTour);
    },
  });
}

export function useTour(slug: string) {
  return useQuery({
    queryKey: ["tour", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tours")
        .select(`
          *,
          category:categories(*),
          location:locations(*)
        `)
        .eq("slug", slug)
        .eq("status", "active")
        .maybeSingle();

      if (error) throw error;
      return data ? transformTour(data) : null;
    },
    enabled: !!slug,
  });
}

export function useTourPricingOptions(tourId: string) {
  return useQuery({
    queryKey: ["tour-pricing", tourId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tour_pricing_options")
        .select("*")
        .eq("tour_id", tourId)
        .order("sort_order");

      if (error) throw error;
      return data as PricingOption[];
    },
    enabled: !!tourId,
  });
}

export function useTourReviews(tourId: string) {
  return useQuery({
    queryKey: ["tour-reviews", tourId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("tour_id", tourId)
        .eq("status", "approved")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Review[];
    },
    enabled: !!tourId,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name");

      if (error) throw error;
      return data as Category[];
    },
  });
}

export function useLocations() {
  return useQuery({
    queryKey: ["locations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("locations")
        .select("*")
        .order("name");

      if (error) throw error;
      return data as Location[];
    },
  });
}

export function useToursByLocation(locationSlug: string, limit?: number) {
  return useQuery({
    queryKey: ["tours-by-location", locationSlug, limit],
    queryFn: async () => {
      const { data: location } = await supabase
        .from("locations")
        .select("id")
        .eq("slug", locationSlug)
        .maybeSingle();

      if (!location) return [];

      let query = supabase
        .from("tours")
        .select(`
          *,
          category:categories(*),
          location:locations(*)
        `)
        .eq("location_id", location.id)
        .eq("status", "active")
        .order("booking_count", { ascending: false });

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;
      if (error) throw error;
      return (data ?? []).map(transformTour);
    },
    enabled: !!locationSlug,
  });
}
