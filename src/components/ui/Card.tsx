import { motion, type HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';

interface CardProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
}

function Card({ children, className = '', ...props }: CardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`rounded-card border border-border bg-surface p-8 shadow-soft transition-shadow duration-300 hover:shadow-lift sm:p-10 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export default Card;
