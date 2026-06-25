import { ContactForm } from "@/components/contact-form";
import { Reveal, StaggerWords } from "@/components/motion-shell";
import { processSteps, services } from "@/lib/content";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <section className="relative bg-ink pt-24 text-paper">
        <div className="mx-auto grid max-w-[1500px] gap-8 px-4 pb-14 pt-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
          <div className="flex flex-col justify-center">
            <p className="eyebrow text-brass">Food photography and websites</p>
            <h1 className="mt-6 max-w-4xl font-serif text-[clamp(3.4rem,7.4vw,7.8rem)] font-medium leading-[0.9] tracking-normal">
              <StaggerWords text="Better photos. Better websites." />
            </h1>
            <Reveal delay={0.4}>
              <p className="mt-7 max-w-xl text-base leading-8 text-paper/72 md:text-lg">
                YB Visuals helps restaurants show what they serve and what it
                feels like to visit. We offer food photography and website
                development.
              </p>
            </Reveal>
            <Reveal delay={0.55} className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link className="btn btn-primary" href="#contact">
                Start Project
              </Link>
              <Link className="btn btn-ghost" href="/portfolio">
                See Portfolio
              </Link>
            </Reveal>
          </div>

          <div className="relative self-center border border-brass/28 bg-charcoal p-3">
            <div className="relative aspect-[3/2] overflow-hidden bg-ink">
              <Image
                src="/photos/Highlights/MiyabiFinal-34.jpg"
                alt="Restaurant sushi plate photographed by YB Visuals"
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-contain"
                priority
              />
            </div>
            <p className="mt-3 text-sm leading-6 text-paper/64">
              Full-frame restaurant photography for menus, websites, and social posts.
            </p>
          </div>
        </div>
      </section>

      <section className="section bg-paper">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-10">
          <Reveal className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="eyebrow text-brass">Services</p>
              <h2 className="mt-4 max-w-3xl font-serif text-[clamp(2.7rem,5.5vw,5.7rem)] leading-[0.95]">
                Two ways to help restaurants look better online.
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {services.map((service) => (
                <article
                  className="border border-ink/12 bg-warmgray/45 p-6 transition duration-300 hover:-translate-y-1 hover:bg-white"
                  key={service.title}
                >
                  <h3 className="font-serif text-3xl leading-tight">{service.title}</h3>
                  <p className="mt-5 text-sm leading-7 text-ink/68">{service.body}</p>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section bg-ink text-paper">
        <div className="mx-auto grid max-w-[1500px] gap-12 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-10">
          <Reveal>
            <p className="eyebrow text-brass">Why it matters</p>
            <h2 className="mt-4 max-w-4xl font-serif text-[clamp(2.8rem,6vw,6.2rem)] leading-[0.92]">
              Guests decide before they arrive.
            </h2>
          </Reveal>
          <div className="grid gap-6">
            {[
              "Photos shape how people judge the food, the room, and the price.",
              "A clear website makes it easier to find the menu, hours, location, and next step.",
              "Good visuals and a good site make the restaurant feel more trustworthy.",
            ].map((line, index) => (
              <Reveal delay={index * 0.08} key={line}>
                <div className="grid grid-cols-[56px_1fr] gap-5 border-t border-brass/22 pt-6">
                  <span className="font-serif text-4xl italic text-brass">
                    0{index + 1}
                  </span>
                  <p className="text-xl leading-snug text-paper/82 md:text-2xl">{line}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-paper">
        <div className="mx-auto grid max-w-[1500px] gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
          <Reveal>
            <p className="eyebrow text-brass">Process</p>
            <h2 className="mt-4 max-w-3xl font-serif text-[clamp(2.7rem,5.5vw,5.7rem)] leading-[0.95]">
              Plan first. Create second.
            </h2>
          </Reveal>
          <div className="grid gap-4">
            {processSteps.map((item) => (
              <Reveal key={item.step}>
                <article className="grid gap-5 border border-ink/12 p-5 transition duration-300 hover:bg-ink hover:text-paper md:grid-cols-[72px_1fr]">
                  <p className="font-serif text-4xl italic text-brass">{item.step}</p>
                  <div>
                    <h3 className="font-serif text-3xl leading-tight">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 opacity-70">{item.body}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section bg-ink text-paper">
        <div className="mx-auto grid max-w-[1500px] gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-10">
          <Reveal>
            <p className="eyebrow text-brass">Start a Project</p>
            <h2 className="mt-4 max-w-4xl font-serif text-[clamp(2.8rem,5.7vw,6rem)] leading-[0.95]">
              Tell us what your restaurant needs.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-8 text-paper/68 md:text-lg">
              Use this form for food photography, restaurant experience photos,
              or a new website.
            </p>
          </Reveal>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
