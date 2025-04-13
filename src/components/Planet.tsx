
import React, { useRef, useMemo, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { Mesh, MeshStandardMaterial, Color, TextureLoader } from 'three';

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
  const [hovered, setHovered] = useState(false);
  
  // Create planetary textures based on name
  const getTexturePath = (planetName: string) => {
    const nameMap: Record<string, string> = {
      Mercury: '/textures/mercury.jpg',
      Venus: '/textures/venus.jpg',
      Earth: '/textures/earth.jpg',
      Mars: '/textures/mars.jpg',
      Jupiter: '/textures/jupiter.jpg',
      Saturn: '/textures/saturn.jpg',
      Uranus: '/textures/uranus.jpg',
      Neptune: '/textures/neptune.jpg',
      Pluto: '/textures/pluto.jpg',
    };
    
    return nameMap[planetName] || null;
  };
  
  // Use a consistent color based on planet name
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
      metalness: 0.2,
    });
    
    // Try to load texture if available
    const texturePath = getTexturePath(name);
    if (texturePath) {
      try {
        const textureLoader = new TextureLoader();
        textureLoader.load(
          texturePath,
          (texture) => {
            mat.map = texture;
            mat.needsUpdate = true;
          },
          undefined,
          (err) => {
            console.log(`Couldn't load texture for ${name}, using color instead`);
          }
        );
      } catch (e) {
        console.log(`Error loading texture for ${name}`);
      }
    }
    
    return mat;
  }, [planetColor, name]);
  
  // Get the appropriate glow color based on planet
  const getGlowColor = (planetName: string) => {
    const glowMap: Record<string, string> = {
      Mercury: '#A9A9A9',
      Venus: '#F0E68C',
      Earth: '#87CEEB',
      Mars: '#CD5336',
      Jupiter: '#E0A568',
      Saturn: '#DAA06D',
      Uranus: '#B0E0E6',
      Neptune: '#4169E1',
      Pluto: '#9C8A7D',
    };
    return glowMap[planetName] || planetColor;
  };
  
  // Animate the planet rotation and glow
  useFrame((state) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += rotationSpeed;
    }
    
    // Animate glow opacity for more interesting effect
    if (glowRef.current && glowRef.current.material instanceof MeshStandardMaterial) {
      const glowOpacity = 0.2 + Math.sin(state.clock.getElapsedTime() * 0.5 + position[0]) * 0.1;
      glowRef.current.material.opacity = glowOpacity;
      
      // Add subtle pulsing on hover
      if (hovered || showInfo) {
        glowRef.current.scale.set(1.06, 1.06, 1.06);
      } else {
        glowRef.current.scale.set(1.05, 1.05, 1.05);
      }
    }
    
    // Subtle wobble for gas giants
    if (planetRef.current && (name === 'Jupiter' || name === 'Saturn' || name === 'Uranus' || name === 'Neptune')) {
      planetRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.02;
    }
  });
  
  return (
    <group 
      position={position} 
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
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
      
      {/* Enhanced atmosphere glow effect */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[size * 1.05, 32, 32]} />
        <meshStandardMaterial 
          color={getGlowColor(name)}
          transparent
          opacity={0.2}
          roughness={1}
        />
      </mesh>
      
      {/* Rings for Saturn */}
      {name === 'Saturn' && (
        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <ringGeometry args={[size * 1.4, size * 2, 64]} />
          <meshBasicMaterial 
            color="#CBB06E" 
            transparent 
            opacity={0.7} 
            side={2}
          />
        </mesh>
      )}
      
      {/* Planet label that's always visible but enhanced */}
      <Html distanceFactor={15} position={[0, size * 1.3, 0]} className="pointer-events-none">
        <div className={`px-2 py-0.5 rounded-full text-xs font-bold
                        ${(hovered || showInfo) 
                          ? 'bg-white/30 text-white scale-110 transition-all duration-300' 
                          : 'bg-black/40 text-white/90'} 
                        backdrop-blur-sm whitespace-nowrap text-center transition-all`}>
          {name}
        </div>
      </Html>
    </group>
  );
};

export default Planet;
