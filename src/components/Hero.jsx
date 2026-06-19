import React, { useState, useEffect, useRef, Suspense, useMemo, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { EffectComposer, FXAA, Bloom } from '@react-three/postprocessing';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import * as THREE from 'three';
import ThreeMacbook from './ThreeMacbook';
import { TextScramble } from './ui/TextScramble';

// 3D WebGL Atmospheric Particles
function Particles({ count = 120 }) {
  const points = useRef();
  
  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5 - 2; // depth
      spd[i] = 0.05 + Math.random() * 0.05;
    }
    return [pos, spd];
  }, [count]);

  useFrame((state, delta) => {
    if (!points.current) return;
    const geo = points.current.geometry;
    const posAttr = geo.attributes.position;
    for (let i = 0; i < count; i++) {
      posAttr.array[i * 3 + 1] += speeds[i] * delta * 0.8; // slow rise
      if (posAttr.array[i * 3 + 1] > 3) {
        posAttr.array[i * 3 + 1] = -3; // reset to bottom
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#39ff14"
        transparent
        opacity={0.25}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// Magnetic Button Wrapper
function Magnetic({ children }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    setPosition({ x: distanceX * 0.35, y: distanceY * 0.35 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="inline-block pointer-events-auto"
    >
      {children}
    </motion.div>
  );
}

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const containerRef = useRef(null);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobileOrTablet(window.innerWidth < 1024);
    };
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);
  
  // Stable onload handler callback to prevent re-instantiation loop inside ThreeMacbook.jsx
  const handleLoadComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  // Performance-optimized Motion Values for mouse positions (no React state updates on mousemove!)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for micro-parallax
  const springMouseX = useSpring(mouseX, { stiffness: 300, damping: 25 });
  const springMouseY = useSpring(mouseY, { stiffness: 300, damping: 25 });

  // Map mouse values for text drift in opposite direction
  const textDriftX = useTransform(springMouseX, (x) => x * -0.2);
  const textDriftY = useTransform(springMouseY, (y) => y * -0.2);

  // Role loop state (only triggers every ~3s, not on mousemove)
  const roles = ["Designer", "Developer", "Creator", "Editor", "Builder", "Innovator"];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [triggerScramble, setTriggerScramble] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTriggerScramble(false);
      setTimeout(() => {
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        setTriggerScramble(true);
      }, 50);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax calculations
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const laptopY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const scrollToProjects = (e) => {
    e.preventDefault();
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[#000000] text-[#e2e2e2] font-syncopate">
      {/* Hidden SVG grain filter */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>

      {/* Ambient layers */}
      <div className="hero-grain-overlay"></div>
      <div className="vignette"></div>
      <div className="scanlines"></div>

      {/* Laptop glow backing */}
      <motion.div 
        className="absolute top-1/2 left-[calc(50%+1.2rem)] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none z-[100] opacity-10 blur-[100px]"
        style={{
          x: springMouseX,
          y: springMouseY,
          background: 'radial-gradient(circle, rgba(57,255,20,0.15) 0%, transparent 70%)',
        }}
      />

      {/* 3D Canvas (desktop only) OR Static image (mobile/tablet) */}
      <motion.div style={{ y: laptopY, opacity }} className="absolute inset-0 z-[250] pointer-events-none">
        {isMobileOrTablet ? (
          /* Static laptop render — no WebGL, no battery drain on mobile */
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: loaded ? 1 : 0, scale: loaded ? 1 : 0.92 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex items-center justify-center"
            onAnimationStart={() => setLoaded(true)}
          >
            <img
              src="/laptop-static.png"
              alt="ASUS ROG laptop — 3D render"
              className="w-[85vw] max-w-[420px] object-contain drop-shadow-[0_0_80px_rgba(57,255,20,0.12)]"
              style={{ transform: 'translate(5%, -8%)' }}
              onLoad={() => setLoaded(true)}
              onError={() => setLoaded(true)}
            />
          </motion.div>
        ) : (
          /* Full 3D interactive canvas on desktop */
          <Canvas
            shadows
            dpr={[1, 2]}
            camera={{ position: [0, 1.2, 4.8], fov: 38 }}
            gl={{ antialias: false, alpha: true, toneMappingExposure: 1.1 }}
          >
            <ambientLight intensity={0.4} />
            <directionalLight position={[3, 6, 4]} intensity={3.5} castShadow />
            <directionalLight position={[-5, 2, 2]} intensity={0.7} color="#8899cc" />
            <directionalLight position={[0, -2, -5]} intensity={0.45} color="#ff5522" />
            <Suspense fallback={null}>
              <Environment preset="city" />
              <ThreeMacbook onLoadComplete={handleLoadComplete} />
              <Particles count={140} />
              <EffectComposer disableNormalPass multisampling={0}>
                <FXAA />
                <Bloom luminanceThreshold={1.2} luminanceSmoothing={0.9} intensity={1.5} />
              </EffectComposer>
            </Suspense>
          </Canvas>
        )}
      </motion.div>

      {/* UI overlay */}
      <div className="interface-grid z-[300]">
        <motion.div 
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="nav-left flex flex-col md:flex-row gap-4 items-start select-none"
        >
          <span>PORTFOLIO</span>
        </motion.div>
        
        <div className="nav-right">
        </div>

        {/* Title and Scrambler with mouse-drift and scroll-parallax */}
        <motion.div 
          style={{ y: titleY, opacity }}
          initial={{ scale: 0.98, opacity: 0, filter: 'blur(10px)' }}
          animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="col-span-2 row-start-2 self-center flex flex-col items-start select-none"
        >
          {/* Subtle foreground text interactive mouse drift */}
          <motion.div
            style={{
              x: textDriftX,
              y: textDriftY,
            }}
            className="flex flex-col items-start"
          >
            <h1 className="hero-title font-syncopate" style={{ fontSize: 'clamp(1.9rem, 8.5vw, 6.5rem)', gridColumn: 'auto', alignSelf: 'auto' }}>
              YASH RAJ<br/>AGARWAL
            </h1>
            
            <div className="flex items-center gap-2 mt-4 font-spacemono text-[#39ff14] text-[clamp(0.72rem,1.4vw,1.1rem)] uppercase tracking-[0.2em] border-l border-[#39ff14]/45 pl-4">
              <span className="text-white/40">I BUILD AS A</span>
              <motion.div
                key={currentRoleIndex}
                initial={{ opacity: 0.5, filter: 'blur(2px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.4 }}
              >
                <TextScramble trigger={triggerScramble} duration={0.8} speed={0.03} className="text-[#39ff14] font-bold">
                  {roles[currentRoleIndex]}
                </TextScramble>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom bar reveal */}
        <motion.div 
          style={{ opacity }}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="bottom-bar flex-col md:flex-row gap-4 md:gap-0"
        >
          <div className="meta-text select-none hidden md:block">
            <p>[ ARCHIVE 2026 ]</p>
            <p>SURFACE TENSION &amp; TOPOGRAPHICAL LIGHT</p>
          </div>
          
          <div className="flex gap-3 pointer-events-auto flex-wrap">
            <Magnetic>
              <a href="#projects" onClick={scrollToProjects} className="cta-button">SEE MY WORK</a>
            </Magnetic>
            <Magnetic>
              <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }} className="cta-button-secondary">CONTACT ME</a>
            </Magnetic>
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <div className="scroll-hint"></div>
    </section>
  );
}
