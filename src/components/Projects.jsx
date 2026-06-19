import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import Reveal from './Reveal';
import { Globe, ArrowUpRight, Rocket, Layers, HeartPulse, Wifi } from 'lucide-react';

const GithubIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.24c3-.34 6-1.53 6-6.76a5.2 5.2 0 0 0-1.39-3.6 5 5 0 0 0-.13-3.55s-1.14-.36-3.7 1.38a13.2 13.2 0 0 0-7 0c-2.56-1.74-3.7-1.38-3.7-1.38a5 5 0 0 0-.13 3.55 5.2 5.2 0 0 0-1.39 3.6c0 5.22 3 6.42 6 6.76a4.8 4.8 0 0 0-1 3.24v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

// icon map per project
const ICON_MAP = {
  netsight: Rocket,
  vaani: Wifi,
  aero: HeartPulse,
  atlas: Layers,
};
const getIcon = (title = '') => {
  const t = title.toLowerCase();
  if (t.includes('net') || t.includes('sight')) return ICON_MAP.netsight;
  if (t.includes('vaani') || t.includes('pay'))  return ICON_MAP.vaani;
  if (t.includes('health'))                        return ICON_MAP.aero;
  return ICON_MAP.atlas;
};

/**
 * ProjectCard
 * - All cards share the same CARD_HEIGHT so rows align perfectly
 * - `wide` flag controls whether circle ornaments and description clamp differ
 */
const CARD_HEIGHT = 340; // px — uniform for all 4 cards

const ProjectCard = ({ project, wide = false }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 20 });
  const sy = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(sy, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(sx, [-0.5, 0.5], ['-10deg', '10deg']);

  const onMove = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top)  / r.height - 0.5);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  const LogoIcon = getIcon(project.title);

  // Circle ornament sizes — slightly larger for wide cards
  const circles = wide
    ? [{ s: '130px', z: '20px', d: '0s' }, { s: '105px', z: '40px', d: '0.1s' }, { s: '80px', z: '60px', d: '0.2s' }, { s: '56px', z: '80px', d: '0.3s' }]
    : [{ s: '110px', z: '20px', d: '0s' }, { s: '88px',  z: '40px', d: '0.1s' }, { s: '66px', z: '60px', d: '0.2s' }, { s: '46px', z: '80px', d: '0.3s' }];

  return (
    <div
      className="group w-full [perspective:1000px]"
      style={{ height: `${CARD_HEIGHT}px` }}
    >
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY, height: '100%' }}
        className="relative rounded-[32px] bg-gradient-to-br from-zinc-900 to-black shadow-2xl transition-shadow duration-500 [transform-style:preserve-3d] group-hover:[box-shadow:rgba(0,0,0,0.3)_30px_50px_25px_-40px,rgba(0,0,0,0.1)_0px_25px_30px_0px]"
      >
        {/* Inner glass sheen */}
        <div className="absolute inset-2 rounded-[26px] border-b border-l border-white/20 bg-gradient-to-b from-white/30 to-white/10 backdrop-blur-sm [transform-style:preserve-3d] [transform:translate3d(0,0,25px)]" />

        {/* Content — right padding reserves space for circle ornament */}
        <div
          className="absolute [transform:translate3d(0,0,26px)] p-7"
          style={{ right: wide ? '175px' : '140px', left: 0, top: 0 }}
        >
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3 items-center">
            {project.featured && (
              <span className="font-spacemono text-[9px] tracking-[0.2em] uppercase text-[#39ff14] border border-[#39ff14]/30 bg-[#39ff14]/5 px-2 py-1 rounded-full">
                Featured
              </span>
            )}
            {project.tags.map(tag => (
              <span key={tag} className="tag-badge">{tag}</span>
            ))}
          </div>

          {/* Title */}
          <p className={`font-bold text-white leading-tight tracking-tight mb-3 ${wide ? 'text-[1.5rem]' : 'text-[1.25rem]'}`}>
            {project.title}
          </p>

          {/* Description */}
          <p className={`text-white/55 text-[13px] leading-relaxed ${wide ? 'line-clamp-6' : 'line-clamp-4'}`}>
            {project.description}
          </p>
        </div>

        {/* Footer — social icons + View More */}
        <div className="absolute bottom-6 left-7 right-7 flex items-center justify-between [transform:translate3d(0,0,26px)] z-20">
          <div className="flex gap-3">
            {[
              { Icon: GithubIcon, href: project.link || '#', label: 'GitHub' },
              { Icon: Globe,      href: project.live || project.link || '#', label: 'Live' },
            ].map(({ Icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" title={label}
                className="grid h-[34px] w-[34px] place-content-center rounded-full bg-white shadow-[rgba(0,0,0,0.5)_0px_7px_5px_-5px] transition-all duration-300 hover:bg-[#39ff14] hover:[transform:translate3d(0,0,40px)] pointer-events-auto">
                <Icon className="h-[15px] w-[15px] stroke-black" />
              </a>
            ))}
          </div>

          <a href={project.link || '#'} target="_blank" rel="noreferrer"
            className="pointer-events-auto flex items-center gap-2 px-4 py-2 rounded-full border border-[#39ff14]/30 bg-[#39ff14]/5 text-[#39ff14] font-spacemono text-[11px] tracking-[0.12em] uppercase transition-all duration-300 hover:bg-[#39ff14]/15 hover:border-[#39ff14]/70 hover:shadow-[0_0_18px_rgba(57,255,20,0.2)]">
            View More
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
          </a>
        </div>

        {/* 3D Circle ornament + logo */}
        <div className={`absolute top-5 right-5 group-hover:-top-5 group-hover:-right-5 transition-all duration-700 flex items-center justify-center [transform-style:preserve-3d] pointer-events-none`}
          style={{ width: wide ? '130px' : '110px', height: wide ? '130px' : '110px' }}>
          {circles.map((c, i) => (
            <div key={i}
              className="absolute aspect-square rounded-full border border-white/5 bg-white/10 transition-all duration-500 [transform:translate3d(0,0,0px)] group-hover:[transform:translate3d(0,0,var(--hz))]"
              style={{ width: c.s, '--hz': c.z, transitionDelay: c.d }} />
          ))}
          <div className="absolute grid aspect-square w-[38px] place-content-center rounded-full bg-white shadow-[0_10px_20px_rgba(0,0,0,0.3)] transition-all duration-700 [transform:translate3d(0,0,10px)] group-hover:[transform:translate3d(0,0,120px)]">
            <LogoIcon className="w-[18px] h-[18px] stroke-black" />
          </div>
        </div>

      </motion.div>
    </div>
  );
};

