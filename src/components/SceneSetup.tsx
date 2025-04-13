
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
  const sunGlowRef = useRef<THREE.Mesh>(null);
  const orbitLinesRef = useRef<THREE.Object3D>(null);
  
  useEffect(() => {
    camera.position.set(0, 10, 25);
    
    // Add a more atmospheric fog to the scene for depth
    scene.fog = new THREE.FogExp2(0x000010, 0.003);
    
    // Create orbit lines for each planet
    const orbitsGroup = new THREE.Group();
    
    PLANET_DATA.forEach(planet => {
      const orbitGeometry = new THREE.RingGeometry(
        Math.sqrt(planet.position[0]**2 + planet.position[2]**2) - 0.05,
        Math.sqrt(planet.position[0]**2 + planet.position[2]**2) + 0.05,
        128
      );
      const orbitMaterial = new THREE.MeshBasicMaterial({
        color: 0x444466,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.15
      });
      const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
      orbit.rotation.x = Math.PI / 2;
      orbitsGroup.add(orbit);
    });
    
    scene.add(orbitsGroup);
    orbitLinesRef.current = orbitsGroup;
    
    return () => {
      scene.fog = null;
      if (orbitLinesRef.current) {
        scene.remove(orbitLinesRef.current);
      }
    };
  }, [camera, scene]);
  
  // Animate stars rotation and sun effects
  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.y += 0.0001;
    }
    
    // Animate sun glow with more dynamic pulsing
    if (sunRef.current) {
      const pulseFactor = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.03;
      sunRef.current.scale.set(
        1 + pulseFactor,
        1 + pulseFactor,
        1 + pulseFactor
      );
    }
    
    // Animate sun corona/glow with different rhythm
    if (sunGlowRef.current) {
      const glowFactor = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1 + 0.9;
      sunGlowRef.current.scale.set(
        1.2 + glowFactor,
        1.2 + glowFactor,
        1.2 + glowFactor
      );
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 0]} intensity={3} color="#FDB813" castShadow />
      
      {/* Enhanced sun with more dynamic effects */}
      <mesh ref={sunRef} position={[0, 0, 0]}>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshBasicMaterial color="#FDB813" />
      </mesh>
      
      {/* Sun inner glow effect */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[2.7, 64, 64]} />
        <meshBasicMaterial color="#FFCF33" transparent opacity={0.3} />
      </mesh>
      
      {/* Sun outer corona/glow effect with animation */}
      <mesh ref={sunGlowRef} position={[0, 0, 0]}>
        <sphereGeometry args={[3.2, 64, 64]} />
        <meshBasicMaterial
          color="#FFA500"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Sun rays/flares effect */}
      <mesh position={[0, 0, 0]} rotation-z={state => state.clock.getElapsedTime() * 0.05}>
        <planeGeometry args={[15, 15]} />
        <meshBasicMaterial
          transparent
          opacity={0.08}
          side={THREE.DoubleSide}
          map={new THREE.TextureLoader().load('/starflare.png')}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
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
        maxPolarAngle={Math.PI * 0.85}
      />
      
      <Stars
        ref={starsRef}
        radius={100}
        depth={50}
        count={10000}
        factor={5}
        fade
        speed={0.5}
      />
    </>
  );
};

export default SceneSetup;
