import { useState, useEffect, useCallback } from 'react';
import { useAudio } from '../hooks/useAudio';
import {
  WebArchitectureCanvas,
  ChatUpSocketStreamCanvas,
  RoastingAITokenStreamCanvas,
  EdgeResumeATSParserCanvas
} from './TimelineVisualizers';
import MaskedTitle from './MaskedTitle';
import useReducedMotion from '../hooks/useReducedMotion';

export default function Timeline() {
  const { playHoverSound, playClickSound } = useAudio();
  const prefersReducedMotion = useReducedMotion();
  const [activeEpochIndex, setActiveEpochIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const epochs = [
    {
      epoch: '01',
      date: '2024 – 2025',
      stageLabel: 'STAGE 01',
      category: 'THE FOUNDATION',
      dockLabel: 'FOUNDATIONS',
      title: 'Programming Foundations & Web Basics',
      headline: 'Problem-solving, web fundamentals, and software thinking',
      summary:
        'Built a solid foundation in programming, logic, and web development while preparing for deeper work in AI/ML and software engineering. Focused on learning clean problem solving and creating practical understanding of front-end and data-driven systems.',
      metrics: [
        { label: 'Focus', value: 'CS Foundations' },
        { label: 'College', value: 'ABES Engineering College' },
        { label: 'Area', value: 'Web + Logic' }
      ],
      techStack: ['Web Fundamentals', 'Programming Logic', 'Data Structures', 'Problem Solving'],
      Visualizer: WebArchitectureCanvas
    },
    {
      epoch: '02',
      date: '2025',
      stageLabel: 'STAGE 02',
      category: 'AI PROJECT',
      dockLabel: 'RECOMMENDER',
      title: 'Movie Recommendation System',
      headline: 'Data-driven recommendation project',
      summary:
        'Developed a movie recommendation system project centered on identifying relevant suggestions through preference patterns and similarity-based analysis. This work reflects a practical, AI/ML-first approach to discovery and user-focused recommendation logic.',
      metrics: [
        { label: 'Project', value: 'Movie Recs' },
        { label: 'Field', value: 'AI/ML' },
        { label: 'Focus', value: 'Recommendation' }
      ],
      techStack: ['Python', 'Machine Learning', 'Recommendation Logic', 'Data Analysis'],
      Visualizer: ChatUpSocketStreamCanvas
    },
    {
      epoch: '03',
      date: '2025 – 2026',
      stageLabel: 'STAGE 03',
      category: 'SECURITY & SYSTEMS',
      dockLabel: 'SYSTEMS',
      title: 'CipherCraft+',
      headline: 'Security and cryptography-focused project',
      summary:
        'Explored a cipher-based software project focused on message transformation, secure patterns, and practical encryption workflows. This stage emphasized structured thinking around system security and applied software design.',
      metrics: [
        { label: 'Project', value: 'CipherCraft+' },
        { label: 'Field', value: 'Security' },
        { label: 'Focus', value: 'Cryptography' }
      ],
      techStack: ['Python', 'Security Concepts', 'Cryptography', 'Problem Solving'],
      Visualizer: RoastingAITokenStreamCanvas
    },
    {
      epoch: '04',
      date: '2026',
      stageLabel: 'STAGE 04',
      category: 'RISK ANALYSIS',
      dockLabel: 'RISK',
      title: 'Bank Default Risk Predictor',
      headline: 'Finance-focused predictive modeling project',
      summary:
        'Built a risk prediction project exploring default likelihood patterns through structured data analysis and machine learning-based forecasting. This focus reflects a practical interest in data-driven decision support and applied AI in finance.',
      metrics: [
        { label: 'Project', value: 'Risk Predictor' },
        { label: 'Field', value: 'Finance' },
        { label: 'Focus', value: 'Prediction' }
      ],
      techStack: ['Python', 'Machine Learning', 'Risk Modeling', 'Data Science'],
      Visualizer: EdgeResumeATSParserCanvas
    }
  ];

  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;
    const interval = setInterval(() => {
      setActiveEpochIndex((prev) => (prev + 1) % epochs.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused, prefersReducedMotion, epochs.length]);

  const handleNext = useCallback(() => {
    playClickSound();
    setActiveEpochIndex((prev) => (prev + 1) % epochs.length);
  }, [epochs.length, playClickSound]);

  const handlePrev = useCallback(() => {
    playClickSound();
    setActiveEpochIndex((prev) => (prev - 1 + epochs.length) % epochs.length);
  }, [epochs.length, playClickSound]);

  const goToEpoch = useCallback((targetIndex) => {
    if (targetIndex < 0 || targetIndex >= epochs.length) return;
    playClickSound();
    setActiveEpochIndex(targetIndex);
  }, [epochs.length, playClickSound]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  return (
    <section className="container timeline-section" id="experience">
      <div className="timeline-header">
        <div className="gsap-reveal">
          <MaskedTitle text="Engineering Journey" />
          <div className="divider" />
        </div>
        <div className="timeline-header-meta font-mono">
          <div className="timeline-meta-pill">
            <span className={`meta-pulse-dot ${isPaused || prefersReducedMotion ? 'is-paused' : ''}`} />
            <span className="meta-pill-text">
              STAGE 0{activeEpochIndex + 1}/04 • {prefersReducedMotion ? 'MOTION REDUCED' : isPaused ? 'INTERACTIVE' : 'AUTO-RUNNING'}
            </span>
          </div>
          <div className="timeline-jump-strip">
            {epochs.map((ep, i) => (
              <button
                key={ep.epoch}
                type="button"
                onClick={() => goToEpoch(i)}
                onMouseEnter={playHoverSound}
                className={`timeline-jump-pill hoverable ${activeEpochIndex === i ? 'is-active' : ''}`}
                aria-label={`Jump to stage 0${i + 1}`}
              >
                0{i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        className="timeline-stage-wrapper"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <button
          type="button"
          className="timeline-side-arrow timeline-arrow-prev hoverable font-mono"
          onClick={handlePrev}
          onMouseEnter={playHoverSound}
          aria-label="Previous phase"
          title="Previous stage"
        >
          ‹
        </button>

        <div className="timeline-carousel-shell">
          <div
            className="timeline-cards-track"
            style={{ transform: `translateX(-${activeEpochIndex * 100}%)` }}
          >
            {epochs.map((item, idx) => {
              const Visualizer = item.Visualizer;
              const isActive = activeEpochIndex === idx;

              return (
                <div
                  key={item.epoch}
                  className={`timeline-card-slide ${isActive ? 'is-active' : ''}`}
                  onMouseEnter={() => {
                    if (!isActive) playHoverSound();
                  }}
                >
                  <div className="timeline-stage-card hoverable">
                    <div className="timeline-narrative-pane">
                      <div className="stage-topbar font-mono">
                        <div className="stage-topbar-left">
                          <span className="stage-badge uppercase">{item.category}</span>
                          <span className="stage-date uppercase">{item.date}</span>
                        </div>
                        <span className="stage-step-tag text-gray">{item.stageLabel}</span>
                      </div>

                      <div className="stage-title-wrap">
                        <h3 className="stage-title uppercase text-glow">{item.title}</h3>
                        <div className="stage-headline font-mono text-gray uppercase">{item.headline}</div>
                      </div>

                      <p className="stage-summary text-gray">{item.summary}</p>

                      <div className="stage-metrics-grid font-mono">
                        {item.metrics.map((m, mIdx) => (
                          <div key={mIdx} className="stage-metric-box">
                            <span className="metric-lbl text-gray">{m.label}</span>
                            <span className="metric-val">{m.value}</span>
                          </div>
                        ))}
                      </div>

                      <div className="stage-tech-pills font-mono">
                        {item.techStack.map((tech, tIdx) => (
                          <span key={tIdx} className="stage-pill">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="timeline-simulation-pane">
                      <div className="terminal-canvas-wrapper">
                        <Visualizer isActive={isActive} reducedMotion={prefersReducedMotion} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          className="timeline-side-arrow timeline-arrow-next hoverable font-mono"
          onClick={handleNext}
          onMouseEnter={playHoverSound}
          aria-label="Next phase"
          title="Next stage"
        >
          ›
        </button>
      </div>
    </section>
  );
}
