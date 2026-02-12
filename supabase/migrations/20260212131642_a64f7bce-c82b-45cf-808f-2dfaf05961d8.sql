
-- Extend tours table to persist full admin editor state
ALTER TABLE public.tours
  ADD COLUMN IF NOT EXISTS youtube_url TEXT,
  ADD COLUMN IF NOT EXISTS disable_add_to_cart BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS duration_unit TEXT NOT NULL DEFAULT 'hours',
  ADD COLUMN IF NOT EXISTS pickup_time TEXT,
  ADD COLUMN IF NOT EXISTS dropback_time TEXT,
  ADD COLUMN IF NOT EXISTS min_people INTEGER,
  ADD COLUMN IF NOT EXISTS max_people INTEGER,
  ADD COLUMN IF NOT EXISTS information_blocks JSONB NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS activity_timing_title TEXT,
  ADD COLUMN IF NOT EXISTS activity_timing_items JSONB NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS enable_faqs BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS related_tour_ids UUID[] NOT NULL DEFAULT '{}'::uuid[],
  ADD COLUMN IF NOT EXISTS child_age_adult_label TEXT,
  ADD COLUMN IF NOT EXISTS child_age_child_label TEXT,
  ADD COLUMN IF NOT EXISTS child_age_infant_label TEXT,
  ADD COLUMN IF NOT EXISTS seo_meta_title TEXT,
  ADD COLUMN IF NOT EXISTS seo_meta_keyword TEXT,
  ADD COLUMN IF NOT EXISTS seo_meta_description TEXT,
  ADD COLUMN IF NOT EXISTS seo_meta_tag TEXT,
  ADD COLUMN IF NOT EXISTS homepage_top_dubai BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS homepage_top_abudhabi BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS homepage_image_url TEXT,
  ADD COLUMN IF NOT EXISTS mobile_feature_image_url TEXT,
  ADD COLUMN IF NOT EXISTS banner_image_url TEXT,
  ADD COLUMN IF NOT EXISTS featured_availability TEXT NOT NULL DEFAULT 'always';

-- Extend pricing options to match editor fields
ALTER TABLE public.tour_pricing_options
  ADD COLUMN IF NOT EXISTS transfer_option TEXT,
  ADD COLUMN IF NOT EXISTS quantity TEXT;

-- Helpful indexes
CREATE INDEX IF NOT EXISTS idx_tours_related_tour_ids ON public.tours USING GIN (related_tour_ids);
CREATE INDEX IF NOT EXISTS idx_tours_homepage_flags ON public.tours (homepage_top_dubai, homepage_top_abudhabi);
