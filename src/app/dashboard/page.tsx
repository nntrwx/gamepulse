'use client';
import { useState } from 'react';
import { Plus } from 'lucide-react';

import Link from 'next/link';
import Overview from './Overview';
import Games from './Games';
import Achievements from './Achievements';
import Analytics from './Analytics';

export default function RealDashboard() {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="flex h-screen bg-[#0A0A0B] text-white font-sans overflow-hidden">
      <aside className="w-64 border-r border-white/10 p-6 flex flex-col">
        <h1 className="text-2xl font-pixel font-bold mb-10 text-purple-400">GamePulse</h1>
        <nav className="space-y-4 flex-1">
          {['Overview', 'Games', 'Achievements', 'Analytics'].map((item) => (
            <button 
              key={item}
              onClick={() => setActiveTab(item)}
              className={`w-full text-left p-3 rounded-xl transition ${activeTab === item ? 'bg-[#141B2D] text-white' : 'text-gray-400 hover:text-white'}`}
            >
              {item}
            </button>
          ))}
        </nav>
        
        <div className="mt-auto pt-6 border-t border-white/10">
          <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition group">
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Home
          </Link>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto custom-scrollbar">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-4xl font-bold">{activeTab}</h2>
            <p className="text-gray-400 mt-1">Welcome back, Nikol!</p>
          </div>
          <button className="bg-purple-600 px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-purple-500 transition-all hover:scale-105 shadow-lg shadow-purple-600/20">
            <Plus size={20} /> Add Session
          </button>
        </header>
        
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
      </main>
    </div>
  );
}