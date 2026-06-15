import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import Reveal from './Reveal';

const ProcessCard = ({ step, index, totalSteps, containerRef }) => {
  // We calculate the active state based on scroll position relative to the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Calculate the specific range for this card to be "active"
  const stepSize = 1 / totalSteps;
  const start = index * stepSize;
  const end = start + stepSize;
  
  // Create a slight overlap so transitions feel smooth
  const isActive = useTransform(scrollYProgress, 
    [Math.max(0, start - 0.1), start, end, Math.min(1, end + 0.1)], 
    [0, 1, 1, 0]
  );

  const opacity = useTransform(isActive, [0, 1], [0.3, 1]);
  const scale = useTransform(isActive, [0, 1], [0.95, 1]);
  const blur = useTransform(isActive, [0, 1], ['blur(8px)', 'blur(0px)']);
  const borderColor = useTransform(isActive, [0, 1], ['rgba(255,255,255,0.02)', 'rgba(255,255,255,0.1)']);

  return (
    <motion.div 
      className="glass-panel p-8 md:p-12 relative flex items-start gap-6 overflow-hidden"
      style={{ opacity, scale, filter: blur, borderColor }}
    >
      <div className="text-4xl text-white/80 shrink-0">{step.icon}</div>
      <div>
        <div className="absolute top-8 right-8 text-6xl font-serif italic text-white/[0.03] font-bold leading-none pointer-events-none">
          {step.id}
        </div>
        <h3 className="section-subtitle mb-3">{step.title}</h3>
        <p className="body-text">{step.description}</p>
      </div>
    </motion.div>
  );
};

const Process = () => {
  const containerRef = useRef(null);
  const { process } = portfolioData;

  return (
    <section id="experience" className="py-32 relative z-10" ref={containerRef}>
      <div className="container mx-auto px-6 max-w-6xl flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* Sticky Header */}
        <div className="lg:w-1/3">
          <div className="sticky top-40">
            <Reveal>
              <div className="section-label mb-6 inline-block border border-white/10 rounded-full px-3 py-1 bg-white/[0.02]">
                Workflow
              </div>
              <h2 className="section-title mb-6">
                Process <br className="hidden lg:block"/> 
                <span className="text-white/50">crafting bold visuals.</span>
              </h2>
              <p className="body-text text-lg max-w-sm">
                A structured approach to ensure high-quality delivery, from initial concept to final deployment.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Scrollable Cards */}
        <div className="lg:w-2/3 flex flex-col gap-6 md:gap-10 pb-40">
          {process.map((step, index) => (
            <ProcessCard 
              key={step.id} 
              step={step} 
              index={index} 
              totalSteps={process.length} 
              containerRef={containerRef} 
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Process;
