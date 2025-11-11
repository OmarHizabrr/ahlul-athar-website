'use client';

import { Section } from "@/components/ui/Section";
import { useTranslations } from "@/i18n/useTranslations";

export function AboutSection() {
  const { dictionary } = useTranslations();
  const about = dictionary.home.about;
  const values = about.values as Array<{ title: string; description: string }>;

  return (
    <Section
      id="about"
      background="default"
      withPadding={false}
    >
      <div className="relative -mt-24 rounded-t-[3rem] bg-white px-6 pb-20 pt-28 shadow-[0_-40px_120px_rgba(15,118,110,0.12)]">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
                {about.title}
              </h2>
              <p className="text-base leading-7 text-slate-600">
                {about.description}
              </p>
              <div className="rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-blue-50 p-6 shadow-inner">
                <h3 className="text-xl font-semibold text-emerald-700">
                  {about.visionTitle}
                </h3>
                <p className="mt-3 text-base leading-7 text-slate-600">
                  {about.visionDescription}
                </p>
              </div>
            </div>
            <div className="grid gap-4">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <h3 className="text-xl font-semibold text-slate-900">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-base leading-7 text-slate-600">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

