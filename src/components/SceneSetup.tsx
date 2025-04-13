
import React, { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Html } from '@react-three/drei';
import Planet from './Planet';
import { PLANET_DATA } from '@/data/planetData';

interface SceneSetupProps {
  activePlanet: string | null;
  setActivePlanet: (name: string) => void;
  speed: number;
}

const SceneSetup: React.FC<SceneSetupProps> = ({ activePlanet, setActivePlanet, speed }) => {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.set(0, 10, 25);
  }, [camera]);

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#FDB813" />
      
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshBasicMaterial color="#FDB813" />
        <Html position={[0, 3, 0]} distanceFactor={10}>
          <div className="bg-black/50 backdrop-blur-sm p-1 rounded whitespace-nowrap">
            <span className="text-yellow-400 font-bold text-sm">The Sun</span>
          </div>
        </Html>
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
      />
      
      <Stars radius={100} depth={50} count={5000} factor={4} fade speed={1} />
    </>
  );
};

export default SceneSetup;
