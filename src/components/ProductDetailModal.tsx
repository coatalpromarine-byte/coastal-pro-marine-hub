"use client";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import type { Product } from "@/lib/products";

export function ProductDetailModal({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const { add } = useCart();
  const [active, setActive] = useState(0);
  if (!product) return null;
  const imgs = product.images?.length ? product.images : [];

  const specs: Array<{ label: string; value: string }> = Array.isArray(product.specs)
    ? (product.specs as Array<{ label: string; value: string }>).filter((s) => s && s.label)
    : [];

  return (
    <Dialog open={!!product} onOpenChange={(v) => (v ? null : onClose())}>
      <DialogContent className="max-w-4xl max-h-[92vh] overflow-y-auto p-0">
        <DialogTitle className="sr-only">{product.name}</DialogTitle>
        <div className="grid md:grid-cols-2 gap-0">
          <div className="bg-secondary">
            <div className="aspect-square relative">
              {imgs[active] ? (
                <img src={imgs[active]} alt={product.name} className="absolute inset-0 h-full w-full object-cover" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">No image</div>
              )}
            </div>
            {imgs.length > 1 && (
              <div className="grid grid-cols-4 gap-1 p-2">
                {imgs.map((src, i) => (
                  <button key={src + i} onClick={() => setActive(i)} className={`aspect-square rounded overflow-hidden border-2 ${active === i ? "border-accent" : "border-transparent"}`}>
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="p-8 flex flex-col">
            <div className="text-[10px] uppercase tracking-widest text-accent mb-2">{product.category}</div>
            <h2 className="font-display text-3xl mb-2">{product.name}</h2>
            {product.tagline && <p className="text-muted-foreground mb-4">{product.tagline}</p>}
            <div className="font-display text-2xl text-accent mb-5">
              {product.price_label || (product.price ? `$${product.price.toLocaleString()}` : "Quote on request")}
            </div>
            {product.description && <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-line mb-5">{product.description}</p>}
            {specs.length > 0 && (
              <dl className="grid grid-cols-2 gap-3 text-sm border-t border-border pt-4 mb-6">
                {specs.map((s, i) => (
                  <div key={i}>
                    <dt className="text-[10px] uppercase tracking-widest text-muted-foreground">{s.label}</dt>
                    <dd className="text-foreground">{s.value}</dd>
                  </div>
                ))}
              </dl>
            )}
            <button
              onClick={() => {
                add({
                  id: product.id,
                  name: product.name,
                  category: product.category,
                  price_label: product.price_label,
                  price: product.price,
                  image: imgs[0] ?? null,
                });
                onClose();
              }}
              className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background py-3.5 text-sm font-semibold hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <ShoppingCart className="h-4 w-4" /> Add to cart
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
