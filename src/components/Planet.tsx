
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { Mesh, MeshStandardMaterial, Color } from 'three';

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
  const glowRef = useRef<Mesh>(null);
  
  // Use a consistent color based on planet name instead of random color
  const planetColor = useMemo(() => {
    const colorMap: Record<string, string> = {
      Mercury: '#A9A9A9',
      Venus: '#E6C073',
      Earth: '#6B93D6',
      Mars: '#D07D59',
      Jupiter: '#E0A568',
      Saturn: '#CBAC6E',
      Uranus: '#9DB4C0',
      Neptune: '#5A5CA6',
      Pluto: '#9C8A7D',
    };
    return colorMap[name] || `hsl(${name.length * 30}, 70%, 50%)`;
  }, [name]);
  
  // Create material with some roughness for more realistic look
  const material = useMemo(() => {
    const mat = new MeshStandardMaterial({
      color: new Color(planetColor),
      roughness: 0.7,
      metalness: 0.1,
    });
    return mat;
  }, [planetColor]);
  
  // Animate the planet rotation
  useFrame((state) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += rotationSpeed;
    }
    
    // Animate glow opacity for more interesting effect
    if (glowRef.current && glowRef.current.material instanceof MeshStandardMaterial) {
      const glowOpacity = 0.2 + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
      glowRef.current.material.opacity = glowOpacity;
    }
  });
  
  return (
    <group position={position} onClick={onClick}>
      {/* Planet Sphere */}
      <mesh ref={planetRef}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial {...material} />
        
        {/* Info card that appears when hovering or clicking */}
        {showInfo && (
          <Html distanceFactor={10} position={[size * 1.5, 0, 0]} className="pointer-events-auto z-10">
            <div className="bg-black/80 backdrop-blur-md p-4 rounded-lg shadow-lg border border-white/10 w-64 text-left animate-fade-in">
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
      
      {/* Atmosphere glow effect */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[size * 1.05, 32, 32]} />
        <meshStandardMaterial 
          color={planetColor}
          transparent
          opacity={0.2}
          roughness={1}
        />
      </mesh>
      
      {/* Planet label that's always visible */}
      <Html distanceFactor={15} position={[0, size * 1.3, 0]} className="pointer-events-none">
        <div className={`px-2 py-0.5 rounded-full text-xs font-bold text-white
                        ${showInfo ? 'bg-white/20 backdrop-blur-sm' : 'bg-black/40 backdrop-blur-sm'} 
                        whitespace-nowrap text-center`}>
          {name}
        </div>
      </Html>
    </group>
  );
};

export default Planet;
