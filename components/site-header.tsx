"use client";

import { navItems } from "@/lib/content";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-brass/20 bg-ink/78 text-paper backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between px-4 py-4 sm:px-6 lg:px-10">
        <Link
          href="/"
          className="group flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <span className="relative size-12 overflow-hidden border border-brass/40 bg-paper transition-colors group-hover:border-brass">
            <Image
              src="/photos/logo.png"
              alt="YB Visuals logo"
              fill
              sizes="48px"
              className="object-cover rounded-md"
              priority
            />
          </span>
          <span className="leading-none">
            <span className="block font-serif text-xl tracking-wide">YB Visuals</span>
            <span className="block text-[0.62rem] uppercase tracking-[0.34em] text-paper/56">
              Photos and Websites
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                href={item.href}
                className="relative text-sm uppercase tracking-[0.24em] text-paper/68 transition-colors hover:text-paper"
                key={item.href}
              >
                {item.label}
                {active ? (
                  <motion.span
                    className="absolute -bottom-2 left-0 h-px w-full bg-brass"
                    layoutId="active-nav"
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link className="btn btn-ghost" href="/portfolio">
            View Work
          </Link>
          <Link className="btn btn-primary" href="/#contact">
            Start Project
          </Link>
        </div>

        <button
          className="border border-brass/35 px-4 py-2 text-xs uppercase tracking-[0.28em] text-paper lg:hidden"
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          Menu
        </button>
      </div>

      {open ? (
        <motion.nav
          id="mobile-nav"
          className="border-t border-brass/20 bg-ink px-4 pb-5 pt-2 lg:hidden"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="mx-auto grid max-w-[1500px] gap-2">
            {navItems.map((item) => (
              <Link
                href={item.href}
                className="border-b border-paper/10 py-4 font-serif text-3xl text-paper"
                key={item.href}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link className="btn btn-primary mt-4 w-full justify-center" href="/#contact">
              Start Project
            </Link>
          </div>
        </motion.nav>
      ) : null}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-brass/20 bg-ink text-paper">
      <div className="mx-auto grid max-w-[1500px] gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_0.8fr] lg:px-10">
        <div>
          <p className="font-serif text-4xl text-paper">YB Visuals</p>
          <p className="mt-4 max-w-xl text-sm leading-7 text-paper/64">
            Food photography and website development for restaurants that need
            to look clear, current, and easy to trust online.
          </p>
        </div>
        <div className="grid gap-4 text-sm text-paper/70 sm:grid-cols-2">
          <div>
            <p className="eyebrow text-brass">Contact</p>
            <a className="mt-3 block hover:text-paper" href="mailto:madhbhad@gmail.com">
              madhbhad@gmail.com
            </a>
            <a
              className="mt-2 block hover:text-paper"
              href="mailto:henryyimbusiness@gmail.com"
            >
              henryyimbusiness@gmail.com
            </a>
          </div>
          <div>
            <p className="eyebrow text-brass">Pages</p>
            <div className="mt-3 grid gap-2">
              {navItems.map((item) => (
                <Link className="hover:text-paper" href={item.href} key={item.href}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
