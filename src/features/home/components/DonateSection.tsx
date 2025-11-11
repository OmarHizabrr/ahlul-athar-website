'use client';

import Link from "next/link";

import { Section, SectionHeading } from "@/components/ui/Section";
import { useTranslations } from "@/i18n/useTranslations";

export function DonateSection() {
  const { dictionary } = useTranslations();
  const donate = dictionary.home.donate;

  return (
    <Section id="donate" background="default">
      <div className="mx-auto max-w-4xl rounded-3xl border border-slate-100 bg-slate-50 p-10 text-center shadow-lg">
        <SectionHeading
          title={donate.title}
          description={donate.description}
        />
        <Link
          href="#contact"
          className="inline-flex rounded-full bg-emerald-500 px-10 py-3 text-base font-semibold text-white shadow-xl transition hover:bg-emerald-600"
        >
          {donate.cta}
        </Link>
      </div>
    </Section>
  );
}

