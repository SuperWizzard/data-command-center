
-- Create visitor tracking table
CREATE TABLE public.site_visits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_path TEXT NOT NULL DEFAULT '/',
  country TEXT,
  city TEXT,
  device_type TEXT,
  browser TEXT,
  referrer TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_visits ENABLE ROW LEVEL SECURITY;

-- Anyone can insert (visitors tracking themselves)
CREATE POLICY "Anyone can insert visits"
  ON public.site_visits FOR INSERT
  WITH CHECK (true);

-- Only authenticated users can read (admin dashboard)
CREATE POLICY "Authenticated users can read visits"
  ON public.site_visits FOR SELECT
  TO authenticated
  USING (true);

-- Index for date-based queries
CREATE INDEX idx_site_visits_created_at ON public.site_visits (created_at DESC);
CREATE INDEX idx_site_visits_country ON public.site_visits (country);
