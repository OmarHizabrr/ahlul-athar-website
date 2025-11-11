'use client';

import { useI18nContext } from "./I18nContext";

export function useTranslations() {
  return useI18nContext();
}

