import ayushPhoto from '../assets/AyushPhoto.jpg';
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
              I'm Ayush Chaurasiya, a Full Stack Developer and 3rd-year CSE (AIML) student at ABES Engineering College, Ghaziabad. I build interactive, production-ready web applications using modern frontend and backend technologies. From designing scalable REST APIs and clean UI layouts with React and Tailwind, to leveraging AI tools like Claude to accelerate development — I operate across the full stack. I'm passionate about clean API design, algorithmic problem solving, and building efficient software systems that make a real difference.
            </p>
            <div className="font-mono text-gray skill-list text-sm">
              <p><span style={{ color: '#fff' }}></span> Full Stack Web Development (React, Node.js)</p>
              <p><span style={{ color: '#fff' }}></span> AI-Powered Application Development</p>
              <p><span style={{ color: '#fff' }}></span> Data Structures & Algorithms (Java)</p>
              <p><span style={{ color: '#fff' }}></span> Cloud Deployments & RESTful API Design</p>
            </div>
          </div>

          <div className="abstract-box hoverable gsap-reveal">
            <div className="about-photo-wrapper">
              <img
                src={ayushPhoto}
                alt="Ayush Chaurasiya - Full Stack Developer & AIML Student"
                className="about-photo-img"
                loading="eager"
              />
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


