'use client';

import { Section, SectionHeading } from "@/components/ui/Section";
import { useTranslations } from "@/i18n/useTranslations";

export function ContactSection() {
  const { dictionary } = useTranslations();
  const contact = dictionary.home.contact;
  const cards = contact.cards as Array<{
    title: string;
    value: string;
    href?: string;
  }>;

  return (
    <Section id="contact" background="gradient">
      <div className="absolute inset-0 opacity-20">
        <div className="h-64 w-64 rounded-full bg-emerald-400/40 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <SectionHeading
              title={contact.title}
              description={contact.description}
              align="start"
            />
          </div>

          <div className="grid gap-4 text-sm text-emerald-50">
            {cards.map((card) => (
              <div
                key={card.title}
                className="rounded-2xl bg-white/10 p-5 backdrop-blur"
              >
                <p className="font-semibold text-white">{card.title}</p>
                {card.href ? (
                  <a
                    href={card.href}
                    className="text-[10px] text-emerald-100 transition hover:text-white"
                  >
                    {card.value}
                  </a>
                ) : (
                  <p className="text-[10px] text-emerald-100">{card.value}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

