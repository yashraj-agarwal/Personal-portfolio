import React, { useEffect, useRef } from 'react';
import { portfolioCards } from '../data/portfolioCards';

export default function FloatingGallery() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // --- EXACT JS PORT FROM USER CODE ---
    const CARDS = portfolioCards;

    const M = 1.15; // Global scaling multiplier to increase card sizes
    const CFG = {
      CARD_W: 320,          // Cards are taller than wide in screen-space
      CARD_H: 430,
      SPACING_X: 200 * M,   // Scale spacing proportionally to preserve the 30% overlap feel
      DEPTH_FACTOR: 1.1,    // Recalculated depth to bleed off edges naturally
      DIAG_Y_FACTOR: 0.65,  // Diagonal angle roughly ~35° from horizontal
      CARD_ROT_Y: -28,
      LERP_SPEED: 0.07,
      SCROLL_SENS: 0.0036,
      DRAG_SENS: 0.006,
      HOVER_Z_PUSH: 80,
      HOVER_Y_LIFT: -20,
      VISIBLE_RADIUS: 7.5,  // ~9-10 cards visible on screen simultaneously
    };

    const N = CARDS.length;

    const belt = document.getElementById('unveil-belt');
    const cursorLabel = document.getElementById('unveil-cursor-label');
    const labelText = document.getElementById('unveil-label-text');
    const fogCvs = document.getElementById('unveil-fog-canvas');
    const descBlock = document.getElementById('unveil-image-desc');
    const descTitle = document.getElementById('desc-title');
    const descText = document.getElementById('desc-text');
    const introEl = document.getElementById('unveil-intro');

    let descTimeout;

    // Clear belt in case of React strict mode double render
    belt.innerHTML = '';

    const cardEls = CARDS.map((data, i) => {
      const el = document.createElement('div');

      const cardW = (data.width || CFG.CARD_W) * M;
      const cardH = (data.height || CFG.CARD_H) * M;

      el.className = 'unveil-card';
      el.style.width = cardW + 'px';
      el.style.height = cardH + 'px';
      el.style.left = (-cardW / 2) + 'px';
      el.style.top = (-cardH / 2) + 'px';

      const inner = document.createElement('div');
      inner.className = 'unveil-card-inner';

      let canvas = null;
      let img = null;

      if (data.imgSrc) {
        img = document.createElement('img');
        img.src = data.imgSrc;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        img.style.display = 'block';
        img.style.opacity = '0.94';
        img.style.transition = 'opacity 0.35s';
        inner.appendChild(img);
      } else if (data.draw) {
        canvas = document.createElement('canvas');
        canvas.width = cardW * 2;
        canvas.height = cardH * 2;
        canvas.style.width = cardW + 'px';
        canvas.style.height = cardH + 'px';
        data.draw(canvas.getContext('2d'), cardW * 2, cardH * 2);
        inner.appendChild(canvas);
      }

      const glass = document.createElement('div');
      glass.className = 'unveil-glass-layer';
      inner.appendChild(glass);

      el.appendChild(inner);
      belt.appendChild(el);
      return { el, canvas, img, glassEl: glass, label: data.label, description: data.description };
    });

    const fogCtx = fogCvs.getContext('2d');
    function resizeFog() {
      if (!fogCvs) return;
      fogCvs.width = window.innerWidth;
      fogCvs.height = window.innerHeight;
    }
    resizeFog();

    const handleResize = () => resizeFog();
    window.addEventListener('resize', handleResize);

    function drawFog() {
      if (!fogCvs || !fogCtx) return;
      const W = fogCvs.width, H = fogCvs.height;
      fogCtx.clearRect(0, 0, W, H);

      const bg = [236, 234, 229];

      const gBL = fogCtx.createLinearGradient(0, H, W * 0.52, H * 0.2);
      gBL.addColorStop(0, `rgba(${bg},0.96)`);
      gBL.addColorStop(0.18, `rgba(${bg},0.75)`);
      gBL.addColorStop(0.38, `rgba(${bg},0.32)`);
      gBL.addColorStop(0.55, `rgba(${bg},0)`);
      fogCtx.fillStyle = gBL; fogCtx.fillRect(0, 0, W, H);

      const gTR = fogCtx.createLinearGradient(W, 0, W * 0.48, H * 0.78);
      gTR.addColorStop(0, `rgba(${bg},0.96)`);
      gTR.addColorStop(0.18, `rgba(${bg},0.72)`);
      gTR.addColorStop(0.38, `rgba(${bg},0.28)`);
      gTR.addColorStop(0.55, `rgba(${bg},0)`);
      fogCtx.fillStyle = gTR; fogCtx.fillRect(0, 0, W, H);
    }

    let offset = 0, targetOffset = 0;
    let isDragging = false, dragStartX = 0, dragStartOffset = 0;
    let mouseX = 0, mouseY = 0;
    let hoveredIdx = -1;
    const hoverLerp = new Float32Array(N);

    const handleMouseMoveGlobal = e => {
      mouseX = e.clientX; mouseY = e.clientY;
      if (!isDragging && cursorLabel)
        cursorLabel.style.transform = `translate(${mouseX + 20}px,${mouseY - 12}px)`;
    };
    window.addEventListener('mousemove', handleMouseMoveGlobal);

    function updateLabelColour(c) {
      try {
        let r = 0, g = 0, b = 0, cnt = 0;

        if (c.canvas) {
          const rect = c.el.getBoundingClientRect();
          const rx = mouseX - rect.left, ry = mouseY - rect.top;
          const scaleX = 2, scaleY = 2; // Since canvas.width is twice the CSS width
          const px = Math.floor(rx * scaleX), py = Math.floor(ry * scaleY);
          const data = c.canvas.getContext('2d').getImageData(
            Math.max(0, px - 4), Math.max(0, py - 4), 10, 10
          ).data;
          for (let i = 0; i < data.length; i += 4) { r += data[i]; g += data[i + 1]; b += data[i + 2]; cnt++; }
        } else if (c.img) {
          // If it's an image, we use a default bright color so the label stays dark
          // (Since reading pixels from images via Canvas API can throw Cross-Origin security errors)
          r = 200; g = 200; b = 200; cnt = 1;
        }

        r = r / cnt; g = g / cnt; b = b / cnt;
        const lum = 0.299 * r + 0.587 * g + 0.114 * b;
        if (lum < 100) {
          labelText.style.color = 'rgba(240,238,232,0.95)';
          labelText.style.background = 'rgba(10,8,6,0.45)';
          labelText.style.borderColor = 'rgba(255,255,255,0.12)';
        } else {
          labelText.style.color = 'rgba(20,18,14,0.9)';
          labelText.style.background = 'rgba(236,234,229,0.82)';
          labelText.style.borderColor = 'rgba(0,0,0,0.1)';
        }
      } catch (e) { }
    }

    cardEls.forEach((c, i) => {
      c.handleMouseEnter = () => {
        hoveredIdx = i;
        c.el.classList.add('hovered');
        labelText.textContent = c.label;
        cursorLabel.classList.add('visible');
        if (descBlock) {
          clearTimeout(descTimeout);
          descBlock.classList.remove('visible');
          descTimeout = setTimeout(() => {
            descTitle.textContent = c.label;
            descText.innerHTML = (c.description || '').replace(/\n/g, '<br/>');
            descBlock.classList.add('visible');
          }, 300);
        }
        updateLabelColour(c);
      };
      c.handleMouseMove = () => updateLabelColour(c);
      c.handleMouseLeave = () => {
        if (hoveredIdx === i) hoveredIdx = -1;
        c.el.classList.remove('hovered');
        cursorLabel.classList.remove('visible');
        clearTimeout(descTimeout);
        if (descBlock) descBlock.classList.remove('visible');
      };

      c.el.addEventListener('mouseenter', c.handleMouseEnter);
      c.el.addEventListener('mousemove', c.handleMouseMove);
      c.el.addEventListener('mouseleave', c.handleMouseLeave);
    });

    function renderCards() {
      cardEls.forEach((c, i) => {
        let t = i - offset;
        t = ((t % N) + N) % N;
        if (t > N / 2) t -= N;

        const x = t * CFG.SPACING_X;
        const z = -x * CFG.DEPTH_FACTOR;
        const screenY = -x * CFG.DIAG_Y_FACTOR;

        const targetH = (hoveredIdx === i && !isDragging) ? 1 : 0;
        hoverLerp[i] += (targetH - hoverLerp[i]) * 0.1;
        const hv = hoverLerp[i];

        c.el.style.transform =
          `translateX(${x}px) translateY(${screenY - hv * CFG.HOVER_Y_LIFT}px) translateZ(${z + hv * CFG.HOVER_Z_PUSH}px) rotateY(${CFG.CARD_ROT_Y}deg)`;

        const absT = Math.abs(t);
        // The depth blur is very gentle — only the very back ones blur
        const blurPx = t > 2.5 ? (t - 2.5) * 0.8 : 0;
        c.el.style.filter = blurPx > 0.1 ? `blur(${blurPx.toFixed(2)}px)` : '';

        // Cards have very subtle glass tint — mostly transparent, slight grey wash
        const depthTint = Math.min(0.25, 0.02 + Math.max(0, t) * 0.035);
        c.glassEl.style.background = `rgba(20,18,16,${depthTint})`;

        const edgeFade = Math.max(0, 1 - Math.max(0, absT - (CFG.VISIBLE_RADIUS - 1.5)));
        c.el.style.opacity = String(edgeFade);
      });
    }

    let animationFrameId;
    function loop() {
      offset += (targetOffset - offset) * CFG.LERP_SPEED;
      renderCards();
      drawFog();
      animationFrameId = requestAnimationFrame(loop);
    }

    const handleWheel = e => {
      e.preventDefault();
      targetOffset += e.deltaY * CFG.SCROLL_SENS;
    };

    const container = containerRef.current;
    container.addEventListener('wheel', handleWheel, { passive: false });

    const handleMouseDown = e => {
      isDragging = true; dragStartX = e.clientX; dragStartOffset = targetOffset;
      document.body.classList.add('unveil-dragging');
      if (cursorLabel) cursorLabel.classList.remove('visible');
    };
    const handleMouseMoveDrag = e => {
      if (!isDragging) return;
      targetOffset = dragStartOffset - (e.clientX - dragStartX) * CFG.DRAG_SENS;
    };
    const handleMouseUp = () => {
      isDragging = false;
      document.body.classList.remove('unveil-dragging');
    };
    const handleTouchStart = e => {
      isDragging = true; dragStartX = e.touches[0].clientX; dragStartOffset = targetOffset;
    };
    const handleTouchMove = e => {
      if (!isDragging) return;
      targetOffset = dragStartOffset - (e.touches[0].clientX - dragStartX) * CFG.DRAG_SENS;
    };
    const handleTouchEnd = () => { isDragging = false; };

    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMoveDrag);
    window.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    document.getElementById('btn-overview')?.addEventListener('click', function () {
      document.querySelectorAll('.ctrl-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
    document.getElementById('btn-index')?.addEventListener('click', function () {
      document.querySelectorAll('.ctrl-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      targetOffset = Math.round(targetOffset);
    });

    loop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMoveGlobal);
      window.removeEventListener('mousemove', handleMouseMoveDrag);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('touchstart', handleTouchStart);

      cardEls.forEach(c => {
        c.el.removeEventListener('mouseenter', c.handleMouseEnter);
        c.el.removeEventListener('mousemove', c.handleMouseMove);
        c.el.removeEventListener('mouseleave', c.handleMouseLeave);
      });
    };
  }, []);

  return (
    <div ref={containerRef} className="unveil-container">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&display=swap');
        .unveil-container {
          width: 100vw; height: 100vh;
          overflow: hidden;
          background: #eceae5;
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          cursor: grab;
          user-select: none; -webkit-user-select: none;
          position: fixed;
          top: 0; left: 0; z-index: 9999;
        }
        body.unveil-dragging .unveil-container { cursor: grabbing; }

        .halo-tl, .halo-br {
          position: absolute; pointer-events: none; z-index: 1;
        }
        .halo-tl {
          top: -15vh; left: -15vw; width: 65vw; height: 65vh;
          background: radial-gradient(ellipse at 18% 18%,
            rgba(205,200,190,0.3) 0%, rgba(215,210,200,0.15) 28%, transparent 70%);
          filter: blur(50px);
          animation: haloPulse 9s ease-in-out infinite alternate;
        }
        .halo-br {
          bottom: -15vh; right: -15vw; width: 65vw; height: 65vh;
          background: radial-gradient(ellipse at 82% 82%,
            rgba(198,193,183,0.3) 0%, rgba(208,203,193,0.15) 28%, transparent 70%);
          filter: blur(50px);
          animation: haloPulse 9s ease-in-out infinite alternate-reverse;
        }
        @keyframes haloPulse {
          0%   { opacity: 0.35; transform: scale(1); }
          100% { opacity: 0.65; transform: scale(1.1); }
        }

        #unveil-fog-canvas {
          position: absolute; inset: 0;
          width: 100vw; height: 100vh;
          pointer-events: none; z-index: 50;
        }

        .grain {
          position: absolute; inset: 0; pointer-events: none; z-index: 3;
          opacity: 0.028;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 180px 180px;
          animation: grainShift 0.12s steps(1) infinite;
        }
        @keyframes grainShift {
          0%  { background-position: 0 0; }
          25% { background-position: -60px 25px; }
          50% { background-position: 35px -30px; }
          75% { background-position: -25px 55px; }
        }

        .unveil-nav { position: absolute; top: 0; left: 0; display: flex; z-index: 400; }
        .unveil-nav-item {
          padding: 18px 26px 16px;
          font-size: 9.5px; letter-spacing: 0.16em; text-transform: uppercase;
          color: #a8a49e;
          background: rgba(236,234,229,0.78); backdrop-filter: blur(14px);
          border-right: 1px solid rgba(0,0,0,0.06); transition: color 0.25s;
        }
        .unveil-nav-item:first-child { color: #1a1916; }
        .unveil-nav-item:hover { color: #3a3830; }

        .unveil-scene {
          position: absolute; inset: 0;
          perspective: 1100px;
          perspective-origin: 50% 26%;
          z-index: 10;
        }
        .unveil-belt {
          position: absolute;
          left: 40%; top: 55%; /* Centre of belt skewed left-centre */
          transform-style: preserve-3d;
        }

        .unveil-card {
          position: absolute;
          border-radius: 2px;
          overflow: visible; 
          will-change: transform, filter;
          cursor: pointer;
          background: transparent;
          box-shadow:
            4px 6px 0 1px rgba(0,0,0,0.55),
            0 14px 60px rgba(0,0,0,0.42),
            0 2px 8px rgba(0,0,0,0.3);
          transition: box-shadow 0.35s ease, opacity 0.35s ease;
        }

        .unveil-card-inner {
          position: relative;
          width: 100%; height: 100%;
          border-radius: 2px;
          overflow: hidden;
        }

        .unveil-card canvas { display: block; opacity: 0.94; transition: opacity 0.35s; }

        .unveil-card .unveil-glass-layer {
          position: absolute; inset: 0;
          background: rgba(24,22,20,0.18);
          pointer-events: none; z-index: 1;
          transition: background 0.2s;
        }

        .unveil-card-inner::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(148deg,
            rgba(255,255,255,0.18) 0%,
            rgba(255,255,255,0.06) 30%,
            transparent 55%
          );
          z-index: 3; pointer-events: none; border-radius: 2px;
        }

        .unveil-card-inner::after {
          content: '';
          position: absolute; inset: 0; border-radius: 2px;
          box-shadow: inset 0 0 0 0.75px rgba(255,255,255,0.2),
                      inset 0 1px 0 rgba(255,255,255,0.3);
          z-index: 4; pointer-events: none;
        }

        .unveil-card.hovered {
          box-shadow:
            5px 8px 0 1px rgba(0,0,0,0.6),
            0 28px 90px rgba(0,0,0,0.6),
            0 4px 16px rgba(0,0,0,0.35);
        }
        .unveil-card.hovered canvas, .unveil-card.hovered img { opacity: 1; }

        #unveil-cursor-label {
          position: absolute; pointer-events: none;
          z-index: 500; opacity: 0;
          transition: opacity 0.22s ease;
          will-change: transform;
        }
        #unveil-cursor-label .label-inner {
          font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase;
          white-space: nowrap;
          padding: 5px 11px 4px;
          border: 0.5px solid rgba(128,128,128,0.2);
          transition: color 0.15s, background 0.15s;
        }
        #unveil-cursor-label.visible { opacity: 1; }

        .unveil-intro {
          position: absolute; top: 110px; left: 40px; transform: none;
          max-width: 340px; text-align: left;
          color: #1a1916; z-index: 600;
          opacity: 1; transition: opacity 2s ease, transform 2s ease, filter 2s ease;
          pointer-events: none;
        }
        .unveil-intro.hidden {
          opacity: 0; transform: translateY(-15px); filter: blur(10px);
        }
        .unveil-intro h1 {
          font-family: 'Cinzel', serif; font-size: 20px; font-weight: 600;
          letter-spacing: 0.1em; margin-bottom: 24px; text-transform: uppercase;
        }
        .unveil-intro p {
          font-size: 11px; line-height: 1.6; letter-spacing: 0.04em; color: #4a4943;
        }

        .unveil-image-desc {
          position: absolute; bottom: 80px; right: 40px;
          max-width: 380px;
          text-align: right;
          z-index: 500; opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.6s ease, transform 0.6s ease;
          pointer-events: none;
        }
        .unveil-image-desc.visible { opacity: 1; transform: translateY(0); }
        .unveil-image-desc h3 {
          font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase;
          color: #1a1916; margin-bottom: 8px; font-weight: 600;
        }
        .unveil-image-desc p {
          font-size: 10px; line-height: 1.5; color: #5a5850;
          letter-spacing: 0.05em; margin: 0;
        }

        .controls {
          position: absolute; bottom: 22px; right: 22px;
          display: flex; z-index: 400;
          border: 1px solid rgba(0,0,0,0.09);
        }
        .ctrl-btn {
          padding: 10px 20px;
          font-size: 8.5px; letter-spacing: 0.16em; text-transform: uppercase;
          border: none; border-right: 1px solid rgba(0,0,0,0.07);
          background: rgba(236,234,229,0.9); backdrop-filter: blur(10px);
          color: #c0bdb6; cursor: pointer; transition: color 0.2s;
        }
        .ctrl-btn:last-child { border-right: none; }
        .ctrl-btn.active { color: #1a1916; }

        .hint {
          position: absolute; bottom: 26px; left: 50%; transform: translateX(-50%);
          font-size: 8.5px; letter-spacing: 0.18em; text-transform: uppercase;
          color: #c4c0b8; z-index: 400;
          animation: fadeOut 2.2s ease 3s forwards;
        }
        @keyframes fadeOut { to { opacity: 0; pointer-events: none; } }
      `}</style>

      <div className="halo-tl"></div>
      <div className="halo-br"></div>
      <div className="grain"></div>
      <canvas id="unveil-fog-canvas"></canvas>

      <nav className="unveil-nav">
        <div className="unveil-nav-item">HOME</div>
        <div className="unveil-nav-item">PHOTOS</div>
        <div className="unveil-nav-item">DESIGN</div>
        <div className="unveil-nav-item">SKILLS</div>
        <div className="unveil-nav-item">ABOUT ME</div>
      </nav>

      <div className="unveil-scene">
        <div className="unveil-belt" id="unveil-belt"></div>
      </div>

      <div id="unveil-cursor-label"><div className="label-inner" id="unveil-label-text"></div></div>

      <div id="unveil-image-desc" className="unveil-image-desc">
        <h3 id="desc-title"></h3>
        <p id="desc-text"></p>
      </div>

      <div id="unveil-intro" className="unveil-intro">
        <h1>Fragments of Light: Stories from Earth, Sky & Silence</h1>
        <p>From the untamed forests of Ranthambore and Kaziranga to the rugged mountains of Spiti Valley, the mist-covered landscapes of Arunachal Pradesh and Meghalaya, and the carefully controlled atmosphere of a professional studio, this collection explores the relationship between light, emotion, and storytelling. Each image captures a fleeting moment—whether found in the wilderness, beneath a star-filled sky, or crafted through cinematic lighting—and transforms it into a lasting visual narrative. Together, these photographs celebrate curiosity, adventure, solitude, and the extraordinary beauty hidden within everyday moments.</p>
      </div>

      <div className="controls">
        <button className="ctrl-btn active" id="btn-overview">Overview</button>
        <button className="ctrl-btn" id="btn-index">Index</button>
      </div>
      <div className="hint">Scroll or drag to explore</div>
    </div>
  );
}
