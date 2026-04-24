import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Container } from "@/components/Section";
import { Loader2, Plus, Pencil, Trash2, X, Upload, Star } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/lib/products";
import { useSeo } from "@/lib/seo";

type Draft = {
  id?: string;
  category: "boats" | "engines" | "parts";
  name: string;
  slug: string;
  tagline: string;
  description: string;
  price: string;
  price_label: string;
  specs: Array<{ label: string; value: string }>;
  images: string[];
  featured: boolean;
  sort_order: number;
  active: boolean;
};

const blank = (): Draft => ({
  category: "boats",
  name: "",
  slug: "",
  tagline: "",
  description: "",
  price: "",
  price_label: "",
  specs: [],
  images: [],
  featured: false,
  sort_order: 0,
  active: true,
});

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").slice(0, 80);
}

function Admin() {
  useSeo({ title: "Admin Panel | CoastalPro Marine" });
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Draft | null>(null);

  useEffect(() => {
    if (!authLoading && !user) navigate("/login");
  }, [user, authLoading, navigate]);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    else setProducts((data ?? []) as unknown as Product[]);
    setLoading(false);
  };

  useEffect(() => {
    if (user) load();
  }, [user]);

  if (authLoading || !user) {
    return <div className="py-40 text-center"><Loader2 className="h-6 w-6 animate-spin mx-auto" /></div>;
  }

  const onDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Deleted"); load(); }
  };

  const signOut = async () => { await supabase.auth.signOut(); navigate("/"); };

  return (
    <section className="py-20 md:py-28 min-h-[80vh]">
      <Container>
        <div className="flex items-center justify-between mb-10 gap-4 flex-wrap">
          <div>
            <h1 className="font-display text-4xl md:text-5xl">Admin Panel</h1>
            <p className="text-sm text-muted-foreground mt-2">Signed in as {user.email}</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setEditing(blank())} className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-2.5 text-sm font-semibold hover:bg-accent hover:text-accent-foreground transition-colors">
              <Plus className="h-4 w-4" /> New product
            </button>
            <button onClick={signOut} className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:bg-secondary">Sign out</button>
          </div>
        </div>

        {loading ? (
          <div className="py-20 text-center"><Loader2 className="h-6 w-6 animate-spin mx-auto" /></div>
        ) : products.length === 0 ? (
          <div className="py-20 text-center text-muted-foreground rounded-2xl border border-dashed border-border">
            No products yet. Click <strong>New product</strong> to add one.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((p) => (
              <div key={p.id} className="rounded-2xl border border-border bg-card overflow-hidden">
                <div className="aspect-[4/3] bg-secondary relative">
                  {p.images?.[0] ? <img src={p.images[0]} alt={p.name} className="absolute inset-0 h-full w-full object-cover" /> : <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">No image</div>}
                  {!p.active && <span className="absolute top-2 left-2 bg-destructive text-destructive-foreground text-[10px] uppercase rounded-full px-2 py-0.5">Hidden</span>}
                  {p.featured && <span className="absolute top-2 right-2 bg-accent text-accent-foreground text-[10px] uppercase rounded-full px-2 py-0.5 flex items-center gap-1"><Star className="h-3 w-3" /> Featured</span>}
                </div>
                <div className="p-5">
                  <div className="text-[10px] uppercase tracking-widest text-accent">{p.category}</div>
                  <div className="font-display text-lg mt-1 truncate">{p.name}</div>
                  <div className="text-sm text-muted-foreground">{p.price_label || (p.price ? `$${p.price.toLocaleString()}` : "—")}</div>
                  <div className="flex gap-2 mt-4">
                    <button onClick={() => setEditing(productToDraft(p))} className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-secondary text-foreground px-3 py-2 text-xs font-semibold hover:bg-foreground hover:text-background transition-colors">
                      <Pencil className="h-3.5 w-3.5" /> Edit
                    </button>
                    <button onClick={() => onDelete(p.id)} className="rounded-full border border-border px-3 py-2 text-xs hover:bg-destructive hover:text-destructive-foreground hover:border-destructive transition-colors">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>

      {editing && <ProductEditor draft={editing} onClose={() => setEditing(null)} onSaved={() => { setEditing(null); load(); }} />}
    </section>
  );
}

function productToDraft(p: Product): Draft {
  return {
    id: p.id,
    category: p.category,
    name: p.name,
    slug: p.slug,
    tagline: p.tagline ?? "",
    description: p.description ?? "",
    price: p.price?.toString() ?? "",
    price_label: p.price_label ?? "",
    specs: Array.isArray(p.specs) ? p.specs : [],
    images: p.images ?? [],
    featured: p.featured,
    sort_order: p.sort_order,
    active: p.active,
  };
}

function ProductEditor({ draft, onClose, onSaved }: { draft: Draft; onClose: () => void; onSaved: () => void }) {
  const [d, setD] = useState<Draft>(draft);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const isEdit = !!d.id;

  const update = <K extends keyof Draft>(k: K, v: Draft[K]) => setD((p) => ({ ...p, [k]: v }));

  const onUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const remaining = 8 - d.images.length;
    if (remaining <= 0) { toast.error("Maximum 8 images per product"); return; }
    const list = Array.from(files).slice(0, remaining);
    setUploading(true);
    try {
      const uploaded: string[] = [];
      for (const file of list) {
        const ext = file.name.split(".").pop() || "jpg";
        const path = `${crypto.randomUUID()}.${ext}`;
        const { error } = await supabase.storage.from("product-images").upload(path, file, { contentType: file.type, upsert: false });
        if (error) { toast.error(error.message); continue; }
        const { data } = supabase.storage.from("product-images").getPublicUrl(path);
        uploaded.push(data.publicUrl);
      }
      update("images", [...d.images, ...uploaded]);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (i: number) => update("images", d.images.filter((_, idx) => idx !== i));

  const save = async () => {
    if (!d.name.trim()) { toast.error("Name is required"); return; }
    const slug = d.slug.trim() || slugify(d.name);
    setSaving(true);
    const payload = {
      category: d.category,
      name: d.name.trim(),
      slug,
      tagline: d.tagline.trim() || null,
      description: d.description.trim() || null,
      price: d.price ? Number(d.price) : null,
      price_label: d.price_label.trim() || null,
      specs: d.specs.filter((s) => s.label.trim()),
      images: d.images,
      featured: d.featured,
      sort_order: d.sort_order,
      active: d.active,
    };
    const res = isEdit
      ? await supabase.from("products").update(payload).eq("id", d.id!)
      : await supabase.from("products").insert(payload);
    setSaving(false);
    if (res.error) toast.error(res.error.message);
    else { toast.success(isEdit ? "Updated" : "Created"); onSaved(); }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm overflow-y-auto" onClick={onClose}>
      <div className="min-h-full flex items-start md:items-center justify-center p-4">
        <div className="bg-background rounded-2xl border border-border w-full max-w-3xl my-8" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between border-b border-border p-5">
            <h2 className="font-display text-2xl">{isEdit ? "Edit product" : "New product"}</h2>
            <button onClick={onClose} className="h-9 w-9 rounded-full hover:bg-secondary flex items-center justify-center"><X className="h-4 w-4" /></button>
          </div>
          <div className="p-6 space-y-5">
            <div className="grid sm:grid-cols-3 gap-4">
              <Sel label="Category" value={d.category} onChange={(v) => update("category", v as Draft["category"])} options={[["boats","Boats"],["engines","Engines"],["parts","Parts"]]} />
              <Inp label="Name" value={d.name} onChange={(v) => update("name", v)} />
              <Inp label="Slug (auto)" value={d.slug} onChange={(v) => update("slug", v)} placeholder={slugify(d.name)} />
            </div>
            <Inp label="Tagline" value={d.tagline} onChange={(v) => update("tagline", v)} />
            <Txt label="Description" value={d.description} onChange={(v) => update("description", v)} rows={5} />
            <div className="grid sm:grid-cols-3 gap-4">
              <Inp label="Price (number)" value={d.price} onChange={(v) => update("price", v.replace(/[^\d.]/g,""))} />
              <Inp label='Price label (e.g. "from $24,900")' value={d.price_label} onChange={(v) => update("price_label", v)} />
              <Inp label="Sort order" value={String(d.sort_order)} onChange={(v) => update("sort_order", Number(v) || 0)} />
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Specs</label>
              <div className="space-y-2 mt-2">
                {d.specs.map((s, i) => (
                  <div key={i} className="flex gap-2">
                    <input value={s.label} onChange={(e) => update("specs", d.specs.map((x, idx) => idx === i ? { ...x, label: e.target.value } : x))} placeholder="Label" className="flex-1 bg-secondary rounded-lg px-3 py-2 text-sm" />
                    <input value={s.value} onChange={(e) => update("specs", d.specs.map((x, idx) => idx === i ? { ...x, value: e.target.value } : x))} placeholder="Value" className="flex-1 bg-secondary rounded-lg px-3 py-2 text-sm" />
                    <button onClick={() => update("specs", d.specs.filter((_, idx) => idx !== i))} className="h-9 w-9 rounded-lg border border-border hover:bg-destructive hover:text-destructive-foreground"><X className="h-4 w-4 mx-auto" /></button>
                  </div>
                ))}
                <button type="button" onClick={() => update("specs", [...d.specs, { label: "", value: "" }])} className="text-xs text-accent inline-flex items-center gap-1"><Plus className="h-3 w-3" /> Add spec</button>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Images ({d.images.length}/8)</label>
                <label className={`inline-flex items-center gap-2 text-xs cursor-pointer rounded-full bg-secondary px-3 py-2 hover:bg-foreground hover:text-background transition-colors ${uploading ? "opacity-50 pointer-events-none" : ""}`}>
                  {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
                  Upload
                  <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => { onUpload(e.target.files); e.target.value = ""; }} />
                </label>
              </div>
              <div className="grid grid-cols-4 gap-2 mt-3">
                {d.images.map((src, i) => (
                  <div key={src} className="relative aspect-square rounded-lg overflow-hidden bg-secondary group">
                    <img src={src} alt="" className="h-full w-full object-cover" />
                    <button onClick={() => removeImage(i)} className="absolute top-1 right-1 h-6 w-6 rounded-full bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><X className="h-3 w-3" /></button>
                    {i === 0 && <span className="absolute bottom-1 left-1 bg-accent text-accent-foreground text-[9px] uppercase rounded px-1.5 py-0.5">Cover</span>}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={d.featured} onChange={(e) => update("featured", e.target.checked)} /> Featured</label>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={d.active} onChange={(e) => update("active", e.target.checked)} /> Active (visible on site)</label>
            </div>
          </div>
          <div className="border-t border-border p-5 flex gap-3 justify-end">
            <button onClick={onClose} className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:bg-secondary">Cancel</button>
            <button onClick={save} disabled={saving} className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-2.5 text-sm font-semibold hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-50">
              {saving && <Loader2 className="h-4 w-4 animate-spin" />} {isEdit ? "Save changes" : "Create product"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Inp({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{label}</label>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="mt-2 w-full bg-secondary border-0 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
    </div>
  );
}
function Txt({ label, value, onChange, rows = 4 }: { label: string; value: string; onChange: (v: string) => void; rows?: number }) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{label}</label>
      <textarea rows={rows} value={value} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full bg-secondary border-0 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent resize-y" />
    </div>
  );
}
function Sel({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: Array<[string, string]> }) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full bg-secondary border-0 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent">
        {options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
      </select>
    </div>
  );
}
