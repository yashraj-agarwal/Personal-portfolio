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

// Shared 3D tilt card — accepts `featured` prop for sizing
const ProjectCard = ({ project, featured = false }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [featured ? '8deg' : '12deg', featured ? '-8deg' : '-12deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [featured ? '-8deg' : '-12deg', featured ? '8deg' : '12deg']);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  let LogoIcon = Rocket;
  if (project.title.toLowerCase().includes('atlas')) LogoIcon = Layers;
  if (project.title.toLowerCase().includes('health')) LogoIcon = HeartPulse;
  if (project.title.toLowerCase().includes('vaani') || project.title.toLowerCase().includes('pay')) LogoIcon = Wifi;

  const height = featured ? 'h-[420px] md:h-[380px]' : 'h-[310px]';

  return (
    <div className={`group w-full ${height} [perspective:1000px]`}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY }}
        className="relative h-full rounded-[36px] bg-gradient-to-br from-zinc-900 to-black shadow-2xl transition-shadow duration-500 [transform-style:preserve-3d] group-hover:[box-shadow:rgba(0,0,0,0.3)_30px_50px_25px_-40px,rgba(0,0,0,0.1)_0px_25px_30px_0px]"
      >
        {/* Inner Glass Layer */}
        <div className="absolute inset-2 rounded-[30px] border-b border-l border-white/20 bg-gradient-to-b from-white/30 to-white/10 backdrop-blur-sm [transform-style:preserve-3d] [transform:translate3d(0,0,25px)]" />

        {/* Featured badge */}
        {featured && (
          <div className="absolute top-6 left-7 [transform:translate3d(0,0,27px)] z-20">
            <span className="font-spacemono text-[9px] tracking-[0.2em] uppercase text-[#39ff14] border border-[#39ff14]/30 bg-[#39ff14]/5 px-2 py-1 rounded-full">
              Featured
            </span>
          </div>
        )}

        {/* Tags + Title + Description */}
        <div className={`absolute [transform:translate3d(0,0,26px)] ${featured ? 'p-7 pt-14' : 'p-7'} pr-[170px]`}>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map(tag => (
              <span key={tag} className="tag-badge">{tag}</span>
            ))}
          </div>
          <span className={`section-subtitle block ${featured ? 'text-[1.45rem]' : 'text-[1.2rem]'} leading-tight`}>
            {project.title}
          </span>
          <span className={`body-text mt-3 block text-[13px] leading-relaxed ${featured ? 'line-clamp-4' : 'line-clamp-3'}`}>
            {project.description}
          </span>
        </div>

        {/* Footer */}
        <div className="absolute bottom-6 left-7 right-7 flex items-center justify-between [transform-style:preserve-3d] [transform:translate3d(0,0,26px)] z-20">
          <div className="flex gap-3">
            {[
              { icon: GithubIcon, href: project.link || 'https://github.com', title: 'GitHub' },
              { icon: Globe, href: project.live || project.link || '#', title: 'Live Demo' },
            ].map(({ icon: Icon, href, title }, i) => (
              <a key={i} href={href} target="_blank" rel="noreferrer" title={title}
                className="group/social grid h-[34px] w-[34px] place-content-center rounded-full bg-white shadow-[rgba(0,0,0,0.5)_0px_7px_5px_-5px] transition-all duration-300 hover:bg-[#39ff14] hover:[transform:translate3d(0,0,40px)] pointer-events-auto">
                <Icon className="h-[15px] w-[15px] stroke-black" />
              </a>
            ))}
          </div>
          <a href={project.link || 'https://github.com'} target="_blank" rel="noreferrer"
            className="group/view relative z-50 pointer-events-auto flex items-center gap-2 px-4 py-2 rounded-full border border-[#39ff14]/30 bg-[#39ff14]/5 text-[#39ff14] font-spacemono text-[11px] tracking-[0.12em] uppercase transition-all duration-300 hover:bg-[#39ff14]/15 hover:border-[#39ff14]/70 hover:shadow-[0_0_18px_rgba(57,255,20,0.2)] hover:[transform:translate3d(0,0,10px)]">
            View More
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/view:translate-x-0.5 group-hover/view:-translate-y-0.5" strokeWidth={2.5} />
          </a>
        </div>

        {/* 3D Decorative Circles & Logo */}
        <div className={`absolute top-5 right-5 group-hover:-top-5 group-hover:-right-5 transition-all duration-700 ease-in-out ${featured ? 'w-[140px] h-[140px]' : 'w-[120px] h-[120px]'} flex items-center justify-center [transform-style:preserve-3d] pointer-events-none`}>
          {[
            { size: featured ? '140px' : '120px', hoverZ: '20px', delay: '0s' },
            { size: featured ? '115px' : '98px',  hoverZ: '40px', delay: '0.1s' },
            { size: featured ? '90px'  : '76px',  hoverZ: '60px', delay: '0.2s' },
            { size: featured ? '65px'  : '54px',  hoverZ: '80px', delay: '0.3s' },
          ].map((circle, i) => (
            <div key={i}
              className="absolute aspect-square rounded-full border border-white/5 bg-white/10 transition-all duration-500 [transform:translate3d(0,0,0px)] group-hover:[transform:translate3d(0,0,var(--hover-z))]"
              style={{ width: circle.size, '--hover-z': circle.hoverZ, transitionDelay: circle.delay }} />
          ))}
          <div className={`absolute grid aspect-square ${featured ? 'w-[46px]' : 'w-[40px]'} place-content-center rounded-full bg-white shadow-[0_10px_20px_rgba(0,0,0,0.3)] transition-all duration-700 [transform:translate3d(0,0,10px)] group-hover:[transform:translate3d(0,0,140px)]`}>
            <LogoIcon className="w-5 h-5 stroke-black" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Projects = () => {
  const featured = portfolioData.projects.filter(p => p.featured);
  const regular  = portfolioData.projects.filter(p => !p.featured);

  return (
    <section id="projects" className="py-32 relative z-10">
      <div className="container mx-auto px-6 max-w-6xl">
        <Reveal>
          <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <div className="section-label mb-6 inline-block border border-white/10 rounded-full px-3 py-1 bg-white/[0.02]">
                Selected Work
              </div>
              <h2 className="section-title">
                Featured <span className="text-white/50">Projects.</span>
              </h2>
            </div>
            <a href="https://github.com/yashraj-agarwal" target="_blank" rel="noreferrer"
              className="group self-start md:self-end flex items-center gap-2 px-6 py-3 font-syncopate text-[11px] font-bold tracking-[0.18em] uppercase text-[#080808] bg-[#e2e2e2] transition-all duration-300 hover:bg-[#39ff14] hover:-translate-y-1 active:scale-[0.96]"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% 68%, 91% 100%, 0 100%)' }}>
              View All Projects
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.5} />
            </a>
          </div>
        </Reveal>

        {/* Row 1: Two featured hero cards — larger, with "Featured" badge */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
          {featured.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.1}>
              <ProjectCard project={project} featured={true} />
            </Reveal>
          ))}
        </div>

        {/* Row 2–3: Two regular cards — same grid, smaller height */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {regular.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.08}>
              <ProjectCard project={project} featured={false} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
