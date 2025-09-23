import React from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fade-in-up' | 'fade-in-left' | 'fade-in-right' | 'fade-in';
  delay?: number;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({ 
  children, 
  className = '', 
  animation = 'fade-in-up',
  delay = 0 
}) => {
  const { elementRef, isVisible } = useScrollReveal();

  const animationClass = isVisible ? `animate-${animation}` : 'opacity-0 translate-y-10';
  const delayStyle = delay > 0 ? { animationDelay: `${delay}ms` } : {};

  return (
    <div 
      ref={elementRef} 
      className={`${animationClass} ${className}`}
      style={delayStyle}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;