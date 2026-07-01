"use client";

import { portfolioSections, type PortfolioImage } from "@/lib/content";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export function PortfolioGallery() {
  const [active, setActive] = useState<PortfolioImage | null>(null);

  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-[1500px] px-4 py-10 sm:px-6 lg:px-10">
        {portfolioSections.map((section, sectionIndex) => (
          <div
            className={sectionIndex > 0 ? "mt-16" : undefined}
            key={section.title}
          >
            <div className="mb-6 border-b border-ink/12 pb-4">
              <p className="eyebrow text-brass">{section.title}</p>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-ink/64">
                {section.description}
              </p>
            </div>

            <motion.div
              layout
              className="columns-1 gap-4 sm:columns-2 lg:columns-3"
            >
              {section.images.map((image, index) => (
                <motion.button
                  type="button"
                  layout
                  key={image.src}
                  className="group mb-4 block w-full break-inside-avoid border border-ink/12 bg-white p-2 text-left transition duration-300 hover:-translate-y-1 hover:border-brass/60"
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
                  <span className="sr-only">
                    Open {section.title.toLowerCase()} sample
                  </span>

                  <span className="block overflow-hidden bg-warmgray/35">
                    <img
                      src={image.src}
                      alt={image.alt}
                      loading="lazy"
                      className="block h-auto w-full transition duration-500 group-hover:scale-[1.02]"
                    />
                  </span>
                </motion.button>
              ))}
            </motion.div>
          </div>
        ))}
      </div>

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
              <div className="flex max-h-[78vh] items-center justify-center overflow-hidden bg-ink">
                <img
                  src={active.src}
                  alt={active.alt}
                  className="max-h-[78vh] w-auto max-w-full object-contain"
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