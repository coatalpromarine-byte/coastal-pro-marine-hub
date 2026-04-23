"use client";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { WHATSAPP_NUMBER } from "@/lib/constants";

export function FloatingActions() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 items-end">
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi CoastalPro Marine, I'd like to ask about ")}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group relative h-14 w-14 rounded-full bg-[#25D366] shadow-elevated flex items-center justify-center hover:scale-110 transition-transform duration-300"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
        <svg viewBox="0 0 32 32" className="h-7 w-7 text-white relative z-10" fill="currentColor" aria-hidden="true">
          <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 01-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.426-1.46-2.084a.59.59 0 01-.073-.26c0-.555 1.422-.857 1.422-1.348 0-.205-.971-2.358-1.348-2.358-.174 0-.337.027-.516.027-.319 0-.685.077-.913.262-.484.395-.687 1.107-.687 1.71 0 2.05 2.495 5.02 4.252 6.156 1.057.685 2.348 1.246 3.582 1.246 1.018 0 2.27-.518 2.762-1.482.179-.354.303-.793.303-1.182 0-.184-.058-.358-.18-.516-.342-.453-1.93-1.066-1.93-1.066zM16 0C7.16 0 0 7.16 0 16c0 2.84.756 5.504 2.07 7.81L0 32l8.402-2.05A15.929 15.929 0 0016 32c8.84 0 16-7.16 16-16S24.84 0 16 0zm0 29.534a13.49 13.49 0 01-7.135-2.04l-.498-.302-5.18 1.265 1.255-5.05-.323-.514A13.49 13.49 0 012.467 16C2.467 8.55 8.55 2.466 16 2.466c7.45 0 13.534 6.084 13.534 13.534S23.45 29.534 16 29.534z" />
        </svg>
      </a>

      <AnimatePresence>
        {show && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="h-12 w-12 rounded-full bg-foreground text-background shadow-elevated flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
