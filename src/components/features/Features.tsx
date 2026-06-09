'use client';
import { useLayoutEffect, useRef } from 'react';
import { Zap, Trophy, TrendingUp, Flame, Bot, Library } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  { title: 'XP Progression', desc: 'Gain experience points from every gaming session.', icon: Zap, iconBg: 'bg-purple-500/10', iconColor: '#38BDF8' },
  { title: 'Achievements', desc: 'Unlock milestones and celebrate every important step.', icon: Trophy, iconBg: 'bg-yellow-500/10', iconColor: '#FFCC00' },
  { title: 'Analytics', desc: 'Visualize playtime, consistency, and long-term progress.', icon: TrendingUp, iconBg: 'bg-green-500/10', iconColor: '#22C55E' },
  { title: 'Daily Streaks', desc: 'Build gaming habits through rewarding streaks.', icon: Flame, iconBg: 'bg-orange-500/10', iconColor: '#FF5900' },
  { title: 'Pulse', desc: 'A digital companion that reacts to your achievements.', icon: Bot, iconBg: 'bg-sky-500/10', iconColor: '#91E2FF' },
  { title: 'Game Library', desc: 'Keep your favorite games organized.', icon: Library, iconBg: 'bg-purple-500/10', iconColor: '#8B5CF6' },
];

export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.feature-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
      });

      gsap.from('.features-header', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 90%',
        },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="features" ref={sectionRef} className="max-w-[340px] md:max-w-[1200px] mx-auto py-12 md:py-20 px-4">
      <div className="features-header text-center mb-10 md:mb-16">
        <h2 className="text-[30px] md:text-[64px] font-bold text-white mb-2">Features</h2>
        <p className="text-[11px] md:text-[20px] text-[#CBD5E1]">Everything You Need To Track Your Gaming Journey</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature, i) => (
          <div 
            key={i} 
            className="feature-card bg-[#141B2D]/95 border border-white/[0.06] rounded-[24px] p-5 md:p-8 flex flex-col md:flex-col items-start gap-4 md:gap-0"
          >
            {/* Иконка */}
            <div className={`w-[40px] h-[40px] md:w-[71px] md:h-[71px] ${feature.iconBg} border border-white/15 rounded-[16px] flex items-center justify-center mb-0 md:mb-6 shrink-0`}>
              <feature.icon 
                size={20} 
                className="md:w-8 md:h-8" 
                color={feature.iconColor} 
              />
            </div>
            
            {/* Текст */}
            <div>
              <h3 className="text-[13px] md:text-[20px] font-bold text-white mb-1">{feature.title}</h3>
              <p className="text-[9px] md:text-[14px] text-[#CBD5E1] leading-relaxed">
                {feature.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}