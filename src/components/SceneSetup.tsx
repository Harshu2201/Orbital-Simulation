
import React, { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Html } from '@react-three/drei';
import Planet from './Planet';
import { PLANET_DATA } from '@/data/planetData';
import * as THREE from 'three';

interface SceneSetupProps {
  activePlanet: string | null;
  setActivePlanet: (name: string) => void;
  speed: number;
}

const SceneSetup: React.FC<SceneSetupProps> = ({ activePlanet, setActivePlanet, speed }) => {
  const { camera, scene } = useThree();
  const starsRef = useRef<THREE.Points>(null);
  const sunRef = useRef<THREE.Mesh>(null);
  
  useEffect(() => {
    camera.position.set(0, 10, 25);
    
    // Add a subtle fog to the scene for depth
    scene.fog = new THREE.FogExp2(0x000010, 0.005);
    
    return () => {
      scene.fog = null;
    };
  }, [camera, scene]);
  
  // Animate stars rotation
  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.y += 0.0001;
    }
    
    // Animate sun glow
    if (sunRef.current) {
      sunRef.current.scale.set(
        1 + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.02,
        1 + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.02,
        1 + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.02
      );
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#FDB813" />
      
      {/* Sun with pulsing effect */}
      <mesh ref={sunRef} position={[0, 0, 0]}>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshBasicMaterial color="#FDB813" />
        <Html position={[0, 3, 0]} distanceFactor={10}>
          <div className="bg-black/50 backdrop-blur-sm p-1 rounded whitespace-nowrap">
            <span className="text-yellow-400 font-bold text-sm">The Sun</span>
          </div>
        </Html>
        
        {/* Sun glow effect */}
        <mesh>
          <sphereGeometry args={[2.7, 32, 32]} />
          <meshBasicMaterial color="#FDB813" transparent opacity={0.2} />
        </mesh>
      </mesh>
      
      {/* Sun corona effect */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[3, 32, 32]} />
        <meshBasicMaterial
          color="#FDB813"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </mesh>
      
      {PLANET_DATA.map((planet) => (
        <Planet
          key={planet.name}
          name={planet.name}
          size={planet.size}
          position={planet.position as [number, number, number]}
          rotationSpeed={planet.rotationSpeed * speed}
          description={planet.description}
          facts={planet.facts}
          showInfo={activePlanet === planet.name}
          onClick={() => setActivePlanet(planet.name)}
        />
      ))}
      
      <OrbitControls 
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        zoomSpeed={0.5}
        panSpeed={0.5}
        rotateSpeed={0.5}
        minDistance={5}
        maxDistance={50}
      />
      
      <Stars
        ref={starsRef}
        radius={100}
        depth={50}
        count={7000}
        factor={4}
        fade
        speed={0.5}
      />
    </>
  );
};

export default SceneSetup;
