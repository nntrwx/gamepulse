'use client';
import React, { useState, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { Trophy, Zap, Bell } from 'lucide-react';

const NOTIFICATIONS = [
  { title: "Achievement Unlocked!", desc: "First Steps into the Void", icon: Trophy, color: "text-yellow-400" },
  { title: "XP Boost Active", desc: "+20% gain for next hour", icon: Zap, color: "text-blue-400" },
  { title: "Daily Quest Updated", desc: "Play 3 games of Pulse", icon: Bell, color: "text-purple-400" }
];

export default function GameNotification() {
  const [activeNotif, setActiveNotif] = useState<typeof NOTIFICATIONS[0] | null>(null);

  const triggerNotification = useCallback(() => {
    const randomNotif = NOTIFICATIONS[Math.floor(Math.random() * NOTIFICATIONS.length)];
    setActiveNotif(randomNotif);

    const tl = gsap.timeline();
    
    tl.fromTo(".game-notif", 
      { x: 400, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "back.out(1.2)" }
    )
    .to(".game-notif", { opacity: 1, duration: 4 })
    .to(".game-notif", { 
      x: 400, 
      opacity: 0, 
      duration: 0.6, 
      ease: "power2.in",
      onComplete: () => setActiveNotif(null)
    });
  }, []);

  useEffect(() => {
    const initialTimeout = setTimeout(triggerNotification, 5000);
    const interval = setInterval(() => {
      if (!activeNotif) triggerNotification();
    }, 15000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [activeNotif, triggerNotification]);

  if (!activeNotif) return null;

  return (
    <div className="game-notif fixed bottom-24 right-8 z-[100] w-[280px] bg-[#141B2D]/90 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-2xl overflow-hidden">
      <div className="absolute bottom-0 left-0 h-1 bg-game-purple w-full origin-left animate-[progress_4.8s_linear]" />
      
      <div className="flex items-center gap-4">
        <div className={`p-2 bg-white/5 rounded-xl ${activeNotif.color}`}>
          <activeNotif.icon size={24} />
        </div>
        <div>
          <h4 className="font-pixel text-[10px] text-white tracking-wider mb-1 uppercase">{activeNotif.title}</h4>
          <p className="text-[12px] text-game-grey leading-tight">{activeNotif.desc}</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          from { transform: scaleX(1); }
          to { transform: scaleX(0); }
        }
      `}</style>
    </div>
  );
}
