import { lazy, Suspense, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import PageBoundary from "./components/PageBoundary";
import AnimatedCursor from "./components/AnimatedCursor";
import BackgroundLayer from "./components/ui/BackgroundLayer";
import Loader from "./components/Loader";
import Header from "./components/Header";
import LiquidGlassNavbar from "./components/LiquidGlassNavbar";
import Footer from "./components/Footer";
import { ReactLenis } from "lenis/react";
import { MotionConfig } from "framer-motion";
import useMediaQuery from "./hooks/useMediaQuery";

// Pages
import Home from "./pages/Home";
const Frames = lazy(() => import("./pages/Frames"));
const Design = lazy(() => import("./pages/Design"));

function AppContent() {
  const [loading, setLoading] = useState(
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const page =
      location.pathname === "/design"
        ? "Design"
        : location.pathname === "/frames"
          ? "Archive"
          : null;
    document.title = page
      ? `${page} — Yash Raj Agarwal`
      : "Yash Raj Agarwal — Developer & Designer";
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical)
      canonical.href = `https://yashrajagarwal.co.in${isHome ? "/" : location.pathname}`;
  }, [location.pathname, isHome]);

  return (
    <>
      <AnimatedCursor />

      {loading && <Loader onComplete={() => setLoading(false)} />}

      {!loading && (
        <>
          {/* Global background elements disabled on home page, active elsewhere */}
          {!isHome && (
            <>
              <BackgroundLayer />
              <div className="grain-overlay"></div>
            </>
          )}

          <Header />
          <LiquidGlassNavbar />

          <a href="#main-content" className="skip-link">
            Skip to content
          </a>
          <main id="main-content" tabIndex={-1}>
            <PageBoundary key={location.pathname}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/design"
                  element={
                    <Suspense
                      fallback={
                        <div
                          className="min-h-screen bg-[#080808]"
                          role="status"
                          aria-label="Loading Design"
                        />
                      }
                    >
                      <Design />
                    </Suspense>
                  }
                />
                <Route
                  path="/frames"
                  element={
                    <Suspense
                      fallback={
                        <div
                          className="min-h-screen bg-[#050505]"
                          role="status"
                          aria-label="Loading Frames"
                        />
                      }
                    >
                      <Frames />
                    </Suspense>
                  }
                />
              </Routes>
            </PageBoundary>
          </main>

          <Footer />
        </>
      )}
    </>
  );
}

function App() {
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  return (
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
        <ReactLenis root options={{ smoothWheel: !reducedMotion }}>
          <AppContent />
        </ReactLenis>
      </MotionConfig>
    </BrowserRouter>
  );
}

export default App;
