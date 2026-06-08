'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Добавляем AnimatePresence
import NavigationLinks from '../hero/NavigationLinks';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 py-4 bg-black/80 backdrop-blur-md">
      <div className="max-w-[1200px] mx-auto flex justify-between items-center px-4">
        <div className="font-pixel text-[20px] text-white">GAMEPULSE</div>
        
        {/* Бургер-кнопка */}
        <button className="md:hidden p-2 z-50" onClick={() => setIsOpen(!isOpen)}>
          <div className={`w-6 h-0.5 bg-white transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <div className={`w-6 h-0.5 bg-white my-1.5 ${isOpen ? 'opacity-0' : ''}`} />
          <div className={`w-6 h-0.5 bg-white ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>

        {/* Десктопная навигация */}
        <div className="hidden md:flex">
          <NavigationLinks />
        </div>
      </div>

      {/* Мобильное меню с анимацией */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 w-full bg-black/95 border-b border-white/10 p-8 flex flex-col items-center gap-6"
          >
            <NavigationLinks />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}