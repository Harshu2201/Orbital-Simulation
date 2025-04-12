
import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import SceneSetup from './SceneSetup';
import PlanetControls from './PlanetControls';
import PlanetNavigator from './PlanetNavigator';
import PlanetDetail from './PlanetDetail';

const SolarSystem: React.FC = () => {
  const [speed, setSpeed] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activePlanet, setActivePlanet] = useState<string | null>(null);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      setSpeed(0);
    } else {
      setSpeed(1);
    }
  };

  const adjustSpeed = (newSpeed: number) => {
    setSpeed(newSpeed);
  };

  const increaseSpeed = () => {
    const newSpeed = Math.min(speed + 0.25, 3);
    adjustSpeed(newSpeed);
  };

  const decreaseSpeed = () => {
    const newSpeed = Math.max(speed - 0.25, 0.25);
    adjustSpeed(newSpeed);
  };

  return (
    <div className="relative w-full h-full flex flex-col">
      <PlanetControls 
        speed={speed}
        isPlaying={isPlaying}
        togglePlay={togglePlay}
        adjustSpeed={adjustSpeed}
        increaseSpeed={increaseSpeed}
        decreaseSpeed={decreaseSpeed}
      />

      <div className="glass-card p-2 rounded-lg mb-4 text-center text-xs text-gray-300">
        <p>Use mouse to rotate. Scroll to zoom in/out. Click on a planet to see details.</p>
      </div>

      <PlanetNavigator 
        activePlanet={activePlanet}
        setActivePlanet={setActivePlanet}
      />

      <div className="flex-1 relative">
        <div className="absolute inset-0 z-10">
          <Suspense fallback={<div className="flex h-full items-center justify-center">Loading 3D models...</div>}>
            <Canvas dpr={[1, 2]} shadows>
              <SceneSetup 
                activePlanet={activePlanet} 
                setActivePlanet={setActivePlanet} 
                speed={speed}
              />
            </Canvas>
          </Suspense>
        </div>
      </div>
      
      <PlanetDetail activePlanet={activePlanet} />
    </div>
  );
};

export default SolarSystem;
