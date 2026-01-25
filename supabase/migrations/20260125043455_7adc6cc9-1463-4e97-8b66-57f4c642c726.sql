-- Fix function search_path for generate_booking_ref
CREATE OR REPLACE FUNCTION public.generate_booking_ref()
RETURNS TRIGGER 
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.booking_ref := 'BK-' || UPPER(SUBSTRING(gen_random_uuid()::text, 1, 8));
  RETURN NEW;
END;
$$;