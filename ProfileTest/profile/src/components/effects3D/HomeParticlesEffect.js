import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Component tạo các particles 3D
const ParticlesSphere = ({ count = 1000 }) => {
  const pointsRef = useRef();
  
  // Generate random points on sphere surface
  const particles = useMemo(() => {
    const temp = [];
    const radius = 1.5;
    
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + Math.random() * 2);
      const theta = Math.random() * Math.PI * 2;
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      temp.push(x, y, z);
    }
    
    return new Float32Array(temp);
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    pointsRef.current.rotation.x = Math.sin(time / 4) * 0.3;
    pointsRef.current.rotation.y = time * 0.15;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <PointMaterial 
        transparent
        size={0.03} 
        sizeAttenuation={true} 
        color="#4ECDC4" 
        depthWrite={false}
      />
    </points>
  );
};

const HomeParticlesEffect = ({ className }) => {
  return (
    <div className={`absolute inset-0 z-0 ${className || ''}`}>
      <Canvas camera={{ position: [0, 0, 3.5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <ParticlesSphere />
      </Canvas>
    </div>
  );
};

export default HomeParticlesEffect;
