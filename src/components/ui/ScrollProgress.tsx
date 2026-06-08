'use client';
import { motion, useScroll, useSpring } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const pathname = usePathname();
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  if (pathname?.startsWith('/dashboard')) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1.5 bg-game-purple z-[1000] origin-left"
      style={{ scaleX }}
    />
  );
}