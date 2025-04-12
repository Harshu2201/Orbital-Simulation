
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture, Html } from '@react-three/drei';
import { Mesh } from 'three';
import { cn } from '@/lib/utils';

interface PlanetProps {
  name: string;
  size: number;
  textureMap: string;
  rotationSpeed?: number;
  orbitClass?: string;
  orbitPosition?: number;
  hasRings?: boolean;
  ringTexture?: string;
  className?: string;
  position?: [number, number, number]; // Explicitly typed as tuple
  description?: string;
  facts?: string[];
  showInfo?: boolean;
  onClick?: () => void;
}

const Planet: React.FC<PlanetProps> = ({
  name,
  size,
  textureMap,
  rotationSpeed = 0.005,
  orbitClass,
  orbitPosition = 0,
  hasRings = false,
  ringTexture,
  className,
  position = [0, 0, 0],
  description,
  facts,
  showInfo = false,
  onClick
}) => {
  const planetRef = useRef<Mesh>(null);
  const ringsRef = useRef<Mesh>(null);
  
  // Load the texture map
  const texture = useTexture(textureMap);
  const ringMap = hasRings && ringTexture ? useTexture(ringTexture) : null;
  
  // Animate the planet rotation
  useFrame(() => {
    if (planetRef.current) {
      planetRef.current.rotation.y += rotationSpeed;
    }
    
    if (ringsRef.current) {
      ringsRef.current.rotation.x = 0.5; // Tilt the rings
    }
  });
  
  return (
    <group position={position} onClick={onClick}>
      {/* Planet Sphere */}
      <mesh ref={planetRef}>
        <sphereGeometry args={[size, 64, 64]} />
        <meshStandardMaterial map={texture} />
        
        {/* Info card that appears when hovering or clicking */}
        {showInfo && (
          <Html distanceFactor={10} position={[size * 1.5, 0, 0]} className="pointer-events-auto">
            <div className="bg-black/80 backdrop-blur-md p-4 rounded-lg shadow-lg border border-white/10 w-64 text-left">
              <h2 className="text-xl font-bold mb-2 text-white">{name}</h2>
              {description && <p className="text-sm text-gray-300 mb-2">{description}</p>}
              
              {facts && facts.length > 0 && (
                <div className="mt-3">
                  <h3 className="text-sm font-semibold mb-1 text-white">Quick Facts:</h3>
                  <ul className="list-disc list-inside text-xs text-gray-300 space-y-1">
                    {facts.map((fact, index) => (
                      <li key={index}>{fact}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Html>
        )}
      </mesh>
      
      {/* Rings for planets that have them */}
      {hasRings && ringMap && (
        <mesh ref={ringsRef}>
          <ringGeometry args={[size * 1.4, size * 2, 64]} />
          <meshStandardMaterial 
            map={ringMap} 
            transparent={true} 
            opacity={0.8} 
            side={2} // Render both sides
          />
        </mesh>
      )}
    </group>
  );
};

export default Planet;
