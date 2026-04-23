"use client";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/contexts/CartContext";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

export function CartDrawer() {
  const { items, open, setOpen, remove, setQty, openCheckoutWith, count } = useCart();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-display text-2xl">Your cart ({count})</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center gap-3 text-muted-foreground">
            <ShoppingBag className="h-10 w-10" />
            <p>Your cart is empty.</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto space-y-4 py-4">
              {items.map((i) => (
                <div key={i.id} className="flex gap-3 border-b border-border pb-4">
                  {i.image ? (
                    <img src={i.image} alt={i.name} className="h-20 w-20 object-cover rounded-md" />
                  ) : (
                    <div className="h-20 w-20 bg-secondary rounded-md" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] uppercase tracking-widest text-accent">{i.category}</div>
                    <div className="font-display text-base truncate">{i.name}</div>
                    {i.price_label && <div className="text-sm text-muted-foreground">{i.price_label}</div>}
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => setQty(i.id, i.qty - 1)} className="h-7 w-7 rounded-full border border-border flex items-center justify-center hover:bg-secondary"><Minus className="h-3 w-3" /></button>
                      <span className="text-sm w-6 text-center">{i.qty}</span>
                      <button onClick={() => setQty(i.id, i.qty + 1)} className="h-7 w-7 rounded-full border border-border flex items-center justify-center hover:bg-secondary"><Plus className="h-3 w-3" /></button>
                      <button onClick={() => remove(i.id)} className="ml-auto text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => openCheckoutWith()}
              className="rounded-full bg-foreground text-background py-3.5 text-sm font-semibold hover:bg-accent hover:text-accent-foreground transition-colors duration-500"
            >
              Request quote / checkout
            </button>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
