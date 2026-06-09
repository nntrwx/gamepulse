'use client';

import { useState, useEffect, useRef } from 'react';
import { Zap, Trophy, Gamepad2, Clock, Flame, Award, TrendingUp, Calendar, ChevronRight, Heart } from 'lucide-react';
import Image from 'next/image';
import { HoverCard, FadeIn } from '@/components/ui/MotionWrapper';
import gsap from 'gsap';
import idleImg from '../../../public/idle.png';
import happyImg from '../../../public/happy.png';
import smileImg from '../../../public/smile.png';
import lowBatteryImg from '../../../public/lowbattery.png';

const ASSETS = {
  IDLE: idleImg,
  HAPPY: happyImg,
  SMILE: smileImg,
  LOW: lowBatteryImg,
};

interface OverviewProps {
  onNavigate: (tab: string) => void;
}

export default function Overview({ onNavigate }: OverviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const characterRef = useRef<HTMLDivElement>(null);
  const [gridCells, setGridCells] = useState<string[]>(() => Array.from({ length: 210 }, () => '#1E293B'));
  const [currentAsset, setCurrentAsset] = useState<any>(ASSETS.IDLE);
  const [status, setStatus] = useState('LIVE');
  const [isLoved, setIsLoved] = useState(false);

  useEffect(() => {
    const palette = ['#1E293B', '#4C1D95', '#4C1D95', '#7C3AED', '#8B5CF6', '#C4B5FD'];
    setGridCells(Array.from({ length: 210 }, () => palette[Math.floor(Math.random() * palette.length)]));

    if (characterRef.current) {
      gsap.to(characterRef.current, {
        y: -8,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
  }, []);

  const handleCompanionClick = () => {
    const emotions = [ASSETS.IDLE, ASSETS.SMILE, ASSETS.LOW];
    const filteredEmotions = emotions.filter(e => e !== currentAsset);
    const randomAsset = filteredEmotions[Math.floor(Math.random() * filteredEmotions.length)];
    setCurrentAsset(randomAsset);
    setStatus('CURIOUS');
    setIsLoved(false);
    
    if (characterRef.current) {
      gsap.fromTo(characterRef.current, { rotation: -5 }, { rotation: 5, duration: 0.15, repeat: 3, yoyo: true, ease: "power1.inOut", onComplete: () => {
        gsap.to(characterRef.current, { rotation: 0, duration: 0.2 });
      }});
    }

    setTimeout(() => {
      setStatus('LIVE');
    }, 1500);
  };

  const handlePetCompanion = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    setCurrentAsset(ASSETS.HAPPY);
    setStatus('LOVED!');
    setIsLoved(true);
    
    if (characterRef.current) {
      const tl = gsap.timeline();
      tl.to(characterRef.current, { y: -30, scale: 1.15, duration: 0.3, ease: "back.out(2)" })
        .to(characterRef.current, { y: 0, scale: 1, duration: 0.6, ease: "bounce.out" });

      for(let i = 0; i < 6; i++) {
        const particle = document.createElement('div');
        particle.className = "absolute pointer-events-none z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2";
        particle.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="#EC4899" xmlns="http://www.w3.org/2000/svg"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
        containerRef.current?.appendChild(particle);
        
        const angle = (i / 6) * Math.PI * 2;
        const velocity = 80 + Math.random() * 40;
        
        gsap.to(particle, { 
          x: Math.cos(angle) * velocity, 
          y: Math.sin(angle) * velocity - 40, 
          opacity: 0, 
          scale: 0.5,
          duration: 1.2, 
          ease: "power2.out",
          onComplete: () => particle.remove() 
        });
      }
    }

    setTimeout(() => {
      setCurrentAsset(ASSETS.IDLE);
      setStatus('LIVE');
      setIsLoved(false);
    }, 2000);
  };

  const stats = [
    { label: 'TOTAL XP', value: '2,450', unit: 'XP', sub: '+120 this week', icon: Zap, color: '#38BDF8', trend: '+5.2%' },
    { label: 'CURRENT LEVEL', value: '12', unit: 'LVL', sub: '85% to LVL 13', icon: Trophy, color: '#FFCC00', trend: 'Top 10%' },
    { label: 'GAMES TRACKED', value: '34', unit: 'GAMES', sub: '+2 this month', icon: Gamepad2, color: '#8B5CF6', trend: '+12%' },
    { label: 'PLAYTIME', value: '128', unit: 'HOURS', sub: '+14h this week', icon: Clock, color: '#22C55E', trend: '+8.4%' },
  ];

  return (
    <div className="space-y-8">
      <FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, i) => (
            <HoverCard key={i} className="bg-[#110F14] border border-white/[0.06] rounded-[24px] p-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <item.icon size={80} color={item.color} />
              </div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.05]">
                    <item.icon size={24} color={item.color} />
                  </div>
                  <span className="text-[12px] font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded-lg">
                    {item.trend}
                  </span>
                </div>
                
                <div className="space-y-1">
                  <p className="text-gray-400 text-sm font-medium tracking-wider">{item.label}</p>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-4xl font-bold" style={{ color: item.color }}>{item.value}</h3>
                    <span className="text-lg font-semibold text-gray-500">{item.unit}</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-white/[0.05]">
                  <p className="text-sm text-gray-400">{item.sub}</p>
                </div>
              </div>
            </HoverCard>
          ))}
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <FadeIn className="md:col-span-2 lg:col-span-2">
          <div className="bg-[#110F14] border border-white/[0.06] rounded-[24px] p-5 md:p-6 h-full flex flex-col justify-between">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h3 className="text-xl font-bold mb-0.5">Gaming Consistency</h3>
                <p className="text-gray-400 text-xs">Activity tracking (last 30 weeks)</p>
              </div>
              <div className="flex items-center gap-2 bg-[#1A181E] px-3 py-1.5 rounded-xl border border-white/[0.05]">
                <Flame size={16} color="#FF5900" className="animate-pulse" />
                <span className="font-bold text-sm text-orange-500">18 Day Streak</span>
              </div>
            </div>

            <div className="my-2 overflow-x-auto scrollbar-hide">
              <div className="grid grid-cols-[repeat(30,1fr)] gap-[3px] min-w-[500px] md:min-w-0 w-full">
                {gridCells.map((color, i) => (
                  <div 
                    key={i} 
                    className="aspect-square rounded-[2px] transition-all hover:scale-150 hover:z-10 cursor-pointer"
                    style={{ 
                      backgroundColor: color, 
                      boxShadow: color !== '#1E293B' ? `0 0 8px ${color}33` : 'none' 
                    }}
                  />
                ))}
              </div>
              
              <div className="flex justify-between mt-3 text-[10px] text-gray-500 font-bold uppercase tracking-widest min-w-[500px] md:min-w-0">
                <span>Less Active</span>
                <div className="flex gap-[3px]">
                  {['#1E293B', '#4C1D95', '#7C3AED', '#8B5CF6', '#C4B5FD'].map(c => (
                    <div key={c} className="w-3 h-3 rounded-[2px]" style={{ backgroundColor: c }} />
                  ))}
                </div>
                <span>More Active</span>
              </div>
            </div>

            <div className="flex gap-8 mt-6 pt-4 border-t border-white/[0.05]">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                  <TrendingUp size={16} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">Peak Day</p>
                  <p className="font-bold text-sm text-purple-400">Wed</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                  <Calendar size={16} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">Best Month</p>
                  <p className="font-bold text-sm text-blue-400">May</p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="bg-[#110F14] border border-white/[0.06] rounded-[24px] p-5 md:p-6 h-full flex flex-col">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <h3 className="text-xl font-bold">Pulse Insights</h3>
            </div>
            
            <div className="space-y-5 flex-1">
              <div className="p-4 bg-white/[0.03] border border-white/[0.05] rounded-2xl">
                <p className="text-xs font-bold text-white leading-relaxed">
                  Looking good, Nikol! You gained <span className="text-purple-400">120 XP</span> today. 
                  You're in the top <span className="text-blue-400">5%</span> of active players this week.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Next Milestone</span>
                  <span className="text-[10px] text-purple-400 font-bold">15 XP to LVL 13</span>
                </div>
                <div className="h-1.5 w-full bg-white/[0.05] rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full w-[85%] shadow-[0_0_10px_#8B5CF6]" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-white/[0.02] border border-white/[0.05] rounded-xl">
                  <p className="text-[9px] text-gray-500 font-bold uppercase mb-1">Weekly Goal</p>
                  <p className="text-sm font-bold text-white">85%</p>
                </div>
                <div className="p-3 bg-white/[0.02] border border-white/[0.05] rounded-xl">
                  <p className="text-[9px] text-gray-500 font-bold uppercase mb-1">Focus Game</p>
                  <p className="text-sm font-bold text-white">Elden Ring</p>
                </div>
              </div>

              <div className="flex gap-3 items-start p-3 rounded-xl bg-blue-500/5 border border-blue-500/10">
                <Zap size={14} className="text-blue-400 shrink-0 mt-0.5" />
                <p className="text-[11px] text-blue-200/70 leading-normal">
                  You play best on <span className="text-blue-300 font-bold">Wednesdays</span>. Try to tackle that boss today!
                </p>
              </div>
            </div>

            <button className="mt-6 w-full py-3 bg-purple-600/10 hover:bg-purple-600/20 text-purple-400 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 group">
              Open Full Chat <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </FadeIn>

        <FadeIn>
          <div 
            ref={containerRef}
            onClick={handleCompanionClick}
            className="bg-gradient-to-b from-[#1A181E] to-[#110F14] border border-white/[0.06] rounded-[24px] h-full flex items-center justify-center relative overflow-hidden group min-h-[300px] cursor-pointer active:scale-95 transition-transform"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-purple-500/20 opacity-50 group-hover:opacity-100 transition-opacity" />

            <div className="absolute w-[180px] h-[180px] bg-purple-600/20 blur-[60px] rounded-full animate-pulse" />

            <button 
              onClick={handlePetCompanion}
              className="absolute top-4 left-4 z-20 p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all group/pet active:scale-90"
              title="Pet Pulse"
            >
              <Heart 
                size={18} 
                className="text-pink-500 fill-pink-500/10 group-hover/pet:fill-pink-500 group-hover/pet:scale-110 transition-all duration-300" 
              />
            </button>

            <div ref={characterRef} className="relative z-10">
              <Image 
                src={currentAsset} 
                alt="Companion" 
                width={223} 
                height={252} 
                className="object-contain transform group-hover:scale-105 transition-all duration-700 ease-out"
                priority
              />
            </div>

            <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-xl">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold text-white/80 tracking-widest uppercase">{status}</span>
                {isLoved && <Heart size={10} className="text-pink-500 fill-pink-500 animate-pulse" />}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FadeIn>
          <div className="bg-[#110F14] border border-white/[0.06] rounded-[24px] p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl md:text-2xl font-bold">Recent Activity</h3>
              <button 
                onClick={() => onNavigate('Achievements')}
                className="text-purple-400 text-xs md:text-sm font-bold hover:underline"
              >
                View All
              </button>
            </div>
            <div className="space-y-4">
              {[
                { icon: Zap, color: '#38BDF8', text: '+25 XP from Elden Ring', time: '2 hours ago' },
                { icon: Award, color: '#FFCC00', text: 'Achievement Unlocked: Master Explorer', time: '5 hours ago' },
                { icon: Gamepad2, color: '#8B5CF6', text: 'Started new session in Hades II', time: 'Yesterday' },
                { icon: Trophy, color: '#FFCC00', text: 'Reached Level 12', time: '2 days ago' },
              ].map((activity, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-colors cursor-pointer group">
                  <div className="p-2 rounded-xl bg-white/[0.03] group-hover:scale-110 transition-transform shrink-0">
                    <activity.icon size={20} color={activity.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-200 text-sm md:text-base truncate">{activity.text}</p>
                    <p className="text-[10px] md:text-xs text-gray-500 mt-0.5">{activity.time}</p>
                  </div>
                  <ChevronRight size={16} className="text-gray-600 group-hover:text-gray-400 transition-colors shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="bg-[#110F14] border border-white/[0.06] rounded-[24px] p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl md:text-2xl font-bold">Top Games</h3>
              <button 
                onClick={() => onNavigate('Games')}
                className="text-purple-400 text-xs md:text-sm font-bold hover:underline"
              >
                Manage Games
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: 'Elden Ring', hours: '52h', progress: 85, color: '#38BDF8' },
                { name: 'Valorant', hours: '34h', progress: 60, color: '#8B5CF6' },
                { name: 'Cyberpunk 2077', hours: '21h', progress: 40, color: '#FFCC00' },
                { name: 'Hades II', hours: '12h', progress: 15, color: '#22C55E' },
              ].map((game, i) => (
                <div key={i} className="p-4 md:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-purple-500/30 transition-all cursor-pointer group">
                  <div className="flex justify-between items-start mb-4">
                    <p className="font-bold text-base md:text-lg group-hover:text-purple-400 transition-colors truncate pr-2">{game.name}</p>
                    <p className="text-gray-400 font-bold text-sm shrink-0">{game.hours}</p>
                  </div>
                  <div className="h-1.5 md:h-2 w-full bg-white/[0.05] rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-1000"
                      style={{ width: `${game.progress}%`, backgroundColor: game.color, boxShadow: `0 0 10px ${game.color}44` }}
                    />
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Progress</span>
                    <span className="text-[9px] text-gray-400 font-bold">{game.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}