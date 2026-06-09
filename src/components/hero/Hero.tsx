'use client';
import { useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      
      tl.from('.hero-badge', { y: 20, opacity: 0, duration: 0.8 })
        .from('.hero-title', { y: 40, opacity: 0, duration: 1 }, '-=0.4')
        .from('.hero-desc', { y: 20, opacity: 0, duration: 0.8 }, '-=0.6')
        .from('.hero-btn', { y: 20, opacity: 0, duration: 0.8, scale: 0.95 }, '-=0.4');

      gsap.to(orbRef.current, {
        y: 40,
        x: 20,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 40;
        const yPos = (clientY / window.innerHeight - 0.5) * 40;

        gsap.to(orbRef.current, {
          x: xPos,
          y: yPos,
          duration: 2,
          ease: 'power2.out'
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center px-4 text-center overflow-hidden pt-20">
      <div 
        ref={orbRef}
        className="absolute top-1/4 -z-10 w-64 h-64 md:w-96 md:h-96 rounded-full" 
        style={{
          background: 'radial-gradient(circle, rgba(167, 139, 250, 0.4) 0%, rgba(167, 139, 250, 0) 70%)',
          willChange: 'transform, opacity'
        }}
      />
      
      <div className="hero-badge mb-4 px-4 py-2 font-pixel font-bold text-[16px] md:text-[24px] text-game-purple tracking-widest">
        The Future of Gaming Stats
      </div>
      
      <h1 className="hero-title text-[40px] md:text-[64px] font-black tracking-tighter mb-6 bg-[#FFFFFF] bg-clip-text text-transparent leading-tight">
        Level Up Your Gaming Journey
      </h1>
      
      <p className="hero-desc text-base md:text-xl text-game-grey mb-10 max-w-lg">
        Track your playtime, achievements, XP progression, and gaming habits in one beautiful dashboard.
      </p>
      
      <div className="hero-btn">
        <Link href="/dashboard">
          <button className="bg-game-purple hover:bg-purple-700 transition-all text-white px-8 py-3 md:px-10 md:py-4 rounded-xl font-bold text-base md:text-lg shadow-glow-purple cursor-pointer">
            Start Tracking Free
          </button>
        </Link>
      </div>
    </section>
  );
}