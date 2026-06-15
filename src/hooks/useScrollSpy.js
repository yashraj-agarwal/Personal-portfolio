import { useState, useEffect } from 'react';

const useScrollSpy = (sectionIds) => {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find all intersecting entries
        const intersecting = entries.filter((entry) => entry.isIntersecting);
        if (intersecting.length > 0) {
          // If multiple, pick the one closest to the top of the viewport
          const closest = intersecting.reduce((prev, current) => {
            return prev.boundingClientRect.top > current.boundingClientRect.top
              ? prev
              : current;
          });
          setActiveSection(closest.target.id);
        }
      },
      {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeSection;
};

export default useScrollSpy;
