
import { useMemo, useState } from 'react';
import ProjectModal from './ProjectModal';
import MaskedTitle from './MaskedTitle';

import defensysImg from '../assets/defensys_preview.jpg';
import nutroheistImg from '../assets/nutroheist_preview.jpg';
import vidyapulseImg from '../assets/vidyapulse_preview.jpg';

export default function Work() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(null);

  const projects = useMemo(
    () => [
      {
        bgClass: 'bg-3',
        bgImage: defensysImg,
        shortTitle: 'Defensys',
        category: 'PYTHON • AI SECURITY • FULL STACK',
        tagline: 'AI-Powered Cybersecurity Defense System',
        description:
          'Defensys is an intelligent cybersecurity platform built with Python that leverages AI to detect and respond to security threats in real-time. The system analyzes network behavior, identifies anomalies, and provides actionable defense insights — combining full-stack architecture with smart threat intelligence.',
        problem:
          'Modern organizations struggle with identifying and responding to evolving cybersecurity threats in real-time. Manual monitoring is error-prone, slow, and unable to scale against sophisticated attack vectors.',
        solution:
          'Built Defensys as an AI-driven defense platform using Python to automate threat detection, behavioral analysis, and response workflows. The system provides an intelligent security layer that reduces response time and human effort significantly.',
        techStack: [
          'Python',
          'AI/ML',
          'Cybersecurity',
          'REST APIs',
          'Data Analysis',
          'Backend Architecture'
        ],
        features: [
          'Real-time threat detection',
          'AI-powered anomaly analysis',
          'Automated defense workflows',
          'Security insights dashboard'
        ],
        architectureFlow: [
          { step: '01', title: 'Data Ingestion', tech: 'Python • System APIs', desc: 'Continuous network and system event data collection' },
          { step: '02', title: 'AI Analysis Engine', tech: 'ML Models • Python', desc: 'Behavioral anomaly detection and threat classification' },
          { step: '03', title: 'Defense Orchestrator', tech: 'Python Backend', desc: 'Automated response protocols and alert generation' },
          { step: '04', title: 'Insights Dashboard', tech: 'Full Stack UI', desc: 'Real-time security metrics and visualization' },
        ],
        architectureDetails: [
          { title: 'AI-Driven Threat Detection', desc: 'Machine learning models analyze patterns in system and network data to detect security anomalies that rule-based systems miss.' },
          { title: 'Automated Defense Response', desc: 'Once a threat is detected, the system automatically triggers pre-configured defense workflows to minimize damage.' },
          { title: 'Comprehensive Security Coverage', desc: 'Monitors multiple attack vectors simultaneously, providing holistic protection across the entire system surface.' },
        ],
        metrics: [
          { label: 'Language', value: 'Python' },
          { label: 'Type', value: 'AI Security' },
          { label: 'Detection', value: 'Real-Time' },
          { label: 'Architecture', value: 'Full Stack' },
        ],
        title: 'Defensys',
        images: [defensysImg],
        githubUrl: 'https://github.com/Ayushch-2800/Defensys',
        liveDemoUrl: 'https://github.com/Ayushch-2800/Defensys',
        exploreUrl: 'https://github.com/Ayushch-2800/Defensys'
      },
      {
        bgClass: 'bg-1',
        bgImage: nutroheistImg,
        shortTitle: 'NutroHeist',
        category: 'WEB APP • AI SCANNER • HEALTH TECH',
        tagline: 'AI-Powered Food Ingredient Safety Scanner',
        description:
          'NutroHeist is a smart landing page and web application that scans the ingredients of packaged food products and instantly tells you whether it\'s safe to eat. Upload or enter ingredient labels and get an AI-driven safety analysis with health insights and recommendations.',
        problem:
          'Most people cannot decode the complex chemical names and additives listed on packaged food labels. Harmful ingredients go unnoticed, impacting long-term health without consumers being aware.',
        solution:
          'Built NutroHeist as an intuitive web application where users can scan or input food ingredient lists and instantly receive safety scores, flagged ingredients, and health impact summaries powered by AI.',
        techStack: ['HTML5', 'CSS3', 'JavaScript', 'AI Integration', 'Ingredient Analysis'],
        features: [
          'Ingredient scanning & analysis',
          'Safety score generation',
          'Harmful ingredient detection',
          'Clean, responsive landing page'
        ],
        architectureFlow: [
          { step: '01', title: 'Input Interface', tech: 'HTML • CSS • JS', desc: 'Clean landing page with ingredient input or scan form' },
          { step: '02', title: 'Analysis Engine', tech: 'AI Integration', desc: 'Parses and cross-references ingredients against safety databases' },
          { step: '03', title: 'Safety Scoring', tech: 'Logic Layer', desc: 'Computes health safety score and flags harmful compounds' },
          { step: '04', title: 'Results Display', tech: 'Responsive UI', desc: 'Visual safety report with explanations and recommendations' },
        ],
        architectureDetails: [
          { title: 'Smart Ingredient Parsing', desc: 'Intelligently breaks down complex ingredient lists, identifying chemical names and additives that pose health risks.' },
          { title: 'Safety Database Cross-Reference', desc: 'Maps each ingredient against a comprehensive database of flagged, banned, or harmful food additives.' },
          { title: 'User-Friendly Results', desc: 'Presents complex safety information in a simple, color-coded format that anyone can instantly understand.' },
        ],
        metrics: [
          { label: 'Language', value: 'CSS / HTML / JS' },
          { label: 'Type', value: 'Health Tech' },
          { label: 'Analysis', value: 'AI-Powered' },
          { label: 'Interface', value: 'Responsive' },
        ],
        title: 'NutroHeist',
        images: [nutroheistImg],
        githubUrl: 'https://github.com/Ayushch-2800/NutroHeist',
        liveDemoUrl: 'https://github.com/Ayushch-2800/NutroHeist',
        exploreUrl: 'https://github.com/Ayushch-2800/NutroHeist'
      },
      {
        bgClass: 'bg-2',
        bgImage: vidyapulseImg,
        shortTitle: 'VidyaPulse AI',
        category: 'AI EDUCATION • FULL STACK • GENERATIVE AI',
        tagline: 'AI-Powered Intelligent Education Platform',
        description:
          'VidyaPulse AI is an intelligent education platform designed to transform the way students learn. Powered by generative AI, it creates personalized learning experiences, generates quizzes, explains complex topics, and tracks student progress — making quality education accessible and adaptive.',
        problem:
          'Traditional education systems follow a one-size-fits-all approach, leaving students behind when they need personalized support. There is no scalable way to provide individualized tutoring to every student.',
        solution:
          'Built VidyaPulse AI as a generative AI-powered education platform that adapts to each student\'s learning pace, generates dynamic content, and provides instant, intelligent explanations across all subjects.',
        techStack: ['React', 'Node.js', 'Generative AI', 'Full Stack', 'Education Tech'],
        features: [
          'AI-generated personalized content',
          'Interactive quiz generation',
          'Smart concept explanations',
          'Student progress tracking'
        ],
        architectureFlow: [
          { step: '01', title: 'Student Portal', tech: 'React Frontend', desc: 'Intuitive learning interface with personalized dashboards' },
          { step: '02', title: 'AI Content Engine', tech: 'Generative AI', desc: 'Dynamic quiz, explanation, and content generation' },
          { step: '03', title: 'Learning API', tech: 'Node.js Backend', desc: 'Content serving, progress tracking, and analytics' },
          { step: '04', title: 'Progress Analytics', tech: 'Data Layer', desc: 'Student performance insights and adaptive recommendations' },
        ],
        architectureDetails: [
          { title: 'Personalized AI Learning', desc: 'Generative AI adapts content difficulty and style based on each student\'s performance history and learning patterns.' },
          { title: 'Dynamic Content Generation', desc: 'Instantly creates fresh quizzes, examples, and explanations rather than relying on static content libraries.' },
          { title: 'Progress-Driven Adaptation', desc: 'Continuously tracks student progress and adjusts learning pathways to target gaps and reinforce strengths.' },
        ],
        metrics: [
          { label: 'Type', value: 'Ed-Tech AI' },
          { label: 'AI Engine', value: 'Generative AI' },
          { label: 'Stack', value: 'Full Stack' },
          { label: 'Focus', value: 'Personalization' },
        ],
        title: 'VidyaPulse AI',
        images: [vidyapulseImg],
        githubUrl: 'https://github.com/Ayushch-2800/VidyaPulse-AI',
        liveDemoUrl: 'https://github.com/Ayushch-2800/VidyaPulse-AI',
        exploreUrl: 'https://github.com/Ayushch-2800/VidyaPulse-AI'
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
            {/* Real project image as background */}
            <div
              className="project-bg"
              style={{
                backgroundImage: `url(${proj.bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center top',
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
