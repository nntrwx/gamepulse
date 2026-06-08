'use client';
import GlowOrb from '@/components/ui/GlowOrb';
import Hero from '@/components/hero/Hero';
import DashboardPreview from '@/components/dashboard/DashboardPreview';
import Features from '@/components/features/Features';
import Pricing from '@/components/pricing/Pricing';
import FAQ from '@/components/faq/FAQ';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import { FadeIn } from '@/components/ui/MotionWrapper';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <Hero />
      
      <section id="dashboard" className="relative px-4 py-20 overflow-hidden">
        <GlowOrb top="150px" left="60%" />

        <div className="relative z-10 mb-[60px] max-w-[1200px] mx-auto">
          <h2 className="font-bold text-[64px] leading-[77px] text-white mb-[15px]">
            Your Gaming Life In
            <br />
            <span className="font-pixel text-[64px] text-game-purple">ONE</span> Dashboard
          </h2>
          
          <p className="text-[20px] leading-[24px] text-game-grey max-w-[464px]">
            See everything that matters without switching between multiple apps, launchers, and websites.
          </p>
        </div>

        <div className="relative z-10">
          <FadeIn><DashboardPreview /></FadeIn>
          <GlowOrb top="1200px" left="10%" />
          <FadeIn><Features /></FadeIn>
          <FadeIn><Pricing /></FadeIn>
          <FadeIn><FAQ /></FadeIn>
          <FadeIn><CTA /></FadeIn>
          <Footer />
        </div>
      </section>
    </main>
  );
}