import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface CreateBookingData {
  tour_id: string;
  pricing_option_id?: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  tour_date: string;
  adults: number;
  children: number;
  total_amount: number;
  notes?: string;
}

export function useCreateBooking() {
  return useMutation({
    mutationFn: async (data: CreateBookingData) => {
      // Generate a booking reference client-side as fallback
      const bookingRef = `BK-${crypto.randomUUID().substring(0, 8).toUpperCase()}`;
      
      const { data: booking, error } = await supabase
        .from("bookings")
        .insert({
          booking_ref: bookingRef,
          tour_id: data.tour_id,
          pricing_option_id: data.pricing_option_id || null,
          customer_name: data.customer_name,
          customer_email: data.customer_email,
          customer_phone: data.customer_phone || null,
          tour_date: data.tour_date,
          adults: data.adults,
          children: data.children || 0,
          total_amount: data.total_amount,
          notes: data.notes || null,
        })
        .select()
        .single();

      if (error) throw error;
      return booking;
    },
    onSuccess: (data) => {
      toast.success("Booking submitted successfully!", {
        description: `Your booking reference is ${data.booking_ref}`,
      });
    },
    onError: (error) => {
      toast.error("Failed to submit booking", {
        description: error.message,
      });
    },
  });
}
