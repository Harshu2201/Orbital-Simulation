
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { Mesh } from 'three';

interface PlanetProps {
  name: string;
  size: number;
  position: [number, number, number]; // Explicitly typed as tuple
  rotationSpeed?: number;
  description?: string;
  facts?: string[];
  showInfo?: boolean;
  onClick?: () => void;
}

const Planet: React.FC<PlanetProps> = ({
  name,
  size,
  position,
  rotationSpeed = 0.005,
  description,
  facts,
  showInfo = false,
  onClick
}) => {
  const planetRef = useRef<Mesh>(null);
  
  // Animate the planet rotation
  useFrame(() => {
    if (planetRef.current) {
      planetRef.current.rotation.y += rotationSpeed;
    }
  });
  
  return (
    <group position={position} onClick={onClick}>
      {/* Planet Sphere */}
      <mesh ref={planetRef}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial color={`hsl(${Math.random() * 360}, 50%, 50%)`} />
        
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
    </group>
  );
};

export default Planet;
