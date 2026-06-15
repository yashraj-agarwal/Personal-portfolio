import React, { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export default function ThreeMacbook({ onLoadComplete }) {
  const group = useRef();
  const { scene: laptop } = useGLTF('/asus_rog_strix_scar_17_2023_g733_gaming_laptop.glb');
  const baseQuaternion = useRef(new THREE.Quaternion());
  const { camera, mouse, size } = useThree();
  const target = useRef({ x: 0, y: 0 });
  const maxDimension = useRef(1.0);

  // Store RGB materials to animate them
  const rgbMaterials = useRef([]);

  const onLoadRef = useRef(onLoadComplete);
  useEffect(() => {
    onLoadRef.current = onLoadComplete;
  }, [onLoadComplete]);

  useEffect(() => {
    if (laptop) {
      // Centre & scale
      const box = new THREE.Box3().setFromObject(laptop);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      maxDimension.current = maxDim;

      const scale = 2.1 / maxDim;

      laptop.scale.setScalar(scale);
      laptop.position.sub(center.multiplyScalar(scale));

      // Tilt: isometric-ish presentation
      laptop.rotation.x = 0.32;
      laptop.rotation.y = -0.38;

      baseQuaternion.current.setFromEuler(laptop.rotation);

      const maxAnisotropy = 16;

      laptop.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = false;

          if (child.material) {
            const mats = Array.isArray(child.material) ? child.material : [child.material];
            mats.forEach(m => {
              // Improve texture quality to remove jagged Moire patterns
              ['map', 'normalMap', 'roughnessMap', 'metalnessMap'].forEach(mapType => {
                if (m[mapType]) {
                  m[mapType].anisotropy = maxAnisotropy;
                  m[mapType].minFilter = THREE.LinearMipmapLinearFilter;
                  m[mapType].magFilter = THREE.LinearFilter;
                }
              });

              if (m.map) m.map.colorSpace = THREE.SRGBColorSpace;
              if (m.emissiveMap) m.emissiveMap.colorSpace = THREE.SRGBColorSpace;

              if (m.envMapIntensity !== undefined) m.envMapIntensity = 1.2;
              if (m.metalness !== undefined) m.metalness = Math.min(1, m.metalness * 1.2);

              // Boost RGB emissive properties safely for UnrealBloomPass
              if (m.emissiveIntensity !== undefined && m.emissiveIntensity > 0) {
                m.emissiveIntensity = 2.5;
                if (m.emissive && !m.map && !m.emissiveMap && (m.emissive.r > 0 || m.emissive.g > 0 || m.emissive.b > 0)) {
                  if (!rgbMaterials.current.includes(m)) {
                    rgbMaterials.current.push(m);
                  }
                }
              }

              m.needsUpdate = true;
            });
          }
        }
      });

      // Set initial positions immediately without rising animation
      if (group.current) {
        const isMobile = window.innerWidth < 768;
        const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
        group.current.position.y = isMobile ? 0.2 : isTablet ? 0.6 : 1.4;
        group.current.position.x = isMobile ? 0 : isTablet ? 1.8 : 4.8;
      }

      if (onLoadRef.current) onLoadRef.current();
    }
  }, [laptop]);

  useFrame((state) => {
    if (!laptop || !group.current) return;

    const time = state.clock.elapsedTime;

    // Animate RGB Lighting with ripple effect
    rgbMaterials.current.forEach((m, idx) => {
      m.emissive.setHSL(((time * 0.4) + (idx * 0.05)) % 1, 1, 0.5);
    });

    // Responsive position and scale adjustments dynamically (placed in North East / top-right)
    const isMobile = size.width < 768;
    const isTablet = size.width >= 768 && size.width < 1024;

    const targetPosX = isMobile ? 0 : isTablet ? 1.8 : 4.8;
    const targetPosY = isMobile ? 0.2 : isTablet ? 0.6 : 1.4;
    const targetPosZ = isMobile ? -0.5 : isTablet ? -0.2 : 0;

    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, targetPosX, 0.05);
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, targetPosY, 0.05);
    group.current.position.z = THREE.MathUtils.lerp(group.current.position.z, targetPosZ, 0.05);

    // Responsive scale without hover animation
    const targetScaleBase = isMobile ? 0.85 : isTablet ? 1.0 : 1.30;
    const targetScale = targetScaleBase / maxDimension.current;
    laptop.scale.setScalar(THREE.MathUtils.lerp(laptop.scale.x, targetScale, 0.08));

    // Interactive Parallax
    target.current.x += (mouse.x - target.current.x) * 0.08;
    target.current.y += (mouse.y - target.current.y) * 0.08;

    const parallaxX = target.current.y * 0.25;
    const parallaxY = target.current.x * 0.35;

    const floatY = Math.sin(time * 0.6) * 0.02;
    const floatRot = Math.sin(time * 0.4) * 0.015;

    laptop.rotation.x = 0.32 + parallaxX + floatY;
    laptop.rotation.y = -0.38 + parallaxY + floatRot;

    // Subtle camera drift
    camera.position.x += (target.current.x * 0.3 - camera.position.x) * 0.05;
    camera.position.y += (target.current.y * 0.15 + 1.2 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={group} position={[window.innerWidth < 768 ? 0 : window.innerWidth < 1024 ? 1.8 : 4.8, window.innerWidth < 768 ? 0.2 : window.innerWidth < 1024 ? 0.6 : 1.4, 0]}>
      <primitive object={laptop} />
      {/* Ground reflection plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-1.2, -1.5, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color={0x111111} roughness={0.9} metalness={0.0} transparent opacity={0.0} />
      </mesh>
    </group>
  );
}

useGLTF.preload('/asus_rog_strix_scar_17_2023_g733_gaming_laptop.glb');
