'use client';
import { motion } from 'framer-motion';

interface GlowOrbProps {
  top?: string;
  left?: string;
  className?: string;
}

export default function GlowOrb({ top = '150px', left = '60%', className = '' }: GlowOrbProps) {
  return (
    <motion.div 
      animate={{ 
        y: [0, 30, 0], 
        x: [0, 20, 0],
        scale: [1, 1.1, 1] 
      }}
      transition={{ 
        repeat: Infinity, 
        duration: 10, 
        ease: "easeInOut" 
      }}
      className={`absolute w-[800px] h-[800px] bg-[rgba(0,53,134,0.15)] border border-white/5 filter blur-[150px] pointer-events-none z-0 ${className}`}
      style={{ 
        left: left,
        top: top,
      }}
    />
  );
}