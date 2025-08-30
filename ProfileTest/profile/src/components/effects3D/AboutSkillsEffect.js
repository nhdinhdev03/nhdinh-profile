import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, PresentationControls, useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Component cho mỗi card 3D
const SkillCard = ({ position, rotation, skill, index, hovered }) => {
  const meshRef = useRef();
  const [hover, setHover] = useState(false);
  const color = new THREE.Color();
  const targetPos = [...position];
  
  // Map skills to colors
  const colorMap = {
    'Frontend': '#61DAFB',
    'Backend': '#68A063', 
    'Cloud & DevOps': '#4ECDC4'
  };

  const skillColor = colorMap[skill.title] || '#9B59B6';
  
  // Animation
  useFrame((state) => {
    if (meshRef.current) {
      // Hover effect
      if (hover) {
        meshRef.current.rotation.z = THREE.MathUtils.lerp(
          meshRef.current.rotation.z,
          -0.2 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05,
          0.05
        );
        meshRef.current.position.y = THREE.MathUtils.lerp(
          meshRef.current.position.y,
          position[1] + 0.2,
          0.1
        );
        meshRef.current.material.color.lerp(color.set(skillColor), 0.1);
      } else {
        meshRef.current.rotation.z = THREE.MathUtils.lerp(
          meshRef.current.rotation.z,
          rotation[2] + Math.sin(state.clock.elapsedTime * 0.3 + index) * 0.05,
          0.05
        );
        meshRef.current.position.y = THREE.MathUtils.lerp(
          meshRef.current.position.y,
          position[1] + Math.sin(state.clock.elapsedTime * 0.5 + index * 0.2) * 0.1,
          0.05
        );
        meshRef.current.material.color.lerp(color.set('#ffffff'), 0.1);
      }
      
      // Rotate cards in circle
      meshRef.current.rotation.y = rotation[1] + state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      scale={hover ? 1.15 : 1}
    >
      <planeGeometry args={[1.5, 0.8, 1]} />
      <meshStandardMaterial 
        color="white" 
        metalness={0.5}
        roughness={0.2}
        transparent
        opacity={0.9}
      />
      <Text
        position={[0, 0.1, 0.05]}
        fontSize={0.15}
        color="#000000"
        anchorX="center"
        anchorY="middle"
      >
        {skill.title}
      </Text>
      <Text
        position={[0, -0.15, 0.05]}
        fontSize={0.08}
        color="#555555"
        anchorX="center"
        anchorY="middle"
      >
        {skill.skills[0].name}
      </Text>
    </mesh>
  );
};

const FloatingCards = ({ skillGroups }) => {
  const [hovered, setHovered] = useState(null);
  
  return skillGroups.map((skill, index) => {
    // Position in a circle
    const angle = (index / skillGroups.length) * Math.PI * 2;
    const radius = 2.2;
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;
    
    return (
      <SkillCard
        key={index}
        position={[x, 0, z]}
        rotation={[0, -angle + Math.PI, 0]}
        skill={skill}
        index={index}
        hovered={hovered === index}
        setHovered={() => setHovered(index)}
      />
    );
  });
};

const AboutSkillsEffect = ({ className, skillGroups }) => {
  return (
    <div className={`absolute inset-0 z-0 opacity-80 ${className || ''}`}>
      <Canvas camera={{ position: [0, 2, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <PresentationControls
          global
          zoom={0.8}
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 4, Math.PI / 4]}
          azimuth={[-Math.PI / 4, Math.PI / 4]}
        >
          <FloatingCards skillGroups={skillGroups} />
        </PresentationControls>
      </Canvas>
    </div>
  );
};

export default AboutSkillsEffect;
