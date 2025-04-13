
import React from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, FastForward, Rewind, Volume2, VolumeX } from 'lucide-react';
import { useAudio } from '@/contexts/AudioContext';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';

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
  const { toggleAudio, isPlaying: isAudioPlaying, volume, setVolume, playClickSound } = useAudio();

  const handleToggleAudio = () => {
    playClickSound();
    toggleAudio();
    
    toast({
      title: isAudioPlaying ? "Audio Off" : "Audio On",
      description: isAudioPlaying 
        ? "Space ambient sound has been turned off" 
        : "Space ambient sound is now playing",
      duration: 3000,
    });
  };

  const handleTogglePlay = () => {
    playClickSound();
    togglePlay();
  };

  const handleIncreaseSpeed = () => {
    playClickSound();
    increaseSpeed();
  };

  const handleDecreaseSpeed = () => {
    playClickSound();
    decreaseSpeed();
  };

  const handleSpeedChange = (value: number[]) => {
    playClickSound();
    adjustSpeed(value[0] / 100);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0] / 100);
  };

  return (
    <div className="glass-card py-3 px-6 rounded-lg mb-4 flex items-center gap-4">
      <Button
        variant="outline" 
        size="icon"
        onClick={handleTogglePlay}
        aria-label={isPlaying ? "Pause simulation" : "Play simulation"}
        className="text-white border-white/20 hover:bg-white/10"
      >
        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </Button>
      
      <Button
        variant="outline" 
        size="icon"
        onClick={handleDecreaseSpeed}
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
          onValueChange={handleSpeedChange}
          aria-label="Simulation speed"
        />
      </div>
      
      <Button
        variant="outline" 
        size="icon"
        onClick={handleIncreaseSpeed}
        aria-label="Increase speed"
        className="text-white border-white/20 hover:bg-white/10"
      >
        <FastForward className="h-4 w-4" />
      </Button>
      
      <div className="text-sm font-medium">{speed.toFixed(2)}x</div>
      
      <Button
        variant="outline"
        size="icon"
        onClick={handleToggleAudio}
        aria-label={isAudioPlaying ? "Mute audio" : "Play audio"}
        className={cn(
          "text-white border-white/20 hover:bg-white/10 ml-2",
          isAudioPlaying && "text-cosmic-glow"
        )}
      >
        {isAudioPlaying ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
      </Button>
      
      {isAudioPlaying && (
        <div className="w-24 px-2">
          <Slider
            value={[volume * 100]}
            min={0}
            max={100}
            step={10}
            onValueChange={handleVolumeChange}
            aria-label="Volume"
          />
        </div>
      )}
    </div>
  );
};

export default PlanetControls;
