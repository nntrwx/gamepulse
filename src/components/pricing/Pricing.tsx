'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { FadeIn } from '../ui/MotionWrapper';

const tiers = {
  monthly: [
    { name: 'Free', price: '€0', features: ['Basic Dashboard', 'XP Tracking', 'Activity Feed', 'Up to 5 Games', 'Basic Statistics'], buttonText: 'Start Free', bg: 'bg-[#141B2D]', border: 'border-[rgba(255,255,255,0.06)]', btn: 'bg-[rgba(139,92,246,0.55)]' },
    { name: 'Pro', price: '€9/month', features: ['Everything in Free', 'Unlimited Games', 'Advanced Analytics', 'Achievement Tracking', 'Activity Heatmaps', 'Cloud Sync'], buttonText: 'Go Pro', popular: true, bg: 'bg-gradient-to-b from-[#1D2340] to-[#141B2D]', border: 'border-[rgba(139,92,246,0.06)]', btn: 'bg-gradient-to-b from-[rgba(139,92,246,0.55)] to-[rgba(167,139,250,0.55)]' },
    { name: 'Elite', price: '€19/month', features: ['Everything in Pro', 'Early Access Features', 'Premium Themes', 'AI Insights', 'Priority Support'], buttonText: 'Become Elite', bg: 'bg-gradient-to-b from-[#13253D] to-[#141B2D]', border: 'border-[rgba(56,189,248,0.06)]', btn: 'bg-gradient-to-b from-[rgba(56,189,248,0.55)] to-[rgba(125,211,252,0.55)]' },
  ],
  yearly: [
    { name: 'Free', price: '€0', features: ['Basic Dashboard', 'XP Tracking', 'Activity Feed', 'Up to 5 Games', 'Basic Statistics'], buttonText: 'Start Free', bg: 'bg-[#141B2D]', border: 'border-[rgba(255,255,255,0.06)]', btn: 'bg-[rgba(139,92,246,0.55)]' },
    { name: 'Pro', price: '€7/month', total: '€84 per year', features: ['Everything in Free', 'Unlimited Games', 'Advanced Analytics', 'Achievement Tracking', 'Activity Heatmaps', 'Cloud Sync'], buttonText: 'Go Pro', popular: true, bg: 'bg-gradient-to-b from-[#1D2340] to-[#141B2D]', border: 'border-[rgba(139,92,246,0.06)]', btn: 'bg-gradient-to-b from-[rgba(139,92,246,0.55)] to-[rgba(167,139,250,0.55)]' },
    { name: 'Elite', price: '€15/month', total: '€180 per year', features: ['Everything in Pro', 'Early Access Features', 'Premium Themes', 'AI Insights', 'Priority Support'], buttonText: 'Become Elite', bg: 'bg-gradient-to-b from-[#13253D] to-[#141B2D]', border: 'border-[rgba(56,189,248,0.06)]', btn: 'bg-gradient-to-b from-[rgba(56,189,248,0.55)] to-[rgba(125,211,252,0.55)]' },
  ]
};

export default function Pricing() {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <section id="pricing" className="max-w-[1140px] mx-auto py-20 px-4 text-white">
        <FadeIn>
      <div className="text-center mb-12">
        <h2 className="text-[64px] font-bold mb-0">Pricing</h2>
        <p className="text-[20px] text-game-grey">Choose Your Journey</p>
      </div>

      <div className="flex justify-center mb-10">
        <div 
          className="relative w-[346px] h-[61px] bg-[rgba(42,42,42,0.55)] border border-[rgba(77,77,77,0.65)] rounded-full flex p-1 cursor-pointer"
          onClick={() => setBilling(billing === 'monthly' ? 'yearly' : 'monthly')}
        >
          <motion.div 
            className="absolute top-1 bottom-1 w-[171px] bg-[#2A2A2A] rounded-full shadow-[0px_4px_12px_rgba(43,38,55,0.4)] border border-[rgba(94,90,105,0.65)]"
            animate={{ x: billing === 'monthly' ? 0 : 171 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
          <div className="w-1/2 flex items-center justify-center text-[24px] font-extralight z-10">Monthly</div>
          <div className="w-1/2 flex flex-col items-center justify-center text-[24px] font-extralight z-10">
            Yearly
            <span className="text-[10px] text-game-grey/70 mt-[-2px]">Save 20%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tiers[billing].map((tier: any, i) => (
          <motion.div 
            key={i} 
            whileHover={{ y: -10 }}
            className={`relative p-8 rounded-[24px] border flex flex-col items-center shadow-lg ${tier.bg} ${tier.border}`}
          >
            {tier.popular && <div className="absolute top-4 right-6 px-3 py-1 bg-game-purple/55 border border-game-purple/65 rounded-full text-[13px]">POPULAR</div>}
            <h3 className="text-[40px] font-bold mb-1 mt-4">{tier.name}</h3>
            
            <div className="text-center mb-8">
              <p className="text-[20px] text-game-grey">{tier.price}</p>
              {billing === 'yearly' && tier.total && <p className="text-[14px] text-game-purple mt-1">({tier.total})</p>}
            </div>

            <ul className="space-y-4 mb-10 w-full text-[20px]">
              {tier.features.map((f: string, idx: number) => <li key={idx} className="flex items-start gap-2"><Check size={20} className="mt-1 flex-shrink-0 text-game-purple" /> {f}</li>)}
            </ul>
            
            <button 
              onClick={() => console.log(`Clicked ${tier.buttonText}`)} 
              className={`w-[220px] h-[52px] mt-auto rounded-[16px] border border-white/10 text-[20px] transition-transform active:scale-95 ${tier.btn}`}
            >
              {tier.buttonText}
            </button>
          </motion.div>
        ))}
      </div>
      </FadeIn>
    </section>
  );
}