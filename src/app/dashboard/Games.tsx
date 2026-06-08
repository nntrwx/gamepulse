'use client';

import { useState } from 'react';
import { Search, Plus, Filter, LayoutGrid, List as ListIcon, Star, Clock, Trophy, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { FadeIn, HoverCard } from '@/components/ui/MotionWrapper';

const ALL_GAMES = [
  { id: 1, name: 'Elden Ring', category: 'RPG', status: 'Playing', playtime: '52h', rating: 4.9, image: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/header.jpg' },
  { id: 2, name: 'Valorant', category: 'Shooter', status: 'Active', playtime: '134h', rating: 4.5, image: 'https://i.pinimg.com/736x/3c/21/d1/3c21d17e7b8619b04052dd2470c6a766.jpg' }, 
  { id: 3, name: 'Cyberpunk 2077', category: 'RPG', status: 'Finished', playtime: '86h', rating: 4.8, image: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1091500/header.jpg' },
  { id: 4, name: 'Hades II', category: 'Roguelike', status: 'Playing', playtime: '12h', rating: 4.9, image: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1145350/header.jpg' },
  { id: 5, name: 'Baldur\'s Gate 3', category: 'RPG', status: 'Backlog', playtime: '0h', rating: 5.0, image: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1086940/header.jpg' },
  { id: 6, name: 'Ghost of Tsushima', category: 'Action', status: 'Playing', playtime: '24h', rating: 4.7, image: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2215430/header.jpg' },
];

export default function Games() {
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'RPG', 'Shooter', 'Action', 'Roguelike'];

  const filteredGames = ALL_GAMES.filter(game => 
    (filter === 'All' || game.category === filter) &&
    game.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12">
      <FadeIn>
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-[#110F14] border border-white/[0.06] p-4 rounded-[24px]">
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search library..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/[0.05] rounded-xl py-3 pl-12 pr-4 outline-none focus:border-purple-500/50 transition-all text-sm"
            />
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex bg-white/[0.03] border border-white/[0.05] rounded-xl p-1">
              <button 
                onClick={() => setView('grid')}
                className={`p-2 rounded-lg transition-all ${view === 'grid' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20' : 'text-gray-500 hover:text-white'}`}
              >
                <LayoutGrid size={20} />
              </button>
              <button 
                onClick={() => setView('list')}
                className={`p-2 rounded-lg transition-all ${view === 'list' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20' : 'text-gray-500 hover:text-white'}`}
              >
                <ListIcon size={20} />
              </button>
            </div>
            
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 px-6 py-3 rounded-xl font-bold transition-all hover:scale-105 shadow-lg shadow-purple-600/20">
              <Plus size={20} /> Add Game
            </button>
          </div>
        </div>
      </FadeIn>

      <FadeIn>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2.5 rounded-full border text-sm font-bold whitespace-nowrap transition-all ${
                filter === cat 
                  ? 'bg-purple-500/10 border-purple-500 text-purple-400' 
                  : 'bg-[#110F14] border-white/[0.06] text-gray-400 hover:border-white/20 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </FadeIn>

      <FadeIn>
        {view === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGames.map((game) => (
              <HoverCard key={game.id} className="bg-[#110F14] border border-white/[0.06] rounded-[24px] overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={game.image} 
                    alt={game.name} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#110F14] via-transparent to-transparent" />
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
                    <Star size={14} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-xs font-bold">{game.rating}</span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest border ${
                      game.status === 'Playing' ? 'bg-green-500/10 border-green-500/50 text-green-400' :
                      game.status === 'Finished' ? 'bg-blue-500/10 border-blue-500/50 text-blue-400' :
                      'bg-gray-500/10 border-gray-500/50 text-gray-400'
                    }`}>
                      {game.status}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold group-hover:text-purple-400 transition-colors">{game.name}</h3>
                      <p className="text-gray-500 text-sm">{game.category}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 pt-4 border-t border-white/[0.05]">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-purple-400" />
                      <span className="text-sm font-bold">{game.playtime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Trophy size={16} className="text-yellow-500" />
                      <span className="text-sm font-bold">12/45</span>
                    </div>
                  </div>
                  
                  <button className="mt-6 w-full py-3 bg-white/[0.03] hover:bg-white/[0.08] rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 group/btn border border-white/[0.05]">
                    Game Details <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </HoverCard>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredGames.map((game) => (
              <div key={game.id} className="bg-[#110F14] border border-white/[0.06] rounded-2xl p-4 flex items-center gap-6 hover:border-purple-500/30 transition-all group">
                <div className="w-24 h-16 rounded-xl overflow-hidden shrink-0">
                  <img src={game.image} alt={game.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg group-hover:text-purple-400 transition-colors">{game.name}</h3>
                  <p className="text-gray-500 text-xs">{game.category}</p>
                </div>
                <div className="hidden md:block">
                  <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest border ${
                    game.status === 'Playing' ? 'bg-green-500/10 border-green-500/50 text-green-400' :
                    game.status === 'Finished' ? 'bg-blue-500/10 border-blue-500/50 text-blue-400' :
                    'bg-gray-500/10 border-gray-500/50 text-gray-400'
                  }`}>
                    {game.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 min-w-[120px]">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-purple-400" />
                    <span className="text-sm font-bold">{game.playtime}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 min-w-[60px]">
                  <Star size={16} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-bold">{game.rating}</span>
                </div>
                <button className="p-2 hover:bg-white/[0.05] rounded-xl transition-colors">
                  <ChevronRight size={20} className="text-gray-500" />
                </button>
              </div>
            ))}
          </div>
        )}
      </FadeIn>
      
      {filteredGames.length === 0 && (
        <FadeIn>
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-white/[0.02] border border-white/[0.05] rounded-3xl flex items-center justify-center mb-6">
              <Search size={40} className="text-gray-600" />
            </div>
            <h3 className="text-2xl font-bold mb-2">No games found</h3>
            <p className="text-gray-400 max-w-xs">Try adjusting your search or filters to find what you're looking for.</p>
          </div>
        </FadeIn>
      )}
    </div>
  );
}