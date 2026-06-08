'use client';
import { motion } from 'framer-motion';

export default function CTA() {
  return (
    <section className="py-16 md:py-24 text-center px-4">
      <h2 className="text-[28px] md:text-[48px] font-bold text-white mb-3 leading-tight">
        Ready To Level Up Your
        <br className="hidden md:block" /> Gaming Journey?
      </h2>
      <p className="text-[14px] md:text-[20px] text-game-grey max-w-[771px] mx-auto mb-8">
        Join thousands of players tracking their progress, building streaks, and transforming playtime into visible achievements.
      </p>
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => console.log("Кнопка нажата!")}
        className="px-8 md:px-12 py-3 md:py-4 bg-game-purple/55 border border-[rgba(167,139,250,0.65)] rounded-[16px] text-[16px] md:text-[20px] text-white shadow-[0px_4px_12px_rgba(141,100,235,0.5)] transition-all"
      >
        Start Tracking Free
      </motion.button>
    </section>
  );
}