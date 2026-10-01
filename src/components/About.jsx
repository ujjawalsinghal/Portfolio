import EngineeringTelemetry from './EngineeringTelemetry';
import Timeline from './Timeline';
import MaskedTitle from './MaskedTitle';

export default function About() {
  return (
    <div className="about-page-wrapper">
      {/* 1. Core Background & Engineering Philosophy */}
      <section id="about" className="container about-intro-section">
        <div className="about-grid">
          <div className="gsap-reveal">
            <MaskedTitle number="1." text="About Me" />
            <div className="divider" />
            <p className="text-gray about-text">
              I'm Ujjawal Singhal, a B.Tech Computer Science & Engineering student at ABES Engineering College. I'm currently in my 3rd year (2024–2028), and my focus is AI/ML and software development. I enjoy building practical, data-driven projects and exploring modern application design with a strong emphasis on real-world problem solving.
            </p>
            <p className="text-gray about-text" style={{ marginTop: '1rem' }}>
              CGPA: 8.92
            </p>
            <div className="font-mono text-gray skill-list text-sm">
              <p><span style={{ color: '#fff' }}></span> AI/ML & Data-Driven Problem Solving</p>
              <p><span style={{ color: '#fff' }}></span> Software Development & Product Thinking</p>
              <p><span style={{ color: '#fff' }}></span> Modern Web & API-Based Interfaces</p>
              <p><span style={{ color: '#fff' }}></span> Practical Project Building</p>
            </div>
          </div>

          <div className="abstract-box hoverable gsap-reveal">
            <div className="about-photo-wrapper">
              <div
                className="about-photo-placeholder"
                aria-label="Ujjawal Singhal profile placeholder"
                title="Profile image unavailable"
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, rgba(148,163,184,0.18), rgba(255,255,255,0.04))',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: '#f8fafc',
                  fontSize: '3rem',
                  fontWeight: 800,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                }}
              >
                U
              </div>
            </div>
          </div>
        </div>

        {/* Real-Time Engineering Telemetry & Verified Command Channels */}
        <EngineeringTelemetry />
      </section>

      {/* 2. Interactive Evolution Roadmap (Auto-looping + Move Buttons) */}
      <Timeline />
    </div>
  );
}


