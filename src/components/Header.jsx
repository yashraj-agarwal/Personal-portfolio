import React from 'react';
import { motion } from 'framer-motion';

const Header = () => {
  const links = [
    { name: 'GitHub', url: 'https://github.com/yashraj-agarwal' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/yash-raj-agarwal/' },
    { name: 'Resume', url: '/resume.pdf' },
  ];

  const linkVariants = {
    hidden: { opacity: 0, y: -20, filter: 'blur(5px)' },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        delay: 1.5 + i * 0.1, // Wait for hero sequence roughly
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <header className="fixed top-0 left-0 w-full z-[500] px-5 py-5 md:px-10 md:py-8 pointer-events-none flex justify-between items-start">
      {/* Top Left: Portfolio label */}
      <div className="w-1" />

      {/* Top Right: Links */}
      <div className="flex items-center gap-3 md:gap-6 pointer-events-auto flex-wrap justify-end">
        {links.map((link, i) => (
          <motion.a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            custom={i}
            variants={linkVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.1, y: -2 }}
            className="font-spacemono text-[#39ff14] text-[clamp(0.6rem,2.2vw,0.82rem)] font-bold leading-none uppercase tracking-widest transition-all duration-300 relative group cursor-none inline-block active:scale-95"
          >
            {link.name}
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-[#39ff14] transition-all duration-300 group-hover:w-full" />
          </motion.a>
        ))}
      </div>
    </header>
  );
};

export default Header;
