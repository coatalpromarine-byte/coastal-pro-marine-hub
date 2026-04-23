-- Products table
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL CHECK (category IN ('boats','engines','parts')),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  tagline TEXT,
  description TEXT,
  price NUMERIC,
  price_label TEXT,
  specs JSONB NOT NULL DEFAULT '[]'::jsonb,
  images TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  featured BOOLEAN NOT NULL DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT max_8_images CHECK (array_length(images, 1) IS NULL OR array_length(images, 1) <= 8)
);

CREATE INDEX idx_products_category ON public.products(category);
CREATE INDEX idx_products_active ON public.products(active);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Active products are viewable by everyone"
  ON public.products FOR SELECT
  USING (active = true OR auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can insert products"
  ON public.products FOR INSERT TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update products"
  ON public.products FOR UPDATE TO authenticated
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete products"
  ON public.products FOR DELETE TO authenticated
  USING (auth.uid() IS NOT NULL);

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Storage bucket for product images
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true);

CREATE POLICY "Product images publicly viewable"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'product-images');

CREATE POLICY "Authenticated users can upload product images"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Authenticated users can update product images"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'product-images');

CREATE POLICY "Authenticated users can delete product images"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'product-images');