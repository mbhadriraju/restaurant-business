import { Reveal, StaggerWords } from "@/components/motion-shell";
import { founders } from "@/lib/content";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Henry Yim and Madhava Bhadriraju, cofounders of YB Visuals.",
};

export default function AboutPage() {
  return (
    <main className="bg-paper pt-24">
      <section className="section bg-ink text-paper">
        <div className="mx-auto grid max-w-375 gap-10 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-10">
          <div>
            <p className="eyebrow text-brass">About YB Visuals</p>
            <h1 className="mt-6 max-w-5xl font-serif text-[clamp(3.3rem,7vw,7.5rem)] leading-[0.92]">
              <StaggerWords text="Built for restaurants." />
            </h1>
          </div>
          <Reveal delay={0.25} className="flex items-end">
            <p className="max-w-2xl text-base leading-8 text-paper/72 md:text-lg">
              YB Visuals helps restaurants show the food, room, and experience
              clearly online. We focus on food photography and restaurant
              websites.
            </p>
          </Reveal>
        </div>
      </section>
      <section className="section bg-paper">
        <div className="mx-auto max-w-375 px-4 sm:px-6 lg:px-10">
          <Reveal>
            <p className="eyebrow text-brass">Cofounders</p>
            <h2 className="mt-4 max-w-4xl font-serif text-[clamp(2.7rem,5.5vw,5.7rem)] leading-[0.95]">
              Development and photography leads.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-8 lg:grid-cols-[0.6fr_0.4fr]">
            <div className="grid gap-6">
              {founders.map((founder, index) => (
                <Reveal delay={index * 0.1} key={founder.name}>
                  <article className="grid gap-6 border border-ink/12 bg-warmgray/42 p-5 md:grid-cols-[220px_1fr]">
                    <div className="relative min-h-82.5 overflow-hidden bg-charcoal">
                      <Image
                        src={founder.image}
                        alt={`${founder.name} headshot`}
                        fill
                        sizes="(max-width: 768px) 100vw, 260px"
                        className="object-cover"
                      />
                    </div>

                    <div className="flex flex-col py-2">
                      <p className="eyebrow text-brass">{founder.role}</p>
                      <h3 className="mt-4 font-serif text-5xl leading-none">
                        {founder.name}
                      </h3>
                      <p className="mt-5 text-base leading-8 text-ink/66">
                        {founder.bio}
                      </p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2} className="h-full">
              <div className="relative h-130 overflow-hidden border border-ink/12 bg-charcoal lg:h-full lg:min-h-180">
                <Image
                  src="/photos/Highlights/PhotoSession-01.jpg"
                  alt="YB Visuals photo session"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
