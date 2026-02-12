import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export interface LocationRow {
  id: string;
  name: string;
  slug: string;
  country: string | null;
  created_at: string;
  tour_count: number;
}

export function useAdminLocations() {
  return useQuery({
    queryKey: ["admin-locations"],
    queryFn: async () => {
      // Fetch locations
      const { data: locations, error } = await supabase
        .from("locations")
        .select("*")
        .order("name");
      if (error) throw error;

      // Fetch tour counts per location
      const { data: tours, error: toursError } = await supabase
        .from("tours")
        .select("location_id");
      if (toursError) throw toursError;

      const countMap: Record<string, number> = {};
      tours?.forEach((t) => {
        if (t.location_id) {
          countMap[t.location_id] = (countMap[t.location_id] || 0) + 1;
        }
      });

      return (locations || []).map((loc) => ({
        ...loc,
        tour_count: countMap[loc.id] || 0,
      })) as LocationRow[];
    },
  });
}

export function useCreateLocation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { name: string; slug: string; country: string }) => {
      const { error } = await supabase.from("locations").insert(data);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-locations"] });
      toast({ title: "Location created" });
    },
    onError: (err: Error) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });
}

export function useUpdateLocation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...data }: { id: string; name: string; slug: string; country: string }) => {
      const { error } = await supabase.from("locations").update(data).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-locations"] });
      toast({ title: "Location updated" });
    },
    onError: (err: Error) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });
}

export function useDeleteLocation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("locations").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-locations"] });
      toast({ title: "Location deleted" });
    },
    onError: (err: Error) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });
}
