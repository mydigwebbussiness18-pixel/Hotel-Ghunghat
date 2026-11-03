import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // In milliseconds
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  tilt?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  tilt = true
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.12
      }
    );

    const el = ref.current;
    if (el) {
      observer.observe(el);
    }

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  // Compute 3D initial transform based on direction
  const getInitialTransform = () => {
    if (!tilt) {
      switch (direction) {
        case 'up':
          return 'translateY(28px)';
        case 'down':
          return 'translateY(-28px)';
        case 'left':
          return 'translateX(28px)';
        case 'right':
          return 'translateX(-28px)';
        default:
          return 'none';
      }
    }

    switch (direction) {
      case 'up':
        return 'perspective(1200px) translateY(36px) rotateX(5deg) scale(0.98)';
      case 'down':
        return 'perspective(1200px) translateY(-36px) rotateX(-5deg) scale(0.98)';
      case 'left':
        return 'perspective(1200px) translateX(36px) rotateY(-5deg) scale(0.98)';
      case 'right':
        return 'perspective(1200px) translateX(-36px) rotateY(5deg) scale(0.98)';
      default:
        return 'perspective(1200px) scale(0.96)';
    }
  };

  return (
    <div
      ref={ref}
      style={{
        transitionDuration: '750ms',
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        transform: isVisible ? 'perspective(1200px) translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg) scale(1)' : getInitialTransform(),
        opacity: isVisible ? 1 : 0,
        willChange: 'transform, opacity'
      }}
      className={`transition-all ${className}`}
    >
      {children}
    </div>
  );
};
