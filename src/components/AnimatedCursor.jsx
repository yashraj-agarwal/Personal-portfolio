import { useEffect, useRef } from "react";

const colors = [
  "#f2f2f2",
  "#e6e6e6",
  "#ccc",
  "#b3b3b3",
  "#999",
  "#808080",
  "#666",
  "#4d4d4d",
  "#333",
  "#1a1a1a",
];

export default function AnimatedCursor() {
  const circlesRef = useRef([]);
  useEffect(() => {
    const media = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    const nodes = circlesRef.current.filter(Boolean);
    const points = colors.map(() => ({ x: 0, y: 0 }));
    let target = { x: 0, y: 0 };
    let frame = 0;
    let initialized = false;
    const hide = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      initialized = false;
      document.documentElement.classList.remove("has-custom-cursor");
      nodes.forEach((node) => {
        node.style.opacity = "0";
      });
    };
    const draw = () => {
      let moving = false;
      points.forEach((point, index) => {
        const next = index === 0 ? target : points[index - 1];
        point.x += (next.x - point.x) * (index === 0 ? 1 : 0.38);
        point.y += (next.y - point.y) * (index === 0 ? 1 : 0.38);
        if (Math.abs(point.x - target.x) + Math.abs(point.y - target.y) > 0.1)
          moving = true;
        nodes[index].style.transform =
          `translate3d(${point.x - 10}px, ${point.y - 10}px, 0) scale(${(colors.length - index) / colors.length})`;
      });
      frame = moving ? requestAnimationFrame(draw) : 0;
    };
    const move = (event) => {
      if (!media.matches || event.pointerType !== "mouse") return;
      target = { x: event.clientX, y: event.clientY };
      if (!initialized) {
        points.forEach((point) => {
          point.x = target.x;
          point.y = target.y;
        });
        nodes.forEach((node) => {
          node.style.opacity = "1";
        });
        initialized = true;
        document.documentElement.classList.add("has-custom-cursor");
      }
      if (!frame) frame = requestAnimationFrame(draw);
    };
    const visibility = () => {
      if (document.hidden) hide();
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", hide);
    document.addEventListener("visibilitychange", visibility);
    media.addEventListener("change", hide);
    return () => {
      hide();
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", hide);
      document.removeEventListener("visibilitychange", visibility);
      media.removeEventListener("change", hide);
    };
  }, []);
  return colors.map((color, index) => (
    <div
      key={color}
      ref={(node) => {
        circlesRef.current[index] = node;
      }}
      aria-hidden="true"
      className="custom-cursor fixed left-0 top-0 h-5 w-5 rounded-full pointer-events-none z-[9999999] mix-blend-difference"
      style={{ backgroundColor: color, opacity: 0 }}
    />
  ));
}
