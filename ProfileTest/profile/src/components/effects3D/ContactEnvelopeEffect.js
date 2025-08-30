import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Envelope component that opens and closes
const Envelope = ({ open }) => {
  const envelopeRef = useRef();
  const lidRef = useRef();
  const paperRef = useRef();
  
  // Animation
  useFrame(() => {
    if (lidRef.current) {
      // Animate the lid opening/closing
      lidRef.current.rotation.x = THREE.MathUtils.lerp(
        lidRef.current.rotation.x,
        open ? -Math.PI * 0.45 : 0,
        0.1
      );
    }
    
    if (paperRef.current) {
      // Animate the paper coming out
      paperRef.current.position.y = THREE.MathUtils.lerp(
        paperRef.current.position.y,
        open ? 0.3 : -0.2,
        0.1
      );
    }
  });
  
  return (
    <group ref={envelopeRef}>
      {/* Envelope base */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2, 0.1, 1.4]} />
        <meshStandardMaterial color="#e0e0e0" />
      </mesh>
      
      {/* Envelope sides */}
      <mesh position={[0, 0.2, 0.7]} castShadow>
        <boxGeometry args={[2, 0.5, 0.05]} />
        <meshStandardMaterial color="#d0d0d0" />
      </mesh>
      
      <mesh position={[0, 0.2, -0.7]} castShadow>
        <boxGeometry args={[2, 0.5, 0.05]} />
        <meshStandardMaterial color="#d0d0d0" />
      </mesh>
      
      <mesh position={[1, 0.2, 0]} castShadow>
        <boxGeometry args={[0.05, 0.5, 1.4]} />
        <meshStandardMaterial color="#d0d0d0" />
      </mesh>
      
      <mesh position={[-1, 0.2, 0]} castShadow>
        <boxGeometry args={[0.05, 0.5, 1.4]} />
        <meshStandardMaterial color="#d0d0d0" />
      </mesh>
      
      {/* Envelope lid */}
      <group ref={lidRef} position={[0, 0.25, 0.7]} rotation={[0, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[2, 0.05, 1.4]} />
          <meshStandardMaterial color="#f0f0f0" side={THREE.DoubleSide} />
        </mesh>
      </group>
      
      {/* Paper inside */}
      <group ref={paperRef} position={[0, -0.2, 0]}>
        <mesh castShadow>
          <boxGeometry args={[1.8, 0.05, 1.2]} />
          <meshStandardMaterial color="white" />
        </mesh>
        
        {/* Message lines */}
        <mesh position={[0, 0.03, 0.4]}>
          <planeGeometry args={[1.5, 0.1]} />
          <meshBasicMaterial color="#e0e0e0" />
        </mesh>
        
        <mesh position={[0, 0.03, 0.2]}>
          <planeGeometry args={[1.5, 0.1]} />
          <meshBasicMaterial color="#e0e0e0" />
        </mesh>
        
        <mesh position={[0, 0.03, 0]}>
          <planeGeometry args={[1.5, 0.1]} />
          <meshBasicMaterial color="#e0e0e0" />
        </mesh>
        
        <mesh position={[0, 0.03, -0.2]}>
          <planeGeometry args={[1.5, 0.1]} />
          <meshBasicMaterial color="#e0e0e0" />
        </mesh>
        
        <mesh position={[0, 0.03, -0.4]}>
          <planeGeometry args={[0.8, 0.1]} />
          <meshBasicMaterial color="#e0e0e0" />
        </mesh>
      </group>
    </group>
  );
};

// Flying particles component
const MessageParticles = () => {
  const particlesRef = useRef();
  
  // Generate random particles
  const particles = React.useMemo(() => {
    const temp = [];
    const count = 100;
    
    for (let i = 0; i < count; i++) {
      // Random position in sphere
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 10;
      
      // Random velocities
      const vx = (Math.random() - 0.5) * 0.05;
      const vy = (Math.random() - 0.5) * 0.05;
      const vz = (Math.random() - 0.5) * 0.05;
      
      temp.push({ pos: [x, y, z], vel: [vx, vy, vz] });
    }
    
    return temp;
  }, []);
  
  // Movement animation
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    
    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.05;
      
      for (let i = 0; i < particles.length; i++) {
        const i3 = i * 3;
        const { pos, vel } = particles[i];
        
        // Update particle position
        pos[0] += vel[0];
        pos[1] += vel[1];
        pos[2] += vel[2];
        
        // Boundary check
        if (Math.abs(pos[0]) > 5) vel[0] *= -1;
        if (Math.abs(pos[1]) > 5) vel[1] *= -1;
        if (Math.abs(pos[2]) > 5) vel[2] *= -1;
        
        // Update position attribute
        particlesRef.current.geometry.attributes.position.array[i3] = pos[0];
        particlesRef.current.geometry.attributes.position.array[i3 + 1] = pos[1];
        particlesRef.current.geometry.attributes.position.array[i3 + 2] = pos[2];
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length}
          array={new Float32Array(particles.flatMap(p => p.pos))}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.03} 
        color="#4B7BEC" 
        transparent
        opacity={0.8}
      />
    </points>
  );
};

const ContactEnvelopeEffect = ({ className }) => {
  const [open, setOpen] = useState(false);
  
  // Toggle envelope open/closed
  useEffect(() => {
    const interval = setInterval(() => {
      setOpen(prev => !prev);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`absolute inset-0 z-0 ${className || ''}`}>
      <Canvas camera={{ position: [0, 2, 5], fov: 50 }} shadows>
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={0.8}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <group position={[0, -0.5, 0]}>
          <Envelope open={open} />
        </group>
        <MessageParticles />
      </Canvas>
    </div>
  );
};

export default ContactEnvelopeEffect;
