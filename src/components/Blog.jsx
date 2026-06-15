import React from 'react';
import { portfolioData } from '../data/portfolioData';
import Reveal from './Reveal';

const Blog = () => {
  return (
    <section id="blog" className="py-32 relative z-10">
      <div className="container mx-auto px-6 max-w-6xl">
        <Reveal>
          <div className="mb-20">
            <div className="section-label mb-6 inline-block border border-white/10 rounded-full px-3 py-1 bg-white/[0.02]">
              Articles
            </div>
            <h2 className="section-title">
              Latest <span className="text-white/50">Writings.</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {portfolioData.blog.map((post, i) => (
            <Reveal key={post.id} delay={i * 0.1}>
              <a 
                href={post.link} 
                className="group block glass-panel p-10 h-full cursor-none transition-all duration-500 hover:bg-white/[0.05] hover:border-white/[0.1] hover:-translate-y-2"
              >
                <div className="flex flex-col h-full">
                  <div className="section-label text-accent-blue mb-6">
                    {post.date}
                  </div>
                  <h3 className="section-subtitle mb-4 group-hover:text-white transition-colors">
                    {post.title}
                  </h3>
                  <p className="body-text mb-8 flex-grow">
                    {post.description}
                  </p>
                  <div className="mt-auto inline-flex items-center text-sm font-medium text-white/50 group-hover:text-white transition-colors">
                    Read Article 
                    <span className="ml-2 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">↗</span>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
