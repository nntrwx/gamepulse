import { Zap, Trophy, TrendingUp, Flame, Bot, Library } from 'lucide-react';

const features = [
  { title: 'XP Progression', desc: 'Gain experience points from every gaming session and watch your profile evolve over time.', icon: Zap, iconBg: 'bg-purple-500/10', iconColor: '#38BDF8' },
  { title: 'Achievements', desc: 'Unlock milestones and celebrate every important step of your gaming journey.', icon: Trophy, iconBg: 'bg-yellow-500/10', iconColor: '#FFCC00' },
  { title: 'Analytics', desc: 'Visualize playtime, consistency, favorite games, and long-term progress.', icon: TrendingUp, iconBg: 'bg-green-500/10', iconColor: '#22C55E' },
  { title: 'Daily Streaks', desc: 'Stay consistent and build gaming habits through rewarding streak systems.', icon: Flame, iconBg: 'bg-orange-500/10', iconColor: '#FF5900' },
  { title: 'Pulse', desc: 'A digital companion that reacts to your achievements, XP gains, and level ups.', icon: Bot, iconBg: 'bg-sky-500/10', iconColor: '#91E2FF' },
  { title: 'Game Library', desc: 'Keep your favorite games organized and monitor your activity across titles.', icon: Library, iconBg: 'bg-purple-500/10', iconColor: '#8B5CF6' },
];

export default function Features() {
  return (
    <section className="max-w-[1200px] mx-auto py-20 px-4">
      <div className="text-center mb-16">
        <h2 className="text-[64px] font-bold text-white mb-2">Features</h2>
        <p className="text-[20px] text-[#CBD5E1]">Everything You Need To Track Your Gaming Journey</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, i) => (
          <div 
            key={i} 
            className="w-full min-h-[240px] h-auto bg-[#141B2D]/95 border border-white/[0.06] rounded-[24px] p-8 shadow-lg flex flex-col"
          >
            <div className={`w-[71px] h-[71px] ${feature.iconBg} border border-white/15 rounded-[16px] flex items-center justify-center mb-6 shrink-0`}>
              <feature.icon size={32} color={feature.iconColor} />
            </div>
            
            <h3 className="text-[36px] font-bold text-white mb-2 leading-tight">
              {feature.title}
            </h3>
            
            <p className="text-[20px] text-[#CBD5E1] leading-snug">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}