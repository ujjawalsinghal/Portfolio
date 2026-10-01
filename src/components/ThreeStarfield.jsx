import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import useReducedMotion from '../hooks/useReducedMotion';

const STAR_VERT = `
  uniform float uTime;
  uniform float uSpeed;
  attribute float aSize;
  attribute vec3 aColor;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
      vColor = aColor;
      
      // Move z towards camera
      float z = position.z + uTime * uSpeed;
      // Wrap around (depth is 2000, from -1000 to 1000)
      z = mod(z + 1000.0, 2000.0) - 1000.0;
      
      vec3 newPos = vec3(position.x, position.y, z);
      vec4 mvPosition = modelViewMatrix * vec4(newPos, 1.0);
      
      // Size attenuation based on depth
      gl_PointSize = aSize * (800.0 / -mvPosition.z);
      
      // Twinkle effect
      vAlpha = 0.3 + 0.7 * sin(uTime * 1.5 + position.x * 100.0 + position.y * 50.0);
      
      gl_Position = projectionMatrix * mvPosition;
  }
`;

const STAR_FRAG = `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
      // Circular particle
      float dist = length(gl_PointCoord - vec2(0.5));
      if (dist > 0.5) discard;
      
      // Soft edge
      float alpha = (0.5 - dist) * 2.0 * vAlpha;
      
      gl_FragColor = vec4(vColor, alpha);
  }
`;

export default function ThreeStarfield({ isHeroPage = false }) {
  const canvasRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const isHeroPageRef = useRef(isHeroPage);
  const reducedMotionRef = useRef(prefersReducedMotion);
  const renderModeRef = useRef(null);

  useEffect(() => {
    isHeroPageRef.current = isHeroPage;
    renderModeRef.current?.();
  }, [isHeroPage]);

  useEffect(() => {
    reducedMotionRef.current = prefersReducedMotion;
    renderModeRef.current?.();
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true
      });
    } catch (error) {
      console.error('WebGL Initialization Error:', error);
      canvas.dataset.webglFallback = 'true';
      return;
    }

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.0005); // Fade stars in the distance

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.z = 1000; // Looking down the -Z axis

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // 1. Create 3D Static/Twinkling Stars (GPU Accelerated)
    const starCount = 5000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    const sizes = new Float32Array(starCount);

    const colorPalette = [
      new THREE.Color(0xffffff), // White
      new THREE.Color(0xccccff), // Faint Blue
      new THREE.Color(0xeebbff), // Faint Purple
      new THREE.Color(0xffffff), // White (weighted more)
    ];

    for (let i = 0; i < starCount; i++) {
      // Spread stars across a volume: X(-2000, 2000), Y(-1000, 1000), Z(-1000, 1000)
      positions[i * 3] = (Math.random() - 0.5) * 4000;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2000;

      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = Math.random() * 2.5 + 0.5;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));

    const uniforms = {
      uTime: { value: 0 },
      uSpeed: { value: 100.0 } // Forward movement speed
    };

    const starMaterial = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: STAR_VERT,
      fragmentShader: STAR_FRAG,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const starSystem = new THREE.Points(geometry, starMaterial);
    scene.add(starSystem);

    // 2. Animation Loop
    const initTime = performance.now();
    let animationFrameId = null;
    let refreshRenderMode = () => {};

    const canRender = () => !isHeroPageRef.current && !document.hidden;

    const drawFrame = () => {
      if (!canRender()) return;
      const reducedMotion = reducedMotionRef.current;
      const elapsedTime = reducedMotion ? 0 : (performance.now() - initTime) * 0.001;

      // Update GPU stars time
      uniforms.uTime.value = elapsedTime;

      // Gentle camera sway for life
      camera.position.x = reducedMotion ? 0 : Math.sin(elapsedTime * 0.2) * 50;
      camera.position.y = reducedMotion ? 0 : Math.cos(elapsedTime * 0.15) * 30;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    const tick = () => {
      animationFrameId = null;
      if (!canRender()) return;
      drawFrame();
      if (!reducedMotionRef.current) animationFrameId = requestAnimationFrame(tick);
    };

    refreshRenderMode = () => {
      if (!canRender()) {
        if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
        return;
      }

      if (reducedMotionRef.current) {
        if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
        drawFrame();
      } else if (animationFrameId === null) {
        animationFrameId = requestAnimationFrame(tick);
      }
    };
    renderModeRef.current = refreshRenderMode;

    // 3. Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      refreshRenderMode();
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', refreshRenderMode);

    // WebGL Context Loss Handlers
    const handleContextLost = (e) => {
      e.preventDefault();
      canvas.dataset.webglFallback = 'true';
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    };
    const handleContextRestored = () => {
      delete canvas.dataset.webglFallback;
      handleResize();
      refreshRenderMode();
    };

    canvas.addEventListener('webglcontextlost', handleContextLost, false);
    canvas.addEventListener('webglcontextrestored', handleContextRestored, false);
    refreshRenderMode();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', refreshRenderMode);
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      canvas.removeEventListener('webglcontextrestored', handleContextRestored);
      renderModeRef.current = null;
      refreshRenderMode = () => {};
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
      geometry.dispose();
      starMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas 
      id="three-starfield-canvas"
      ref={canvasRef}
      className={isHeroPage ? 'starfield-hidden' : 'starfield-visible'}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -2,
        pointerEvents: 'none',
        opacity: isHeroPage ? 0 : 1,
        visibility: isHeroPage ? 'hidden' : 'visible',
      }}
    />
  );
}
