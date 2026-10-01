
import { useState } from 'react';
import ProjectModal from './ProjectModal';
import MaskedTitle from './MaskedTitle';
import { projects } from '../data/projects';

export default function Work() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(null);

  const activeProject = activeProjectIndex === null ? null : projects[activeProjectIndex];

  return (
    <section id="work" className="container work-page-section">
      <div className="gsap-reveal work-header">
        <MaskedTitle number="2." text="Featured Work" />
        <div className="divider" />
      </div>

      <div className="work-grid">
        {projects.map((proj, index) => (
          <button
            key={proj.title}
            type="button"
            className="project-card hoverable gsap-work-card"
            onClick={() => setActiveProjectIndex(index)}
            aria-label={`Open project: ${proj.title}`}
          >
            <div
              className="project-bg"
              style={{
                background: 'linear-gradient(135deg, rgba(15,23,42,0.96), rgba(37,99,235,0.2), rgba(15,23,42,0.9))',
              }}
            />
            <div className="project-overlay" />
            <div className="project-info">
              <p className="font-mono project-category text-gray uppercase">{proj.category}</p>
              <h3 className="project-title text-glow uppercase">{proj.title}</h3>
            </div>
          </button>
        ))}
      </div>

      <ProjectModal
        open={activeProjectIndex !== null}
        onClose={() => setActiveProjectIndex(null)}
        project={activeProject}
      />
    </section>
  );
}
