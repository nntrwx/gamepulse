'use client';
import { motion } from 'framer-motion';

export const FadeIn = ({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.1 }}
    transition={{ duration: 0.5, ease: "easeOut", delay }}
    style={{ willChange: 'transform, opacity' }}
    className={className}
  >
    {children}
  </motion.div>
);

export const HoverCard = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <motion.div
    whileHover={{ 
      y: -5, 
      boxShadow: "0px 0px 25px rgba(139, 92, 246, 0.2)" 
    }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className={className}
  >
    {children}
  </motion.div>
);