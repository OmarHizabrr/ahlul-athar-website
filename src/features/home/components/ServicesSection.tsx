'use client';

import { Section, SectionHeading } from "@/components/ui/Section";
import { useTranslations } from "@/i18n/useTranslations";

export function ServicesSection() {
  const { dictionary } = useTranslations();
  const services = dictionary.home.services;
  const items = services.items as Array<{ title: string; description: string }>;

  return (
    <Section id="services" background="muted">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          overline={services.overline}
          title={services.title}
          description={services.description}
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((service) => (
            <div
              key={service.title}
              className="group rounded-3xl border border-slate-100 bg-white p-8 shadow-lg transition hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="mb-4 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-semibold text-emerald-600">
                {services.badge}
              </div>
              <h3 className="text-xl font-semibold text-slate-900">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

