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

// ASCII Art Portrait
const AsciiPortrait = () => {
  const [art, setArt] = useState('');
  const preRef = useRef(null);

  useEffect(() => {
    fetch('/ascii-art.txt')
      .then(r => r.text())
      .then(text => setArt(text))
      .catch(() => setArt('// portrait unavailable'));
  }, []);

  useEffect(() => {
    if (!preRef.current || !art) return;
    const scale = () => {
      const container = preRef.current?.parentElement;
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

// Lightweight pill — plain CSS, no compositing layers
const SkillPill = ({ skill }) => (
  <span className="shrink-0 inline-flex items-center px-4 py-2 rounded-full text-sm font-medium text-white/80 border border-white/10 bg-white/[0.04] hover:border-[#39ff14]/40 hover:text-[#39ff14] transition-colors duration-200 select-none cursor-default whitespace-nowrap">
    {skill}
  </span>
);

const About = () => {
  const { description } = portfolioData.about;

  return (
    <section id="about" className="py-24 relative z-10 overflow-x-hidden">

      {/* ── Bio + ASCII portrait ─────────────────────────────── */}
      <div className="container mx-auto px-6 max-w-6xl">
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">

            {/* Left – text */}
            <div className="flex flex-col gap-6 min-w-0">
              <div className="section-label inline-block border border-white/10 rounded-full px-3 py-1 bg-white/[0.02] self-start">
                About Me
              </div>

              {/* Heading uses a contained size — NOT section-title which is too large */}
              <h2 className="text-[clamp(2rem,4vw,3.4rem)] font-syncopate font-bold tracking-tight leading-[1.05] text-white uppercase">
                I build things<br />
                <span className="text-white/45">people screenshot.</span>
              </h2>

              <p className="body-text text-[15px] md:text-[16px] leading-relaxed">
                {description}
              </p>
            </div>

            {/* Right – ASCII portrait in a fixed-aspect container */}
            <div className="relative w-full max-w-[340px] mx-auto md:mx-0 md:ml-auto rounded-[32px] overflow-hidden glass-panel p-2 group self-start">
              <div className="relative w-full rounded-[24px] overflow-hidden bg-transparent border border-[#39ff14]/15 hover:border-[#39ff14]/40 transition-colors duration-500">
                <AsciiPortrait />

                {/* Scanline CRT overlay */}
                <div
                  className="absolute inset-0 pointer-events-none z-10 rounded-[24px]"
                  style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.12) 3px, rgba(0,0,0,0.12) 4px)' }}
                />

                {/* Green glow on hover */}
                <div
                  className="absolute inset-0 rounded-[24px] pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'radial-gradient(ellipse at center, rgba(57,255,20,0.07) 0%, transparent 70%)' }}
                />

                {/* HUD corner brackets */}
                <div className="absolute top-3 left-3  w-5 h-5 border-t border-l border-[#39ff14]/50 pointer-events-none z-30" />
                <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-[#39ff14]/50 pointer-events-none z-30" />
                <div className="absolute bottom-3 left-3  w-5 h-5 border-b border-l border-[#39ff14]/50 pointer-events-none z-30" />
                <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-[#39ff14]/50 pointer-events-none z-30" />

                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 font-spacemono text-[9px] tracking-[0.25em] uppercase text-[#39ff14]/50 pointer-events-none">
                  YRA_2026.ASCII
                </div>
              </div>
            </div>

          </div>
        </Reveal>
      </div>

      {/* ── Marquee skill rows ────────────────────────────────── */}
      <div className="w-full relative mt-20 py-10 overflow-hidden">
        {/* Fade edges via gradient mask */}
        <div className="absolute inset-y-0 left-0  w-24 md:w-48 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #050505, transparent)' }} />
        <div className="absolute inset-y-0 right-0 w-24 md:w-48 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #050505, transparent)' }} />

        <div className="flex flex-col gap-5">
          <div className="flex items-center overflow-hidden">
            <div className="marquee-container items-center animate-marquee gap-4 pr-4">
              {[...skillRow1, ...skillRow1, ...skillRow1].map((skill, i) => (
                <SkillPill key={`r1-${i}`} skill={skill} />
              ))}
            </div>
          </div>

          <div className="flex items-center overflow-hidden">
            <div className="marquee-container items-center animate-marquee-reverse gap-4 pr-4">
              {[...skillRow2, ...skillRow2, ...skillRow2].map((skill, i) => (
                <SkillPill key={`r2-${i}`} skill={skill} />
              ))}
            </div>
          </div>

          <div className="flex items-center overflow-hidden">
            <div className="marquee-container items-center animate-marquee gap-4 pr-4">
              {[...skillRow3, ...skillRow3, ...skillRow3].map((skill, i) => (
                <SkillPill key={`r3-${i}`} skill={skill} />
              ))}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default About;
