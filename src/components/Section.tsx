"use client";
import type { ReactNode } from "react";
import { SplitHeading, Reveal } from "./Motion";

export function PageHero({
  eyebrow,
  title,
  italicWords = [],
  description,
  image,
}: {
  eyebrow: string;
  title: string;
  italicWords?: number[];
  description: string;
  image?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-deep text-background noise">
      {image && (
        <img
          src={image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-25 scale-110"
          loading="lazy"
        />
      )}
      <div className="absolute inset-0 bg-gradient-hero" />
      {/* decorative grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6 pt-32 pb-24 md:pt-40 md:pb-32">
        <Reveal as="div" className="text-[11px] uppercase tracking-[0.4em] text-accent mb-6 flex items-center gap-3">
          <span className="h-px w-10 bg-accent" />
          {eyebrow}
        </Reveal>
        <SplitHeading
          text={title}
          italic={italicWords}
          className="font-display text-5xl md:text-7xl lg:text-[5.5rem] font-semibold text-balance max-w-4xl leading-[1.02]"
        />
        <Reveal delay={0.5} className="mt-8 max-w-xl text-lg text-background/75 leading-relaxed font-light">
          {description}
        </Reveal>
      </div>
    </section>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-7xl px-6 ${className}`}>{children}</div>;
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="text-[11px] uppercase tracking-[0.4em] text-accent flex items-center gap-3">
      <span className="h-px w-10 bg-accent" />
      {children}
    </div>
  );
}
