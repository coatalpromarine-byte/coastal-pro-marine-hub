import { useEffect } from "react";

type MetaTag =
  | { name: string; content: string }
  | { property: string; content: string };

export interface SeoOptions {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  twitterImage?: string;
}

function upsertMeta(selector: string, attrs: Record<string, string>) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    Object.entries(attrs).forEach(([k, v]) => {
      if (k !== "content") el.setAttribute(k, v);
    });
    document.head.appendChild(el);
  }
  el.setAttribute("content", attrs.content);
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>("link[rel='canonical']");
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export function applySeo(opts: SeoOptions) {
  if (opts.title) document.title = opts.title;

  const tags: MetaTag[] = [];
  if (opts.description) tags.push({ name: "description", content: opts.description });
  if (opts.keywords) tags.push({ name: "keywords", content: opts.keywords });
  if (opts.ogTitle) tags.push({ property: "og:title", content: opts.ogTitle });
  if (opts.ogDescription) tags.push({ property: "og:description", content: opts.ogDescription });
  if (opts.ogImage) tags.push({ property: "og:image", content: opts.ogImage });
  if (opts.ogType) tags.push({ property: "og:type", content: opts.ogType });
  if (opts.twitterCard) tags.push({ name: "twitter:card", content: opts.twitterCard });
  if (opts.twitterImage) tags.push({ name: "twitter:image", content: opts.twitterImage });

  for (const tag of tags) {
    if ("name" in tag) {
      upsertMeta(`meta[name='${tag.name}']`, { name: tag.name, content: tag.content });
    } else {
      upsertMeta(`meta[property='${tag.property}']`, { property: tag.property, content: tag.content });
    }
  }

  if (opts.canonical) upsertCanonical(opts.canonical);
}

export function useSeo(opts: SeoOptions) {
  useEffect(() => {
    applySeo(opts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(opts)]);
}
