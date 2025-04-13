
import React, { useState, Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import SceneSetup from './SceneSetup';
import PlanetControls from './PlanetControls';
import PlanetNavigator from './PlanetNavigator';
import PlanetDetail from './PlanetDetail';
import { useAudio } from '@/contexts/AudioContext';
import { toast } from "@/components/ui/use-toast";

const SolarSystem: React.FC = () => {
  const [speed, setSpeed] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activePlanet, setActivePlanet] = useState<string | null>(null);
  const { toggleAudio, isPlaying: isAudioPlaying } = useAudio();
  
  // Show welcome toast and prompt for audio when simulation loads
  useEffect(() => {
    // Show welcome toast
    toast({
      title: "Welcome to Solar System Simulation",
      description: "Click the sound icon to toggle ambient space music for an immersive experience",
      duration: 5000,
    });
    
    // Prompt user about the audio after a short delay
    const audioPromptTimer = setTimeout(() => {
      toast({
        title: "Enable Space Ambience",
        description: "Click the speaker icon in the controls to enable the cosmic soundtrack",
        duration: 8000,
      });
    }, 10000);
    
    return () => clearTimeout(audioPromptTimer);
  }, []);

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
    if (newSpeed > 0 && !isPlaying) {
      setIsPlaying(true);
    } else if (newSpeed === 0 && isPlaying) {
      setIsPlaying(false);
    }
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
          <Suspense fallback={
            <div className="flex h-full items-center justify-center">
              <div className="text-cosmic-glow text-lg">Loading 3D models...</div>
              <div className="mt-4 animate-spin w-8 h-8 border-4 border-cosmic-glow border-t-transparent rounded-full"></div>
            </div>
          }>
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