/**
 * Layout:
 *   Row 1 ── full-width  (NetSight AI   — featured)
 *   Row 2 ── two halves  (VaaniPay  +  AeroHealth)
 *   Row 3 ── full-width  (Project Atlas)
 * All 4 cards share the same CARD_HEIGHT.
 */
const Projects = () => {
  const projects = portfolioData.projects; // [0] NetSight, [1] VaaniPay, [2] AeroHealth, [3] Atlas

  return (
    <section id="projects" className="py-32 relative z-10">
      <div className="container mx-auto px-6 max-w-6xl">

        {/* Section header */}
        <Reveal>
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <div className="section-label mb-5 inline-block border border-white/10 rounded-full px-3 py-1 bg-white/[0.02]">
                Selected Work
              </div>
              <h2 className="section-title">
                Featured <span className="text-white/50">Projects.</span>
              </h2>
            </div>
            <a
              href="https://github.com/yashraj-agarwal"
              target="_blank" rel="noreferrer"
              className="group self-start md:self-end flex items-center gap-2 px-6 py-3 font-syncopate text-[11px] font-bold tracking-[0.18em] uppercase text-[#080808] bg-[#e2e2e2] transition-all duration-300 hover:bg-[#39ff14] hover:-translate-y-1 active:scale-[0.96]"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% 68%, 91% 100%, 0 100%)' }}
            >
              View All
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.5} />
            </a>
          </div>
        </Reveal>

        {/* ── Row 1: NetSight AI — full width ── */}
        <Reveal delay={0}>
          <div className="mb-5">
            <ProjectCard project={projects[0]} wide={true} />
          </div>
        </Reveal>

        {/* ── Row 2: VaaniPay — full width ── */}
        <Reveal delay={0.05}>
          <div className="mb-5">
            <ProjectCard project={projects[1]} wide={true} />
          </div>
        </Reveal>

        {/* ── Row 3: AeroHealth + Project Atlas — two halves ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <Reveal delay={0.1}>
            <ProjectCard project={projects[2]} wide={false} />
          </Reveal>
          <Reveal delay={0.15}>
            <ProjectCard project={projects[3]} wide={false} />
          </Reveal>
        </div>

      </div>
    </section>
  );
};

export default Projects;
