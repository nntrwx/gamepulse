'use client';

import { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight, 
  Calendar,
  Activity,
  Zap,
  Share2,
  Download,
  Sword,
  Target,
  Flame,
  RefreshCw
} from 'lucide-react';
import { FadeIn, HoverCard } from '@/components/ui/MotionWrapper';

// Mock data for professional look
const METRICS = [
  { label: 'Active Sessions', value: '1,284', trend: '+12.5%', isPositive: true, icon: Activity, color: '#8B5CF6' },
  { label: 'Avg. Playtime', value: '4.2h', trend: '+5.2%', isPositive: true, icon: Clock, color: '#38BDF8' },
  { label: 'Completion Rate', value: '64.2%', trend: '-2.1%', isPositive: false, icon: Zap, color: '#F59E0B' },
  { label: 'Community Rank', value: 'Top 5%', trend: '+0.8%', isPositive: true, icon: Users, color: '#10B981' },
];

const WEEKLY_DATA = [
  { day: 'Mon', value: 45 },
  { day: 'Tue', value: 52 },
  { day: 'Wed', value: 85 },
  { day: 'Thu', value: 64 },
  { day: 'Fri', value: 92 },
  { day: 'Sat', value: 78 },
  { day: 'Sun', value: 58 },
];

const PURPLE_PALETTE = ['#4C1D95', '#7C3AED', '#8B5CF6', '#C4B5FD'];

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('Last 7 Days');

  // SVG Line Path Calculation
  const generatePath = () => {
    const width = 100; // Percent
    const height = 100; // Percent
    const points = WEEKLY_DATA.map((d, i) => {
      const x = (i / (WEEKLY_DATA.length - 1)) * 100;
      const y = 100 - d.value;
      return `${x},${y}`;
    }).join(' ');
    return points;
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Actions */}
      <FadeIn>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#110F14] border border-white/[0.06] p-4 rounded-[24px]">
          <div className="flex gap-2 p-1 bg-white/[0.03] rounded-xl border border-white/[0.05]">
            {['Last 7 Days', 'Last 30 Days', 'Last Year'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  timeRange === range 
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20' 
                    : 'text-gray-500 hover:text-white'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.08] px-4 py-2.5 rounded-xl text-xs font-bold transition-all">
              <Share2 size={16} /> Share
            </button>
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-lg shadow-purple-600/20">
              <Download size={16} /> Export CSV
            </button>
          </div>
        </div>
      </FadeIn>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {METRICS.map((metric, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <HoverCard className="bg-[#110F14] border border-white/[0.06] rounded-[24px] p-6 relative overflow-hidden group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.05]">
                  <metric.icon size={20} color={metric.color} />
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold ${
                  metric.isPositive ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                }`}>
                  {metric.isPositive ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                  {metric.trend}
                </div>
              </div>
              <div>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">{metric.label}</p>
                <h3 className="text-3xl font-bold text-white">{metric.value}</h3>
              </div>
              <div className="mt-4 h-1 w-full bg-white/[0.02] rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-1000" 
                  style={{ 
                    width: metric.isPositive ? '70%' : '40%', 
                    backgroundColor: metric.color,
                    boxShadow: `0 0 10px ${metric.color}66`
                  }} 
                />
              </div>
            </HoverCard>
          </FadeIn>
        ))}
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Engagement Chart */}
        <FadeIn className="lg:col-span-2">
          <div className="bg-[#110F14] border border-white/[0.06] rounded-[32px] p-8 h-full">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h3 className="text-xl font-bold">Engagement Analysis</h3>
                <p className="text-gray-500 text-sm">Real-time session intensity tracking</p>
              </div>
              <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-tighter">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                  <span className="text-gray-400">Current</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-white/10" />
                  <span className="text-gray-500">Average</span>
                </div>
              </div>
            </div>

            <div className="h-64 relative group/chart">
              {/* Grid Lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-full border-t border-white/10" />
                ))}
              </div>

              {/* Line Chart SVG */}
              <svg 
                className="absolute inset-0 w-full h-full overflow-visible" 
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
                  </linearGradient>
                </defs>
                
                {/* Area under the line (Smooth) */}
                <path
                  fill="url(#chartGradient)"
                  stroke="none"
                  d={`M 0,100 ${WEEKLY_DATA.map((d, i, arr) => {
                    const x = (i / (arr.length - 1)) * 100;
                    const y = 80 - (d.value * 0.5); 
                    if (i === 0) return `L ${x},${y}`;
                    const prevX = ((i - 1) / (arr.length - 1)) * 100;
                    const cpX = (prevX + x) / 2;
                    return `C ${cpX},${80 - (arr[i-1].value * 0.5)} ${cpX},${y} ${x},${y}`;
                  }).join(' ')} L 100,100 Z`}
                />

                {/* Main line (Smooth Curve) */}
                <path
                  fill="none"
                  stroke="#8B5CF6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={`M 0,${80 - (WEEKLY_DATA[0].value * 0.5)} ${WEEKLY_DATA.map((d, i, arr) => {
                    if (i === 0) return '';
                    const x = (i / (arr.length - 1)) * 100;
                    const y = 80 - (d.value * 0.5);
                    const prevX = ((i - 1) / (arr.length - 1)) * 100;
                    const cpX = (prevX + x) / 2;
                    return `C ${cpX},${80 - (arr[i-1].value * 0.5)} ${cpX},${y} ${x},${y}`;
                  }).join(' ')}`}
                  className="drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]"
                />
              </svg>

              {/* HTML Overlay for Dots (to prevent distortion) */}
              <div className="absolute inset-0 pointer-events-none">
                {WEEKLY_DATA.map((d, i) => {
                  const x = (i / (WEEKLY_DATA.length - 1)) * 100;
                  const y = 80 - (d.value * 0.5);
                  return (
                    <div 
                      key={i}
                      className="absolute w-2 h-2 -ml-1 -mt-1 bg-[#110F14] border-0.8 border-[#8B5CF6] rounded-full shadow-[0_0_8px_#8B5CF6] transition-transform hover:scale-150 pointer-events-auto cursor-pointer"
                      style={{ left: `${x}%`, top: `${y}%` }}
                    />
                  );
                })}
              </div>

              {/* X-Axis Labels */}
              <div className="absolute -bottom-8 w-full flex justify-between px-1">
                {WEEKLY_DATA.map((d, i) => (
                  <span key={i} className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{d.day}</span>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Platform Breakdown */}
        <FadeIn>
          <div className="bg-[#110F14] border border-white/[0.06] rounded-[32px] p-8 h-full flex flex-col">
            <h3 className="text-xl font-bold mb-6">Platform Distribution</h3>
            <div className="space-y-6 flex-1">
              {[
                { name: 'PC (Steam)', value: 65, color: '#38BDF8' },
                { name: 'PlayStation 5', value: 20, color: '#8B5CF6' },
                { name: 'Xbox Series X', value: 10, color: '#22C55E' },
                { name: 'Switch', value: 5, color: '#F59E0B' },
              ].map((platform, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-gray-300">{platform.name}</span>
                    <span className="text-xs font-bold text-white">{platform.value}%</span>
                  </div>
                  <div className="h-2 w-full bg-white/[0.03] rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-1000 delay-300"
                      style={{ 
                        width: `${platform.value}%`, 
                        backgroundColor: platform.color,
                        boxShadow: `0 0 12px ${platform.color}44`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-4 bg-purple-500/5 border border-purple-500/10 rounded-2xl">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp size={16} className="text-purple-400" />
                <span className="text-xs font-bold text-purple-200">Growth Insight</span>
              </div>
              <p className="text-[11px] text-purple-200/60 leading-relaxed">
                Your <span className="text-purple-300 font-bold">PC</span> playtime has increased by <span className="text-purple-300 font-bold">24%</span> since last month. High potential for Steam achievement hunting.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Bottom Grid: Peak Times & Top Genres */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FadeIn>
          <div className="bg-[#110F14] border border-white/[0.06] rounded-[32px] p-8">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Clock size={20} className="text-purple-400" /> Peak Activity Times
            </h3>
            <div className="grid grid-cols-6 gap-2">
              {Array.from({ length: 24 }).map((_, i) => {
                const intensity = Math.random();
                // Use purple palette based on intensity
                const colorIdx = intensity > 0.8 ? 3 : intensity > 0.5 ? 2 : intensity > 0.2 ? 1 : 0;
                const color = intensity > 0.1 ? PURPLE_PALETTE[colorIdx] : '#1E293B';
                
                return (
                  <div 
                    key={i} 
                    className="aspect-square rounded-lg transition-all hover:scale-110 cursor-help group relative"
                    style={{ 
                      backgroundColor: color,
                      boxShadow: intensity > 0.5 ? `0 0 12px ${color}44` : 'none'
                    }}
                  >
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md text-[9px] font-bold p-2 rounded border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                      {i}:00 - Intensity: {Math.round(intensity * 100)}%
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between mt-4 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
              <span>Midnight</span>
              <span>Noon</span>
              <span>11 PM</span>
            </div>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="bg-[#110F14] border border-white/[0.06] rounded-[32px] p-8">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <BarChart3 size={20} className="text-green-400" /> Genre Affinity
            </h3>
            <div className="space-y-4">
              {[
                { genre: 'Action RPG', score: 95, icon: Sword, color: '#38BDF8' },
                { genre: 'Tactical Shooter', score: 82, icon: Target, color: '#8B5CF6' },
                { genre: 'Soulslike', score: 78, icon: Flame, color: '#F59E0B' },
                { genre: 'Roguelike', score: 45, icon: RefreshCw, color: '#10B981' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-white/[0.02] border border-white/[0.05] rounded-2xl hover:bg-white/[0.04] transition-colors group">
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05] group-hover:scale-110 transition-transform">
                    <item.icon size={20} color={item.color} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1.5">
                      <span className="text-sm font-bold text-gray-200">{item.genre}</span>
                      <span className="text-xs font-bold text-green-400">{item.score}% Mastery</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/[0.05] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500 rounded-full group-hover:shadow-[0_0_10px_#22C55E] transition-all"
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
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