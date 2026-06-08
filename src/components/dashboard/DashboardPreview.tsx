import { Zap, Trophy, Gamepad2, Clock, Flame, Award } from 'lucide-react';
import Image from 'next/image';

export default function DashboardPreview() {
  const palette = ['#1E293B', '#4C1D95', '#4C1D95', '#7C3AED', '#8B5CF6', '#C4B5FD'];
  const gridCells = Array.from({ length: 210 }, () => palette[Math.floor(Math.random() * palette.length)]);

  const textShadows: Record<string, string> = {
    '#38BDF8': '0px 4px 4px rgba(125,211,252,0.25)',
    '#FFCC00': '0px 4px 4px rgba(255,218,96,0.25)',
    '#8B5CF6': '0px 4px 4px rgba(92,76,151,0.25)',
    '#22C55E': '0px 4px 4px rgba(134,239,172,0.25)',
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto p-7 bg-[linear-gradient(180deg,rgba(46,30,58,0.95)_0%,rgba(22,8,32,0.97)_100%)] border border-[#62697C8C] rounded-[24px] shadow-[0px_4px_20px_rgba(176,10,253,0.25)] text-white">

      <div className="grid grid-cols-4 gap-4 mb-4">
        {[
          { label: 'TOTAL XP', value: '2,450 XP', sub: '+120 this week', icon: Zap, color: '#38BDF8' },
          { label: 'CURRENT LEVEL', value: 'LVL 12', sub: '85% to LVL 13', icon: Trophy, color: '#FFCC00' },
          { label: 'GAMES TRACKED', value: '34', sub: '+2 this month', icon: Gamepad2, color: '#8B5CF6' },
          { label: 'PLAYTIME', value: '128h', sub: '+14h this week', icon: Clock, color: '#22C55E' },
        ].map((item, i) => (
          <div key={i} className="bg-[#110F14] border border-white/[0.06] rounded-[20px] px-5 py-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[13px] font-bold tracking-wide text-white">{item.label}</span>
              <item.icon size={28} color={item.color} />
            </div>
            <div
              className="text-[32px] font-bold leading-none mb-1"
              style={{ color: item.color, textShadow: textShadows[item.color] }}
            >
              {item.value}
            </div>
            <div className="text-[13px] text-[#CBD5E1]">{item.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4 items-start">

        <div className="col-span-2 bg-[#110F14] px-6 pt-5 pb-5 rounded-[20px]" style={{ width: '760px', height: '300px' }}>
          <div className="flex justify-between items-center mb-4">
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
              <div
                key={i}
                style={{ background: color, borderRadius: '2px', aspectRatio: '1' }}
              />
            ))}
          </div>

          <p className="text-[14px] font-bold mt-4">
            Most Active Day: <span className="text-[#8B5CF6]">Wednesday</span>
          </p>
        </div>

        <div className="bg-[#110F14] rounded-[20px] relative overflow-hidden" style={{ height: '300px' }}>
          <div className="absolute top-[23px] left-[23px] right-[23px]">
            <h3 className="text-[32px] font-bold leading-none mb-[10px]">Pulse Companion</h3>
            <p className="text-[16px] font-bold text-[#CBD5E1]">
              Mood: <span className="text-[#C4B5FD]">excited!</span>
            </p>
          </div>

          <div
            className="absolute"
            style={{
              width: '196px',
              height: '222px',
              right: '0px',
              top: '31px',
              filter: 'drop-shadow(0px 4px 15px rgba(148,166,255,0.25))',
            }}
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

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#110F14] px-6 pt-5 pb-6 rounded-[20px]">
          <h3 className="text-[22px] font-bold mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-[15px] text-[#CBD5E1]">
              <Zap size={20} color="#38BDF8" className="shrink-0" />
              +25 XP from Elden Ring
            </div>
            <div className="flex items-center gap-3 text-[15px] text-[#CBD5E1]">
              <Award size={20} color="#FFCC00" className="shrink-0" />
              Achievement Unlocked: Master Explorer
            </div>
          </div>
        </div>

        <div className="bg-[#110F14] px-6 pt-5 pb-6 rounded-[20px]">
          <h3 className="text-[22px] font-bold mb-4">Top Games</h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-[15px] text-[#CBD5E1]">
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