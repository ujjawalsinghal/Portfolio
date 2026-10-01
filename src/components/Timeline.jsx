import { useState, useEffect, useRef, useCallback } from 'react';
import { useAudio } from '../hooks/useAudio';
import {
  WebArchitectureCanvas,
  ChatUpSocketStreamCanvas,
  RoastingAITokenStreamCanvas,
  EdgeResumeATSParserCanvas
} from './TimelineVisualizers';
import MaskedTitle from './MaskedTitle';

export default function Timeline() {
  const { playHoverSound, playClickSound } = useAudio();
  const [activeEpochIndex, setActiveEpochIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const epochs = [
    {
      epoch: '01',
      date: 'SEP 2024 – MAR 2025',
      stageLabel: 'STAGE 01',
      category: 'THE FOUNDATION',
      dockLabel: 'FOUNDATIONS',
      title: 'Web Foundations & CS Basics',
      headline: 'HTML5, CSS3, JavaScript & Java',
      summary:
        'Started my engineering journey at ABES Engineering College in September 2024. Built a solid foundation in web development with HTML5, CSS3, and JavaScript while mastering Java for object-oriented programming and data structures. Explored Python basics and began building my algorithmic problem-solving skills.',
      metrics: [
        { label: 'Timeline', value: 'Sep 2024 – Mar 2025' },
        { label: 'College', value: 'ABES Engg. College' },
        { label: 'Core Tools', value: 'HTML, CSS, Java, JS' }
      ],
      techStack: ['HTML5', 'CSS3', 'JavaScript', 'Java', 'Python Basics', 'Git'],
      Visualizer: WebArchitectureCanvas
    },
    {
      epoch: '02',
      date: 'SEP 2025',
      stageLabel: 'STAGE 02',
      category: 'FIRST PROJECT SPRINT',
      dockLabel: 'FIRST PROJECT',
      title: 'NutroHeist: Food Safety Scanner',
      headline: 'AI-Powered Ingredient Analysis Web App',
      summary:
        'Built NutroHeist in September 2025 — a web application that scans packaged food ingredients and determines whether they are safe to eat. Designed a clean, responsive landing page and integrated AI ingredient analysis logic. The project received a fork from the community, validating its real-world utility.',
      metrics: [
        { label: 'Launched', value: 'Sep 2025' },
        { label: 'Community', value: '1 Fork' },
        { label: 'Tech', value: 'HTML, CSS, JS' }
      ],
      techStack: ['HTML5', 'CSS3', 'JavaScript', 'AI Integration', 'Responsive Design'],
      Visualizer: ChatUpSocketStreamCanvas
    },
    {
      epoch: '03',
      date: 'AUG 2026',
      stageLabel: 'STAGE 03',
      category: 'SECURITY & AI SPRINT',
      dockLabel: 'AI SECURITY',
      title: 'Defensys: AI Cybersecurity System',
      headline: 'Python-Based AI Defense Platform',
      summary:
        'Engineered Defensys in August 2026 — an AI-powered cybersecurity defense platform built with Python. The system leverages machine learning to detect threats, analyze anomalies, and automate defense responses. Also achieved Semi-Finalist in Smart India Hackathon (SIH) and participated in HackaMania hackathon.',
      metrics: [
        { label: 'Launched', value: 'Aug 2026' },
        { label: 'Tech', value: 'Python + AI/ML' },
        { label: 'Achievement', value: 'SIH Semi-Finalist' }
      ],
      techStack: ['Python', 'Machine Learning', 'AI/ML', 'Cybersecurity', 'Data Analysis', 'Backend APIs'],
      Visualizer: RoastingAITokenStreamCanvas
    },
    {
      epoch: '04',
      date: 'AUG 2026 – PRESENT',
      stageLabel: 'STAGE 04',
      category: 'PROFESSIONAL INTERNSHIP',
      dockLabel: 'INTERNSHIP',
      title: 'AI Backend Engineer at FlyRank AI',
      headline: 'Remote Internship • AI-Powered SEO Platform',
      summary:
        'Currently working as an AI Backend Engineer Intern at FlyRank AI. FlyRank is building the autopilot for organic growth — automating how brands appear in both classic and next-gen AI search engines. Applying full-stack and AI skills in a real production environment to deliver scalable backend solutions.',
      metrics: [
        { label: 'Role', value: 'AI Backend Intern' },
        { label: 'Company', value: 'FlyRank AI' },
        { label: 'Mode', value: 'Remote' }
      ],
      techStack: ['Node.js', 'Python', 'AI Integration', 'REST APIs', 'Backend Development', 'SEO Automation'],
      Visualizer: EdgeResumeATSParserCanvas
    }
  ];

  // Auto-running loop across 4 stages (pauses on hover so user can read)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveEpochIndex((prev) => (prev + 1) % epochs.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused, epochs.length]);

  // Move button controls (loops infinitely in both directions)
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

  // Keyboard Arrow navigation for accessibility
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
      {/* Aligned Section Header matching #about, #work, #skills */}
      <div className="timeline-header">
        <div className="gsap-reveal">
          <MaskedTitle text="Engineering Journey" />
          <div className="divider" />
        </div>
        <div className="timeline-header-meta font-mono">
          <div className="timeline-meta-pill">
            <span className={`meta-pulse-dot ${isPaused ? 'is-paused' : ''}`} />
            <span className="meta-pill-text">
              STAGE 0{activeEpochIndex + 1}/04 • {isPaused ? 'INTERACTIVE' : 'AUTO-RUNNING'}
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

      {/* Interactive Stage Slider with Side Navigation Arrows & Auto-running Loop */}
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
                  {/* Stage Container Card */}
                  <div className="timeline-stage-card hoverable">
                    {/* Left Pane: Narrative & Technical Telemetry */}
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

                      {/* Telemetry Metrics Grid */}
                      <div className="stage-metrics-grid font-mono">
                        {item.metrics.map((m, mIdx) => (
                          <div key={mIdx} className="stage-metric-box">
                            <span className="metric-lbl text-gray">{m.label}</span>
                            <span className="metric-val">{m.value}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech Stack Pills matching .skill-pill */}
                      <div className="stage-tech-pills font-mono">
                        {item.techStack.map((tech, tIdx) => (
                          <span key={tIdx} className="stage-pill">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right Pane: 2D Live Visualizer Canvas */}
                    <div className="timeline-simulation-pane">
                      <div className="terminal-canvas-wrapper">
                        <Visualizer isActive={isActive} />
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
