import { AuthProvider } from "@/contexts/AuthContext";
import { MessageProvider } from "@/lib/messageService";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "مؤسسة أهل الأثر",
  description:
    "منصة رقمية لخدمات مؤسسة أهل الأثر في شمال لندن، تعزز التعلم الشامل وروح المجتمع.",
  keywords: ["أهل الأثر", "المملكة المتحدة", "تعليم إسلامي", "شمال لندن"],
  authors: [{ name: "Ahlul-Athar Foundation" }],
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="antialiased">
        <AuthProvider>
          <MessageProvider>{children}</MessageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
