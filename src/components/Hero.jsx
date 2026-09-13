import React, { useState, useEffect, useRef, Suspense, useMemo, useCallback } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { TextScramble } from './ui/TextScramble';
import GithubActivity from './GithubActivity';


export default function Hero() {
  const [loaded, setLoaded] = useState(true);
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
  



  // Role loop state (only triggers every ~3s, not on mousemove)
  const roles = ["Designer", "Developer", "Creator", "Editor", "Builder", "Innovator"];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [triggerScramble, setTriggerScramble] = useState(true);



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
  
  const inView = useInView(containerRef, { margin: "0px 0px 200px 0px" });

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



      {/* 3D Canvas (desktop only) OR Static image (mobile/tablet) */}
      <motion.div style={{ y: laptopY, opacity }} className="absolute inset-0 z-[250] pointer-events-none">
        {isMobileOrTablet ? null : null}
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
          {/* Subtle foreground text */}
          <div className="flex flex-col items-start">
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
          </div>
        </motion.div>

        {/* Bottom bar reveal */}
        <motion.div 
          style={{ opacity }}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="bottom-bar relative flex-col items-center gap-6 pb-8"
        >
          {/* GitHub Activity positioned absolutely on the right side above buttons */}
          <div className="absolute right-0 bottom-full mb-8 pointer-events-auto z-[350] scale-[0.85] md:scale-100 origin-bottom-right hidden md:block">
            <GithubActivity />
          </div>
          
          <div className="flex justify-between w-full items-end">
            <div className="meta-text select-none hidden md:block">
              <p>[ ARCHIVE 2026 ]</p>
              <p>SURFACE TENSION &amp; TOPOGRAPHICAL LIGHT</p>
            </div>
            
            <div className="flex gap-3 pointer-events-auto flex-wrap">
              <a href="#projects" onClick={scrollToProjects} className="cta-button" aria-label="See my work">SEE MY WORK</a>
              <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }} className="cta-button-secondary" aria-label="Contact me">CONTACT ME</a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <div className="scroll-hint"></div>
    </section>
  );
}
