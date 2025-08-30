import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Component cho paper card
const PaperCard = ({ index, position }) => {
  const ref = useRef();
  
  // Random starting positions for natural movement
  const randomOffset = useMemo(() => ({
    posOffset: [
      Math.random() * 0.5 - 0.25,
      Math.random() * 0.5 - 0.25,
      Math.random() * 0.5 - 0.25
    ],
    rotOffset: [
      Math.random() * 0.5 - 0.25,
      Math.random() * Math.PI * 2,
      Math.random() * 0.5 - 0.25
    ],
    speed: Math.random() * 0.5 + 0.5
  }), []);
  
  // Animation - chỉ chạy khi đã nằm trong Canvas
  useFrame(({ clock }) => {
    if (!ref.current) return;
    
    const time = clock.getElapsedTime();
    const { posOffset, rotOffset, speed } = randomOffset;
    
    // Position animation
    ref.current.position.y = position[1] + Math.sin(time * 0.5 * speed + index) * 0.3 + posOffset[1];
    ref.current.position.x = position[0] + Math.sin(time * 0.3 * speed + index) * 0.2 + posOffset[0];
    ref.current.position.z = position[2] + Math.cos(time * 0.4 * speed + index) * 0.2 + posOffset[2];
    
    // Rotation animation
    ref.current.rotation.x = Math.sin(time * 0.3 * speed) * 0.1 + rotOffset[0];
    ref.current.rotation.y = time * 0.1 * speed + rotOffset[1];
    ref.current.rotation.z = Math.sin(time * 0.2 * speed) * 0.05 + rotOffset[2];
  });
  
  // Random color for cards
  const color = useMemo(() => {
    const colors = ['#4B7BEC', '#45AAF2', '#2ECC71', '#A55EEA', '#FF6B6B'];
    return colors[Math.floor(Math.random() * colors.length)];
  }, []);

  return (
    <group ref={ref} position={position} castShadow>
      {/* Paper card */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.8, 1.1, 0.05]} />
        <meshStandardMaterial
          color="white"
          metalness={0.1}
          roughness={0.8}
        />
      </mesh>
      
      {/* Colored header */}
      <mesh position={[0, 0.4, 0.03]}>
        <planeGeometry args={[0.75, 0.2]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Content lines */}
      {[0, -0.15, -0.3, -0.45].map((y, i) => (
        <mesh key={i} position={[0, y, 0.03]}>
          <planeGeometry args={[0.65, 0.06]} />
          <meshStandardMaterial color="#f0f0f0" />
        </mesh>
      ))}
    </group>
  );
};

const BlogPapersEffect = ({ className }) => {
  // Generate random positions for paper cards
  const paperPositions = useMemo(() => {
    const positions = [];
    const count = 15;
    
    for (let i = 0; i < count; i++) {
      // Position in a spherical formation
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 3 + Math.random() * 2;
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = (Math.random() * 4) - 2;
      const z = radius * Math.sin(phi) * Math.sin(theta);
      
      positions.push([x, y, z]);
    }
    
    return positions;
  }, []);

  return (
    <div className={`absolute inset-0 z-0 opacity-50 ${className || ''}`}>
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[-10, 0, -20]} intensity={0.5} />
        <pointLight position={[0, -10, 0]} intensity={0.5} />
        
        {paperPositions.map((position, index) => (
          <PaperCard key={index} index={index} position={position} />
        ))}
      </Canvas>
    </div>
  );
};

export default BlogPapersEffect;
