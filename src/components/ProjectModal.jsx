import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { stopLenis, startLenis } from '../hooks/useLenis';

export default function ProjectModal({ open, onClose, project }) {
  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const [activeTab, setActiveTab] = useState('overview');
  const previousFocusRef = useRef(null);
  const techStack = useMemo(() => project?.techStack ?? [], [project]);
  const features = useMemo(() => project?.features ?? [], [project]);
  const githubUrl = project?.githubUrl;
  const liveDemoUrl = project?.liveDemoUrl;
  const hasLiveDemo = Boolean(liveDemoUrl);

  useEffect(() => {
    if (!open) return;
    requestAnimationFrame(() => setActiveTab('overview'));
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    stopLenis();

    const tl = gsap.timeline();
    tl.set(overlayRef.current, { autoAlpha: 0 });
    tl.set(panelRef.current, { y: 24, autoAlpha: 0, scale: 0.98 });

    tl.to(overlayRef.current, {
      autoAlpha: 1,
      duration: 0.22,
      ease: 'power2.out'
    });

    tl.to(panelRef.current, {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration: 0.38,
      ease: 'power3.out'
    }, '-=0.08');

    return () => {
      document.body.style.overflow = prevOverflow;
      startLenis();
      tl.kill();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    previousFocusRef.current = document.activeElement;
    const panel = panelRef.current;
    requestAnimationFrame(() => panel?.querySelector('.project-modal-close')?.focus());

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose?.();
        return;
      }
      if (e.key !== 'Tab') return;

      const focusable = panel?.querySelectorAll(
        'button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      previousFocusRef.current?.focus?.();
      previousFocusRef.current = null;
    };
  }, [open, onClose]);

  if (!open || !project) return null;

  return createPortal(
    <div
      className="project-modal-overlay"
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} case study`}
      data-lenis-prevent="true"
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div
        className="project-modal-panel"
        ref={panelRef}
        data-lenis-prevent="true"
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
      >
        <div className="project-modal-header">
          <div>
            <p className="project-modal-tag font-mono uppercase">{project.category}</p>
            <h3 className="project-modal-title text-glow-intense uppercase">{project.title}</h3>
            {project.tagline ? (
              <p className="project-modal-subtitle text-gray">{project.tagline}</p>
            ) : null}
          </div>

          <button
            className="project-modal-close hoverable"
            onClick={onClose}
            aria-label="Close modal"
            type="button"
          >
            <span aria-hidden="true">✕</span>
          </button>
        </div>

        <div className="project-modal-tab-bar font-mono">
          <button
            type="button"
            className={`project-modal-tab-btn hoverable ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <span className="tab-number">01</span>
            <span className="tab-label">OVERVIEW</span>
          </button>
          <button
            type="button"
            className={`project-modal-tab-btn hoverable ${activeTab === 'architecture' ? 'active' : ''}`}
            onClick={() => setActiveTab('architecture')}
          >
            <span className="tab-number">02</span>
            <span className="tab-label">DETAILS</span>
          </button>
          {hasLiveDemo && (
            <button
              type="button"
              className={`project-modal-tab-btn hoverable ${activeTab === 'prototype' ? 'active' : ''}`}
              onClick={() => setActiveTab('prototype')}
            >
              <span className="tab-number">03</span>
              <span className="tab-label">LIVE PROTOTYPE</span>
            </button>
          )}
        </div>

        {activeTab === 'overview' && (
          <div className="project-modal-body" data-lenis-prevent="true">
            <div className="project-modal-content">
              <p className="project-modal-description text-gray">{project.description}</p>

              {features.length ? (
                <div className="project-modal-section">
                  <p className="project-modal-section-title font-mono uppercase">Features</p>
                  <ul className="project-modal-list">
                    {features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {techStack.length ? (
                <div className="project-modal-section">
                  <p className="project-modal-section-title font-mono uppercase">Tech Stack</p>
                  <div className="project-modal-pills">
                    {techStack.map((tool) => (
                      <span key={tool} className="project-modal-pill">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="project-modal-actions">
                {githubUrl ? (
                  <a
                    className="project-modal-action-btn hoverable font-mono uppercase"
                    href={githubUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub Repo
                  </a>
                ) : null}

                <button
                  type="button"
                  className="project-modal-action-btn hoverable font-mono uppercase secondary-btn"
                  onClick={() => setActiveTab('architecture')}
                >
                  More Details →
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'architecture' && (
          <div className="project-modal-architecture-body" data-lenis-prevent="true">
            <div className="case-study-section">
              <div className="case-study-section-header">
                <span className="section-badge font-mono uppercase">01 • Project Snapshot</span>
                <h4 className="case-study-heading">Verified project details</h4>
              </div>

              <div className="architecture-decisions-grid">
                <div className="decision-card">
                  <div className="decision-card-icon font-mono">✦</div>
                  <h5 className="decision-card-title uppercase font-mono">Overview</h5>
                  <p className="decision-card-desc text-gray">{project.description}</p>
                </div>
                <div className="decision-card">
                  <div className="decision-card-icon font-mono">✦</div>
                  <h5 className="decision-card-title uppercase font-mono">Features</h5>
                  <p className="decision-card-desc text-gray">{features.join(' • ') || 'No feature list was verified for this project.'}</p>
                </div>
                <div className="decision-card">
                  <div className="decision-card-icon font-mono">✦</div>
                  <h5 className="decision-card-title uppercase font-mono">Tech Stack</h5>
                  <p className="decision-card-desc text-gray">{techStack.join(' • ') || 'No technology list was verified for this project.'}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'prototype' && hasLiveDemo && (
          <div className="project-modal-prototype-body" data-lenis-prevent="true">
            <div className="prototype-browser-bar font-mono">
              <div className="browser-dots" aria-hidden="true">
                <span className="dot dot-red"></span>
                <span className="dot dot-yellow"></span>
                <span className="dot dot-green"></span>
              </div>

              <div className="browser-address-bar">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="lock-icon" aria-hidden="true">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <span className="address-text">{liveDemoUrl}</span>
              </div>
            </div>

            <div className="prototype-viewport-container device-desktop">
              <iframe
                src={liveDemoUrl}
                title={`${project.title} Live Prototype`}
                className="prototype-iframe"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              />
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
