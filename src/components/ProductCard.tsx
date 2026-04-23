"use client";
import { motion } from "framer-motion";
import { ShoppingCart, ArrowUpRight } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import type { Product } from "@/lib/products";

export function ProductCard({ product, onView }: { product: Product; onView?: (p: Product) => void }) {
  const { add } = useCart();
  const img = product.images?.[0];

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
      className="group rounded-2xl border border-border bg-card overflow-hidden flex flex-col hover:shadow-elevated transition-shadow duration-700"
    >
      <button
        type="button"
        onClick={() => onView?.(product)}
        className="relative aspect-[4/3] bg-secondary overflow-hidden block"
      >
        {img ? (
          <img src={img} alt={product.name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110" loading="lazy" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">No image</div>
        )}
        {product.featured && (
          <span className="absolute top-3 left-3 text-[10px] uppercase tracking-widest bg-accent text-accent-foreground rounded-full px-3 py-1 font-mono">Featured</span>
        )}
      </button>
      <div className="p-6 flex-1 flex flex-col">
        <div className="text-[10px] uppercase tracking-widest text-accent mb-2">{product.category}</div>
        <h3 className="font-display text-xl mb-2">{product.name}</h3>
        {product.tagline && <p className="text-sm text-muted-foreground font-light mb-4 line-clamp-2">{product.tagline}</p>}
        <div className="mt-auto flex items-center justify-between gap-3 pt-3">
          <div className="font-display text-lg text-accent">{product.price_label || (product.price ? `$${product.price.toLocaleString()}` : "Quote")}</div>
          <div className="flex gap-2">
            <button
              onClick={() => onView?.(product)}
              aria-label="View details"
              className="h-9 w-9 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
            >
              <ArrowUpRight className="h-4 w-4" />
            </button>
            <button
              onClick={() =>
                add({
                  id: product.id,
                  name: product.name,
                  category: product.category,
                  price_label: product.price_label,
                  price: product.price,
                  image: img ?? null,
                })
              }
              className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-4 py-2 text-xs font-semibold hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <ShoppingCart className="h-3.5 w-3.5" /> Add
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
