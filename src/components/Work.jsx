
import { useMemo, useState } from 'react';
import ProjectModal from './ProjectModal';
import MaskedTitle from './MaskedTitle';

export default function Work() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(null);

  const projects = useMemo(
    () => [
      {
        bgClass: 'bg-3',
        bgImage: null,
        shortTitle: 'Movie Recommendation System',
        category: 'AI • DATA • RECOMMENDER SYSTEM',
        tagline: 'Movie recommendation prototype using content-based filtering',
        description:
          'A content-based movie recommendation project built with Python and the TMDB 5000 Movies and Credits datasets.',
        problem:
          'Browsing a large movie catalog can make it difficult to quickly identify relevant titles without a structured recommendation approach.',
        solution:
          'The project explores content-based recommendation logic using movie metadata and credits data to surface related works from shared characteristics.',
        techStack: ['Python', 'pandas', 'scikit-learn', 'Streamlit', 'TMDB 5000 Movies', 'TMDB 5000 Credits'],
        features: [
          'Content-based movie recommendation workflow',
          'TMDB dataset exploration',
          'Similarity-based movie suggestions',
          'Streamlit-based project interface'
        ],
        architectureFlow: [
          { step: '01', title: 'Data Loading', tech: 'TMDB Datasets', desc: 'Load movie and credits data for analysis.' },
          { step: '02', title: 'Feature Preparation', tech: 'Metadata & Credits', desc: 'Process the relevant movie attributes used for similarity comparisons.' },
          { step: '03', title: 'Recommendation Logic', tech: 'Content-Based Filtering', desc: 'Generate related movie suggestions using shared feature patterns.' },
          { step: '04', title: 'Display Layer', tech: 'Streamlit', desc: 'Present the recommendations in a simple project interface.' },
        ],
        architectureDetails: [
          { title: 'Content-Based Discovery', desc: 'Uses movie metadata and credits to compare similarities between titles and suggest related options.' },
          { title: 'Dataset-Focused Workflow', desc: 'Builds the recommendation process around the TMDB 5000 Movies and Credits datasets.' },
          { title: 'Project-Driven Implementation', desc: 'Keeps the flow transparent and grounded in the known dataset and tooling used for the project.' },
        ],
        metrics: [
          { label: 'Type', value: 'AI/ML' },
          { label: 'Domain', value: 'Movies' },
          { label: 'Focus', value: 'Recommendation' },
          { label: 'Stack', value: 'Python' },
        ],
        title: 'Movie Recommendation System',
        images: [],
        githubUrl: 'https://github.com/ujjawalsinghal/Movie-Recommendation-System',
        liveDemoUrl: null,
        exploreUrl: null
      },
      {
        bgClass: 'bg-1',
        bgImage: null,
        shortTitle: 'CipherCraft+',
        category: 'SECURITY • CRYPTOGRAPHY • SOFTWARE',
        tagline: 'Cipher and encryption toolkit',
        description:
          'A cipher-focused project exploring classic and modern encryption methods in a browser-based interface.',
        problem:
          'Different types of ciphers and encryption methods are easier to understand when they are demonstrated in a clear, interactive workflow.',
        solution:
          'CipherCraft+ presents multiple cipher techniques and hashing concepts in a practical front-end project for exploration and comparison.',
        techStack: ['HTML', 'CSS', 'JavaScript', 'Atbash Cipher', 'ROT13', 'Affine Cipher', "Bacon's Cipher", 'AES', 'RSA', 'Hashing'],
        features: [
          'Atbash Cipher',
          'ROT13',
          'Affine Cipher',
          "Bacon's Cipher",
          'AES',
          'RSA',
          'Hashing'
        ],
        architectureFlow: [
          { step: '01', title: 'Input Handling', tech: 'UI Layer', desc: 'Collect the plaintext or message to transform.' },
          { step: '02', title: 'Cipher Selection', tech: 'JavaScript Logic', desc: 'Choose the specific cipher or encryption method to apply.' },
          { step: '03', title: 'Transformation', tech: 'Encryption Logic', desc: 'Process the message according to the selected cipher rules.' },
          { step: '04', title: 'Output View', tech: 'Browser Interface', desc: 'Display the transformed result in the UI.' },
        ],
        architectureDetails: [
          { title: 'Cipher Exploration', desc: 'Includes a range of cipher techniques and hashing concepts for practical experimentation.' },
          { title: 'Front-End Focus', desc: 'Built with HTML, CSS, and JavaScript to provide a direct browser-based experience.' },
          { title: 'Learning-Focused Design', desc: 'Keeps the project readable and approachable while covering multiple encryption approaches.' },
        ],
        metrics: [
          { label: 'Type', value: 'Security' },
          { label: 'Domain', value: 'Cryptography' },
          { label: 'Focus', value: 'Cipher Tools' },
          { label: 'Stack', value: 'HTML / CSS / JS' },
        ],
        title: 'CipherCraft+',
        images: [],
        githubUrl: null,
        liveDemoUrl: null,
        exploreUrl: null
      },
      {
        bgClass: 'bg-2',
        bgImage: null,
        shortTitle: 'Bank Default Risk Predictor',
        category: 'ML • FINANCE • RISK ANALYSIS',
        tagline: 'Machine learning project for exploring default risk prediction',
        description:
          'A machine learning project for exploring bank default risk prediction using structured financial data and a data-driven workflow.',
        problem:
          'Assessing default risk from financial data requires thoughtful analysis of patterns and indicators before drawing conclusions.',
        solution:
          'The project explores a risk-driven modeling workflow for evaluating default-risk signals in a data-focused machine learning context.',
        techStack: ['Python', 'Machine Learning', 'Risk Modeling', 'Data Analysis'],
        features: [
          'Risk-pattern exploration',
          'Structured financial data workflow',
          'Machine learning-based analysis',
          'Default-risk prediction project structure'
        ],
        architectureFlow: [
          { step: '01', title: 'Data Review', tech: 'Financial Dataset', desc: 'Inspect relevant structured inputs used for risk analysis.' },
          { step: '02', title: 'Feature Evaluation', tech: 'Data Processing', desc: 'Assess the signals most relevant to financial default risk.' },
          { step: '03', title: 'Modeling Step', tech: 'Machine Learning', desc: 'Explore a predictive workflow for risk-oriented classification.' },
          { step: '04', title: 'Risk Output', tech: 'Decision Support', desc: 'Summarize the project outcome in a clear, analysis-focused way.' },
        ],
        architectureDetails: [
          { title: 'Risk-Focused Modeling', desc: 'Uses structured financial information to explore how default-related indicators can be analyzed in a ML workflow.' },
          { title: 'Applied Data Science', desc: 'Frames the project as a practical example of machine learning in a finance context.' },
          { title: 'Conservative Scope', desc: 'Keeps the work grounded in the established project goal without claiming production use or verified performance metrics.' },
        ],
        metrics: [
          { label: 'Type', value: 'ML' },
          { label: 'Domain', value: 'Finance' },
          { label: 'Focus', value: 'Risk' },
          { label: 'Stack', value: 'Python' },
        ],
        title: 'Bank Default Risk Predictor',
        images: [],
        githubUrl: null,
        liveDemoUrl: null,
        exploreUrl: null
      }
    ],
    []
  );

  const activeProject = activeProjectIndex === null ? null : projects[activeProjectIndex];

  return (
    <section id="work" className="container work-page-section">
      <div className="gsap-reveal work-header">
        <MaskedTitle number="2." text="Featured Work" />
        <div className="divider" />
      </div>

      <div className="work-grid">
        {projects.map((proj, index) => (
          <div
            key={proj.title}
            className="project-card hoverable gsap-work-card"
            role="button"
            tabIndex={0}
            onClick={() => setActiveProjectIndex(index)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') setActiveProjectIndex(index);
            }}
            aria-label={`Open project: ${proj.title}`}
          >
            <div
              className="project-bg"
              style={{
                background: proj.bgImage
                  ? `url(${proj.bgImage}) center top / cover no-repeat`
                  : 'linear-gradient(135deg, rgba(15,23,42,0.96), rgba(37,99,235,0.2), rgba(15,23,42,0.9))',
              }}
            />
            <div className="project-overlay" />
            <div className="project-info">
              <p className="font-mono project-category text-gray uppercase">{proj.category}</p>
              <h3 className="project-title text-glow uppercase">{proj.title}</h3>
            </div>
          </div>
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
