"use client";

import { useAuth } from "@/contexts/AuthContext";
import { firestoreApi } from "@/lib/FirestoreApi";
import { useMessage } from "@/lib/messageService";
import { orderBy } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Update {
  id: string;
  title: string;
  description: string;
  date: string;
  type: "feature" | "fix" | "improvement";
}

const services = [
  {
    title: "تعاليم القرآن والسنة",
    description:
      "حلقات علمية منتظمة تعزز فهم كتاب الله وسنة نبيه صلى الله عليه وسلم.",
  },
  {
    title: "محاضرات إسلامية",
    description:
      "محاضرات أسبوعية يقدمها علماء ودعاة لتقوية الصلة بالدين وتعزيز الأخلاق.",
  },
  {
    title: "خدمات الأطفال",
    description:
      "برامج تعليمية وترفيهية للأطفال تساعدهم على بناء الهوية الإسلامية في بيئة آمنة.",
  },
  {
    title: "خدمات النساء",
    description:
      "مجالس علمية، لقاءات دعم، وبرامج متخصصة تلائم احتياجات أخواتنا في المجتمع.",
  },
  {
    title: "برامج الجدد في الإسلام",
    description:
      "مرافقة شخصية، دروس تأسيسية، وحلقات تعريفية لتسهيل اندماج المسلمين الجدد.",
  },
  {
    title: "دعم الشباب",
    description:
      "إرشاد وتوجيه للشباب لمواجهة التحديات، مع توفير مساحات آمنة للحوار والتطوير.",
  },
];

const values = [
  {
    title: "المنهجية السلفية",
    description:
      "نسير على الكتاب والسنة بفهم السلف الصالح، ونركز على ترسيخ العقيدة الصحيحة في قلوب الناس.",
  },
  {
    title: "التعليم",
    description:
      "نؤمن أن العلم الشرعي هو أساس بناء الإنسان المسلم وتمكينه من خدمة مجتمعه.",
  },
  {
    title: "العمل المؤسسي",
    description:
      "مؤسسة أهلية ذات شخصية اعتبارية مستقلة، تعمل بخطط واضحة لخدمة المجتمع ودعم برامجه التعليمية والاجتماعية.",
  },
];

