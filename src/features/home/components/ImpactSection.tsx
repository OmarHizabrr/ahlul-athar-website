'use client';

import Link from "next/link";

import { Section, SectionHeading } from "@/components/ui/Section";
import { useTranslations } from "@/i18n/useTranslations";

export function ImpactSection() {
  const { dictionary } = useTranslations();
  const impact = dictionary.home.impact;
  const highlights = impact.highlights as string[];

  return (
    <Section id="impact" background="default">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div className="space-y-6">
            <SectionHeading
              overline={impact.overline}
              title={impact.title}
              description={impact.description}
              align="start"
            />

            <div className="grid grid-cols-2 gap-4 text-[10px]">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl bg-slate-50 p-4 text-emerald-700 shadow-inner"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-blue-900 to-emerald-600 p-10 text-white shadow-2xl">
            <h3 className="text-2xl font-semibold">
              {impact.ctaTitle}
            </h3>
            <p className="mt-4 text-sm text-emerald-100">
              {impact.ctaDescription}
            </p>
            <div className="mt-8 space-y-4 text-sm">
              <div>
                <p className="font-semibold">{impact.locationLabel}</p>
                <p className="text-[10px]">{impact.locationValue}</p>
              </div>
              <div>
                <p className="font-semibold">{impact.contactLabel}</p>
                <p className="text-[10px]">
                  {dictionary.common.contact.emailValue}
                  <span className="mx-2">|</span>
                  {dictionary.common.contact.phoneValue}
                </p>
              </div>
            </div>
            <Link
              href="#contact"
              className="mt-8 inline-flex rounded-full border border-white/40 bg-white/10 px-8 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              {dictionary.common.buttons.contactSupport}
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}

