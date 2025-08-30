import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { Points, PointMaterial, Float, Sphere, MeshDistortMaterial, OrbitControls, Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';

// Custom Shader Material for advanced effects
const AdvancedParticleShader = {
  vertexShader: `
    attribute float size;
    attribute vec3 customColor;
    varying vec3 vColor;
    varying float vSize;
    
    void main() {
      vColor = customColor;
      vSize = size;
      
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = size * (300.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    uniform float time;
    varying vec3 vColor;
    varying float vSize;
    
    void main() {
      vec2 center = gl_PointCoord - 0.5;
      float dist = length(center);
      
      if (dist > 0.5) discard;
      
      float alpha = 1.0 - (dist * 2.0);
      alpha *= sin(time * 2.0 + vSize * 10.0) * 0.3 + 0.7;
      
      gl_FragColor = vec4(vColor, alpha);
    }
  `
};

// Advanced Particle System
function AdvancedParticles({ count = 5000 }) {
  const mesh = useRef();
  const shader = useRef();

  const [positions, colors, sizes] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Create galaxy spiral pattern
      const i3 = i * 3;
      const radius = Math.random() * 25;
      const spinAngle = radius * 0.3;
      const branchAngle = (i % 3) * (Math.PI * 2) / 3;

      const randomX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1);
      const randomY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1);
      const randomZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1);

      positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

      // Color based on distance from center
      const mixedColor = new THREE.Color();
      mixedColor.lerpColors(
        new THREE.Color('#ff6030'),
        new THREE.Color('#1b3984'),
        radius / 25
      );

      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;

      sizes[i] = Math.random() * 6 + 2;
    }

    return [positions, colors, sizes];
  }, [count]);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
    if (shader.current) {
      shader.current.uniforms.time.value = state.clock.elapsedTime;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={colors.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          array={sizes}
          count={sizes.length}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={shader}
        vertexShader={AdvancedParticleShader.vertexShader}
        fragmentShader={AdvancedParticleShader.fragmentShader}
        uniforms={{
          time: { value: 0 }
        }}
        transparent
        vertexColors
        sizeAttenuation
      />
    </points>
  );
}

// Floating 3D Objects with Physics
function FloatingGeometry() {
  const meshRef = useRef();
  const mesh2Ref = useRef();
  const mesh3Ref = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.2;
      meshRef.current.rotation.y = time * 0.3;
      meshRef.current.position.y = Math.sin(time) * 0.5;
    }
    
    if (mesh2Ref.current) {
      mesh2Ref.current.rotation.z = time * 0.4;
      mesh2Ref.current.position.x = Math.cos(time * 0.5) * 2;
      mesh2Ref.current.position.z = Math.sin(time * 0.5) * 2;
    }
    
    if (mesh3Ref.current) {
      mesh3Ref.current.rotation.y = time * 0.6;
      mesh3Ref.current.position.y = Math.cos(time * 0.8) * 1.5;
    }
  });

  return (
    <>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh ref={meshRef} position={[3, 0, -5]} scale={0.8}>
          <icosahedronGeometry args={[1, 2]} />
          <MeshDistortMaterial
            color="#0ea5e9"
            transparent
            opacity={0.6}
            distort={0.3}
            speed={2}
            roughness={0.1}
          />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.5}>
        <mesh ref={mesh2Ref} position={[-3, 1, -3]} scale={0.6}>
          <octahedronGeometry args={[1, 1]} />
          <MeshDistortMaterial
            color="#8b5cf6"
            transparent
            opacity={0.4}
            distort={0.4}
            speed={3}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </Float>

      <Float speed={2.5} rotationIntensity={1.2} floatIntensity={2.5}>
        <mesh ref={mesh3Ref} position={[0, 2, -8]} scale={0.5}>
          <dodecahedronGeometry args={[1, 0]} />
          <MeshDistortMaterial
            color="#10b981"
            transparent
            opacity={0.5}
            distort={0.2}
            speed={1.5}
            emissive="#10b981"
            emissiveIntensity={0.2}
          />
        </mesh>
      </Float>
    </>
  );
}

// Advanced Lighting Setup
function AdvancedLighting() {
  return (
    <>
      <Environment resolution={512}>
        <Lightformer
          intensity={2}
          color="blue"
          position={[0, 5, -9]}
          rotation={[0, 0, Math.PI / 3]}
          scale={[10, 5, 1]}
        />
        <Lightformer
          intensity={3}
          color="red"
          position={[-5, 1, -1]}
          rotation={[0, 0, Math.PI / 3]}
          scale={[10, 2, 1]}
        />
        <Lightformer
          intensity={4}
          color="green"
          position={[10, 1, 0]}
          rotation={[0, 0, Math.PI / 3]}
          scale={[10, 2, 1]}
        />
      </Environment>
      
      <ambientLight intensity={0.1} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0ea5e9" />
      <spotLight
        position={[15, 20, 10]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        color="#8b5cf6"
      />
    </>
  );
}

const BackgroundAnimation = () => {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 20], fov: 75 }}
        style={{ background: 'transparent' }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
      >
        <AdvancedLighting />
        <AdvancedParticles count={8000} />
        <FloatingGeometry />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          autoRotate
          autoRotateSpeed={0.2}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
      
      {/* Advanced CSS Animations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Neural Network Animation */}
        <div className="neural-network">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="neural-node"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>
        
        {/* Matrix Rain Effect */}
        <div className="matrix-rain">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="matrix-column"
              style={{
                left: `${i * 2}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${8 + Math.random() * 4}s`,
              }}
            >
              {[...Array(20)].map((_, j) => (
                <span
                  key={j}
                  className="matrix-char"
                  style={{
                    opacity: Math.random(),
                    animationDelay: `${j * 0.1}s`,
                  }}
                >
                  {String.fromCharCode(0x30A0 + Math.random() * 96)}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BackgroundAnimation;
