'use client';

import { useTranslations } from "@/i18n/useTranslations";

export function Footer() {
  const { dictionary, t } = useTranslations();
  const footer = dictionary.common.footer;
  const contact = dictionary.common.contact;

  return (
    <footer className="border-t border-slate-200 bg-white/90 py-10 text-sm text-slate-600">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 lg:flex-row lg:items-center lg:justify-between lg:px-6">
        <div>
          <h3 className="text-base font-semibold text-slate-900">
            {dictionary.common.brandFull}
          </h3>
          <p className="mt-2 max-w-md leading-7">
            {footer.mission}
          </p>
        </div>

        <div className="grid gap-2 text-slate-500">
          <p>
            {contact.emailLabel}:{" "}
            <a href={`mailto:${contact.emailValue}`} className="text-emerald-600">
              {contact.emailValue}
            </a>
          </p>
          <p>
            {contact.phoneLabel}: {contact.phoneValue}
          </p>
          <p>
            {contact.addressLabel}: {contact.addressValue}
          </p>
        </div>

        <p className="text-xs text-slate-400">
          {t("common.footer.rights", { year: new Date().getFullYear() })}
        </p>
      </div>
    </footer>
  );
}

