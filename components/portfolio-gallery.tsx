"use client";

import { portfolioImages, type PortfolioImage } from "@/lib/content";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export function PortfolioGallery() {
  const [active, setActive] = useState<PortfolioImage | null>(null);

  return (
    <section className="bg-paper">
      <motion.div
        layout
        className="mx-auto grid max-w-[1500px] grid-cols-1 gap-4 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-10"
      >
        {portfolioImages.map((image, index) => (
          <motion.button
            type="button"
            layout
            key={image.src}
            className="group border border-ink/12 bg-white p-2 text-left transition duration-300 hover:-translate-y-1 hover:border-brass/60"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.45,
              delay: Math.min(index * 0.025, 0.18),
              ease: [0.22, 1, 0.36, 1],
            }}
            onClick={() => setActive(image)}
          >
            <span className="sr-only">Open restaurant photography sample</span>
            <span className="relative block aspect-[3/2] overflow-hidden bg-warmgray/35">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain transition duration-500 group-hover:scale-[1.02]"
              />
            </span>
          </motion.button>
        ))}
      </motion.div>

      <AnimatePresence>
        {active ? (
          <motion.div
            className="fixed inset-0 z-[70] grid place-items-center bg-ink/92 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              className="relative w-full max-w-6xl border border-brass/30 bg-paper p-3 text-ink"
              initial={{ scale: 0.96, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 20 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="relative aspect-[3/2] overflow-hidden bg-ink">
                <Image
                  src={active.src}
                  alt={active.alt}
                  fill
                  sizes="90vw"
                  className="object-contain"
                />
              </div>
              <button
                className="btn btn-dark mt-3 w-full justify-center sm:w-auto"
                type="button"
                onClick={() => setActive(null)}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
