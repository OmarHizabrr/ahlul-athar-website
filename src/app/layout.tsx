import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/i18n/I18nContext";
import { MessageProvider } from "@/lib/messageService";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ahlul-athar-website.vercel.app"),
  title: "مؤسسة بقايا أهل الأثر للدعوة والإرشاد",
  description:
    "مؤسسة أهلية مستقلة في مالاوي تعنى بالدعوة إلى الله على الكتاب والسنة بفهم السلف، وتعمل على التوعية الدينية، وإحياء السنة، والتحذير من البدعة، إضافة إلى تطلعاتها لإنشاء مدارس قرآنية ومعاهد شرعية.",
  keywords: [
    "مؤسسة بقايا أهل الأثر",
    "الدعوة والإرشاد",
    "مالاوي",
    "السلف الصالح",
    "التوعية الدينية",
  ],
  authors: [{ name: "مؤسسة بقايا أهل الأثر" }],
  robots: "index, follow",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "مؤسسة بقايا أهل الأثر للدعوة والإرشاد",
    description:
      "مؤسسة أهلية مستقلة في مالاوي على منهج السلف الصالح، تنشر العقيدة الصحيحة، وتحيي السنة، وتسعى لإنشاء مدارس قرآنية ومعاهد شرعية.",
    url: "https://ahlul-athar-website.vercel.app/",
    siteName: "مؤسسة بقايا أهل الأثر",
    locale: "ar",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "شعار مؤسسة بقايا أهل الأثر للدعوة والإرشاد",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "مؤسسة بقايا أهل الأثر للدعوة والإرشاد",
    description:
      "تعرف على جهود مؤسسة بقايا أهل الأثر في مالاوي لنشر العقيدة الصحيحة وإحياء السنة وإنشاء المدارس القرآنية.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="antialiased">
        <LanguageProvider>
          <AuthProvider>
            <MessageProvider>{children}</MessageProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
