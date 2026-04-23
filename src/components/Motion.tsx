"use client";
import { motion, useInView, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef, type ReactNode } from "react";

const ease = [0.19, 1, 0.22, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
  y = 32,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "h2" | "h3" | "p" | "span";
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const MotionTag = motion[Tag] as typeof motion.div;
  return (
    <MotionTag
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease, delay }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

export function StaggerGroup({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={fadeUp} className={className}>
      {children}
    </motion.div>
  );
}

/** Word-by-word display heading reveal */
export function SplitHeading({
  text,
  className = "",
  italic = [],
}: {
  text: string;
  className?: string;
  italic?: number[];
}) {
  const words = text.split(" ");
  return (
    <motion.h1
      className={className}
      initial="hidden"
      animate="show"
      variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } } }}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.25em] last:mr-0">
          <motion.span
            className={`inline-block ${italic.includes(i) ? "italic font-normal text-accent" : ""}`}
            variants={{
              hidden: { y: "110%" },
              show: { y: "0%", transition: { duration: 1, ease } },
            }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  );
}

/** Parallax wrapper */
export function Parallax({
  children,
  speed = 0.3,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`${speed * 100}px`, `${-speed * 100}px`]);
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
