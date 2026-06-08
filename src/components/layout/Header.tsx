'use client';
import { useEffect, useState } from 'react';
import NavigationLinks from '../hero/NavigationLinks';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-3 bg-black/60 backdrop-blur-md border-b border-white/10' : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-[1200px] mx-auto flex justify-between items-center px-6">
        <div className="font-pixel text-[24px] text-white">GAMEPULSE</div>
        <NavigationLinks />
      </div>
    </header>
  );
}