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
    title: "الرحمة",
    description:
      "ننشر روح التعاطف والمحبة بين أفراد المجتمع، ونمد يد العون لكل محتاج.",
  },
  {
    title: "التعليم",
    description:
      "نؤمن أن العلم الشرعي هو أساس بناء الإنسان المسلم وتمكينه من خدمة مجتمعه.",
  },
  {
    title: "التكامل",
    description:
      "نوفّر بيئة تجمع كل الأعراق والفئات تحت سقف واحد يسوده التعاون والاحترام.",
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
              مؤسسة أهل الأثر - المملكة المتحدة
            </p>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
              منارة شاملة للتعليم والرحمة في قلب شمال لندن
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-emerald-100 md:text-xl">
              نسعى لبناء مجتمع متراحم ومتعاون، ينهل من القرآن والسنة، ويقدّم الدعم لكل
              فردٍ مهما كانت خلفيته، لنصنع بيئة إيمانية نابضة بالحياة لكل الأجيال.
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
              { label: "زوار المركز سنوياً", value: "25,000+" },
              { label: "برامج أسبوعية", value: "40+" },
              { label: "متطوعون نشطون", value: "180+" },
              { label: "سنوات من العطاء", value: "15+" },
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
                نحتضن الجميع بروح الإسلام الأصيلة
              </h2>
              <p className="text-lg text-gray-600">
                مؤسسة أهل الأثر في المملكة المتحدة مركز نابض بالحياة، يفتح أبوابه لكل
                الشرائح، من أجل بناء مجتمع متراحم، متحد، ومستنير بالقيم الإسلامية. نقدم
                مزيجاً من التعليم الشرعي، والبرامج المجتمعية، وخدمات الدعم، لنمنح أفراد
                المجتمع شعوراً حقيقياً بالانتماء والأصالة.
              </p>
              <div className="rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-blue-50 p-6 shadow-inner">
                <h3 className="text-xl font-semibold text-emerald-700">رؤيتنا</h3>
                <p className="mt-3 text-gray-600">
                  نرى مركزنا بيتاً يجمع كل الأعراق والثقافات، ليكون منارة للتعلم، ومكاناً
                  للأسر والأطفال والشباب يجدون فيه الإرشاد، والدعم، والارتباط بقيمهم
                  الإسلامية.
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
              نوفر برامج متكاملة تمتد من التعليم الشرعي إلى الخدمات الاجتماعية، لنضمن لكل
              فرد مكاناً آمناً يعبّر فيه عن ذاته وينمّي مهاراته ويعزز علاقته بخالقه.
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
                فعاليات مستمرة تعكس روح المسجد والمجتمع
              </h2>
              <p className="text-gray-600">
                المسجد هو أحب البقاع إلى الله، ونحن نحافظ على هذه الروح من خلال أنشطة
                يومية، حلقات ذكر، برامج الوعظ، ومبادرات اجتماعية تستثمر طاقات المتطوعين
                لخدمة المجتمع المحلي والوافدين الجدد.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                {[
                  "صلوات يومية وجمعية",
                  "دروس تحفيظ وتجويد",
                  "برامج دعم للأسر",
                  "مبادرات مساعدة المحتاجين",
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
                شاركنا بناء مجتمع أكثر تعاطفاً
              </h3>
              <p className="mt-4 text-sm text-emerald-100">
                ندعوك للانضمام إلينا كمتطوع، داعم، أو مشارك في الأنشطة. تواصل معنا لمعرفة
                الفرص المناسبة لك ولعائلتك.
              </p>
              <div className="mt-8 space-y-4 text-sm">
                <div>
                  <p className="font-semibold">عنواننا</p>
                  <p>111 Carterhatch Road, Enfield, London EN3 5LX</p>
                </div>
                <div>
                  <p className="font-semibold">تواصل معنا</p>
                  <p>
                    info@aafuk.org <span className="mx-2">|</span> 07306060377 /
                    07402386872 / 07875679392
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
              كن جزءاً من رؤيتنا لبناء مركز إسلامي يحتضن الجميع، ويقدم خدمات تعليمية
              وإنسانية على مدار العام. تبرع، تطوع، أو شاركنا بخبراتك لنحدث التغيير سوياً.
            </p>
          </div>
          <div className="grid gap-4 text-sm text-emerald-50">
            <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
              <p className="font-semibold text-white">البريد الإلكتروني</p>
              <p>info@aafuk.org</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
              <p className="font-semibold text-white">أرقام التواصل</p>
              <p>07306060377 / 07402386872 / 07875679392</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
              <p className="font-semibold text-white">العنوان</p>
              <p>111 Carterhatch Road, Enfield, London EN3 5LX</p>
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
            ساهم معنا في توسيع نطاق الخير
          </h2>
          <p className="mt-4 text-gray-600">
            كل تبرع يدعم برامج التعليم، خدمات الدعم، ومبادراتنا الإنسانية. تبرعك اليوم
            يساعدنا على الوصول إلى مزيد من العائلات والأطفال والشباب في منطقتنا.
          </p>
          <Link
            href="https://aafuk.org/donate"
            target="_blank"
            className="mt-8 inline-flex rounded-full bg-emerald-500 px-10 py-3 text-base font-semibold text-white shadow-xl transition hover:bg-emerald-600"
          >
            تبرع عبر موقعنا
          </Link>
        </div>
      </section>
    </div>
  );
}
