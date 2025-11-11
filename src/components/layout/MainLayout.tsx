'use client';

import { PropsWithChildren } from "react";

import { Footer } from "./Footer";
import { Header } from "./Header";

export function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Header />
      <main className="pt-24">{children}</main>
      <Footer />
    </div>
  );
}

