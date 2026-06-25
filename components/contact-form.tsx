"use client";

import { budgetRanges, projectTypes } from "@/lib/content";
import { motion } from "framer-motion";
import { FormEvent, useState } from "react";

type FormState = "idle" | "loading" | "success" | "error";

const initialForm = {
  name: "",
  businessName: "",
  email: "",
  phone: "",
  projectType: projectTypes[0],
  budget: budgetRanges[1],
  message: "",
};

export function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  function update(name: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    setMessage("");

    if (!form.name.trim() || !form.businessName.trim() || !form.message.trim()) {
      setState("error");
      setMessage("Name, restaurant/business name, and message are required.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setState("error");
      setMessage("Enter a valid email address.");
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error || "Could not send message.");
      }

      setState("success");
      setMessage("Message sent. YB Visuals will respond soon.");
      setForm(initialForm);
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Could not send message.");
    }
  }

  return (
    <motion.form
      onSubmit={onSubmit}
      className="grid gap-4 border border-brass/24 bg-paper/92 p-5 text-ink shadow-[18px_18px_0_rgba(190,154,92,0.12)] sm:p-8"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name">
          <input
            className="field"
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
            name="name"
            autoComplete="name"
            required
          />
        </Field>
        <Field label="Restaurant / Business Name">
          <input
            className="field"
            value={form.businessName}
            onChange={(event) => update("businessName", event.target.value)}
            name="businessName"
            autoComplete="organization"
            required
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Email">
          <input
            className="field"
            value={form.email}
            onChange={(event) => update("email", event.target.value)}
            name="email"
            type="email"
            autoComplete="email"
            required
          />
        </Field>
        <Field label="Phone">
          <input
            className="field"
            value={form.phone}
            onChange={(event) => update("phone", event.target.value)}
            name="phone"
            type="tel"
            autoComplete="tel"
            required
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Project Type">
          <select
            className="field"
            value={form.projectType}
            onChange={(event) => update("projectType", event.target.value)}
            name="projectType"
          >
            {projectTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </Field>
        <Field label="Budget">
          <select
            className="field"
            value={form.budget}
            onChange={(event) => update("budget", event.target.value)}
            name="budget"
          >
            {budgetRanges.map((range) => (
              <option key={range}>{range}</option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Message">
        <textarea
          className="field min-h-40 resize-y"
          value={form.message}
          onChange={(event) => update("message", event.target.value)}
          name="message"
          required
        />
      </Field>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button className="btn btn-dark w-full sm:w-auto" disabled={state === "loading"}>
          {state === "loading" ? "Sending..." : "Send Inquiry"}
        </button>
        {message ? (
          <p
            className={`text-sm ${
              state === "success" ? "text-forest" : "text-rust"
            }`}
            role="status"
          >
            {message}
          </p>
        ) : null}
      </div>
    </motion.form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2 text-sm text-ink/72">
      <span className="eyebrow text-ink/54">{label}</span>
      {children}
    </label>
  );
}
