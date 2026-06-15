import React, { useRef, useState, useEffect } from 'react';
import { User, FolderGit2, BriefcaseBusiness, Palette, Mail } from 'lucide-react';
import { applyGlass, removeGlass } from '../lib/liquid-glass';
import LiquidGlassPill from './LiquidGlassPill';
import useScrollSpy from '../hooks/useScrollSpy';
import '../styles/liquid-glass.css';

const navItems = [
  { id: 'about', label: 'About', icon: User },
  { id: 'projects', label: 'Projects', icon: FolderGit2 },
  { id: 'experience', label: 'Experience', icon: BriefcaseBusiness },
  { id: 'design', label: 'Design', icon: Palette },
  { id: 'contact', label: 'Contact', icon: Mail }
];

const LiquidGlassNavbar = () => {
  const activeSectionId = useScrollSpy(navItems.map(item => item.id));
  const itemsRefs = useRef([]);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(null);
  const navRef = useRef(null);

  useEffect(() => {
    if (!navRef.current) return;

    applyGlass(navRef.current, () => ({
      blur: 1.5,
      glassThickness: 30,
      bezelWidth: 32,
      ior: 1.58,
      scaleRatio: 1.4,
      tintColor: "255,255,255",
      tintOpacity: 0.04,
      specularOpacity: 0.55,
      specularSat: 1.25,
      innerShadowBlur: 12,
      innerShadowSpread: 0,
      innerShadow: "rgba(255,255,255,.15)",
      balancedSpecular: true
    }));

    return () => {
      if (navRef.current) removeGlass(navRef.current);
    };
  }, []);

  // Sync scroll spy with state
  useEffect(() => {
    const index = navItems.findIndex(item => item.id === activeSectionId);
    if (index !== -1 && index !== currentIndex) {
      setPreviousIndex(currentIndex);
      setCurrentIndex(index);
    }
  }, [activeSectionId, currentIndex]);

  const handleNavClick = (index, id) => {
    if (id === 'design') {
      window.location.href = "/design";
      return;
    }

    if (index !== currentIndex) {
      setPreviousIndex(currentIndex);
      setCurrentIndex(index);
    }
    
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };

  return (
    <>
      <nav ref={navRef} className="liquid-glass-nav">
        <LiquidGlassPill 
          itemsRefs={itemsRefs}
          currentIndex={currentIndex}
          previousIndex={previousIndex}
        />
        
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = currentIndex === index;
          return (
            <button
              key={item.id}
              ref={el => itemsRefs.current[index] = el}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => handleNavClick(index, item.id)}
              type="button"
              aria-label={item.label}
            >
              <Icon size={20} strokeWidth={2.5} className="nav-icon" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
};

export default LiquidGlassNavbar;
