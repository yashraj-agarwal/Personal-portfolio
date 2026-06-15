import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import AnimatedCursor from './components/AnimatedCursor';
import BackgroundLayer from './components/ui/BackgroundLayer';
import Loader from './components/Loader';
import Header from './components/Header';
import LiquidGlassNavbar from './components/LiquidGlassNavbar';
import Footer from './components/Footer';
import { ReactLenis } from 'lenis/react';

// Pages
import Home from './pages/Home';
import FloatingGallery from './components/FloatingGallery';

function AppContent() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const isHome = location.pathname === '/';

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
          
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/design" element={<FloatingGallery />} />
            </Routes>
          </main>
          
          <Footer />
        </>
      )}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ReactLenis root>
        <AppContent />
      </ReactLenis>
    </BrowserRouter>
  );
}

export default App;
