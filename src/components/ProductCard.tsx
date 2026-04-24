"use client";
import { motion } from "framer-motion";
import { ShoppingCart, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useCart } from "@/contexts/CartContext";
import type { Product } from "@/lib/products";

export function ProductCard({ product, onView }: { product: Product; onView?: (p: Product) => void }) {
  const { add } = useCart();
  const images = product.images?.length ? product.images : [];
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (images.length < 2 || paused) return;
    timer.current = setInterval(() => setIdx((i) => (i + 1) % images.length), 3500);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [images.length, paused]);

  const go = (delta: number, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIdx((i) => (i + delta + images.length) % images.length);
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
      className="group rounded-2xl border border-border bg-card overflow-hidden flex flex-col hover:shadow-elevated transition-shadow duration-700"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative aspect-[4/3] bg-secondary overflow-hidden">
        {images.length > 0 ? (
          <>
            {images.map((src, i) => (
              <img
                key={src + i}
                src={src}
                alt={`${product.name} — image ${i + 1}`}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${i === idx ? "opacity-100" : "opacity-0"}`}
                loading="lazy"
              />
            ))}
            <Link
              to="/product/$slug"
              params={{ slug: product.slug }}
              aria-label={`View ${product.name}`}
              className="absolute inset-0"
            />
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => go(-1, e)}
                  aria-label="Previous image"
                  className="absolute left-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-background/85 backdrop-blur flex items-center justify-center hover:bg-background shadow-card opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={(e) => go(1, e)}
                  aria-label="Next image"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-background/85 backdrop-blur flex items-center justify-center hover:bg-background shadow-card opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setIdx(i);
                      }}
                      aria-label={`Go to image ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all ${i === idx ? "w-6 bg-accent" : "w-1.5 bg-background/70"}`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">No image</div>
        )}
        {product.featured && (
          <span className="absolute top-3 left-3 z-10 text-[10px] uppercase tracking-widest bg-accent text-accent-foreground rounded-full px-3 py-1 font-mono">Featured</span>
        )}
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <div className="text-[10px] uppercase tracking-widest text-accent mb-2">{product.category}</div>
        <h3 className="font-display text-xl mb-2">
          <Link to="/product/$slug" params={{ slug: product.slug }} className="hover:text-accent transition-colors">
            {product.name}
          </Link>
        </h3>
        {product.tagline && <p className="text-sm text-muted-foreground font-light mb-4 line-clamp-2">{product.tagline}</p>}
        <div className="mt-auto flex items-center justify-between gap-3 pt-3">
          <div className="font-display text-lg text-accent">{product.price_label || (product.price ? `$${product.price.toLocaleString()}` : "Quote")}</div>
          <div className="flex gap-2">
            {onView ? (
              <button
                onClick={() => onView(product)}
                aria-label="Quick view"
                className="h-9 w-9 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
              >
                <ArrowUpRight className="h-4 w-4" />
              </button>
            ) : (
              <Link
                to="/product/$slug"
                params={{ slug: product.slug }}
                aria-label="View details"
                className="h-9 w-9 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
              >
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            )}
            <button
              onClick={() =>
                add({
                  id: product.id,
                  name: product.name,
                  category: product.category,
                  price_label: product.price_label,
                  price: product.price,
                  image: images[0] ?? null,
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
