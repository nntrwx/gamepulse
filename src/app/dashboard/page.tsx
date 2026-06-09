'use client';
import { useState } from 'react';
import { 
  Plus, 
  LayoutDashboard, 
  Gamepad2, 
  Trophy, 
  BarChart3, 
  LogOut, 
  Menu, 
  X 
} from 'lucide-react';

import Link from 'next/link';
import Overview from './Overview';
import Games from './Games';
import Achievements from './Achievements';
import Analytics from './Analytics';

export default function RealDashboard() {
  const [activeTab, setActiveTab] = useState('Overview');

  const tabs = [
    { name: 'Overview', icon: LayoutDashboard },
    { name: 'Games', icon: Gamepad2 },
    { name: 'Achievements', icon: Trophy },
    { name: 'Analytics', icon: BarChart3 },
  ];

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#0A0A0B] text-white font-sans overflow-hidden relative">
      <aside className="hidden md:flex w-64 border-r border-white/10 p-6 flex flex-col shrink-0">
        <h1 className="text-2xl font-pixel font-bold mb-10 text-purple-400">GamePulse</h1>
        <nav className="space-y-2 flex-1">
          {tabs.map((tab) => (
            <button 
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`w-full text-left p-3 rounded-xl transition-all flex items-center gap-3 ${
                activeTab === tab.name 
                  ? 'bg-purple-600/10 text-purple-400 border border-purple-500/20' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <tab.icon size={18} />
              <span className="font-bold text-sm">{tab.name}</span>
            </button>
          ))}
        </nav>
        
        <div className="mt-auto pt-6 border-t border-white/10">
          <Link href="/" className="flex items-center gap-3 text-gray-400 hover:text-white transition group font-bold text-sm">
            <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" /> 
            Back to Home
          </Link>
        </div>
      </aside>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#110F14]/80 backdrop-blur-xl border-t border-white/10 px-6 py-3 flex justify-between items-center z-50">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeTab === tab.name ? 'text-purple-400' : 'text-gray-500'
            }`}
          >
            <tab.icon size={20} className={activeTab === tab.name ? 'scale-110' : ''} />
            <span className="text-[10px] font-bold uppercase tracking-tighter">{tab.name}</span>
          </button>
        ))}
      </nav>

      <main className="flex-1 p-4 md:p-8 overflow-y-auto custom-scrollbar pb-24 md:pb-8">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 md:mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
              <span className="md:hidden p-2 rounded-lg bg-purple-500/10">
                {(() => {
                  const Icon = tabs.find(t => t.name === activeTab)?.icon;
                  return Icon ? <Icon size={24} className="text-purple-400" /> : null;
                })()}
              </span>
              {activeTab}
            </h2>
            <p className="text-gray-400 mt-1 text-sm md:text-base">Welcome back, Gamer!</p>
          </div>
          <button className="w-full md:w-auto bg-purple-600 px-6 py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-purple-500 transition-all active:scale-95 shadow-lg shadow-purple-600/20">
            <Plus size={20} /> Add Session
          </button>
        </header>
        
        <div className="relative z-10">
          {activeTab === 'Overview' ? (
            <Overview onNavigate={setActiveTab} />
          ) : activeTab === 'Games' ? (
            <Games />
          ) : activeTab === 'Achievements' ? (
            <Achievements />
          ) : activeTab === 'Analytics' ? (
            <Analytics />
          ) : (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
              <div className="w-20 h-20 bg-white/[0.02] border border-white/[0.05] rounded-3xl flex items-center justify-center mb-6">
                <Plus size={40} className="text-gray-600" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Restoring Data...</h3>
              <p className="text-gray-400 max-w-xs">We're working on bringing your {activeTab.toLowerCase()} data back online.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}