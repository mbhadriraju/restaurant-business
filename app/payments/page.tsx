import { PaymentForm } from "@/components/payment-form";
import { Reveal, StaggerWords } from "@/components/motion-shell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payments",
  description:
    "Pay YB Visuals invoices, deposits, or project fees through Stripe or Venmo.",
};

export default function PaymentsPage() {
  return (
    <main className="min-h-screen bg-paper pt-24">
      <section className="section bg-ink text-paper">
        <div className="mx-auto grid max-w-[1500px] gap-10 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-10">
          <div>
            <p className="eyebrow text-brass">Payments</p>
            <h1 className="mt-6 max-w-4xl font-serif text-[clamp(3rem,6.2vw,6.4rem)] leading-[0.94]">
              <StaggerWords text="Pay YB Visuals." />
            </h1>
          </div>
          <Reveal delay={0.28} className="flex items-end">
            <div className="max-w-2xl">
              <p className="text-base leading-8 text-paper/72 md:text-lg">
                Use Stripe for card payments and checkout receipts, or Venmo as
                another option. Include your restaurant or business name in the
                memo.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section bg-paper">
        <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-10">
          <Reveal>
            <PaymentForm />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
