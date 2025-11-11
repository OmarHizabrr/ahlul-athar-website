'use client';

import Link from "next/link";
import { useState } from "react";

import { useTranslations } from "@/i18n/useTranslations";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { dictionary, toggleLanguage } = useTranslations();

  const navLinks = [
    { href: "#about", label: dictionary.common.nav.about },
    { href: "#services", label: dictionary.common.nav.services },
    { href: "#impact", label: dictionary.common.nav.impact },
    { href: "#updates", label: dictionary.common.nav.updates },
    { href: "#contact", label: dictionary.common.nav.contact },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-gradient-to-b from-slate-950/70 via-slate-950/45 to-transparent text-white backdrop-blur-lg transition-colors duration-300">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4 lg:px-6">
        <Link href="/" className="text-lg font-semibold">
          {dictionary.common.brand}
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium lg:flex">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 transition hover:bg-white/10"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="#donate"
          className="hidden rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-emerald-600 lg:inline-flex"
        >
          {dictionary.common.buttons.donateNow}
        </Link>

        <button
          type="button"
          className="hidden rounded-full border border-white/40 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20 lg:inline-flex"
          onClick={toggleLanguage}
          aria-label={dictionary.common.language.switchTo}
        >
          {dictionary.common.language.switchTo}
        </button>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white/10 p-2 text-sm text-white transition hover:bg-white/20 lg:hidden"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label={
            isMenuOpen
              ? dictionary.common.accessibility.closeMenu
              : dictionary.common.accessibility.openMenu
          }
        >
          <span className="text-lg">{isMenuOpen ? "✕" : "☰"}</span>
        </button>
      </div>

      {isMenuOpen ? (
        <div className="border-t border-white/10 bg-slate-950/90 px-4 pb-6 pt-4 text-sm lg:hidden">
          <nav className="flex flex-col gap-2">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-4 py-2 transition hover:bg-white/10"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="#donate"
              className="mt-3 inline-flex rounded-full bg-emerald-500 px-4 py-2 font-semibold text-white shadow-lg transition hover:bg-emerald-600"
              onClick={() => setIsMenuOpen(false)}
            >
              {dictionary.common.buttons.donateNow}
            </Link>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
              onClick={() => {
                toggleLanguage();
                setIsMenuOpen(false);
              }}
              aria-label={dictionary.common.language.switchTo}
            >
              {dictionary.common.language.switchTo}
            </button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

