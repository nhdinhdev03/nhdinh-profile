import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Image, Text, useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Component cho mỗi project card 3D
const ProjectCard = ({ project, index, active, setActive, totalProjects }) => {
  const ref = useRef();
  const { viewport } = useThree();
  const [hovered, setHovered] = useState(false);
  
  // Tính toán vị trí của card trong carousel
  const angle = (index / totalProjects) * Math.PI * 2;
  const radius = 4;
  const targetX = Math.sin(angle) * radius;
  const targetZ = Math.cos(angle) * radius;
  
  // Xử lý texture an toàn với fallback
  const [texture, setTexture] = useState(null);
  
  useEffect(() => {
    // Khởi tạo texture mặc định
    const defaultTexture = new THREE.Texture();
    defaultTexture.needsUpdate = true;
    setTexture(defaultTexture);
    
    // Tải texture từ SVG (đáng tin cậy hơn)
    new THREE.TextureLoader().load(
      '/images/project-placeholder.svg',
      (loadedTexture) => {
        setTexture(loadedTexture);
      },
      undefined,
      (error) => {
        console.log('Texture loading error, using fallback');
      }
    );
  }, []);
  
  useFrame((state) => {
    if (ref.current) {
      // Animation for carousel rotation
      const targetRotY = -angle + Math.PI;
      ref.current.rotation.y = THREE.MathUtils.lerp(
        ref.current.rotation.y,
        hovered ? targetRotY - 0.1 : targetRotY,
        0.1
      );
      
      // Scale up when active or hovered
      const targetScale = active === index ? 1.2 : hovered ? 1.1 : 1;
      ref.current.scale.x = THREE.MathUtils.lerp(
        ref.current.scale.x,
        targetScale,
        0.1
      );
      ref.current.scale.y = THREE.MathUtils.lerp(
        ref.current.scale.y,
        targetScale,
        0.1
      );
      ref.current.scale.z = THREE.MathUtils.lerp(
        ref.current.scale.z,
        targetScale,
        0.1
      );
      
      // Slight floating animation
      ref.current.position.y = 0 + Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.05;
    }
  });
  
  return (
    <group
      ref={ref}
      position={[targetX, 0, targetZ]}
      onClick={() => setActive(index)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.5, 0.9, 0.05]} />
        <meshStandardMaterial 
          color={hovered || active === index ? "#4B7BEC" : "white"}
          metalness={0.5}
          roughness={0.2}
        />
      </mesh>
      
      {/* Project thumbnail */}
      <mesh position={[0, 0, 0.03]}>
        <planeGeometry args={[1.3, 0.5]} />
        {texture ? (
          <meshBasicMaterial map={texture} />
        ) : (
          <meshBasicMaterial color="#4B7BEC" />
        )}
      </mesh>
      
      {/* Project title */}
      <Text
        position={[0, -0.32, 0.06]}
        fontSize={0.08}
        maxWidth={1.2}
        textAlign="center"
        color="#000000"
      >
        {project.title}
      </Text>
    </group>
  );
};

// Component nằm trong Canvas
const CarouselContent = ({ projects }) => {
  const [active, setActive] = useState(0);
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      // Rotate the entire carousel
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });
  
  return (
    <group ref={groupRef}>
      {projects.map((project, index) => (
        <ProjectCard 
          key={project.id}
          project={project}
          index={index}
          active={active}
          setActive={setActive}
          totalProjects={projects.length}
        />
      ))}
    </group>
  );
};

const Projects3DCarousel = ({ projects, className }) => {

  return (
    <div className={`absolute inset-0 z-0 ${className || ''}`}>
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }} shadows>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} castShadow />
        <CarouselContent projects={projects} />
      </Canvas>
    </div>
  );
};

export default Projects3DCarousel;
