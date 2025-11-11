"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { AboutSection } from "@/features/home/components/AboutSection";
import { ContactSection } from "@/features/home/components/ContactSection";
import { DonateSection } from "@/features/home/components/DonateSection";
import { HeroSection } from "@/features/home/components/HeroSection";
import { ImpactSection } from "@/features/home/components/ImpactSection";
import { ServicesSection } from "@/features/home/components/ServicesSection";
import { UpdatesSection } from "@/features/home/components/UpdatesSection";

export default function HomePage() {
  return (
    <MainLayout>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ImpactSection />
      <UpdatesSection />
      <ContactSection />
      <DonateSection />
    </MainLayout>
  );
}

