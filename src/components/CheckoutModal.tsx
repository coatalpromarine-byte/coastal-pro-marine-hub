"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useCart } from "@/contexts/CartContext";
import { FORMSUBMIT_AJAX } from "@/lib/constants";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function CheckoutModal() {
  const { checkoutOpen, closeCheckout, checkoutItems, clear } = useCart();
  const [loading, setLoading] = useState(false);

  const itemsSummary = checkoutItems
    .map((i) => `• ${i.qty}× ${i.name} [${i.category}]${i.price_label ? ` — ${i.price_label}` : ""}`)
    .join("\n");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch(FORMSUBMIT_AJAX, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok) {
        toast.success("Request sent! Our team will reach out shortly.");
        clear();
        closeCheckout();
      } else {
        toast.error(json.message || "Submission failed. Please try again.");
      }
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={checkoutOpen} onOpenChange={(v) => (v ? null : closeCheckout())}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Complete your purchase request</DialogTitle>
          <DialogDescription>Fill in your details and our sales team will follow up to finalize your order.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input type="hidden" name="_subject" value="New CoastalPro Marine purchase request" />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="Items" value={itemsSummary} />

          <div className="rounded-xl bg-secondary p-4">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Order summary</div>
            <ul className="space-y-1 text-sm">
              {checkoutItems.map((i) => (
                <li key={i.id} className="flex justify-between gap-3">
                  <span className="truncate">{i.qty}× {i.name}</span>
                  <span className="text-muted-foreground shrink-0">{i.price_label || "Quote on request"}</span>
                </li>
              ))}
              {checkoutItems.length === 0 && <li className="text-muted-foreground">No items selected.</li>}
            </ul>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Full name" name="Name" required />
            <Field label="Phone" name="Phone" type="tel" required />
          </div>
          <Field label="Email" name="Email" type="email" required />
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="City" name="City" />
            <Field label="State / Region" name="State" />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Delivery address (optional)</label>
            <textarea name="Address" rows={2} className="mt-2 w-full bg-secondary border-0 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Notes / questions</label>
            <textarea name="Notes" rows={3} className="mt-2 w-full bg-secondary border-0 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent" placeholder="Trade-in, financing, delivery preferences..." />
          </div>

          <button
            type="submit"
            disabled={loading || checkoutItems.length === 0}
            className="w-full rounded-full bg-foreground text-background py-3.5 text-sm font-semibold hover:bg-accent hover:text-accent-foreground transition-colors duration-500 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Send request
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
        {label}{required && <span className="text-accent ml-1">*</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full bg-secondary border-0 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
      />
    </div>
  );
}
