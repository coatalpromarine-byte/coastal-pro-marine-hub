import { supabase } from "@/integrations/supabase/client";

export type Product = {
  id: string;
  category: "boats" | "engines" | "parts";
  name: string;
  slug: string;
  tagline: string | null;
  description: string | null;
  price: number | null;
  price_label: string | null;
  specs: Array<{ label: string; value: string }>;
  images: string[];
  featured: boolean;
  sort_order: number;
  active: boolean;
  created_at: string;
  updated_at: string;
};

export async function fetchProducts(category?: Product["category"]) {
  let q = supabase.from("products").select("*").eq("active", true).order("sort_order", { ascending: true }).order("created_at", { ascending: false });
  if (category) q = q.eq("category", category);
  const { data, error } = await q;
  if (error) throw error;
  return (data ?? []) as unknown as Product[];
}
