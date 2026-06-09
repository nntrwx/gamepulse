'use client';

import { useState } from 'react';
import { Trophy, Star, Target, Flame, ChevronRight, Search, Filter, Award, Zap, Lock, Unlock } from 'lucide-react';
import { FadeIn, HoverCard } from '@/components/ui/MotionWrapper';

const ACHIEVEMENTS = [
  {
    id: 1,
    name: 'Elden Lord',
    game: 'Elden Ring',
    description: 'Reached the "Elden Lord" ending.',
    rarity: 'Legendary',
    date: '2024-05-15',
    icon: Trophy,
    color: '#FFD700',
    points: 100,
    unlocked: true,
  },
  {
    id: 2,
    name: 'Night City Legend',
    game: 'Cyberpunk 2077',
    description: 'Complete all side gigs and NCPD scanner hustles.',
    rarity: 'Epic',
    date: '2024-06-02',
    icon: Star,
    color: '#38BDF8',
    points: 75,
    unlocked: true,
  },
  {
    id: 3,
    name: 'Perfect Run',
    game: 'Hades II',
    description: 'Clear a run without taking any damage.',
    rarity: 'Mythic',
    progress: 85,
    icon: Flame,
    color: '#EF4444',
    points: 150,
    unlocked: false,
  },
  {
    id: 4,
    name: 'Radiant Rank',
    game: 'Valorant',
    description: 'Reach the highest rank in competitive play.',
    rarity: 'Legendary',
    progress: 40,
    icon: Zap,
    color: '#8B5CF6',
    points: 200,
    unlocked: false,
  },
  {
    id: 5,
    name: 'Master Explorer',
    game: 'Ghost of Tsushima',
    description: 'Find all Hot Springs, Haiku, Inari Shrines, and Bamboo Strikes.',
    rarity: 'Rare',
    date: '2024-04-20',
    icon: Target,
    color: '#22C55E',
    points: 50,
    unlocked: true,
  },
  {
    id: 6,
    name: 'Absolute Completion',
    game: 'Baldur\'s Gate 3',
    description: 'Complete the game on Tactician difficulty.',
    rarity: 'Epic',
    progress: 65,
    icon: Award,
    color: '#F97316',
    points: 100,
    unlocked: false,
  },
];

export default function Achievements() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filteredAchievements = ACHIEVEMENTS.filter(ach => {
    const matchesSearch = ach.name.toLowerCase().includes(search.toLowerCase()) || 
                          ach.game.toLowerCase().includes(search.toLowerCase());
    if (filter === 'All') return matchesSearch;
    if (filter === 'Unlocked') return matchesSearch && ach.unlocked;
    if (filter === 'Locked') return matchesSearch && !ach.unlocked;
    return matchesSearch && ach.rarity === filter;
  });

  const stats = [
    { label: 'Total Points', value: '4,250', icon: Trophy, color: '#FFD700' },
    { label: 'Unlocked', value: '124', icon: Unlock, color: '#22C55E' },
    { label: 'Completion', value: '68%', icon: Target, color: '#38BDF8' },
    { label: 'Rare Earned', value: '12', icon: Star, color: '#A855F7' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <div className="bg-[#110F14] border border-white/[0.06] rounded-2xl p-5 relative overflow-hidden group">
              <div className="absolute -right-2 -bottom-2 opacity-5 group-hover:opacity-10 transition-opacity rotate-12">
                <stat.icon size={80} color={stat.color} />
              </div>
              <div className="relative z-10">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">{stat.label}</p>
                <div className="flex items-center gap-3">
                  <h4 className="text-2xl font-bold text-white">{stat.value}</h4>
                  <div className="p-1.5 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                    <stat.icon size={16} color={stat.color} />
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Controls */}
      <FadeIn>
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-[#110F14] border border-white/[0.06] p-4 rounded-[24px]">
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search achievements or games..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/[0.05] rounded-xl py-3 pl-12 pr-4 outline-none focus:border-purple-500/50 transition-all text-sm"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-hide">
            {['All', 'Unlocked', 'Locked', 'Legendary', 'Epic'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2.5 rounded-xl border text-xs font-bold whitespace-nowrap transition-all ${
                  filter === f 
                    ? 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-600/20' 
                    : 'bg-white/[0.03] border-white/[0.05] text-gray-400 hover:border-white/20 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Achievement Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAchievements.map((ach, i) => (
          <FadeIn key={ach.id} delay={i * 0.05}>
            <HoverCard className={`bg-[#110F14] border border-white/[0.06] rounded-[24px] p-6 relative group h-full flex flex-col ${!ach.unlocked ? 'opacity-80' : ''}`}>
              {!ach.unlocked && (
                <div className="absolute top-4 right-4 text-gray-600">
                  <Lock size={18} />
                </div>
              )}
              {ach.unlocked && (
                <div className="absolute top-4 right-4 text-green-500">
                  <Unlock size={18} />
                </div>
              )}
              
              <div className="flex items-start gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.05] group-hover:scale-110 transition-transform duration-500 relative">
                  <div className="absolute inset-0 blur-xl opacity-20 group-hover:opacity-40 transition-opacity rounded-full" style={{ backgroundColor: ach.color }} />
                  <ach.icon size={32} color={ach.color} className="relative z-10" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-white/[0.05] border border-white/[0.1] text-gray-400 uppercase tracking-tighter">
                      {ach.rarity}
                    </span>
                    <span className="text-[10px] font-bold text-purple-400">+{ach.points} PTS</span>
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors leading-tight">{ach.name}</h3>
                  <p className="text-xs text-gray-500 font-medium">{ach.game}</p>
                </div>
              </div>

              <p className="text-sm text-gray-400 mb-6 flex-1 line-clamp-2">
                {ach.description}
              </p>

              <div className="mt-auto pt-6 border-t border-white/[0.05]">
                {ach.unlocked ? (
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Unlocked on</p>
                      <p className="text-sm font-bold text-gray-300">{ach.date}</p>
                    </div>
                    <div className="p-2 rounded-lg bg-green-500/10 text-green-500">
                      <Trophy size={16} />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex justify-between items-end">
                      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Progress</span>
                      <span className="text-[10px] text-purple-400 font-bold">{ach.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/[0.05] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-purple-500 rounded-full transition-all duration-1000"
                        style={{ width: `${ach.progress}%`, boxShadow: '0 0 10px #8B5CF6' }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </HoverCard>
          </FadeIn>
        ))}
      </div>

      {filteredAchievements.length === 0 && (
        <FadeIn>
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-white/[0.02] border border-white/[0.05] rounded-3xl flex items-center justify-center mb-6">
              <Trophy size={40} className="text-gray-600" />
            </div>
            <h3 className="text-2xl font-bold mb-2">No achievements found</h3>
            <p className="text-gray-400 max-w-xs">Try adjusting your filters or search to discover your milestones.</p>
          </div>
        </FadeIn>
      )}
    </div>
  );
}