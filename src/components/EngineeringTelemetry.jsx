import { useAudio } from '../hooks/useAudio';

export default function EngineeringTelemetry() {
  const { playHoverSound, playClickSound } = useAudio();

  return (
    <div className="telemetry-command-deck gsap-reveal font-mono">
      {/* Top Header Bar - Clean and Professional */}
      <div className="telemetry-header">
        <div className="telemetry-header-left">
          <span className="telemetry-live-dot" />
          <span className="telemetry-hud-tag">Current Activity &amp; Profiles</span>
        </div>
        <span className="telemetry-hud-status">Active • AI/ML + Software Development</span>
      </div>

      {/* 3-Column Profile & Activity Grid */}
      <div className="telemetry-grid">
        {/* Card 1: What I'm Working On */}
        <div className="telemetry-card hoverable">
          <div className="telemetry-card-top">
            <span className="card-badge">CURRENT FOCUS</span>
            <span className="card-indicator">Active</span>
          </div>
          <h3 className="telemetry-card-title">AI/ML &amp; Software Development</h3>
          <p className="telemetry-card-text text-gray">
            Working on AI/ML-driven project ideas, modern software development workflows, and practical problem solving with a focus on real-world applications and data-informed design.
          </p>
          <div className="telemetry-meta-row text-gray">
            <span>PROFILE:</span>
            <span className="meta-highlight">B.Tech CSE • ABES Engineering College • CGPA 8.92</span>
          </div>
        </div>

        {/* Card 2: GitHub Projects */}
        <div className="telemetry-card hoverable">
          <div className="telemetry-card-top">
            <span className="card-badge">GITHUB CODE</span>
            <span className="card-indicator">Open Source</span>
          </div>
          <h3 className="telemetry-card-title">Project Work</h3>
          <p className="telemetry-card-text text-gray">
            Portfolio work and project experiments centered around AI/ML, recommendation systems, cybersecurity thinking, and applied software engineering.
          </p>
          <div className="telemetry-actions-list">
            <a
              href="https://github.com/ujjawalsinghal"
              target="_blank"
              rel="noopener noreferrer"
              className="telemetry-btn hoverable"
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
            >
              <span>View GitHub Profile</span>
              <span className="telemetry-arrow">↗</span>
            </a>
          </div>
        </div>

        {/* Card 3: Identity & Availability */}
        <div className="telemetry-card telemetry-card-comms hoverable">
          <div className="telemetry-card-top">
            <span className="card-badge">PROFILE</span>
            <span className="card-indicator">Available</span>
          </div>

          <div className="linkedin-profile-preview">
            <div
              className="linkedin-preview-avatar"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, rgba(148,163,184,0.18), rgba(255,255,255,0.04))',
                color: '#f8fafc',
                fontWeight: 800,
                fontSize: '1.25rem',
              }}
              aria-label="Ujjawal Singhal placeholder avatar"
            >
              U
            </div>
            <div className="linkedin-preview-info">
              <div className="linkedin-preview-name">
                <span>Ujjawal Singhal</span>
                <span className="linkedin-check" title="Portfolio profile">✓</span>
              </div>
              <div className="linkedin-preview-role text-gray">
                B.Tech CSE • ABES Engineering College
              </div>
            </div>
          </div>

          <p className="telemetry-card-text text-gray" style={{ marginBottom: '1rem' }}>
            Portfolio contact details are intentionally left configurable until verified personal information is provided.
          </p>

          <div className="telemetry-actions-list">
            <a
              href="https://github.com/ujjawalsinghal"
              target="_blank"
              rel="noopener noreferrer"
              className="telemetry-btn hoverable"
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
            >
              <span>GitHub</span>
              <span className="telemetry-arrow">↗</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
