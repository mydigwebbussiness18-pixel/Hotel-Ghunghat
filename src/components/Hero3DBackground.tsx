import React, { useEffect, useRef, useState } from 'react';
import { HOTEL_IMAGES } from '../constants/hotelData';

interface Particle3D {
  x: number;
  y: number;
  z: number;
  size: number;
  baseAlpha: number;
  alpha: number;
  vx: number;
  vy: number;
  vz: number;
  color: string;
  sparkle: boolean;
  pulsePhase: number;
  pulseSpeed: number;
}

interface GeometricOrbiter3D {
  x: number;
  y: number;
  z: number;
  size: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  vRotX: number;
  vRotY: number;
  vRotZ: number;
  vy: number;
  alpha: number;
  type: 'diamond' | 'ring' | 'prism';
}

interface Hero3DBackgroundProps {
  scrollY: number;
}

export const Hero3DBackground: React.FC<Hero3DBackgroundProps> = ({ scrollY }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const mouseTarget = useRef({ x: 0, y: 0 });
  const mouseCurrent = useRef({ x: 0, y: 0 });

  // Mouse / Touch tracking for interactive 3D perspective
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseTarget.current = {
        x: (e.clientX / innerWidth) * 2 - 1,
        y: (e.clientY / innerHeight) * 2 - 1,
      };
    };

    let autoTimer: number;
    let autoAngle = 0;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice) {
      const autoAnimate = () => {
        autoAngle += 0.012;
        mouseTarget.current = {
          x: Math.sin(autoAngle) * 0.4,
          y: Math.cos(autoAngle * 0.7) * 0.3,
        };
        autoTimer = requestAnimationFrame(autoAnimate);
      };
      autoTimer = requestAnimationFrame(autoAnimate);
    } else {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    return () => {
      if (isTouchDevice) {
        cancelAnimationFrame(autoTimer);
      } else {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  // Cinematic 3D Canvas Rendering Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = width < 768;

    // 3D Camera Focal Length
    const focalLength = isMobile ? 380 : 460;

    // 1. Generate 3D Starlight & Gold Embers
    const particleCount = isMobile ? 40 : 80;
    const particles: Particle3D[] = [];

    const goldHues = [
      'rgba(230, 202, 101,', // Champagne Gold
      'rgba(212, 175, 55,',  // Deep Royal Gold
      'rgba(247, 231, 169,', // Radiant Starlight Gold
      'rgba(96, 165, 250,',  // Sapphire Blue Starlight
      'rgba(197, 168, 128,', // Warm Sand Gold
    ];

    for (let i = 0; i < particleCount; i++) {
      const z = -150 + Math.random() * 550;
      particles.push({
        x: (Math.random() - 0.5) * width * 1.6,
        y: (Math.random() - 0.5) * height * 1.6,
        z,
        size: 1.2 + Math.random() * 3.2,
        baseAlpha: 0.15 + Math.random() * 0.5,
        alpha: 0.3,
        vx: (Math.random() - 0.5) * 0.28,
        vy: -0.2 - Math.random() * 0.45,
        vz: (Math.random() - 0.5) * 0.2,
        color: goldHues[Math.floor(Math.random() * goldHues.length)],
        sparkle: Math.random() > 0.65,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.012 + Math.random() * 0.025,
      });
    }

    // 2. Generate 3D Geometric Orbiters (Diamonds, Halo Rings & Prisms)
    const geometricCount = isMobile ? 4 : 8;
    const orbiters: GeometricOrbiter3D[] = [];
    const types: ('diamond' | 'ring' | 'prism')[] = ['diamond', 'ring', 'prism'];

    for (let i = 0; i < geometricCount; i++) {
      orbiters.push({
        x: (Math.random() - 0.5) * width * 1.3,
        y: (Math.random() - 0.5) * height * 1.3,
        z: 80 + Math.random() * 420,
        size: 16 + Math.random() * 26,
        rotX: Math.random() * Math.PI * 2,
        rotY: Math.random() * Math.PI * 2,
        rotZ: Math.random() * Math.PI * 2,
        vRotX: 0.003 + Math.random() * 0.007,
        vRotY: 0.004 + Math.random() * 0.008,
        vRotZ: 0.002 + Math.random() * 0.005,
        vy: -0.12 - Math.random() * 0.18,
        alpha: 0.2 + Math.random() * 0.35,
        type: types[i % types.length],
      });
    }

    let time = 0;

    const render = () => {
      time += 0.016;

      // Inertial mouse lerping
      mouseCurrent.current.x += (mouseTarget.current.x - mouseCurrent.current.x) * 0.05;
      mouseCurrent.current.y += (mouseTarget.current.y - mouseCurrent.current.y) * 0.05;

      const mx = mouseCurrent.current.x;
      const my = mouseCurrent.current.y;

      setMousePos({ x: mx, y: my });

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // --- LAYER 1: Deep Midnight Navy & Royal Blue Atmosphere with Golden Auroras ---
      // Base Midnight Navy
      const baseGrad = ctx.createLinearGradient(0, 0, width, height);
      baseGrad.addColorStop(0, '#050B17'); // Darkest Midnight Navy
      baseGrad.addColorStop(0.45, '#0A162B'); // Deep Royal Navy
      baseGrad.addColorStop(0.8, '#0E2142'); // Royal Sapphire Depth
      baseGrad.addColorStop(1, '#070D1A'); // Ground Midnight Navy
      ctx.fillStyle = baseGrad;
      ctx.fillRect(0, 0, width, height);

      // Dynamic Royal Blue Volumetric Aura (interactive with cursor)
      const royalAuraX = centerX + mx * 140;
      const royalAuraY = centerY + my * 100;
      const royalGlow = ctx.createRadialGradient(
        royalAuraX,
        royalAuraY,
        40,
        royalAuraX,
        royalAuraY,
        Math.max(width, height) * 0.85
      );
      royalGlow.addColorStop(0, 'rgba(30, 64, 175, 0.32)');
      royalGlow.addColorStop(0.4, 'rgba(29, 78, 216, 0.18)');
      royalGlow.addColorStop(0.7, 'rgba(15, 30, 66, 0.12)');
      royalGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = royalGlow;
      ctx.fillRect(0, 0, width, height);

      // Breathing Champagne Gold Ambient Warmth (upper right & lower center)
      const goldPulse = 0.09 + Math.sin(time * 0.7) * 0.025;
      const goldAuraX = width * 0.8 - mx * 100;
      const goldAuraY = height * 0.25 - my * 80;
      const goldGlow = ctx.createRadialGradient(
        goldAuraX,
        goldAuraY,
        20,
        goldAuraX,
        goldAuraY,
        width * 0.55
      );
      goldGlow.addColorStop(0, `rgba(230, 202, 101, ${goldPulse * 1.5})`);
      goldGlow.addColorStop(0.4, `rgba(212, 175, 55, ${goldPulse * 0.7})`);
      goldGlow.addColorStop(0.8, 'rgba(197, 168, 128, 0.02)');
      goldGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = goldGlow;
      ctx.fillRect(0, 0, width, height);

      // --- LAYER 2: 3D Undulating Flowing Silk Wave Ribbons ---
      // Layered sine-wave ribbons with 3D depth and subtle golden/royal gradients
      const ribbons = [
        { z: 280, color: 'rgba(30, 64, 175, 0.18)', stroke: 'rgba(59, 130, 246, 0.35)', speed: 0.8, freq: 0.002, amp: 45, yRatio: 0.78 },
        { z: 180, color: 'rgba(212, 175, 55, 0.12)', stroke: 'rgba(230, 202, 101, 0.45)', speed: 1.1, freq: 0.0028, amp: 38, yRatio: 0.72 },
        { z: 90,  color: 'rgba(14, 33, 66, 0.25)',  stroke: 'rgba(230, 202, 101, 0.65)', speed: 0.65, freq: 0.0018, amp: 55, yRatio: 0.85 },
      ];

      for (let r = 0; r < ribbons.length; r++) {
        const ribbon = ribbons[r];
        const scale = focalLength / (focalLength + ribbon.z);
        const yBase = height * ribbon.yRatio - my * 40 * scale;

        ctx.save();
        ctx.beginPath();
        const step = 20;

        // Top curve of wave ribbon
        for (let x = -60; x <= width + 60; x += step) {
          const wave = Math.sin(time * ribbon.speed + x * ribbon.freq + r * 1.8) * ribbon.amp * scale +
                       Math.cos(time * 0.6 + x * 0.004) * (ribbon.amp * 0.4) * scale;
          const px = x + mx * 35 * scale;
          const py = yBase + wave;

          if (x === -60) {
            ctx.moveTo(px, py);
          } else {
            ctx.lineTo(px, py);
          }
        }

        // Complete filled ribbon to bottom
        ctx.lineTo(width + 60, height + 60);
        ctx.lineTo(-60, height + 60);
        ctx.closePath();

        // Shimmer gradient for ribbon body
        const ribbonGrad = ctx.createLinearGradient(0, yBase - 40, 0, height);
        ribbonGrad.addColorStop(0, ribbon.color);
        ribbonGrad.addColorStop(0.5, 'rgba(11, 23, 49, 0.1)');
        ribbonGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = ribbonGrad;
        ctx.fill();

        // Glowing crest edge line
        ctx.beginPath();
        for (let x = -60; x <= width + 60; x += step) {
          const wave = Math.sin(time * ribbon.speed + x * ribbon.freq + r * 1.8) * ribbon.amp * scale +
                       Math.cos(time * 0.6 + x * 0.004) * (ribbon.amp * 0.4) * scale;
          const px = x + mx * 35 * scale;
          const py = yBase + wave;

          if (x === -60) {
            ctx.moveTo(px, py);
          } else {
            ctx.lineTo(px, py);
          }
        }
        ctx.strokeStyle = ribbon.stroke;
        ctx.lineWidth = 1.4 * scale;
        ctx.shadowColor = 'rgba(230, 202, 101, 0.4)';
        ctx.shadowBlur = 8 * scale;
        ctx.stroke();
        ctx.restore();
      }

      // --- LAYER 3: 3D Floating Geometric Orbiters (Diamonds, Halo Rings & Prisms) ---
      for (let i = 0; i < orbiters.length; i++) {
        const o = orbiters[i];

        if (!prefersReducedMotion) {
          o.rotX += o.vRotX;
          o.rotY += o.vRotY;
          o.rotZ += o.vRotZ;
          o.y += o.vy;

          if (o.y < -height * 0.6) o.y = height * 0.6;
        }

        const scale = focalLength / (focalLength + o.z);
        const projX = centerX + (o.x + mx * 95 * scale) * scale;
        const projY = centerY + (o.y + my * 75 * scale) * scale;
        const r = o.size * scale;

        if (projX >= -60 && projX <= width + 60 && projY >= -60 && projY <= height + 60) {
          ctx.save();
          ctx.translate(projX, projY);
          ctx.rotate(o.rotZ);

          if (o.type === 'diamond') {
            const cosY = Math.cos(o.rotY);
            ctx.beginPath();
            ctx.moveTo(0, -r);
            ctx.lineTo(r * cosY, 0);
            ctx.lineTo(0, r);
            ctx.lineTo(-r * cosY, 0);
            ctx.closePath();

            ctx.strokeStyle = `rgba(230, 202, 101, ${o.alpha * scale * 0.8})`;
            ctx.lineWidth = 1.2 * scale;
            ctx.shadowColor = 'rgba(230, 202, 101, 0.5)';
            ctx.shadowBlur = 6 * scale;
            ctx.stroke();

            // Inner faceted cross
            ctx.beginPath();
            ctx.moveTo(0, -r);
            ctx.lineTo(0, r);
            ctx.moveTo(-r * cosY, 0);
            ctx.lineTo(r * cosY, 0);
            ctx.strokeStyle = `rgba(212, 175, 55, ${o.alpha * scale * 0.45})`;
            ctx.lineWidth = 0.8 * scale;
            ctx.stroke();
          } else if (o.type === 'ring') {
            // 3D Elliptical Golden Halo Ring
            ctx.beginPath();
            ctx.ellipse(0, 0, r, r * Math.abs(Math.cos(o.rotX)), o.rotY, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(230, 202, 101, ${o.alpha * scale * 0.65})`;
            ctx.lineWidth = 1.1 * scale;
            ctx.shadowColor = 'rgba(230, 202, 101, 0.4)';
            ctx.shadowBlur = 5 * scale;
            ctx.stroke();
          } else {
            // 3D Hexagonal / Triangular Prism
            const cosX = Math.cos(o.rotX);
            const sinY = Math.sin(o.rotY);
            ctx.beginPath();
            for (let p = 0; p < 6; p++) {
              const ang = (p / 6) * Math.PI * 2;
              const px = Math.cos(ang) * r * cosX;
              const py = Math.sin(ang) * r * sinY;
              if (p === 0) ctx.moveTo(px, py);
              else ctx.lineTo(px, py);
            }
            ctx.closePath();
            ctx.strokeStyle = `rgba(197, 168, 128, ${o.alpha * scale * 0.55})`;
            ctx.lineWidth = 0.9 * scale;
            ctx.stroke();
          }

          ctx.restore();
        }
      }

      // --- LAYER 4: 3D Golden Particles, Starlight Embers & Constellation Filaments ---
      // Render constellation connections between close particles
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        const s1 = focalLength / (focalLength + p1.z);
        const x1 = centerX + (p1.x + mx * 80 * s1) * s1;
        const y1 = centerY + (p1.y + my * 65 * s1) * s1;

        // Check nearest neighbors for delicate constellation lines
        for (let j = i + 1; j < Math.min(i + 4, particles.length); j++) {
          const p2 = particles[j];
          const s2 = focalLength / (focalLength + p2.z);
          const x2 = centerX + (p2.x + mx * 80 * s2) * s2;
          const y2 = centerY + (p2.y + my * 65 * s2) * s2;

          const dist = Math.hypot(x1 - x2, y1 - y2);
          if (dist < 85) {
            const lineAlpha = (1 - dist / 85) * 0.18 * Math.min(s1, s2);
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = `rgba(230, 202, 101, ${lineAlpha})`;
            ctx.lineWidth = 0.7 * Math.min(s1, s2);
            ctx.stroke();
          }
        }
      }

      // Render individual particles & glowing embers
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;
          p.z += p.vz;
          p.pulsePhase += p.pulseSpeed;
          p.alpha = p.baseAlpha + Math.sin(p.pulsePhase) * 0.16;

          // Wrap boundaries
          if (p.y < -height * 0.6) p.y = height * 0.6;
          if (p.y > height * 0.6) p.y = -height * 0.6;
          if (p.x < -width * 0.6) p.x = width * 0.6;
          if (p.x > width * 0.6) p.x = -width * 0.6;
          if (p.z < -150) p.z = 550;
          if (p.z > 550) p.z = -150;
        }

        const scale = focalLength / (focalLength + p.z);
        const projX = centerX + (p.x + mx * 80 * scale) * scale;
        const projY = centerY + (p.y + my * 65 * scale) * scale;
        const projSize = Math.max(0.6, p.size * scale * 1.3);

        if (projX >= -20 && projX <= width + 20 && projY >= -20 && projY <= height + 20) {
          ctx.beginPath();
          ctx.arc(projX, projY, projSize, 0, Math.PI * 2);

          const finalAlpha = Math.max(0.06, Math.min(p.alpha * scale * 1.3, 0.95));
          ctx.fillStyle = `${p.color} ${finalAlpha})`;

          // Foreground embers get radiant golden glow
          if (scale > 0.85) {
            ctx.shadowColor = 'rgba(230, 202, 101, 0.75)';
            ctx.shadowBlur = 8 * scale;
          } else {
            ctx.shadowBlur = 0;
          }
          ctx.fill();

          // 4-point sparkle cross on prominent stars
          if (p.sparkle && scale > 0.95) {
            const sparkleLen = projSize * 2.5;
            ctx.beginPath();
            ctx.moveTo(projX - sparkleLen, projY);
            ctx.lineTo(projX + sparkleLen, projY);
            ctx.moveTo(projX, projY - sparkleLen);
            ctx.lineTo(projX, projY + sparkleLen);
            ctx.strokeStyle = `rgba(247, 231, 169, ${finalAlpha * 0.6})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      ctx.shadowBlur = 0;
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Compute 3D transforms for the background photograph
  const rotX = (-mousePos.y * 4.5).toFixed(2);
  const rotY = (mousePos.x * 5.5).toFixed(2);
  const transX = (mousePos.x * 14).toFixed(1);
  const transY = (mousePos.y * 10 + scrollY * 0.25).toFixed(1);

  return (
    <div
      className="absolute inset-0 -z-10 overflow-hidden bg-[#0B1325]"
      style={{ perspective: '1200px' }}
      aria-hidden="true"
    >
      {/* 1. Underlying Cinematic 3D Tilting Photograph (Hotel Ghunghat Twilight Courtyard) */}
      <div
        className="absolute inset-0 transition-transform duration-300 ease-out will-change-transform"
        style={{
          transform: `translate3d(${transX}px, ${transY}px, 0) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.08)`,
          transformStyle: 'preserve-3d',
        }}
      >
        <img
          src={HOTEL_IMAGES.hero}
          alt="Hotel Ghunghat twilight courtyard architecture and garden illumination in Gandhinagar"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
      </div>

      {/* 2. Layered Midnight Navy, Royal Blue & Soft Multi-tone Luxury Scrims */}
      <div className="absolute inset-0 bg-[#0B1325]/70 mix-blend-multiply pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1325] via-[#0A162B]/75 to-[#0B1325]/60 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B1325]/95 via-[#0A162B]/70 to-[#0A162B]/40 pointer-events-none" />

      {/* 3. 3D Animated Canvas Layer: Waves, Starlight, Orbiting Geometric Shapes & Auroras */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* 4. Fine Champagne Gold Radial Halo & Vignette */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,_transparent_25%,_rgba(11,19,37,0.85)_100%] pointer-events-none" />
      
      {/* 5. 100% Solid Dark Blue Foot Section Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0B1325] via-[#0B1325] to-transparent pointer-events-none" />
    </div>
  );
};
