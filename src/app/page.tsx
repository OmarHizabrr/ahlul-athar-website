 "use client";

import { useAuth } from "@/contexts/AuthContext";
import { firestoreApi } from "@/lib/FirestoreApi";
import { useMessage } from "@/lib/messageService";
import { orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";

interface Update {
  id: string;
  title: string;
  description: string;
  date: string;
  type: "feature" | "fix" | "improvement";
}

export default function HomePage() {
  const [updates, setUpdates] = useState<Update[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { showMessage } = useMessage();

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const updatesRef = firestoreApi.getCollection("updates");
        const docs = await firestoreApi.getDocuments(updatesRef, undefined, undefined, 5, [
          orderBy("date", "desc"),
        ]);

        const updatesData = docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Update, "id">),
        }));

        setUpdates(updatesData);
      } catch (error) {
        console.error("Error fetching updates:", error);
        showMessage("حدث خطأ في تحميل التحديثات", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchUpdates();
  }, [showMessage]);

  const getTypeColor = (type: Update["type"]) => {
    switch (type) {
      case "feature":
        return "bg-blue-100 text-blue-800";
      case "fix":
        return "bg-red-100 text-red-800";
      case "improvement":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeLabel = (type: Update["type"]) => {
    switch (type) {
      case "feature":
        return "ميزة جديدة";
      case "fix":
        return "إصلاح";
      case "improvement":
        return "تحسين";
      default:
        return type;
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600" />
          <p className="mt-4 text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.4em] text-blue-600">
            مؤسسة أهل الأثر
          </p>
          <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">
            مرحباً بكم في منصة أهل الأثر الرقمية
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            نعمل مع مجتمع شمال لندن لتقديم تعليم شامل، فعاليات تفاعلية، وخدمات إنسانية متكاملة،
            مستوحاة من قيم الرحمة والعطاء.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
          <div className="card p-8 shadow-lg">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">رسالتنا</h2>
            <p className="text-gray-700">
              نكرّس جهودنا لخدمة المجتمع المسلم وتقديم بيئة شاملة لجميع الفئات. نسعى لتمكين الأفراد
              من خلال التعليم، الإرشاد، والخدمات الاجتماعية المتخصصة.
            </p>
            {user && (
              <div className="mt-6 rounded-xl bg-blue-50 p-4 text-sm text-blue-800">
                <p>مرحباً {user.displayName} 👋</p>
                <p>نحن سعداء بعودتك. تابع معنا أحدث المستجدات.</p>
              </div>
            )}
          </div>

          <div className="card p-8 shadow-lg">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">آخر التحديثات</h2>
            {updates.length === 0 ? (
              <p className="text-gray-500">لا توجد تحديثات حالياً.</p>
            ) : (
              <div className="flex flex-col gap-4">
                {updates.map((update) => (
                  <div
                    key={update.id}
                    className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <span
                        className={`${getTypeColor(update.type)} rounded-full px-3 py-1 text-xs font-medium`}
                      >
                        {getTypeLabel(update.type)}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(update.date).toLocaleDateString("ar-SA")}
                      </span>
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-gray-900">
                      {update.title}
                    </h3>
                    <p className="text-sm text-gray-600">{update.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-16 grid gap-6 rounded-3xl bg-white p-10 shadow-xl md:grid-cols-3">
          <div>
            <h3 className="mb-3 text-xl font-semibold text-gray-900">تعليم شامل</h3>
            <p className="text-sm text-gray-600">
              دروس القرآن والسنة، البرامج التربوية للأطفال، وخدمات خاصة للنساء والجدد في الإسلام.
            </p>
          </div>
          <div>
            <h3 className="mb-3 text-xl font-semibold text-gray-900">مجتمع متكامل</h3>
            <p className="text-sm text-gray-600">
              فعاليات تفاعلية، دعم نفسي واجتماعي للشباب، وخدمات موجهة لذوي الدخل المحدود.
            </p>
          </div>
          <div>
            <h3 className="mb-3 text-xl font-semibold text-gray-900">خدمات رقمية</h3>
            <p className="text-sm text-gray-600">
              منصة إلكترونية لإدارة العضويات، متابعة الفعاليات، واستلام التنبيهات الفورية.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
