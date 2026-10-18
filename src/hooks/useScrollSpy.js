import { useEffect, useState } from "react";

export default function useScrollSpy(sectionIds) {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);
  const sectionKey = sectionIds.join(",");
  useEffect(() => {
    const ids = sectionKey.split(",");
    let frame = 0;
    const update = () => {
      frame = 0;
      const sections = ids
        .map((id) => document.getElementById(id))
        .filter(Boolean);
      const current = sections
        .filter(
          (node) =>
            node.getBoundingClientRect().top <= window.innerHeight * 0.4,
        )
        .at(-1);
      setActiveSection(current?.id ?? ids[0]);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const observer = new MutationObserver(schedule);
    const root = document.getElementById("root");
    if (root) observer.observe(root, { childList: true, subtree: true });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [sectionKey]);
  return activeSection;
}
