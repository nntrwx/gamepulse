'use client';
import { useState, useEffect } from 'react';
import { Zap, Trophy, Gamepad2, Clock, Flame, Award } from 'lucide-react';
import Image from 'next/image';

export default function DashboardPreview() {
  const [gridCells, setGridCells] = useState<string[]>([]);

  useEffect(() => {
    const palette = ['#1E293B', '#4C1D95', '#4C1D95', '#7C3AED', '#8B5CF6', '#C4B5FD'];
    setGridCells(Array.from({ length: 210 }, () => palette[Math.floor(Math.random() * palette.length)]));
  }, []);

  const textShadows: Record<string, string> = {
    '#38BDF8': '0px 4px 4px rgba(125,211,252,0.25)',
    '#FFCC00': '0px 4px 4px rgba(255,218,96,0.25)',
    '#8B5CF6': '0px 4px 4px rgba(92,76,151,0.25)',
    '#22C55E': '0px 4px 4px rgba(134,239,172,0.25)',
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto p-4 md:p-7 bg-[linear-gradient(180deg,rgba(46,30,58,0.95)_0%,rgba(22,8,32,0.97)_100%)] border border-[#62697C8C] rounded-[24px] shadow-[0px_4px_20px_rgba(176,10,253,0.25)] text-white">

      {/* Stat cards: 2×2 на мобиле, 4×1 на десктопе */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-3 md:mb-4">
        {[
          { label: 'TOTAL XP',      value: '2,450 XP', sub: '+120 this week', icon: Zap,      color: '#38BDF8' },
          { label: 'CURRENT LEVEL', value: 'LVL 12',   sub: '85% to LVL 13', icon: Trophy,   color: '#FFCC00' },
          { label: 'GAMES TRACKED', value: '34',        sub: '+2 this month',  icon: Gamepad2, color: '#8B5CF6' },
          { label: 'PLAYTIME',      value: '128h',      sub: '+14h this week', icon: Clock,    color: '#22C55E' },
        ].map((item, i) => (
          <div key={i} className="bg-[#110F14] border border-white/[0.06] rounded-[20px] px-4 py-3 md:px-5 md:py-4">
            <div className="flex justify-between items-center mb-1 md:mb-2">
              <span className="text-[10px] md:text-[13px] font-bold tracking-wide text-white leading-tight">{item.label}</span>
              <item.icon size={20} color={item.color} className="md:hidden shrink-0" />
              <item.icon size={28} color={item.color} className="hidden md:block shrink-0" />
            </div>
            <div
              className="text-[14px] md:text-[32px] font-bold leading-none mb-1"
              style={{ color: item.color, textShadow: textShadows[item.color] }}
            >
              {item.value}
            </div>
            <div className="text-[8px] md:text-[13px] text-[#CBD5E1]">{item.sub}</div>
          </div>
        ))}
      </div>

      {/* Middle row */}
      <div className="flex flex-col md:grid md:grid-cols-3 gap-3 md:gap-4 mb-3 md:mb-4 md:items-start">

        {/* Gaming Consistency */}
        <div
          className="w-full bg-[#110F14] px-4 pt-4 pb-4 md:col-span-2 md:px-6 md:pt-5 md:pb-5 rounded-[20px]"
          style={{ height: undefined }}
        >
          {/* Мобайл-хедер */}
          <div className="flex justify-between items-center mb-3 md:hidden">
            <h3 className="text-[14px] font-bold">Gaming Consistency</h3>
            <div className="flex items-center gap-1 text-[12px] font-medium">
              <Flame size={14} color="#FF5900" /> 18d
            </div>
          </div>
          {/* Десктоп-хедер — оригинальный */}
          <div className="hidden md:flex justify-between items-center mb-4">
            <h3 className="text-[22px] font-bold">Gaming Consistency</h3>
            <div className="flex items-center gap-1.5 text-[15px] font-medium">
              <Flame size={18} color="#FF5900" /> 18 day streak
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(30, 1fr)',
              gridAutoFlow: 'row',
              gap: '3px',
            }}
          >
            {gridCells.map((color, i) => (
              <div key={i} style={{ background: color, borderRadius: '2px', aspectRatio: '1' }} />
            ))}
          </div>

          <p className="text-[10px] md:text-[14px] font-bold mt-3 md:mt-4">
            Most Active Day: <span className="text-[#8B5CF6]">Wednesday</span>
          </p>
        </div>

        {/* Pulse Companion */}
        {/* Мобайл */}
        <div
          className="md:hidden w-full bg-[#110F14] rounded-[20px] relative overflow-hidden"
          style={{ height: '190px' }}
        >
          <div className="absolute top-[14px] left-[14px] right-[14px]">
            <h3 className="text-[18px] font-bold leading-none mb-[6px]">Pulse Companion</h3>
            <p className="text-[10px] font-bold text-[#CBD5E1]">
              Mood: <span className="text-[#C4B5FD]">excited!</span>
            </p>
          </div>
          <div
            className="absolute"
            style={{ width: '110px', height: '124px', right: '0px', top: '18px', filter: 'drop-shadow(0px 4px 15px rgba(148,166,255,0.25))' }}
          >
            <Image src="/happy.png" alt="Companion" fill className="object-contain" />
          </div>
          <div className="absolute bottom-[14px] left-[14px]" style={{ maxWidth: '180px' }}>
            <p className="text-[10px] font-bold text-[#CBD5E1] leading-[14px]">
              <span className="text-white">Looking good!</span><br />
              You gained 120 XP today.<br />
              Only 15 XP left until LVL 13.
            </p>
          </div>
        </div>

        {/* Десктоп — оригинальный */}
        <div className="hidden md:block bg-[#110F14] rounded-[20px] relative overflow-hidden" style={{ height: '300px' }}>
          <div className="absolute top-[23px] left-[23px] right-[23px]">
            <h3 className="text-[32px] font-bold leading-none mb-[10px]">Pulse Companion</h3>
            <p className="text-[16px] font-bold text-[#CBD5E1]">
              Mood: <span className="text-[#C4B5FD]">excited!</span>
            </p>
          </div>
          <div
            className="absolute"
            style={{ width: '196px', height: '222px', right: '0px', top: '31px', filter: 'drop-shadow(0px 4px 15px rgba(148,166,255,0.25))' }}
          >
            <Image src="/happy.png" alt="Companion" fill className="object-contain" />
          </div>
          <div className="absolute bottom-[23px] left-[23px]" style={{ maxWidth: '237px' }}>
            <p className="text-[16px] font-bold text-[#CBD5E1] leading-[19px]">
              <span className="text-white">Looking good!</span><br />
              You gained 120 XP today.<br />
              Only 15 XP left until LVL 13.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col md:grid md:grid-cols-2 gap-3 md:gap-4">

        <div className="bg-[#110F14] px-4 pt-4 pb-4 md:px-6 md:pt-5 md:pb-6 rounded-[20px]">
          <h3 className="text-[14px] md:text-[22px] font-bold mb-3 md:mb-4">Recent Activity</h3>
          <div className="space-y-2 md:space-y-3">
            <div className="flex items-center gap-2 md:gap-3 text-[10px] md:text-[15px] text-[#CBD5E1]">
              <Zap size={14} color="#38BDF8" className="shrink-0 md:hidden" />
              <Zap size={20} color="#38BDF8" className="shrink-0 hidden md:block" />
              +25 XP from Elden Ring
            </div>
            <div className="flex items-center gap-2 md:gap-3 text-[10px] md:text-[15px] text-[#CBD5E1]">
              <Award size={14} color="#FFCC00" className="shrink-0 md:hidden" />
              <Award size={20} color="#FFCC00" className="shrink-0 hidden md:block" />
              Achievement Unlocked: Master Explorer
            </div>
          </div>
        </div>

        <div className="bg-[#110F14] px-4 pt-4 pb-4 md:px-6 md:pt-5 md:pb-6 rounded-[20px]">
          <h3 className="text-[14px] md:text-[22px] font-bold mb-3 md:mb-4">Top Games</h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 md:gap-y-3 text-[10px] md:text-[15px] text-[#CBD5E1]">
            <span>Elden Ring - 52h</span>
            <span>Cyberpunk 2077 - 21h</span>
            <span>Valorant - 34h</span>
            <span>Hades II - 12h</span>
          </div>
        </div>

      </div>
    </div>
  );
}