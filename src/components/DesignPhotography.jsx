import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import Reveal from './Reveal';

const ImageWithLoading = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-surfaceHighlight ${className}`}>
      {/* Skeleton/Blur placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-surfaceHighlight animate-pulse"></div>
      )}
      
      <motion.img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        initial={{ filter: 'blur(20px)', opacity: 0, scale: 1.1 }}
        animate={
          isLoaded 
            ? { filter: 'blur(0px)', opacity: 1, scale: 1 } 
            : { filter: 'blur(20px)', opacity: 0, scale: 1.1 }
        }
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export const DesignPortfolio = () => {
  return (
    <section id="design" className="py-32 relative z-10">
      <div className="container mx-auto px-6 max-w-6xl">
        <Reveal>
          <div className="mb-16">
            <h2 className="section-title">
              Design <span className="text-white/50">Showcase.</span>
            </h2>
          </div>
        </Reveal>
        
        {/* Masonry Layout Simulation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div className="flex flex-col gap-6">
            {portfolioData.designPortfolio.filter((_, i) => i % 2 === 0).map((item, i) => (
              <Reveal key={item.id} delay={i * 0.1}>
                <div className="group relative overflow-hidden rounded-2xl cursor-none">
                  <ImageWithLoading 
                    src={item.image} 
                    alt={item.title} 
                    className="aspect-square md:aspect-[4/5] group-hover:scale-105 group-hover:blur-sm transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                    <p className="text-white font-medium text-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{item.title}</p>
                    <p className="text-secondary text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">View Project ↗</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="flex flex-col gap-6 md:mt-24">
            {portfolioData.designPortfolio.filter((_, i) => i % 2 !== 0).map((item, i) => (
              <Reveal key={item.id} delay={i * 0.1}>
                <div className="group relative overflow-hidden rounded-2xl cursor-none">
                  <ImageWithLoading 
                    src={item.image} 
                    alt={item.title} 
                    className="aspect-video md:aspect-[3/4] group-hover:scale-105 group-hover:blur-sm transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                    <p className="text-white font-medium text-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{item.title}</p>
                    <p className="text-secondary text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">View Project ↗</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export const Photography = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section className="py-40 relative z-10" ref={containerRef}>
      <div className="container mx-auto px-6 max-w-6xl">
        <Reveal>
          <div className="mb-24 text-center max-w-2xl mx-auto">
            <div className="section-label mb-6 inline-block border border-white/10 rounded-full px-3 py-1 bg-white/[0.02]">
              Through the Lens
            </div>
            <h2 className="section-title mb-6">
              Captured Moments
            </h2>
            <p className="body-text text-lg mx-auto">Cinematography and photography focusing on light, form, and story.</p>
          </div>
        </Reveal>
        
        <div className="flex flex-col gap-32">
          {portfolioData.photography.map((item, i) => {
            const isEven = i % 2 === 0;
            return (
              <div key={item.id} className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}>
                <motion.div 
                  className="w-full md:w-2/3"
                  style={{ y: isEven ? y1 : y2 }}
                >
                  <div className="group relative overflow-hidden rounded-xl cursor-none shadow-2xl">
                    <ImageWithLoading 
                      src={item.image} 
                      alt={item.title} 
                      className={`w-full ${isEven ? 'aspect-video' : 'aspect-[4/3]'} group-hover:scale-[1.02] transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]`}
                    />
                  </div>
                </motion.div>
                <div className="w-full md:w-1/3 px-4">
                  <Reveal delay={0.2}>
                    <p className="section-label mb-2 text-white/50">0{i+1}</p>
                    <h3 className="section-subtitle mb-4">{item.title}</h3>
                    <div className="w-12 h-px bg-white/20"></div>
                  </Reveal>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
