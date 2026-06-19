import React, { useState, useEffect, useRef } from 'react';
import { portfolioData } from '../data/portfolioData';
import Reveal from './Reveal';

const skillRow1 = [
  "Java", "C++", "C", "Python", "JavaScript", "Verilog HDL", 
  "HTML", "CSS", "React.js", "Node.js", "Express.js", "REST APIs",
  "OOP", "DBMS", "Operating Systems", "Computer Networks"
];

const skillRow2 = [
  "LLMs", "AI Agents", "Prompt Engineering", "RAG Fundamentals",
  "MySQL", "MongoDB", "Git", "GitHub", "Docker", "VS Code", 
  "Postman", "Power BI", "PostgreSQL", "Redis", "Oracle Cloud (OCI)"
];

const skillRow3 = [
  "UI/UX Design", "Wireframing", "Prototyping", "Design Systems", 
  "User Research", "Responsive Design", "Accessibility (WCAG)", 
  "Information Architecture", "Figma", "Adobe Photoshop", 
  "Adobe Premiere Pro", "Canva", "Adobe Illustrator",
  "Vercel", "Netlify", "Supabase", "Cisco Packet Tracer"
];



// ASCII Art Portrait — renders txt as green monospace text on transparent background
const AsciiPortrait = () => {
  const [art, setArt] = useState('');
  const preRef = useRef(null);

  useEffect(() => {
    fetch('/ascii-art.txt')
      .then(r => r.text())
      .then(text => setArt(text))
      .catch(() => setArt('// portrait unavailable'));
  }, []);

  // Scale the <pre> to fit the container width on mount/resize
  useEffect(() => {
    if (!preRef.current || !art) return;
    const scale = () => {
      const container = preRef.current.parentElement;
      if (!container) return;
      const cw = container.clientWidth;
      const pw = preRef.current.scrollWidth;
      if (pw > 0) {
        preRef.current.style.transform = `scale(${cw / pw})`;
        preRef.current.style.transformOrigin = 'top left';
        container.style.height = `${preRef.current.scrollHeight * (cw / pw)}px`;
      }
    };
    scale();
    window.addEventListener('resize', scale);
    return () => window.removeEventListener('resize', scale);
  }, [art]);

  return (
    <div className="relative w-full overflow-hidden bg-transparent">
      <pre
        ref={preRef}
        aria-label="ASCII art portrait of Yash Raj Agarwal"
        style={{
          fontFamily: '"Courier New", Courier, monospace',
          fontSize: '4.2px',
          lineHeight: '1.15',
          color: '#39ff14',
          background: 'transparent',
          whiteSpace: 'pre',
          display: 'block',
          userSelect: 'none',
          letterSpacing: '0',
          padding: 0,
          margin: 0,
        }}
      >
        {art}
      </pre>
    </div>
  );
};

// Lightweight pill — no backdrop-filter, no motion wrapper, no GPU compositing layer
const SkillPill = ({ skill }) => (
  <span className="shrink-0 inline-flex items-center px-4 py-2 rounded-full text-sm font-medium text-white/80 border border-white/10 bg-white/[0.04] hover:border-[#39ff14]/40 hover:text-[#39ff14] transition-colors duration-200 select-none cursor-default whitespace-nowrap">
    {skill}
  </span>
);

const About = () => {
  const { description } = portfolioData.about;

  return (
  <section id="about" className="py-32 relative z-10 overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl mb-24">
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="text-left">
                <div className="section-label mb-6 inline-block border border-white/10 rounded-full px-3 py-1 bg-white/[0.02]">
                  About Me
                </div>
                <h2 className="section-title mb-8">
                  I build things <br/><span className="text-white/50">people screenshot.</span>
                </h2>
                <p className="body-text text-lg md:text-xl">
                  {description}
                </p>
              </div>
            <div className="relative w-full max-w-sm mx-auto md:ml-auto rounded-[32px] overflow-hidden glass-panel p-2 group">
              <div className="relative w-full rounded-[24px] overflow-hidden bg-transparent border border-[#39ff14]/15 hover:border-[#39ff14]/40 transition-colors duration-500">

                {/* ASCII Art Text */}
                <AsciiPortrait />

                {/* Scanline overlay for CRT depth */}
                <div
                  className="absolute inset-0 pointer-events-none z-10 rounded-[24px]"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.12) 3px, rgba(0,0,0,0.12) 4px)',
                  }}
                />

                {/* Green radial glow on hover */}
                <div
                  className="absolute inset-0 rounded-[24px] pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'radial-gradient(ellipse at center, rgba(57,255,20,0.07) 0%, transparent 70%)' }}
                />

                {/* HUD corner brackets */}
                <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-[#39ff14]/50 pointer-events-none z-30" />
                <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-[#39ff14]/50 pointer-events-none z-30" />
                <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-[#39ff14]/50 pointer-events-none z-30" />
                <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-[#39ff14]/50 pointer-events-none z-30" />

                {/* Label tag */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 font-spacemono text-[9px] tracking-[0.25em] uppercase text-[#39ff14]/50 pointer-events-none">
                  YRA_2026.ASCII
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Marquee Skills Section */}
      <div className="w-full relative mt-16 fade-edges py-12">
        


        <div className="flex flex-col gap-6">
          {/* Row 1 - Moves Left */}
          <div className="flex items-center">
            <div className="marquee-container items-center animate-marquee gap-4 pr-4">
              {[...skillRow1, ...skillRow1, ...skillRow1].map((skill, index) => (
                <SkillPill key={`row1-${index}`} skill={skill} />
              ))}
            </div>
          </div>

          {/* Row 2 - Moves Right */}
          <div className="flex items-center">
            <div className="marquee-container items-center animate-marquee-reverse gap-4 pr-4">
              {[...skillRow2, ...skillRow2, ...skillRow2].map((skill, index) => (
                <SkillPill key={`row2-${index}`} skill={skill} />
              ))}
            </div>
          </div>

          {/* Row 3 - Moves Left */}
          <div className="flex items-center">
            <div className="marquee-container items-center animate-marquee gap-4 pr-4">
              {[...skillRow3, ...skillRow3, ...skillRow3].map((skill, index) => (
                <SkillPill key={`row3-${index}`} skill={skill} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
