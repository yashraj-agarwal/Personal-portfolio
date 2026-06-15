import React, { useState } from 'react';
import { Mail, FileText, Check, Copy, ArrowUpRight } from 'lucide-react';
import Reveal from './Reveal';

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Footer = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText('yashraj.ghy@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer id="contact" className="relative pt-40 pb-16 px-6 text-center overflow-hidden bg-transparent z-10">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none z-0 opacity-10">
        <div className="absolute inset-0 bg-[#39ff14] rounded-full blur-[120px] opacity-20" />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10 flex flex-col items-center">
        <Reveal>
          <div className="section-label mb-6 inline-block border border-white/10 rounded-full px-4 py-1.5 bg-white/[0.02] backdrop-blur-md">
            Get In Touch
          </div>
          
          <h2 className="section-title mb-16">
            Let's build <br/> 
            <span className="text-white/40">the future.</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-24 text-left">
            {/* Email Card */}
            <div 
              onClick={() => window.location.href = 'mailto:yashraj.ghy@gmail.com'}
              className="group relative glass-panel p-8 hover:bg-white/[0.03] hover:border-[#39ff14]/30 hover:shadow-[0_0_30px_rgba(57,255,20,0.08)] transition-all duration-500 rounded-[24px] flex flex-col justify-between h-56 cursor-pointer"
            >
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/70 group-hover:text-[#39ff14] group-hover:bg-[#39ff14]/5 group-hover:border-[#39ff14]/20 transition-all duration-300">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={handleCopyEmail}
                    className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all duration-300 relative"
                    title="Copy Email"
                  >
                    {copied ? <Check className="w-4 h-4 text-[#39ff14]" /> : <Copy className="w-4 h-4" />}
                    {copied && (
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 text-[#39ff14] text-[10px] font-spacemono py-1 px-2 rounded border border-[#39ff14]/20 whitespace-nowrap">
                        Copied!
                      </span>
                    )}
                  </button>
                  <div className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/50 group-hover:text-black group-hover:bg-white group-hover:border-white transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
                  </div>
                </div>
              </div>
              <div>
                <p className="font-spacemono text-[11px] uppercase tracking-widest text-[#39ff14]/70 mb-2">Email Me</p>
                <h4 className="text-lg font-bold text-white transition-colors break-all">yashraj.ghy@gmail.com</h4>
              </div>
            </div>
            
            {/* LinkedIn Card */}
            <a 
              href="https://www.linkedin.com/in/yash-raj-agarwal/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative glass-panel p-8 hover:bg-white/[0.03] hover:border-[#39ff14]/30 hover:shadow-[0_0_30px_rgba(57,255,20,0.08)] transition-all duration-500 rounded-[24px] flex flex-col justify-between h-56 cursor-pointer"
            >
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/70 group-hover:text-[#39ff14] group-hover:bg-[#39ff14]/5 group-hover:border-[#39ff14]/20 transition-all duration-300">
                  <LinkedInIcon />
                </div>
                <div className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/50 group-hover:text-black group-hover:bg-white group-hover:border-white transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
                </div>
              </div>
              <div>
                <p className="font-spacemono text-[11px] uppercase tracking-widest text-[#39ff14]/70 mb-2">Connect</p>
                <h4 className="text-lg font-bold text-white transition-colors">LinkedIn</h4>
              </div>
            </a>

            {/* Resume Card */}
            <a 
              href="/resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative glass-panel p-8 hover:bg-white/[0.03] hover:border-[#39ff14]/30 hover:shadow-[0_0_30px_rgba(57,255,20,0.08)] transition-all duration-500 rounded-[24px] flex flex-col justify-between h-56 cursor-pointer"
            >
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/70 group-hover:text-[#39ff14] group-hover:bg-[#39ff14]/5 group-hover:border-[#39ff14]/20 transition-all duration-300">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/50 group-hover:text-black group-hover:bg-white group-hover:border-white transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
                </div>
              </div>
              <div>
                <p className="font-spacemono text-[11px] uppercase tracking-widest text-[#39ff14]/70 mb-2">Resume PDF</p>
                <h4 className="text-lg font-bold text-white transition-colors">View / Download</h4>
              </div>
            </a>
          </div>
        </Reveal>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-center w-full text-sm text-muted">
          <p className="font-spacemono text-[11px] tracking-wider uppercase text-white/40">&copy; {new Date().getFullYear()} Yash Raj Agarwal.</p>
          <div className="flex gap-6 mt-4 md:mt-0 font-spacemono text-[11px] tracking-wider uppercase">
            <a href="https://github.com/yashraj-agarwal" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
            <a href="https://www.linkedin.com/in/yash-raj-agarwal/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
