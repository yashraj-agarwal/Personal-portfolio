import React from 'react';

const LiquidGlassFilter = () => {
  return (
    <svg style={{ display: 'none' }}>
      <filter id="navbar-liquid-glass">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.001 0.002"
          numOctaves="1"
          result="turbulence"
        />
        <feGaussianBlur
          in="turbulence"
          stdDeviation="3"
          result="softMap"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="softMap"
          scale="8"
          xChannelSelector="R"
          yChannelSelector="G"
          result="displacement"
        />
        <feSpecularLighting
          in="softMap"
          surfaceScale="5"
          specularConstant="1"
          specularExponent="100"
          lightingColor="white"
          result="specular"
        >
          <fePointLight
            x="-200"
            y="-200"
            z="300"
          />
        </feSpecularLighting>
        <feComposite
          in="displacement"
          in2="specular"
          operator="arithmetic"
          k1="0" k2="1" k3="1" k4="0"
        />
      </filter>
    </svg>
  );
};

export default LiquidGlassFilter;
