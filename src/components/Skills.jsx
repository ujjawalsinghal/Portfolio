
import { useState, useEffect, useRef, useCallback } from 'react';
import { useAudio } from '../hooks/useAudio';
import MaskedTitle from './MaskedTitle';
import useReducedMotion from '../hooks/useReducedMotion';

const categories = [
  {
    id: '01',
    tag: 'FRONTEND DEVELOPMENT',
    title: 'Frontend & UI Craft',
    summary: 'Responsive layouts, component architecture, clean styling, and high-fidelity user experiences.',
    telemetry: 'React • JavaScript • HTML • CSS',
    skills: ['HTML', 'CSS', 'JavaScript', 'React']
  },
  {
    id: '02',
    tag: 'PROGRAMMING',
    title: 'Programming & OOP',
    summary: 'Programming foundations across Python, Java, C, C++, and JavaScript.',
    telemetry: 'Python • Java • C • C++',
    skills: ['Python', 'Java', 'C', 'C++', 'JavaScript', 'OOP']
  },
  {
    id: '03',
    tag: 'DATABASES & CS',
    title: 'Data & Core CS',
    summary: 'Database and core computer science foundations for data-driven software work.',
    telemetry: 'MySQL • DBMS • DSA',
    skills: ['MySQL', 'DBMS', 'Data Structures', 'Algorithms', 'DSA', 'OOP']
  },
  {
    id: '04',
    tag: 'AI & MACHINE LEARNING',
    title: 'AI & ML Engineering',
    summary: 'Developing machine learning and data-analysis skills through practical projects.',
    telemetry: 'Python • NumPy • Pandas • ML Models',
    skills: ['Machine Learning', 'NumPy', 'Pandas', 'Data Visualization', 'AI/ML', 'Data Analysis']
  },
  {
    id: '05',
    tag: 'TOOLS & DEVOPS',
    title: 'Tools & Version Control',
    summary: 'Professional development workflows, version control, and collaboration using industry tools.',
    telemetry: 'GitHub • Vercel • Deployment',
    skills: ['Git', 'GitHub', 'VS Code', 'Vite', 'npm']
  },
  {
    id: '06',
    tag: 'PROBLEM SOLVING CORE',
    title: 'Algorithms & DSA',
    summary: 'Data structures, algorithmic thinking, and competitive problem solving using Java & LeetCode.',
    telemetry: 'Java • DSA • LeetCode',
    skills: ['DSA', 'Algorithms', 'Data Structures', 'OOP', 'Time Complexity', 'Problem Solving']
  }
];

function getCardVisualState(index, angle, angleStep) {
  const cardBaseAngle = index * angleStep;
  let diffDeg = ((cardBaseAngle - angle) % 360 + 360) % 360;
  if (diffDeg > 180) diffDeg -= 360;

  const rad = (diffDeg * Math.PI) / 180;
  const sinVal = Math.sin(rad);
  const cosVal = Math.cos(rad);
  const depthFactor = (cosVal + 1) / 2;
  const scale = 0.64 + depthFactor * 0.41;
  let blurAmount = 0;
  let opacity = 1;

  if (depthFactor < 0.5) {
    const backFactor = (0.5 - depthFactor) / 0.5;
    blurAmount = backFactor * 4;
    opacity = 1 - backFactor * 0.65;
  }

  return {
    sinVal,
    cosVal,
    rotateYDeg: -diffDeg * 0.85,
    scale,
    opacity,
    blur: blurAmount > 0 ? `blur(${blurAmount.toFixed(1)}px)` : 'none',
    zIndex: Math.round(depthFactor * 100),
  };
}

function applyCardVisualState(card, state) {
  card.style.setProperty('--card-sin', state.sinVal);
  card.style.setProperty('--card-cos', state.cosVal);
  card.style.setProperty('--card-rotate-y', `${state.rotateYDeg}deg`);
  card.style.setProperty('--depth-scale', state.scale);
  card.style.setProperty('--depth-opacity', state.opacity);
  card.style.setProperty('--depth-blur', state.blur);
  card.style.zIndex = state.zIndex;
}


