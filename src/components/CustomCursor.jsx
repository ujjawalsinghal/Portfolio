import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const coreRef = useRef(null);
  const ringRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const starsRef = useRef([]);
  const lastStarTime = useRef(0);
  const frameRef = useRef(null);
  const mousePos = useRef({ x: -200, y: -200 });
  const ringPos = useRef({ x: -200, y: -200 });

  useEffect(() => {
    const core = coreRef.current;
    const ring = ringRef.current;
    if (!core || !ring) return;

    // Only run on desktop (fine pointer)
    if (window.matchMedia && !window.matchMedia('(pointer: fine)').matches) return;

    // ── Initial positions off-screen ──
    gsap.set(core, { xPercent: -50, yPercent: -50, x: -200, y: -200, opacity: 0 });
    gsap.set(ring, { xPercent: -50, yPercent: -50, x: -200, y: -200, opacity: 0 });

    // ── Core: instant-snap quickTo ──
    const coreX = gsap.quickTo(core, 'x', { duration: 0.08, ease: 'power2.out' });
    const coreY = gsap.quickTo(core, 'y', { duration: 0.08, ease: 'power2.out' });

    // ── Ring: smooth lag behind core ──
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.22, ease: 'power2.out' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.22, ease: 'power2.out' });

    let isVisible = false;

    // ── Spawn a star particle at position ──
    const spawnStar = (x, y) => {
      const now = Date.now();
      if (now - lastStarTime.current < 40) return; // throttle to ~25/sec
      lastStarTime.current = now;

      const star = document.createElement('div');
      star.className = 'cursor-star';

      const size = Math.random() * 4 + 2; // 2–6px
      const drift = (Math.random() - 0.5) * 14;
      const driftY = (Math.random() - 0.5) * 14;
      const duration = Math.random() * 300 + 400; // 400–700ms

      // Colour palette: blue / purple / white
      const colours = ['#ffffff', '#93c5fd', '#c4b5fd', '#60a5fa', '#a78bfa'];
      const colour = colours[Math.floor(Math.random() * colours.length)];

      Object.assign(star.style, {
        width: `${size}px`,
        height: `${size}px`,
        left: `${x + drift}px`,
        top: `${y + driftY}px`,
        background: `radial-gradient(circle, ${colour} 0%, transparent 100%)`,
        boxShadow: `0 0 ${size * 1.5}px ${size * 0.5}px ${colour}88`,
        animationDuration: `${duration}ms`,
      });

      document.body.appendChild(star);
      starsRef.current.push(star);

      setTimeout(() => {
        star.remove();
        starsRef.current = starsRef.current.filter(s => s !== star);
      }, duration + 50);
    };

    // ── Nebula burst on click ──
    const spawnNebulaBurst = (x, y) => {
      const burst = document.createElement('div');
      burst.className = 'cursor-nebula-burst';
      const size = 60 + Math.random() * 40;

      Object.assign(burst.style, {
        width: `${size}px`,
        height: `${size}px`,
        left: `${x}px`,
        top: `${y}px`,
      });

      document.body.appendChild(burst);
      setTimeout(() => burst.remove(), 700);

      // Also spawn a burst of extra stars
      for (let i = 0; i < 10; i++) {
        setTimeout(() => spawnStar(
          x + (Math.random() - 0.5) * 30,
          y + (Math.random() - 0.5) * 30
        ), i * 20);
      }
    };

    // ── Mouse move ──
    const handleMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;
      mousePos.current = { x, y };

      if (!isVisible) {
        gsap.to([core, ring], { opacity: 1, duration: 0.3 });
        isVisible = true;
      }

      coreX(x);
      coreY(y);
      ringX(x);
      ringY(y);

      spawnStar(x, y);

      // Detect hoverable
      const target = e.target;
      setIsHovered(
        !!(target && (target.classList.contains('hoverable') || target.closest('.hoverable')))
      );
    };

    // ── Mouse click ──
    const handleMouseDown = (e) => {
      // Quick scale-down press effect on core
      gsap.to(core, { scale: 0.5, duration: 0.1, ease: 'power3.in',
        onComplete: () => gsap.to(core, { scale: 1, duration: 0.3, ease: 'elastic.out(1.5, 0.4)' })
      });
      gsap.to(ring, { scale: 0.7, duration: 0.1, ease: 'power3.in',
        onComplete: () => gsap.to(ring, { scale: 1, duration: 0.4, ease: 'elastic.out(1.2, 0.4)' })
      });
      spawnNebulaBurst(e.clientX, e.clientY);
    };

    // ── Mouse leave/enter ──
    const handleMouseLeave = () => {
      gsap.to([core, ring], { opacity: 0, duration: 0.25 });
      isVisible = false;
    };

    const handleMouseEnter = () => {
      gsap.to([core, ring], { opacity: 1, duration: 0.25 });
      isVisible = true;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      // Clean up any remaining star particles
      starsRef.current.forEach(s => s.remove());
      starsRef.current = [];
    };
  }, []);

  return (
    <>
      {/* Inner glowing core dot */}
      <div id="cursor-core" ref={coreRef} className={isHovered ? 'hovered' : ''} />
      {/* Outer spinning orbital ring */}
      <div id="cursor-ring" ref={ringRef} className={isHovered ? 'hovered' : ''} />
    </>
  );
}
