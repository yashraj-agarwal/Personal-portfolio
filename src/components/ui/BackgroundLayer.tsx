"use client"
import { useRef, useMemo, useEffect, useCallback } from "react"
import * as THREE from "three"

// Pure CSS animated gradient background — zero WebGL context, ~0 GPU memory
// Replaces the GLSL shader BackgroundLayer that was consuming a full WebGL context
export default function BackgroundLayer() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -100,
        pointerEvents: 'none',
        background: `
          radial-gradient(ellipse 80% 50% at 20% 40%, rgba(0, 80, 10, 0.18) 0%, transparent 60%),
          radial-gradient(ellipse 60% 40% at 80% 70%, rgba(13, 93, 244, 0.10) 0%, transparent 55%),
          radial-gradient(ellipse 100% 80% at 50% 100%, rgba(5, 20, 5, 0.5) 0%, transparent 70%),
          #050505
        `,
      }}
    />
  )
}
