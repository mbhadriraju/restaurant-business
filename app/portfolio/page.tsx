import { PortfolioGallery } from "@/components/portfolio-gallery";
import { Reveal, StaggerWords } from "@/components/motion-shell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "YB Visuals portfolio for restaurant food photography and experience photography.",
};

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-paper pt-24">
      <section className="bg-ink px-4 py-20 text-paper sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1500px]">
          <p className="eyebrow text-brass">Portfolio</p>
          <h1 className="mt-6 max-w-5xl font-serif text-[clamp(3.4rem,7.5vw,8rem)] leading-[0.9]">
            <StaggerWords text="Restaurant photos." />
          </h1>
          <Reveal delay={0.35}>
            <p className="mt-7 max-w-2xl text-base leading-8 text-paper/70 md:text-lg">
              Food, plating, and restaurant details photographed for menus,
              websites, and social posts.
            </p>
          </Reveal>
        </div>
      </section>
      <PortfolioGallery />
    </main>
  );
}
