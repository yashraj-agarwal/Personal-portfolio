import React, { useRef } from 'react';
import { portfolioData } from '../data/portfolioData';
import Reveal from './Reveal';
import { Layers, Code2, GitMerge, Rocket } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const iconMap = {
  architecture: <Layers size={32} className="text-white" />,
  engineering: <Code2 size={32} className="text-white" />,
  automation: <GitMerge size={32} className="text-white" />,
  deployment: <Rocket size={32} className="text-white" />
};

const ExperienceCard = ({ exp, isLast }) => {
  return (
    <div className="relative pl-8 md:pl-12 mb-12 group">
      {/* Timeline Line */}
      {!isLast && <div className="absolute left-[11px] top-12 bottom-[-48px] w-[2px] bg-gradient-to-b from-white/20 to-white/5"></div>}
      
      {/* Timeline Node */}
      <div className="absolute left-0 top-8 w-6 h-6 rounded-full bg-background border-2 border-white/20 flex items-center justify-center transition-all duration-500 group-hover:border-[#39ff14] group-hover:shadow-[0_0_20px_rgba(57,255,20,0.4)] z-10">
         <div className="w-2 h-2 rounded-full bg-white/30 group-hover:bg-[#39ff14] group-hover:scale-150 transition-all duration-500" />
      </div>

      <div className="glass-panel p-8 md:p-10 relative flex flex-col items-start gap-4 overflow-hidden transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
        <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center mb-2 gap-4">
          <div>
            <h3 className="section-subtitle text-2xl group-hover:text-[#39ff14] transition-colors duration-300">{exp.role}</h3>
            <p className="text-white/70 text-lg mt-1 font-medium">{exp.company}</p>
          </div>
          <div className="section-label whitespace-nowrap px-4 py-2 bg-white/5 rounded-full border border-white/10 group-hover:border-white/30 transition-colors duration-300">{exp.duration}</div>
        </div>
        <p className="body-text">{exp.description}</p>
      </div>
    </div>
  );
};

const ProcessSubSection = () => {
  const { process } = portfolioData;
  return (
    <div className="mt-32">
      <Reveal>
        <div className="mb-12">
          <div className="section-label mb-6 inline-block border border-white/10 rounded-full px-3 py-1 bg-white/[0.02]">
            Workflow
          </div>
          <h3 className="section-subtitle mb-4">My Process</h3>
        </div>
      </Reveal>
      <motion.div 
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } }
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {process.map((step) => (
          <motion.div 
            key={step.id}
            variants={{
              hidden: { opacity: 0, y: 40, scale: 0.95 },
              visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 20 } }
            }}
            className="h-full"
          >
            <div className="glass-panel p-6 h-full flex flex-col transition-all duration-300 hover:bg-white/[0.05] hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(0,0,0,0.5)] group">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-white/5 rounded-2xl border border-white/10 group-hover:border-[#39ff14]/30 transition-colors duration-300">
                  {React.cloneElement(iconMap[step.icon], { className: "text-white group-hover:text-[#39ff14] transition-colors duration-300" })}
                </div>
                <div className="text-4xl font-serif italic text-white/5 font-bold leading-none group-hover:text-white/10 transition-colors duration-300">{step.id}</div>
              </div>
              <h4 className="text-xl font-bold text-white mb-3 group-hover:text-[#39ff14] transition-colors duration-300">{step.title}</h4>
              <p className="body-text text-sm flex-grow">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

const Experience = () => {
  const { experience } = portfolioData;
  return (
    <section id="experience" className="py-32 relative z-10">
      <div className="container mx-auto px-6 max-w-6xl">
        <Reveal>
          <div className="mb-16">
            <div className="section-label mb-6 inline-block border border-white/10 rounded-full px-3 py-1 bg-white/[0.02]">
              Background
            </div>
            <h2 className="section-title">
              Professional <br/><span className="text-white/50">Experience.</span>
            </h2>
          </div>
        </Reveal>

        <div className="flex flex-col relative">
          <div className="absolute left-[11px] top-10 bottom-0 w-[2px] bg-gradient-to-b from-[#39ff14]/50 via-transparent to-transparent opacity-30"></div>
          {experience.map((exp, i) => (
            <Reveal key={exp.id} delay={i * 0.1}>
              <ExperienceCard exp={exp} isLast={i === experience.length - 1} />
            </Reveal>
          ))}
        </div>

        <ProcessSubSection />
      </div>
    </section>
  );
};

export default Experience;