export default function HomePage() {
  const [updates, setUpdates] = useState<Update[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { showMessage } = useMessage();

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const updatesRef = firestoreApi.getCollection("updates");
        const docs = await firestoreApi.getDocuments(
          updatesRef,
          undefined,
          undefined,
          5,
          [orderBy("date", "desc")],
        );

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
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-900 via-blue-700 to-emerald-500">
        <div className="text-center text-white">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-white" />
          <p className="mt-4 text-sm tracking-wider">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-700 to-emerald-500 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=1600&q=60')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-blue-900/40 to-emerald-700/30" />
        <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-6xl flex-col items-center justify-center gap-10 px-6 py-24 text-center">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.5em] text-emerald-200">
            مؤسسة بقايا أهل الأثر للدعوة والإرشاد
            </p>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            منارة تعيد روح الكتاب والسنة في جمهورية مالاوي
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-emerald-100 md:text-xl">
            نحن مؤسسة أهلية مستقلة تعمل على الدعوة إلى الله عز وجل، نشر العقيدة الصحيحة،
            إحياء السنة، قمع البدعة، وتوعية الجاليات في مالاوي بمنهج السلف الصالح، مع
            تطلّع دائم لإنشاء المدارس والمعاهد الشرعية.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="#donate"
              className="btn-primary rounded-full bg-emerald-500 px-10 py-3 text-base font-semibold text-white shadow-2xl transition transform hover:-translate-y-1 hover:bg-emerald-600"
            >
              تبرّع الآن
            </Link>
            <Link
              href="#about"
              className="btn-ghost rounded-full border border-white/50 bg-white/10 px-10 py-3 text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              اكتشف خدماتنا
            </Link>
          </div>

          {user && (
            <div className="rounded-2xl bg-white/10 px-6 py-4 text-sm text-white backdrop-blur">
              <p className="font-semibold">مرحبا {user.displayName} 👋</p>
              <p>يسعدنا تواجدك مجدداً. استكشف آخر برامجنا وفعالياتنا.</p>
            </div>
          )}

          <div className="grid w-full max-w-4xl grid-cols-2 gap-4 text-sm lg:grid-cols-4">
            {[
              { label: "قرى مستفيدة", value: "35+" },
              { label: "حلقات علمية أسبوعية", value: "60+" },
              { label: "مشروعات اجتماعية", value: "25+" },
              { label: "طلاب في مدارسنا", value: "800+" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/20 bg-white/10 p-4 shadow-sm backdrop-blur transition hover:bg-white/20"
              >
                <p className="text-xl font-bold text-white">{item.value}</p>
                <p className="mt-1 text-xs text-emerald-100">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="about"
        className="relative -mt-24 rounded-t-[3rem] bg-white px-6 pb-20 pt-28 shadow-[0_-40px_120px_rgba(15,118,110,0.12)]"
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
                دعوة على بصيرة، وعمل مؤسسي لخدمة المجتمع
              </h2>
              <p className="text-lg text-gray-600">
                مؤسسة بقايا أهل الأثر للدعوة والإرشاد وتوعية الجاليات في مالاوي تعمل على
                تعليم الناس أصول دينهم، وتقوية ارتباطهم بالعقيدة السليمة، مع تنفيذ برامج
                توعوية واجتماعية تصون هوية المسلمين وتحفظ حقوقهم وتنشر الفضيلة في المجتمع.
              </p>
              <div className="rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-blue-50 p-6 shadow-inner">
                <h3 className="text-xl font-semibold text-emerald-700">رؤيتنا</h3>
                <p className="mt-3 text-gray-600">
                  نطمح إلى إنشاء شبكة من المدارس القرآنية والمعاهد الشرعية التي تخرّج
                  طلبة علم راسخين، متقنين للتوحيد والسنة، قادرين على قيادة مجتمعاتهم بالحق
                  والعدل.
                </p>
              </div>
            </div>
            <div className="grid gap-4">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <h3 className="text-xl font-semibold text-gray-900">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.4em] text-emerald-600">
              خدماتنا
            </span>
            <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
              نرافقك في رحلة الإيمان والعطاء
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-gray-600">
              نوفر برامج تجمع بين الدعوة التعليمية والتوعية الاجتماعية، لنعيد الناس إلى
              منهج السلف الصالح ونرسم لهم طريق الاستقامة والاعتدال.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.title}
                className="group rounded-3xl border border-gray-100 bg-white p-8 shadow-lg transition hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="mb-4 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                  برنامج مجتمعي
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div className="space-y-6">
              <span className="text-sm font-semibold uppercase tracking-[0.4em] text-emerald-600">
                أثرنا في المجتمع
              </span>
              <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
                برامج دعوية وتعليمية متواصلة في أرجاء مالاوي
              </h2>
              <p className="text-gray-600">
                نصل برسالتنا إلى القرى والأحياء، نحيي المساجد، ننظم المحاضرات، نرعى حلقات
                التحفيظ، ونتعهد المحتاجين، لتبقى العقيدة الصافية نبراساً لأهل مالاوي.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                {[
                  "محاضرات في العقيدة والتوحيد",
                  "حلقات لتعليم القرآن الكريم",
                  "زيارات دعوية للقرى النائية",
                  "برامج دعم الضعفاء والمحتاجين",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl bg-gray-50 p-4 text-emerald-700 shadow-inner"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-blue-900 to-emerald-600 p-10 text-white shadow-2xl">
              <h3 className="text-2xl font-semibold">
                شاركنا نشر المنهج الصحيح في مالاوي
              </h3>
              <p className="mt-4 text-sm text-emerald-100">
                ندعوك للانضمام إلينا في دعم المشاريع الدعوية والتعليمية، ومؤازرة الجهود
                التي تعيد للأمة صفاء عقيدتها وتعين الأسر على الثبات على الدين الحق.
              </p>
              <div className="mt-8 space-y-4 text-sm">
                <div>
                  <p className="font-semibold">مقرنا</p>
                  <p>ليلونغوي، جمهورية مالاوي</p>
                </div>
                <div>
                  <p className="font-semibold">تواصل معنا</p>
                  <p>
                    info@athar.mw <span className="mx-2">|</span> +265 000 000 000
                  </p>
                </div>
              </div>
              <Link
                href="#contact"
                className="mt-8 inline-flex rounded-full border border-white/40 bg-white/10 px-8 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                راسل فريق الدعم
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.4em] text-emerald-600">
              آخر المستجدات
            </span>
            <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
              نبقي مجتمعنا على اطلاع دائم
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-gray-600">
              تابع التحديثات والبرامج الجديدة التي نطلقها بشكل دوري لخدمة المجتمع، من دورات
              تعليمية، مبادرات خيرية، وفعاليات خاصة بالشباب والعائلات.
            </p>
          </div>

          {updates.length === 0 ? (
            <div className="rounded-3xl bg-white p-12 text-center shadow-lg">
              <p className="text-gray-500">لا توجد تحديثات حالياً.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {updates.map((update) => (
                <article
                  key={update.id}
                  className="rounded-3xl border border-gray-100 bg-white p-6 shadow-lg transition hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="mb-3 flex items-center justify-between text-xs text-gray-500">
                    <span
                      className={`${getTypeColor(update.type)} rounded-full px-3 py-1 text-xs font-semibold`}
                    >
                      {getTypeLabel(update.type)}
                    </span>
                    <time>{new Date(update.date).toLocaleDateString("ar-SA")}</time>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {update.title}
                  </h3>
                  <p className="mt-3 text-sm text-gray-600">{update.description}</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section
        id="contact"
        className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-emerald-600 px-6 py-20 text-white"
      >
        <div className="absolute inset-0 opacity-20">
          <div className="h-64 w-64 rounded-full bg-emerald-400/40 blur-3xl" />
        </div>
        <div className="relative mx-auto flex max-w-6xl flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl space-y-6">
            <h2 className="text-3xl font-bold md:text-4xl">
              انضم إلينا في صناعة الأثر الإيجابي
            </h2>
            <p className="text-emerald-100">
              كن جزءاً من رؤيتنا لتثبيت العقيدة السلفية في قلوب المسلمين، وساهم في إنشاء
              المدارس والمعاهد التي تحمي أبناءنا من الانحراف والبدع.
            </p>
          </div>
          <div className="grid gap-4 text-sm text-emerald-50">
            <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
              <p className="font-semibold text-white">البريد الإلكتروني</p>
              <p>info@athar.mw</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
              <p className="font-semibold text-white">أرقام التواصل</p>
              <p>+265 000 000 000 / +265 000 000 111</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
              <p className="font-semibold text-white">العنوان</p>
              <p>ليلونغوي - مالاوي</p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="donate"
        className="bg-white px-6 pb-24 pt-16 text-center"
      >
        <div className="mx-auto max-w-4xl rounded-3xl border border-gray-100 bg-gray-50 p-10 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            ساعدنا على توسيع دائرة الدعوة والتعليم
          </h2>
          <p className="mt-4 text-gray-600">
            كل مساهمة مالية تمكننا من إقامة حلقات العلم، دعم طلاب المدارس القرآنية، وإيصال
            الرسالة إلى قرى جديدة في أنحاء مالاوي.
          </p>
          <Link
            href="#"
            className="mt-8 inline-flex rounded-full bg-emerald-500 px-10 py-3 text-base font-semibold text-white shadow-xl transition hover:bg-emerald-600"
          >
            تواصل مع فريق التبرعات
          </Link>
        </div>
      </section>
    </div>
  );
}
