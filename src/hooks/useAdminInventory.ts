import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Generic hook factory for inventory CRUD
function useAdminTable<T extends { id: string }>(
  tableName: "hotels" | "rent_cars" | "holidays" | "things_to_do",
  label: string
) {
  const queryClient = useQueryClient();
  const queryKey = [tableName];

  const { data = [], isLoading } = useQuery({
    queryKey,
    queryFn: async () => {
      const { data, error } = await (supabase as any).from(tableName).select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data as T[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (item: Partial<T>) => {
      const { error } = await (supabase as any).from(tableName).insert(item);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      toast.success(`${label} created successfully`);
    },
    onError: (err: any) => toast.error(err.message),
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<T> & { id: string }) => {
      const { error } = await (supabase as any).from(tableName).update(updates).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      toast.success(`${label} updated successfully`);
    },
    onError: (err: any) => toast.error(err.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await (supabase as any).from(tableName).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      toast.success(`${label} deleted successfully`);
    },
    onError: (err: any) => toast.error(err.message),
  });

  return { data, isLoading, create: createMutation.mutate, update: updateMutation.mutate, remove: deleteMutation.mutate };
}

// -- Typed interfaces --
export interface Hotel {
  id: string;
  name: string;
  location: string;
  rating: number;
  rooms: number;
  price: number;
  status: string;
  image: string | null;
  description: string | null;
  created_at: string;
}

export interface RentCar {
  id: string;
  name: string;
  type: string;
  seats: number;
  fuel: string;
  price: number;
  status: string;
  image: string | null;
  description: string | null;
  created_at: string;
}

export interface Holiday {
  id: string;
  name: string;
  duration: string;
  price: number;
  status: string;
  image: string | null;
  description: string | null;
  bookings: number;
  created_at: string;
}

export interface ThingToDo {
  id: string;
  name: string;
  location: string;
  category: string;
  rating: number;
  price: number;
  status: string;
  is_featured: boolean;
  image: string | null;
  description: string | null;
  created_at: string;
}

export const useAdminHotels = () => useAdminTable<Hotel>("hotels", "Hotel");
export const useAdminRentCars = () => useAdminTable<RentCar>("rent_cars", "Rent car");
export const useAdminHolidays = () => useAdminTable<Holiday>("holidays", "Holiday package");
export const useAdminThingsToDo = () => useAdminTable<ThingToDo>("things_to_do", "Activity");
