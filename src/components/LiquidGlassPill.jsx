import { useEffect, useRef } from "react";
import { applyGlass, removeGlass } from "../lib/liquid-glass";

export default function LiquidGlassPill({ itemsRefs, currentIndex }) {
  const pillRef = useRef(null);
  useEffect(() => {
    const pill = pillRef.current;
    applyGlass(pill, { scaleRatio: 1.7 });
    return () => removeGlass(pill);
  }, []);
  useEffect(() => {
    const pill = pillRef.current;
    const item = itemsRefs.current[currentIndex];
    if (!pill || !item) return;
    let frame = 0;
    let mounted = true;
    const measure = () => {
      if (!mounted) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        pill.style.left = `${item.offsetLeft}px`;
        pill.style.width = `${item.offsetWidth}px`;
        pill.style.opacity = "1";
      });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(item);
    observer.observe(item.parentElement);
    document.fonts.ready.then(measure);
    measure();
    return () => {
      mounted = false;
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [currentIndex, itemsRefs]);
  return (
    <div
      ref={pillRef}
      className="liquid-glass-pill"
      aria-hidden="true"
      style={{ opacity: 0 }}
    />
  );
}
