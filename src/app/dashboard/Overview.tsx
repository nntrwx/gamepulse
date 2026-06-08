'use client';

import { useState, useEffect } from 'react';
import { Zap, Trophy, Gamepad2, Clock, Flame, Award, TrendingUp, Calendar, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { HoverCard, FadeIn } from '@/components/ui/MotionWrapper';

interface OverviewProps {
  onNavigate: (tab: string) => void;
}

export default function Overview({ onNavigate }: OverviewProps) {
  const basePath = '/gamepulse';
  
  const [gridCells, setGridCells] = useState<string[]>(() => Array.from({ length: 210 }, () => '#1E293B'));

  useEffect(() => {
    const palette = ['#1E293B', '#4C1D95', '#4C1D95', '#7C3AED', '#8B5CF6', '#C4B5FD'];
    setGridCells(Array.from({ length: 210 }, () => palette[Math.floor(Math.random() * palette.length)]));
  }, []);

  const stats = [
    { label: 'TOTAL XP', value: '2,450', unit: 'XP', sub: '+120 this week', icon: Zap, color: '#38BDF8', trend: '+5.2%' },
    { label: 'CURRENT LEVEL', value: '12', unit: 'LVL', sub: '85% to LVL 13', icon: Trophy, color: '#FFCC00', trend: 'Top 10%' },
    { label: 'GAMES TRACKED', value: '34', unit: 'GAMES', sub: '+2 this month', icon: Gamepad2, color: '#8B5CF6', trend: '+12%' },
    { label: 'PLAYTIME', value: '128', unit: 'HOURS', sub: '+14h this week', icon: Clock, color: '#22C55E', trend: '+8.4%' },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
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
          <div className="bg-[#110F14] border border-white/[0.06] rounded-[24px] p-6 h-full flex flex-col justify-between">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-xl font-bold mb-0.5">Gaming Consistency</h3>
                <p className="text-gray-400 text-xs">Activity tracking (last 30 weeks)</p>
              </div>
              <div className="flex items-center gap-2 bg-[#1A181E] px-3 py-1.5 rounded-xl border border-white/[0.05]">
                <Flame size={16} color="#FF5900" className="animate-pulse" />
                <span className="font-bold text-sm">18 Day Streak</span>
              </div>
            </div>

            <div className="my-2">
              <div className="grid grid-cols-[repeat(30,1fr)] gap-[3px] w-full">
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
              
              <div className="flex justify-between mt-3 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                <span>Less Active</span>
                <div className="flex gap-[3px]">
                  {['#1E293B', '#4C1D95', '#7C3AED', '#8B5CF6', '#C4B5FD'].map(c => (
                    <div key={c} className="w-3 h-3 rounded-[2px]" style={{ backgroundColor: c }} />
                  ))}
                </div>
                <span>More Active</span>
              </div>
            </div>

            <div className="flex gap-8 mt-4 pt-4 border-t border-white/[0.05]">
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
          <div className="bg-[#110F14] border border-white/[0.06] rounded-[24px] p-6 h-full flex flex-col">
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
          <div className="bg-gradient-to-b from-[#1A181E] to-[#110F14] border border-white/[0.06] rounded-[24px] h-full flex items-center justify-center relative overflow-hidden group min-h-[320px]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-purple-500/20 opacity-50 group-hover:opacity-100 transition-opacity" />

            <div className="absolute w-[200px] h-[200px] bg-purple-600/20 blur-[80px] rounded-full animate-pulse" />

            <Image 
              src={`${basePath}/happy.png`} 
              alt="Companion" 
              width={260} 
              height={260} 
              className="object-contain relative z-10 transform group-hover:scale-110 transition-all duration-700 ease-out"
              priority
            />

            <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-xl">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
              <span className="text-[10px] font-bold text-white/80 tracking-widest uppercase">Live</span>
            </div>
          </div>
        </FadeIn>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FadeIn>
          <div className="bg-[#110F14] border border-white/[0.06] rounded-[24px] p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Recent Activity</h3>
              <button 
                onClick={() => onNavigate('Achievements')}
                className="text-purple-400 text-sm font-bold hover:underline"
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
                  <div className="p-2 rounded-xl bg-white/[0.03] group-hover:scale-110 transition-transform">
                    <activity.icon size={20} color={activity.color} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-200">{activity.text}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{activity.time}</p>
                  </div>
                  <ChevronRight size={16} className="text-gray-600 group-hover:text-gray-400 transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="bg-[#110F14] border border-white/[0.06] rounded-[24px] p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Top Games</h3>
              <button 
                onClick={() => onNavigate('Games')}
                className="text-purple-400 text-sm font-bold hover:underline"
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
                <div key={i} className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-purple-500/30 transition-all cursor-pointer group">
                  <div className="flex justify-between items-start mb-4">
                    <p className="font-bold text-lg group-hover:text-purple-400 transition-colors">{game.name}</p>
                    <p className="text-gray-400 font-bold">{game.hours}</p>
                  </div>
                  <div className="h-2 w-full bg-white/[0.05] rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-1000"
                      style={{ width: `${game.progress}%`, backgroundColor: game.color, boxShadow: `0 0 10px ${game.color}44` }}
                    />
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Progress</span>
                    <span className="text-[10px] text-gray-400 font-bold">{game.progress}%</span>
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