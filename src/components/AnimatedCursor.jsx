import React, { useEffect, useRef } from 'react';

const AnimatedCursor = () => {
  const circlesRef = useRef([]);
  const coords = useRef({ x: 0, y: 0 });

  const cursorColors = [
    "#f2f2f2", "#e6e6e6", "#cccccc", "#b3b3b3", "#999999", 
    "#808080", "#666666", "#4d4d4d", "#333333", "#1a1a1a",
    "#050505", "#050505", "#050505", "#050505", "#050505",
    "#050505", "#050505", "#050505", "#050505", "#050505"
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      coords.current.x = e.clientX;
      coords.current.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    let animationFrameId;

    const animateCircles = () => {
      let x = coords.current.x;
      let y = coords.current.y;

      circlesRef.current.forEach((circle, index) => {
        if (!circle) return;
        
        // 12px offset centers the 24x24px cursor
        circle.style.transform = `translate3d(${x - 12}px, ${y - 12}px, 0) scale(${(20 - index) / 20})`;

        circle.x = x;
        circle.y = y;

        const nextCircle = circlesRef.current[index + 1] || circlesRef.current[0];
        if (nextCircle) {
          x += (nextCircle.x - x) * 0.3;
          y += (nextCircle.y - y) * 0.3;
        }
      });

      animationFrameId = requestAnimationFrame(animateCircles);
    };

    animateCircles();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {cursorColors.map((color, index) => (
        <div
          key={index}
          ref={(el) => (circlesRef.current[index] = el)}
          className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-[9999999] mix-blend-difference"
          style={{ backgroundColor: color }}
        />
      ))}
    </>
  );
};

export default AnimatedCursor;
