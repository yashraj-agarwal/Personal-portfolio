import { useRef, useEffect } from "react";
import {
  User,
  FolderGit2,
  BriefcaseBusiness,
  Palette,
  Scan,
  Mail,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLenis } from "lenis/react";
import { applyGlass, removeGlass } from "../lib/liquid-glass";
import LiquidGlassPill from "./LiquidGlassPill";
import useScrollSpy from "../hooks/useScrollSpy";
import "../styles/liquid-glass.css";

const navItems = [
  { id: "about", label: "About", icon: User },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "experience", label: "Experience", icon: BriefcaseBusiness },
  { id: "design", label: "Design", icon: Palette },
  { id: "frames", label: "Frames", icon: Scan },
  { id: "contact", label: "Contact", icon: Mail },
];

const LiquidGlassNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const lenis = useLenis();
  const activeSectionId = useScrollSpy(navItems.map((item) => item.id));
  const itemsRefs = useRef([]);

  const currentIndex = Math.max(
    0,
    navItems.findIndex(
      (item) => item.id === (location.pathname.slice(1) || activeSectionId),
    ),
  );
  const navRef = useRef(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    applyGlass(nav, () => ({
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
      balancedSpecular: true,
    }));

    return () => {
      removeGlass(nav);
    };
  }, []);

  useEffect(() => {
    if (location.pathname !== "/" || !location.hash) {
      if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
      else window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }
    // Keep hash destinations aligned while lazy sections change page height.
    let frame = 0;
    let settleTimer;
    let limitTimer;
    let stopped = false;
    const align = () => {
      frame = 0;
      if (stopped) return;
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        if (lenis) {
          lenis.resize();
          lenis.scrollTo(element, { immediate: true, force: true });
        } else element.scrollIntoView({ behavior: "instant", block: "start" });
      }
      clearTimeout(settleTimer);
      if (
        ["about", "projects", "experience"].every((id) =>
          document.getElementById(id),
        )
      ) {
        settleTimer = setTimeout(stop, 800);
      }
    };
    const schedule = () => {
      if (!frame && !stopped) frame = requestAnimationFrame(align);
    };
    const observer = new ResizeObserver(schedule);
    const mutations = new MutationObserver(schedule);
    const events = ["wheel", "touchstart", "pointerdown", "keydown"];
    function stop() {
      stopped = true;
      cancelAnimationFrame(frame);
      clearTimeout(settleTimer);
      clearTimeout(limitTimer);
      observer.disconnect();
      mutations.disconnect();
      events.forEach((event) => window.removeEventListener(event, stop));
    }
    observer.observe(document.body);
    mutations.observe(document.getElementById("main-content"), {
      childList: true,
      subtree: true,
    });
    events.forEach((event) =>
      window.addEventListener(event, stop, { passive: true }),
    );
    limitTimer = setTimeout(stop, 10000);
    schedule();
    return stop;
  }, [location.pathname, location.hash, lenis]);

  const handleNavClick = (id) => {
    if (id === "design" || id === "frames") {
      navigate(`/${id}`);
      return;
    }
    if (location.pathname !== "/") {
      navigate(`/#${id}`);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      lenis?.resize();
      if (lenis)
        lenis.scrollTo(element, {
          immediate: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches,
        });
      else
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }
  };

  return (
    <>
      <nav ref={navRef} className="liquid-glass-nav">
        <LiquidGlassPill itemsRefs={itemsRefs} currentIndex={currentIndex} />

        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = currentIndex === index;
          return (
            <button
              key={item.id}
              ref={(el) => (itemsRefs.current[index] = el)}
              className={`nav-item ${isActive ? "active" : ""}`}
              onClick={() => handleNavClick(item.id)}
              type="button"
              aria-label={item.label}
              aria-current={
                isActive
                  ? item.id === "design" || item.id === "frames"
                    ? "page"
                    : "location"
                  : undefined
              }
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
