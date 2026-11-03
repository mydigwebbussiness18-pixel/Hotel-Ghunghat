import React, { useRef, useState, useEffect } from 'react';

interface Parallax3DImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  speed?: number; // Parallax scrolling factor
}

export const Parallax3DImage: React.FC<Parallax3DImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  speed = 0.05
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [scrollYOffset, setScrollYOffset] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const viewportMiddle = window.innerHeight / 2;
            const elementMiddle = rect.top + rect.height / 2;
            const offset = (elementMiddle - viewportMiddle) * speed;
            setScrollYOffset(-offset);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltX = ((y - centerY) / centerY) * -6; // max -6 to +6 deg
    const tiltY = ((x - centerX) / centerX) * 6;

    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1200px'
      }}
      className={`relative overflow-hidden rounded-2xl ${containerClassName}`}
    >
      <div
        style={{
          transform: `translate3d(0, ${scrollYOffset}px, 0) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.03 : 1})`,
          transition: isHovered
            ? 'transform 180ms cubic-bezier(0.16, 1, 0.3, 1)'
            : 'transform 600ms cubic-bezier(0.16, 1, 0.3, 1)',
          transformStyle: 'preserve-3d',
          willChange: 'transform'
        }}
        className="relative w-full h-full"
      >
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          className={`w-full h-full object-cover select-none pointer-events-none ${className}`}
        />

        {/* Ambient subtle 3D golden sheen reflection on hover */}
        <div
          style={{
            opacity: isHovered ? 0.22 : 0,
            transform: `translate3d(${-tilt.y * 3}px, ${-tilt.x * 3}px, 20px)`,
            transition: 'opacity 300ms ease, transform 150ms ease',
            background: 'radial-gradient(circle at 50% 30%, rgba(255,255,255,0.7) 0%, rgba(212,175,55,0.3) 40%, transparent 75%)'
          }}
          className="absolute inset-0 pointer-events-none"
        />
      </div>
    </div>
  );
};
