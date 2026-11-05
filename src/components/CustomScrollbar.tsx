import React, { useEffect, useRef, useState, useCallback } from 'react';

export const CustomScrollbar: React.FC = () => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [thumbHeight, setThumbHeight] = useState(48);
  const [thumbTop, setThumbTop] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const dragStartY = useRef(0);
  const dragStartScrollTop = useRef(0);

  // Calculate geometry and thumb size
  const updateScrollbar = useCallback(() => {
    if (!trackRef.current) return;

    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;
    const maxScroll = Math.max(1, docHeight - winHeight);
    const currentScroll = window.scrollY;

    const trackHeight = trackRef.current.clientHeight;

    // Minimum thumb height 36px, max 80% of track
    const computedThumbHeight = Math.max(
      36,
      Math.min(trackHeight * 0.8, (winHeight / docHeight) * trackHeight)
    );
    setThumbHeight(computedThumbHeight);

    const availableTrack = Math.max(0, trackHeight - computedThumbHeight);
    const progress = Math.min(1, Math.max(0, currentScroll / maxScroll));
    const computedTop = progress * availableTrack;

    setThumbTop(computedTop);
    setScrollProgress(Math.round(progress * 100));
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateScrollbar();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    updateScrollbar();

    // Observe body size changes (e.g. FAQ accordion expanding, gallery filtering)
    const resizeObserver = new ResizeObserver(() => {
      updateScrollbar();
    });
    resizeObserver.observe(document.body);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      resizeObserver.disconnect();
    };
  }, [updateScrollbar]);

  // Handle Dragging
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(true);
    dragStartY.current = e.clientY;
    dragStartScrollTop.current = window.scrollY;

    // Capture pointer
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (!isDragging || !trackRef.current) return;

    const deltaY = e.clientY - dragStartY.current;
    const trackHeight = trackRef.current.clientHeight;
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;
    const maxScroll = Math.max(1, docHeight - winHeight);
    const availableTrack = Math.max(1, trackHeight - thumbHeight);

    const scrollDelta = (deltaY / availableTrack) * maxScroll;
    const targetScroll = Math.min(maxScroll, Math.max(0, dragStartScrollTop.current + scrollDelta));

    window.scrollTo({
      top: targetScroll,
      behavior: 'instant' as ScrollBehavior,
    });
  }, [isDragging, thumbHeight]);

  const handlePointerUp = useCallback((e: PointerEvent) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // Ignore if pointer capture already lost
      }
    }
  }, [isDragging]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
      document.body.style.userSelect = 'none';
    } else {
      document.body.style.userSelect = '';
    }

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      document.body.style.userSelect = '';
    };
  }, [isDragging, handlePointerMove, handlePointerUp]);

  // Click on Track to jump scroll
  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const trackHeight = rect.height;
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;
    const maxScroll = Math.max(1, docHeight - winHeight);

    // Target thumb center at click position
    const targetProgress = Math.min(1, Math.max(0, (clickY - thumbHeight / 2) / (trackHeight - thumbHeight)));
    window.scrollTo({
      top: targetProgress * maxScroll,
      behavior: 'smooth',
    });
  };

  return (
    <div
      className="fixed top-20 bottom-8 right-2 sm:right-3.5 z-40 pointer-events-auto flex items-center select-none"
      aria-hidden="true"
    >
      {/* Outer Scrollbar Container with consistent gap from right edge */}
      <div
        ref={trackRef}
        onClick={handleTrackClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative h-full w-2 sm:w-2.5 rounded-full transition-all duration-300 cursor-pointer ${
          isHovered || isDragging
            ? 'bg-[#0B1325]/85 border border-[#C5A880]/50 shadow-[0_0_12px_rgba(11,19,37,0.6)] w-2.5 sm:w-3'
            : 'bg-[#0B1325]/50 border border-[#C5A880]/20 shadow-[0_2px_8px_rgba(0,0,0,0.3)]'
        }`}
        style={{
          backdropFilter: 'blur(8px)',
        }}
      >
        {/* Sleek Golden Scrollbar Thumb */}
        <div
          onPointerDown={handlePointerDown}
          role="scrollbar"
          aria-valuenow={scrollProgress}
          aria-valuemin={0}
          aria-valuemax={100}
          className={`absolute left-0 right-0 rounded-full transition-shadow duration-200 cursor-grab active:cursor-grabbing ${
            isDragging
              ? 'bg-gradient-to-b from-[#FAF8F5] via-[#E6CA65] to-[#D4AF37] shadow-[0_0_16px_rgba(230,202,101,0.95)]'
              : isHovered
              ? 'bg-gradient-to-b from-[#E6CA65] via-[#D4AF37] to-[#C5A880] shadow-[0_0_12px_rgba(230,202,101,0.75)]'
              : 'bg-gradient-to-b from-[#D4AF37] via-[#C5A880] to-[#9E7D3B] shadow-[0_0_6px_rgba(212,175,55,0.4)]'
          }`}
          style={{
            height: `${thumbHeight}px`,
            transform: `translate3d(0, ${thumbTop}px, 0)`,
            willChange: 'transform',
            border: '1px solid rgba(255, 255, 255, 0.4)',
          }}
        >
          {/* Subtle tactile grip lines in thumb center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-0.5 opacity-80 pointer-events-none">
            <span className="w-1 sm:w-1.5 h-[1px] bg-[#0B1325]/60 rounded-full" />
            <span className="w-1 sm:w-1.5 h-[1px] bg-[#0B1325]/60 rounded-full" />
            <span className="w-1 sm:w-1.5 h-[1px] bg-[#0B1325]/60 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