export default function Skills() {
  const { playHoverSound, playClickSound } = useAudio();
  const prefersReducedMotion = useReducedMotion();
  const carouselStageRef = useRef(null);
  const cardRefs = useRef([]);

  const [isPaused, setIsPaused] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const angleRef = useRef(0);
  const isPausedRef = useRef(false);
  const isDraggingRef = useRef(false);
  const isVisibleRef = useRef(false);
  const animationFrameRef = useRef(null);
  const animationControlRef = useRef(() => {});
  const updateCarouselRef = useRef(null);
  const startXRef = useRef(0);
  const startAngleRef = useRef(0);
  const lastActiveIndexRef = useRef(0);

  const totalCards = categories.length;
  const angleStep = 360 / totalCards; // 60 degrees between each card

  const updateCarousel = useCallback((angle) => {
    angleRef.current = angle;
    cardRefs.current.forEach((card, index) => {
      if (card) applyCardVisualState(card, getCardVisualState(index, angle, angleStep));
    });

    let closestIdx = 0;
    let minDiff = 360;
    for (let index = 0; index < totalCards; index++) {
      let diff = ((index * angleStep - angle) % 360 + 360) % 360;
      if (diff > 180) diff = 360 - diff;
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = index;
      }
    }

    if (closestIdx !== lastActiveIndexRef.current) {
      lastActiveIndexRef.current = closestIdx;
      setActiveCardIndex(closestIdx);
    }
  }, [angleStep, totalCards]);

  useEffect(() => {
    updateCarouselRef.current = updateCarousel;
  }, [updateCarousel]);

  // Keep the pause ref in sync and stop/resume the loop accordingly.
  useEffect(() => {
    isPausedRef.current = isPaused;
    animationControlRef.current();
  }, [isPaused]);

  // Continuous rotation only runs while the stage is visible and motion is allowed.
  useEffect(() => {
    let lastTime = 0;

    const canAnimate = () =>
      isVisibleRef.current &&
      !isPausedRef.current &&
      !isDraggingRef.current &&
      !prefersReducedMotion;

    const stop = () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };

    const loop = (currentTime) => {
      animationFrameRef.current = null;
      if (!canAnimate()) return;

      const delta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;
      updateCarouselRef.current?.((angleRef.current + delta * 20) % 360);
      if (canAnimate()) animationFrameRef.current = requestAnimationFrame(loop);
    };

    const start = () => {
      if (!canAnimate() || animationFrameRef.current !== null) return;
      lastTime = performance.now();
      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animationControlRef.current = () => {
      if (canAnimate()) start();
      else stop();
    };
    animationControlRef.current();

    return () => {
      stop();
      animationControlRef.current = () => {};
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    const stage = carouselStageRef.current;
    if (!stage) return;

    if (!('IntersectionObserver' in window)) {
      isVisibleRef.current = true;
      animationControlRef.current();
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      isVisibleRef.current = entry.isIntersecting && entry.intersectionRatio >= 0.1;
      animationControlRef.current();
    }, { threshold: [0, 0.1] });

    observer.observe(stage);
    return () => {
      observer.disconnect();
      isVisibleRef.current = false;
      animationControlRef.current();
    };
  }, []);

  // Rotate to specific card on click or nav button
  const rotateToCard = useCallback((index) => {
    playClickSound();
    const target = index * angleStep;
    updateCarouselRef.current?.(target);
  }, [angleStep, playClickSound]);

  // Interactive Drag / Swipe controls
  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    animationControlRef.current();
    startXRef.current = e.clientX || (e.touches && e.touches[0]?.clientX) || 0;
    startAngleRef.current = angleRef.current;
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const clientX = e.clientX || (e.touches && e.touches[0]?.clientX) || 0;
    const deltaX = clientX - startXRef.current;
    updateCarouselRef.current?.((startAngleRef.current - deltaX * 0.32 + 3600) % 360);
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
    animationControlRef.current();
  };

  // Wheel interaction: scroll wheel rotates the 360 cylinder
  const handleWheel = (e) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey) {
      e.preventDefault();
      const delta = e.deltaX !== 0 ? e.deltaX : e.deltaY;
      updateCarouselRef.current?.((angleRef.current + delta * 0.2 + 3600) % 360);
    }
  };

  return (
    <section id="skills" className="skills-page-section">
      {/* Header */}
      <div className="container gsap-reveal skills-header">
        <MaskedTitle number="3." text="My Skills" />
        <div className="divider" />
      </div>

      {/* 360-Degree Cylindrical Orbital Stage */}
      <div
        className="skills-orbital-viewport"
        ref={carouselStageRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onWheel={handleWheel}
        role="region"
        aria-label="360 Degree Skills Carousel"
      >
        {/* Real Ring Mechanical / Holographic Tracks */}
        <div className="orbital-ambient-halo" />
        <div className="orbital-core-ring ring-top" />
        <div className="orbital-core-ring ring-mid" />

        <div className="skills-cylinder-stage">
          {categories.map((cat, index) => {
            const visualState = getCardVisualState(index, 0, angleStep);
            const isFrontActive = index === activeCardIndex;

            return (
              <div
                key={cat.id}
                className={`skill-orbital-card hoverable ${isFrontActive ? 'active-front' : ''}`}
                ref={(node) => { cardRefs.current[index] = node; }}
                style={{
                  '--card-sin': visualState.sinVal,
                  '--card-cos': visualState.cosVal,
                  '--card-rotate-y': `${visualState.rotateYDeg}deg`,
                  '--depth-scale': visualState.scale,
                  '--depth-opacity': visualState.opacity,
                  '--depth-blur': visualState.blur,
                  zIndex: visualState.zIndex
                }}
                onClick={() => rotateToCard(index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    rotateToCard(index);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`Select skill category: ${cat.title}`}
                onMouseEnter={() => {
                  setIsPaused(true);
                  playHoverSound();
                }}
                onMouseLeave={() => {
                  setIsPaused(false);
                }}
              >
                <div className="orbital-card-inner">
                  {/* Top Bar: Code Index & Tag */}
                  <div className="orbital-card-top font-mono">
                    <span className="skill-id-badge">{cat.id}</span>
                    <span className="skill-tag uppercase">{cat.tag}</span>
                  </div>

                  {/* Title & Core Summary */}
                  <h3 className="skill-card-title uppercase text-glow">{cat.title}</h3>
                  <p className="skill-card-summary text-gray">{cat.summary}</p>

                  {/* Live Running Telemetry Meter */}
                  <div className="orbital-telemetry-badge font-mono">
                    <span className="telemetry-icon">⚡</span>
                    <span className="telemetry-text">{cat.telemetry}</span>
                  </div>

                  {/* Skill Chips List */}
                  <ul className="skill-list font-mono">
                    {cat.skills.map((s) => (
                      <li key={s} className="skill-pill">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Orbit Floor Ambient Scanner Ring */}
        <div className="orbital-floor-grid" />
      </div>
    </section>
  );
}

