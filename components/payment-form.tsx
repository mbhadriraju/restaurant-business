"use client";

import { FormEvent, useState } from "react";

const paymentTypes = ["Invoice", "Deposit", "Project fee"];

export function PaymentForm() {
  const [form, setForm] = useState({
    paymentType: paymentTypes[0],
    amount: "",
    businessName: "",
    email: "",
  });
  const [state, setState] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState("");

  function update(name: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    setMessage("");

    const amountNumber = Number(form.amount);
    if (!form.businessName.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) {
      setState("error");
      setMessage("Business name and valid email are required.");
      return;
    }
    if (!Number.isFinite(amountNumber) || amountNumber < 1) {
      setState("error");
      setMessage("Enter a payment amount of at least $1.");
      return;
    }

    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !data.url) {
        throw new Error(data.error || "Could not start Stripe checkout.");
      }

      window.location.href = data.url;
    } catch (error) {
      setState("error");
      setMessage(
        error instanceof Error ? error.message : "Could not start Stripe checkout.",
      );
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
      <form
        onSubmit={onSubmit}
        className="grid gap-4 border border-brass/24 bg-paper p-5 text-sm text-ink shadow-[18px_18px_0_rgba(190,154,92,0.12)] sm:p-7"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2">
            <span className="eyebrow text-ink/54">Payment Type</span>
            <select
              className="field"
              value={form.paymentType}
              onChange={(event) => update("paymentType", event.target.value)}
            >
              {paymentTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-2">
            <span className="eyebrow text-ink/54">Amount</span>
            <input
              className="field"
              inputMode="decimal"
              min="1"
              name="amount"
              onChange={(event) => update("amount", event.target.value)}
              placeholder="1500"
              required
              step="0.01"
              type="number"
              value={form.amount}
            />
          </label>
        </div>

        <label className="grid gap-2">
          <span className="eyebrow text-ink/54">Restaurant / Business Name</span>
          <input
            className="field"
            name="businessName"
            onChange={(event) => update("businessName", event.target.value)}
            required
            value={form.businessName}
          />
        </label>

        <label className="grid gap-2">
          <span className="eyebrow text-ink/54">Email</span>
          <input
            className="field"
            name="email"
            onChange={(event) => update("email", event.target.value)}
            required
            type="email"
            value={form.email}
          />
        </label>

        <button className="btn btn-dark mt-2 w-full justify-center" disabled={state === "loading"}>
          {state === "loading" ? "Opening Stripe..." : "Pay with Stripe"}
        </button>
        {message ? (
          <p className="text-sm text-rust" role="status">
            {message}
          </p>
        ) : null}
      </form>

      <aside className="border border-brass/24 bg-ink p-5 text-paper sm:p-7">
        <p className="eyebrow text-brass">Alternate Payment</p>
        <h2 className="mt-4 font-serif text-4xl leading-none">Venmo</h2>
        <p className="mt-5 text-base text-paper/72">Username: m_raju</p>
        <a
          className="btn btn-primary mt-8 w-full justify-center"
          href="https://venmo.com/m_raju"
          target="_blank"
          rel="noreferrer"
        >
          Open Venmo
        </a>
        <p className="mt-6 text-sm leading-7 text-paper/60">
          Include your restaurant or business name in the payment memo so the
          payment can be matched to the right project.
        </p>
      </aside>
    </div>
  );
}
