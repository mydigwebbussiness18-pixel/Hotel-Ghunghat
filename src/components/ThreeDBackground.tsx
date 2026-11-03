import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number; // Depth factor (0.2 to 1.0)
  size: number;
  baseAlpha: number;
  alpha: number;
  vx: number;
  vy: number;
  pulseSpeed: number;
  pulsePhase: number;
}

export const ThreeDBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Handle Resize
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Track scroll with smoothing
    let currentScrollY = window.scrollY;
    let targetScrollY = window.scrollY;

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Generate 3D depth particles
    const particleCount = width < 768 ? 35 : 65;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const z = 0.2 + Math.random() * 0.8; // Nearer particles have higher z
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z,
        size: (1 + Math.random() * 2.5) * z,
        baseAlpha: 0.15 + Math.random() * 0.35,
        alpha: 0.2,
        vx: (Math.random() - 0.5) * 0.25 * z,
        vy: (-0.15 - Math.random() * 0.35) * z, // Gentle upward drift
        pulseSpeed: 0.01 + Math.random() * 0.02,
        pulsePhase: Math.random() * Math.PI * 2
      });
    }

    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Smooth scroll interpolation (lerp)
      currentScrollY += (targetScrollY - currentScrollY) * 0.08;
      const scrollDelta = (targetScrollY - currentScrollY) * 0.4;

      ctx.clearRect(0, 0, width, height);

      // Subtle ambient 3D glowing orbs that drift and respond to scroll
      const orb1Y = (height * 0.25 + currentScrollY * 0.15) % (height * 1.5) - height * 0.25;
      const orb2Y = (height * 0.75 - currentScrollY * 0.1) % (height * 1.5);

      // Top-right soft gold ambient light
      const grad1 = ctx.createRadialGradient(
        width * 0.85,
        orb1Y,
        10,
        width * 0.85,
        orb1Y,
        width * 0.45
      );
      grad1.addColorStop(0, 'rgba(212, 175, 55, 0.045)');
      grad1.addColorStop(0.5, 'rgba(197, 168, 128, 0.02)');
      grad1.addColorStop(1, 'transparent');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      // Bottom-left soft warm ambient light
      const grad2 = ctx.createRadialGradient(
        width * 0.15,
        orb2Y,
        10,
        width * 0.15,
        orb2Y,
        width * 0.5
      );
      grad2.addColorStop(0, 'rgba(230, 202, 101, 0.035)');
      grad2.addColorStop(0.6, 'rgba(11, 19, 37, 0.015)');
      grad2.addColorStop(1, 'transparent');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // Render 3D Floating Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          // Update position
          p.x += p.vx * 60 * dt;
          // Apply velocity and parallax vertical scroll offset based on z-depth
          p.y += (p.vy - scrollDelta * p.z * 0.15) * 60 * dt;

          // Pulse shimmer
          p.pulsePhase += p.pulseSpeed;
          p.alpha = p.baseAlpha + Math.sin(p.pulsePhase) * 0.15;

          // Wrap horizontally
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;

          // Wrap vertically
          if (p.y < -20) p.y = height + 20;
          if (p.y > height + 20) p.y = -20;
        }

        // Draw particle with 3D golden glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        // Soft gold hue (#D4AF37)
        ctx.fillStyle = `rgba(225, 195, 115, ${Math.max(0.05, Math.min(p.alpha, 0.75))})`;
        ctx.shadowColor = 'rgba(212, 175, 55, 0.5)';
        ctx.shadowBlur = 4 * p.z;
        ctx.fill();
      }

      // Reset shadow for next frame performance
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[1] overflow-hidden"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block opacity-90 transition-opacity duration-1000"
      />
    </div>
  );
};
