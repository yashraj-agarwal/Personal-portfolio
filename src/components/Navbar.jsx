import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, Briefcase, Clock, BookOpen, PenTool } from 'lucide-react';

const navLinks = [
  { id: 'about', label: 'About', type: 'scroll', icon: User },
  { id: 'projects', label: 'Projects', type: 'scroll', icon: Briefcase },
  { id: 'process', label: 'Experience', type: 'scroll', icon: Clock },
  { id: 'blog', label: 'Blog', type: 'scroll', icon: BookOpen },
  { id: 'design', label: 'Design', type: 'link', url: '/design', icon: PenTool }
];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileToggleRef = useRef(null);

  // Handle Scroll Spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      let current = 'home';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - sectionHeight / 3) {
          current = section.getAttribute('id') || current;
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  const scrollToMobile = (id) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>

      {/* 
        Mobile Navbar Toggle Button 
      */}
      <div className="fixed bottom-6 right-6 z-[60] md:hidden">
        <button
          ref={mobileToggleRef}
          data-radius="999"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="relative p-4 rounded-full text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 transition-transform hover:scale-105 active:scale-95 flex items-center justify-center bg-white/10"
          aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
        >
          <span className="relative z-10">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </span>
        </button>
      </div>

      {/* 
        Mobile Full-Screen Menu 
      */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[55] bg-black/80 flex items-center justify-center md:hidden"
          >
            <nav className="flex flex-col items-center gap-6 p-4 w-full max-w-sm">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full text-center relative"
                >
                  {link.type === 'scroll' ? (
                    <button
                      onClick={() => scrollToMobile(link.id)}
                      className={`text-3xl font-medium tracking-tight py-2 w-full transition-colors focus-visible:outline-none focus-visible:text-white hover:scale-105 active:scale-95 ${
                        activeSection === link.id ? 'text-white' : 'text-white/60 hover:text-white'
                      }`}
                    >
                      {link.label}
                    </button>
                  ) : (
                    <a
                      href={link.url}
                      className="text-3xl font-medium tracking-tight py-2 w-full block transition-colors text-white/60 hover:text-white focus-visible:outline-none focus-visible:text-white hover:scale-105 active:scale-95"
                    >
                      {link.label}
                    </a>
                  )}
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
