
import React, { useState } from 'react';
import Planet from './Planet';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Play, Pause, FastForward, Rewind } from 'lucide-react';

const SolarSystem: React.FC = () => {
  const [speed, setSpeed] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // We'll use CSS to pause animations
    document.documentElement.style.setProperty('--animation-play-state', isPlaying ? 'paused' : 'running');
  };

  const adjustSpeed = (newSpeed: number) => {
    setSpeed(newSpeed);
    // Update CSS variable to control animation speed
    document.documentElement.style.setProperty('--animation-speed', String(newSpeed));
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
      {/* Control panel */}
      <div className="glass-card py-3 px-6 rounded-lg mb-4 flex items-center gap-4">
        <Button
          variant="outline" 
          size="icon"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause simulation" : "Play simulation"}
          className="text-white border-white/20 hover:bg-white/10"
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        
        <Button
          variant="outline" 
          size="icon"
          onClick={decreaseSpeed}
          aria-label="Decrease speed"
          className="text-white border-white/20 hover:bg-white/10"
        >
          <Rewind className="h-4 w-4" />
        </Button>
        
        <div className="flex-1 px-4">
          <Slider
            value={[speed * 100]}
            min={25}
            max={300}
            step={25}
            onValueChange={(value) => adjustSpeed(value[0] / 100)}
            aria-label="Simulation speed"
          />
        </div>
        
        <Button
          variant="outline" 
          size="icon"
          onClick={increaseSpeed}
          aria-label="Increase speed"
          className="text-white border-white/20 hover:bg-white/10"
        >
          <FastForward className="h-4 w-4" />
        </Button>
        
        <div className="text-sm font-medium">{speed.toFixed(2)}x</div>
      </div>

      {/* Solar system visualization */}
      <div className="flex-1 relative">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {/* Sun */}
          <div 
            className="w-28 h-28 rounded-full bg-yellow-500 z-10 animate-pulse-glow"
            style={{
              boxShadow: '0 0 60px rgba(255, 215, 0, 0.8), 0 0 100px rgba(255, 140, 0, 0.5)'
            }}
          >
            <span className="sr-only">Sun</span>
          </div>
          
          {/* Orbit Lines */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[160px] h-[160px] rounded-full border border-white/10"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] rounded-full border border-white/10"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-white/10"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full border border-white/10"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-white/10"></div>
          
          {/* Planets */}
          <Planet 
            name="Mercury" 
            size={10} 
            color="#A9A9A9" 
            orbitClass="orbit-mercury"
          />
          <Planet 
            name="Venus" 
            size={15} 
            color="#E6A857" 
            orbitClass="orbit-venus"
          />
          <Planet 
            name="Earth" 
            size={16} 
            color="#3D85C6" 
            orbitClass="orbit-earth"
          />
          <Planet 
            name="Mars" 
            size={14} 
            color="#DD7E6B" 
            orbitClass="orbit-mars"
          />
          <Planet 
            name="Jupiter" 
            size={30} 
            color="#E6C88E" 
            orbitClass="orbit-jupiter"
            hasRings={false}
          />
        </div>
      </div>
    </div>
  );
};

export default SolarSystem;
