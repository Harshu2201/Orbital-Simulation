
import React from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, FastForward, Rewind } from 'lucide-react';
import { useAudio } from '@/contexts/AudioContext';
import { cn } from '@/lib/utils';

interface PlanetControlsProps {
  speed: number;
  isPlaying: boolean;
  togglePlay: () => void;
  adjustSpeed: (newSpeed: number) => void;
  increaseSpeed: () => void;
  decreaseSpeed: () => void;
}

const PlanetControls: React.FC<PlanetControlsProps> = ({
  speed,
  isPlaying,
  togglePlay,
  adjustSpeed,
  increaseSpeed,
  decreaseSpeed
}) => {
  const { toggleAudio, isPlaying: isAudioPlaying } = useAudio();

  return (
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
      
      <Button
        variant="outline"
        size="icon"
        onClick={toggleAudio}
        aria-label={isAudioPlaying ? "Mute audio" : "Play audio"}
        className="text-white border-white/20 hover:bg-white/10 ml-2"
      >
        {isAudioPlaying ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        )}
      </Button>
    </div>
  );
};

export default PlanetControls;
