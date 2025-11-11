'use client';

import { useEffect, useState } from "react";
import { orderBy } from "firebase/firestore";
import { Section, SectionHeading } from "@/components/ui/Section";
import { useTranslations } from "@/i18n/useTranslations";
import { firestoreApi } from "@/lib/FirestoreApi";
import { useMessage } from "@/lib/messageService";

type UpdateType = "feature" | "fix" | "improvement";

interface Update {
  id: string;
  title: string;
  description: string;
  date: string;
  type: UpdateType;
}

function formatDate(value: string, locale: string) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }
  return parsed.toLocaleDateString(locale);
}

export function UpdatesSection() {
  const [updates, setUpdates] = useState<Update[]>([]);
  const [loading, setLoading] = useState(true);
  const { showMessage } = useMessage();
  const { dictionary, language } = useTranslations();
  const locale = language === "ar" ? "ar-SA" : "en-US";
  const updatesText = dictionary.home.updates;
  const typeLabels = updatesText.types as Record<string, string>;

  useEffect(() => {
    const fetchUpdates = async () => {
      setLoading(true);
      try {
        const updatesRef = firestoreApi.getCollection("updates");
        const docs = await firestoreApi.getDocuments(
          updatesRef,
          undefined,
          undefined,
          5,
          [orderBy("date", "desc")],
        );

        setUpdates(
          docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<Update, "id">),
          })),
        );
      } catch (error) {
        console.error("Error fetching updates:", error);
        showMessage(updatesText.error, "error");
      } finally {
        setLoading(false);
      }
    };

    fetchUpdates();
  }, [showMessage, language, updatesText.error]);

  return (
    <Section id="updates" background="muted">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          overline={updatesText.overline}
          title={updatesText.title}
          description={updatesText.description}
        />

        {loading ? (
          <div className="flex flex-col items-center gap-3">
            <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-emerald-500" />
            <p className="text-sm text-slate-500">{updatesText.loading}</p>
          </div>
        ) : updates.length === 0 ? (
          <div className="rounded-3xl bg-white p-12 text-center shadow-lg">
            <p className="text-slate-500">{updatesText.empty}</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {updates.map((update) => {
              const fallback = {
                label: update.type,
                color: "bg-slate-100 text-slate-800",
              };
              const meta = {
                label: typeLabels[update.type] ?? fallback.label,
                color:
                  update.type === "feature"
                    ? "bg-blue-100 text-blue-800"
                    : update.type === "fix"
                      ? "bg-red-100 text-red-800"
                      : update.type === "improvement"
                        ? "bg-green-100 text-green-800"
                        : fallback.color,
              };

              return (
                <article
                  key={update.id}
                  className="rounded-3xl border border-slate-100 bg-white p-6 shadow-lg transition hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="mb-3 flex items-center justify-between text-xs text-slate-500">
                    <span
                      className={`${meta.color} rounded-full px-3 py-1 text-xs font-semibold`}
                    >
                      {meta.label}
                    </span>
                    <time className="text-[10px]">
                      {formatDate(update.date, locale)}
                    </time>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {update.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {update.description}
                  </p>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </Section>
  );
}

