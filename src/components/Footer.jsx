import useTextScramble from '../hooks/useTextScramble';

function ScrambleLink({ href, children, className, ...props }) {
  const { displayText, onMouseEnter, onMouseLeave } = useTextScramble(children);
  return (
    <a 
      href={href} 
      className={className}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...props}
    >
      {displayText}
    </a>
  );
}

export default function Footer() {
  return (
    <footer>
      <div className="container footer-inner font-mono text-gray">
        <p>© 2026 UJJAWAL SINGHAL. All systems operational.</p>
        <div className="social-links uppercase">
          <ScrambleLink href="https://github.com/ujjawalsinghal" className="hoverable" target="_blank" rel="noopener noreferrer">GitHub</ScrambleLink>
        </div>
      </div>
    </footer>
  );
}
