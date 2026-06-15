import React, { useEffect, useState, useRef } from 'react';
import { applyGlass, removeGlass } from '../lib/liquid-glass';

const LiquidGlassPill = ({ itemsRefs, currentIndex, previousIndex }) => {
  const [style, setStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
    transformOrigin: 'center'
  });
  const [isMoving, setIsMoving] = useState(false);
  const pillRef = useRef(null);

  useEffect(() => {
    if (!pillRef.current) return;

    applyGlass(pillRef.current, () => ({
      blur: 2,
      glassThickness: 38,
      bezelWidth: 40,
      ior: 1.65,
      scaleRatio: 1.7,
      tintColor: "255,255,255",
      tintOpacity: 0.08,
      specularOpacity: 0.7,
      specularSat: 1.35,
      balancedSpecular: true
    }));

    return () => {
      if (pillRef.current) removeGlass(pillRef.current);
    };
  }, []);

  useEffect(() => {
    const currentRef = itemsRefs.current[currentIndex];
    if (!currentRef) return;

    const { offsetLeft, offsetWidth } = currentRef;

    // Determine direction for elastic stretch origin
    let transformOrigin = 'center';
    if (previousIndex !== null && currentIndex !== previousIndex) {
      transformOrigin = currentIndex > previousIndex ? 'left center' : 'right center';
      
      // Trigger animation
      setIsMoving(false);
      // Small delay to restart animation
      setTimeout(() => setIsMoving(true), 10);
    }

    setStyle({
      left: offsetLeft,
      width: offsetWidth,
      opacity: 1,
      transformOrigin
    });
  }, [currentIndex, previousIndex, itemsRefs]);

  return (
    <div
      ref={pillRef}
      className={`liquid-glass-pill ${isMoving ? 'moving' : ''}`}
      style={{
        left: `${style.left}px`,
        width: `${style.width}px`,
        opacity: style.opacity,
        transformOrigin: style.transformOrigin
      }}
      onAnimationEnd={() => setIsMoving(false)}
    />
  );
};

export default LiquidGlassPill;
