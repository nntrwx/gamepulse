'use client';
import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
import idleImg from '../../../public/idle.png';
import happyImg from '../../../public/happy.png';
import smileImg from '../../../public/smile.png';

const ASSETS = {
  IDLE: idleImg,
  HAPPY: happyImg,
  SMILE: smileImg,
};

export default function PulseCompanion() {
  const containerRef = useRef<HTMLDivElement>(null);
  const characterRef = useRef<HTMLDivElement>(null);
  const [currentAsset, setCurrentAsset] = useState<any>(ASSETS.IDLE);
  const [status, setStatus] = useState('IDLE');

  useEffect(() => {
    const character = characterRef.current;
    if (!character) return;

    const float = gsap.to(character, {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const rect = character.getBoundingClientRect();
      const charX = rect.left + rect.width / 2;
      const charY = rect.top + rect.height / 2;

      const dist = Math.hypot(clientX - charX, clientY - charY);
      
      if (dist < 150) {
        setStatus('ACTIVE');
        setCurrentAsset(ASSETS.SMILE);
        gsap.to(character, { 
          rotation: (clientX - charX) * 0.03,
          scale: 1.05,
          duration: 0.4 
        });
      } else {
        setStatus('IDLE');
        setCurrentAsset(ASSETS.IDLE);
        gsap.to(character, { rotation: 0, scale: 1, duration: 0.8 });
      }
    };

    const handleClick = () => {
      const messages = ['WOOO!', 'GG!', 'AWESOME!', 'LOVE IT!'];
      const randomMsg = messages[Math.floor(Math.random() * messages.length)];
      
      setStatus(randomMsg);
      setCurrentAsset(ASSETS.HAPPY);
      
      const tl = gsap.timeline();
      tl.to(character, { 
        y: -30, 
        scale: 1.2, 
        duration: 0.4, 
        ease: "back.out(1.5)",
      })
      .to(character, { y: 0, scale: 1, duration: 0.5, ease: "bounce.out" });

      for(let i = 0; i < 6; i++) {
        const particle = document.createElement('div');
        particle.innerHTML = ".";
        particle.className = "absolute text-game-purple font-pixel text-[12px] pointer-events-none font-bold z-50";
        containerRef.current?.appendChild(particle);
        
        const angle = (i / 6) * Math.PI * 2;
        const velocity = 80 + Math.random() * 40;
        
        gsap.fromTo(particle, 
          { x: 0, y: 0, opacity: 1 },
          { 
            x: Math.cos(angle) * velocity, 
            y: Math.sin(angle) * velocity - 40, 
            opacity: 0, 
            duration: 1, 
            ease: "power2.out",
            onComplete: () => particle.remove() 
          }
        );
      }

      setTimeout(() => {
        setStatus('IDLE');
        setCurrentAsset(ASSETS.IDLE);
      }, 1500);
    };

    window.addEventListener('mousemove', handleMouseMove);
    character.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      character.removeEventListener('click', handleClick);
      float.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-40 h-40 flex items-center justify-center cursor-pointer select-none">
      <div 
        ref={characterRef}
        className="relative w-24 h-24 z-10"
      >
        <Image 
          src={currentAsset} 
          alt="Companion" 
          width={96}
          height={96}
          className="w-full h-full object-contain pointer-events-none"
          priority
        />
      </div>

      <div className="absolute -bottom-2 bg-black/60 backdrop-blur-md border border-white/5 px-3 py-0.5 rounded-full">
        <span className="font-pixel text-[10px] text-game-purple tracking-tighter uppercase">
          {status}
        </span>
      </div>
    </div>
  );
}
