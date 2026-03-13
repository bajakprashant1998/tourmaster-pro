
-- Pricing rules table for seasonal, early bird, last-minute, group, and promo code discounts
CREATE TABLE public.pricing_rules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  rule_type text NOT NULL DEFAULT 'seasonal',
  -- Rule types: seasonal, early_bird, last_minute, group_size, promo_code
  
  -- Discount
  discount_type text NOT NULL DEFAULT 'percentage',
  -- percentage or fixed
  discount_value numeric NOT NULL DEFAULT 0,
  
  -- Date range (seasonal / validity)
  start_date date,
  end_date date,
  
  -- Early bird: days before tour date
  days_before_min integer,
  days_before_max integer,
  
  -- Last minute: hours before tour
  hours_before integer,
  
  -- Group size
  min_group_size integer,
  max_group_size integer,
  
  -- Promo code
  promo_code text,
  usage_limit integer,
  usage_count integer NOT NULL DEFAULT 0,
  
  -- Scope: null = global, otherwise specific tour
  tour_id uuid REFERENCES public.tours(id) ON DELETE CASCADE,
  
  -- Priority for stacking rules
  priority integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.pricing_rules ENABLE ROW LEVEL SECURITY;

-- Admin full access
CREATE POLICY "Admins can manage pricing_rules"
  ON public.pricing_rules FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Public can view active rules (for price calculation)
CREATE POLICY "Anyone can view active pricing_rules"
  ON public.pricing_rules FOR SELECT TO public
  USING (is_active = true);

-- Updated at trigger
CREATE TRIGGER set_pricing_rules_updated_at
  BEFORE UPDATE ON public.pricing_rules
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
