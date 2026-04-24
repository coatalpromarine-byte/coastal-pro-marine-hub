import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, SectionLabel } from "../components/Section";
import { Reveal, StaggerGroup, StaggerItem } from "../components/Motion";
import { Loader2, ShoppingCart, ChevronLeft, ChevronRight, ArrowLeft, Check } from "lucide-react";
import { fetchProductBySlug, fetchProducts, type Product } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/contexts/CartContext";
import { useSeo } from "@/lib/seo";

function ProductPage() {
  const { slug = "" } = useParams<{ slug: string }>();
  const pretty = slug.replace(/-/g, " ");
  useSeo({
    title: `${pretty} | CoastalPro Marine`,
    description: `Detailed specs, photos and pricing for ${pretty} at CoastalPro Marine.`,
    keywords: `${pretty}, marine product, buy outboard engine, marine boat for sale, marine parts`,
    ogTitle: `${pretty} | CoastalPro Marine`,
    ogDescription: `Detailed specs and photos for ${pretty}.`,
    canonical: `https://coastalpromarine.com/product/${slug}`,
  });
  const { add } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    setLoading(true);
    setIdx(0);
    fetchProductBySlug(slug)
      .then(async (p) => {
        setProduct(p);
        if (p) {
          const all = await fetchProducts();
          const sameCat = all.filter((x) => x.id !== p.id && x.category === p.category);
          const others = all.filter((x) => x.id !== p.id && x.category !== p.category);
          setRelated([...sameCat, ...others].slice(0, 6));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="font-display text-4xl mb-3">Product not found</h1>
          <p className="text-muted-foreground mb-6">This product may have been removed.</p>
          <Link to="/shop" className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-2.5 text-sm font-semibold hover:bg-accent hover:text-accent-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to shop
          </Link>
        </div>
      </div>
    );
  }

  const images = product.images?.length ? product.images : [];
  const specs: Array<{ label: string; value: string }> = Array.isArray(product.specs)
    ? (product.specs as Array<{ label: string; value: string }>).filter((s) => s && s.label)
    : [];

  return (
    <>
      <section className="pt-28 pb-16 md:pt-36 md:pb-24">
        <Container>
          <Link to="/shop" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors mb-8">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to shop
          </Link>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Gallery */}
            <div>
              <div className="relative aspect-square rounded-2xl bg-secondary overflow-hidden">
                {images[idx] ? (
                  <img src={images[idx]} alt={product.name} className="absolute inset-0 h-full w-full object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">No image</div>
                )}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setIdx((i) => (i - 1 + images.length) % images.length)}
                      aria-label="Previous"
                      className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/90 backdrop-blur flex items-center justify-center hover:bg-background shadow-card"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setIdx((i) => (i + 1) % images.length)}
                      aria-label="Next"
                      className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/90 backdrop-blur flex items-center justify-center hover:bg-background shadow-card"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </>
                )}
              </div>
              {images.length > 1 && (
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 mt-3">
                  {images.map((src, i) => (
                    <button
                      key={src + i}
                      onClick={() => setIdx(i)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${idx === i ? "border-accent" : "border-transparent hover:border-border"}`}
                    >
                      <img src={src} alt={`${product.name} thumbnail ${i + 1}`} className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="lg:pl-4">
              <Reveal>
                <SectionLabel>{product.category}</SectionLabel>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="font-display text-4xl md:text-5xl leading-tight mt-4 mb-3">{product.name}</h1>
              </Reveal>
              {product.tagline && (
                <Reveal delay={0.15}>
                  <p className="text-lg text-muted-foreground font-light mb-6">{product.tagline}</p>
                </Reveal>
              )}
              <Reveal delay={0.2}>
                <div className="font-display text-3xl md:text-4xl text-accent mb-8">
                  {product.price_label || (product.price ? `$${product.price.toLocaleString()}` : "Quote on request")}
                </div>
              </Reveal>
              {product.description && (
                <Reveal delay={0.25}>
                  <div className="prose prose-sm max-w-none text-foreground/85 leading-relaxed whitespace-pre-line mb-8 font-light">
                    {product.description}
                  </div>
                </Reveal>
              )}

              {specs.length > 0 && (
                <Reveal delay={0.3}>
                  <div className="rounded-2xl border border-border bg-card p-6 mb-8">
                    <div className="text-[10px] uppercase tracking-[0.3em] text-accent mb-4">Specifications</div>
                    <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
                      {specs.map((s, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                          <div>
                            <dt className="text-[10px] uppercase tracking-widest text-muted-foreground">{s.label}</dt>
                            <dd className="text-sm">{s.value}</dd>
                          </div>
                        </div>
                      ))}
                    </dl>
                  </div>
                </Reveal>
              )}

              <Reveal delay={0.35}>
                <div className="flex flex-wrap gap-3">
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
                    className="btn-premium inline-flex items-center gap-2 rounded-full bg-foreground text-background px-7 py-4 text-sm font-semibold hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <ShoppingCart className="h-4 w-4" /> Add to cart
                  </button>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-4 text-sm font-semibold hover:bg-secondary transition-colors"
                  >
                    Request a quote
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="py-20 md:py-28 bg-secondary">
          <Container>
            <Reveal>
              <SectionLabel>You may also like</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-3xl md:text-5xl mt-4 mb-10 leading-tight">
                More from <span className="italic font-normal text-muted-foreground">CoastalPro.</span>
              </h2>
            </Reveal>
            <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.slice(0, 6).map((p) => (
                <StaggerItem key={p.id}>
                  <ProductCard product={p} />
                </StaggerItem>
              ))}
            </StaggerGroup>
          </Container>
        </section>
      )}
    </>
  );
}
