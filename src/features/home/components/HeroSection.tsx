'use client';

import { useAuth } from "@/contexts/AuthContext";
import { useTranslations } from "@/i18n/useTranslations";
import Link from "next/link";

export function HeroSection() {
  const { user } = useAuth();
  const { dictionary, t } = useTranslations();
  const stats = dictionary.home.stats as Array<{ label: string; value: string }>;
  const hero = dictionary.home.hero;

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-700 to-emerald-500 text-white">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=1600&q=60')] bg-cover bg-center opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-blue-900/40 to-emerald-700/30" />

      <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-6xl flex-col items-center justify-center gap-10 px-6 py-28 text-center">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.5em] text-emerald-200">
            {hero.badge}
          </p>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            {hero.title}
          </h1>
          <p className="mx-auto max-w-3xl text-base text-emerald-100 md:text-lg">
            {hero.description}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="#donate"
            className="rounded-full bg-emerald-500 px-10 py-3 text-base font-semibold text-white shadow-2xl transition hover:-translate-y-1 hover:bg-emerald-600"
          >
            {dictionary.common.buttons.donateNow}
          </Link>
          <Link
            href="#services"
            className="rounded-full border border-white/50 bg-white/10 px-10 py-3 text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
          >
            {dictionary.common.buttons.discoverServices}
          </Link>
        </div>

        {user ? (
          <div className="rounded-2xl bg-white/10 px-6 py-4 text-sm text-white backdrop-blur">
            <p className="font-semibold">{t("home.hero.welcomeTitle", { name: user.displayName ?? "" })}</p>
            <p>{hero.welcomeBody}</p>
          </div>
        ) : null}

        <div className="grid w-full max-w-4xl grid-cols-2 gap-4 text-xs lg:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/20 bg-white/10 p-4 shadow-sm backdrop-blur transition hover:bg-white/20"
            >
              <p className="text-[10px] font-bold text-white">{item.value}</p>
              <p className="mt-1 text-[10px] text-emerald-100">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

